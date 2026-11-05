/**
 * 第六阶段：常用模块（Python 自带的标准库，约 2 小时 10 分钟）
 * 内容规范见 docs/content-schema.md
 * 面向从未写过代码的零基础学习者。
 */
export default [
  {
    id: 'json-module',
    title: 'json：让程序和程序交换数据',
    phase: 6,
    order: 1,
    minutes: 26,
    rating: { level: 2, must: 5 },
    summary: 'json.dumps 把 Python 数据变成 JSON 字符串，json.loads 再把 JSON 字符串变回 Python 数据，是程序与程序交流的通用格式。',
    keywords: ['json', 'dumps', 'loads', '字符串', '序列化', '交换数据'],
    tip: '零基础提示：把 json 想成一封信的"通用信封"。你的程序写好信（Python 数据），用 dumps 封进信封（变成字符串），对方程序用 loads 拆开信封，就能读到同样的内容。',
    what: 'json 是标准库里的一个模块，负责把 Python 数据（比如字典、列表）转成一段文本，或者反过来把文本转回 Python 数据。这里说的"转成文本"就是程序间交换数据的通用格式，很多网络接口（API）都是用这个格式回答的。dumps 里的 s 代表 string（字符串），所以 json.dumps 是把数据变字符串；json.loads 里的 s 同样代表字符串，所以它是把字符串变回数据。',
    analogy: '打个比方：json.dumps 相当于把你的文具收拾进一个贴好标签的文具盒（一段有规矩的文本），json.loads 相当于别人收到文具盒后再把文具一件件取出来。只要大家都用同一种文具盒，谁寄给谁都能看懂。',
    terms: [
      { term: 'module', zh: '模块', note: '一堆写好的、可以直接拿来用的功能，用 import 引入' },
      { term: 'dictionary', zh: '字典', note: '用花括号 {} 包起来、按"键: 值"成对存数据的东西' },
      { term: 'json', zh: 'JSON', note: '一种有固定书写规则的纯文本格式，专门给程序之间交换数据用' },
      { term: 'serialize', zh: '序列化', note: '把内存中的数据变成可保存、可传输的文本的过程' }
    ],
    steps: [
      '用 import json 引入模块',
      '想发数据：json.dumps(数据) 得到一段 JSON 字符串',
      '想收数据：json.loads(JSON字符串) 得到 Python 数据'
    ],
    examples: [
      {
        title: '把一个字典变成 JSON 字符串',
        code: 'import json\n\ndata = {"name": "小明", "age": 18}\ntext = json.dumps(data, ensure_ascii=False)\nprint(text)\nprint(type(text))',
        output: '{"name": "小明", "age": 18}\n<class \'str\'>',
        note: 'ensure_ascii=False 让中文原样显示而不是变成 \\u 开头的转义码。转成之后 text 是一个普通的字符串。'
      },
      {
        title: '把 JSON 字符串变回字典',
        code: 'import json\n\ntext = \'{"name": "小明", "age": 18}\'\ndata = json.loads(text)\nprint(data["name"])\nprint(data["age"])',
        output: '小明\n18',
        note: 'json.loads 读入后得到一个字典，可以像平时的字典一样用键去取值。'
      }
    ],
    pitfalls: [
      {
        title: 'dumps 和 loads 的方向搞反',
        bad: 'json.loads({"name": "小明"})   # 传入的是字典，不是字符串',
        good: 'json.dumps({"name": "小明"})   # dumps 负责把数据变字符串',
        note: 's 代表 string，所以 dumps 把数据变字符串、loads 把字符串变数据，方向正好相反。'
      },
      {
        title: '想让中文正常显示却忘记参数',
        bad: 'json.dumps({"name": "小明"})',
        good: 'json.dumps({"name": "小明"}, ensure_ascii=False)',
        note: '不加 ensure_ascii=False 时中文会变成 \\u5c0f\\u660e 一类的转义码，人不好读，但程序能读。'
      }
    ],
    practice: [
      {
        prompt: '用 json.dumps 把 {"city": "北京"} 变成 JSON 字符串并打印（让中文正常显示）。',
        starter: 'import json\n\ncity = {"city": "北京"}\n# TODO: 变成字符串并打印\n',
        answer: 'import json\n\ncity = {"city": "北京"}\ntext = json.dumps(city, ensure_ascii=False)\nprint(text)',
        output: '{"city": "北京"}',
        hint: '用 json.dumps(数据, ensure_ascii=False) 得到字符串，再 print。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '想把一个字典发给别的程序，应该用哪个函数？',
        options: ['json.loads', 'json.dumps', 'len', 'str.upper'],
        answer: 1,
        explain: '发送时要把数据变成字符串，用 json.dumps。'
      },
      {
        type: 'judge',
        question: 'json.loads 的一段输入，应该是一段 JSON 字符串而不是字典。',
        answer: true,
        explain: 'loads 负责把字符串变回数据，s 代表 string，输入必须是字符串。'
      },
      {
        type: 'choice',
        question: '以下哪一句能把字符串转回 Python 字典？',
        options: ['json.dumps(text)', 'json.loads(text)', 'text.upper()', 'str(text)'],
        answer: 1,
        explain: '收数据时要把字符串变回数据，用 json.loads。'
      }
    ]
  },
  {
    id: 'datetime-module',
    title: 'datetime：处理日期和时间',
    phase: 6,
    order: 2,
    minutes: 28,
    rating: { level: 2, must: 5 },
    summary: '用 datetime 拿到当前时间、格式化成年月日、算两个日期间隔多少天。',
    keywords: ['datetime', 'date', 'now', 'strftime', 'timedelta', '日期'],
    tip: '零基础提示：date 管"哪一天"，time 管"几点"；datetime 把两者合在一起。你要当前时间就用 datetime.now()，只要日期就写 datetime.date.today()。',
    what: 'datetime 模块帮你处理"年、月、日、时、分、秒"。它提供了几种类型：date（只含日期）、time（只含时间）、datetime（日期和时间都含）。datetime.now() 返回当前这一刻的日期时间；strftime 按你给的格式把日期时间变成好看的字符串；两个日期直接相减得到一个 timedelta，用它的 .days 就能算出相差的天数。',
    analogy: '打个比方：日期时间像一张台历。datetime.now() 相当于"翻开今天这一页"，strftime 相当于"把哪年哪月哪日抄进你的日程表格"，日期相减相当于数两页台历之间隔了多少天。',
    terms: [
      { term: 'date', zh: '日期', note: '只关心年、月、日，不含时分秒' },
      { term: 'strftime', zh: '格式化日期时间', note: '按指定模板把日期时间变成字符串，%Y %m %d 是具体的格式符号' },
      { term: 'timedelta', zh: '时间差', note: '两个日期或时间相减得到的差值，可以读出 days（天数）' }
    ],
    steps: [
      'from datetime import date, datetime 引入需要的类型',
      '拿当前时间：datetime.now()',
      '格式化：now.strftime("%Y-%m-%d")',
      '算间隔：两个日期相减，取结果的 .days'
    ],
    examples: [
      {
        title: '拿到当前时间和年月日',
        code: 'from datetime import datetime\n\nnow = datetime.now()\nprint(type(now).__name__)\nprint(now.strftime("%Y 年 %m 月 %d 日"))',
        output: 'datetime\n按你运行那天的日期输出，例如 2026 年 11 月 04 日',
        note: 'now() 返回的是当前这一刻的日期时间，年月日会随运行当天变化，所以给的输出只是个示例。'
      },
      {
        title: '读出一个日期的年月日',
        code: 'from datetime import date\n\nd = date(2026, 5, 3)\nprint(d.year)\nprint(d.month)\nprint(d.day)',
        output: '2026\n5\n3',
        note: '用 date(年, 月, 日) 造一个固定日期，可以用 .year .month .day 分别读出各部分，输出确定不变。'
      },
      {
        title: '算两个日期相差几天',
        code: 'from datetime import date\n\nstart = date(2026, 1, 1)\nend = date(2026, 1, 21)\ndiff = end - start\nprint(diff)\nprint(diff.days)',
        output: '20 days, 0:00:00\n20',
        note: '后日期减前日期得到一个 timedelta，打印出来会带 "days" 字样，用 .days 直接取整数天数。1 号到 21 号中间隔 20 天。'
      }
    ],
    pitfalls: [
      {
        title: '只 import 模块名却直接用 datetime',
        bad: 'import datetime\nd = datetime.date(2026, 5, 3)   # 也能用，但写法绕',
        good: 'from datetime import date\nd = date(2026, 5, 3)',
        note: '从模块里直接 import 你要的类型，代码更短更好读。'
      },
      {
        title: '把格式符号写错',
        bad: 'now.strftime("%Y/%m/%d")   # 不是错，但如果你想要别的分隔，可能看错符号',
        good: 'now.strftime("%Y-%m-%d")   # %Y 年，%m 月，%d 日',
        note: '格式里的大小写有讲究：%Y 是大写表示四位数年份，%y 小写只表示后两位。'
      }
    ],
    practice: [
      {
        prompt: '用一个固定日期 date(2026, 1, 1) 和一个固定日期 date(2026, 2, 1)，算出它们相差多少天并打印。',
        starter: 'from datetime import date\n\na = date(2026, 1, 1)\nb = date(2026, 2, 1)\n# TODO: 计算并打印相差天数\n',
        answer: 'from datetime import date\n\na = date(2026, 1, 1)\nb = date(2026, 2, 1)\ndiff = b - a\nprint(diff.days)',
        output: '31',
        hint: '用后面的日期减前面的日期得到 timedelta，再取 .days。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '要拿到"当前这一刻的日期和时间"，应该调用什么？',
        options: ['date.today()', 'datetime.now()', 'timedelta()', 'date.weekday()'],
        answer: 1,
        explain: 'datetime.now() 返回当前的日期和时间；date.today() 只返回今天这个日期，不含时分秒。'
      },
      {
        type: 'judge',
        question: '两个 date 对象相减（后减前）得到的 .days，就是它们相隔的天数。',
        answer: true,
        explain: '日期相减得到 timedelta，.days 给出整数天数，例如 1 号到 21 号是 20 天。'
      },
      {
        type: 'choice',
        question: '要把日期时间变成 "2026-05-03" 这种字符串，用哪个方法？',
        options: ['now.today()', 'now.strftime("%Y-%m-%d")', 'now.days()', 'str(now.year)'],
        answer: 1,
        explain: 'strftime 按模板格式化，%Y-%m-%d 正好得到 2026-05-03 的样子。'
      }
    ]
  },
  {
    id: 'random-module',
    title: 'random：生成随机数',
    phase: 6,
    order: 3,
    minutes: 22,
    rating: { level: 1, must: 4 },
    summary: '用 random.randint 抽一个范围内的整数、random.choice 从列表里随机选一个；想重复同样结果就用 random.seed。',
    keywords: ['random', 'randint', 'choice', 'seed', '随机', '抽签'],
    tip: '零基础提示：随机不是你拍脑袋猜，而是程序按一套"随机规则"来选。想让每次运行的随机结果都一样（方便对答案），就在开头加一句 random.seed(某个数)。',
    what: 'random 模块用来生成随机数。random.randint(a, b) 返回 a 到 b 之间的整数（两端都算）；random.choice(列表) 从列表里随机挑一个元素。random.seed(数值) 用来"锁住"随机序列：只要给的种子的数相同，之后 randint 或 choice 的结果每次都一样，这在做练习、写测试时特别好用。',
    analogy: '打个比方：randint 像一个抽奖箱，出口只会蹦出给定范围内的整数；choice 像一副牌，随机抽出一张。seed 相当于"给这台抽奖机设同一个初始转盘刻度"，转盘刻度相同，摇出来的顺序也就相同。',
    terms: [
      { term: 'randint', zh: '随机整数', note: 'randint(a, b) 返回 a 到 b 之间的整数，两个端点都包含' },
      { term: 'choice', zh: '随机选取', note: 'choice(列表) 从列表里随机挑一个元素返回' },
      { term: 'seed', zh: '随机种子', note: '给随机生成器设一个初始值；相同种子会产生相同的随机序列' }
    ],
    steps: [
      'import random 引入模块',
      '抽范围内的整数：random.randint(1, 6)',
      '从列表选一个：random.choice(["剪刀", "石头", "布"])',
      '想让结果固定可复现：先 random.seed(42)'
    ],
    examples: [
      {
        title: '两次随机整数和一次选取（用种子锁住）',
        code: 'import random\n\nrandom.seed(42)\nprint(random.randint(1, 6))\nprint(random.randint(1, 6))\nprint(random.choice(["剪刀", "石头", "布"]))',
        output: '6\n3\n布',
        note: '因为先给了 random.seed(42)，所以每个人运行这三行都会得到完全相同的 6、3、布。想去掉这句话，结果就是每次不同的随机值。'
      },
      {
        title: '换个种子，结果跟着变',
        code: 'import random\n\nrandom.seed(7)\nprint(random.randint(1, 6))\nrandom.seed(42)\nprint(random.randint(1, 6))',
        output: '3\n6',
        note: '种子 7 和种子 42 产生不同的第一个结果；只要种子相同，结果就能复现。'
      }
    ],
    pitfalls: [
      {
        title: '把 randint 的区间理解错',
        bad: 'random.randint(1, 6)   # 以为只到 5',
        good: 'random.randint(1, 6)   # 实际返回 1、2、3、4、5、6 之一',
        note: 'randint(a, b) 两个端点都包含，所以 randint(1, 6) 的范围就是 1 到 6，共 6 个数。'
      },
      {
        title: '想固定结果却忘了写 seed',
        bad: 'print(random.randint(1, 6))   # 每次运行结果都不同',
        good: 'random.seed(42)\nprint(random.randint(1, 6))\n# 之后再运行，结果和第一次一致',
        note: 'seed 要写在取随机数之前，并且写在同一个位置，才能真正复现。'
      }
    ],
    practice: [
      {
        prompt: '用 random.randint 模拟掷一颗骰子，打印 1 到 6 之间的随机数；先用 random.seed(42) 锁定结果。',
        starter: 'import random\n\n# TODO: 设种子、掷骰子并打印\n',
        answer: 'import random\n\nrandom.seed(42)\nprint(random.randint(1, 6))',
        output: '6',
        hint: '先 random.seed(42)，再 random.randint(1, 6)，两端点 1 和 6 都包含。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'random.choice(["猫", "狗", "鸟"]) 返回什么？',
        options: ['一定返回列表本身', '一个随机整数', '列表里随机的一个元素', '一个字符串的随机长度'],
        answer: 2,
        explain: 'choice 从列表里随机挑一个元素返回，也就是 "猫"、"狗"、"鸟" 三选一。'
      },
      {
        type: 'judge',
        question: '只要在取随机数之前写下 random.seed(42)，每次运行结果就都能复现。',
        answer: true,
        explain: '相同种子 + 相同调用顺序会产生相同的随机序列，这对对答案和写测试很有用。'
      }
    ]
  },
  {
    id: 'os-path',
    title: 'os 与 pathlib：找文件和路径',
    phase: 6,
    order: 4,
    minutes: 28,
    rating: { level: 2, must: 4 },
    summary: '用 os.getcwd 看当前目录、pathlib 拼接路径、检查文件或目录是否存在。',
    keywords: ['os', 'pathlib', 'Path', 'getcwd', 'exists', '路径'],
    tip: '零基础提示：路径就是文件在电脑里的"门牌号"。pathlib 用 / 号把好几段路径拼起来，就像我们嘴上说"在文档文件夹下的 报告.doc"一样自然。',
    what: '写程序时常要告诉电脑去读写某个文件，这时就要用路径。os.getcwd() 返回程序当前所在的文件夹（工作目录）的完整路径。os.path 是操作路径的小工具包，比如 os.path.exists(路径) 判断文件或文件夹存不存在。pathlib 是更现代、更好读的一套东西，用 Path 对象和 / 来拼接路径，比如 Path("docs") / "readme.md"，还自带 .name、.suffix、.is_dir() 这些便捷属性与方法。',
    analogy: '打个比方：路径像快递地址。os.getcwd 告诉你"我现在站在哪个门牌号"，用 / 拼接就相当于写"xx小区/3栋/502 室"，os.path.exists 则是先敲敲门确认"这个地址存不存在"。',
    terms: [
      { term: 'path', zh: '路径', note: '文件在电脑里的位置描述，例如 C:/report/2026.txt' },
      { term: 'getcwd', zh: '获取当前目录', note: 'get working directory，返回程序当前所在文件夹的完整路径' },
      { term: 'Path', zh: '路径对象', note: 'pathlib 里表示一个路径的类型，支持用 / 轻松拼接' },
      { term: 'exists', zh: '是否存在', note: '判断某个文件或文件夹存不存在，存在返回 True' }
    ],
    steps: [
      '看当前目录：os.getcwd()',
      '造一个路径对象：Path("docs") / "readme.md"',
      '读名字和后缀：path.name、path.suffix',
      '判断是否存在：os.path.exists(路径) 或 path.exists()'
    ],
    examples: [
      {
        title: '用 / 拼接路径',
        code: 'from pathlib import Path\n\np = Path("docs") / "readme.md"\nprint(p)\nprint(p.name)\nprint(p.suffix)',
        output: 'docs\\readme.md\nreadme.md\n.md',
        note: '用 / 把两段拼成一个路径，p.name 是末端的文件名，p.suffix 是文件扩展名后缀。分隔符在 Windows 上显示反斜杠，所以 output 用了 \\\\。'
      },
      {
        title: '判断当前位置是不是目录，以及某个文件是否存在',
        code: 'import os\nfrom pathlib import Path\n\nprint(Path(".").is_dir())\nprint(os.path.exists("readme.md"))',
        output: 'True\nFalse',
        note: '第一行 "." 代表当前目录，通常是存在的目录，所以输出 True；第二行取决于你的目录里是否真的有个叫 readme.md 的文件，这里假设没有，输出 False。'
      }
    ],
    pitfalls: [
      {
        title: '只想要文件名却把整段路径拿来用',
        bad: 'p = Path("docs/readme.md")\nprint(p)     # 打印的是整段 docs/readme.md',
        good: 'print(p.name)   # 只要 readme.md',
        note: 'p.name 取末端文件名，p.suffix 取扩展名，别把整段路径当文件名。'
      },
      {
        title: '用加号拼接路径',
        bad: 'Path("docs") + "readme.md"   # 报错，Path 不支持加号',
        good: 'Path("docs") / "readme.md"  # 用斜杠拼接',
        note: 'pathlib 用的是 / 运算符来拼接，不是 +。'
      }
    ],
    practice: [
      {
        prompt: '用 pathlib 拼出 "docs/note.txt" 这个路径，并打印它的文件名 name 和扩展名 suffix。',
        starter: 'from pathlib import Path\n\np = Path("docs") / "note.txt"\n# TODO: 打印 name 和 suffix\n',
        answer: 'from pathlib import Path\n\np = Path("docs") / "note.txt"\nprint(p.name)\nprint(p.suffix)',
        output: 'note.txt\n.txt',
        hint: 'p.name 是文件名，p.suffix 是扩展名，各自 print。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '用 pathlib 把 "docs" 和 "note.txt" 两段拼成一个路径，正确的是？',
        options: ['Path("docs") + "note.txt"', 'Path("docs") / "note.txt"', 'Path("docs") - "note.txt"', '"docs" * "note.txt"'],
        answer: 1,
        explain: 'pathlib 用 / 运算符拼接路径段，加号会报错。'
      },
      {
        type: 'judge',
        question: 'os.path.exists(路径) 用来判断某个文件或文件夹是否存在，存在时返回 True。',
        answer: true,
        explain: 'exists 返回布尔值：存在是 True，不存在是 False，写文件前先判断很安全。'
      },
      {
        type: 'choice',
        question: 'Path("docs/readme.md").name 的值是？',
        options: ['docs', 'readme', 'readme.md', 'docs/readme'],
        answer: 2,
        explain: '.name 取路径末尾的文件名，整段里文件名是 readme.md。'
      }
    ]
  },
  {
    id: 'input-argv',
    title: '拿到输入：input() 与命令行参数',
    phase: 6,
    order: 5,
    minutes: 26,
    rating: { level: 3, must: 5 },
    summary: '用 input() 让用户从键盘输入内容，用 sys.argv 接收运行程序时带的命令行参数。',
    keywords: ['input', 'sys.argv', '命令行', '参数', '输入', '命令'],
    tip: '零基础提示：input() 让程序"停下来等你敲键盘"，敲完回车才继续往下走；sys.argv 是启动程序时顺便塞给程序的一大串参数，两种方式都能把信息送进程序里。',
    what: '程序经常需要接收外部信息。一种方式是在运行时问用户：input(提示语) 会打印提示语、停下等用户输入，按回车后把输入的内容作为字符串返回。另一种方式在启动程序时就给：运行 python hello.py 小明 时，sys.argv 会是一个列表，第 0 项是脚本文件名，第 1 项起是后面带的参数（这里就是 "小明"），程序用 sys.argv[1] 就能取到。',
    analogy: '打个比方：input() 像到店先由店员问你"您想吃点什么"，等你说完再下单；sys.argv 像电话点单，你还没到店就把要的东西报给老板，老板直接照着做。',
    terms: [
      { term: 'input', zh: '输入函数', note: '打印提示语、等待用户按键盘回车，返回用户输入内容的字符串' },
      { term: 'argv', zh: '命令行参数', note: 'argument vector，运行程序时在程序名后跟的一串参数，以列表形式存在' },
      { term: 'command_line', zh: '命令行', note: '在终端或命令窗口里，用一行命令把程序跑起来的界面' }
    ],
    steps: [
      '问用户要输入：text = input("请输入名字：")',
      '用 sys.argv：运行 python hello.py 小明',
      '第 0 项 sys.argv[0] 是脚本名，第 1 项起 sys.argv[1] 是用户给的参数'
    ],
    examples: [
      {
        title: '用 input 问用户名字再打招呼',
        code: 'name = input("你的名字是：\\n")\nprint("你好，" + name)',
        output: '程序停住等输入；如果你输入 "小红" 回车，就打印 你好，小红',
        note: '运行到 input 时程序会停下来等你敲键盘，输出取决于你输入的内容，所以给的是输入 "小红" 时的示例。'
      },
      {
        title: '读取命令行参数',
        code: 'import sys\n\nprint(sys.argv[0])\nprint(sys.argv[1])',
        output: '如果你运行 python demo.py 小明，第一行输出 demo.py，第二行输出 小明',
        note: 'sys.argv[0] 永远是你的脚本文件名，第 1 项起才是真正传给程序的参数。'
      }
    ],
    pitfalls: [
      {
        title: '为了在程序里拿到输入却没用 input 也没传参数',
        bad: 'print("你的名字")   # 这只是打印一句话，并没有让用户输入',
        good: 'name = input("你的名字是：\\n")\nprint(name)   # 真的停下来等输入',
        note: 'input 会执行等待，普通 print 不会停下来接收任何东西。'
      },
      {
        title: 'sys.argv 越界取参数',
        bad: 'print(sys.argv[1])   # 如果运行时没带参数，会报 IndexError',
        good: 'if len(sys.argv) > 1:\n    print(sys.argv[1])',
        note: '先判断参数个数再取，避免参数没传时程序崩掉。'
      }
    ],
    practice: [
      {
        prompt: '用 input 问 "你的名字是："，然后把输入的答案拼进一句 "你好，XXX" 打印出来。',
        starter: '# TODO: 提问、接收输入并打印问候\n',
        answer: 'name = input("你的名字是：\\n")\nprint("你好，" + name)',
        output: '如果输入 "小红" 回车，打印 你好，小红',
        hint: 'input("你的名字是：\\n") 的返回值就是一个字符串，存到变量里再拼进问候语。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'input(\"你的名字：\") 在程序运行时会做什么？',
        options: ['立刻返回 None', '打印提示语并停下等用户输入，回车后返回输入内容', '随机生成一个名字', '报错'],
        answer: 1,
        explain: 'input 会打印提示并暂停，等用户敲完回车后把输入的内容作为字符串返回。'
      },
      {
        type: 'judge',
        question: 'sys.argv 的第 0 项是脚本文件名，从第 1 项起才是运行时传的参数。',
        answer: true,
        explain: 'argv 是列表，索引 0 是脚本名，后面依次是命令行给的参数。'
      },
      {
        type: 'choice',
        question: '运行 python 采花.py 玫瑰花 后，要取到 "玫瑰花" 这个参数应使用？',
        options: ['sys.argv[0]', 'sys.argv[1]', 'input()', 'sys.argv[-1]'],
        answer: 1,
        explain: '第 0 项是脚本名 采花.py，第 1 项才是参数 玫瑰花，即 sys.argv[1]。'
      }
    ]
  },
  {
    id: 'pip-and-venv',
    title: 'pip 与虚拟环境：管理外部库',
    phase: 6,
    order: 6,
    minutes: 28,
    rating: { level: 3, must: 5 },
    summary: '用 pip 安装外部库，用虚拟环境给每个项目独立的小房间，还会导出清单和加速下载。',
    keywords: ['pip', 'venv', '虚拟环境', 'requirements', '镜像源', '安装库'],
    tip: '零基础提示：外部库是别人写好的工具箱，pip 是帮你下载安装的搬运工；虚拟环境像每个项目专属的小房间，装的东西互不打架。从第 8 阶段开始就要装库，先把这一节学会。',
    what: 'pip 是 Python 的包安装工具，一条 pip install 包名 就能把别人写好的库装进当前环境。虚拟环境（venv）是给单个项目准备的独立空间：在里面安装、升级、卸载库，都只影响这个项目。用 python -m venv .venv 创建，激活后命令行前面会多出 (.venv) 标记。pip freeze > requirements.txt 能把装了哪些包记成清单，换电脑时 pip install -r requirements.txt 一键装齐。',
    analogy: '打个比方：pip 像外卖平台，说一声就送工具上门；虚拟环境像每个项目单独的储物柜，A 项目的工具不会跑到 B 项目里；requirements.txt 像搬家清单，到新电脑照单全收。',
    terms: [
      { term: 'pip', zh: '包安装工具', note: 'Python 自带的安装器，用 pip install 包名 安装外部库。' },
      { term: 'venv', zh: '虚拟环境', note: 'Python 自带的独立环境，每个项目一套，互不影响。' },
      { term: 'package', zh: '包', note: '别人打包好的可复用代码，就是 pip 安装的对象。' },
      { term: 'requirements.txt', zh: '依赖清单', note: '记录项目需要哪些包和版本，方便在别处一键还原。' },
      { term: 'mirror', zh: '镜像源', note: '国内的下载点，网速慢时用 -i 参数临时切换。' }
    ],
    steps: [
      '在项目文件夹打开终端，输入 python -m venv .venv 创建虚拟环境（首次约十几秒）',
      '激活：Windows 输入 .venv\\Scripts\\activate，macOS/Linux 终端输入 source .venv/bin/activate',
      '看到命令行前面多了 (.venv) 标记后，再输入 pip install requests 安装库',
      '输入 pip list 查看装了哪些包；卸载用 pip uninstall 包名',
      '输入 pip freeze > requirements.txt，把当前依赖存成清单文件',
      '下载慢就换国内镜像源：pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple',
    ],
    examples: [
      {
        title: '判断自己是否在虚拟环境里',
        code: `import sys

inside = sys.prefix != sys.base_prefix
print("在虚拟环境里" if inside else "用的是全局 Python")
print(sys.prefix)`,
        output: `在虚拟环境里
C:\\Users\\33569\\AppData\\Local\\Temp\\opencode\\venv-demo`,
        note: '在虚拟环境里运行的真实结果：sys.prefix 指向当前解释器，路径末尾就是虚拟环境的文件夹；没激活时它和全局解释器相同，会显示"用的是全局 Python"。',
      },
      {
        title: '看看环境里装了哪些包',
        code: `from importlib.metadata import distributions

names = sorted(d.metadata["Name"] for d in distributions())
print("这个环境里装了", len(names), "个包")
print("\\n".join(names[:5]))`,
        output: `这个环境里装了 10 个包
Pygments
certifi
charset-normalizer
idna
markdown-it-py`,
        note: '装好 requests 和 rich 后的真实结果；数量和清单随环境不同而变化。importlib.metadata 是标准库，不用联网就能查。',
      }
    ],
    pitfalls: [
      {
        title: '没激活虚拟环境就安装',
        bad: 'pip install requests        # 命令行前面没有 (.venv)',
        good: '(.venv) pip install requests',
        note: '没激活时包装进全局环境，所有项目共用，容易版本打架。先激活，认准命令行前面的 (.venv) 标记。'
      },
      {
        title: 'PowerShell 提示禁止运行脚本',
        bad: '.venv\\Scripts\\activate   # 报错：在此系统上禁止运行脚本',
        good: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser',
        note: 'Windows 默认禁止运行脚本。上面这条以当前用户身份放开本地脚本，只需设置一次，然后再激活。'
      },
      {
        title: '手写 requirements.txt 漏了依赖',
        bad: 'requests==2.34.2        # 只写了自己 import 的包',
        good: 'pip freeze > requirements.txt',
        note: '你装的库还会自带依赖，手写容易漏。让 pip freeze 自动生成，才不会少东西。'
      }
    ],
    practice: [
      {
        prompt: '写一个程序，依次检查 requests、rich、flask 三个包装没装：装了就打印 名字 版本，没装就打印 名字 未安装。',
        starter: `from importlib.metadata import version, PackageNotFoundError

for name in ["requests", "rich", "flask"]:
    # TODO: 装了打印 名字 版本，没装打印 名字 未安装
    pass
`,
        answer: `from importlib.metadata import version, PackageNotFoundError

for name in ["requests", "rich", "flask"]:
    try:
        print(name, version(name))
    except PackageNotFoundError:
        print(name, "未安装")`,
        output: `requests 2.34.2
rich 15.0.0
flask 未安装`,
        hint: 'version(name) 查版本；包不存在会抛 PackageNotFoundError，用 try/except 接住。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '命令行前面出现 (.venv) 标记说明什么？',
        options: ['Python 安装失败', '当前命令用的是这个项目的虚拟环境', 'pip 没有安装', '电脑中了病毒'],
        answer: 1,
        explain: '(.venv) 是激活成功的标记，之后 pip install 的包都装进这个项目专属的环境里。'
      },
      {
        type: 'judge',
        question: 'pip freeze > requirements.txt 的作用是把当前环境装了哪些包记进清单文件。',
        answer: true,
        explain: 'freeze 列出全部包和版本，> 把结果写进文件；换电脑时用 pip install -r requirements.txt 一键还原。'
      },
      {
        type: 'code',
        question: '补全创建虚拟环境的命令：python -m ____ .venv',
        code: 'python -m ____ .venv',
        answer: 'venv',
        accept: [],
        explain: 'venv 是 Python 自带的虚拟环境模块，用 -m 方式运行它就会创建一个名为 .venv 的环境。'
      }
    ]
  },
  {
    id: 'argparse-cli',
    title: 'argparse：给脚本配正式的参数',
    phase: 6,
    order: 7,
    minutes: 25,
    rating: { level: 3, must: 3 },
    summary: '用标准库 argparse 处理命令行参数：参数有名字、有类型、有默认值，还自动生成 --help。',
    keywords: ['argparse', '命令行', '参数', '选项', 'help'],
    tip: '零基础提示：上一节用 sys.argv[1] 取参数，像按排队位置认人；argparse 给每个参数起名字，还免费送一份自动生成的使用说明书（--help）。',
    what: 'argparse 是标准库，三步走：创建 ArgumentParser、用 add_argument 逐个声明参数、parse_args() 解析出结果。参数分两种：直接按位置传的位置参数（如名字），和带 -- 前缀的选项（如 --count，可设类型 type=int 和默认值 default）。写好后再运行 python 脚本.py --help，argparse 会自动打印用法说明——这是它比 sys.argv 省心最多的地方。',
    analogy: '打个比方：sys.argv 像"第三个来的就是 3 号桌"；argparse 像一张点菜单——份数、辣度都写清栏目，填错了它还会把菜单递给你看。',
    terms: [
      { term: 'argparse', zh: '参数解析库', note: 'Python 标准库，把命令行参数解析成有名字的变量。' },
      { term: 'positional argument', zh: '位置参数', note: '按顺序必须提供的参数，如脚本名后直接跟的名字。' },
      { term: 'option', zh: '选项', note: '带 -- 前缀的可选参数，如 --count，可配默认值。' },
      { term: 'default', zh: '默认值', note: '用户没传这个参数时使用的值。' }
    ],
    steps: [
      'import argparse，创建 parser = argparse.ArgumentParser(description="一句话说明")',
      '声明位置参数：parser.add_argument("name", help="说明")',
      '声明选项：parser.add_argument("--count", type=int, default=1, help="说明")',
      '解析：args = parser.parse_args()，之后用 args.name、args.count 取值',
      '在终端运行 python 脚本.py --help，检查自动生成的说明书',
    ],
    examples: [
      {
        title: '一个会打招呼的命令行脚本',
        code: `import argparse

parser = argparse.ArgumentParser(description="跟指定的人打招呼")
parser.add_argument("name", help="要打招呼的名字")
parser.add_argument("--count", type=int, default=1, help="重复次数")
args = parser.parse_args()

for _ in range(args.count):
    print("你好,", args.name)`,
        output: `你好, 小明
你好, 小明`,
        note: '真实运行 python greet.py 小明 --count 2 的结果；--count 没传时按 default 用 1。',
      },
      {
        title: '--help 自动生成的说明书',
        code: `# 在终端运行：
# python greet.py --help
# argparse 自动输出下面的说明，不用自己写`,
        output: `usage: greet.py [-h] [--count COUNT] name

跟指定的人打招呼

positional arguments:
  name           要打招呼的名字

options:
  -h, --help     show this help message and exit
  --count COUNT  重复次数`,
        note: '真实运行结果：usage 是用法摘要，下面分列位置参数和选项；对齐会随终端宽度略有变化。',
      }
    ],
    pitfalls: [
      {
        title: '漏写必填的位置参数',
        bad: 'python greet.py   # 没给 name',
        good: 'python greet.py 小明',
        note: '位置参数默认必填，漏了会报 the following arguments are required: name，并提示去看 --help。'
      },
      {
        title: '选项的值类型不对',
        bad: 'python greet.py 小明 --count abc   # type=int 时报错',
        good: 'python greet.py 小明 --count 2',
        note: '声明 type=int 后，argparse 自动把字符串转整数并检查；传 abc 会报 invalid int value。'
      },
      {
        title: '解析后还按 sys.argv 取值',
        bad: 'name = sys.argv[1]   # 用了 argparse 就别这样',
        good: 'args = parser.parse_args()\nname = args.name',
        note: 'parse_args() 的结果是有名字的：用 args.name、args.count 取，不再关心第几个位置。'
      }
    ],
    practice: [
      {
        prompt: '写一个两数计算器脚本：位置参数 x、y（小数），选项 --op 只允许 +、-、*，默认 +，打印运算结果。',
        starter: `import argparse

parser = argparse.ArgumentParser(description="两数计算器")
parser.add_argument("x", type=float)
parser.add_argument("y", type=float)
# TODO: 声明 --op 并完成运算
args = parser.parse_args()
`,
        answer: `import argparse

parser = argparse.ArgumentParser(description="两数计算器")
parser.add_argument("x", type=float)
parser.add_argument("y", type=float)
parser.add_argument("--op", default="+", choices=["+", "-", "*"])
args = parser.parse_args()

if args.op == "+":
    print(args.x + args.y)
elif args.op == "-":
    print(args.x - args.y)
else:
    print(args.x * args.y)`,
        output: `8.0`,
        hint: 'choices 限制 --op 只能取列表里的值；运行 python calc.py 3 5 得到 8.0。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '运行 python greet.py --help 时会发生什么？',
        options: ['报语法错误', '打印 argparse 自动生成的用法说明', '静默退出', '把 --help 当成名字打招呼'],
        answer: 1,
        explain: '-h/--help 是免费功能：argparse 汇总所有参数的 help 文案，自动生成说明书。'
      },
      {
        type: 'judge',
        question: '位置参数必须按声明顺序提供，选项 --count 则可以放在任意位置。',
        answer: true,
        explain: '位置参数认位置，选项认名字，所以 --count 放前放后都可以。'
      },
      {
        type: 'code',
        question: '补全声明：让 --times 接收整数，默认 3 次：parser.add_argument("--times", ____=int, default=3)',
        code: 'parser.add_argument("--times", ____=int, default=3)',
        answer: 'type',
        accept: [],
        explain: 'type=int 让 argparse 自动把命令行里的字符串转成整数。'
      }
    ]
  }
]