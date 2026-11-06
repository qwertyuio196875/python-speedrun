/**
 * 第一阶段：认识 Python（零基础入门，约 3.5 小时）
 * 内容规范见 docs/content-schema.md
 * 目标读者：从未写过任何代码的人。
 */
export default [
  {
    id: 'install',
    title: '安装 Python 并运行第一个程序',
    phase: 1,
    order: 1,
    minutes: 25,
    rating: { level: 1, must: 5 },
    summary: '把 Python 装到你的电脑上，打开"终端"，写下人生第一个 print 命令并把它跑出来。',
    keywords: ['安装', '下载', '终端', '命令行', 'python', 'print', '运行', 'IDLE'],
    tip: '零基础提示：第一次装软件别慌，按步骤点"下一步"就好。之后所有东西都要从这里开始。',
    what: '写代码的第一步是先让电脑能"听懂" Python。你需要做两件事：装一个叫 Python 的软件，以及知道在哪里输入代码。这一节的目标很简单——在你的电脑上弹出一行你写的字。',
    analogy: '学用 Python 就像学开口说话：先把"嗓子"（Python 软件）装好，再从喊出第一个字（一行代码）开始。',
    terms: [
      { term: 'install', zh: '安装', note: '把软件复制到电脑上并能运行的过程。' },
      { term: 'terminal', zh: '终端 / 命令行', note: '一个可以打字给电脑、通过文字交流的窗口。' },
      { term: 'code', zh: '代码', note: '用英文和符号写出来的"命令"，电脑照着它执行。' },
      { term: 'print', zh: '打印', note: '把内容显示到屏幕上的命令。' },
      { term: 'PATH', zh: '环境变量路径', note: '告诉系统去哪里找 python 命令；安装时勾选 Add python.exe to PATH 就是加它。' },
    ],
    steps: [
      '去 Python 官网 python.org 下载 Python 3.12 版本。Windows 安装时一定勾选 "Add python.exe to PATH"。',
      '装好后，在开始菜单里打开一个叫 "Python" 或按 Win+R 输入 cmd 打开命令行。',
      '在终端里输入 python 回车，看到 Python 3.12 开头的字，就说明装好了。输入 exit() 退出。',
      '在自己电脑上新建一个文本文件 hello.py，写 print("你好，世界")，然后在终端用 python hello.py 运行它。',
    ],
    examples: [
      {
        title: '你的第一行代码',
        code: 'print("你好，世界")',
        output: '你好，世界',
        note: '这行命令让电脑把引号里的话显示出来。记住：命令外面是英文括号和引号。',
      },
      {
        title: '用代码进行问答',
        code: 'print("你几岁？")\nprint("我 18 岁")',
        output: '你几岁？\n我 18 岁',
        note: 'print 每次会换行，多次 print 就一行一句往下排列。',
      },
      {
        title: '打印多个东西',
        code: 'print("我是", "Python")',
        output: '我是 Python',
        note: 'print 里可以放多个值，中间用英文逗号隔开，输出时自动用空格分隔。',
      },
    ],
    pitfalls: [
      {
        title: '拼音 vs 中文串',
        bad: 'print(你好)',
        good: 'print("你好")',
        note: '中文不能直接写，要放进英文引号 " " 里；否则电脑不知道"你好"是什么。',
      },
      {
        title: '全角标点',
        bad: 'print（"你好"）',
        good: 'print("你好")',
        note: '括号、引号、逗号都必须是英文半角，中文标点会直接报语法错误。',
      },
      {
        title: '忘记存文件就运行',
        bad: 'python hello.py   # 但还是打印出一堆报错',
        good: '运行前先 Ctrl+S 保存，再回命令行运行',
        note: '改完代码先保存，再运行；不保存时运行的是上一次的旧代码。',
      },
      {
        title: '提示 python 不是内部或外部命令',
        bad: 'python : 无法将"python"项识别为命令',
        good: '重新运行安装包并勾选 Add python.exe to PATH，或先用 py 命令代替',
        note: '这是 PATH 没加上的典型报错；重装修复，Windows 下也可以用 py 代替 python。',
      },
    ],
    practice: [
      {
        prompt: '写一行代码，让屏幕显示：我会写代码了！',
        starter: '# 在这里写你的 print 语句\n',
        answer: 'print("我会写代码了！")',
        output: '我会写代码了！',
        hint: '用 print(...)，把这句话放进英文引号里。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print 命令的作用是什么？',
        options: ['把内容保存到文件', '把内容显示到屏幕上', '让电脑关机', '计算数学题'],
        answer: 1,
        explain: 'print（打印）的作用是把内容输出到屏幕上，让你看到运行结果。',
      },
      {
        type: 'judge',
        question: 'print("你好") 里的引号可以用中文引号吗？',
        answer: false,
        explain: '不能用中文引号。代码里的引号、括号、逗号必须是英文半角，否则会语法错误。',
      },
      {
        type: 'code',
        question: '补全代码，让屏幕显示 你好世界。',
        code: 'print(__________)',
        answer: '"你好世界"',
        accept: ["'你好世界'"],
        explain: '把要显示的内容用英文引号包起来放进 print 里。',
      },
    ],
  },
  {
    id: 'variables',
    title: '变量：给数据起名字',
    phase: 1,
    order: 2,
    minutes: 20,
    rating: { level: 1, must: 5 },
    summary: '用一个名字装下数据，之后用名字就能随时取用它——这就是"变量"。',
    keywords: ['变量', '赋值', 'int', 'str', 'float', '类型', '变量名'],
    tip: '零基础提示：变量就是一个"带名字的小盒子"。把东西放进去（赋值），以后喊名字就能把它拿出来。',
    what: '程序里经常要记住数据，比如一个人的名字、年龄。如果把数据直接写死在每个角落，改起来很麻烦。变量帮你把一个值"命名"并保存，之后用那个名字就能反复使用同一个值。这就是为什么程序能处理会变化的数据。',
    analogy: '变量像冰箱冷藏柜的格子：你把一块肉放进去并贴上"猪肉"的标签，之后随时能按标签把它拿出来用。',
    steps: [
      '想好要保存什么数据，取一个见名知义的英文名（如 name、age）',
      '用等号把值赋给变量：name = "小明"',
      '之后在代码里直接写变量名，就等于在使用它装的数据',
      '数据变了就重新赋值，旧值自动被覆盖',
    ],
    terms: [
      { term: 'variable', zh: '变量', note: '给一个值起的名字，用于保存和反复使用。' },
      { term: 'assign', zh: '赋值', note: '用等号把右侧的值"放"进左边名字的操作。' },
      { term: 'type', zh: '数据类型', note: '数据的种类，比如数字、文字；不同类型处理方式不同。' },
      { term: 'naming convention', zh: '命名规范', note: '变量名用小写字母加下划线（如 user_name），见名知意。' },
      { term: 'value', zh: '值', note: '变量里装的具体数据，可以读取，也可以被覆盖。' },
    ],
    examples: [
      {
        title: '保存并打印一个数',
        code: 'age = 18\nprint(age)\nage = 19\nprint(age)',
        output: '18\n19',
        note: '用 = 把值 18 交给名字 age。之后再赋值就把旧值覆盖成新值。',
      },
      {
        title: '给运行结果起名',
        code: 'price = 3\ncount = 5\nprint(price, count)\nprint(price * count)',
        output: '3 5\n15',
        note: '可以同时建好几个变量；用 ＊ 做乘法得到总价。',
      },
      {
        title: '看看数据类型',
        code: 'name = "小明"\nage = 18\nprint(type(name), type(age))',
        output: "<class 'str'> <class 'int'>",
        note: 'str 表示文字，int 表示整数。type() 能告诉你一个数据是哪种类型。',
      },
    ],
    pitfalls: [
      {
        title: '给变量起的名字不能用中文',
        bad: '我的名字 = "小明"',
        good: 'name = "小明"',
        note: '变量名一般用英文、数字和下划线，且不能用数字开头。',
      },
      {
        title: '类型混用会报错',
        bad: 'name = "小明"\nprint(name + 18)',
        good: 'name = "小明"\nprint(name + " 18 岁")',
        note: '文字加数字 Python 不知道怎么办，需要都转成文字再加。',
      },
      {
        title: '等号是赋值不是相等',
        bad: 'age = 18\nprint(age = 18)',
        good: 'age = 18\nprint(age == 18)',
        note: '单个等号 = 是"把值放进变量"，两个等号 == 才是"比较是否相等"。',
      },
      {
        title: '变量还没定义就使用',
        bad: 'print(score)\nscore = 90',
        good: 'score = 90\nprint(score)',
        note: 'Python 从上往下一行行执行，用之前必须先赋值，否则报 NameError。',
      },
    ],
    practice: [
      {
        prompt: '创建一个变量保存你的名字，另一个保存年龄，然后打印出来。',
        starter: 'name = "小明"\nage = 18\n# TODO: 用 print 打印这两个变量\n',
        answer: 'name = "小明"\nage = 18\nprint(name, age)',
        output: '小明 18',
        hint: '把两个变量放进同一个 print，用逗号隔开。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '下面哪个是给变量 age 赋值为 18 的正确写法？',
        options: ['age == 18', 'age = 18', '18 = age', 'print(age=18)'],
        answer: 1,
        explain: '用单个等号把右边的值放进左边的变量名：age = 18。',
      },
      {
        type: 'judge',
        question: '运行 age = 18 后，再次执行 age = 19，age 的值会变成 19。',
        answer: true,
        explain: '重新赋值会覆盖旧值，所以 age 现在是 19。',
      },
      {
        type: 'code',
        question: '补全代码，让变量 score 保存数字 95，并打印它。',
        code: '__________\nprint(score)',
        answer: 'score = 95',
        explain: '用等号把 95 放进变量 score。',
      },
    ],
  },
  {
    id: 'data-types',
    title: '数据类型：数字、文字、布尔',
    phase: 1,
    order: 3,
    minutes: 30,
    rating: { level: 1, must: 5 },
    summary: '认识 Python 的几种最基础的数据：整数、小数、文字、真假、空值，以及它们之间的转换。',
    keywords: ['int', 'float', 'str', 'bool', 'None', '类型转换', 'int()', 'str()'],
    tip: '零基础提示：不同类型的"东西"不能随便混着算。先认识它们，后面写程序就不会老报错。',
    what: '现实里数字和文字是两种东西，Python 里也一样——你没法直接"3 加 五"。Python 把数据分成几种类型：整数（int）、小数（float）、文字（str）、真假（bool）、空（None）。知道类型，才能知道哪些操作允许、结果长什么样。',
    analogy: '类型就像给物品贴了标签：一个盒子标"整数"，一个盒子标"文字"。从不同盒子里取东西，用法完全不同。',
    terms: [
      { term: 'int', zh: '整数', note: '没有小数点的数，比如 1、-5、100。' },
      { term: 'float', zh: '小数', note: '带小数点的数，比如 3.14、0.5。' },
      { term: 'str', zh: '字符串', note: '一串文字，写代码时要放进引号里。' },
      { term: 'bool', zh: '布尔', note: '只有真（True）或假（False）两种取值。' },
      { term: 'None', zh: '空值', note: '表示"这里还没有值"的特殊类型，打印出来就是 None。' },
    ],
    examples: [
      {
        title: '看懂每种类型',
        code: 'a = 10      # 整数\nb = 3.5     # 小数\nc = "你好"  # 文字\nd = True    # 真假\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))',
        output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
        note: 'type() 会告诉你一个值是什么类型。数字不加引号，文字必须加引号。',
      },
      {
        title: '类型转换',
        code: 'print(int("42") + 8)\nprint(str(3) + " 个苹果")\nprint(float("2.5") * 2)',
        output: '50\n3 个苹果\n5.0',
        note: 'int() 把文字转成整数，str() 把数字转成文字，float() 转小数。',
      },
      {
        title: 'None 表示"没有"',
        code: 'nothing = None\nprint(nothing is None)',
        output: 'True',
        note: 'None 表示"这里还没有值"，常用来代表空/缺省，用 is None 来判断。',
      },
    ],
    pitfalls: [
      {
        title: '整数和小数做除法',
        bad: 'print(7 / 2)   # 得到 3.5',
        good: 'print(7 // 2)  # 得到 3，取整除的整数部分',
        note: '一个 / 得到带小数的精确结果，两个 // 只取整数部分（向下）。',
      },
      {
        title: '文字和数字相加',
        bad: 'print("年龄" + 18)',
        good: 'print("年龄" + str(18))',
        note: '不能把文字和数字直接相加，先用 str() 把数字变成文字。',
      },
      {
        title: '把不能转成数字的文字转进 int',
        bad: 'print(int("abc"))',
        good: 'print(int("123"))',
        note: 'int() 只认长得像数字的文字，"abc" 不是数字，会报错。',
      },
      {
        title: '小数精度陷阱',
        bad: 'print(0.1 + 0.2 == 0.3)   # 得到 False',
        good: 'print(round(0.1 + 0.2, 10) == 0.3)   # 得到 True',
        note: '小数在电脑里是近似存储，0.1 + 0.2 其实是 0.30000000000000004；比较前先 round。',
      },
    ],
    practice: [
      {
        prompt: '把字符串 "18" 转成整数，加上 2，并打印结果。',
        starter: 'age_text = "18"\n# TODO: 转成整数，加 2，打印\n',
        answer: 'age_text = "18"\nprint(int(age_text) + 2)',
        output: '20',
        hint: '用 int(age_text) 把文字转成整数，再加 2。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print(7 // 2) 的输出是？',
        options: ['3.5', '3', '2', '报错'],
        answer: 1,
        explain: '// 是整除，只取整数部分，7 // 2 得到 3。',
      },
      {
        type: 'judge',
        question: '字符串（str）是给文字数据用的类型。',
        answer: true,
        explain: '文字数据要用字符串类型，写代码时放进引号 " " 里。',
      },
      {
        type: 'code',
        question: '补全代码，把字符串 "42" 转成整数后打印它的两倍。',
        code: 'num = int("42")\nprint(__________)',
        answer: 'num * 2',
        explain: '转换后 num 是整数 42，乘以 2 得到 84。',
      },
    ],
  },
  {
    id: 'operators',
    title: '运算符与表达式：让数据动起来',
    phase: 1,
    order: 4,
    minutes: 30,
    rating: { level: 1, must: 5 },
    summary: '加减乘除、取余、乘方、比较、与或非：把数据和条件"算"起来的那批符号。',
    keywords: ['运算符', '算术', '取余', '比较', 'and', 'or', 'not'],
    tip: '零基础提示：运算符就是数学课那些符号外加几个新朋友。先记住 / 是除、// 是整除、% 是取余、** 是乘方，其余和数学课一样。',
    what: '程序的本质是"算"：价格乘数量、成绩比大小、条件与或非。运算符把这些计算写成一行行表达式，表达式算完都会得到一个值，可以直接打印，也可以存进变量。后面要写的判断、循环、业务逻辑，全都建立在它们上面。',
    analogy: '打个比方：运算符像厨房里的刀具套装——切块（+ - * /）、切丁（//）、分份取份（%）、翻倍（**），配上秤（比较）和电闸开关（and/or/not），就能做一桌菜。',
    terms: [
      { term: 'operator', zh: '运算符', note: '+ - * / 这类表示运算的符号。' },
      { term: 'expression', zh: '表达式', note: '由数据和运算符组成、能算出一个值的式子。' },
      { term: 'modulo', zh: '取余', note: '% 求除法余数，常用判断整除，如 n % 2 == 0 表示偶数。' },
      { term: 'logical operator', zh: '逻辑运算符', note: 'and 与、or 或、not 非，把多个真假条件组合起来。' },
      { term: 'augmented assignment', zh: '简写赋值', note: '+=、*= 这类"算完就存回原变量"的简写。' }
    ],
    steps: [
      '打开上一节的 hello.py，把各种运算符挨个 print 一遍',
      '重点试 // 整除和 % 取余，观察它们和 / 的区别',
      '把比较运算的 True / False 打印出来看看',
      '用 and / or / not 组合两个条件试试',
      '用 n += 1 代替 n = n + 1，体会简写赋值',
    ],
    examples: [
      {
        title: '算术运算全家桶',
        code: 'print(7 + 3, 7 - 3, 7 * 3, 7 / 3)\nprint(17 % 5, 2 ** 10)\nprint(7 // 2)',
        output: '10 4 21 2.3333333333333335\n2 1024\n3',
        note: '/ 得到精确小数；// 整除只取整数部分；% 取余数；** 是乘方。',
      },
      {
        title: '比较与逻辑运算',
        code: 'age = 20\nprint(age >= 18, age == 18, age != 18)\nprint(age >= 18 and age < 60)\nprint(age < 18 or age > 100)\nprint(not age < 18)',
        output: 'True False True\nTrue\nFalse\nTrue',
        note: '比较得到 True/False；and 两边都真才真，or 一边真就真，not 取反。',
      },
      {
        title: '简写赋值：算完就存回去',
        code: 'n = 10\nn += 5   # 等价于 n = n + 5\nprint(n)\nn *= 2   # 等价于 n = n * 2\nprint(n)',
        output: '15\n30',
        note: '+=、-=、*=、//= 都是同一套路：先运算，再把结果赋回同一个变量。',
      }
    ],
    pitfalls: [
      {
        title: '除法的三个符号混用',
        bad: 'print(7 // 2)   # 想算精确除法却用了 //，得到 3',
        good: 'print(7 / 2)   # 得到 3.5',
        note: '/ 精确除、// 向下取整、% 取余数，想清楚要哪种再下手。'
      },
      {
        title: 'and / or 的含义记反',
        bad: 'if age < 18 or age > 60:   # 想表达"18 到 60 之间"',
        good: 'if 18 <= age <= 60:',
        note: 'or 是"任一满足就成立"；两个条件都要满足必须用 and。区间还能像右边这样连写。'
      },
      {
        title: '字符串和数字相乘想当然',
        bad: 'print("3" * 3 == 9)   # 得到 False',
        good: 'print(int("3") * 3)   # 9；而 "3" * 3 会得到 "333"',
        note: '"数字文字" * 整数是重复文字，不是数学乘法；先转 int 再算。'
      }
    ],
    practice: [
      {
        prompt: 'total 有 3725 秒，用整除和取余拆成"几小时几分钟几秒"并打印。',
        starter: 'total = 3725\n# TODO: 用 // 和 % 拆出时分秒\n',
        answer: 'total = 3725\nhours = total // 3600\nminutes = total % 3600 // 60\nseconds = total % 60\nprint(hours, "小时", minutes, "分", seconds, "秒")',
        output: '1 小时 2 分 5 秒',
        hint: '先 // 3600 得小时；剩余部分 % 3600 再 // 60 得分钟；最后 % 60 得秒。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print(17 % 5) 的输出是？',
        options: ['3', '2', '3.4', '0'],
        answer: 1,
        explain: '17 除以 5 商 3 余 2，% 取的是余数 2。',
      },
      {
        type: 'judge',
        question: '表达式 3 > 2 and 2 > 1 的结果是 True。',
        answer: true,
        explain: 'and 要求两边都为真，3>2 与 2>1 都成立，所以是 True。',
      },
      {
        type: 'code',
        question: '补全：判断 n 是偶数（能被 2 整除）。',
        code: 'n = 8\nprint(__________ == 0)',
        answer: 'n % 2',
        accept: ['n%2'],
        explain: 'n % 2 是 n 除以 2 的余数，余 0 就是偶数。',
      },
    ],
  },
  {
    id: 'list',
    title: '列表：把一组数据装在一起',
    phase: 1,
    order: 5,
    minutes: 30,
    rating: { level: 1, must: 5 },
    summary: '列表能按顺序装很多个数据，用下标取其中的某一个，是 Python 里最常用的一种"容器"。',
    keywords: ['list', '列表', '下标', '索引', 'append', '切片', '容器'],
    tip: '零基础提示：列表像一个"有格子的抽屉"，每格都有编号，从 0 开始数，可以放任意多个东西。',
    what: '程序里经常要处理"一组"数据：一个班的成绩、一列表的待办事项。列表（list）就是用来按顺序存放和取用这些数据的容器。你可以往里面加东西、改东西、按编号取出其中一个，它是处理数据的基本功。',
    analogy: '列表像超市货架：每个位置有编号，从 0 开始。你知道货架哪个位置放什么，随时能取下来。',
    terms: [
      { term: 'list', zh: '列表', note: '按顺序存放一组数据，用方括号 [] 定义。' },
      { term: 'index', zh: '下标 / 索引', note: '元素在列表里的位置编号，从 0 开始。' },
      { term: 'append', zh: '追加', note: '往列表末尾加一个元素。' },
      { term: 'slice', zh: '切片', note: '用 [起:止] 取出一段元素，含头不含尾。' },
      { term: 'negative index', zh: '负下标', note: '-1 是最后一个元素，-2 是倒数第二个。' },
    ],
    examples: [
      {
        title: '创建一个列表并取元素',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nprint(fruits[0])\nprint(fruits[2])\nprint(len(fruits))',
        output: '苹果\n橙子\n3',
        note: '下标从 0 开始，所以下标 0 是第一个元素，下标 2 是第三个。len() 得到长度。',
      },
      {
        title: '往列表里加东西',
        code: 'names = ["小明"]\nnames.append("小红")\nnames.append("小刚")\nprint(names)\nprint(len(names))',
        output: "['小明', '小红', '小刚']\n3",
        note: 'append 把新元素加到末尾，列表会变长。',
      },
      {
        title: '修改和切片',
        code: 'scores = [80, 90, 70]\nscores[1] = 95\nprint(scores)\nprint(scores[1:3])',
        output: '[80, 95, 70]\n[95, 70]',
        note: '可以用下标修改某一格；切片 [1:3] 取出第 2 到第 3 个元素。',
      },
    ],
    pitfalls: [
      {
        title: '下标从 0 开始',
        bad: 'fruits[3]  # 一共 3 个时越界报错',
        good: 'fruits[2]  # 取第 3 个，下标是 2',
        note: '下标从 0 数起，所以最后一个元素的下标是 len(list)-1。',
      },
      {
        title: '下标越界',
        bad: 'fruits[100]',
        good: 'fruits[-1]  # 或判断下标是否小于 len',
        note: '取不存在的下标会报 IndexError。负下标从尾部数，-1 是最后一个。',
      },
      {
        title: '赋值不是复制',
        bad: 'a = [1, 2]\nb = a\nb.append(3)  # a 也变了',
        good: 'b = a[:]   # 或 b = list(a)，复制一份再改',
        note: 'a = b 只是让两个名字指向同一个列表，改一个等于改全部。要复制用 list(a) 或切片。',
      },
      {
        title: 'append 和 extend 混用',
        bad: 'nums = [1, 2, 3]\nnums.append([4, 5])   # 变成 [1, 2, 3, [4, 5]]',
        good: 'nums.extend([4, 5])   # 变成 [1, 2, 3, 4, 5]',
        note: 'append 把整个东西当一个元素塞进去；合并两个列表要用 extend 或 +=。',
      },
    ],
    practice: [
      {
        prompt: '建一个列表 chores 装三件要做的事，把第二件改成"写作业"，再打印整个列表。',
        starter: 'chores = ["扫地", "晾衣服", "洗碗"]\n# TODO: 把第二件改成"写作业"，再打印\n',
        answer: 'chores = ["扫地", "晾衣服", "洗碗"]\nchores[1] = "写作业"\nprint(chores)',
        output: "['扫地', '写作业', '洗碗']",
        hint: '第二件对应的下标是 1，用 chores[1] = "写作业"。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '一个列表有 3 个元素，最后一个元素的下标是几？',
        options: ['3', '2', '1', '0'],
        answer: 1,
        explain: '下标从 0 开始，所以第 1 个是下标 0，第 3 个是下标 2。',
      },
      {
        type: 'judge',
        question: 'names.append("小红") 会把新元素加到列表的末尾。',
        answer: true,
        explain: 'append 专门用于往列表末尾追加元素。',
      },
      {
        type: 'code',
        question: '补全代码，往列表 nums 末尾加入数字 5。',
        code: 'nums = [1, 2, 3]\n__________',
        answer: 'nums.append(5)',
        accept: ["nums.append(5)"],
        explain: 'append 方法会修改原列表，把参数加到末尾。',
      },
    ],
  },
  {
    id: 'if-condition',
    title: 'if 判断：让程序做选择',
    phase: 1,
    order: 6,
    minutes: 30,
    rating: { level: 1, must: 5 },
    summary: '用 if / elif / else 让程序根据不同条件走不同分支，是真的做"判断"的能力。',
    keywords: ['if', 'elif', 'else', '条件', '判断', '缩进', '比较'],
    tip: '零基础提示：if 就是"如果……就……"。靠缩进（前面空 4 格）表示哪些代码属于哪个分支，别小看缩进。',
    what: '程序不是只会一路跑到底。你想让它在"成绩>=60"时显示及格、否则显示不及格，就需要判断语句。if / elif / else 让程序根据条件的真假，选择执行不同的代码，这是让程序"聪明"起来的第一步。',
    analogy: 'if 像过马路看红绿灯：红灯就走不了（走 else 分支），绿灯才走（走 if 分支），每个情况对应一种走法。',
    terms: [
      { term: 'if', zh: '如果', note: '满足某个条件时才执行下面的代码。' },
      { term: 'condition', zh: '条件', note: '一个能算成真或假的判断，比如 age >= 18。' },
      { term: 'indentation', zh: '缩进', note: '行首的空格；用它表示代码属于哪个块。' },
      { term: 'elif', zh: '否则如果', note: '多个条件从上到下依次检查，命中一个就不再往下。' },
      { term: 'chained comparison', zh: '连写比较', note: '像数学一样连写区间，如 0 <= score <= 100。' },
    ],
    examples: [
      {
        title: '一个最简单的判断',
        code: 'score = 75\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")',
        output: '及格',
        note: '条件成立执行 if 下的代码，否则执行 else 下的代码。',
      },
      {
        title: '用 elif 处理多个情况',
        code: 'age = 15\nif age < 12:\n    print("儿童")\nelif age < 18:\n    print("青少年")\nelse:\n    print("成年")',
        output: '青少年',
        note: 'elif 是"否则如果"，可以连用很多个，从上往下一个个试。',
      },
      {
        title: '在判断里放字符串',
        code: 'color = "红"\nif color == "红":\n    print("停")\nelse:\n    print("走")',
        output: '停',
        note: '比较文字用 == 是否相等；一个等号是赋值，别写错。',
      },
    ],
    pitfalls: [
      {
        title: '缩进不一致',
        bad: 'if score >= 60:\nprint("及格")',
        good: 'if score >= 60:\n    print("及格")',
        note: 'if 下面的代码必须缩进（一般 4 个空格），否则报 IndentationError。',
      },
      {
        title: '用 = 而不是 ==',
        bad: 'if score = 60:',
        good: 'if score == 60:',
        note: '判断相等是双等号 ==。单等号是赋值，放在判断里会语法错误。',
      },
      {
        title: '条件后忘了冒号',
        bad: 'if score >= 60',
        good: 'if score >= 60:',
        note: 'if 条件之后必须跟一个英文冒号 :。',
      },
      {
        title: '多分支写成 else if',
        bad: 'if score >= 90:\n    print("优")\nelse if score >= 60:\n    print("及格")',
        good: 'if score >= 90:\n    print("优")\nelif score >= 60:\n    print("及格")',
        note: 'Python 的多分支关键字是 elif，写成 else if 会直接语法错误。',
      },
    ],
    practice: [
      {
        prompt: '判断温度：>=36 打印"有点热"，否则打印"还行"，用 if/else 实现。',
        starter: 'temp = 32\n# TODO: 用 if/else 判断并打印\n',
        answer: 'temp = 32\nif temp >= 36:\n    print("有点热")\nelse:\n    print("还行")',
        output: '还行',
        hint: '条件写 temp >= 36，成立走 if 分支。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '下面哪个是该用 if / elif / else 解决的问题？',
        options: ['把列表里的每个数打印出来', '根据分数给出及格或不及格', '把两个数字相加', '连接两个字符串'],
        answer: 1,
        explain: 'if 用来做判断、根据条件走不同的分支；遍历、相加属于其它场景。',
      },
      {
        type: 'judge',
        question: 'if 后面的条件成立时，会执行冒号下面、缩进的那些代码。',
        answer: true,
        explain: '条件为真就执行紧跟在其后、缩进 4 个空格的那些语句。',
      },
      {
        type: 'code',
        question: '补全：如果 x 大于 10 就打印"大"。',
        code: 'x = 20\nif __________:\n    print("大")',
        answer: 'x > 10',
        accept: ['x>10'],
        explain: '条件是一个比较表达式，为真才执行打印。',
      },
    ],
  },
  {
    id: 'for-loop',
    title: 'for 循环：反复做同一件事',
    phase: 1,
    order: 7,
    minutes: 30,
    rating: { level: 1, must: 5 },
    summary: '用 for 循环遍历列表里的每一项，或照指定次数反复执行，是处理批量数据的核心。',
    keywords: ['for', '循环', '遍历', 'range', '迭代', 'break', 'continue'],
    tip: '零基础提示：for 就是"对里面的每一个，都做一遍"。不需要自己数数，Python 帮你挨个来处理。',
    what: '遇到"把全班每个学生的成绩打印一遍""给每种水果都打个分"这类事，你会希望程序自动挨个处理，而不是手写一百遍。for 循环正是为此而生：它按顺序访问列表里的每一项，对每项执行同样的操作，这才是处理数据的核心。',
    analogy: 'for 循环像流水线上的机械手：传送带把每个盒子递过来，机械手对每个盒子做同样的动作，直到送完为止。',
    terms: [
      { term: 'for loop', zh: 'for 循环', note: '逐个遍历一组数据，对每个元素执行循环里的代码。' },
      { term: 'iterate', zh: '遍历 / 迭代', note: '按顺序访问每一个元素的过程。' },
      { term: 'range', zh: '范围', note: '生成从几到几的整数序列，常配合 for 循环用。' },
      { term: 'enumerate', zh: '枚举', note: '同时拿到下标和元素的内置函数：for i, f in enumerate(列表)。' },
      { term: 'zip', zh: '配对遍历', note: 'zip(列表A, 列表B) 把两个列表按位置配对，一次遍历两份。' },
    ],
    examples: [
      {
        title: '遍历一个列表',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nfor f in fruits:\n    print("我爱吃", f)',
        output: '我爱吃 苹果\n我爱吃 香蕉\n我爱吃 橙子',
        note: '每次循环 f 会被自动赋成列表里的下一个元素，循环体执行一遍。',
      },
      {
        title: '用 range 循环指定次数',
        code: 'for i in range(5):\n    print("第", i, "次")',
        output: '第 0 次\n第 1 次\n第 2 次\n第 3 次\n第 4 次',
        note: 'range(5) 生成 0~4 共 5 个数（不含 5），从 0 开始数。',
      },
      {
        title: 'break 和 continue',
        code: 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    if i > 6:\n        break\n    print(i)',
        output: '1\n3\n5',
        note: 'continue 跳过本次直接下一次；break 直接结束整个循环。',
      },
    ],
    pitfalls: [
      {
        title: 'range 右端不含',
        bad: 'for i in range(1, 5):  # 只到 4',
        good: 'for i in range(1, 6):  # 才到 5',
        note: 'range(起点, 终点) 生成从起点到"终点前一个"，终点本身不算。',
      },
      {
        title: '遍历时边删边改列表',
        bad: 'for x in nums:\n    nums.remove(x)',
        good: 'nums = [x for x in nums if x > 0]',
        note: '在循环里删除当前项会跳过元素，正确做法是生成一个新列表。',
      },
      {
        title: '以为要手动加下标',
        bad: 'i = 0\nfor f in fruits:\n    print(i); i += 1',
        good: 'for i, f in enumerate(fruits):\n    print(i, f)',
        note: '需要"下标 + 元素"时用 enumerate，干净且不会出错。',
      },
      {
        title: 'range 起点写错漏掉第一个',
        bad: 'for i in range(1, len(nums)):\n    print(nums[i])   # 漏了下标 0',
        good: 'for i in range(len(nums)):\n    print(nums[i])',
        note: 'range 默认从 0 开始；写成 range(1, ...) 会悄悄漏掉第一个元素。'
      },
    ],
    practice: [
      {
        prompt: '用 for 循环遍历列表 nums，把每个数乘以 2 打印出来。',
        starter: 'nums = [1, 2, 3, 4]\n# TODO: 用 for 循环打印每个数的两倍\n',
        answer: 'nums = [1, 2, 3, 4]\nfor n in nums:\n    print(n * 2)',
        output: '2\n4\n6\n8',
        hint: '变量 n 会依次等于每个数，循环体里做 n * 2 并打印。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'range(3) 会生成哪些数？',
        options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'],
        answer: 1,
        explain: 'range(3) 等价 range(0, 3)，生成 0、1、2 共 3 个数。',
      },
      {
        type: 'judge',
        question: 'for f in fruits: 会依次把 fruits 里的每个元素赋给 f。',
        answer: true,
        explain: '每次循环 f 自动取列表的下一个元素，直到遍历完。',
      },
      {
        type: 'code',
        question: '补全：打印出 0 到 4（共 5 个数）里的每一个。',
        code: 'for i in __________:\n    print(i)',
        answer: 'range(5)',
        accept: ['range(5)'],
        explain: 'range(5) 生成 0、1、2、3、4 五个数，逐个打印。',
      },
    ]
  },
  {
    id: 'branch-loop-practice',
    title: '综合实战：分支加循环解决问题',
    phase: 1,
    order: 8,
    minutes: 30,
    rating: { level: 2, must: 5 },
    summary: '把 if 和 for 组合起来：统计、找最值、算平均，以及经典的九九乘法表。',
    keywords: ['综合练习', '统计', 'max', 'sum', '嵌套循环', '乘法表'],
    tip: '零基础提示：真正的程序都是"循环里套判断"。这一节不学新语法，专门把它们拼起来解决三个真实小问题。',
    what: '单独的 if 和 for 都很简单，程序的本领来自组合：循环负责"挨个拿到数据"，判断负责"对每个数据决定怎么办"。统计及格人数、找最大值、算平均分、打印九九乘法表，用的全是这两样的组合。max()、sum() 这些现成函数，也是把常见组合打包好了送给你。',
    analogy: '打个比方：for 是流水线传送带，if 是传送带旁的质检员——东西一个个过来，合格的装箱、不合格的剔除，合起来就是一条完整产线。',
    terms: [
      { term: 'max', zh: '求最大值', note: '内置函数，max(列表) 返回最大的元素。' },
      { term: 'sum', zh: '求和', note: '内置函数，sum(列表) 把所有数加起来。' },
      { term: 'nested loop', zh: '嵌套循环', note: '循环里面再放循环：外圈走一步，内圈走一整圈。' },
      { term: 'end', zh: '结尾参数', note: 'print(..., end="...") 可以把默认的换行换成别的内容。' },
      { term: 'accumulator', zh: '累加器', note: '在循环外清零、循环里不断累加的变量。' }
    ],
    steps: [
      '先写数据：scores = [58, 92, 74, 81, 45]',
      '任务一：for 里嵌 if，数出及格人数',
      '任务二：用 max()、sum()、len() 求最高分和平均分',
      '任务三：用两层 for 打印乘法口诀表前三行',
      '全部跑通后，改动数据再验证一遍结果',
    ],
    examples: [
      {
        title: '统计及格人数',
        code: `scores = [58, 92, 74, 81, 45]
passed = 0
for s in scores:
    if s >= 60:
        passed += 1
print("及格人数", passed)`,
        output: `及格人数 3`,
        note: '循环负责逐个拿分，判断负责筛选；计数器要在循环外先清零。',
      },
      {
        title: '最高分与平均分',
        code: `scores = [58, 92, 74, 81, 45]
print("最高分", max(scores))
print("平均分", round(sum(scores) / len(scores), 1))`,
        output: `最高分 92
平均分 70.0`,
        note: 'max/sum/len 是现成的内置函数；除法得到小数，用 round 保留一位。',
      },
      {
        title: '九九乘法表前三行',
        code: `for i in range(1, 4):
    for j in range(1, i + 1):
        print(f"{j}×{i}={i*j}", end="\\t")
    print()`,
        output: `1×1=1
1×2=2\t2×2=4
1×3=3\t2×3=6\t3×3=9`,
        note: '外层 i 控制第几行，内层 j 控制一行里几列；end="\\t" 用制表符代替换行对齐。',
      }
    ],
    pitfalls: [
      {
        title: '计数器放在循环里清零',
        bad: 'for s in scores:\n    passed = 0\n    if s >= 60:\n        passed += 1',
        good: 'passed = 0\nfor s in scores:\n    if s >= 60:\n        passed += 1',
        note: '累计用的变量必须在循环外初始化，放里面每转一圈都会被清零。'
      },
      {
        title: '嵌套循环内外层写反',
        bad: 'for j in range(1, i + 1):\n    for i in range(1, 4):',
        good: 'for i in range(1, 4):\n    for j in range(1, i + 1):',
        note: '内层要用到 i，外层就必须是 i 在外；写反了内层根本读不到它。'
      },
      {
        title: '判断放错了缩进层级',
        bad: 'for s in scores:\n    pass\nif s >= 60:\n    passed += 1   # 循环外只判断最后一个',
        good: 'for s in scores:\n    if s >= 60:\n        passed += 1',
        note: 'if 想对每个元素生效，就必须缩进在 for 里面；缩进出循环它只执行一次。'
      }
    ],
    practice: [
      {
        prompt: '统计 nums = [3, 6, 4, 7, 8] 里偶数的个数与总和，输出：偶数个数 3 总和 18。',
        starter: `nums = [3, 6, 4, 7, 8]
count = 0
total = 0
# TODO: 循环加判断，统计偶数个数与总和
`,
        answer: `nums = [3, 6, 4, 7, 8]
count = 0
total = 0
for n in nums:
    if n % 2 == 0:
        count += 1
        total += n
print("偶数个数", count, "总和", total)`,
        output: `偶数个数 3 总和 18`,
        hint: 'n % 2 == 0 判断偶数；count 和 total 都要在循环外清零。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'max([58, 92, 74]) 的结果是？',
        options: ['58', '74', '92', '224'],
        answer: 2,
        explain: 'max 返回列表里最大的元素，这里是 92。',
      },
      {
        type: 'judge',
        question: 'print(f"{j}×{i}={i*j}", end="\\t") 里的 end="\\t" 表示打印后不换行，改打一个制表符。',
        answer: true,
        explain: 'print 默认 end 是换行符；换成 \\t 就能一行里并排打印多个算式。',
      },
      {
        type: 'code',
        question: '补全：遍历 scores 求总和。',
        code: 'scores = [58, 92, 74]\ntotal = 0\nfor s in scores:\n    __________',
        answer: 'total += s',
        accept: ['total = total + s'],
        explain: '每圈把当前分数累加进 total，等价写法是 total = total + s。',
      }
    ]
  },
  {
    id: 'debug-basics',
    title: '调试入门：读懂报错与 print 排查',
    phase: 1,
    order: 9,
    minutes: 30,
    rating: { level: 2, must: 5 },
    summary: '学会读错误提示的三要素，用 print 打点定位问题，把"报错就慌"变成"按图索骥"。',
    keywords: ['调试', '报错', 'traceback', 'print 调试', 'NameError', 'TypeError'],
    tip: '零基础提示：报错不是"程序坏了"，是电脑在给你留线索。最后一行是错误类型和原因，往上还能找到出错的行号——顺着读就能找到病根。',
    what: '写程序一定会遇到报错。Python 的报错信息其实是一张"藏宝图"：最后两行写清错误类型（如 NameError）和一句话原因，往上翻能找到出错的文件和行号。更高一层的办法是 print 调试：在关键位置打印变量的值，看程序每一步实际算出了什么、和预期差在哪。这两个本事会伴你整个编程生涯。',
    analogy: '报错信息像医院的化验单：类型是"病名"，行号是"病灶位置"，原因是"症状描述"；print 打点像自己沿途撒面包屑，走丢了顺着屑找回来。',
    terms: [
      { term: 'traceback', zh: '错误追踪', note: '报错时打印的整段信息，从下往上读：最先看到错误类型和位置。' },
      { term: 'debug', zh: '调试', note: '找到并修掉程序错误的过程。' },
      { term: 'print debugging', zh: 'print 调试法', note: '在关键步骤打印变量值，观察程序实际算出的内容。' },
      { term: 'NameError', zh: '名字错误', note: '用了没定义或拼错的变量名。' },
      { term: 'TypeError', zh: '类型错误', note: '对不匹配的类型做了运算，如文字加数字。' }
    ],
    steps: [
      '故意写一个错代码（如 print(naem)），运行并完整读一遍报错',
      '对照报错：最后一行是"类型 + 原因"，往上找 File 和 line 指向的行号',
      '修好后运行确认，再故意换一种错（如下标越界）练一遍',
      '写超过 10 行的程序时，在每步算完的地方加 print 打点',
      '问题定位后删掉临时 print，保持代码干净',
    ],
    examples: [
      {
        title: '用 print 打点看程序走到了哪',
        code: `def total(price, count):
    print("收到参数:", price, count)
    result = price * count
    print("算出结果:", result)
    return result

print(total(3, 5))`,
        output: `收到参数: 3 5
算出结果: 15
15`,
        note: '在每个关键步骤后打印变量值：哪一步的输出不对，问题就出在那一步。',
      },
      {
        title: '常见错误类型速查',
        code: `errors = {
    "SyntaxError": "语法写错了",
    "NameError": "名字没定义或拼错了",
    "TypeError": "类型用错了",
    "IndexError": "下标越界了",
}
for k, v in errors.items():
    print(k, "→", v)`,
        output: `SyntaxError → 语法写错了
NameError → 名字没定义或拼错了
TypeError → 类型用错了
IndexError → 下标越界了`,
        note: '把这张表贴在手边：报错先认类型，再对号入座排查。',
      },
      {
        title: '一个 NameError 的修复过程',
        code: `# 错误写法：print("你好,", naem)
# 报错：NameError: name 'naem' is not defined
# 原因：naem 拼错了，应该是 name
name = "小明"
print("你好,", name)`,
        output: `你好, 小明`,
        note: '修复三步：读类型（NameError）→ 看行号 → 对着原因找拼错的变量名。',
      }
    ],
    pitfalls: [
      {
        title: '只盯着报错最后一行不看行号',
        bad: '看到 TypeError 就到处乱改',
        good: '从报错里找到 "File xxx, line N"，跳到那一行看',
        note: '报错里的 File 和 line 告诉你病灶在哪一行，先到那行再对症下药。'
      },
      {
        title: '改完不保存就运行',
        bad: '在编辑器里改了代码，直接切回终端运行旧文件',
        good: 'Ctrl+S 保存后再运行',
        note: '运行的是硬盘上的文件，编辑器里没保存的改动等于没改。'
      },
      {
        title: '一次改五个地方再运行',
        bad: '凭感觉连改多处，报错换了但更懵',
        good: '一次只改一处，运行验证，再改下一处',
        note: '小步验证才能确定"这一处改对了"；一次改多处会让线索全乱。'
      }
    ],
    practice: [
      {
        prompt: '下面的脚本会报 IndexError。先运行看报错，再修复：让它打印列表的最后一个元素。',
        starter: `nums = [1, 2, 3]
print(nums[5])
`,
        answer: `nums = [1, 2, 3]
print(nums[-1])`,
        output: `3`,
        hint: '报错 IndexError: list index out of range；最后一个元素用负下标 -1。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: "看到 NameError: name 'naem' is not defined，最可能的原因是？",
        options: ['电脑中毒了', '变量名拼错了', 'Python 没安装', '文件没保存'],
        answer: 1,
        explain: 'NameError 表示这个名字不存在，多半是拼错或还没定义就用。',
      },
      {
        type: 'judge',
        question: '报错信息里通常包含出错的行号，可以帮你快速定位。',
        answer: true,
        explain: '报错里的 File "xxx", line N 指向出错位置，是排错的第一入口。',
      },
      {
        type: 'code',
        question: '补全：安全地打印列表最后一个元素。',
        code: 'nums = [1, 2, 3]\nprint(nums[__________])',
        answer: '-1',
        accept: ['len(nums) - 1'],
        explain: '负下标 -1 表示最后一个元素，不会越界。',
      }
    ]
  }
]