/**
 * 第二阶段：Python 核心（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'list-comprehension',
    title: '列表推导式',
    phase: 2,
    order: 1,
    minutes: 10,
    rating: { python: 3, java: 2, ai: 4 },
    summary: '一行完成"遍历 + 过滤 + 变换"生成新列表，相当于 Java Stream 的 map/filter/collect。',
    keywords: ['list comprehension', '推导式', 'Stream', 'map', 'filter', '生成器表达式'],
    tip: 'Java 开发者提示：列表推导式 ≈ list.stream().map(...).filter(...).collect(toList())，但写法是一行。',
    what: '列表推导式用 [表达式 for 变量 in 可迭代对象 if 条件] 的形式，一次生成新列表。它比手写 for + append 更短、更快，也是 Python 里最常用的写法之一。同族还有字典推导式、集合推导式和生成器表达式（用小括号）。',
    javaCompare: [
      {
        title: '遍历 + 过滤 + 变换',
        java: 'List<Integer> doubled = nums.stream()\n    .filter(n -> n % 2 == 1)\n    .map(n -> n * 2)\n    .collect(Collectors.toList());',
        python: 'doubled = [n * 2 for n in nums if n % 2 == 1]',
        diff: 'Python 把整个流水线写成一行：表达式在前，条件在最后，顺序和 Stream 链相反。'
      }
    ],
    examples: [
      {
        title: '过滤 + 变换',
        code: 'nums = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in nums if n % 2 == 1]\nprint(doubled)',
        output: '[2, 6, 10]',
        note: '先写"结果是什么"，再写"从哪里来"和"条件"。'
      },
      {
        title: '带条件的表达式',
        code: 'words = ["hello", "world", "py"]\nprint([w.upper() if len(w) > 2 else w for w in words])\nprint([len(w) for w in words])',
        output: "['HELLO', 'WORLD', 'py']\n[5, 5, 2]",
        note: 'if 在最后是过滤；if/else 写在前面是"每个元素都产出"的取值分支。'
      },
      {
        title: '字典推导式与集合推导式',
        code: 'print({k: len(k) for k in ["a", "bb", "ccc"]})\nprint({n % 3 for n in range(7)})',
        output: "{'a': 1, 'bb': 2, 'ccc': 3}\n{0, 1, 2}",
        note: '处理 LLM 返回的 JSON 列表时，常用这种写法一次性抽字段或去重。'
      }
    ],
    pitfalls: [
      {
        title: '把复杂逻辑塞进推导式',
        bad: 'items = [f(x) if x else g(y) for x in xs for y in ys if y not in seen]',
        good: '# 超过两个条件就老老实实写成 for 循环，或者先算中间列表',
        note: '推导式适合"一眼能读懂"的转换，嵌套两层以上就该换成普通循环。'
      },
      {
        title: '嵌套循环的顺序',
        bad: '[x for x in range(2) for y in range(3)]   # 想要 [[0,1,2],[0,1,2]] 却写成这样',
        good: '[[y for y in range(3)] for x in range(2)]',
        note: '推导式里多个 for 是"笛卡尔积展平"，要生成二维列表必须用嵌套推导式。'
      },
      {
        title: '列表推导式 vs 生成器表达式',
        bad: 'total = sum([len(w) for w in words])   # 先造一个完整列表',
        good: 'total = sum(len(w) for w in words)    # 惰性生成，省内存',
        note: '只为聚合（sum/max/any）时用生成器表达式；RAG 场景处理大文档列表要注意内存。'
      }
    ],
    practice: [
      {
        prompt: '用列表推导式生成 1~10 的平方，打印结果。',
        starter: '# TODO: 用列表推导式生成 1~10 的平方，注意 range 右边界\n',
        answer: 'print([n * n for n in range(1, 11)])',
        output: '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]',
        hint: 'range(1, 11) 才是 1~10，右边界不含。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '列表推导式最接近 Java 的哪个特性？',
        options: ['数组初始化', 'Stream 的 map/filter/collect', '反射', '注解'],
        answer: 1,
        explain: '两者都是"声明式的遍历 + 变换 + 收集"，只是 Python 写成一行。'
      },
      {
        type: 'judge',
        question: '列表推导式一定比等价的 for 循环更省内存。',
        answer: false,
        explain: '列表推导式同样会一次性生成完整列表；省内存的是生成器表达式。'
      },
      {
        type: 'code',
        question: '补全推导式，取出 users 中所有 status 为 active 的 name。',
        code: 'users = [{"name": "张三", "status": "active"}, {"name": "李四", "status": "banned"}]\nnames = __________\nprint(names)',
        answer: '[u["name"] for u in users if u["status"] == "active"]',
        accept: ["[u['name'] for u in users if u['status'] == 'active']"],
        explain: '表达式写在最前面，过滤条件放最后，这是解析 JSON 列表的标准写法。'
      }
    ]
  },
  {
    id: 'dict-ops',
    title: '字典操作',
    phase: 2,
    order: 2,
    minutes: 12,
    rating: { python: 2, java: 1, ai: 5 },
    summary: 'dict 的常用读写、安全取值、合并与遍历；LLM 请求体和返回 JSON 都是 dict。',
    keywords: ['dict', 'get', 'setdefault', 'update', 'items', 'HashMap', '计数'],
    tip: 'Java 开发者提示：dict 就是 HashMap，但 [] 取不存在的键会抛 KeyError，Java 的 get 只是返回 null。',
    what: '字典操作集中在：取值用 get 给默认值、写入直接赋值、批量更新用 update 或 | 合并、遍历用 keys/values/items。字典是 Python 里最重要的数据结构：配置、请求体、LLM 返回的 JSON、Tool Calling 的参数都是 dict。',
    javaCompare: [
      {
        title: '安全取值与默认值',
        java: 'int age = map.getOrDefault("age", 0);',
        python: 'age = data.get("age", 0)',
        diff: '思路一致；区别是 Python 的 data["age"] 缺失时直接抛 KeyError，不像 Java 返回 null。'
      },
      {
        title: '遍历键值对',
        java: 'for (Map.Entry<String, Integer> e : map.entrySet()) {\n    System.out.println(e.getKey() + "=" + e.getValue());\n}',
        python: 'for k, v in data.items():\n    print(f"{k}={v}")',
        diff: 'items() 返回 (键, 值)，配合解包一步到位。'
      }
    ],
    examples: [
      {
        title: '取值与写入',
        code: 'user = {"name": "张三"}\nprint(user.get("age", "未知"))\nuser["age"] = 20\nuser.setdefault("city", "北京")\nprint(user)',
        output: '未知\n{\'name\': \'张三\', \'age\': 20, \'city\': \'北京\'}',
        note: 'setdefault 只在键不存在时写入，等价于 computeIfAbsent。'
      },
      {
        title: '最常见的计数统计',
        code: 'words = ["llm", "rag", "llm", "agent", "llm"]\ncounter = {}\nfor w in words:\n    counter[w] = counter.get(w, 0) + 1\nprint(counter)',
        output: "{'llm': 3, 'rag': 1, 'agent': 1}",
        note: '统计 token 用量、工具调用次数都用这个模式；也可以用 collections.Counter。'
      },
      {
        title: '合并与安全取深层字段',
        code: 'base = {"model": "deepseek-chat", "temperature": 0.7}\noverride = {"temperature": 0}\nmerged = {**base, **override}\nprint(merged)\nresp = {"choices": [{"message": {"content": "你好"}}]}\nprint(resp.get("choices", [{}])[0].get("message", {}).get("content"))',
        output: "{'model': 'deepseek-chat', 'temperature': 0}\n你好",
        note: '后者等价于 Java 里把 temperature 改成 0 的 builder 覆盖写法。'
      }
    ],
    pitfalls: [
      {
        title: '遍历时修改字典',
        bad: 'for k in data:\n    if data[k] is None:\n        del data[k]',
        good: 'data = {k: v for k, v in data.items() if v is not None}',
        note: '遍历中增删键会抛 RuntimeError: dictionary changed size during iteration。'
      },
      {
        title: '链式取深层字段会崩',
        bad: 'resp["choices"][0]["message"]["content"]',
        good: 'resp.get("choices", [{}])[0].get("message", {}).get("content", "")',
        note: 'LLM 返回结构可能缺字段（如报错时没有 choices），逐层 get 更稳。'
      },
      {
        title: '键必须先可哈希',
        bad: 'cache[[1, 2]] = "x"',
        good: 'cache[(1, 2)] = "x"',
        note: 'list 不能当键，tuple 可以；这也是缓存 key 要拼成 tuple 或字符串的原因。'
      }
    ],
    practice: [
      {
        prompt: '统计字符串 "aabbc" 中每个字符出现的次数，打印结果。',
        starter: 'text = "aabbc"\ncounts = {}\n# TODO: 遍历 text 计数\n',
        answer: 'text = "aabbc"\ncounts = {}\nfor ch in text:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)',
        output: "{'a': 2, 'b': 2, 'c': 1}",
        hint: 'counts.get(ch, 0) + 1 是计数模板，背下来直接用。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'data 中没有 "phone" 键时，下面哪种写法不会抛异常？',
        options: ['data["phone"]', 'data.get("phone")', 'data.pop("phone")', 'data["phone"] + ""'],
        answer: 1,
        explain: 'get 缺省返回 None（或指定的默认值）；pop 缺键也会抛 KeyError。'
      },
      {
        type: 'judge',
        question: '遍历字典时删除元素是安全的操作。',
        answer: false,
        explain: '会抛 RuntimeError，正确做法是生成一个新字典。'
      },
      {
        type: 'code',
        question: '补全代码，在没有 "retries" 键时写入默认值 3。',
        code: 'config = {}\nconfig.__________("retries", 3)\nprint(config)',
        answer: 'setdefault',
        explain: 'setdefault 只在键不存在时写值，等价于 Java 的 computeIfAbsent。'
      }
    ]
  },
  {
    id: 'strings-fstring',
    title: '字符串与 f-string',
    phase: 2,
    order: 3,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 5 },
    summary: '字符串切分、拼接、清洗与 f-string 格式化；Prompt 模板与 LLM 输出清洗都靠它。',
    keywords: ['string', 'f-string', 'format', 'split', 'join', 'strip', '正则', 'prompt'],
    tip: 'Java 开发者提示：字符串拼接用 join 而不是循环 +=，格式化用 f-string 而不是 String.format。',
    what: 'f-string 是 Python 3.6+ 的字符串格式化方式：在引号前加 f，用花括号嵌入表达式，支持格式说明符（{x:.2f}）和自文档写法（{x=}）。常用方法包括 strip、split、join、replace、startswith、lower、count。写 Prompt 时通常用三引号多行字符串 + f-string 变量插值。',
    javaCompare: [
      {
        title: '格式化输出',
        java: 'String s = String.format("%s 有 %d 条消息，平均 %.2f 秒", model, n, avg);',
        python: 's = f"{model} 有 {n} 条消息，平均 {avg:.2f} 秒"',
        diff: 'f-string 直接把变量写进字符串，格式说明符写在冒号后面，可读性更好。'
      },
      {
        title: '拼接列表',
        java: 'String.join(", ", list)',
        python: '", ".join(items)',
        diff: '分隔符是字符串字面量，被拼接的序列作为参数，刚好和 Java 的参数顺序相反。'
      }
    ],
    examples: [
      {
        title: 'f-string 常用格式化',
        code: 'model = "deepseek-chat"\ntokens = 1234\ncost = 0.012345\nprint(f"{model} 用了 {tokens} tokens")\nprint(f"花费 {cost:.2f} 元")\nprint(f"{cost=}")',
        output: 'deepseek-chat 用了 1234 tokens\n花费 0.01 元\ncost=0.012345',
        note: '{cost=} 会同时打印表达式和值，调试时非常好用。'
      },
      {
        title: '清洗 LLM 返回的文本',
        code: 'raw = "  你好，有什么可以帮助你的？  \\n"\nprint(repr(raw.strip()))\nprint(len("a,b,c".split(",")))',
        output: "'你好，有什么可以帮助你的？'\n3",
        note: 'strip 去掉首尾空白与换行；split 默认按空白切分，可传分隔符。'
      },
      {
        title: '多行 Prompt 模板',
        code: 'context = "Python 支持 async/await。"\nquestion = "Python 怎么做异步？"\nprompt = f"""请只根据下面的资料回答问题。\n资料：{context}\n问题：{question}\n"""\nprint(prompt.strip().splitlines()[0])',
        output: '请只根据下面的资料回答问题。',
        note: '三引号保留换行，非常适合组装系统提示词；strip 去掉首尾多余空行。'
      }
    ],
    pitfalls: [
      {
        title: 'f-string 里同类引号冲突',
        bad: 'f"名字是 {data["name"]}"',
        good: 'f"名字是 {data[\'name\']}"   # 3.12+ 也允许内层用同种引号',
        note: 'Python 3.12 之前内外引号不能相同，稳妥做法是外层双引号、内层单引号。'
      },
      {
        title: '循环里拼接字符串',
        bad: 'result = ""\nfor w in words:\n    result += w',
        good: 'result = "".join(words)',
        note: '字符串不可变，循环 += 每次都新建对象；join 一次完成，性能差距很明显。'
      },
      {
        title: '窗口环境下读写文件乱码',
        bad: 'open("out.txt", "w").write("中文")',
        good: 'open("out.txt", "w", encoding="utf-8")',
        note: 'Windows 默认编码可能是 GBK，处理中文文本务必显式指定 encoding。'
      }
    ],
    practice: [
      {
        prompt: '把 "  张三,20  " 清洗后拆成 name 和 age，用 f-string 打印 "姓名: 张三, 年龄: 20"。',
        starter: 'raw = "  张三,20  "\n# TODO: strip -> split -> 打印\n',
        answer: 'raw = "  张三,20  "\nname, age = raw.strip().split(",")\nprint(f"姓名: {name}, 年龄: {age}")',
        output: '姓名: 张三, 年龄: 20',
        hint: '方法可以链式调用：raw.strip().split(",")。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'f"{3.14159:.2f}" 的结果是？',
        options: ['3.14159', '3.14', '3.1', '3.142'],
        answer: 1,
        explain: ':.2f 表示保留两位小数的定点格式，结果是 "3.14"。'
      },
      {
        type: 'judge',
        question: 'Python 的字符串对象创建后不能原地修改。',
        answer: true,
        explain: 'str 不可变，所有"修改"方法都返回新字符串。'
      },
      {
        type: 'code',
        question: '补全代码，把列表拼接成以逗号分隔的字符串。',
        code: 'items = ["a", "b", "c"]\nprint(__________)',
        answer: '", ".join(items)',
        accept: ["','.join(items)", '",".join(items)'],
        explain: 'join 由分隔符调用，接收可迭代对象，是拼接列表的标准做法。'
      }
    ]
  },
  {
    id: 'unpacking',
    title: '解包',
    phase: 2,
    order: 4,
    minutes: 10,
    rating: { python: 3, java: 3, ai: 3 },
    summary: '一次取出多个值、用 * 收集剩余、交换变量、把参数摊开传给函数；Java 里没有等价写法。',
    keywords: ['unpacking', '解包', '星号', 'args', 'kwargs', '交换', 'tuple'],
    tip: 'Java 开发者提示：Java 取集合元素要逐个 get，Python 一条赋值就能同时解出多个值。',
    what: '解包（unpacking）是把序列或字典里的值一次分配给多个名字。左侧变量个数与右侧元素个数一致即可解包；用 *rest 收集多余元素；函数调用时用 *args 展开位置参数、**kwargs 展开关键字参数。这是 Python 特有的便利语法，读框架源码时会大量遇到。',
    javaCompare: [
      {
        title: '交换两个变量',
        java: 'int t = a; a = b; b = t;',
        python: 'a, b = b, a',
        diff: 'Python 右侧先打包成 tuple 再解包，不需要临时变量。'
      }
    ],
    examples: [
      {
        title: '基础解包与星号收集',
        code: 'point = (3, 5)\nx, y = point\nprint(x, y)\nfirst, *rest = [1, 2, 3, 4]\nprint(first, rest)\nhead, *mid, tail = "abcde"\nprint(head, mid, tail)',
        output: '3 5\n1 [2, 3, 4]\na [\'b\', \'c\', \'d\'] e',
        note: '*rest 收集成一个列表，可以放在中间位置。'
      },
      {
        title: '交换与忽略',
        code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)\n_, age = ("张三", 20)\nprint(age)',
        output: '2 1\n20',
        note: '下划线 _ 是"我不关心这个值"的约定写法。'
      },
      {
        title: '函数调用时展开参数',
        code: 'def call_llm(model, temperature, **options):\n    return f"model={model}, temperature={temperature}, options={options}"\n\nconfig = {"model": "deepseek-chat", "temperature": 0.2}\nprint(call_llm(**config, stream=True))',
        output: "model=deepseek-chat, temperature=0.2, options={'stream': True}",
        note: '把配置字典直接展开成关键字参数，是封装 LLM 客户端的常见做法。'
      }
    ],
    pitfalls: [
      {
        title: '数量不匹配',
        bad: 'a, b = [1, 2, 3]',
        good: 'a, b, *rest = [1, 2, 3]',
        note: '会抛 ValueError: too many values to unpack，需要星号或切片。'
      },
      {
        title: '字符串会被逐字符解包',
        bad: 'first, second = "python"',
        good: 'first, second = "python".split(" ")[0:2]   # 明确切分',
        note: '字符串也是序列，误写成解包会得到单个字符或直接报错。'
      },
      {
        title: '星号只能出现一次',
        bad: 'a, *b, *c = [1, 2, 3, 4]',
        good: 'a, *b, c = [1, 2, 3, 4]',
        note: '一个解包目标里只允许一个带星号的变量。'
      }
    ],
    practice: [
      {
        prompt: '用一行代码交换 x 与 y 的值并打印。',
        starter: 'x, y = "左", "右"\n# TODO: 交换并打印 x y\n',
        answer: 'x, y = "左", "右"\nx, y = y, x\nprint(x, y)',
        output: '右 左',
        hint: 'x, y = y, x 就是完整的一行。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'a, *b = [1, 2, 3] 之后，b 的值是？',
        options: ['2', '[2, 3]', '(2, 3)', '报错'],
        answer: 1,
        explain: '带星号的变量收集剩余元素，类型是 list。'
      },
      {
        type: 'judge',
        question: '**kwargs 在函数调用时用于展开字典为关键字参数。',
        answer: true,
        explain: '定义时 **kwargs 收集关键字参数，调用时 **dict 展开它们。'
      }
    ]
  },
  {
    id: 'lambda',
    title: 'lambda 与高阶函数',
    phase: 2,
    order: 5,
    minutes: 8,
    rating: { python: 2, java: 2, ai: 4 },
    summary: '匿名函数 lambda 与 sorted/max/map/filter 的组合，等价于 Java 的函数式接口。',
    keywords: ['lambda', 'sorted', 'map', 'filter', 'key', '函数式', 'Comparator'],
    tip: 'Java 开发者提示：lambda 相当于 Java 的 lambda 表达式，但只能写一个表达式，不能有语句块。',
    what: 'lambda 定义一个匿名函数，语法是 lambda 参数: 表达式，只能有一个表达式、不能写赋值或 return。它最常见的用途是给 sorted、max、min、map、filter 提供 key 或函数参数。实际项目里优先考虑推导式，只有"传给别的函数一小段逻辑"时才用 lambda。',
    javaCompare: [
      {
        title: '按字段排序',
        java: 'users.sort(Comparator.comparing(User::getAge));',
        python: 'users.sort(key=lambda u: u["age"])',
        diff: 'Python 用 key 函数取排序依据，不需要实现 Comparator 接口。'
      }
    ],
    examples: [
      {
        title: '按字段排序',
        code: 'users = [{"name": "张三", "age": 30}, {"name": "李四", "age": 22}]\nprint([u["name"] for u in sorted(users, key=lambda u: u["age"])])\nprint(max(users, key=lambda u: u["age"])["name"])',
        output: "['李四', '张三']\n张三",
        note: 'sorted 返回新列表；users.sort() 则原地排序。'
      },
      {
        title: '多级排序与 map/filter',
        code: 'rows = [("b", 2), ("a", 3), ("a", 1)]\nprint(sorted(rows, key=lambda r: (r[0], r[1])))\nprint(list(map(lambda n: n * 2, [1, 2, 3])))\nprint(list(filter(lambda n: n > 1, [1, 2, 3])))',
        output: "[('a', 1), ('a', 3), ('b', 2)]\n[2, 4, 6]\n[2, 3]",
        note: 'key 返回 tuple 就是按多个字段排序；map/filter 也可以用推导式替代。'
      }
    ],
    pitfalls: [
      {
        title: '闭包晚绑定',
        bad: 'fns = [lambda: i for i in range(3)]  # 全部返回 2',
        good: 'fns = [lambda i=i: i for i in range(3)]',
        note: 'lambda 里的 i 是定义时捕获名字、调用时才取值，所以都是最后一个值。'
      },
      {
        title: '在 lambda 里写语句',
        bad: 'lambda x: x = 1',
        good: 'def set_one(x):\n    ...',
        note: 'lambda 只能包含表达式，赋值、print 这类语句都要用 def。'
      },
      {
        title: '以为 sorted 会原地排序',
        bad: 'sorted(nums)   # 忽略了返回值，nums 没变',
        good: 'nums = sorted(nums)   或   nums.sort()',
        note: 'sorted 返回新列表，list.sort() 才是原地排序且返回 None。'
      }
    ],
    practice: [
      {
        prompt: '按 age 从小到大排序并打印所有人的名字。',
        starter: 'users = [{"name": "张三", "age": 30}, {"name": "李四", "age": 22}]\n# TODO: 排序后打印 name\n',
        answer: 'users = [{"name": "张三", "age": 30}, {"name": "李四", "age": 22}]\nfor u in sorted(users, key=lambda u: u["age"]):\n    print(u["name"])',
        output: '李四\n张三',
        hint: 'sorted(users, key=lambda u: u["age"])。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '关于 Python lambda，下面说法正确的是？',
        options: ['可以有多个表达式', '可以包含 return 语句', '只能有一个表达式', '必须有名字'],
        answer: 2,
        explain: 'lambda 的语法限制就是"单个表达式"，返回值就是该表达式的值。'
      },
      {
        type: 'judge',
        question: 'sorted(items, key=...) 会修改原列表。',
        answer: false,
        explain: 'sorted 返回新列表；要原地排序用 items.sort()。'
      }
    ]
  },
  {
    id: 'exceptions',
    title: '异常处理',
    phase: 2,
    order: 6,
    minutes: 12,
    rating: { python: 2, java: 1, ai: 4 },
    summary: 'try/except/else/finally、自定义异常与 raise from；Python 没有 checked 异常。',
    keywords: ['try', 'except', 'finally', 'raise', '异常', 'Exception', 'EAFP'],
    tip: 'Java 开发者提示：Python 没有 checked 异常，方法签名不声明 throws，所有异常都是运行期的。',
    what: '异常处理用 try / except / else / finally：except 按类型捕获，else 在没出错时执行，finally 一定执行（清理资源）。所有异常都继承自 BaseException，业务异常一般继承 Exception。抛出用 raise，链式保留原始原因用 raise ... from err。',
    javaCompare: [
      {
        title: '捕获异常',
        java: 'try {\n    risky();\n} catch (IOException e) {\n    log.error("失败", e);\n}',
        python: 'try:\n    risky()\nexcept OSError as e:\n    print("失败", e)',
        diff: 'except 用类名匹配并可 as 绑定变量；没有 checked/unchecked 之分。'
      },
      {
        title: '自定义异常',
        java: 'class BizException extends RuntimeException { ... }',
        python: 'class BizError(Exception):\n    pass',
        diff: 'Python 一个 pass 就够了，不需要写构造方法。'
      }
    ],
    examples: [
      {
        title: '多种异常与 else/finally',
        code: 'def parse(text):\n    try:\n        value = int(text)\n    except ValueError as e:\n        print("不是数字:", e)\n    else:\n        print("解析成功:", value)\n    finally:\n        print("完成")\n\nparse("42")\nparse("abc")',
        output: '解析成功: 42\n完成\n不是数字: invalid literal for int() with base 10: \'abc\'\n完成',
        note: 'else 只在没有异常时执行，finally 无论成功失败都执行。'
      },
      {
        title: '自定义异常与 raise from',
        code: 'class LLMError(Exception):\n    pass\n\ndef call_llm():\n    try:\n        raise TimeoutError("连接超时")\n    except TimeoutError as e:\n        raise LLMError("模型调用失败, 请重试") from e\n\ntry:\n    call_llm()\nexcept LLMError as e:\n    print(type(e).__name__, e)\n    print(type(e.__cause__).__name__)',
        output: 'LLMError 模型调用失败, 请重试\nTimeoutError',
        note: 'from e 保留原始异常（__cause__），排错时能看到根因。'
      }
    ],
    pitfalls: [
      {
        title: '裸 except 吞掉一切',
        bad: 'try:\n    work()\nexcept:\n    pass',
        good: 'try:\n    work()\nexcept (ValueError, OSError) as e:\n    logger.warning("跳过: %s", e)',
        note: '裸 except 连 Ctrl+C 都可能吞掉，还会掩盖真实 bug，是代码评审重点。'
      },
      {
        title: '捕获范围过宽',
        bad: 'try:\n    data = json.loads(text)\n    return data["choices"][0]\nexcept Exception:\n    return {}',
        good: '# 只包住可能出错的一行，并记录日志',
        note: '把整段逻辑包进 try 会让真正的逻辑 bug 变成"静默返回空值"。'
      },
      {
        title: '异常变量在 except 外不可用',
        bad: 'except ValueError as e:\n    pass\nprint(e)   # NameError',
        good: 'except ValueError as e:\n    msg = str(e)\nprint(msg)',
        note: 'Python 3 在 except 块结束后会删除 e，需要先存到别的变量。'
      }
    ],
    practice: [
      {
        prompt: '写一个函数 safe_int(text)，转换失败时返回 None（不要抛异常）。',
        starter: 'def safe_int(text):\n    # TODO\n    pass\n\nprint(safe_int("42"))\nprint(safe_int("abc"))',
        answer: 'def safe_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None\n\nprint(safe_int("42"))\nprint(safe_int("abc"))',
        output: '42\nNone',
        hint: '只捕获 ValueError，不要用裸 except。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 与 Java 异常机制的主要区别是？',
        options: ['没有 try/catch 概念', '没有 checked 异常，不需要在签名里声明', '不能自定义异常', '异常不能嵌套'],
        answer: 1,
        explain: 'Python 所有异常都是运行期的，方法签名不声明 throws。'
      },
      {
        type: 'judge',
        question: 'finally 块只在发生异常时执行。',
        answer: false,
        explain: 'finally 无论是否发生异常都会执行，常用于释放资源。'
      },
      {
        type: 'code',
        question: '补全捕获语句，捕获 ValueError 并绑定为 e。',
        code: 'try:\n    n = int("abc")\n__________ ValueError as e:\n    print("转换失败", e)',
        answer: 'except',
        explain: 'Python 用 except 类名 as 变量 的形式绑定异常对象。'
      }
    ]
  },
  {
    id: 'ternary-any-all',
    title: '三元表达式与 all / any',
    phase: 2,
    order: 7,
    minutes: 8,
    rating: { python: 2, java: 2, ai: 3 },
    summary: '条件表达式 A if c else B，以及 all/any 做一些"全满足/存在满足"的校验。',
    keywords: ['ternary', '三元', 'any', 'all', '真值', '校验', 'anyMatch'],
    tip: 'Java 开发者提示：all/any 相当于 Stream 的 allMatch / anyMatch，但接收的是可迭代对象。',
    what: '条件表达式的语法是 A if 条件 else B，它是表达式而不是语句，所以可以直接写在赋值、return、函数参数里。all 判断是否全部为真、any 判断是否存在真值，两者都会短路。配合生成器表达式，可以一行完成参数校验，这在 Tool Calling 的参数检查里很常见。',
    javaCompare: [
      {
        title: '存在/全部判断',
        java: 'boolean ok = items.stream().allMatch(i -> i.size() > 0);',
        python: 'ok = all(len(i) > 0 for i in items)',
        diff: 'any/all 直接吃生成器表达式，不需要先 collect。'
      }
    ],
    examples: [
      {
        title: '条件表达式',
        code: 'temp = 0.2\nlabel = "确定性高" if temp < 0.5 else "更发散"\nprint(label)\nprint(["-" if n else "*" for n in [0, 1, 0, 1]])',
        output: '确定性高\n[\'*\', \'-\', \'*\', \'-\']',
        note: '注意顺序：先写"条件成立时的值"，条件写在中间。'
      },
      {
        title: 'all / any 校验参数',
        code: 'args = {"city": "北京", "days": 3}\nrequired = ["city", "days"]\nprint(all(k in args for k in required))\nprint(any(v is None for v in args.values()))\nprint(any([False, False, True]), all([]))',
        output: 'True\nFalse\nTrue True',
        note: '空集合的 all 是 True（真空真），校验时要注意这一点。'
      }
    ],
    pitfalls: [
      {
        title: '嵌套三元难读',
        bad: 'grade = "A" if s > 90 else "B" if s > 60 else "C"',
        good: 'if s > 90:\n    grade = "A"\nelif s > 60:\n    grade = "B"',
        note: '超过一层嵌套就改用 if/elif，可读性优先。'
      },
      {
        title: 'all([]) 是 True',
        bad: 'if all(x["ok"] for x in results):  # results 为空时也为真',
        good: 'if results and all(x["ok"] for x in results):',
        note: '空列表的 all 返回 True、any 返回 False，这是数学上的约定。'
      }
    ],
    practice: [
      {
        prompt: '给定用户字典，判断是否所有用户都已激活（active 为 True），打印结果。',
        starter: 'users = [{"active": True}, {"active": False}]\n# TODO: 用 all 判断并打印\n',
        answer: 'users = [{"active": True}, {"active": False}]\nprint(all(u["active"] for u in users))',
        output: 'False',
        hint: 'all(u["active"] for u in users) 会短路，遇到 False 立刻返回。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print(any([]), all([])) 的结果是？',
        options: ['False False', 'False True', 'True False', 'True True'],
        answer: 1,
        explain: 'any([]) 没有任何真值所以是 False；all([]) 是"真空真"，返回 True。'
      },
      {
        type: 'judge',
        question: 'x = "有值" if flag else "无值" 是合法的 Python 语句。',
        answer: true,
        explain: '条件表达式是表达式，可以直接用于赋值。'
      }
    ]
  }
]
