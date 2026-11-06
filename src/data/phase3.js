// 阶段 3：组织代码（把能复用的逻辑抽成函数和模块）
// 面向从未写过代码的零基础读者，用生活化的比喻解释 Python 3.10+ 语法。
// 每个知识点负责一类概念，examples / practice 的输出均为真实运行结果。

export default [
  {
    id: 'functions-basics',
    title: '函数基础：把一段动作打包',
    phase: 3,
    order: 1,
    minutes: 28,
    rating: { level: 2, must: 5 },
    summary: '用 def 定义自己的函数：给参数、算事情、return 交回结果，到处都能调用。',
    keywords: ['函数', 'def', '参数', 'return', '调用', '打包'],
    tip: '零基础提示：函数就是"把一段动作打包贴上名字"。以后喊名字加括号，这段动作就跑一遍。参数是喂给它的原料，return 是它交回来的成果。',
    what: '到现在为止你写的代码都是"从上到下一遍过"。函数让你把一段动作打包命名：def 定义、参数接收原料、return 交回结果。定义好后，在任何地方写 函数名(值) 就能重复使用这段逻辑。它是"复用"的地基——第 1、2 阶段写的所有小逻辑，从这节开始都能装进函数里随身带。',
    analogy: '打个比方：函数像榨汁机——定义是造机器，参数是扔进去的水果，return 是倒出来的果汁。造一次，以后每次只要换个水果再按开关。',
    terms: [
      { term: 'def', zh: '定义', note: '声明一个函数的关键字，后面跟函数名和参数。' },
      { term: 'parameter', zh: '参数', note: '函数名括号里的变量，接收调用时传进来的值。' },
      { term: 'return', zh: '返回', note: '把函数算出的结果交回给调用的那一行。' },
      { term: 'call', zh: '调用', note: '函数名加括号让这段动作真正执行，如 greet("小明")。' },
      { term: 'argument', zh: '实参', note: '调用时括号里实际传入的具体值。' }
    ],
    steps: [
      '用 def 函数名(参数): 写下第一行，记得冒号和缩进',
      '在缩进的函数体里写这段动作要做的计算',
      '用 return 把结果交出去；只是打印展示的话可以不 return',
      '在函数外面用 函数名(实参) 调用它',
      '换不同的实参多调用几次，观察每次结果',
    ],
    examples: [
      {
        title: '定义并调用',
        code: `def greet(name):
    print("你好,", name)

greet("小明")
greet("小红")`,
        output: `你好, 小明
你好, 小红`,
        note: '定义一次，调用几次就执行几次；每次传入的名字不同，输出跟着变。',
      },
      {
        title: '用 return 把结果交回来',
        code: `def add(a, b):
    return a + b

result = add(3, 5)
print(result)
print(add(1, 2) * 10)`,
        output: `8
30`,
        note: 'return 交回的结果能存进变量，也能直接参与下一个计算。',
      },
      {
        title: '函数配合循环',
        code: `def square(n):
    return n * n

for n in [1, 2, 3]:
    print(n, "的平方是", square(n))`,
        output: `1 的平方是 1
2 的平方是 4
3 的平方是 9`,
        note: '函数和 for 一组合，"对每个数做同样的事"就变成一行调用。',
      }
    ],
    pitfalls: [
      {
        title: '还没定义就调用',
        bad: 'print(hello())\n\ndef hello():\n    return "hi"',
        good: 'def hello():\n    return "hi"\n\nprint(hello())',
        note: 'Python 从上往下执行，调用前必须先让 def 出现过，否则报 NameError。'
      },
      {
        title: '忘了写 return',
        bad: 'def add(a, b):\n    a + b\n\nprint(add(2, 3))   # None',
        good: 'def add(a, b):\n    return a + b',
        note: '只写 a + b 是"算了没交"，函数默认交回 None；要结果必须 return。'
      },
      {
        title: '调用时忘了括号',
        bad: 'print(square)   # 打印 <function square ...>',
        good: 'print(square(4))',
        note: '不带括号的函数名是"机器本身"，带括号传参才是"开动机器"。'
      }
    ],
    practice: [
      {
        prompt: '定义函数 area(width, height)，返回长方形面积；打印 area(3, 4) 和 area(5, 2)。',
        starter: `def area(width, height):
    pass

# TODO: 打印两次调用结果
`,
        answer: `def area(width, height):
    return width * height

print(area(3, 4))
print(area(5, 2))`,
        output: `12
10`,
        hint: '函数体只要一行 return width * height，剩下的交给调用者。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'greet("小明") 中，"小明" 是什么？',
        options: ['参数名', '实参（调用时传入的值）', '返回值', '函数名'],
        answer: 1,
        explain: '定义处括号里的叫参数（形参），调用时传入的具体值叫实参。',
      },
      {
        type: 'judge',
        question: '函数里没有 return 时，调用它会得到 None。',
        answer: true,
        explain: '没有 return 的函数默认交回 None，这是 Python 的固定行为。',
      },
      {
        type: 'code',
        question: '补全：定义一个函数 double，把参数翻倍返回。',
        code: '____ double(n):\n    return n * 2',
        answer: 'def',
        accept: [],
        explain: '定义函数以 def 开头，后面跟名字、括号和冒号。'
      }
    ]
  },
  {
    id: 'functions-advanced',
    title: '函数进阶：默认参数与返回值',
    phase: 3,
    order: 2,
    minutes: 25,
    rating: { level: 3, must: 5 },
    summary: '学习函数怎么用默认参数偷懒，并让 return 把计算结果交回给调用处。',
    keywords: ['函数', '默认参数', 'return', '返回值', '函数定义'],
    tip: '零基础提示：记住一句话——函数是"把动作打包"，return 是"把答案递出来"。暂时看不懂没关系，照着例子敲一遍最有感觉。',
    what: '函数就是用 `def` 打包好的一小段动作，可以反复调用。默认参数是给某个参数预先定一个值，调用时你不传它就自动用这个值。`return` 会把计算好的结果交回给调用它的地方，而不是只打印在屏幕上。想让自己写的代码能被到处复用，这三个概念是基础。',
    analogy: '打个比方：默认参数像餐厅菜单上的"默认微辣"，你不特殊说明就按微辣做，说了才换辣度。return 则像后厨把做好的菜端到你桌上，而不是只在后厨给自己看一眼。',
    terms: [
      { term: 'def', zh: '函数定义关键字', note: '写在函数名字前面，声明"从这里开始定义一个函数"时用它。' },
      { term: 'default parameter', zh: '默认参数', note: '参数列表里直接给了等号默认值，调用时可省略不传。' },
      { term: 'return', zh: '返回语句', note: '把函数里的计算结果交回给调用处，函数执行到此结束。' },
      { term: 'return value', zh: '返回值', note: 'return 后面那个数值，调用处能接着拿它继续算。' },
      { term: 'keyword argument', zh: '关键字参数', note: '调用时写 参数名=值，按名字对号入座，顺序随意。' },
    ],
    steps: [
      '打开文本文档或代码编辑器，新建一个 .py 文件。',
      '用 def 关键字定义一个函数，给它起个看得懂的名字。',
      '在参数里写默认值，例如 name="朋友"。',
      '函数体里用 return 把结果交出去。',
      '在函数外调用它，并观察返回的结果。',
    ],
    examples: [
      {
        title: '默认参数',
        code: `def greet(name="朋友"):
    return "你好，" + name + "！"

print(greet())
print(greet("小明"))`,
        output: `你好，朋友！
你好，小明！`,
        note: '第一次调用没传名字，用了默认值"朋友"；第二次传了"小明"，就换成了小明。',
      },
      {
        title: 'return 传回结果后继续计算',
        code: `def square(num):
    return num * num

result = square(5)
print("5 的平方是", result)
print("再乘 2 是", result * 2)`,
        output: `5 的平方是 25
再乘 2 是 50`,
        note: 'square(5) 通过 return 把 25 交回来，赋给 result 之后还能继续参与计算。',
      },
      {
        title: '多个默认参数',
        code: `def make_salad(fruit1, fruit2, dressing="沙拉酱"):
    return fruit1 + "和" + fruit2 + "，搭配" + dressing

print(make_salad("苹果", "香蕉"))
print(make_salad("苹果", "香蕉", "蜂蜜"))`,
        output: `苹果和香蕉，搭配沙拉酱
苹果和香蕉，搭配蜂蜜`,
        note: '缺省的第三个参数自动用"沙拉酱"，想换口味就显式传新值。',
      },
    ],
    pitfalls: [
      {
        title: '忘了写 return',
        bad: `def add(a, b):
    a + b

result = add(2, 3)
print(result)`,
        good: `def add(a, b):
    return a + b

print(add(2, 3))`,
        note: '第一种写法里 a+b 算了但没交出去，result 拿到的是空值 None；加上 return 才能拿到 5。',
      },
      {
        title: '默认参数放错位置',
        bad: `def greet(name="朋友", greeting):
    return greeting + "，" + name`,
        good: `def greet(greeting, name="朋友"):
    return greeting + "，" + name`,
        note: '默认参数必须放在没有默认值的参数后面，否则程序直接报语法错误。',
      },
      {
        title: '可变默认参数被所有调用共享',
        bad: `def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))
print(add_item(2))   # 得到 [1, 2]，不是 [2]`,
        good: `def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`,
        note: '默认值在定义时只创建一次，之后所有调用共用同一个列表；想每次都是新的，用 None 占位再在函数里新建。',
      },
      {
        title: '位置传参容易对错位',
        bad: 'greet("你好", "小明")   # greeting 和 name 传反了',
        good: 'greet(greeting="你好", name="小明")',
        note: '多个参数时用关键字传参，按名字对号入座，顺序错了也不怕，还更好读。'
      },
    ],
    practice: [
      {
        prompt: '写一个函数 welcome，第二个参数带默认值，第二次调用时换一句不同的开场白。',
        starter: `def welcome(name, message="欢迎来玩"):
    return message + "，" + name + "！"`,
        answer: `def welcome(name, message="欢迎来玩"):
    return message + "，" + name + "！"

print(welcome("小红"))
print(welcome("小红", "好久不见"))`,
        output: `欢迎来玩，小红！
好久不见，小红！`,
        hint: '第一次调用省略 message，用默认值；第二次显式传入"好久不见"。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '函数里的 `return 5` 会把什么结果交给调用它的地方？',
        options: ['把 5 打印到屏幕上', '把 5 作为返回值交给调用处', '把函数一口气删掉', '什么都不发生'],
        answer: 1,
        explain: 'return 把结果交回调用处，继续在后面用；想在调用时看到它，还得自己 print。',
      },
      {
        type: 'judge',
        question: '定义 `def hi(name="小红"):` 之后，调用 hi() 时 name 会等于"小红"。',
        answer: true,
        explain: '没传参数时 name 就用默认值"小红"，传了别的值才会被覆盖。',
      },
      {
        type: 'choice',
        question: 'def add_item(item, items=[]) 连续调用两次 add_item(1)、add_item(2)，第二次返回什么？',
        options: ['[2]', '[1, 2]', '[1]', '报错'],
        answer: 1,
        explain: '默认列表只创建一次、被所有调用共享，第二次调用时里面还留着上次的 1。',
      },
    ],
  },
  {
    id: 'closures',
    title: '闭包与高阶函数：函数也是值',
    phase: 3,
    order: 3,
    minutes: 30,
    rating: { level: 4, must: 4 },
    summary: '函数能当参数传、当返回值带回来，还能"记住"出生时的环境——这是进阶 Python 的钥匙。',
    keywords: ['闭包', '高阶函数', '回调', 'nonlocal', '函数式'],
    tip: '零基础提示：前面学的"函数能装一段动作"，这节再进一步——函数本身也能像数字一样传来传去。第一遍看不懂很正常，照着敲、看输出，三遍就通。',
    what: 'Python 里函数是"一等公民"：可以赋给变量、当参数传给别的函数、从函数里 return 出来。接收函数或返回函数的函数叫高阶函数；返回的函数如果"记住"了外层函数里的变量，就叫闭包。它是装饰器（下一阶段）、回调、排序 key 的底层原理。',
    analogy: '打个比方：高阶函数像一台"通用加工机"，你把哪种刀具（函数）装上去，它就做哪种活；闭包像出厂时附带说明书和配件的机器——配件（外层变量）被它永久带走了。',
    terms: [
      { term: 'higher-order function', zh: '高阶函数', note: '接收函数当参数，或把函数当返回值的函数。' },
      { term: 'closure', zh: '闭包', note: '记住了外层函数变量的内层函数，外层结束后变量仍可用。' },
      { term: 'nonlocal', zh: '外层声明', note: '在内层函数里修改外层变量前要写的声明，类似 global。' },
      { term: 'callback', zh: '回调函数', note: '传给别的函数、在合适的时机被"回头调用"的函数。' }
    ],
    steps: [
      '把一个函数名当参数传给另一个函数，观察它被调用',
      '写外层函数返回内层函数，注意 return multiply 不加括号',
      '调用返回的函数，体会它"记得"外层传进来的 times',
      '加 nonlocal 让内层能修改外层变量，做一个计数器',
      '对照第 7 阶段的 sorted(key=...)，明白那些 key 就是回调',
    ],
    examples: [
      {
        title: '函数当参数传',
        code: `def apply(func, x):
    return func(x)

print(apply(abs, -8))
print(apply(str, 123))`,
        output: `8
123`,
        note: 'apply 自己不干活，接到哪个函数就调用哪个——abs 得到 8，str 得到文字 "123"。',
      },
      {
        title: '返回函数与闭包',
        code: `def make_multiplier(times):
    def multiply(n):
        return n * times
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(10), triple(10))`,
        output: `20 30`,
        note: 'double 和 triple 是两台不同参数的机器：各自记住了自己的 times（2 和 3），这就是闭包。',
      },
      {
        title: '闭包计数器：记住并修改外层变量',
        code: `def make_counter():
    count = 0
    def step():
        nonlocal count
        count += 1
        return count
    return step

next_num = make_counter()
print(next_num(), next_num(), next_num())`,
        output: `1 2 3`,
        note: 'nonlocal 让内层能改外层的 count；每次调用 next_num，count 都在上一次基础上加一。',
      }
    ],
    pitfalls: [
      {
        title: '返回函数时多写了括号',
        bad: 'def make_multiplier(times):\n    ...\n    return multiply()   # 直接执行了',
        good: 'return multiply   # 交出函数本身',
        note: 'return multiply 是交出函数，return multiply() 是当场调用后交回结果，含义完全不同。'
      },
      {
        title: '内层想改外层变量却没写 nonlocal',
        bad: 'def outer():\n    count = 0\n    def step():\n        count = count + 1   # 报错',
        good: 'def step():\n        nonlocal count\n        count += 1',
        note: '只读外层变量没问题；要赋值修改就必须 nonlocal 声明，否则 UnboundLocalError。'
      },
      {
        title: '把高阶函数调用和普通调用搞混',
        bad: 'apply(abs(-8), 3)   # 先算了 abs(-8)',
        good: 'apply(abs, 3)   # 传函数本身，不加括号',
        note: '传函数本身不加括号；加了括号就变成"先执行再把结果当参数"。'
      }
    ],
    practice: [
      {
        prompt: '写 make_greeter(prefix)，返回一个打招呼函数：g = make_greeter("老师好，") 后 g("小明") 返回 "老师好，小明"。',
        starter: `def make_greeter(prefix):
    # TODO: 返回一个能拼接 prefix 和 name 的函数
    pass
`,
        answer: `def make_greeter(prefix):
    def greet(name):
        return prefix + name
    return greet

g = make_greeter("老师好，")
print(g("小明"))`,
        output: `老师好，小明`,
        hint: '内层函数用 prefix + name 拼接；外层 return 内层函数本身（不加括号）。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'make_multiplier(2) 返回的 double 函数，n 乘以的 times 是多少？',
        options: ['10', '2', '0', '不确定'],
        answer: 1,
        explain: '闭包记住了创建它时外层的 times=2，所以 double(10) 得到 20。',
      },
      {
        type: 'judge',
        question: 'sorted(列表, key=len) 里的 len 就是一个被当作参数传进去的函数。',
        answer: true,
        explain: 'key 接收一个函数，sorted 会对每个元素调用它来决定排序依据——这就是高阶函数的日常用法。',
      },
      {
        type: 'code',
        question: '补全：让内层函数可以修改外层的 count。',
        code: 'def make_counter():\n    count = 0\n    def step():\n        __________ count\n        count += 1\n        return count\n    return step',
        answer: 'nonlocal',
        accept: [],
        explain: 'nonlocal 声明"这个变量用外层的"，内层才能对它赋值修改。'
      }
    ]
  },
  {
    id: 'recursion',
    title: '递归：函数调用自己',
    phase: 3,
    order: 4,
    minutes: 28,
    rating: { level: 4, must: 3 },
    summary: '函数在内部调用自己：配上"停下来的时候"，就能优雅解决一层层剥的问题。',
    keywords: ['递归', 'recursion', '基线条件', '阶乘', '斐波那契'],
    tip: '零基础提示：递归像"俄罗斯套娃"——打开一个还有一个，直到最小的那个（不用再打开）。程序里就是函数调用自己，关键是想清楚"什么时候停"。',
    what: '递归是函数在自己的函数体里调用自己。写对它只要两件事：基线条件（什么时候直接给答案、不再调用自己）和递归步骤（把大问题拆成更小的同类问题）。没有基线条件，函数会无限调用自己直到报 RecursionError。',
    analogy: '打个比方：递归像站在排队的队伍里问"我第几位"——你问前面的人（递归步骤），队伍第一个人不用问、直接知道自己第一（基线条件），答案再一个个传回来。',
    terms: [
      { term: 'recursion', zh: '递归', note: '函数在内部调用自身的写法。' },
      { term: 'base case', zh: '基线条件', note: '让递归停下来的判断，没有它就会无限调用。' },
      { term: 'call stack', zh: '调用栈', note: '记录"函数一层层调用到哪了"的机制，层数太多会爆。' },
      { term: 'RecursionError', zh: '递归错误', note: '超过最大递归层数时抛出的错误。' }
    ],
    steps: [
      '先想清楚最简单的情况，把它写成 if 直接返回——这是基线条件',
      '再写"大问题 = 小问题的答案再加工"的递归步骤',
      '用小参数跑一遍（如 factorial(3)），确认路径正确',
      '故意删掉基线条件看一次 RecursionError，加深印象',
      '递归层数太深时，改用循环或第 7 阶段的缓存技巧',
    ],
    examples: [
      {
        title: '阶乘：n! = n × (n-1)!',
        code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
        output: `120`,
        note: 'factorial(5) 一层层展开成 5×4×3×2×1；n <= 1 就是让递归停下来的基线条件。',
      },
      {
        title: '倒计时：递归也可以不返回值',
        code: `def countdown(n):
    if n == 0:
        print("发射！")
        return
    print(n)
    countdown(n - 1)

countdown(3)`,
        output: `3
2
1
发射！`,
        note: '每层打印一个数再交给下一层；n 到 0 时触发基线条件，打印"发射！"后层层返回。',
      },
      {
        title: '斐波那契数列',
        code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(7)])`,
        output: `[0, 1, 1, 2, 3, 5, 8]`,
        note: '每一项是前两项之和；这个写法直观但重复计算多，数字大了会明显变慢。',
      }
    ],
    pitfalls: [
      {
        title: '忘了基线条件',
        bad: 'def countdown(n):\n    print(n)\n    countdown(n - 1)   # 永远停不下来',
        good: 'if n == 0:\n    return\nprint(n)\ncountdown(n - 1)',
        note: '没有"什么时候停"，函数会一直调用自己，最后抛 RecursionError: maximum recursion depth exceeded。'
      },
      {
        title: '递归调用的结果没有 return 回去',
        bad: 'def factorial(n):\n    if n <= 1:\n        return 1\n    n * factorial(n - 1)   # 算了没交',
        good: 'return n * factorial(n - 1)',
        note: '中间层的返回值必须一层层 return 传回去，少一层整条链就拿不到结果。'
      },
      {
        title: '该用循环的活硬用递归',
        bad: '用递归从头加到一百万',
        good: '简单累加、遍历用 for 循环更直接',
        note: '递归擅长"层层拆解"的问题（树、目录、分治）；线性重复的活用循环更快更稳。'
      }
    ],
    practice: [
      {
        prompt: '写递归函数 sum_to(n)，返回 1 + 2 + … + n 的和，打印 sum_to(100)。',
        starter: `def sum_to(n):
    # TODO: 基线条件 + 递归步骤
    pass
`,
        answer: `def sum_to(n):
    if n == 1:
        return 1
    return n + sum_to(n - 1)

print(sum_to(100))`,
        output: `5050`,
        hint: '基线条件：n == 1 时返回 1；递归步骤：n + sum_to(n - 1)。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '递归函数里缺少基线条件，最直接的后果是？',
        options: ['结果为 0', '程序变慢', '抛 RecursionError', '自动改用循环'],
        answer: 2,
        explain: '无限调用自己会撑爆调用栈，Python 抛 RecursionError: maximum recursion depth exceeded。',
      },
      {
        type: 'judge',
        question: 'factorial(5) 展开计算时，最先得到结果的是 factorial(1)。',
        answer: true,
        explain: '递归先一路"下钻"到基线条件，factorial(1) 最先返回，答案再一层层乘回去。',
      },
      {
        type: 'code',
        question: '补全斐波那契的递归步骤：每一项等于前两项之和。',
        code: 'def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + __________',
        answer: 'fib(n - 2)',
        accept: [],
        explain: '前一项加前两项：fib(n-1) + fib(n-2)。'
      }
    ]
  },
  {
    id: 'errors-try',
    title: '错误处理：try/except 让程序不崩',
    phase: 3,
    order: 5,
    minutes: 25,
    rating: { level: 3, must: 5 },
    summary: '用 try/except 把可能出错的动作包起来，出错时走备用分支而不是直接崩溃。',
    keywords: ['异常', 'try', 'except', '错误处理', 'ZeroDivisionError', 'ValueError'],
    tip: '零基础提示：把 try 想成"试试看"，except 想成"万一出事就怎么处理"。先照抄例子，出错类型以后见多了自然认得出。',
    what: '程序跑着跑着可能遇到错误，比如除以 0、把不是数字的文字转成数字。这种"意外状况"叫异常。用 `try` 把可能出错的那段包起来，再用 `except` 写"出事时怎么办"，程序就不会眼睁睁崩掉，而是按你安排的方式继续走下去。',
    analogy: '打个比方：try/except 像走路时兜里揣的防护网。脚下不小心踩空，网把你接住而不是让你直直摔下去；接住之后你还能接着正常走路。',
    terms: [
      { term: 'exception', zh: '异常', note: '程序运行中出现的意外状况，若不接住就会中断整个程序。' },
      { term: 'try', zh: '尝试块', note: '把可能出错的代码放进这里，程序会先正常执行一遍。' },
      { term: 'except', zh: '捕获块', note: '写着"出了哪种异常就怎么处理"的备用分支。' },
      { term: 'ZeroDivisionError', zh: '除零错误', note: '除以 0 时抛出的异常类型。' },
      { term: 'ValueError', zh: '值错误', note: '值本身不合法时抛出的异常，例如把"abc"转成整数。' },
    ],
    steps: [
      '找出程序里可能出错的一小段代码。',
      '用 try 把这段代码包起来、整体缩进。',
      '后面写 except，括号里写可能出现的异常类型。',
      '在 except 里写"出错时你要做的事"。',
      '运行程序，试试让它出错，确认它没有崩掉。',
    ],
    examples: [
      {
        title: 'catch 除零错误',
        code: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以 0 哦")`,
        output: `不能除以 0 哦`,
        note: '除以 0 会抛 ZeroDivisionError，被 except 接住后打印提示，程序没有中断。',
      },
      {
        title: 'catch 越界读取',
        code: `try:
    fruits = ["苹果", "香蕉"]
    print(fruits[5])
except IndexError:
    print("这个位置没有水果")`,
        output: `这个位置没有水果`,
        note: '下标 5 超出了列表长度，抛 IndexError，被接住后给出友好提示。',
      },
      {
        title: '异常之后程序继续跑',
        code: `print("开始")
try:
    print(1 / 0)
except ZeroDivisionError:
    print("除数为 0，程序没有崩")
print("结束")`,
        output: `开始
除数为 0，程序没有崩
结束`,
        note: '看出错后 except 执行完毕，最后的"结束"仍然正常打印，整段流程没被打断。',
      },
    ],
    pitfalls: [
      {
        title: '异常类型写错，捕不到',
        bad: `try:
    num = int("abc")
except ZeroDivisionError:
    print("会捕到吗")`,
        good: `try:
    num = int("abc")
except ValueError:
    print("请输入数字")`,
        note: '把"abc"转整数抛的是 ValueError，跟 ZeroDivisionError 不是一回事；类型写错就接不住。',
      },
      {
        title: '不包 try，程序直接崩',
        bad: `number = int("abc")
print("后面还能执行吗")`,
        good: `try:
    number = int("abc")
except ValueError:
    number = 0
print("后面还能执行吗", number)`,
        note: '不包 try，遇错整段程序直接中断，后面的代码全不执行；包上后出错走备用分支，程序继续走。',
      },
      {
        title: 'except 后面什么都不写',
        bad: `try:
    number = int("abc")
except:
    pass   # 什么错都被吞掉`,
        good: `try:
    number = int("abc")
except ValueError as e:
    print("请输入数字:", e)`,
        note: '裸 except 连变量拼错这类 bug 都会吞掉，让问题藏得更深；至少写明异常类型。'
      },
      {
        title: '打开的文件忘了关',
        bad: `f = open("data.txt", encoding="utf-8")
process(f)   # 这里一旦抛错，close 永远执行不到
f.close()`,
        good: `f = open("data.txt", encoding="utf-8")
try:
    process(f)
finally:
    f.close()`,
        note: 'finally 里的代码无论是否出错都会执行，专门用来做"打扫"这类收尾。'
      },
    ],
    practice: [
      {
        prompt: '写一个 safe_divide：能正常除就除，遇到除 0 就返回一句提示而不是崩溃。',
        starter: `def safe_divide(a, b):
    return a / b`,
        answer: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "不能除 0"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
        output: `5.0
不能除 0`,
        hint: '把 return a / b 用 try 包起来，except 里专门接 ZeroDivisionError。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '运行下面代码会打印什么？\n`try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print("接住了")`',
        options: ['直接崩溃报错', '打印"接住了"', '什么都没打印', '打印 0'],
        answer: 1,
        explain: '1/0 抛 ZeroDivisionError，正好被 except 接住，打印"接住了"，程序继续走。',
      },
      {
        type: 'judge',
        question: 'try 里的代码出错时，except 里的代码会执行。',
        answer: true,
        explain: '这正是 try/except 的作用：出错的异常被 except 捕获并处理。',
      },
      {
        type: 'judge',
        question: 'try/finally 里的 finally 部分，无论有没有出错都会执行。',
        answer: true,
        explain: 'finally 专门放"无论如何都要做"的收尾动作，比如关闭文件、释放资源。',
      },
    ],
  },
  {
    id: 'modules-import',
    title: '模块：拆开文件与 import 导入',
    phase: 3,
    order: 6,
    minutes: 25,
    rating: { level: 3, must: 5 },
    summary: '把代码拆到多个 .py 文件，用 import 把别的文件里的函数搬进来复用。',
    keywords: ['模块', 'import', 'from', 'math', 'random', '拆分文件'],
    tip: '零基础提示：import 就像跟别人借东西——只需说"我要用 math"，就能用里面现成的数学函数，不用自己从头写。',
    what: '模块就是一个 .py 文件，里面装着别人（或你自己）写好的函数和值，方便大家一起用。`import` 可以把整个模块拿进来，`from ... import` 则只挑其中一两样。标准库自带的 `math`、`random`、`datetime` 都是现成模块，你也能把自己的计算函数拆进单独文件再引进来。文件末尾常见的一段 if __name__ == "__main__": 是"运行身份检查"：直接运行这个文件时，__name__ 的值是 "__main__"，它下面的代码才执行；被 import 时 __name__ 是模块名，这段代码不跑。把演示、测试或启动代码放进这段里，文件被别人借用时就不会乱执行。',
    analogy: '打个比方：模块像工具箱里分门别类的抽屉，螺丝刀放一个抽屉、扳手放另一个。要用哪个打开哪个抽屉，不用每次都翻一个大混装箱。',
    terms: [
      { term: 'module', zh: '模块', note: '一个 .py 文件就称为一个模块，里面放着可复用的函数或值。' },
      { term: 'import', zh: '导入语句', note: '把整个模块拿进来使用，关键字是 import。' },
      { term: 'from', zh: '从...导入', note: '跟 import 配合，只从模块里挑出你需要的部分。' },
      { term: 'standard library', zh: '标准库', note: '程序自带的一批现成模块，如 math、random，不用额外安装。' },
      { term: '__name__', zh: '运行身份标记', note: '直接运行文件时值为 "__main__"，被 import 时为模块名，用来区分两种场景。' },
    ],
    steps: [
      '新建一个 .py 文件，起个简短易懂的名字，例如 calc.py。',
      '在文件里定义几个打算复用的函数。',
      '再新建一个主程序文件，例如 main.py。',
      '在主程序顶部写 import calc（或 from calc import 函数名）。',
      '接着像用自带函数一样调用它。',
    ],
    examples: [
      {
        title: 'import 整个模块',
        code: `import math

print(math.sqrt(16))
print(math.floor(3.7))`,
        output: `4.0
3`,
        note: 'import math 后就能用 math.sqrt 求平方根、math.floor 向下取整，从模块名后面取函数。',
      },
      {
        title: 'from...import 只挑一部分',
        code: `from math import pi

print("圆周率约等于", round(pi, 4))`,
        output: `圆周率约等于 3.1416`,
        note: '只用 from math import pi，直接把 pi 当作普通变量用，前面不用再写 math.。',
      },
      {
        title: '用 decimal 避免小数误差',
        code: `import decimal

print(decimal.Decimal("0.1") + decimal.Decimal("0.2"))`,
        output: `0.3`,
        note: '用文本形式构造精确小数，相加得到精确的 0.3，避免浮点数误差。',
      },
    ],
    pitfalls: [
      {
        title: '把属性名写错了大小写',
        bad: `import math
print(math.PI)`,
        good: `import math
print(math.pi)`,
        note: '模块里的常量属性名是 pi（小写），写成 PI 会报 AttributeError，提示没有这个属性。',
      },
      {
        title: '只导入了函数却没导入模块',
        bad: `from math import sqrt
print(math.sqrt(16))`,
        good: `from math import sqrt
print(sqrt(16))`,
        note: 'from...import 只把 sqrt 拿进来了，模块名 math 本身并不存在，直接写 math.sqrt 会报错。',
      },
      {
        title: '模块文件里的演示代码被 import 带着跑',
        bad: `# calc.py
print("演示：2 + 3 =", 2 + 3)

def add(a, b):
    return a + b`,
        good: `# calc.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    print("演示：2 + 3 =", add(2, 3))`,
        note: '直接写在外面的 print 在被 import 时也会执行；包进 if __name__ == "__main__": 里，只有直接运行本文件时才会跑。',
      },
      {
        title: '自己的文件名和标准库撞车',
        bad: '把文件命名为 random.py，再 import random   # 导入的是自己的文件',
        good: '换个名字，如 random_tools.py',
        note: '自己文件名和标准库同名会"遮住"官方模块，报出莫名其妙的错误；起名避开 math、random、json 这些。'
      },
    ],
    practice: [
      {
        prompt: '用 math 模块写一个函数，计算半径为 2 的圆的面积，保留两位小数。',
        starter: `import math

def circle_area(r):
    pass`,
        answer: `import math

def circle_area(r):
    return round(math.pi * r * r, 2)

print(circle_area(2))`,
        output: `12.57`,
        hint: '面积公式是圆周率乘半径平方，用 round(..., 2) 保留两位小数。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '想用 `math.sqrt` 计算平方根，调用前应该先写哪一行？',
        options: ['import random', 'import math', 'from math import names', 'print(math)'],
        answer: 1,
        explain: '要先 import math 把模块导进来，之后才能用 math.sqrt。',
      },
      {
        type: 'judge',
        question: '执行 `from math import pi` 之后，直接写 `pi` 就能用圆周率。',
        answer: true,
        explain: 'from...import 把 pi 直接带进当前作用域，不用再写 math. 前缀。',
      },
      {
        type: 'choice',
        question: '直接运行 python calc.py 时，文件里 __name__ 的值是什么？',
        options: ['"calc"', '"__main__"', '"module"', 'None'],
        answer: 1,
        explain: '直接运行时 __name__ 等于 "__main__"；被别的文件 import 时才是模块名 calc。',
      },
    ],
  },
  {
    id: 'scope',
    title: '作用域：变量在哪里可见',
    phase: 3,
    order: 7,
    minutes: 25,
    rating: { level: 4, must: 4 },
    summary: '搞清楚函数内外的变量谁能看见谁，避开"改了没生效"和"找不到变量"两类坑。',
    keywords: ['作用域', '局部变量', '全局变量', 'global', '变量可见性'],
    tip: '零基础提示：把作用域想成"房间"——函数里的变量像房间里的私人物品，外面看不见；大厅里的公用物品谁都能看。这个比喻能帮你记住八成。',
    what: '作用域决定了一个变量在程序的哪些地方"看得见"。函数内部定义的变量是局部变量，只在函数里存在；在模块顶层定义的变量是全局变量，函数里默认能读但不能直接改。想在函数里改全局变量，需要先用 `global` 声明。搞清这条，能避开"改了没生效"和"找不到变量"两类最常见的坑。',
    analogy: '打个比方：作用域就像房间。函数里的变量是"这个房间里的东西"，出了门就看不见；全局变量是摆在客厅里大家都能看到的东西，屋里屋外都认得。',
    terms: [
      { term: 'scope', zh: '作用域', note: '变量在程序中可见即可用的范围。' },
      { term: 'local variable', zh: '局部变量', note: '在函数内部定义的变量，只在函数内有效。' },
      { term: 'global variable', zh: '全局变量', note: '在模块顶层定义的变量，处处可见（函数内可直接读）。' },
      { term: 'global', zh: '全局声明关键字', note: '写在函数体开头，声明要用全局的那个变量而不是新建局部的。' },
      { term: 'built-in', zh: '内置名字', note: 'len、print 这些是 Python 内置的名字，不要拿来当变量名。' },
    ],
    steps: [
      '先分清你在定义变量还是在调用已有的变量。',
      '在函数体内第一次赋值，通常就是新建局部变量。',
      '想读全局变量的值，直接写它的名字即可。',
      '想改全局变量，先写 global 变量名 再赋值。',
      '运行程序，按结果核对变量到底改没改到。',
    ],
    examples: [
      {
        title: '函数内新建局部变量',
        code: `def show():
    x = 10
    print("函数内", x)

show()`,
        output: `函数内 10`,
        note: 'x 在函数里定义，只在 show 执行期间存在，函数外看不到它。',
      },
      {
        title: '函数内读取全局变量',
        code: `age = 25

def show_age():
    print("年龄是", age)

show_age()`,
        output: `年龄是 25`,
        note: 'age 是全局变量，函数里直接读它没问题。',
      },
      {
        title: '用 global 修改全局变量',
        code: `count = 0

def add_one():
    global count
    count = count + 1

add_one()
add_one()
print("计数", count)`,
        output: `计数 2`,
        note: '因为声明了 global count，两次调用确实把全局的 count 推进到 2。',
      },
    ],
    pitfalls: [
      {
        title: '想改全局却忘了 global',
        bad: `score = 0

def plus():
    score = 100`,
        good: `score = 0

def plus():
    global score
    score = 100`,
        note: '第一种写法其实在函数里新建了一个局部 score，外面的 score 纹风不动；加 global 才改得到全局的。',
      },
      {
        title: '在函数外使用局部变量',
        bad: `def test():
    n = 5

print(n)`,
        good: `def test():
    n = 5
    return n

print(test())`,
        note: 'n 是函数内的局部变量，外面直接 print(n) 会报"未定义"；改让函数 return 把值带出来即可。',
      },
      {
        title: '拿内置名字当变量名',
        bad: 'len = 5\nprint(len("abc"))   # 报错 TypeError',
        good: 'length = 5\nprint(len("abc"))',
        note: 'len、print、sum 这些内置名字被你赋值后就"失灵"了，整个文件都会受影响。'
      },
      {
        title: '以为 for 里的变量出循环就消失',
        bad: 'for i in range(3):\n    pass\n# 很多语言里这里 i 已经不存在',
        good: 'print(i)   # Python 里仍是 2，容易被误用',
        note: 'Python 的 for 不创建新作用域，循环变量在外面还活着；别依赖它，需要就用 return 带出来。'
      },
    ],
    practice: [
      {
        prompt: '让全局变量 num 从 1 变成 11，必须用 global 才能改到全局的它。',
        starter: `num = 1

def change():
    pass`,
        answer: `num = 1

def change():
    global num
    num = num + 10

change()
print(num)`,
        output: `11`,
        hint: '在 change 函数里先写一行 global num，再执行 num = num + 10。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '函数内部定义的变量，在函数外面能直接用吗？',
        options: ['能，所有变量都全局可见', '不能，函数内是局部变量，外面看不见', '要看变量名里有没有字母', '一定能，但只能读'],
        answer: 1,
        explain: '函数内定义的局部变量只在函数内存在，外面引用会报"未定义"。',
      },
      {
        type: 'judge',
        question: '在函数里想修改一个全局变量，需要先用 `global` 声明这个变量。',
        answer: true,
        explain: '不声明 global，函数里的赋值只会新建局部变量，改不到全局的那份。',
      },
      {
        type: 'code',
        question: '补全：让函数能修改全局的 count。',
        code: 'def add_one():\n    ____ count\n    count += 1',
        answer: 'global',
        accept: [],
        explain: '函数里要给全局变量赋值，必须先用 global 声明。'
      },
    ],
  },
  {
    id: 'write-helper',
    title: '自己写工具函数并用起来',
    phase: 3,
    order: 8,
    minutes: 25,
    rating: { level: 3, must: 5 },
    summary: '把反复用的小逻辑写成自己的工具函数，命名清楚，一次写好多处用。',
    keywords: ['工具函数', '封装', '复用', '命名', '函数调用'],
    tip: '零基础提示：凡是你要复制粘贴超过一次的操作，就值得写成函数。给函数起个一看就懂的名字，以后用起来才不迷糊。',
    what: '工具函数是你在函数基础上自己做的小零件：把一段反复要用的逻辑（比如判断正负、算平均值）写进一个函数，把它存进文件里，之后在别处填空一样调用它。好处是"一处修改、处处生效"：逻辑有变动，只改函数一处，所有用到它的地方跟着变。',
    analogy: '打个比方：工具函数像家里常备的削皮刀。削苹果用它是它，削土豆还是它，认真洗好收好就行，不用每次买一把新的。',
    terms: [
      { term: 'helper function', zh: '工具函数', note: '职责单一、专门做一件事、被反复调用的小函数。' },
      { term: 'reuse', zh: '复用', note: '同一段逻辑被多处调用，避免重复写一模一样代码的做法。' },
      { term: 'call', zh: '调用', note: '通过函数名加括号，让函数实际跑一遍的动作。' },
      { term: 'single responsibility', zh: '单一职责', note: '一个函数只负责做一件清楚的事情，方便看懂和修改。' },
      { term: 'docstring', zh: '文档字符串', note: '函数体第一行用三引号写一句说明，help(函数名) 能看到。' },
    ],
    steps: [
      '找出重复出现两次以上的操作。',
      '把它提炼成一个函数，函数名直接说明用途。',
      '必要时拆成多个更小的工具函数，各管一件事。',
      '调用它们，并确认每次结果和手算一致。',
      '以后遇到同样需求，直接调用，不再重写。',
    ],
    examples: [
      {
        title: '组合工具函数判断正负',
        code: `def is_positive(num):
    return num > 0

def check(nums):
    for n in nums:
        if is_positive(n):
            print(n, "是正数")
        else:
            print(n, "不是正数")

check([3, -1, 0, 7])`,
        output: `3 是正数
-1 不是正数
0 不是正数
7 是正数`,
        note: 'is_positive 只管判断一件事，check 负责遍历并输出，两个工具各司其职再拼到一起。',
      },
      {
        title: '工具函数计算平均值',
        code: `def average(nums):
    total = 0
    for n in nums:
        total += n
    return total / len(nums)

print(average([10, 20, 30]))
print(average([2, 4]))`,
        output: `20.0
3.0`,
        note: '同一个 average 函数，换不同的列表都能立刻算出平均值，这就是复用的意义。',
      },
      {
        title: '判断偶数的小函数',
        code: `def is_even(num):
    return num % 2 == 0

for i in range(1, 6):
    if is_even(i):
        print(i, "是偶数")`,
        output: `2 是偶数
4 是偶数`,
        note: 'is_even 判断偶数的逻辑只写一次，被循环里反复调用，改一处就影响所有使用处。',
      },
    ],
    pitfalls: [
      {
        title: '在工具函数里 print 而不是 return',
        bad: `def double(num):
    print(num * 2)

result = double(4)
print("结果是", result)`,
        good: `def double(num):
    return num * 2

result = double(4)
print("结果是", result)`,
        note: '工具函数里 print 只是把结果打到屏幕上，调用处拿不到结果，得到 None；用 return 才能把值交回去继续用。',
      },
      {
        title: '函数名起得太随意',
        bad: `def f(x):
    return x + 2

print(f(5))`,
        good: `def add_two(x):
    return x + 2

print(add_two(5))`,
        note: 'add_two 一眼就懂"加 2"，f 这种名字复用时会搞不清功能，也难在代码里再找到它。',
      },
      {
        title: '一个函数又算又打印，职责搅在一起',
        bad: `def average(nums):
    total = sum(nums) / len(nums)
    print(total)   # 只打印不返回`,
        good: `def average(nums):
    return sum(nums) / len(nums)   # 打印交给调用处`,
        note: '函数负责算并 return；打印是调用它的人的事，分开才能被复用。'
      },
      {
        title: '没处理空列表',
        bad: 'average([])   # 除以 0，抛 ZeroDivisionError',
        good: 'if not nums:\n    return 0\nreturn sum(nums) / len(nums)',
        note: 'len 是 0 时除法直接炸；入口处先判空，函数才健壮。'
      },
    ],
    practice: [
      {
        prompt: '写一个 is_odd 工具函数，再统计列表 [1,2,3,4,5,6] 里一共有几个奇数。',
        starter: `def is_odd(num):
    pass

odd_count = 0`,
        answer: `def is_odd(num):
    return num % 2 != 0

odd_count = 0
for n in [1, 2, 3, 4, 5, 6]:
    if is_odd(n):
        odd_count += 1

print("奇数个数", odd_count)`,
        output: `奇数个数 3`,
        hint: '奇数是不被 2 整除的数，1、3、5 共 3 个；判断式用 num % 2 != 0。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '函数 `def double(n): return n * 2` 执行 `print(double(3))` 会打印什么？',
        options: ['2', '3', '6', '程序报错'],
        answer: 2,
        explain: 'double(3) 通过 return 交回 3*2=6，print 把它打印出来。',
      },
      {
        type: 'judge',
        question: '好的工具函数通常职责单一，一个函数只做一件事。',
        answer: true,
        explain: '职责单一让函数容易看懂、容易测试，也方便在一处修改而处处生效。',
      },
      {
        type: 'judge',
        question: '工具函数应该自己把结果 print 出来，这样调用处更方便。',
        answer: false,
        explain: '函数应该 return 结果；打印是调用处的决定。函数里写死 print，结果就没法被继续计算。',
      },
    ]
  },
  {
    id: 'git-basics',
    title: 'Git：给代码存档与分享',
    phase: 3,
    order: 9,
    minutes: 30,
    rating: { level: 3, must: 4 },
    summary: '用 Git 给代码拍快照：改坏了能回档，还能推到 GitHub 云端备份、分享给别人。',
    keywords: ['git', 'github', '提交', '版本管理', '回退', '仓库'],
    tip: '零基础提示：把 Git 想成游戏存档——每 commit 一次就存一档，改坏了读档回去；GitHub 是放存档的云端，还能让别人和你一起改。命令都在终端里敲，照着做三遍就熟了。',
    what: 'Git 是版本管理工具。git init 把一个文件夹变成仓库，之后每次改动用 git add . 收进暂存区、再用 git commit -m 说明文字 完成一次存档；git log --oneline 查看全部存档，改坏时能回退到任意一档。写进 .gitignore 的文件（比如密钥、临时文件）不会被存档。仓库还能关联 GitHub 远端：git push 推上云端，换电脑不丢，别人也能下载你的代码。',
    analogy: '打个比方：commit 是游戏里的存档点，.gitignore 是告诉游戏哪些物品不用保存，GitHub 是云端存档库——就算电脑坏了，存档还在。',
    terms: [
      { term: 'repository', zh: '仓库', note: '被 Git 管理的项目文件夹，全部历史都存在里面的 .git 文件夹。' },
      { term: 'commit', zh: '提交（存档）', note: '一次快照，记录当时所有文件的状态，附一句说明。' },
      { term: 'gitignore', zh: '忽略清单', note: '列出不参与存档的文件，比如密码文件、临时产物。' },
      { term: 'remote', zh: '远端', note: '云端仓库的地址，习惯上叫 origin。' },
      { term: 'push', zh: '推送', note: '把本地的存档上传到 GitHub 这类远端仓库。' }
    ],
    steps: [
      '终端输入 git --version 确认安装；没有就去 git-scm.com 下载安装',
      '首次使用先报身份：git config --global user.name 你的名字，再 git config --global user.email 你的邮箱',
      '在项目文件夹输入 git init，这个文件夹从此就是仓库',
      '新建 .gitignore 文件，写下不想存档的文件名（如 .env、__pycache__/），再输入 git add . 收进暂存区',
      '输入 git commit -m "第一次存档" 完成提交；之后每做完一小步就存一档',
      '可选：在 GitHub 建一个空仓库，按页面提示执行 git branch -M main、git remote add origin 仓库地址、git push -u origin main，推上云端',
    ],
    examples: [
      {
        title: '一键生成 .gitignore',
        code: `with open(".gitignore", "w", encoding="utf-8") as f:
    f.write(".env\\n__pycache__/\\n.venv/\\n")

print(open(".gitignore", encoding="utf-8").read())`,
        output: `.env
__pycache__/
.venv/`,
        note: '用第 5 阶段学的写文件创建 .gitignore：密钥文件 .env、缓存文件夹都不进仓库。以后每个项目开头都可以这么做。'
      },
      {
        title: '确认 Git 装好了',
        code: `import os

os.system("git --version")`,
        output: `git version 2.55.0.windows.3`,
        note: 'os.system 能在 Python 里顺手执行命令行；输出里的版本号随安装版本不同而不同。'
      }
    ],
    pitfalls: [
      {
        title: '没报身份就提交',
        bad: 'git commit -m "第一次存档"   # 报错：Please tell me who you are',
        good: 'git config --global user.name "你的名字"\ngit config --global user.email "you@example.com"',
        note: '首次提交前 Git 不知道你是谁，会拒绝并给出提示。按提示设置一次全局身份，之后所有仓库通用。'
      },
      {
        title: '改完文件忘了 add 就 commit',
        bad: 'git commit -m "改好了"   # 显示 nothing to commit, working tree clean',
        good: 'git add .\ngit commit -m "改好了"',
        note: 'commit 只保存暂存区里的内容。add 是把改动放进待存档区，忘了它，Git 会说没什么可提交。'
      },
      {
        title: '把密钥文件提交进仓库',
        bad: 'git add .env   # API 密钥跟着进了存档历史',
        good: '.env 写进 .gitignore，再 git add .',
        note: '密钥一旦提交，以后删除也会留在历史记录里。凡是密码、密钥文件，先写进 .gitignore 再提交。'
      },
      {
        title: 'push 被拒绝（远端有新提交）',
        bad: 'git push   # ! [rejected] ... fetch first',
        good: 'git pull --rebase 后再 git push',
        note: '远端有你本地没有的提交时，先 pull 把远端拉下来合并，再推自己的。'
      }
    ],
    practice: [
      {
        prompt: '写一个 Git 体检脚本：用 os.system 依次执行 git --version 和 git status，确认 Git 可用、并看看当前文件夹的状态。',
        starter: `import os

# TODO: 依次执行两条命令
`,
        answer: `import os

os.system("git --version")
os.system("git status")`,
        output: `git version 2.55.0.windows.3
On branch master

nothing to commit, working tree clean`,
        hint: 'os.system("命令") 会执行命令并把输出打印出来；在还没有 git init 的文件夹里，第二条会提示还不是仓库。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '把一个文件夹变成 Git 仓库的命令是？',
        options: ['git start', 'git init', 'git new', 'git create'],
        answer: 1,
        explain: 'git init 会在当前文件夹生成 .git 文件夹，从此这里的历史由 Git 管理。'
      },
      {
        type: 'judge',
        question: '写进 .gitignore 的文件不会被 git add . 收进存档。',
        answer: true,
        explain: '忽略清单就是给 add 划出的禁区，密钥和临时文件靠它挡在仓库外面。'
      },
      {
        type: 'code',
        question: '补全提交命令：git ____ -m "第一次存档"',
        code: 'git ____ -m "第一次存档"',
        answer: 'commit',
        accept: [],
        explain: 'commit 完成一次存档，-m 后面跟一句说明，方便以后回看每次改了什么。'
      }
    ]
  }
]