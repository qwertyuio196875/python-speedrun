/**
 * 第五阶段：Python 高级特性（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'decorators',
    title: '装饰器',
    phase: 5,
    order: 1,
    minutes: 16,
    rating: { python: 4, java: 4, ai: 4 },
    summary: '装饰器是"接收函数并返回新函数"的函数，等价于 Java 的 AOP / 动态代理。',
    keywords: ['decorator', '装饰器', 'wraps', 'functools', '@', 'AOP', '动态代理', '重试'],
    tip: 'Java 开发者提示：装饰器 ≈ 动态代理 + 注解，但它在"定义时"就替换了函数对象，不需要容器或反射。',
    what: '装饰器的本质是函数：def deco(fn) 接收一个函数，返回一个包装后的函数，然后用 @deco 语法糖贴在目标函数上。它常用来做日志、计时、重试、权限校验——尤其适合包住 LLM 调用做重试和 token 统计。写装饰器一定要用 functools.wraps 保留原函数的元信息。',
    javaCompare: [
      {
        title: '不改业务代码加一层逻辑',
        java: '@Around("@annotation(Loggable)")\npublic Object log(ProceedingJoinPoint pjp) { ... }   // Spring AOP',
        python: '@log_calls\ndef call_llm(prompt):\n    ...',
        diff: 'Java 靠容器和代理在运行期织入；Python 在定义期直接用新函数替换原函数，几行代码就够。'
      }
    ],
    examples: [
      {
        title: '最小装饰器 + functools.wraps',
        code: 'import functools\n\ndef log_calls(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        print(f"调用 {fn.__name__}")\n        result = fn(*args, **kwargs)\n        print(f"返回 {result}")\n        return result\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    return a + b\n\nprint(add(1, 2))\nprint(add.__name__)',
        output: '调用 add\n返回 3\n3\nadd',
        note: '没有 functools.wraps 时，add.__name__ 会变成 "wrapper"，日志和文档都会错乱。'
      },
      {
        title: '带参数的装饰器：失败重试',
        code: 'import functools\n\ndef retry(times=3):\n    def deco(fn):\n        @functools.wraps(fn)\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return fn(*args, **kwargs)\n                except TimeoutError:\n                    print(f"第 {attempt} 次超时，重试")\n            raise RuntimeError(f"{fn.__name__} 重试 {times} 次仍失败")\n        return wrapper\n    return deco\n\n@retry(times=2)\ndef unstable():\n    raise TimeoutError("网络超时")\n\ntry:\n    unstable()\nexcept RuntimeError as e:\n    print("最终失败:", e)',
        output: '第 1 次超时，重试\n第 2 次超时，重试\n最终失败: unstable 重试 2 次仍失败',
        note: '带参数的装饰器是"三层函数"：外层收参数、中层收函数、内层收调用参数。'
      }
    ],
    pitfalls: [
      {
        title: '忘记 return wrapper',
        bad: 'def deco(fn):\n    def wrapper():\n        fn()\n# 没有 return，被装饰的函数变成 None',
        good: '    return wrapper',
        note: '函数变成 None 后调用会报 TypeError: \'NoneType\' object is not callable。'
      },
      {
        title: '忘记 functools.wraps',
        bad: 'def wrapper(*a, **kw):\n    return fn(*a, **kw)',
        good: '@functools.wraps(fn)\ndef wrapper(*a, **kw):\n    return fn(*a, **kw)',
        note: '丢掉 __name__/__doc__ 会让 FastAPI 的路由名、日志、pytest 用例名都变得难以排查。'
      },
      {
        title: '包装 async 函数用了普通装饰器',
        bad: 'def deco(fn):\n    def wrapper(*a, **kw):\n        return fn(*a, **kw)   # 返回的是 coroutine，没被 await',
        good: 'async def wrapper(*a, **kw):\n    return await fn(*a, **kw)',
        note: '包装 async def 必须写 async def wrapper 并 await，否则调用方拿到未执行的协程对象。'
      }
    ],
    practice: [
      {
        prompt: '写一个装饰器 timing，打印 "开始" 和 "结束"，装饰函数 hello，并调用 hello()。',
        starter: 'def timing(fn):\n    # TODO\n    pass\n\n@timing\ndef hello():\n    print("hi")\n\nhello()',
        answer: 'def timing(fn):\n    def wrapper(*args, **kwargs):\n        print("开始")\n        result = fn(*args, **kwargs)\n        print("结束")\n        return result\n    return wrapper\n\n@timing\ndef hello():\n    print("hi")\n\nhello()',
        output: '开始\nhi\n结束',
        hint: '别忘了 return wrapper，也别忘了把 fn 的返回值透传出去。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '@deco 加在函数定义上，实际发生了什么？',
        options: ['给函数加了注解元数据', '用 deco(fn) 的返回值替换了原来的函数名', '延迟执行函数', '把函数变成异步函数'],
        answer: 1,
        explain: '等价于 f = deco(f)，名字 f 指向被包装后的新函数。'
      },
      {
        type: 'judge',
        question: '写装饰器时使用 functools.wraps 只是为了好看，没有实际作用。',
        answer: false,
        explain: '它保留被包装函数的 __name__、__doc__ 等元信息，影响日志、文档和调试。'
      },
      {
        type: 'code',
        question: '补全装饰器内部的返回语句。',
        code: 'def deco(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    __________',
        answer: 'return wrapper',
        explain: '装饰器必须返回包装函数，否则外层函数名会变成 None。'
      }
    ]
  },
  {
    id: 'generators',
    title: 'yield 与生成器',
    phase: 5,
    order: 2,
    minutes: 14,
    rating: { python: 4, java: 4, ai: 4 },
    summary: '函数里有 yield 就变成生成器：惰性产出、一次一个值，流式输出与大文件处理的关键。',
    keywords: ['yield', 'generator', '生成器', '惰性', 'stream', '迭代器', '流式'],
    tip: 'Java 开发者提示：生成器 ≈ Iterator + 状态机，但只用普通函数的写法，不需要手写 hasNext/next。',
    what: '函数体中一旦出现 yield，调用它就不再执行函数体，而是返回一个生成器对象。每次 next() 才执行到下一个 yield，并"挂起"保存局部变量，下次从挂起处继续。这让"边算边给"成为可能：处理大文件、逐块读取 LLM 流式响应都不需要把全部数据放进内存。',
    javaCompare: [
      {
        title: '惰性序列',
        java: 'Stream.generate(() -> nextValue()).limit(3).forEach(System.out::println);',
        python: 'def count_up(n):\n    for i in range(1, n + 1):\n        yield i\n\nfor x in count_up(3):\n    print(x)',
        diff: 'Java 要构造 Stream 或手写 Iterator；Python 直接在函数里 yield，状态自动保存。'
      }
    ],
    examples: [
      {
        title: '生成器与 next',
        code: 'def count_up(n):\n    for i in range(1, n + 1):\n        yield i\n\ngen = count_up(3)\nprint(next(gen))\nprint(next(gen))\nprint(list(gen))',
        output: '1\n2\n[3]',
        note: '生成器只能顺序消费一次；list(gen) 会把剩余的全部取出。'
      },
      {
        title: '流式输出：逐块处理 LLM 响应',
        code: 'def fake_llm_stream(text):\n    for ch in text:\n        yield ch   # 真实场景里这里是 yield chunk.content\n\nchunks = []\nfor ch in fake_llm_stream("你好呀"):\n    chunks.append(ch)\n    print("收到:", ch)\nprint("共", len(chunks), "块")',
        output: '收到: 你\n收到: 好\n收到: 呀\n共 3 块',
        note: '这就是 FastAPI + SSE 实现"打字机效果"的核心结构。'
      },
      {
        title: '惰性处理大文件',
        code: 'def read_lines(lines):\n    for line in lines:\n        line = line.strip()\n        if line:\n            yield line\n\nlines = ["  第一行  ", "", "第二行"]\nprint(list(read_lines(lines)))\nprint(sum(1 for _ in read_lines(lines)))',
        output: "['第一行', '第二行']\n2",
        note: '换成 open(...) 就是真实的"逐行读大文件"，内存占用恒定。'
      }
    ],
    pitfalls: [
      {
        title: '生成器只能消费一次',
        bad: 'total = sum(gen)\ncount = sum(gen)   # 第二次是 0，已耗尽',
        good: 'values = list(gen)   # 需要多次遍历就先物化',
        note: '生成器是"一次性管道"，遍历完就空了，调试时容易困惑。'
      },
      {
        title: '以为函数体立刻执行',
        bad: 'gen = gen_func()   # 此时函数体一行都没跑',
        good: 'next(gen) 或 for x in gen 才开始执行',
        note: '没被消费的生成器里的错误不会抛出，日志也可能一行都没有。'
      },
      {
        title: '生成器里用 return 返回值',
        bad: 'def g():\n    return 1\n    yield 2   # 永远拿不到 1',
        good: '用普通函数或 yield from',
        note: 'return 在生成器里只表示结束，值通过 StopIteration.value 传递，实际很少用。'
      }
    ],
    practice: [
      {
        prompt: '写生成器 even(n)，依次产出 0 到 n 之间的偶数，并打印 list(even(6))。',
        starter: 'def even(n):\n    # TODO: 用 yield 产出偶数\n    pass\n\nprint(list(even(6)))',
        answer: 'def even(n):\n    for i in range(n + 1):\n        if i % 2 == 0:\n            yield i\n\nprint(list(even(6)))',
        output: '[0, 2, 4, 6]',
        hint: '函数里有 yield 就是生成器，不需要 return 列表。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '函数里出现 yield 之后，调用该函数会得到什么？',
        options: ['函数体的执行结果', '一个生成器对象', '一个列表', 'None'],
        answer: 1,
        explain: '调用只创建生成器，函数体在第一次被消费时才执行。'
      },
      {
        type: 'judge',
        question: '生成器表达式（小括号）与列表推导式（方括号）的区别是需要时才计算，节省内存。',
        answer: true,
        explain: '生成器惰性求值；列表推导式会立刻构造完整列表。'
      }
    ]
  },
  {
    id: 'context-manager',
    title: 'with 与上下文管理器',
    phase: 5,
    order: 3,
    minutes: 10,
    rating: { python: 3, java: 3, ai: 4 },
    summary: 'with 保证资源一定被释放，等价于 Java 的 try-with-resources。',
    keywords: ['with', 'context manager', '__enter__', '__exit__', 'contextlib', '资源管理'],
    tip: 'Java 开发者提示：with 就是 try-with-resources，对象实现 __enter__ / __exit__ 即可自动关闭。',
    what: 'with 用法是 with expr as name: 代码块。进入时调用对象的 __enter__（返回值绑定到 as 后面的名字），退出时无论如何都调用 __exit__，包括异常路径。文件、网络连接、数据库会话、锁都用它管理。不想写类时，可以用 contextlib.contextmanager 把一个生成器函数变成上下文管理器。',
    javaCompare: [
      {
        title: '自动关闭资源',
        java: 'try (var reader = new BufferedReader(new FileReader("a.txt"))) {\n    return reader.readLine();\n}',
        python: 'with open("a.txt", encoding="utf-8") as f:\n    return f.readline()',
        diff: 'with 更短，不需要声明类型，也不需要单独实现 AutoCloseable 接口。'
      }
    ],
    examples: [
      {
        title: '文件读写（最常用）',
        code: 'with open("demo.txt", "w", encoding="utf-8") as f:\n    f.write("你好\\n第二行")\n\nwith open("demo.txt", encoding="utf-8") as f:\n    print(f.readline().strip())\n    print(sum(1 for _ in f))',
        output: '你好\n1',
        note: 'as f 拿到的是文件对象；故意用两个 with 说明写出文件后必须重新打开才能从头读。'
      },
      {
        title: '自定义上下文管理器',
        code: 'class Timer:\n    def __init__(self, name):\n        self.name = name\n\n    def __enter__(self):\n        print(f"进入 {self.name}")\n        return self\n\n    def __exit__(self, exc_type, exc, tb):\n        print(f"离开 {self.name}, 异常={exc_type is not None}")\n        return False   # 返回 False 表示不吞掉异常\n\nwith Timer("LLM 调用") as t:\n    print("调用中")',
        output: '进入 LLM 调用\n调用中\n离开 LLM 调用, 异常=False',
        note: '真实项目里这里会记录耗时并写入日志，返回 True 会吞掉异常，通常不要这么做。'
      },
      {
        title: 'contextlib 简化写法',
        code: 'from contextlib import contextmanager\n\n@contextmanager\ndef tag(name):\n    print(f"<{name}>")\n    yield name\n    print(f"</{name}>")\n\nwith tag("prompt") as t:\n    print("内容", t)',
        output: '<prompt>\n内容 prompt\n</prompt>',
        note: 'yield 之前的代码相当于 __enter__，之后的相当于 __exit__。'
      }
    ],
    pitfalls: [
      {
        title: '忘记 encoding',
        bad: 'with open("out.txt", "w") as f: ...',
        good: 'with open("out.txt", "w", encoding="utf-8") as f: ...',
        note: 'Windows 默认 GBK，处理中文和多语言文本必须显式指定编码。'
      },
      {
        title: 'with 只能管住它包住的代码',
        bad: 'with open("a.txt") as f:\n    data = f.read()\nprint(f.read())   # 文件已关闭：ValueError: I/O operation on closed file',
        good: '需要的处理全部放在 with 块内',
        note: '不要在 with 块外使用已经关闭的资源。'
      },
      {
        title: '__exit__ 返回 True 吞掉异常',
        bad: 'def __exit__(self, *exc):\n    return True',
        good: 'def __exit__(self, *exc):\n    return False',
        note: '返回 True 会静默吞掉块内所有异常，调试时非常难查。'
      }
    ],
    practice: [
      {
        prompt: '用 with 把 "abc" 写入 data.txt（utf-8），再读出来打印。',
        starter: '# TODO: 用 with 写文件，再用 with 读出来打印\n',
        answer: 'with open("data.txt", "w", encoding="utf-8") as f:\n    f.write("abc")\n\nwith open("data.txt", encoding="utf-8") as f:\n    print(f.read())',
        output: 'abc',
        hint: '写入用 "w"，读取可省略模式（默认 "r"）。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'with 语句依赖对象的哪两个方法？',
        options: ['__init__ / __del__', '__enter__ / __exit__', 'open / close', 'start / stop'],
        answer: 1,
        explain: '进入块调用 __enter__，离开块（含异常）调用 __exit__。'
      },
      {
        type: 'judge',
        question: 'with 块内抛出异常时，__exit__ 不会被调用。',
        answer: false,
        explain: '__exit__ 一定会被调用，它通过参数收到异常信息。'
      }
    ]
  },
  {
    id: 'iterators',
    title: '可迭代对象与 itertools',
    phase: 5,
    order: 4,
    minutes: 10,
    rating: { python: 3, java: 2, ai: 3 },
    summary: '搞清楚"可迭代对象 vs 迭代器"，并用 itertools 做切片、链式拼接与分组。',
    keywords: ['iterable', 'iterator', 'iter', 'next', 'itertools', 'islice', 'chain'],
    tip: 'Java 开发者提示：Iterable 能被 for 遍历，Iterator 记录遍历位置；iter() 把前者变成后者。',
    what: '可迭代对象（list、dict、str、生成器）实现了 __iter__，迭代器实现了 __next__ 并记录当前位置。for 循环内部就是先 iter() 再不断 next()，直到 StopIteration。itertools 提供了 islice（惰性切片）、chain（拼接多个可迭代对象）、groupby、count 等工具，处理流式数据很方便。',
    javaCompare: [
      {
        title: '手动遍历',
        java: 'Iterator<String> it = list.iterator();\nwhile (it.hasNext()) { System.out.println(it.next()); }',
        python: 'it = iter(items)\nwhile True:\n    try:\n        print(next(it))\n    except StopIteration:\n        break',
        diff: 'Python 的迭代协议靠异常结束（StopIteration），实际写代码几乎只用 for，不用手写这段。'
      }
    ],
    examples: [
      {
        title: 'iter / next 与 for 的关系',
        code: 'items = [10, 20]\nit = iter(items)\nprint(next(it), next(it))\ntry:\n    next(it)\nexcept StopIteration:\n    print("遍历结束")',
        output: '10 20\n遍历结束',
        note: 'for 循环就是在做同样的事，只是自动处理 StopIteration。'
      },
      {
        title: 'islice 与 chain',
        code: 'from itertools import islice, chain\n\ndef stream():\n    i = 0\n    while True:\n        i += 1\n        yield i\n\nprint(list(islice(stream(), 3)))\nprint(list(chain([1, 2], ["a", "b"])))\nprint(list(islice(stream(), 2, 5)))',
        output: '[1, 2, 3]\n[1, 2, \'a\', \'b\']\n[3, 4, 5]',
        note: '无限流 + islice 就能安全地取前 N 个元素，这在处理流式 token 时很有用。'
      }
    ],
    pitfalls: [
      {
        title: '对迭代器用 len 或下标',
        bad: 'it = iter(items)\nprint(len(it))',
        good: 'items = list(it)   或   使用 itertools.islice 计数',
        note: '迭代器没有长度、不支持下标，需要这些能力就先转成 list（注意内存）。'
      },
      {
        title: '把同一个迭代器传给两处',
        bad: 'it = iter(items)\nhelper_a(it)\nhelper_b(it)   # it 已被 a 消耗完',
        good: '每处各传入原始可迭代对象（list 本身可重复遍历）',
        note: 'list 是可迭代对象，不是迭代器，可以反复 for；生成器和 iter(list) 的结果只能一次。'
      }
    ],
    practice: [
      {
        prompt: '用 islice 取自然数流的第 4~6 个（即 4、5、6）并打印。',
        starter: 'from itertools import islice\n\ndef naturals():\n    i = 0\n    while True:\n        i += 1\n        yield i\n\n# TODO: 打印第 4~6 个\n',
        answer: 'from itertools import islice\n\ndef naturals():\n    i = 0\n    while True:\n        i += 1\n        yield i\n\nprint(list(islice(naturals(), 3, 6)))',
        output: '[4, 5, 6]',
        hint: 'islice(seq, start, stop) 的下标从 0 开始，所以 4~6 对应 3:6。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '关于可迭代对象与迭代器，正确的是？',
        options: ['list 是迭代器', '迭代器能被多次 for 遍历', '迭代器记录遍历位置且一次性', '生成器可以 len()'],
        answer: 2,
        explain: 'list 是可迭代对象（可反复遍历）；迭代器保存位置，耗尽即止。'
      },
      {
        type: 'judge',
        question: 'itertools.islice 可以对无限生成器安全取前 N 个元素。',
        answer: true,
        explain: 'islice 惰性取够就停，不会尝试遍历整个序列。'
      }
    ]
  }
]
