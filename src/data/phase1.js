/**
 * 第一阶段：快速基础（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'variables',
    title: '变量与数据类型',
    phase: 1,
    order: 1,
    minutes: 10,
    rating: { python: 1, java: 1, ai: 3 },
    summary: 'Python 变量是"名字绑对象"，不需要声明类型；掌握 int/float/str/bool/None 与动态类型。',
    keywords: ['variable', 'type', 'int', 'float', 'str', 'bool', 'None', '动态类型'],
    tip: 'Java 开发者提示：把变量当成"贴着名字的便利贴"，类型属于对象而不是变量，随时可换。',
    what: 'Python 里没有变量声明，赋值即创建。类型信息挂在对象上，同一个名字可以先指向 int、后指向 str，这就是动态类型。内置标量类型只有 int、float、str、bool 和空值 None，整数不区分 int/long/short，也不会溢出。',
    javaCompare: [
      {
        title: '声明并初始化变量',
        java: 'int age = 20;\nString name = "张三";',
        python: 'age = 20\nname = "张三"',
        diff: 'Python 不写类型、不写分号；类型由右侧值决定。'
      },
      {
        title: '常量与不可变',
        java: 'final double PI = 3.14;',
        python: 'PI = 3.14  # 约定：全大写表示"请不要改"',
        diff: 'Python 没有 final/const，只能靠命名约定；真正的不可变对象是 int、str、tuple 这些。'
      }
    ],
    examples: [
      {
        title: '一次赋值多个变量',
        code: 'name, age, score = "张三", 20, 91.5\nprint(name, age, score)\nprint(type(age), type(score))',
        output: '张三 20 91.5\n<class \'int\'> <class \'float\'>',
        note: '多个值可以一次解包赋值；type() 相当于运行期的 getClass()。'
      },
      {
        title: '动态类型与空值',
        code: 'value = 10\nvalue = "现在是字符串"\nprint(value)\nempty = None\nprint(empty is None)',
        output: '现在是字符串\nTrue',
        note: '判空统一用 is None，不要写 == None。'
      },
      {
        title: '布尔与真假判断',
        code: 'print(bool(0), bool(""), bool([]), bool("0"))\nprint(1 == 1.0, 7 // 2, 7 % 2, 2 ** 10)',
        output: 'False False False True\nTrue 3 1 1024',
        note: '空值在条件判断里都是假；`0` 是非空字符串，所以为真。'
      }
    ],
    pitfalls: [
      {
        title: '整数除法与整除',
        bad: 'print(7 / 2)      # 3.5\nprint(7 // 2)     # 3',
        good: 'ratio = 7 / 2    # 需要小数用 /\ncount = 7 // 2    # 需要整数商用 //',
        note: 'Java 的 / 对 int 是整除，Python 的 / 永远是浮点除法，整数商要用 //。'
      },
      {
        title: '字符串与数字拼接',
        bad: '"年龄:" + 20',
        good: 'f"年龄:{age}"',
        note: 'Python 不做隐式类型转换，str + int 会抛 TypeError，用 f-string 或 str() 转换。'
      },
      {
        title: '可变与不可变',
        bad: 'a = [1, 2]\nb = a\nb.append(3)   # a 也变成 [1, 2, 3]',
        good: 'b = list(a)   # 复制后再改',
        note: '赋值只是让两个名字指向同一个对象；list 是可变对象，改一个等于改全体。'
      }
    ],
    practice: [
      {
        prompt: '定义一个变量保存你的名字，一个变量保存年龄，然后打印 "name=张三 age=20" 这种格式。',
        starter: 'name = "张三"\nage = 20\n# TODO: 用 f-string 打印 name=张三 age=20\n',
        answer: 'name = "张三"\nage = 20\nprint(f"name={name} age={age}")',
        output: 'name=张三 age=20',
        hint: 'f-string 写法：在引号前加 f，变量用花括号包起来。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 中的 None 最接近 Java 的哪个概念？',
        options: ['null', 'void', 'false', 'Optional'],
        answer: 0,
        explain: 'None 是唯一的空值单例对象，对应 Java 的 null；void 表示没有返回值，语义不同。'
      },
      {
        type: 'judge',
        question: 'Python 中同一个变量可以先保存 int，之后保存 str。',
        answer: true,
        explain: '这是动态类型的表现：类型属于对象，不属于变量名。'
      },
      {
        type: 'code',
        question: '补全代码，打印 "年龄: 20"（使用 f-string）。',
        code: 'age = 20\nprint(__________)',
        answer: 'f"年龄: {age}"',
        accept: ['f"年龄: {age}"', "f'年龄: {age}'", 'f"年龄: {age}" '.trim()],
        explain: 'f-string 在运行时把表达式插入字符串，等价于 Java 的 String.format 或模板字符串。'
      }
    ]
  },
  {
    id: 'operators',
    title: '运算符与类型转换',
    phase: 1,
    order: 2,
    minutes: 8,
    rating: { python: 1, java: 1, ai: 2 },
    summary: 'Python 多出 ** 幂、// 整除、链式比较和 and/or/not，类型转换靠 int()/float()/str() 显式调用。',
    keywords: ['operator', '算术', '比较', 'and', 'or', 'not', '类型转换', 'int()', 'str()'],
    tip: 'Java 开发者提示：逻辑运算符是 and / or / not，不是 && / || / !。',
    what: '算术运算符基本一致，新增 ** 表示幂、// 表示整除。比较运算符支持链式写法，1 <= x <= 10 就是合法表达式。逻辑运算符用 and、or、not，并且返回的是操作数本身而不一定是布尔值。类型转换全部通过构造函数式的调用完成，例如 int("42")。',
    javaCompare: [
      {
        title: '逻辑运算',
        java: 'if (a != null && a.size() > 0) { }',
        python: 'if a and len(a) > 0:',
        diff: 'Python 用 and/or/not；且 and 返回操作数本身，可用于"取默认值"。'
      },
      {
        title: '类型转换',
        java: 'Integer.parseInt("42")',
        python: 'int("42")',
        diff: 'Python 直接用类型名当转换函数，没有包装类。'
      }
    ],
    examples: [
      {
        title: '算术与链式比较',
        code: 'x = 2 ** 10\nprint(x, 10 // 3, 10 % 3, -7 // 2)\nprint(1 <= 5 <= 10)\nprint(3 < 2 < 5)',
        output: '1024 3 1 -4\nTrue\nFalse',
        note: '链式比较等价于 (1 <= 5) and (5 <= 10)，写起来更接近数学。'
      },
      {
        title: 'and / or 的返回值',
        code: 'print(0 or "默认值")\nprint("有值" or "默认值")\nprint(1 and 2)',
        output: '默认值\n有值\n2',
        note: 'or 返回第一个真值，and 返回第一个假值，这是 Python 的短路取值习惯。'
      },
      {
        title: '类型转换与陷阱',
        code: 'print(int("42"), float("3.5"), str(3.5) + "!")\nprint(int(3.99), int("  7  "))',
        output: '42 3.5 3.5!\n3 7',
        note: 'int() 对 float 是截断（向零取整），不是四舍五入；字符串两端空白会被忽略。'
      }
    ],
    pitfalls: [
      {
        title: '假值列表',
        bad: 'if x == None: ...',
        good: 'if x is None: ...',
        note: '0、0.0、""、[]、{}、None 在条件里都为 False；判空值请用 is None。'
      },
      {
        title: '浮点精度',
        bad: 'print(0.1 + 0.2 == 0.3)',
        good: 'print(abs(0.1 + 0.2 - 0.3) < 1e-9)',
        note: '和 Java 的 double 一样有二进制精度问题，比较浮点数要留容差。'
      }
    ],
    practice: [
      {
        prompt: '把字符串 "18" 转成整数并加 2，打印结果。',
        starter: 'age_text = "18"\n# TODO: 转成 int，加 2，打印\n',
        answer: 'age_text = "18"\nprint(int(age_text) + 2)',
        output: '20',
        hint: 'Python 不做隐式转换，"18" + 2 会直接报 TypeError。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print(7 // 2, 7 % 2) 的输出是？',
        options: ['3.5 1', '3 1', '3 0', '4 1'],
        answer: 1,
        explain: '// 是整除（向下取整），% 取余数，7 = 3 * 2 + 1。'
      },
      {
        type: 'judge',
        question: 'Python 中 and 的结果一定是 True 或 False。',
        answer: false,
        explain: 'and/or 返回其中一个操作数本身，例如 1 and 2 的结果是 2。'
      }
    ]
  },
  {
    id: 'control-flow',
    title: '条件判断',
    phase: 1,
    order: 3,
    minutes: 8,
    rating: { python: 1, java: 1, ai: 2 },
    summary: '用缩进代替大括号，if / elif / else 与三目表达式的写法。',
    keywords: ['if', 'elif', 'else', '缩进', '三元表达式', '条件'],
    tip: 'Java 开发者提示：Python 没有大括号，也没有 switch 的常用写法（3.10+ 有 match）。',
    what: '条件判断只有 if、elif、else 三个关键字，条件后面必须有冒号，靠缩进（推荐 4 个空格）划分代码块。Python 用缩进表达"块"而不是花括号，所以缩进不一致会直接抛 IndentationError，不存在格式宽松的余地。',
    javaCompare: [
      {
        title: '多分支',
        java: 'if (score >= 90) { grade = "A"; }\nelse if (score >= 60) { grade = "B"; }\nelse { grade = "C"; }',
        python: 'if score >= 90:\n    grade = "A"\nelif score >= 60:\n    grade = "B"\nelse:\n    grade = "C"',
        diff: 'else if 缩写成 elif；代码块用缩进表示，条件后加冒号。'
      }
    ],
    examples: [
      {
        title: '基本分支',
        code: 'score = 72\nif score >= 90:\n    grade = "A"\nelif score >= 60:\n    grade = "B"\nelse:\n    grade = "C"\nprint(grade)',
        output: 'B',
        note: '缩进必须是 4 的倍数且同级对齐，混用空格和 Tab 会报错。'
      },
      {
        title: '条件表达式（Python 三元）',
        code: 'age = 17\nlabel = "成年" if age >= 18 else "未成年"\nprint(label)',
        output: '未成年',
        note: '语法是 A if 条件 else B，和 Java 的 条件 ? A : B 顺序不同。'
      },
      {
        title: '成员判断与 None 判断',
        code: 'role = "admin"\nprint(role in ("admin", "root"))\nname = None\nif name is None:\n    name = "匿名"\nprint(name)',
        output: 'True\n匿名',
        note: 'in 可以直接判断是否在容器里，替代 contains() 调用。'
      }
    ],
    pitfalls: [
      {
        title: '把 = 写成 ==',
        bad: 'if x = 1: ...',
        good: 'if x == 1: ...',
        note: 'Python 里赋值不是表达式，if x = 1 是语法错误，比 Java 里少一种隐蔽 bug。'
      },
      {
        title: '空代码块',
        bad: 'if ready:\n\nprint("go")',
        good: 'if ready:\n    pass',
        note: '块内不能为空，占位用 pass（相当于 Java 的空语句块）。'
      }
    ],
    practice: [
      {
        prompt: '判断一个数是正数、负数还是零，并打印 正数/负数/零。',
        starter: 'n = -3\n# TODO: 用 if / elif / else 判断并打印\n',
        answer: 'n = -3\nif n > 0:\n    print("正数")\nelif n < 0:\n    print("负数")\nelse:\n    print("零")',
        output: '负数',
        hint: '三个分支依次是 n > 0、n < 0、其他。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 中用哪个关键字表示 Java 的 else if？',
        options: ['elseif', 'elsif', 'elif', 'else if'],
        answer: 2,
        explain: 'Python 的写法是 elif，可以连续使用多个。'
      },
      {
        type: 'judge',
        question: 'Python 的代码块可以写在 if 条件的同一行（用冒号加语句）。',
        answer: true,
        explain: '简短语句允许写成 if x > 0: print("ok")，但不推荐在复杂逻辑中使用。'
      },
      {
        type: 'code',
        question: '补全条件表达式：如果是偶数打印 even，否则打印 odd。',
        code: 'n = 7\nprint("even" if __________ else "odd")',
        answer: 'n % 2 == 0',
        explain: '条件表达式语法为 值1 if 条件 else 值2，条件写在中间。'
      }
    ]
  },
  {
    id: 'loops',
    title: '循环',
    phase: 1,
    order: 4,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 3 },
    summary: 'for 直接遍历元素（没有长度就是个迭代器），range 生成序列，while 与 break/continue/else。',
    keywords: ['for', 'while', 'range', 'enumerate', 'break', 'continue', '循环', '迭代'],
    tip: 'Java 开发者提示：Python 的 for 是 for-each 的加强版，没有 for(i=0;i<n;i++) 这种结构。',
    what: 'for 用来遍历任何可迭代对象——列表、字符串、字典、文件、生成器都可以，不需要下标。需要序号时用 enumerate，需要区间时用 range。while 基于条件循环；两者都可以用 break 跳出、continue 跳过本次，并且都有一个容易忽略的 for/while ... else 子句（循环没有被 break 打断时执行）。',
    javaCompare: [
      {
        title: '遍历集合',
        java: 'for (String name : names) {\n    System.out.println(name);\n}',
        python: 'for name in names:\n    print(name)',
        diff: '写法几乎一样，但 Python 的 for 后面直接跟可迭代对象，没有类型声明。'
      },
      {
        title: '带下标的循环',
        java: 'for (int i = 0; i < names.size(); i++) {\n    System.out.println(i + ":" + names.get(i));\n}',
        python: 'for i, name in enumerate(names):\n    print(f"{i}:{name}")',
        diff: 'enumerate 一次给出下标和元素，避免手动维护计数器。'
      }
    ],
    examples: [
      {
        title: 'for + range + enumerate',
        code: 'total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)\n\nfor idx, ch in enumerate("abc"):\n    print(idx, ch)',
        output: '10\n0 a\n1 b\n2 c',
        note: 'range(1, 5) 生成 1,2,3,4（右边界不含），和 Java 的 for 循环边界一致。'
      },
      {
        title: 'while 与 zip',
        code: 'n = 3\nwhile n > 0:\n    print("倒计时", n)\n    n -= 1\n\nfor name, age in zip(["张三", "李四"], [20, 22]):\n    print(name, age)',
        output: '倒计时 3\n倒计时 2\n倒计时 1\n张三 20\n李四 22',
        note: 'zip 把多个序列按位置配对，等价于同时遍历两个列表。'
      },
      {
        title: 'break / continue',
        code: 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    if i > 6:\n        break\n    print(i)',
        output: '1\n3\n5',
        note: 'continue 跳过本次，break 直接结束整个循环，语义与 Java 相同。'
      }
    ],
    pitfalls: [
      {
        title: '边遍历边删除元素',
        bad: 'for x in nums:\n    if x < 0:\n        nums.remove(x)',
        good: 'nums = [x for x in nums if x >= 0]',
        note: '遍历时修改列表会跳元素，标准做法是生成新列表。'
      },
      {
        title: 'range 的右边界不含',
        bad: 'for i in range(1, 5):   # 只到 4',
        good: 'for i in range(1, 6):   # 1..5',
        note: 'range(start, stop) 是左闭右开；只写一个参数时从 0 开始。'
      },
      {
        title: '循环里累加字符串',
        bad: 's = ""\nfor x in items:\n    s += str(x)',
        good: 's = "".join(str(x) for x in items)',
        note: '字符串不可变，循环里 += 会不断创建新对象，用 join 一次拼好。'
      }
    ],
    practice: [
      {
        prompt: '遍历 numbers，只打印其中的偶数。',
        starter: 'numbers = [1, 2, 3, 4, 5, 6]\n# TODO: 只打印偶数\n',
        answer: 'numbers = [1, 2, 3, 4, 5, 6]\nfor n in numbers:\n    if n % 2 == 0:\n        print(n)',
        output: '2\n4\n6',
        hint: '循环里用 if n % 2 == 0 过滤。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'range(3) 会生成哪些值？',
        options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'],
        answer: 1,
        explain: 'range(3) 等价于 range(0, 3)，即 0、1、2。'
      },
      {
        type: 'judge',
        question: 'Python 的 for 循环可以直接遍历字典，拿到的是 key。',
        answer: true,
        explain: '遍历 dict 默认拿 key；要同时取 key 和 value 用 items()。'
      },
      {
        type: 'code',
        question: '补全代码，同时拿到下标和元素并打印。',
        code: 'for i, name in __________:\n    print(i, name)',
        answer: 'enumerate(names)',
        accept: ['enumerate(names)'],
        explain: 'enumerate 把序列包装成 (下标, 元素) 的迭代器。'
      }
    ]
  },
  {
    id: 'functions',
    title: '函数',
    phase: 1,
    order: 5,
    minutes: 14,
    rating: { python: 2, java: 2, ai: 4 },
    summary: 'def 定义函数、参数默认值与关键字传参、返回值可以是多个，函数是一等对象。',
    keywords: ['def', '函数', '参数', 'default', 'kwargs', '返回值', 'return', '一等对象'],
    tip: 'Java 开发者提示：Python 没有重载（overload），但默认参数、*args/**kwargs 能覆盖大部分场景。',
    what: '用 def 定义函数，函数体靠缩进。参数支持默认值、关键字传参、可变位置参数 *args 和可变关键字参数 **kwargs。函数没有 return 时返回 None；返回多个值其实是返回一个 tuple，接收端自动解包。函数本身也是对象，可以赋给变量、当参数传递——这是后面装饰器和高阶用法的基础。',
    javaCompare: [
      {
        title: '定义与调用',
        java: 'int add(int a, int b) { return a + b; }',
        python: 'def add(a, b):\n    return a + b',
        diff: '不写返回类型和参数类型；用 def 关键字；缩进代替花括号。'
      },
      {
        title: '默认参数',
        java: 'int add(int a) { return add(a, 1); }   // 需要重载',
        python: 'def add(a, b=1):\n    return a + b',
        diff: 'Python 直接支持默认值，通常不需要为了兼容写多个重载。'
      }
    ],
    examples: [
      {
        title: '默认值与关键字传参',
        code: 'def greet(name, greeting="你好"):\n    return f"{greeting}，{name}"\n\nprint(greet("张三"))\nprint(greet("张三", greeting="早上好"))',
        output: '你好，张三\n早上好，张三',
        note: '调用时显式写出参数名（关键字传参）可以提升可读性，顺序也不再重要。'
      },
      {
        title: '多返回值与可变参数',
        code: 'def stats(nums):\n    return min(nums), max(nums), sum(nums) / len(nums)\n\nlow, high, avg = stats([3, 9, 1])\nprint(low, high, avg)\n\ndef log(*args, **kwargs):\n    print(args, kwargs)\n\nlog("msg", level="info")',
        output: "1 9 4.333333333333333\n('msg',) {'level': 'info'}",
        note: '*args 收集位置参数为 tuple，**kwargs 收集关键字参数为 dict。'
      },
      {
        title: '函数是一等对象',
        code: 'def double(x):\n    return x * 2\n\nf = double\nprint(f(21))\nprint(list(map(double, [1, 2, 3])))',
        output: '42\n[2, 4, 6]',
        note: '函数可以赋值给变量、传参，类似 Java 的方法引用 / 函数式接口。'
      }
    ],
    pitfalls: [
      {
        title: '可变默认参数',
        bad: 'def add(item, items=[]):\n    items.append(item)\n    return items',
        good: 'def add(item, items=None):\n    items = items or []\n    items.append(item)\n    return items',
        note: '默认值只在定义时求值一次，list/dict 会被所有调用共享，这是最经典的坑。'
      },
      {
        title: '没有 return 就没有值',
        bad: 'def f():\n    x = 1\nprint(f() + 1)',
        good: 'def f():\n    return 1',
        note: '函数默认返回 None，对 None 做运算会报 TypeError。'
      },
      {
        title: '作用域修改',
        bad: 'count = 0\ndef inc():\n    count += 1',
        good: 'def inc():\n    global count\n    count += 1   # 更好的做法是用返回值',
        note: '函数内给变量赋值会创建局部变量，读外层值可以，改外层值必须声明 global/nonlocal。'
      }
    ],
    practice: [
      {
        prompt: '写一个函数 safe_div(a, b)，b 为 0 时返回 None，否则返回 a / b，并打印 safe_div(10, 0) 与 safe_div(10, 4)。',
        starter: 'def safe_div(a, b):\n    # TODO\n    pass\n\nprint(safe_div(10, 0))\nprint(safe_div(10, 4))',
        answer: 'def safe_div(a, b):\n    if b == 0:\n        return None\n    return a / b\n\nprint(safe_div(10, 0))\nprint(safe_div(10, 4))',
        output: 'None\n2.5',
        hint: '提前 return 可以让代码更扁平，避免多层 else。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '关于 Python 可变默认参数，下面说法正确的是？',
        options: ['每次调用都会新建一个默认 list', '默认值只在函数定义时创建一次', '默认参数不能是 list', 'Python 会报语法错误'],
        answer: 1,
        explain: '默认值在定义时求值一次并保存在函数对象上，因此可变默认值会跨调用共享。'
      },
      {
        type: 'judge',
        question: 'Python 函数可以不写 return，此时调用结果是 None。',
        answer: true,
        explain: '没有 return（或只有 return）时，函数返回 None。'
      },
      {
        type: 'code',
        question: '补全函数，返回两个数的最大值。',
        code: 'def max_of(a, b):\n    return __________',
        answer: 'a if a > b else b',
        accept: ['max(a, b)', 'a if a > b else b'],
        explain: '可以用条件表达式，也可以直接用内置 max；内置函数优先。'
      }
    ]
  },
  {
    id: 'collections',
    title: 'List / Dict / Set',
    phase: 1,
    order: 6,
    minutes: 15,
    rating: { python: 2, java: 1, ai: 5 },
    summary: '三个最常用的内置容器：list 有序可重复、dict 键值映射、set 去重；JSON 和 LLM 数据全靠它们。',
    keywords: ['list', 'dict', 'set', 'tuple', 'ArrayList', 'HashMap', 'HashSet', '容器'],
    tip: 'Java 开发者提示：list 就是 ArrayList，dict 就是 HashMap，set 就是 HashSet，tuple 相当于不可变 List。',
    what: 'list 是有序、可重复、可修改的序列，用 [] 定义；dict 是键值映射，用 {} 定义，键必须可哈希（str、int、tuple 都行，list 不行）；set 是无序不重复集合，适合去重和成员判断。tuple 是不可变序列，常用于"固定的一组值"。AI 应用里 API 请求体、LLM 返回的 JSON 解析结果，基本都是 dict + list 的组合。',
    javaCompare: [
      {
        title: '三个容器的字面量',
        java: 'List<String> a = new ArrayList<>();\nMap<String, Integer> b = new HashMap<>();\nSet<String> c = new HashSet<>();',
        python: 'a = []\nb = {}\nc = set()',
        diff: 'Python 有字面量语法，不需要 new 和泛型；注意 {} 是空 dict，不是 set。'
      },
      {
        title: '取出元素',
        java: 'b.get("age")',
        python: 'b["age"]',
        diff: 'Python 用下标取值，键不存在会抛 KeyError；安全取值用 b.get("age", 0)。'
      }
    ],
    examples: [
      {
        title: 'list 常用操作',
        code: 'names = ["张三", "李四"]\nnames.append("王五")\nnames.insert(0, "赵六")\nprint(names, len(names), names[-1])\nprint(names[1:3])',
        output: "['赵六', '张三', '李四', '王五'] 4 王五\n['张三', '李四']",
        note: '负下标从尾部计数，切片 [1:3] 是左闭右开，等价于 subList。'
      },
      {
        title: 'dict 读写与遍历',
        code: 'user = {"name": "张三", "age": 20}\nuser["city"] = "北京"\nprint(user.get("phone", "未填写"))\nfor k, v in user.items():\n    print(k, "=", v)',
        output: '未填写\nname = 张三\nage = 20\ncity = 北京',
        note: 'get 提供默认值，避免 KeyError；items() 同时拿到键和值。'
      },
      {
        title: 'set 去重与成员判断',
        code: 'nums = [1, 1, 2, 3, 3]\nunique = set(nums)\nprint(unique, len(unique))\nprint(3 in unique, 9 in unique)\nprint(set([1, 2, 3]) & set([2, 3, 4]))',
        output: '{1, 2, 3} 3\nTrue False\n{2, 3}',
        note: '& 求交集，| 求并集，- 求差集；成员判断是 O(1)，大列表里查值优先用 set。'
      }
    ],
    pitfalls: [
      {
        title: 'dict 键不存在',
        bad: 'age = user["age"]   # 没有该键就 KeyError',
        good: 'age = user.get("age", 0)',
        note: 'Java 的 get 返回 null，Python 的 [] 会直接抛异常，取可选字段一律用 get。'
      },
      {
        title: '浅拷贝',
        bad: 'copy = original',
        good: 'copy = dict(original)   # 或 copy.deepcopy(original)',
        note: '赋值不会复制内容；嵌套结构需要 deepcopy，否则改内层会影响原数据。'
      },
      {
        title: 'set 依赖可哈希',
        bad: 'bad = {[1, 2], [3]}',
        good: 'ok = {(1, 2), (3,)}',
        note: 'list 和 dict 不可哈希，不能放进 set 或当作 dict 的键，要用 tuple。'
      }
    ],
    practice: [
      {
        prompt: '给定用户列表，打印每个用户的 name（用循环 + dict 取值）。',
        starter: 'users = [{"name": "张三"}, {"name": "李四"}]\n# TODO: 打印每个用户的 name\n',
        answer: 'users = [{"name": "张三"}, {"name": "李四"}]\nfor user in users:\n    print(user["name"])',
        output: '张三\n李四',
        hint: '遍历 list 拿到每个 dict，再用 ["name"] 取值。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 中 {} 表示什么？',
        options: ['空 set', '空 dict', '空 tuple', '语法错误'],
        answer: 1,
        explain: '{} 是空字典，空集合要写成 set()。'
      },
      {
        type: 'judge',
        question: 'list 可以作为 dict 的键。',
        answer: false,
        explain: 'dict 的键必须可哈希，list 可变不可哈希；改用 tuple 即可。'
      },
      {
        type: 'code',
        question: '补全代码，安全取出 user 的 age，缺省为 18。',
        code: 'user = {"name": "张三"}\nage = __________',
        answer: 'user.get("age", 18)',
        accept: ["user.get('age', 18)"],
        explain: 'get(key, default) 在键不存在时返回默认值，不会抛 KeyError。'
      }
    ]
  }
]
