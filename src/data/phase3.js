// 阶段 3：组织代码（把能复用的逻辑抽成函数和模块）
// 面向从未写过代码的零基础读者，用生活化的比喻解释 Python 3.10+ 语法。
// 每个知识点负责一类概念，examples / practice 的输出均为真实运行结果。

export default [
  {
    id: 'functions-advanced',
    title: '函数进阶：默认参数与返回值',
    phase: 3,
    order: 1,
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
    ],
  },
  {
    id: 'errors-try',
    title: '错误处理：try/except 让程序不崩',
    phase: 3,
    order: 2,
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
    ],
  },
  {
    id: 'modules-import',
    title: '模块：拆开文件与 import 导入',
    phase: 3,
    order: 3,
    minutes: 25,
    rating: { level: 3, must: 5 },
    summary: '把代码拆到多个 .py 文件，用 import 把别的文件里的函数搬进来复用。',
    keywords: ['模块', 'import', 'from', 'math', 'random', '拆分文件'],
    tip: '零基础提示：import 就像跟别人借东西——只需说"我要用 math"，就能用里面现成的数学函数，不用自己从头写。',
    what: '模块就是一个 .py 文件，里面装着别人（或你自己）写好的函数和值，方便大家一起用。`import` 可以把整个模块拿进来，`from ... import` 则只挑其中一两样。标准库自带的 `math`、`random`、`datetime` 都是现成模块，你也能把自己的计算函数拆进单独文件再引进来。',
    analogy: '打个比方：模块像工具箱里分门别类的抽屉，螺丝刀放一个抽屉、扳手放另一个。要用哪个打开哪个抽屉，不用每次都翻一个大混装箱。',
    terms: [
      { term: 'module', zh: '模块', note: '一个 .py 文件就称为一个模块，里面放着可复用的函数或值。' },
      { term: 'import', zh: '导入语句', note: '把整个模块拿进来使用，关键字是 import。' },
      { term: 'from', zh: '从...导入', note: '跟 import 配合，只从模块里挑出你需要的部分。' },
      { term: 'standard library', zh: '标准库', note: '程序自带的一批现成模块，如 math、random，不用额外安装。' },
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
    ],
  },
  {
    id: 'scope',
    title: '作用域：变量在哪里可见',
    phase: 3,
    order: 4,
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
    ],
  },
  {
    id: 'write-helper',
    title: '自己写工具函数并用起来',
    phase: 3,
    order: 5,
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
    ],
  },
]