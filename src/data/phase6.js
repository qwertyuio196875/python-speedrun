/**
 * 第六阶段：异步编程（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'async',
    title: 'async 与并发模型',
    phase: 6,
    order: 1,
    minutes: 12,
    rating: { python: 4, java: 3, ai: 5 },
    summary: 'async def 定义协程函数；Python 用"单线程事件循环 + 协作式切换"做 IO 并发。',
    keywords: ['async', 'async def', '协程', '并发', '事件循环', 'CompletableFuture', 'IO 密集'],
    tip: 'Java 开发者提示：不是多线程，而是单线程事件循环；只在遇到 await 时才切换任务，遇到阻塞调用会卡住全部。',
    what: 'async def 声明的函数叫协程函数，调用它不会执行函数体，而是返回协程对象，必须交给事件循环执行。事件循环在单线程里轮流推进多个任务：某个任务 await 一个 IO 操作时主动让出控制权，别人继续跑。因此异步适合"等网络/等磁盘"的 IO 密集场景，不适合 CPU 密集计算。',
    javaCompare: [
      {
        title: '声明异步方法',
        java: 'CompletableFuture<String> fetch() {\n    return CompletableFuture.supplyAsync(() -> httpGet(url));\n}',
        python: 'async def fetch():\n    return await http_get(url)',
        diff: 'Python 用 async def 声明并靠事件循环调度，是协作式、单线程；Java 的 CompletableFuture 通常配合线程池是抢占式的。'
      }
    ],
    examples: [
      {
        title: '第一个协程',
        code: 'import asyncio\n\nasync def main():\n    print("开始")\n    await asyncio.sleep(0.1)\n    print("结束")\n    return "ok"\n\nprint(type(main()))\nprint(asyncio.run(main()))',
        output: "<class 'coroutine'>\n开始\n结束\nok",
        note: '直接调用 main() 只得到协程对象，必须交给 asyncio.run 才会执行。'
      },
      {
        title: 'IO 等待时不阻塞其它任务',
        code: 'import asyncio\n\nasync def worker(name, delay):\n    print(f"{name} 开始")\n    await asyncio.sleep(delay)\n    print(f"{name} 完成")\n\nasync def main():\n    await asyncio.gather(\n        worker("A", 0.2),\n        worker("B", 0.1),\n    )\n\nasyncio.run(main())',
        output: 'A 开始\nB 开始\nB 完成\nA 完成',
        note: '等待时间短的 B 先完成——说明两个任务是并发推进的，而不是排队执行。'
      }
    ],
    pitfalls: [
      {
        title: '在协程里调用阻塞函数',
        bad: 'async def route():\n    time.sleep(1)          # 阻塞整个事件循环\n    requests.get(url)      # 同样阻塞',
        good: 'await asyncio.sleep(1)\nawait httpx.AsyncClient().get(url)',
        note: '一个阻塞调用会让所有并发请求一起卡住，这是异步代码里最严重的错误。'
      },
      {
        title: '忘记 await',
        bad: 'asyncio.run(main())\n# 在 main 里：fetch()   # 只创建协程，没执行',
        good: 'await fetch()',
        note: '会收到 RuntimeWarning: coroutine was never awaited，且逻辑不会执行。'
      },
      {
        title: '以为异步能加速 CPU 计算',
        bad: '用 async 包装大矩阵运算',
        good: 'CPU 密集任务用 multiprocessing 或多进程/线程池',
        note: '异步只在等待 IO 时有收益；纯计算没有 await 点，不会真正并发。'
      }
    ],
    practice: [
      {
        prompt: '写一个 async def hello()，打印 "hello"，用 asyncio.run 调用它。',
        starter: 'import asyncio\n\n# TODO: 定义协程并运行\n',
        answer: 'import asyncio\n\nasync def hello():\n    print("hello")\n\nasyncio.run(hello())',
        output: 'hello',
        hint: 'asyncio.run(hello()) 接收协程对象，不要写成 asyncio.run(hello)。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '调用一个 async def 函数会立刻发生什么？',
        options: ['立刻执行函数体', '返回协程对象，函数体尚未执行', '启动一个新线程', '抛异常'],
        answer: 1,
        explain: '协程函数调用只构造协程对象，需要事件循环 await 或 run 才执行。'
      },
      {
        type: 'judge',
        question: '在 async def 里调用 requests.get() 是推荐做法。',
        answer: false,
        explain: 'requests 是阻塞库，会卡住事件循环；异步场景用 httpx.AsyncClient。'
      }
    ]
  },
  {
    id: 'await',
    title: 'await 与协程执行',
    phase: 6,
    order: 2,
    minutes: 12,
    rating: { python: 4, java: 3, ai: 5 },
    summary: 'await 表示"把控制权交回事件循环，等这个操作完成再继续"；串行 await 会退化成排队。',
    keywords: ['await', 'awaitable', '串行', '并发', 'gather', '性能'],
    tip: 'Java 开发者提示：await 相当于 join() 的"让出式等待"，但它在等待期间会让别的任务跑，而不是占住线程。',
    what: 'await 后面只能跟 awaitable（协程、Task、Future）。执行到 await 时，当前协程挂起，事件循环去跑别的就绪任务；被等的操作完成后，协程从原地恢复。关键点：连续 await 多个 IO 是串行的（总耗时相加），要并发必须先把它们变成任务或用 gather。',
    javaCompare: [
      {
        title: '串行 vs 并发',
        java: 'CompletableFuture<String> a = fetchA();\nCompletableFuture<String> b = fetchB();\nString r1 = a.get(); String r2 = b.get();   // 已并发启动',
        python: 'asyncio.gather(fetch_a(), fetch_b())   # 并发\n# 而 a = await fetch_a(); b = await fetch_b() 是串行',
        diff: 'Java 调用方法就"启动"了任务；Python 协程只有被 await/gather 才推进，所以顺序写就是串行。'
      }
    ],
    examples: [
      {
        title: '串行 await：总耗时相加',
        code: 'import asyncio, time\n\nasync def step(name, delay):\n    await asyncio.sleep(delay)\n    return name\n\nasync def main():\n    start = time.perf_counter()\n    await step("a", 1)\n    await step("b", 1)\n    print(f"串行耗时约 {time.perf_counter() - start:.2f} 秒")\n\nasyncio.run(main())',
        output: '串行耗时约 2.00 秒',
        note: '两次 1 秒的等待排队执行，总耗时 2 秒。'
      },
      {
        title: '改用 gather：取最慢的那个',
        code: 'import asyncio, time\n\nasync def step(name, delay):\n    await asyncio.sleep(delay)\n    return name\n\nasync def main():\n    start = time.perf_counter()\n    results = await asyncio.gather(step("a", 1), step("b", 1))\n    print(results)\n    print(f"并发耗时约 {time.perf_counter() - start:.2f} 秒")\n\nasyncio.run(main())',
        output: "['a', 'b']\n并发耗时约 1.00 秒",
        note: 'gather 的返回值顺序与传入顺序一致，不受完成先后影响。'
      }
    ],
    pitfalls: [
      {
        title: '循环里顺序 await',
        bad: 'for q in questions:\n    answers.append(await ask_llm(q))   # 串行，慢',
        good: 'answers = await asyncio.gather(*(ask_llm(q) for q in questions))',
        note: '一次要调 10 个接口却写成循环，会慢 10 倍。'
      },
      {
        title: 'await 用在非协程上',
        bad: 'await time.sleep(1)   # TypeError: object NoneType can\'t be used in \'await\' expression',
        good: 'await asyncio.sleep(1)',
        note: 'await 只能用于 awaitable，普通函数返回 None 不能 await。'
      },
      {
        title: '在同步函数里写 await',
        bad: 'def handler():\n    await fetch()   # SyntaxError',
        good: 'async def handler():\n    await fetch()',
        note: 'await 只允许出现在 async def 内部。'
      }
    ],
    practice: [
      {
        prompt: '用 gather 并发执行两个 0.5 秒的 sleep，打印结果列表。',
        starter: 'import asyncio\n\nasync def job(name):\n    await asyncio.sleep(0.5)\n    return name\n\nasync def main():\n    # TODO: 并发执行 job("a") 与 job("b") 并打印\n    pass\n\nasyncio.run(main())',
        answer: 'import asyncio\n\nasync def job(name):\n    await asyncio.sleep(0.5)\n    return name\n\nasync def main():\n    print(await asyncio.gather(job("a"), job("b")))\n\nasyncio.run(main())',
        output: "['a', 'b']",
        hint: 'await asyncio.gather(...) 返回结果列表，顺序与传入一致。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '下面哪种写法是并发的？',
        options: ['a = await f(); b = await g()', 'await asyncio.gather(f(), g())', 'for x in xs: await f(x)', 'await f(); await g()'],
        answer: 1,
        explain: 'gather 把多个协程同时交给事件循环推进，其余三种都是排队串行。'
      },
      {
        type: 'judge',
        question: 'await 期间事件循环会去执行其它就绪任务。',
        answer: true,
        explain: '这正是异步并发的来源：等待 IO 时让出控制权。'
      }
    ]
  },
  {
    id: 'coroutine',
    title: 'coroutine 与事件循环',
    phase: 6,
    order: 3,
    minutes: 12,
    rating: { python: 4, java: 4, ai: 4 },
    summary: '协程对象、Task（被调度的协程）、事件循环三者的关系，以及什么时候该用 create_task。',
    keywords: ['coroutine', 'Task', 'event loop', 'create_task', 'run', '调度'],
    tip: 'Java 开发者提示：事件循环 ≈ 单线程的调度器 + IO 多路复用（epoll/IOCP）；Task ≈ 已提交到调度器的任务。',
    what: '协程对象本身不会执行；用 asyncio.create_task(coro) 把它包装成 Task 并立即排入事件循环，之后可以 await task、取消它或查询状态。asyncio.run(main()) 会创建事件循环、运行主协程、最后关闭循环——一个线程里通常只调用一次。',
    javaCompare: [
      {
        title: '提交与等待',
        java: 'Future<String> f = executor.submit(task);\nString r = f.get();',
        python: 'task = asyncio.create_task(coro())\nresult = await task',
        diff: 'create_task 立即调度，await 只等待结果；不再需要显式线程池。'
      }
    ],
    examples: [
      {
        title: 'create_task 让任务立即开跑',
        code: 'import asyncio\n\nasync def work(name):\n    print(f"{name} 开始")\n    await asyncio.sleep(0.1)\n    return name.upper()\n\nasync def main():\n    t1 = asyncio.create_task(work("a"))\n    t2 = asyncio.create_task(work("b"))\n    print("任务已提交")\n    print(await t1, await t2)\n\nasyncio.run(main())',
        output: '任务已提交\na 开始\nb 开始\nA B',
        note: '两个 Task 已排入队列，主协程第一次 await 时才轮到它们执行。'
      },
      {
        title: '超时与取消',
        code: 'import asyncio\n\nasync def slow():\n    await asyncio.sleep(5)\n    return "完成"\n\nasync def main():\n    try:\n        result = await asyncio.wait_for(slow(), timeout=0.2)\n        print(result)\n    except asyncio.TimeoutError:\n        print("超时，已取消任务")\n\nasyncio.run(main())',
        output: '超时，已取消任务',
        note: '调 LLM 时给个超时是必须的：wait_for 到时会把内部任务取消。'
      }
    ],
    pitfalls: [
      {
        title: '创建 Task 后不保存引用',
        bad: 'asyncio.create_task(background_job())   # 返回值被丢弃',
        good: 'tasks = set()\nt = asyncio.create_task(background_job())\ntasks.add(t)\nt.add_done_callback(tasks.discard)',
        note: '任务对象可能被垃圾回收，导致"任务莫名不执行"的诡异问题。'
      },
      {
        title: '在已有事件循环里再调 run',
        bad: 'async def main():\n    asyncio.run(other())   # RuntimeError: asyncio.run() cannot be called from a running event loop',
        good: 'await other()',
        note: 'asyncio.run 只能在最外层用一次。'
      }
    ],
    practice: [
      {
        prompt: '用 create_task 提交 work("a")，等待它并打印返回值。',
        starter: 'import asyncio\n\nasync def work(name):\n    await asyncio.sleep(0.05)\n    return f"{name}-done"\n\nasync def main():\n    # TODO: 用 create_task 提交并 await\n    pass\n\nasyncio.run(main())',
        answer: 'import asyncio\n\nasync def work(name):\n    await asyncio.sleep(0.05)\n    return f"{name}-done"\n\nasync def main():\n    task = asyncio.create_task(work("a"))\n    print(await task)\n\nasyncio.run(main())',
        output: 'a-done',
        hint: 'task = asyncio.create_task(...)；结果用 await task 取。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'asyncio.create_task(coro) 的作用是？',
        options: ['立刻同步执行 coro', '把协程包装成 Task 并排入事件循环', '创建线程', '关闭事件循环'],
        answer: 1,
        explain: 'create_task 让协程被调度执行，之后可以 await、取消或查询状态。'
      },
      {
        type: 'judge',
        question: '同一个线程里可以多次调用 asyncio.run() 来嵌套执行协程。',
        answer: false,
        explain: '在已运行的事件循环内调用 asyncio.run 会抛 RuntimeError。'
      }
    ]
  },
  {
    id: 'asyncio',
    title: 'asyncio 常用 API',
    phase: 6,
    order: 4,
    minutes: 14,
    rating: { python: 4, java: 3, ai: 5 },
    summary: 'sleep、create_task、gather、wait_for、Queue、semaphore 与 to_thread 的适用场景。',
    keywords: ['asyncio', 'sleep', 'wait_for', 'Queue', 'Semaphore', 'to_thread', '超时', '限流'],
    tip: 'Java 开发者提示：asyncio.Semaphore 用来给并发限流，等价于信号量，只是它必须在事件循环内使用。',
    what: 'asyncio 是标准库的异步框架，最常用的几个工具：sleep 模拟等待、gather 并发收集结果、wait_for 加超时、Semaphore 限制并发数、Queue 在生产者和消费者之间传递数据、to_thread 把阻塞函数丢到线程池里执行。调用 LLM 时"最多同时并发 N 个请求"就用 Semaphore。',
    javaCompare: [
      {
        title: '限制并发数',
        java: 'Semaphore sem = new Semaphore(3);\nsem.acquire();\ntry { work(); } finally { sem.release(); }',
        python: 'sem = asyncio.Semaphore(3)\n\nasync with sem:\n    await work()',
        diff: 'Python 有 async with 语法，进入退出自动 acquire/release，不用写 finally。'
      }
    ],
    examples: [
      {
        title: 'Semaphore 限流',
        code: 'import asyncio\n\nasync def call(sem, name):\n    async with sem:\n        print(f"{name} 开始")\n        await asyncio.sleep(0.05)\n\nasync def main():\n    sem = asyncio.Semaphore(2)\n    await asyncio.gather(*(call(sem, f"t{i}") for i in range(4)))\n    print("全部完成")\n\nasyncio.run(main())',
        output: 't0 开始\nt1 开始\nt2 开始\nt3 开始\n全部完成',
        note: '作用是"同时最多 2 个真正在跑"，这里的示例等待很短，所以看起来一起开始；真实限流效果在慢接口上最明显。'
      },
      {
        title: 'to_thread 包装阻塞调用',
        code: 'import asyncio, time\n\ndef blocking_read():\n    time.sleep(0.1)\n    return "文件内容"\n\nasync def main():\n    text = await asyncio.to_thread(blocking_read)\n    print(text)\n\nasyncio.run(main())',
        output: '文件内容',
        note: '不改造老代码又要避免阻塞事件循环时，to_thread 是最省事的过渡方案。'
      }
    ],
    pitfalls: [
      {
        title: 'gather 里一个异常影响全部',
        bad: 'await asyncio.gather(a(), b())   # b 抛异常时整体失败',
        good: 'await asyncio.gather(a(), b(), return_exceptions=True)',
        note: 'return_exceptions=True 会把异常作为结果返回，适合"部分失败也要汇总"的场景。'
      },
      {
        title: '在事件循环外创建 asyncio 对象',
        bad: 'sem = asyncio.Semaphore(2)   # 在模块顶层、循环外创建，再跨循环使用',
        good: '在 asyncio.run 内部（或同一个循环内）创建',
        note: 'Python 3.10+ 的 Semaphore/Lock 会绑定事件循环，跨循环复用会报错。'
      }
    ],
    practice: [
      {
        prompt: '用 asyncio.to_thread 执行 time.sleep(0.1) 后返回 "done" 的函数，并打印结果。',
        starter: 'import asyncio, time\n\ndef blocking():\n    time.sleep(0.1)\n    return "done"\n\nasync def main():\n    # TODO: 用 to_thread 调用并打印\n    pass\n\nasyncio.run(main())',
        answer: 'import asyncio, time\n\ndef blocking():\n    time.sleep(0.1)\n    return "done"\n\nasync def main():\n    print(await asyncio.to_thread(blocking))\n\nasyncio.run(main())',
        output: 'done',
        hint: 'await asyncio.to_thread(blocking) 会在线程池里执行并返回结果。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '要给并发请求限制"最多 5 个同时在跑"，用哪个工具最合适？',
        options: ['asyncio.sleep', 'asyncio.Semaphore(5)', 'asyncio.gather(5)', 'time.sleep(5)'],
        answer: 1,
        explain: 'Semaphore 配合 async with 是最常见的异步限流写法。'
      },
      {
        type: 'judge',
        question: 'gather(..., return_exceptions=True) 会在任一任务异常时立刻整体失败。',
        answer: false,
        explain: '该参数会把异常当结果返回，其余任务继续完成。'
      }
    ]
  },
  {
    id: 'gather',
    title: '并发请求与 asyncio.gather',
    phase: 6,
    order: 5,
    minutes: 12,
    rating: { python: 4, java: 3, ai: 5 },
    summary: '批量并发调用接口的模板：先收集协程、再 gather 汇总、异常与超时一起处理。',
    keywords: ['gather', 'asyncio', 'as_completed', '并发请求', '批量', 'embedding'],
    tip: 'Java 开发者提示：gather 相当于 CompletableFuture.allOf + 结果聚合，一次性拿到有序结果列表。',
    what: 'asyncio.gather 接收多个 awaitable，并发推进并返回结果列表，顺序与传入顺序一致。要"谁先完成先处理"就用 asyncio.as_completed。RAG 里批量调用 embedding 接口、Agent 里并行调用多个工具，都是这个模式。批量并发一定要配合超时与限流，否则很容易把接口打爆或长时间挂起。',
    javaCompare: [
      {
        title: '批量并发取结果',
        java: 'List<CompletableFuture<String>> futures = ids.stream()\n    .map(id -> fetch(id)).toList();\nCompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();',
        python: 'results = await asyncio.gather(*(fetch(i) for i in ids))',
        diff: 'Python 一行就完成"全部并发 + 聚合结果"，异常处理用 return_exceptions 控制。'
      }
    ],
    examples: [
      {
        title: '批量并发 + 限流 + 超时',
        code: 'import asyncio\n\nasync def fetch_doc(sem, doc_id):\n    async with sem:\n        await asyncio.sleep(0.05)\n        return f"doc-{doc_id}"\n\nasync def main():\n    sem = asyncio.Semaphore(3)\n    tasks = [fetch_doc(sem, i) for i in range(5)]\n    docs = await asyncio.wait_for(asyncio.gather(*tasks), timeout=2)\n    print(docs)\n\nasyncio.run(main())',
        output: "['doc-0', 'doc-1', 'doc-2', 'doc-3', 'doc-4']",
        note: '限流 3 个、整体超时 2 秒，是真实项目里推荐的最小参数组合。'
      },
      {
        title: '部分失败如何汇总',
        code: 'import asyncio\n\nasync def risky(n):\n    if n % 2:\n        raise ValueError(f"第 {n} 个失败")\n    return n\n\nasync def main():\n    results = await asyncio.gather(risky(1), risky(2), return_exceptions=True)\n    for r in results:\n        print(type(r).__name__, r)\n\nasyncio.run(main())',
        output: 'ValueError 第 1 个失败\nint 2',
        note: 'mixed 结果里正常值是原类型、失败是异常对象，遍历时需要判断类型。'
      }
    ],
    pitfalls: [
      {
        title: '忘记加 *（星号）展开',
        bad: 'await asyncio.gather(coros)   # 传了一个列表，会报 TypeError',
        good: 'await asyncio.gather(*coros)',
        note: 'gather 接收的是"可变位置参数"，列表要展开。'
      },
      {
        title: '并发数不设上限',
        bad: 'await asyncio.gather(*(call_llm(q) for q in thousands))',
        good: '用 Semaphore 限制同时并发数（例如 5~10）',
        note: '几千个请求同时发出会触发限流、超时甚至被封号。'
      },
      {
        title: '用 as_completed 却期望有序',
        bad: 'for f in asyncio.as_completed(tasks):\n    print(await f)   # 顺序是完成顺序',
        good: '需要顺序就用 gather；需要在完成时立刻处理才用 as_completed',
        note: 'as_completed 返回顺序与完成先后有关，不是传入顺序。'
      }
    ],
    practice: [
      {
        prompt: '并发调用 job(1)、job(2)、job(3)（每个 await asyncio.sleep(0.01) 后返回入参），打印 gather 结果。',
        starter: 'import asyncio\n\nasync def job(n):\n    await asyncio.sleep(0.01)\n    return n\n\nasync def main():\n    # TODO: gather 并发\n    pass\n\nasyncio.run(main())',
        answer: 'import asyncio\n\nasync def job(n):\n    await asyncio.sleep(0.01)\n    return n\n\nasync def main():\n    print(await asyncio.gather(job(1), job(2), job(3)))\n\nasyncio.run(main())',
        output: '[1, 2, 3]',
        hint: 'gather 的返回顺序固定等于传入顺序。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'asyncio.gather(*coros) 的返回值顺序是？',
        options: ['任务完成顺序', '传入顺序', '随机顺序', '按耗时排序'],
        answer: 1,
        explain: 'gather 按传入顺序返回结果，与完成先后无关。'
      },
      {
        type: 'judge',
        question: '批量并发调用外部接口时应该配合 Semaphore 限流和整体超时。',
        answer: true,
        explain: '不限流容易触发对方限流或把自己的连接池打满，超时则避免整体永久挂起。'
      }
    ]
  }
]
