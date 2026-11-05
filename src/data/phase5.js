/**
 * 第五阶段：读文件与程序更健壮（约 2 小时）
 * 面向从未写过代码的人，从零讲起：怎么把文件里的文字读进程序、
 * 把结果写进文件、用 with 自动收拾资源、用异常处理接住意外、用日志记录过程。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'file-read',
    title: '读文件：把文本拿进来',
    phase: 5,
    order: 1,
    minutes: 24,
    rating: { level: 1, must: 4 },
    summary: '用 open() 打开磁盘上的文件，把里面的文字一次读完或一行一行读进程序。',
    keywords: ['open', 'read', '读文件', '文件对象', '遍历行', '编码'],
    tip: '零基础提示：程序跑完内存就清空了，想长期留下数据就得存进文件；读文件就是把磁盘上存好的内容再请回程序里。',
    what: '用 open() 打开文件会得到一个“文件对象”，它代表“你已经把书翻开”。调用 read() 一次拿回整段文本，或者用 for 循环一行一行地读。几乎所有文本文件都要写成 open(路径, encoding="utf-8")，否则中文字符可能变成乱码。',
    analogy: '打个比方：open() 就像伸手从书架取下一本书并翻开第一页，read() 是通读全文，for line in f 则是一行一行往下看。',
    terms: [
      { term: 'open', zh: '打开（文件）', note: 'Python 内置函数，用于打开一个文件并返回文件对象' },
      { term: 'file-object', zh: '文件对象', note: 'open() 返回的东西，代表这个已打开的文件' },
      { term: 'encoding', zh: '编码方式', note: '文字在电脑里的存取规则，中文常用 utf-8' },
      { term: 'line', zh: '一行', note: '文本里以换行符结尾的一整行' }
    ],
    steps: [
      '用 open("data.txt", encoding="utf-8") 打开文件，拿到文件对象 f',
      '要一次读完就调 f.read()',
      '要一行行看就用 for line in f: 循环',
      '处理完交给 with 自动关闭（下一节讲），暂时先记住这个写法'
    ],
    examples: [
      {
        title: '一次读完整段文本',
        code: "with open('data.txt', encoding='utf-8') as f:\n    print(f.read())",
        output: '你好\n世界',
        note: '需要先在同目录建一个 data.txt，内容两行：第一行“你好”、第二行“世界”。read() 会把整段文字连换行符一起返回，print 再补一个换行，所以显示成两行。',
        verify: false
      },
      {
        title: '一行一行地读',
        code: "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        print(line.strip())",
        output: '苹果\n香蕉\n橙子',
        note: '需要先建 data.txt，内容为三行：苹果、香蕉、橙子。line.strip() 去掉每行末尾的换行符，这样打印不会多出空行。',
        verify: false
      },
      {
        title: '数一数文件有几行',
        code: "with open('data.txt', encoding='utf-8') as f:\n    count = sum(1 for _ in f)\nprint(count)",
        output: '3',
        note: '需要先建 data.txt 且内容正好三行。for 每读一行就计入 1，最终 count 就是总行数。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '忘记指定编码导致中文乱码',
        bad: "with open('data.txt') as f:",
        good: "with open('data.txt', encoding='utf-8') as f:",
        note: '不给 encoding，程序会用它自己的默认值，很可能让你看到一堆乱码；涉及中文务必写 utf-8。'
      },
      {
        title: '用一个 for 读完后还想再读一遍',
        bad: 'with open("data.txt") as f:\n    for line in f:\n        pass\n    for line in f:   # 第二个循环什么都没读到',
        good: '需要第二遍时重新 open 一次，或提前存成列表',
        note: '文件对象像一次性纸条，读完就到底了；想再读请重新打开。'
      },
      {
        title: '直接把文件累进数里',
        bad: "for line in f:\n    total = total + line   # 字符串和数字加不到一起",
        good: "    total = total + int(line)   # 先转成数字再加",
        note: '读出来的每一行都是字符串，哪怕内容看起来是数字；算数前要先用 int() 或 float() 转换。'
      }
    ],
    practice: [
      {
        prompt: 'data.txt 里存了三行名字：小美、小刚、小强。给每一行加上它自己的行号打印出来。',
        starter: "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        print(line.strip())",
        answer: "with open('data.txt', encoding='utf-8') as f:\n    for index, line in enumerate(f, start=1):\n        print(index, line.strip())",
        output: '1 小美\n2 小刚\n3 小强',
        hint: 'enumerate(name, start=1) 会在循环里同时给出编号和内容；start=1 让编号从 1 开始而不是 0。'
      },
      {
        prompt: '有一段数字串“1,2,3”，用逗号拆成三个数，逐个打印成整数。',
        starter: "text = '1,2,3'\n# TODO: 用 split(',') 把 text 拆开，再逐个 int() 打印",
        answer: "text = '1,2,3'\nfor part in text.split(','):\n    print(int(part))",
        output: '1\n2\n3',
        hint: 'split(",") 会按逗号把字符串切成一个列表，每个元素仍是字符串，用 int() 转成整数。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '要从磁盘一路读到整段文本，最合适的写法是？',
        options: ['open("data.txt") 然后调用 read()', '直接写文件名就调用', '把文本复制进代码里', '用 print 打开文件'],
        answer: 0,
        explain: 'open() 打开文件后，read() 一次拿回整段文本内容。'
      },
      {
        type: 'judge',
        question: '读出来的每一行即使看着像数字，它本身也是字符串，需要先转换才能做加法。',
        answer: true,
        explain: '文件读出来的一行都是字符串类型，做算术前要用 int() 或 float() 转换。'
      },
      {
        type: 'code',
        question: '补全代码：打开 data.txt 并逐行打印（去掉末尾换行）。',
        code: "with open('data.txt', encoding='utf-8') as f:\n    for line in f:\n        ______",
        answer: "print(line.strip())",
        explain: 'strip() 去掉行尾换行符再打印，就不会多出空行了。'
      }
    ]
  },
  {
    id: 'file-write',
    title: '写文件：把结果存下来',
    phase: 5,
    order: 2,
    minutes: 24,
    rating: { level: 1, must: 4 },
    summary: '用 open() 配合 mode「w」覆盖或「a」追加，把程序算好的结果写到磁盘上保存。',
    keywords: ['open', 'write', 'mode', '覆盖', '追加', '写文件'],
    tip: '零基础提示：写文件就是反过来——把程序里算好的结果存回磁盘，这样关机重开也不会丢。',
    what: 'open() 的第二个参数是 mode（模式）："w" 表示 write，会新建或覆盖文件；"a" 表示 append，在文件末尾追加；"r" 是默认的读取。通过文件对象的 write() 或 writelines() 把文字写进去。写入中文同样要写 encoding="utf-8"，并且注意 "w" 会清空原文件。',
    analogy: '打个比方：mode="w" 像拿一张新纸把旧纸整张换掉；mode="a" 像在纸的末尾接着往下写，前面的内容都保留。',
    terms: [
      { term: 'mode', zh: '模式', note: 'open() 的第二个参数，告诉文件要读还是要写' },
      { term: 'write', zh: '写入', note: '文件对象的方法，把字符串写进文件' },
      { term: 'overwrite', zh: '覆盖', note: 'mode="w" 的行为，把原文件内容整个清掉再写入' },
      { term: 'append', zh: '追加', note: 'mode="a" 的行为，接着原文件末尾继续写' }
    ],
    steps: [
      '用 open("out.txt", "w", encoding="utf-8") 打开（第二个参数是模式）',
      '用 f.write("要写的内容") 写入，注意换行符要自己写在字符串末尾',
      '想一行行写就用 f.writelines(列表)',
      '想保留原文接着写，就把 "w" 换成 "a"'
    ],
    examples: [
      {
        title: '把一行结果写入文件',
        code: "with open('out.txt', 'w', encoding='utf-8') as f:\n    f.write('今天是星期五' + '\\n')\nprint('写入完成')",
        output: '写入完成',
        note: '运行会在当前目录创建 out.txt（内容“今天是星期五”）。换行符 \\n 要自己写在字符串里，f.write 不会自动换行。本例会写一个真实文件，故标记 verify=false。',
        verify: false
      },
      {
        title: '覆盖模式会清掉旧内容',
        code: "with open('out.txt', 'w', encoding='utf-8') as f:\n    f.write('新内容')\n\nwith open('out.txt', encoding='utf-8') as f:\n    print(f.read())",
        output: '新内容',
        note: '先用 "w" 把 out.txt 整份覆盖成“新内容”，再读出来打印。如果之前这个文件里有过别的东西，现在都没了。会创建/覆盖真实文件，故标记 verify=false。',
        verify: false
      },
      {
        title: '追加模式保留原文',
        code: "with open('log.txt', 'a', encoding='utf-8') as f:\n    f.write('又记了一条' + '\\n')\nprint('追加完成')",
        output: '追加完成',
        note: '需要先在 log.txt 里放点内容，比如“第一条”。运行后原内容还在，“又记了一条”会被接在末尾。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '误用 "w" 把辛苦存好的文件清空了',
        bad: "with open('memo.txt', 'w', encoding='utf-8') as f:\n    f.write('只写了这一行')",
        good: "with open('memo.txt', 'a', encoding='utf-8') as f:\n    f.write('新增一行')",
        note: '"w" 会先清空整个文件再写入。只想加内容时一定要用 "a"。'
      },
      {
        title: '写中文却不指定编码',
        bad: "with open('out.txt', 'w') as f:",
        good: "with open('out.txt', 'w', encoding='utf-8') as f:",
        note: '不写 encoding 时系统默认编码可能不支持中文，写出去再打开就是乱码。'
      },
      {
        title: '以为 write 会自动换行',
        bad: "f.write('第一行')\nf.write('第二行')   # 会挤在同一行",
        good: "f.write('第一行' + '\\n')\nf.write('第二行' + '\\n')",
        note: 'write() 把内容原样写进去，不会补换行；想要多行就自己在字符串末尾拼 \\n。'
      }
    ],
    practice: [
      {
        prompt: '把名字列表 ["小美", "小刚"] 每行一个写进 name.txt（覆盖模式，utf-8），要求每个名字一行。',
        starter: "names = ['小美', '小刚']\n# TODO: 打开 name.txt（用 'w'），把每个名字各占一行写进去",
        answer: "names = ['小美', '小刚']\nwith open('name.txt', 'w', encoding='utf-8') as f:\n    for name in names:\n        f.write(name + '\\n')",
        output: '写入 name.txt：\n小美\n小刚',
        hint: '每个名字后面接一个 \\n 就能单独成行；用 "w" 模式会在写之前清空旧内容。'
      },
      {
        prompt: '给 call.txt 追加一行“十二点打卡”，再读出来打印，确认原来内容还在。',
        starter: "# TODO: 用 'a' 模式追加一行，再打开读取并打印\r\n",
        answer: "with open('call.txt', 'a', encoding='utf-8') as f:\n    f.write('十二点打卡' + '\\n')\n\nwith open('call.txt', encoding='utf-8') as f:\n    print(f.read())",
        output: '九点打卡\n十二点打卡',
        hint: '"a" 模式会在文件末尾追加；追加完再以默认 "r" 读出来，就能看到原来的内容还在。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '希望保留原文件内容、只在末尾接着写，mode 应该是什么？',
        options: ['"w"', '"r"', '"a"', '"x"'],
        answer: 2,
        explain: '"a" 是 append（追加），在文件末尾续写而不清空原有内容。'
      },
      {
        type: 'judge',
        question: 'mode="w" 打开文件写入时，会先把文件原有内容清空。',
        answer: true,
        explain: '"w" 表示覆盖，先清空原文件再写入，所以要谨慎使用。'
      },
      {
        type: 'code',
        question: '补全代码：把 text 用追加模式写进 note.txt。',
        code: "text = '补充一点'\n______ open('note.txt', 'a', encoding='utf-8') as f:\n    f.write(text)",
        answer: "with",
        explain: 'with 负责管理文件，配合 "a" 模式在末尾追加 text 的内容。'
      }
    ]
  },
  {
    id: 'with-statement',
    title: 'with 语句：用完自动收拾',
    phase: 5,
    order: 3,
    minutes: 20,
    rating: { level: 1, must: 4 },
    summary: 'with ... as 能保证文件用完自动关闭，即使中途出错了也不会漏关，让程序更安全。',
    keywords: ['with', '上下文管理器', '自动关闭', 'enter', 'exit', '资源管理'],
    tip: '零基础提示：前面几节一直在用 with，这节告诉你它为什么重要——它替你保证“用完一定关门”，你不用记着写 close()。',
    what: 'with open(...) as f: 会在进入代码块时创建文件对象，在代码块结束时就自动关闭文件，哪怕代码块里出错也会关。原理是 with 会调用对象的 __enter__ 和 __exit__ 这两个特殊方法。文件、网络连接这类“用完要还回去”的资源都适合用 with 管理。',
    analogy: '打个比方：with 就像一个负责关门的服务员。你进餐厅吃饭（打开文件），不管你是吃饱离开还是吃到一半出事被抬走，他都会负责把门带上（自动关闭文件）。',
    terms: [
      { term: 'with', zh: '随着（语句）', note: 'Python 的关键字，用来保证资源一定被收拾好' },
      { term: 'context-manager', zh: '上下文管理器', note: '实现了 __enter__ 和 __exit__ 的对象，可被 with 管理' },
      { term: 'as', zh: '作为', note: '把 with 打开的对象的返回值绑定到一个名字上' },
      { term: 'close', zh: '关闭', note: '收回文件等资源，with 会自动做这一件事' }
    ],
    steps: [
      'with 后面跟一个表达式，比如 open(...)',
      '用 as f 把打开的“文件对象”绑定到名字 f',
      '在缩进块里用 f 读写内容',
      '块一结束，with 自动调用关闭逻辑，你不用手动操作'
    ],
    examples: [
      {
        title: 'with 自动关闭文件',
        code: "with open('data.txt', encoding='utf-8') as f:\n    first = f.readline()\nprint('读到:', first)\nprint('块结束，文件已自动关闭')",
        output: '读到: 你好\n块结束，文件已自动关闭',
        note: '需要先在 data.txt 第一行写“你好”。块外还在使用 f 会报错，从侧面证明文件真的已经关闭。',
        verify: false
      },
      {
        title: '自己写一个小的上下文管理器',
        code: "class Timer:\n    def __init__(self, name):\n        self.name = name\n    def __enter__(self):\n        print('进入 ' + self.name)\n        return self\n    def __exit__(self, exc_type, exc_value, exc_tb):\n        print('离开 ' + self.name)\n        return False\n\nwith Timer('统计耗时'):\n    print('正在处理')",
        output: '进入 统计耗时\n正在处理\n离开 统计耗时',
        note: '__enter__ 在进入时跑，__exit__ 在离开时跑（包括出错也会跑）。返回 False 表示不偷偷吞掉异常。',
        verify: true
      },
      {
        title: '出错时也照样自动关闭',
        code: "try:\n    with open('data.txt', encoding='utf-8') as f:\n        raise RuntimeError('读到一半炸了')\nexcept RuntimeError as e:\n    print('捕获到:', e)\nprint('文件仍然被自动关闭了')",
        output: '捕获到: 读到一半炸了\n文件仍然被自动关闭了',
        note: '需要先在同目录建一个 data.txt（内容随意，例如单行“你好”），因为 open() 要能打开它。块里故意抛错，__exit__ 依然被执行把文件关掉，这就是 with 的价值——漏关资源的风险被消除了。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '在 with 块外继续用文件对象',
        bad: "with open('data.txt') as f:\n    data = f.read()\nprint(f.read())   # 文件已关闭会报错",
        good: '把要处理的语句都放进 with 块内',
        note: '块结束后文件就被自动关闭了，在块外再对 f 操作会得到“操作已关闭文件”的错误。'
      },
      {
        title: '忘了用 with，全靠感觉记得 close',
        bad: "f = open('data.txt', encoding='utf-8')\ndata = f.read()\n# 忘了 f.close()，或者中途出错就没机会关",
        good: "with open('data.txt', encoding='utf-8') as f:\n    data = f.read()",
        note: '自己 open 就很容易忘记 close，出错时文件更不会被关；交给 with 后完全不用再惦记这回事。'
      },
      {
        title: '手动手动 close 又靠 with',
        bad: "with open('data.txt') as f:\n    f.read()\n    f.close()",
        good: "with open('data.txt') as f:\n    data = f.read()",
        note: '用 with 就不要再手动调用 f.close()，那会重复关闭；交给 with 自动处理即可。'
      }
    ],
    practice: [
      {
        prompt: '用 with 打开 data.txt 读取第一行并打印，然后用 with 把它读到的内容追加进 back.txt。',
        starter: "# TODO: 读懂 data.txt 第一行，再把那行追加到 back.txt\r\n",
        answer: "with open('data.txt', encoding='utf-8') as f:\n    first = f.readline()\n\nwith open('back.txt', 'a', encoding='utf-8') as f:\n    f.write(first)\nprint('已追加:', first)",
        output: '已追加: 你好',
        note: '需要 data.txt 第一行为“你好”。两个 with 各自管理自己的文件，最后打印追加的内容。',
        verify: false
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'with ... as f 主要负责为文件对象做什么？',
        options: ['让它更快', '保证用完自动关闭', '给它加密码', '把它复制一份'],
        answer: 1,
        explain: 'with 保证代码块结束时自动关闭文件，连出错时也会关闭。'
      },
      {
        type: 'judge',
        question: 'with 块里即使抛出了异常，文件也依然会被自动关闭。',
        answer: true,
        explain: 'with 的 __exit__ 在所有离开块的情况下都会被调用，包括异常路径。'
      }
    ]
  },
  {
    id: 'exception-handling',
    title: '异常：程序遇到意外怎么处理',
    phase: 5,
    order: 4,
    minutes: 28,
    rating: { level: 1, must: 5 },
    summary: '用 try/except/else/finally 接住运行时错误，让程序不因一次意外就整个崩溃，必要时用 raise 主动抛错。',
    keywords: ['try', 'except', 'else', 'finally', 'raise', '异常', '错误处理'],
    tip: '零基础提示：程序跑的时候会遇到意外（文件不存在、除以 0），你不处理它就会当场崩溃；异常处理就是给这些意外装个“安全网”。',
    what: '当程序遇到错误，会“抛出”一个异常对象。你用 try 包住可能出错的代码，用 except 接住某一种异常并给出补救；这段 try 成功、没抛错时执行 else 里的代码；无论有没有错都会执行 finally 里的代码。除零会抛 ZeroDivisionError，读不存在的文件会抛 FileNotFoundError，它们都可以被 except 接住。想主动说明“这里不该这样”可以用 raise 自己抛出异常。',
    analogy: '打个比方：try 像是在过马路时张望，except 是看到车过来就停步绕开，else 是平安通过后继续走，finally 是无论怎样最后都要把鞋带系好（收尾动作）。',
    terms: [
      { term: 'try', zh: '尝试', note: '结界要“试着执行”的、可能出错的代码块' },
      { term: 'except', zh: '接住', note: '声明要捕获并处理哪一类异常' },
      { term: 'else', zh: '否则', note: 'try 没出错时才执行的代码块' },
      { term: 'finally', zh: '最后', note: '不管有没有出错，退出时都会执行的代码块' },
      { term: 'raise', zh: '抛出', note: '主动制造一个异常交出去' }
    ],
    steps: [
      '把可能出错的语句放进 try 块',
      '用 except 异常类型 as e: 接住这一类并做处理',
      '想只在成功时执行某些语句，就用 else 块',
      '想保证收尾动作一定执行，就放进 finally 块'
    ],
    examples: [
      {
        title: '接住除零错误让程序不崩',
        code: "def divide(a, b):\n    return a / b\n\ntry:\n    result = divide(10, 0)\nexcept ZeroDivisionError as e:\n    print('出错了:', e)\nelse:\n    print('结果是', result)\nfinally:\n    print('这行无论如何都会打印')",
        output: '出错了: division by zero\n这行无论如何都会打印',
        note: '10 除以 0 抛 ZeroDivisionError，被 except 接住并打印；else 因为出错了所以不执行；finally 一定会执行。',
        verify: true
      },
      {
        title: '文件不存在时给出提示',
        code: "try:\n    with open('missing.txt', encoding='utf-8') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('文件找不到了，请检查路径')",
        output: '文件找不到了，请检查路径',
        note: '当前目录没有 missing.txt 时抛 FileNotFoundError，被接住后程序不崩，而是友好提示。',
        verify: true
      },
      {
        title: '用 raise 主动抛出异常',
        code: "def check_age(age):\n    if age < 0:\n        raise ValueError('年龄不能是负数')\n    return age\n\ntry:\n    check_age(-5)\nexcept ValueError as e:\n    print('捕获:', e)",
        output: '捕获: 年龄不能是负数',
        note: 'check_age 看到负数认为不合理，用 raise ValueError 主动抛错；调用方用 except 接住。这就是“声明这是一个错误”。',
        verify: true
      }
    ],
    pitfalls: [
      {
        title: '什么都不写地接住所有异常',
        bad: 'try:\n    risky()\nexcept:\n    pass   # 悄悄吞掉，等于没处理',
        good: "except ValueError as e:\n    print('参数出问题:', e)",
        note: '空 except 会把所有错误都吞掉，程序看似没崩，问题却被藏起来了，非常难排查。'
      },
      {
        title: '捕获范围太大，掩盖真实问题',
        bad: 'try:\n    return a / b\nexcept Exception:\n    return -1   # 连编码、IO 错误也一起吞了',
        good: 'except ZeroDivisionError:\n    return -1',
        note: '只捕获你确实能处理的异常类型，其余交给更外层，别把所有问题都当成同一种。'
      },
      {
        title: '把入口全包成一个大 try 导致定位困难',
        bad: 'try:\n    ...很多行代码...\nexcept Exception:\n    print("出错")',
        good: 'try 只包住真正那几行可能出错的语句',
        note: 'try 块越小，出错时越容易从 except 的类型判断是哪里出了问题。'
      }
    ],
    practice: [
      {
        prompt: '写一个函数 safe_divide(a, b)：能算就返回商；b 为 0 时返回字符串“不能除以 0”。',
        starter: "def safe_divide(a, b):\n    # TODO: 用 try/except 接住 ZeroDivisionError\n    pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        answer: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return '不能除以 0'\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        output: '5.0\n不能除以 0',
        hint: 'return 写在 try 里，除零异常被 except 接住时就走备选结果。'
      },
      {
        prompt: '提示用户输入一个数字并转为整数，如果输的不是数字就打印“请输入数字”。',
        starter: "text = input('请输入数字: ')\n# TODO: 用 try 转整数，except 接住转换失败",
        answer: "text = input('请输入数字: ')\ntry:\n    number = int(text)\n    print('你输入了', number)\nexcept ValueError:\n    print('请输入数字')",
        output: '（输入不是数字时）请输入数字',
        hint: 'int("abc") 会抛 ValueError；把它接住就能在用户乱输入时不崩溃。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'try 块成功执行、没有抛错时，接下来会运行哪一部分？',
        options: ['except 块', 'else 块', 'finally 之前的 except', '什么都不运行'],
        answer: 1,
        explain: 'try 没出错就执行 else；出错才执行 except；finally 则是总执行。'
      },
      {
        type: 'judge',
        question: 'finally 块只有 try 成功时才执行顺序继续。',
        answer: false,
        explain: 'finally 无论 try 成不成功都会执行，用于保证收尾。'
      },
      {
        type: 'code',
        question: '补全代码：把可能出错的语句包进 try，并在后面用 except 接住普通错误。',
        code: '______:\n    result = a / b\nexcept ZeroDivisionError:\n    result = 0',
        answer: 'try',
        explain: 'try 标记“可能出错、要尝试”的代码块，后面紧跟 except 接住异常。'
      }
    ]
  },
  {
    id: 'logging-basic',
    title: '日志：记录程序运行过程',
    phase: 5,
    order: 5,
    minutes: 22,
    rating: { level: 1, must: 4 },
    summary: '用 logging 模块给程序记日志，把“运行到哪了、发生了什么”写下来，方便日后排查问题。',
    keywords: ['logging', 'logger', '级别', 'info', 'warning', '日志'],
    tip: '零基础提示：程序跑完你可能不再记得中间发生了什么；日志就像飞机会自动记录飞行数据，出问题了对一下记录就知道卡在哪一步。',
    what: 'logging 是 Python 自带的日志模块。先 logging.basicConfig(level=logging.INFO) 设好基本配置，再用 logging.info、logging.warning、logging.error 打日志。日志有 debug、info、warning、error 等多个级别，级别越高越严重，level 设置决定哪些会被显示。比到处 print 好的是日志能分级、能开关、能方便地写进文件。',
    analogy: '打个比方：print 像上课随便举手喊一句，日志像正式记到班级日志本里；到晚上（排查时）翻班级日志，每一条都写着“几点发生了什么”。',
    terms: [
      { term: 'logging', zh: '日志（模块）', note: 'Python 自带的、用于记录运行信息的模块' },
      { term: 'level', zh: '级别', note: '日志的严重程度，如 DEBUG、INFO、WARNING、ERROR' },
      { term: 'basicConfig', zh: '基础配置', note: '一次性设好日志显示级别、格式等' },
      { term: 'INFO', zh: '信息级', note: '用来记“正常进行中”的重要信息的一种级别' }
    ],
    steps: [
      'import logging 引入模块',
      'logging.basicConfig(level=logging.INFO) 设全局基础配置',
      '在关键位置打 logging.info("正在读取文件") 等信息',
      '根据严重程度换用 logging.warning / logging.error',
      '用 format 参数控制每行日志长什么样'
    ],
    examples: [
      {
        title: '分级打印不同信息',
        code: "import logging\nlogging.basicConfig(level=logging.INFO, format='%(message)s')\n\nlogging.debug('调试细节，默认不显示')\nlogging.info('程序开始处理')\nlogging.warning('磁盘剩余空间不多')",
        output: '程序开始处理\n磁盘剩余空间不多',
        note: 'level=logging.INFO 表示只显示 INFO 及以上，所以 DEBUG 那条被过滤掉了；format 去掉多余前缀，让输出干净。',
        verify: true
      },
      {
        title: '给日志加上时间',
        code: "import logging\nlogging.basicConfig(\n    level=logging.INFO,\n    format='%(asctime)s %(levelname)s: %(message)s'\n)\nlogging.error('连接失败，请重试')",
        output: '2026-01-01 10:00:00,123 ERROR: 连接失败，请重试',
        note: '%(asctime)s 会写入当前时间。为了演示这个例子，这里给的是格式样例，具体时间以你运行时为准。',
        verify: true
      },
      {
        title: '把代码写在日志里一起记下',
        code: "import logging\nlogging.basicConfig(level=logging.INFO, format='%(levelname)s %(message)s')\n\nfor name in ['小美', '小刚']:\n    logging.info('正在处理 ' + name)\nlogging.warning('任务完成，但有 1 个失败')",
        output: 'INFO 正在处理 小美\nINFO 正在处理 小刚\nWARNING 任务完成，但有 1 个失败',
        note: '用变量的值拼进日志消息，就能在记录里看到“当时处理到谁了”，非常方便排查。',
        verify: true
      }
    ],
    pitfalls: [
      {
        title: '把敏感信息写进日志',
        bad: "logging.info('用户密码是 ' + password)",
        good: "logging.info('用户 ' + user_id + ' 登录成功')",
        note: '日志会长期保存并可能被很多人看到，别把密码、账号等敏感信息记进去。'
      },
      {
        title: '到处用 print 当日志',
        bad: "print('开始读取')\nprint('读取结束')",
        good: "logging.info('开始读取')\nlogging.info('读取结束')",
        note: 'print 不好分级、不好一次关掉、也不好统一格式；正式程序用 logging 更清晰。'
      },
      {
        title: '错误处理前忘了记日志',
        bad: 'except ValueError:\n    return -1',
        good: 'except ValueError as e:\n    logging.warning("参数有误: %s", e)\n    return -1',
        note: '吞掉错误前先用日志记一笔，之后回看才知道这里发生过什么。'
      }
    ],
    practice: [
      {
        prompt: '用日志打印“开始”和“完成”两条 INFO，并把一条错误写为 ERROR 级别。',
        starter: "import logging\n# TODO: 用 basicConfig 设好 INFO 级别，再用 logging 打印三条不同信息",
        answer: "import logging\nlogging.basicConfig(level=logging.INFO, format='%(message)s')\n\nlogging.info('开始')\nlogging.info('完成')\nlogging.error('失败了')",
        output: '开始\n完成\n失败了',
        hint: 'basicConfig 的 level 决定能显示哪些级别；INFO 之上都显示，看三条是否都出来了。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '把日志级别设成 logging.INFO 后，哪一条不会被显示？',
        options: ['logging.info(...)', 'logging.warning(...)', 'logging.debug(...)', 'logging.error(...)'],
        answer: 2,
        explain: 'INFO 及以上才显示，DEBUG 比 INFO 低，会被过滤掉。'
      },
      {
        type: 'judge',
        question: '写日志时应该把用户的密码也记进去，方便排查登录问题。',
        answer: false,
        explain: '日志可能长期保存、被许多人看到，绝不能记录密码等敏感信息。'
      }
    ]
  },
  {
    id: 'sqlite-basics',
    title: 'sqlite3：把数据存进数据库',
    phase: 5,
    order: 6,
    minutes: 30,
    rating: { level: 3, must: 4 },
    summary: '不装任何东西，用自带的 sqlite3 建表、插入、查询，把数据稳妥地存进一个文件。',
    keywords: ['sqlite', 'sqlite3', '数据库', '建表', 'SQL', '存储'],
    tip: '零基础提示：数据库像一个更靠谱的账本——数据按表存放，增删改查都是现成命令。Python 自带 sqlite3，不用安装，建好的库就是硬盘上的一个文件。',
    what: 'sqlite3 是 Python 自带的数据库模块，数据存在一个 .db 文件里，比普通文本文件更稳：不怕写一半崩溃，还能按条件快速查询。使用只要三步：connect 连接（文件不存在会自动创建）、execute 执行 SQL 语句（建表、插入、查询）、commit 提交保存后 close 关闭。查询结果用 fetchall 取回，是一行行的元组。',
    analogy: '打个比方：普通文件像一张纸，写坏了就废了；数据库像一个带保险柜的账本，每笔记账（commit）都稳妥落袋，翻找（查询）也快。',
    terms: [
      { term: 'sqlite3', zh: '自带数据库模块', note: 'Python 标准库，无需安装，数据保存在一个 .db 文件里。' },
      { term: 'table', zh: '表', note: '数据库里放数据的地方，先定好有哪些列，再一行行放数据。' },
      { term: 'SQL', zh: '数据库查询语言', note: '操作数据库的固定句式，如 CREATE TABLE、INSERT、SELECT。' },
      { term: 'cursor', zh: '游标', note: '执行 SQL 和取回结果的"操作手"，由连接对象创建。' },
      { term: 'commit', zh: '提交', note: '把改动真正写进数据库文件，不提交就等于白改。' }
    ],
    steps: [
      'import sqlite3 并连接：conn = sqlite3.connect("score.db")，文件不存在会自动创建',
      '建游标：cur = conn.cursor()',
      '建表：cur.execute("CREATE TABLE IF NOT EXISTS student (name TEXT, score INT)")，IF NOT EXISTS 防止重复建表报错',
      '插入：cur.execute("INSERT INTO student VALUES (?, ?)", (值1, 值2))，然后 conn.commit()',
      '查询：cur.execute("SELECT ...")，再用 cur.fetchall() 取回全部结果',
      '用完 conn.close() 关闭连接',
    ],
    examples: [
      {
        title: '建表、插入、查询三步走',
        code: `import sqlite3

conn = sqlite3.connect("score.db")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS student (name TEXT, score INT)")
cur.execute("INSERT INTO student VALUES ('小明', 92)")
conn.commit()
cur.execute("SELECT * FROM student WHERE score >= 90")
print(cur.fetchall())
conn.close()`,
        output: `[('小明', 92)]`,
        note: 'SELECT * 取所有列，WHERE score >= 90 是筛选条件；fetchall 把匹配的行装进列表返回。',
      },
      {
        title: '批量插入与排序查询',
        code: `import sqlite3

conn = sqlite3.connect("score.db")
cur = conn.cursor()
rows = [("小红", 88), ("小刚", 95)]
cur.executemany("INSERT INTO student VALUES (?, ?)", rows)
conn.commit()
cur.execute("SELECT name FROM student ORDER BY score DESC")
print(cur.fetchall())
conn.close()`,
        output: `[('小刚',), ('小明',), ('小红',)]`,
        note: 'executemany 一次插多行，? 占位符自动处理引号和转义；单元素元组末尾的逗号是 Python 的固定写法，别漏。',
      }
    ],
    pitfalls: [
      {
        title: '忘了 conn.commit()',
        bad: 'cur.execute("INSERT INTO student VALUES (\'小明\', 92)")\n# 没有 commit 就关了连接',
        good: 'cur.execute("INSERT INTO student VALUES (?, ?)", ("小明", 92))\nconn.commit()',
        note: '不提交，改动只在内存里，重新打开数据库会发现数据根本没写进去。'
      },
      {
        title: '用字符串拼接拼 SQL',
        bad: `name = "小明'"
cur.execute("INSERT INTO student VALUES ('" + name + "', 90)")`,
        good: `cur.execute("INSERT INTO student VALUES (?, ?)", (name, 90))`,
        note: '拼接会撞上引号转义问题，还容易被恶意输入钻空子；问号占位符让 sqlite3 替你安全处理。'
      },
      {
        title: '重复建表导致报错',
        bad: 'cur.execute("CREATE TABLE student (name TEXT, score INT)")   # 第二次运行报错',
        good: 'cur.execute("CREATE TABLE IF NOT EXISTS student (name TEXT, score INT)")',
        note: '表已存在再 CREATE 会报 table already exists；加上 IF NOT EXISTS 就能放心重复运行。'
      }
    ],
    practice: [
      {
        prompt: '接着上面建好的 score.db，写程序计算 student 表里所有分数的平均分，保留一位小数。',
        starter: `import sqlite3

conn = sqlite3.connect("score.db")
cur = conn.cursor()
# TODO: 查询平均分并打印
conn.close()
`,
        answer: `import sqlite3

conn = sqlite3.connect("score.db")
cur = conn.cursor()
cur.execute("SELECT AVG(score) FROM student")
print("平均分", round(cur.fetchone()[0], 1))
conn.close()`,
        output: `平均分 91.7`,
        hint: 'AVG(score) 是求平均的 SQL 函数；fetchone() 取一行结果，[0] 取出里面的数字。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'cur.fetchall() 返回的查询结果是什么形式？',
        options: ['一整段字符串', '由元组组成的列表，每个元组是一行', '一个数字', '字典组成的列表'],
        answer: 1,
        explain: '每一行数据是一个元组，fetchall 把所有行装进列表返回。'
      },
      {
        type: 'judge',
        question: '执行完 INSERT 后只要 close 了连接，数据就自动保存进数据库文件。',
        answer: false,
        explain: '必须先 conn.commit() 提交，改动才会真正写入文件，否则一关连接就丢了。'
      },
      {
        type: 'code',
        question: '补全真正把改动写入数据库的一行：conn.____()',
        code: 'cur.execute("INSERT INTO student VALUES (?, ?)", ("小明", 92))\nconn.____()',
        answer: 'commit',
        accept: [],
        explain: 'commit 是"落账"动作，执行后改动才写进 .db 文件。'
      }
    ]
  }
]