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
    lecture: [
      '文件是程序与外界交换数据的主要通道：程序运行一结束，内存里的数据就没了，存进文件才能留到下次。这一节先解决"把文件读进来"。',
      'open(路径, "r", encoding="utf-8") 返回一个文件对象，代表"书已经翻开"。读它有两种方式：read() 一次性拿回整段文字（适合小文件）；for line in f 逐行读取（适合大文件，内存占用小）。',
      '中文几乎一定要写 encoding="utf-8"——不写会用系统默认编码打开，很多环境会得到乱码。读完的文件记得 f.close() 关掉，否则资源一直被占用；更稳妥的写法是用下一节的 with。',
      '读取结果都是字符串。想逐行处理时，每行末尾自带换行符 "\\n"，用 line.strip() 去掉。',
      '- open(路径) 打开文件，默认就是只读模式',
      '- f.read() 一次性读取全部内容',
      '- for line in f: 逐行读，大文件首选',
      '- 文本必须加 encoding="utf-8"，否则中文可能乱码',
      '- 读完用 f.close() 关闭，或以后统一用 with 管理',
      '- line.strip() 去掉行尾换行符',
      '读文件的本质就一句话：先把文件变成一个可以迭代的对象，再一行一行拿数据。',
    ],
    terms: [
      { term: 'open', zh: '打开（文件）', note: 'Python 内置函数，用于打开一个文件并返回文件对象' },
      { term: 'file-object', zh: '文件对象', note: 'open() 返回的东西，代表这个已打开的文件' },
      { term: 'encoding', zh: '编码方式', note: '文字在电脑里的存取规则，中文常用 utf-8' },
      { term: 'line', zh: '一行', note: '文本里以换行符结尾的一整行' },
      { term: 'enumerate', zh: '枚举', note: '同时给出编号和内容，读文件加行号常用它' }
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
      },
      {
        title: '文件还没建就去读',
        bad: "open('data.txt')   # 当前目录根本没有这个文件",
        good: "先建好 data.txt，或用 try/except FileNotFoundError 给提示",
        note: 'open 只负责读，不会替你创建；读不存在的文件会抛 FileNotFoundError。'
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
    lecture: [
      '写文件本质上就三件事：挑一个模式、把文字交给文件对象、关好文件。模式决定了"这张纸上原有的字怎么办"。',
      'mode="w"（写）：新建或覆盖整个文件，原有内容会被清空，只想更新一部分内容时千万别用它。mode="a"（追加）：在文件末尾续写，原有内容保留，日志、记录类场景都用它。mode="r"（读）是默认值，open() 只写路径就是读。',
      '写入用 f.write(文字) 或 f.writelines(字符串列表)。写完务必 f.close()，否则缓冲区里的内容可能还没真正落到磁盘上。',
      '和读文件一样，中文写入也要写 encoding="utf-8"，读写两边编码一致才不会出乱码。',
      '- open(路径, "w", encoding="utf-8")：覆盖写入',
      '- open(路径, "a", encoding="utf-8")：末尾追加',
      '- write("内容") 写一段文字',
      '- "w" 会清空原文件，原有内容要保留就用 "a"',
      '- 写完 f.close()，把缓冲区数据写入磁盘',
      '- 读写都要写 encoding="utf-8"',
      '先想清楚要不要保留旧内容，再决定用 "w" 还是 "a"——这是写文件的第一性原则。',
    ],
    terms: [
      { term: 'mode', zh: '模式', note: 'open() 的第二个参数，告诉文件要读还是要写' },
      { term: 'write', zh: '写入', note: '文件对象的方法，把字符串写进文件' },
      { term: 'overwrite', zh: '覆盖', note: 'mode="w" 的行为，把原文件内容整个清掉再写入' },
      { term: 'append', zh: '追加', note: 'mode="a" 的行为，接着原文件末尾继续写' },
      { term: 'newline', zh: '换行符', note: '文字里的 \\n；write 不会自动补，多行要自己拼' }
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
      },
      {
        title: '把数字直接交给 write',
        bad: 'f.write(100)   # 报错 TypeError',
        good: 'f.write(str(100))   # 先转成字符串',
        note: 'write 只接受字符串；数字要先 str() 转换，或用 f-string 拼进文字。'
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
    id: 'csv-pickle',
    title: 'CSV 与 pickle：两种存档格式',
    phase: 5,
    order: 3,
    minutes: 28,
    rating: { level: 3, must: 4 },
    summary: 'csv 存给人看的表格文本，pickle 存给 Python 自己用的原样数据：两种存档各有分工。',
    keywords: ['csv', 'pickle', '序列化', 'DictReader', '存档', '表格'],
    tip: '零基础提示：csv 是"用逗号分格的表格文本"，Excel 和记事本都能打开；pickle 是"Python 专属的打包袋"，原样保存列表字典。给人看用 csv，给程序下次用选 pickle。',
    lecture: [
      '表格数据和程序里的对象，是两类"要反复读写"的东西，Python 分别用 csv 和 pickle 两个模块来对付。',
      'csv（逗号分隔值）是表格的文本格式：Excel 也能打开。csv.writer 配合 writerow 一行行写入"姓名,分数"这样的行；读取用 csv.reader（取到行就是列表）或 csv.DictReader（每行变成字典，列名就是键），非常适合处理导出的数据表。',
      'pickle 走另一条路：它把 Python 对象原封不动序列化成二进制文件，load 回来还是原来的字典、列表，连类型都不用转。代价是它只能给 Python 自己用，人看不了，也不能跨语言。',
      '要传给别人、给 Excel 看，用 csv；只给自己的程序存/取，用 pickle。另外有一条铁律：绝不 pickle.load 来路不明的文件——它会直接执行反序列化内容，是安全漏洞。',
      '- csv.writer 写表：writer.writerow(["姓名", "分数"])',
      '- csv.DictReader 读表：每行是字典，键是列名',
      '- 读回来的每个格子都是字符串，数字要自己 int()/float() 转换',
      '- pickle.dump 存对象，pickle.load 取对象，无需类型转换',
      '- pickle 只给自己的程序用，不跨语言、跨软件',
      '- 绝不加载来路不明的 pickle 文件',
      '一句话：给人看的表格用 csv，给程序自己存的用 pickle。',
    ],
    terms: [
      { term: 'csv', zh: '逗号分隔值', note: '用逗号分列的纯文本表格格式，通用性最好。' },
      { term: 'DictReader', zh: '字典读取器', note: '把第一行当表头，每行读成"列名: 值"的字典。' },
      { term: 'pickle', zh: '序列化模块', note: '把 Python 对象原样存成二进制文件，load 回来不用转换。' },
      { term: 'binary mode', zh: '二进制模式', note: 'pickle 读写要用 "wb" / "rb" 模式打开文件。' },
      { term: 'newline', zh: '换行参数', note: '写 csv 时 open 加 newline=""，防止 Windows 下多出空行。' }
    ],
    steps: [
      '用 csv.writer 配合 open(..., "w", newline="", encoding="utf-8") 写表格',
      '用 csv.reader 或 DictReader 把表格读回来',
      '给程序自己用的中间数据改用 pickle.dump 存、pickle.load 取',
      'pickle 文件必须用 "wb" / "rb" 二进制模式打开',
      '要发给别人看的报表用 csv，要下次接着跑的结果用 pickle',
    ],
    examples: [
      {
        title: '写一张表格再读回来',
        code: `import csv

with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["姓名", "分数"])
    writer.writerow(["小明", 92])
    writer.writerow(["小红", 88])

with open("scores.csv", encoding="utf-8") as f:
    for row in csv.reader(f):
        print(row)`,
        output: `['姓名', '分数']
['小明', '92']
['小红', '88']`,
        note: '写进去的数字 92，读回来变成了字符串 "92"——csv 的一切都是文字，算数前要自己转。',
      },
      {
        title: 'DictReader：第一行当表头',
        code: `import csv

with open("scores.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["姓名"], row["分数"])`,
        output: `小明 92
小红 88`,
        note: 'DictReader 自动把第一行当列名，每行读成一个字典，用列名取值比下标清楚得多。',
      },
      {
        title: 'pickle：原样保存再取回',
        code: `import pickle

data = {"name": "小明", "scores": [92, 88]}
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)
print(loaded["name"], loaded["scores"][0])`,
        output: `小明 92`,
        note: 'dump 存、load 取，字典列表原样回来；文件用 "wb"/"rb" 二进制模式打开。',
      }
    ],
    pitfalls: [
      {
        title: '读回来的数字直接当数用',
        bad: 'row = ["小明", "92"]\nprint(row[1] + 8)   # 文字加数字报错',
        good: 'print(int(row[1]) + 8)',
        note: 'csv 里一切皆文本；需要计算就先 int() 或 float()。'
      },
      {
        title: '加载来路不明的 pickle 文件',
        bad: 'pickle.load(open("别人发来的.pkl", "rb"))',
        good: '只加载你自己存的 pickle 文件；对外交换数据用 csv 或 JSON',
        note: 'pickle 能还原任意对象，恶意文件可借机执行代码；它只适合程序自己的中间存档。'
      },
      {
        title: '写 csv 忘了 newline 参数',
        bad: 'open("scores.csv", "w", encoding="utf-8")   # Windows 下会多出空行',
        good: 'open("scores.csv", "w", newline="", encoding="utf-8")',
        note: 'csv 模块自己管换行，open 再补一次就会在 Windows 上隔行出现空行。'
      }
    ],
    practice: [
      {
        prompt: '把商品 [["钢笔", 5], ["笔记本", 3]] 用 csv 写进 goods.csv（带表头 商品/数量），再用 DictReader 读回打印。',
        starter: `import csv

# TODO: 写入并读回
`,
        answer: `import csv

with open("goods.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["商品", "数量"])
    writer.writerows([["钢笔", 5], ["笔记本", 3]])

with open("goods.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["商品"], row["数量"])`,
        output: `钢笔 5
笔记本 3`,
        hint: 'writerows 一次写多行；DictReader 按表头列名取值。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '用 csv.reader 读回表格时，数字 92 会变成什么？',
        options: ['整数 92', '字符串 "92"', '小数 92.0', '布尔 True'],
        answer: 1,
        explain: 'csv 的一切都是文本，读回来是字符串 "92"，需要计算先转 int。',
      },
      {
        type: 'judge',
        question: 'pickle 存的文件可以直接发给任何人、任何程序打开查看。',
        answer: false,
        explain: 'pickle 是 Python 专属的二进制格式，且加载来路不明的文件有安全风险；对外交换用 csv 或 JSON。',
      },
      {
        type: 'code',
        question: '补全：写 csv 文件时防止 Windows 下多出空行。',
        code: 'open("scores.csv", "w", ________, encoding="utf-8")',
        answer: 'newline=""',
        accept: ['newline=""'],
        explain: 'newline="" 交给 csv 模块自己处理换行。'
      }
    ]
  },
  {
    id: 'with-statement',
    title: 'with 语句：用完自动收拾',
    phase: 5,
    order: 4,
    minutes: 20,
    rating: { level: 1, must: 4 },
    summary: 'with ... as 能保证文件用完自动关闭，即使中途出错了也不会漏关，让程序更安全。',
    keywords: ['with', '上下文管理器', '自动关闭', 'enter', 'exit', '资源管理'],
    tip: '零基础提示：前面几节一直在用 with，这节告诉你它为什么重要——它替你保证“用完一定关门”，你不用记着写 close()。',
    lecture: [
      '文件用完要还回去，但如果中间代码抛了异常，f.close() 可能永远轮不到执行——资源就漏了。with 就是专门解决这个问题的。',
      '写法：with open(路径, "r", encoding="utf-8") as f: 然后在缩进块里读写文件。块一结束，Python 自动帮你关文件；哪怕块里抛异常、哪怕写了 return，文件都一定会被关掉。',
      '这不是语法糖，而是协议：with 会调用对象的 __enter__（进入时准备资源）和 __exit__（退出时清理）。文件、网络连接、数据库连接，这类"用完要还回去"的资源都适合用 with。',
      '以后你写打开文件的代码，默认就先写 with open(...)，这比手动 close 更不容易漏。',
      '- with open(路径, "r", encoding="utf-8") as f:',
      '- 缩进块内读写文件，块结束自动关闭',
      '- 块里抛异常、return，文件依然会被正确关闭',
      '- 原理：对象实现 __enter__ / __exit__ 协议',
      '- 文件、网络连接、数据库连接都适合用 with',
      '记住这条铁律：打开文件就用 with，不再手写 close。',
    ],
    terms: [
      { term: 'with', zh: '随着（语句）', note: 'Python 的关键字，用来保证资源一定被收拾好' },
      { term: 'context-manager', zh: '上下文管理器', note: '实现了 __enter__ 和 __exit__ 的对象，可被 with 管理' },
      { term: 'as', zh: '作为', note: '把 with 打开的对象的返回值绑定到一个名字上' },
      { term: 'close', zh: '关闭', note: '收回文件等资源，with 会自动做这一件事' },
      { term: 'resource', zh: '资源', note: '用完要归还的东西，如文件、网络连接，适合交给 with 管理' }
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
      },
      {
        title: '要同时开两个文件，缩进越套越深',
        bad: "with open('a.txt') as fa:\n    with open('b.txt') as fb:\n        ...",
        good: "with open('a.txt') as fa, open('b.txt') as fb:\n    ...",
        note: '一个 with 用逗号可以同时管理多个资源，缩进只有一层。'
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
      },
      {
        type: 'choice',
        question: '想同时打开两个文件并都交给 with 管理，正确写法是？',
        options: [
          '写两层嵌套的 with',
          'with open("a") as fa, open("b") as fb:',
          '一个 with 只能管一个文件，无法同开',
          '把两个文件名都塞进一个 open'
        ],
        answer: 1,
        explain: '一个 with 用逗号分隔多个 open，每个配一个 as 名字，缩进只有一层。',
      }
    ]
  },
  {
    id: 'exception-handling',
    title: '异常：程序遇到意外怎么处理',
    phase: 5,
    order: 5,
    minutes: 28,
    rating: { level: 1, must: 5 },
    summary: '用 try/except/else/finally 接住运行时错误，让程序不因一次意外就整个崩溃，必要时用 raise 主动抛错。',
    keywords: ['try', 'except', 'else', 'finally', 'raise', '异常', '错误处理'],
    tip: '零基础提示：程序跑的时候会遇到意外（文件不存在、除以 0），你不处理它就会当场崩溃；异常处理就是给这些意外装个“安全网”。',
    lecture: [
      '程序遇到无法继续的情况会"抛出"一个异常对象，不处理就会整个崩掉。这一节把 try/except/else/finally 的各自职责一次讲清。',
      'try 包住可能出错的代码；except 接住某种异常并给出补救：命中哪种就走哪条。出错类型要先认——ZeroDivisionError（除以 0）、FileNotFoundError（文件不存在）、ValueError（值不对）都能精准捕获。',
      'else 是"没抛异常时才执行"，放只有成功后才能做的事；finally 是"无论有没有异常都要执行"，适合收尾动作（关文件、断开连接）。完整骨架：try → except（可能多个）→ else → finally，从上到下按需出现。',
      '还可以用 raise 主动抛异常：输入不合法、没有权限等情况下，自己喊一声"这里不该这样"，让上层的 except 去接。',
      '- try：包住可能出错的代码',
      '- except 异常类型: 命中哪种、跑哪条，优先精准捕获',
      '- else：没有异常时执行；finally：无论如何都执行',
      '- ZeroDivisionError：除以 0；FileNotFoundError：文件不存在',
      '- raise 主动抛出异常，例如 raise ValueError("分数必须在 0-100")',
      '- 不要裸 except 或 pass 吞掉异常，至少记日志或给出提示',
      '异常处理的关键不是"不报错"，而是"出了错也有明确的出路"。',
    ],
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
        title: '宽异常写在窄异常前面',
        bad: 'try:\n    risky()\nexcept Exception:\n    print("出错")\nexcept ValueError:\n    print("值错误")   # 永远轮不到',
        good: '先写 except ValueError，再写 except Exception 兜底',
        note: '异常按从上到下的顺序匹配，宽的类型放前面，后面的就永远接不到。'
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
    order: 6,
    minutes: 22,
    rating: { level: 1, must: 4 },
    summary: '用 logging 模块给程序记日志，把“运行到哪了、发生了什么”写下来，方便日后排查问题。',
    keywords: ['logging', 'logger', '级别', 'info', 'warning', '日志'],
    tip: '零基础提示：程序跑完你可能不再记得中间发生了什么；日志就像飞机会自动记录飞行数据，出问题了对一下记录就知道卡在哪一步。',
    lecture: [
      '程序上线之后，print 再多也帮不了排查线上问题——打印不分轻重、不能方便地关、也不能写进文件。logging 就是正经的日志系统。',
      '最简三步：import logging；logging.basicConfig(level=logging.INFO) 设置生效级别；之后用 logging.debug / info / warning / error / critical 打日志。',
      '级别从低到高是 debug < info < warning < error < critical。level=logging.INFO 表示 info 及以上的日志才会显示——debug 级别被过滤掉。开级别就是一个开关：线上调试开 DEBUG，稳定运行关到 WARNING。',
      '相对 print，日志还能：显示时间和级别、写进文件（basicConfig(filename="app.log")）、格式统一，方便事后按时间、按级别检索。',
      '- logging.basicConfig(level=logging.INFO)：设级别',
      '- logging.info("...") / warning("...") / error("...")',
      '- 级别从低到高：debug → info → warning → error → critical',
      '- 低于 level 的日志直接被过滤',
      '- basicConfig(filename="app.log") 把日志写入文件',
      '- 线上用日志、本地随手调试用 print 都可以，但别混用',
      '出了问题先翻日志，再看代码——日志是程序的"黑匣子"。',
    ],
    terms: [
      { term: 'logging', zh: '日志（模块）', note: 'Python 自带的、用于记录运行信息的模块' },
      { term: 'level', zh: '级别', note: '日志的严重程度，如 DEBUG、INFO、WARNING、ERROR' },
      { term: 'basicConfig', zh: '基础配置', note: '一次性设好日志显示级别、格式等' },
      { term: 'INFO', zh: '信息级', note: '用来记"正常进行中"的重要信息的一种级别' },
      { term: 'WARNING', zh: '警告级', note: '比 INFO 严重一档：程序还能跑，但有问题要注意' }
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
        title: '重复调用 basicConfig 想改级别',
        bad: "logging.basicConfig(level=logging.INFO)\nlogging.basicConfig(level=logging.ERROR)   # 不生效",
        good: '程序开头设一次；运行中要改就用 logging.getLogger().setLevel(logging.ERROR)',
        note: 'basicConfig 只有第一次调用生效，之后再设都是无效的；要动态改级别用 setLevel。'
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
      },
      {
        type: 'code',
        question: '补全：记录一条最高级别的错误日志。',
        code: 'logging.____("数据库连不上")',
        answer: 'error',
        accept: ['error('],
        explain: 'logging.error 记录 ERROR 级日志，是四个常用级别里最严重的一档。'
      }
    ]
  },
  {
    id: 'sqlite-basics',
    title: 'sqlite3：把数据存进数据库',
    phase: 5,
    order: 7,
    minutes: 30,
    rating: { level: 3, must: 4 },
    summary: '不装任何东西，用自带的 sqlite3 建表、插入、查询，把数据稳妥地存进一个文件。',
    keywords: ['sqlite', 'sqlite3', '数据库', '建表', 'SQL', '存储'],
    tip: '零基础提示：数据库像一个更靠谱的账本——数据按表存放，增删改查都是现成命令。Python 自带 sqlite3，不用安装，建好的库就是硬盘上的一个文件。',
    lecture: [
      '普通文本文件会遇到两个麻烦：写一半程序崩了数据就废了，想按条件（比如"所有大于 80 分的记录"）找数据只能整文件逐行翻。sqlite3 解决的就是这两件事。',
      'sqlite3 是 Python 自带的数据库引擎，所有数据存在一个 .db 文件里，不需要单独装数据库软件，复制这个文件就等于拷走整个库。',
      '固定三步：connect 连接（文件不存在自动创建）；execute 执行 SQL（建表 CREATE TABLE、插入 INSERT INTO、查询 SELECT ... WHERE）；最后 commit() 提交保存，close() 关闭连接。',
      '查询用 fetchall() 取回全部行——是一行行的元组，按列顺序排列；fetchone() 只取一行。改数据之后不 commit 不会真正生效——这是 SQLite 初学者最常见的疑惑。',
      '- import sqlite3；conn = sqlite3.connect("data.db")',
      '- conn.execute("SELECT * FROM scores WHERE score > ?", (80,))',
      '- 用 ? 做参数占位，避免字符串拼接出安全问题',
      '- conn.commit() 提交修改，不提交等于没改',
      '- rows = conn.execute(...).fetchall()，每行是元组',
      '- conn.close() 用完关闭连接',
      '文件适合存一堆文字，数据库适合存一堆记录——分数、订单、用户都该进数据库。',
    ],
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
      },
      {
        title: '更新与删除：改数据、清数据',
        code: `import sqlite3

conn = sqlite3.connect("score.db")
cur = conn.cursor()
cur.execute("UPDATE student SET score = 96 WHERE name = '小明'")
cur.execute("DELETE FROM student WHERE score < 90")
conn.commit()
cur.execute("SELECT name, score FROM student ORDER BY score DESC")
print(cur.fetchall())
conn.close()`,
        output: `[('小明', 96), ('小刚', 95)]`,
        note: 'UPDATE 改值、DELETE 删行，都要带 WHERE 指明"改谁/删谁"；忘写 WHERE 会波及全表。改完同样要 commit。',
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
      },
      {
        title: 'fetchone 查不到结果还去取值',
        bad: 'row = cur.fetchone()\nprint(row[0])   # 没查到时 row 是 None',
        good: 'row = cur.fetchone()\nif row:\n    print(row[0])',
        note: '查询无结果时 fetchone() 返回 None；先判空再取值，否则 AttributeError。'
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