/**
 * 第二阶段：常用的数据（零基础入门，约 3 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'strings',
    title: '字符串：处理文字',
    phase: 2,
    order: 1,
    minutes: 30,
    rating: { level: 2, must: 5 },
    summary: '拼接、查找、替换、格式化文字，以及 f-string：处理文本信息的基本功。',
    keywords: ['字符串', 'str', '拼接', 'f-string', '替换', 'format', 'join'],
    tip: '零基础提示：字符串就是"一段文字"。你会经常把它拼起来、从里面找东西、按模板排版。',
    what: '很多程序做的事其实是处理文字：把两条信息拼成一句话、从一段话里找某个词、把名字写进一条固定格式的通知里。字符串（str）就是用来保存和操作这些文字的，f-string 则是把变量放进文字里最省事的方法。',
    analogy: '字符串像一条彩色胶带，你能把它一段段接起来（拼接），也能用模板在中间留空、往空里填名字（f-string）。',
    steps: [
      '把两段文字用 + 拼起来，再用 len() 数数有多长',
      '用 in 检查某个词在不在这段话里',
      '用 strip() 清理两端的空格、replace() 做替换',
      '用 f-string 把变量嵌进一句话里打印',
      '把一个列表用 "、".join(列表) 拼成一句',
    ],
    terms: [
      { term: 'string', zh: '字符串', note: '一段文字数据，写代码时放进引号里。' },
      { term: 'concatenate', zh: '拼接', note: '把两段文字连成一段。' },
      { term: 'f-string', zh: '格式化字符串', note: '把变量直接插入文字中的写法，引号前加 f。' },
      { term: 'join', zh: '连接', note: '用一个分隔符把多个字符串连成一个。' },
      { term: 'indexing', zh: '下标取字符', note: 's[0] 取第一个字符，s[-1] 取最后一个，也能切片。' },
    ],
    examples: [
      {
        title: '拼接与查找',
        code: 'first = "你好"\nsecond = "世界"\nprint(first + "，" + second)\nprint("世" in second)\nprint(len(first + second))',
        output: '你好，世界\nTrue\n6',
        note: '用 + 拼接文字；in 判断一段是否在另一段里；len() 得到字符个数。',
      },
      {
        title: '替换与去除空格',
        code: 's = "  Hello world  "\nprint(s.strip())\nprint(s.replace("world", "Python"))',
        output: 'Hello world\n  Hello Python  ',
        note: 'strip() 去掉两端空格；replace(旧, 新) 替换文字。',
      },
      {
        title: 'f-string 把变量放进文字',
        code: 'name = "xiaoming"\nage = 18\nprint(f"你好，我叫{name}，今年{age}岁。")',
        output: '你好，我叫xiaoming，今年18岁。',
        note: 'f-string 在引号前加 f，变量用 { } 包起来，运行时会自动替换成值。',
      },
      {
        title: 'join 把列表拼成字符串',
        code: 'tags = ["Python", "sudo_data", "begin"]\nprint("、".join(tags))',
        output: 'Python、sudo_data、begin',
        note: '使用 "分隔符".join(列表)，把所有元素用分隔符连成一个字符串。',
      },
    ],
    pitfalls: [
      {
        title: '数字不能直接拼文字',
        bad: 'print("age" + 18)',
        good: 'print("age" + str(18))  # 或 f"age{18}"',
        note: '文字 + 数字会报错；用 str() 转成文字，或干脆用 f-string。',
      },
      {
        title: '内部的引号冲突',
        bad: 's = "say "hi" to you"   # 引号打架',
        good: "s = 'say \"hi\" to you'   # 或外层换引号",
        note: '字符串内部再出现同一种引号要转义，或外层换一种引号。',
      },
      {
        title: '不该用 + 循环拼接',
        bad: 's = ""\nfor x in items:\n    s += x',
        good: 's = "".join(items)',
        note: '循环里用 += 每次都会新建字符串，很慢；用 join 一次拼好。',
      },
      {
        title: '想直接改字符串里的某个字符',
        bad: 's = "hello"\ns[0] = "H"   # 报错 TypeError',
        good: 's = "H" + s[1:]   # 造一个新字符串',
        note: '字符串不可变，不能按下标改；只能拼出一个新字符串替换原变量。',
      },
    ],
    practice: [
      {
        prompt: '用 f-string 打印：姓名 xiaoming，得分 95。',
        starter: 'name = "xiaoming"\nscore = 95\n# TODO: 用 f-string 打印 姓名 xiaoming，得分 95\n',
        answer: 'name = "xiaoming"\nscore = 95\nprint(f"姓名 {name}，得分 {score}")',
        output: '姓名 xiaoming，得分 95',
        hint: 'f-string：引号前加 f，用 {name} {score} 放入变量。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '"hello".replace("l", "L") 的结果是什么？',
        options: ['hello', 'heLLo', 'HeLLo', 'LL'],
        answer: 1,
        explain: 'replace 把所有出现的 "l" 替换成 "L"，得到 heLLo。',
      },
      {
        type: 'judge',
        question: 'f-string 引号前要加 f，变量要用花括号 { } 包起来。',
        answer: true,
        explain: 'f"hi {name}" 运行时会把 {name} 替换成变量的值。',
      },
      {
        type: 'code',
        question: '补全：打印 "今天是2026年11月3日"。',
        code: 'y = 2026\nm = 11\nd = 3\nprint(__________)',
        answer: 'f"{y}年{m}月{d}日"',
        accept: [],
        explain: '用 f-string 把三个变量插进带年月日的文字里。',
      },
    ],
  },
  {
    id: 'strings-format',
    title: '字符串进阶：格式化与编码',
    phase: 2,
    order: 2,
    minutes: 30,
    rating: { level: 3, must: 4 },
    summary: 'f-string 对齐与保留小数、常用判断方法，以及 encode/decode：把字符串用精、用透。',
    keywords: ['格式化', '对齐', '保留小数', 'isdigit', 'encode', 'utf-8'],
    tip: '零基础提示：这一节是字符串的"进阶班"——让数字显示成 1,234.50、让文字对齐成表格，还要弄懂中文在电脑里是怎么存的。',
    what: 'f-string 花括号里还能跟"格式说明"：:.2f 保留两位小数、:, 加千位分隔、:>10 右对齐占 10 格，做表格和报表全靠它们。字符串还自带一批判断方法：isdigit 判断是不是纯数字、startswith 判断开头。最后是编码：文字要变成字节才能存进文件、发上网络，encode 把文字变字节，decode 把字节变回文字，两边必须用同一种编码（推荐 utf-8）。',
    analogy: '格式说明像点菜时的备注"少冰、切块"——东西还是那个东西，按你要求的样式端上来；编码像把中文信写成摩尔斯电码发出去，收到的人必须用同一张电码表才能还原。',
    terms: [
      { term: 'format spec', zh: '格式说明', note: 'f-string 花括号里冒号后的部分，如 :.2f、:>10，控制显示样式。' },
      { term: 'padding', zh: '对齐填充', note: '> 右对齐、< 左对齐、^ 居中，数字表示占几格。' },
      { term: 'encode', zh: '编码', note: '把文字变成字节，存文件、发网络前都要做。' },
      { term: 'decode', zh: '解码', note: '把字节变回文字，必须和编码时用同一种编码。' },
      { term: 'utf-8', zh: '通用编码', note: '目前最通用的编码方案，中文英文都能存。' }
    ],
    steps: [
      '复习 f-string 基本用法：f"文字{变量}文字"',
      '在花括号里加格式说明：f"{pi:.2f}" 保留两位小数，f"{n:,}" 加千位分隔',
      '用 :>10、:<6 练习对齐，拼一张小表格',
      '用 isdigit、startswith、endswith 做几个判断',
      '把一段中文 encode("utf-8") 看看字节长什么样，再 decode 回来',
    ],
    examples: [
      {
        title: '保留小数、千位分隔与对齐',
        code: `pi = 3.14159265
price = 1234567.891
print(f"{pi:.2f}")
print(f"{price:,.2f}")
print(f"|{'ID':>5}|{'名':<4}|")`,
        output: `3.14
1,234,567.89
|   ID|名   |`,
        note: ':.2f 保留两位小数；:, 千位分隔；:>5 右对齐占 5 格、:<4 左对齐占 4 格，竖线能看清填充的空格。',
      },
      {
        title: '常用的判断方法',
        code: `s = "13812345678"
print(s.isdigit(), s.startswith("138"), s.endswith("678"))
print("ABC".lower(), "abc".upper())`,
        output: `True True True
abc ABC`,
        note: 'isdigit 判断纯数字，startswith/endswith 判断开头结尾；lower/upper 转大小写，返回新字符串。',
      },
      {
        title: '编码与解码',
        code: `text = "中文"
b = text.encode("utf-8")
print(b)
print(b.decode("utf-8"))
print(len(text), len(b))`,
        output: `b'\\xe4\\xb8\\xad\\xe6\\x96\\x87'
中文
2 6`,
        note: '"中文"是 2 个字符，编码成 utf-8 后是 6 个字节（每个汉字 3 字节）；decode 必须用同一种编码才能还原。',
      }
    ],
    pitfalls: [
      {
        title: '把 :.2f 用在字符串上',
        bad: 'name = "小明"\nprint(f"{name:.2f}")   # 报错 ValueError',
        good: 'print(f"{name}")   # 或先转成数字再格式化',
        note: ':.2f 是数字专用；字符串要控制宽度直接用 :>10、:<6。'
      },
      {
        title: '编解码用了不同编码',
        bad: 'b = text.encode("utf-8")\nb.decode("gbk")   # 报错或得到乱码',
        good: 'b = text.encode("utf-8")\nb.decode("utf-8")',
        note: '编解码是成对操作，电码表不一致就会 UnicodeDecodeError 或乱码。'
      },
      {
        title: '以为 lower 会改原字符串',
        bad: 's = "ABC"\ns.lower()\nprint(s)   # 还是 ABC',
        good: 's = s.lower()\nprint(s)   # abc',
        note: '字符串不可变，所有方法都返回新字符串，必须接住结果。'
      }
    ],
    practice: [
      {
        prompt: '把 1234.5 格式化成人民币价格：输出 ¥1,234.50。',
        starter: `price = 1234.5
# TODO: 用 f-string 输出 ¥1,234.50
`,
        answer: `price = 1234.5
print(f"¥{price:,.2f}")`,
        output: `¥1,234.50`,
        hint: '¥ 直接写在花括号外；{price:,.2f} 负责千位分隔和两位小数。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'f"{3.14159:.2f}" 的输出是？',
        options: ['3.14159', '3.14', '3.15', '3.1'],
        answer: 1,
        explain: ':.2f 表示保留两位小数，四舍五入得到 3.14。',
      },
      {
        type: 'judge',
        question: '"中文".encode("utf-8") 得到 6 个字节，因为每个汉字占 3 个字节。',
        answer: true,
        explain: 'utf-8 里常用汉字每个占 3 字节，所以 2 个字符变成 6 字节。',
      },
      {
        type: 'code',
        question: '补全：判断手机号 s 是不是以 138 开头。',
        code: 's = "13812345678"\nprint(s.__________("138"))',
        answer: 'startswith',
        accept: [],
        explain: 'startswith(前缀) 判断字符串是否以指定内容开头，返回 True/False。',
      }
    ]
  },
  {
    id: 'list-deep',
    title: '列表深化：切片、排序与拷贝',
    phase: 2,
    order: 4,
    minutes: 30,
    rating: { level: 3, must: 5 },
    summary: '切片步长与反转、sort 与 sorted 的区别、浅拷贝的坑：把列表用出专业味。',
    keywords: ['切片', '步长', '排序', 'sorted', '浅拷贝', '反转'],
    tip: '零基础提示：切片是列表的"剪裁术"——[1:4] 剪一段、[::2] 跳着剪、[::-1] 倒过来剪。排序和拷贝则是两处最容易踩坑的地方，这节一次讲透。',
    what: '切片 [起:止:步长] 能取出列表的任意一段，止点不含、步长控制跳跃，[::-1] 一行反转。排序有两兄弟：sorted(列表) 返回排好的新列表，列表.sort() 在原地改，不返回结果。拷贝有个著名的坑：a[:] 只复制第一层，里面的嵌套列表仍和原列表共用——改嵌套部分两边都会变。',
    analogy: '切片像切蛋糕：起点下刀、终点收刀（那块不算）、步长是"每隔几块拿一块"。浅拷贝像复印了清单的封面，内页还是同一份——改内页，两份"清单"都变。',
    terms: [
      { term: 'step', zh: '步长', note: '切片第三个参数，[::2] 隔一个取一个，[::-1] 反转。' },
      { term: 'in-place', zh: '原地修改', note: 'sort() 直接改原列表且返回 None，sorted() 则返回新列表。' },
      { term: 'key', zh: '排序依据', note: 'sorted(列表, key=len) 按每个元素的某个特征排序。' },
      { term: 'shallow copy', zh: '浅拷贝', note: 'a[:] 只复制第一层，嵌套的部分仍共用。' }
    ],
    steps: [
      '建一个 0~5 的列表，把五种切片写法各跑一遍',
      '试 sorted() 和 .sort()，用 print 观察返回值的区别',
      '给 sorted 加 key=len，看按长度排序的效果',
      '做一个嵌套列表的浅拷贝，改内层观察两边同时变化',
      '需要真正独立的副本时，用 copy.deepcopy',
    ],
    examples: [
      {
        title: '切片五种用法',
        code: `nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])
print(nums[:3])
print(nums[3:])
print(nums[::2])
print(nums[::-1])`,
        output: `[1, 2, 3]
[0, 1, 2]
[3, 4, 5]
[0, 2, 4]
[5, 4, 3, 2, 1, 0]`,
        note: '含头不含尾；省略起点从头开始、省略终点到末尾；步长 2 跳着取，-1 倒着取。',
      },
      {
        title: '排序的两种写法',
        code: `words = ["banana", "apple", "Cherry"]
print(sorted(words))
print(sorted(words, key=len))
words.sort(reverse=True)
print(words)`,
        output: `['Cherry', 'apple', 'banana']
['apple', 'banana', 'Cherry']
['banana', 'apple', 'Cherry']`,
        note: '默认按字符编码排，大写排在小写前；key=len 按长度排；sort(reverse=True) 原地倒序且返回 None。',
      },
      {
        title: '浅拷贝只复制第一层',
        code: `a = [1, [2, 3]]
b = a[:]
b[0] = 99
print(a)
b[1].append(4)
print(a)`,
        output: `[1, [2, 3]]
[1, [2, 3, 4]]`,
        note: '改第一层（换成 99）不影响 a；改嵌套的内层列表，两边一起变——浅拷贝只复制外壳。',
      }
    ],
    pitfalls: [
      {
        title: '切片越界不报错',
        bad: 'nums = [1, 2, 3]\npart = nums[5:10]   # 得到 []，问题被悄悄藏住',
        good: '先判断 len(nums) 是否够，或确认起止范围',
        note: '下标越界会报错，切片越界却只给空列表，bug 更难被发现。'
      },
      {
        title: '把 sort() 的返回值接住',
        bad: 'result = nums.sort()\nprint(result)   # None',
        good: 'nums.sort()\nprint(nums)   # 或 result = sorted(nums)',
        note: 'sort() 原地修改并返回 None；要新列表用 sorted()。'
      },
      {
        title: '以为 a[:] 是完全独立的副本',
        bad: 'b = a[:]\nb[0][0] = 99   # 嵌套列表，a 也变了',
        good: 'import copy\nb = copy.deepcopy(a)',
        note: '浅拷贝只复制第一层；列表里还有列表时，要用 copy.deepcopy 才真正独立。'
      }
    ],
    practice: [
      {
        prompt: '用切片取出 nums = [10, 20, 30, 40, 50, 60] 的最后三个元素，并反转顺序。',
        starter: `nums = [10, 20, 30, 40, 50, 60]
# TODO: 取最后三个并反转
`,
        answer: `nums = [10, 20, 30, 40, 50, 60]
print(nums[-3:][::-1])`,
        output: `[60, 50, 40]`,
        hint: '先 [-3:] 取最后三个，再接 [::-1] 反转，两个切片可以连着写。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'nums = [0,1,2,3,4,5]，nums[::2] 的结果是？',
        options: ['[1, 3, 5]', '[0, 2, 4]', '[2, 4]', '[5, 3, 1]'],
        answer: 1,
        explain: '步长 2 表示每隔一个取一个，从下标 0 开始得到 0、2、4。',
      },
      {
        type: 'judge',
        question: 'nums.sort() 会返回一个排好序的新列表。',
        answer: false,
        explain: 'sort() 原地修改并返回 None；返回新列表的是 sorted(nums)。',
      },
      {
        type: 'code',
        question: '补全：用切片反转列表。',
        code: 'nums = [1, 2, 3]\nprint(nums[__________])',
        answer: '::-1',
        accept: ['-1:'],
        explain: '[::-1] 三个位置全空、步长 -1，表示整段倒着取。'
      }
    ]
  },
  {
    id: 'dict',
    title: '字典：用名字存数据',
    phase: 2,
    order: 5,
    minutes: 30,
    rating: { level: 2, must: 5 },
    summary: '字典用一个"键"来存放对应的"值"，就像真字典里的词条和解释，取数据特别方便。',
    keywords: ['dict', '字典', '键', '值', 'key', 'value', 'get', 'items'],
    tip: '零基础提示：字典是一张"名字到内容"的表。不靠数字下标，而是靠一个名字（键）来取。',
    what: '列表用数字编号取数据，可很多信息更适合"按名字"存：一个人的名字对应年龄、一个单词对应意思。字典（dict）用一对对"键（key）和值（value）"组织数据，你用一个键就能找到它对应的值，非常适合存"一个人的资料"这种结构。',
    analogy: '字典像通讯录：每个联系人的名字（键）对应一串号码（值）。你按名字找人，而不是按第几个找。',
    steps: [
      '用花括号建字典：user = {"name": "小明", "age": 18}',
      '用 字典[键] 取值；拿不准的键改用 字典.get(键, 默认值)',
      '新增或修改都是 字典[键] = 新值',
      '用 in 先判断键在不在，再决定怎么取',
      '用 for k, v in 字典.items() 遍历全部键值对',
    ],
    terms: [
      { term: 'dict', zh: '字典', note: '用键值对存数据，用花括号 {} 定义。' },
      { term: 'key', zh: '键', note: '用来定位数据的名字，相当于目录里的词条。' },
      { term: 'value', zh: '值', note: '键所对应的内容。' },
      { term: 'items()', zh: '条目方法', note: '同时取出所有键和值进行遍历。' },
      { term: 'in', zh: '成员判断', note: '"name" in user 检查键是否存在，比取值试探更直接。' },
    ],
    examples: [
      {
        title: '创建和取值',
        code: 'user = {"name": "xiaoming", "age": 18, "city": "Guangzhou"}\nprint(user["name"])\nprint(user["age"])',
        output: 'xiaoming\n18',
        note: '用 字典[键] 取值；键找不到时会报 KeyError。',
      },
      {
        title: 'get 安全取值',
        code: 'user = {"name": "xiaoming"}\nprint(user.get("phone", "unfilled"))\nprint(user.get("name", "noname"))',
        output: 'unfilled\nxiaoming',
        note: 'get(键, 默认值) 在键不存在时返回默认值，不会报错。',
      },
      {
        title: '修改值并遍历',
        code: 'user = {"name": "xiaoming", "age": 18}\nuser["age"] = 19\nfor k, v in user.items():\n    print(k, "=", v)',
        output: 'name = xiaoming\nage = 19',
        note: '用 键 直接修改已存在的值；items() 依次给出一对键和值。',
      },
    ],
    pitfalls: [
      {
        title: '取不存在的键',
        bad: 'print(user["phone"])  # KeyError',
        good: 'print(user.get("phone", "unfilled"))',
        note: '用 [] 取不存在的键会直接报错；拿不准的字段一律用 get + 默认值。',
      },
      {
        title: '花括号创建的是字典',
        bad: 'empty = {}   # 以为是空集合',
        good: 'empty_set = set()   # 空集合要这样写',
        note: '{} 是空字典，不是空集合；空集合要写成 set()。',
      },
      {
        title: '键必须是不可变类型',
        bad: 'd = {[1, 2]: "x"}   # 报错',
        good: 'd = {(1, 2): "x"}   # 用元组当键',
        note: '字典的键必须是"不可变"的，列表可以变所以不能当键，要换元组。',
      },
      {
        title: '遍历的时候删除键',
        bad: 'for k in d:\n    del d[k]   # 报 RuntimeError',
        good: 'for k in list(d.keys()):\n    del d[k]',
        note: '边遍历边改大小会报错；先用 list() 复制一份键，再安全删除。',
      },
    ],
    practice: [
      {
        prompt: '建一个字典存 xiaoming 的 name 和 age，用 f-string 打印：xiaoming今年18岁。',
        starter: 'user = {"name": "xiaoming", "age": 18}\n# TODO: 打印 xiaoming今年18岁\n',
        answer: 'name = user["name"]\nage = user["age"]\nprint(f"{name}今年{age}岁")',
        output: 'xiaoming今年18岁',
        hint: '先用 user["name"]、user["age"] 取出值放进变量，再用 f-string 打印。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'user.get("phone", "none") 在 user 里没有 phone 时返回什么？',
        options: ['报错', 'None', '"none"', '空字典'],
        answer: 2,
        explain: 'get 的第二个参数是默认值，键不存在时返回它，这里是 "none"。',
      },
      {
        type: 'judge',
        question: '字典里的键必须是不可变的（比如字符串）。',
        answer: true,
        explain: '列表可变不能当键，会用字符串、数字、元组等不可变类型当键。',
      },
      {
        type: 'code',
        question: '补全：往字典 d 里加一个键 "age" 值 18。',
        code: 'd = {"name": "xiaoming"}\n__________',
        answer: 'd["age"] = 18',
        accept: ["d['age'] = 18"],
        explain: '用 字典[新键] = 值 来新增一个键值对。',
      },
    ],
  },
  {
    id: 'tuple',
    title: '元组：装好就不许改的列表',
    phase: 2,
    order: 3,
    minutes: 20,
    rating: { level: 2, must: 4 },
    summary: '元组和列表很像，但它一旦建好就不能修改，适合装"固定的一组值"。',
    keywords: ['tuple', '元组', '不可变', '解包', '小括号'],
    tip: '零基础提示：元组就是"锁死的列表"。装好之后不能再增删改，但它更安全、更不会出错。',
    what: '有些数据天生不该变：一个点的坐标、一年 12 个月、一个人的出生年月。元组（tuple）就是用来装这种"固定不变"的一组值的。它和列表写起来很像，但不能添加、删除、修改元素——这反而能防止你手误改坏不该改的数据。',
    analogy: '元组像一份贴了封条的清单：列好了就不能改，也不允许再加，因为这份清单就该是固定的。',
    steps: [
      '用小括号建元组：point = (3, 5)',
      '像列表一样用下标取值、用 len() 量长度',
      '试着修改它，亲眼看一次 TypeError',
      '用 x, y = point 解包给多个变量',
      '需要修改时用 list() 转成列表，改完再 tuple() 转回来',
    ],
    terms: [
      { term: 'tuple', zh: '元组', note: '不可变的有序序列，用小括号 () 定义。' },
      { term: 'immutable', zh: '不可变', note: '创建之后不能增删改元素，保护数据不被意外改动。' },
      { term: 'unpack', zh: '解包', note: '把元组里的各个值一次取出来赋给多个变量。' },
      { term: 'packing', zh: '打包', note: '把多个值装进一个元组，如 point = 3, 5，括号都能省。' },
      { term: 'hashable', zh: '可哈希', note: '不可变的值才能当字典键、放进集合，元组满足。' },
    ],
    examples: [
      {
        title: '创建和读取元组',
        code: 'point = (3, 5)\nprint(point[0])\nprint(point[1])\nprint(len(point))',
        output: '3\n5\n2',
        note: '元组和列表一样用下标取元素、有长度，但不能修改。',
      },
      {
        title: '给元组解包',
        code: 'x, y = (3, 5)\nprint("x =", x)\nprint("y =", y)',
        output: 'x = 3\ny = 5',
        note: '把元组里的值一次性赋给多个变量，顺序一一对应。',
      },
      {
        title: '列表和元组的转换',
        code: 'lst = [1, 2, 3]\nt = tuple(lst)\nprint(t)\nlst2 = list(t)\nprint(lst2)',
        output: '(1, 2, 3)\n[1, 2, 3]',
        note: 'tuple() 把列表变元组（锁上），list() 把元组变列表（打开）。',
      },
    ],
    pitfalls: [
      {
        title: '尝试修改元组',
        bad: 't = (1, 2)\nt[0] = 99   # 报错 TypeError',
        good: 'lst = list(t)\nlst[0] = 99',
        note: '元组不可变，改了会报错；需要改就先转成列表。',
      },
      {
        title: '单元素元组要加逗号',
        bad: 't = (5)   # 这是数字5，不是元组',
        good: 't = (5,)  # 加个逗号才是单元素元组',
        note: '只有一个元素时，后面要有逗号，否则 (5) 就是个普通数字。',
      },
      {
        title: '把元组当成能变的列表',
        bad: 't = (1, 2)\nt.append(3)   # 元组没有 append',
        good: '用 list = [1, 2]; list.append(3)',
        note: '元组没有 append / remove 这些改元素的方法，因为它是不可变的。',
      },
      {
        title: '元组里放了列表还以为万无一失',
        bad: 't = (1, [2, 3])\nt[1].append(4)   # 居然成功了',
        good: '需要真正不可变，就不要在元组里放列表',
        note: '元组的"不可变"指它装的东西不换；里面的列表自身仍可变，嵌套要当心。'
      },
    ],
    practice: [
      {
        prompt: '建一个元组保存"周一"到"周三"，打印第一个和最后一个。',
        starter: 'days = ("Monday", "Tuesday", "Wednesday")\n# TODO: 打印第一个和最后一个\n',
        answer: 'days = ("Monday", "Tuesday", "Wednesday")\nprint(days[0], days[-1])',
        output: 'Monday Wednesday',
        hint: '第一个是下标 0，最后一个用 -1 负下标。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '元组和列表最主要的区别是什么？',
        options: ['元组更慢', '元组创建后不能修改', '元组只能存数字', '没有区别'],
        answer: 1,
        explain: '元组是不可变的，创建后不能增删改元素；列表可以修改。',
      },
      {
        type: 'judge',
        question: 't = (1, 2); t[0] = 3 能正常执行。',
        answer: false,
        explain: '元组不可变，尝试修改元素会报 TypeError。',
      },
      {
        type: 'code',
        question: '补全：把元组 point 的两个值分别给 x 和 y。',
        code: 'point = (4, 9)\nx, y = __________',
        answer: 'point',
        accept: ['(4, 9)'],
        explain: '解包语法一次性把元组的各值赋给多个变量。',
      },
    ],
  },
  {
    id: 'dict-deep',
    title: '字典深化：遍历与嵌套',
    phase: 2,
    order: 6,
    minutes: 30,
    rating: { level: 3, must: 5 },
    summary: 'keys/values/items 三种遍历、列表套字典的嵌套结构，以及最常用的计数模式。',
    keywords: ['遍历', '嵌套', 'items', '计数', '嵌套字典'],
    tip: '零基础提示：真实项目的数据都是"字典套列表、列表套字典"的。这一节教你读懂它们、遍历它们，还能用字典做统计。',
    what: '字典有三种遍历：keys() 拿所有键、values() 拿所有值、items() 成对拿。真实数据常常是嵌套的：一个列表里装着多个字典（比如一组学生的信息），用 下标 + 键 两层取值。最经典的应用是计数模式：循环里用 get(键, 0) + 1，几行代码就能统计每个元素出现的次数。',
    analogy: '嵌套数据像一沓学生档案卡：每张卡（字典）有名字和分数，整沓卡装在文件夹（列表）里。要找第 2 张卡的分数，先抽卡、再读格子。',
    terms: [
      { term: 'traversal', zh: '遍历', note: '把字典里的键、值或键值对挨个过一遍。' },
      { term: 'nested', zh: '嵌套', note: '字典里装列表、列表里装字典，层层取值。' },
      { term: 'counting pattern', zh: '计数模式', note: 'counts[键] = counts.get(键, 0) + 1，统计出现次数的固定套路。' },
      { term: 'insertion order', zh: '插入顺序', note: '字典记住键放入的先后，遍历时按这个顺序出来。' }
    ],
    steps: [
      '建一个小字典，分别用 keys()、values()、items() 遍历打印',
      '用 in 判断某个键在不在字典里',
      '建一个列表套字典的学生名单，练习两层取值',
      '用计数模式统计一句话里每个字出现的次数',
      '把嵌套数据改成列表推导式取某一项，体会配合使用',
    ],
    examples: [
      {
        title: '三种遍历方式',
        code: `user = {"name": "小明", "age": 18}
print(list(user.keys()))
print(list(user.values()))
for k, v in user.items():
    print(k, "→", v)`,
        output: `['name', 'age']
['小明', 18]
name → 小明
age → 18`,
        note: 'keys 拿键、values 拿值、items 成对拿；字典按插入顺序遍历。',
      },
      {
        title: '列表套字典：真实数据的形状',
        code: `students = [
    {"name": "小明", "score": 92},
    {"name": "小红", "score": 88},
]
for s in students:
    print(s["name"], s["score"])
print(students[0]["name"])`,
        output: `小明 92
小红 88
小明`,
        note: '两层取值：先按下标抽"卡"，再用键读"格子"。第 8 阶段的 JSON 数据长一个样。',
      },
      {
        title: '计数模式：统计每个字出现的次数',
        code: `text = "abracadabra"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`,
        output: `{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}`,
        note: 'get(ch, 0) 表示"没记过就从 0 开始"，循环结束每个字符的次数都数清了。',
      }
    ],
    pitfalls: [
      {
        title: '边遍历边删除键',
        bad: 'for k in user:\n    if k == "age":\n        del user[k]   # 报错',
        good: 'for k in list(user.keys()):\n    if k == "age":\n        del user[k]',
        note: '遍历时改字典大小会报 RuntimeError；先复制一份键列表再删。'
      },
      {
        title: '嵌套取值链路中断',
        bad: 'students[5]["name"]   # 下标越界直接 KeyError/IndexError',
        good: 'students[0].get("name", "未知")',
        note: '嵌套取值任何一层出问题都会炸；不确定的层用 get 给默认值。'
      },
      {
        title: '以为 in 能查值',
        bad: 'print(18 in user)   # False，18 是值不是键',
        good: 'print(18 in user.values())',
        note: 'in 对字典只检查键；查值要用 .values()，查键值对用 .items()。'
      }
    ],
    practice: [
      {
        prompt: '统计 words = ["苹果", "香蕉", "苹果", "橙子", "苹果"] 里每种水果出现的次数，打印统计字典。',
        starter: `words = ["苹果", "香蕉", "苹果", "橙子", "苹果"]
# TODO: 用字典统计每种水果的次数
`,
        answer: `words = ["苹果", "香蕉", "苹果", "橙子", "苹果"]
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)`,
        output: `{'苹果': 3, '香蕉': 1, '橙子': 1}`,
        hint: '计数模式：counts.get(w, 0) + 1，没见过的水果从 0 开始加。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'for k, v in user.items(): 中，k 和 v 分别是？',
        options: ['下标和元素', '键和值', '值和键', '两个列表'],
        answer: 1,
        explain: 'items() 每次交出一对 (键, 值)，解包给 k 和 v。',
      },
      {
        type: 'judge',
        question: 'students 是列表套字典时，students[0]["name"] 表示第一个学生的名字。',
        answer: true,
        explain: '先按下标从列表抽字典，再用键从字典取值，两层依次进行。',
      },
      {
        type: 'code',
        question: '补全计数模式：让没见过的字符从 0 开始计数。',
        code: 'counts[ch] = counts.get(ch, ________) + 1',
        answer: '0',
        accept: [],
        explain: 'get 的第二个参数是默认值：键不存在时返回 0，加 1 后从 1 开始记。',
      }
    ]
  },
  {
    id: 'unpacking',
    title: '一键解包：一次取出很多值',
    phase: 2,
    order: 7,
    minutes: 20,
    rating: { level: 2, must: 4 },
    summary: '用一行代码把一个容器里的值拆给多个变量，还能用 * 收集"剩下的全部"。',
    keywords: ['解包', 'unpack', 'star', '多赋值', '交换变量', '元素'],
    tip: '零基础提示：解包就像把一盒东西按顺序分发出去，一次一个变量接一样，省得去下标。',
    what: '当你有一组值想"拆"给几个变量时，Python 让你不用逐个按下标取，直接一行把容器里的值按顺序赋给一组变量。它还能用星号 * 把"剩下的所有值"打包给一个变量，用来交换变量更是极其方便。',
    analogy: '解包像排队发礼物：你把一串礼物按人数一人发一个，多余的用一个大袋子 * 一次性全收。',
    steps: [
      '列表有几个元素，就用几个变量一行接住：a, b, c = [1, 2, 3]',
      '数量对不上时，用 *rest 收走剩下的全部',
      '用 a, b = b, a 一行交换两个变量',
      '试 print(*[1, 2, 3])，看列表被拆开传给 print 的效果',
      '配合 zip 把两个列表配对：for x, y in zip(a, b)',
    ],
    terms: [
      { term: 'unpack', zh: '解包', note: '把一组值拆开，按顺序赋给多个变量。' },
      { term: 'star', zh: '星号', note: '在变量前放 *，收集剩下的所有值。' },
      { term: 'swap', zh: '交换', note: '把两个变量的值互相调换。' },
      { term: 'star unpacking', zh: '调用解包', note: 'print(*nums) 把列表拆开逐个传参，函数调用里也通用。' },
      { term: 'zip', zh: '拉链合并', note: 'zip(a, b) 把两个列表按位配对，循环里一次拿两个。' },
    ],
    examples: [
      {
        title: '一次取多个值',
        code: 'a, b, c = [1, 2, 3]\nprint(a)\nprint(b)\nprint(c)',
        output: '1\n2\n3',
        note: '把列表的 3 个值按顺序给 a、b、c，数量必须对得上。',
      },
      {
        title: '用 * 收集剩下的',
        code: 'first, *rest = [10, 20, 30, 40]\nprint(first, rest)',
        output: '10 [20, 30, 40]',
        note: '*rest 会收走所有没被前面变量接走的元素。',
      },
      {
        title: '交换两个变量',
        code: 'a = 1\nb = 2\na, b = b, a\nprint(a, b)',
        output: '2 1',
        note: '不用临时变量，a, b = b, a 一行就能交换。',
      },
    ],
    pitfalls: [
      {
        title: '变量数量不匹配',
        bad: 'a, b = [1, 2, 3]   # 报错',
        good: 'a, *b = [1, 2, 3]   # a=1, b=[2,3]',
        note: '右边值比变量多会报错；用 * 收走多余的。',
      },
      {
        title: '忘了 .items()',
        bad: 'for k, v in user:   # 只拿到键',
        good: 'for k, v in user.items():   # 才有键和值',
        note: '直接遍历字典拿的是键；要键和值都拿用 items()。',
      },
      {
        title: '混淆解包和切片',
        bad: 'a, b = [1, 2, 3]',
        good: 'a, b = [1, 2, 3][:2]',
        note: '解包要求两边数量一致；只需要前两个就先用切片取出来。',
      },
      {
        title: '对字典解包以为是拿值',
        bad: 'a, b = user   # 拿到的是两个键',
        good: 'a, b = user.values()   # 要值先取 values',
        note: '对字典解包默认拆的是键；想拿值先 .values()，想成对拿用 .items()。'
      },
    ],
    practice: [
      {
        prompt: '把列表 [7, 8] 的两个值解包给 a 和 b，然后打印 a * b。',
        starter: 'nums = [7, 8]\n# TODO: 解包后打印 a * b\n',
        answer: 'nums = [7, 8]\na, b = nums\nprint(a * b)',
        output: '56',
        hint: 'a, b = nums 一行解包，然后 print(a * b)。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'first, *rest = [10, 20, 30] 之后，rest 的值是什么？',
        options: ['20', '[20, 30]', '[30]', '报错'],
        answer: 1,
        explain: '*rest 收集剩下所有值，得到 [20, 30]。',
      },
      {
        type: 'judge',
        question: 'a, b = b, a 可以交换两个变量的值。',
        answer: true,
        explain: '等号右边先算好值，再按顺序赋给左边，所以能交换。',
      },
      {
        type: 'code',
        question: '补全：把列表 [5, 6] 解包给变量 x 和 y。',
        code: 'nums = [5, 6]\n__________',
        answer: 'x, y = nums',
        accept: [],
        explain: '一行把两个元素分别赋给 x、y。',
      },
    ],
  },
  {
    id: 'list-comprehension',
    title: '列表推导式：一行生成新列表',
    phase: 2,
    order: 8,
    minutes: 30,
    rating: { level: 3, must: 5 },
    summary: '把"遍历 + 变换 + 过滤"压缩成一行，快速生成一个新列表。',
    keywords: ['推导式', 'comprehension', '列表', 'filter', 'map', '生成新列表'],
    tip: '零基础提示：推导式是个提速写法——你会发现它比写一整段 for 循环要短得多。先看清它分三段。',
    what: '常常要做"把一个列表变成另一个列表"的活：比如所有分数加 10 分、只保留大于 0 的数。你可以写完整 for 循环，也可以用"列表推导式"把这件事压缩成一行：它像一个带条件的生成器，告诉你每个元素怎么变、要不要留下。',
    analogy: '推导式像一条筛子加加工流水线：原料从一边进，经过"挑拣（if）"和"加工（表达式）"，另一边出来就是成品新列表。',
    steps: [
      '先写普通 for 循环实现"逐个变换"',
      '把"循环体里的 append"压缩成表达式，套上方括号',
      '需要筛选时在末尾加 if 条件',
      '需要"二选一"时把 if/else 写在 for 前面的表达式里',
      '复杂到读不懂就退回普通循环，清晰优先',
    ],
    terms: [
      { term: 'comprehension', zh: '推导式', note: '用一行表达式，从旧列表生成新列表的简写。' },
      { term: 'filter', zh: '过滤', note: '只保留满足条件的元素。' },
      { term: 'transform', zh: '变换', note: '对每个元素做某种处理生成新值。' },
      { term: 'dict comprehension', zh: '字典推导式', note: '{k: v for ...} 一行生成字典，如 {w: len(w) for w in words}。' },
      { term: 'generator expression', zh: '生成器表达式', note: '把方括号换成圆括号，按需产出省内存，第 7 阶段细讲。' },
    ],
    examples: [
      {
        title: '给每个数翻倍',
        code: 'nums = [1, 2, 3, 4]\ndoubled = [n * 2 for n in nums]\nprint(doubled)',
        output: '[2, 4, 6, 8]',
        note: '语法 = [对每个元素做什么 for n in 列表]。',
      },
      {
        title: '过滤：只留大于 2 的',
        code: 'nums = [1, 2, 3, 4, 5]\nbig = [n for n in nums if n > 2]\nprint(big)',
        output: '[3, 4, 5]',
        note: '在末尾加 if 条件，只有满足条件的才进入新列表。',
      },
      {
        title: '变换加过滤一起用',
        code: 'nums = [1, 2, 3, 4, 5]\nresult = [n * 10 for n in nums if n % 2 == 1]\nprint(result)',
        output: '[10, 30, 50]',
        note: '先过滤（只留奇数），再变换（乘 10），一行搞定。',
      },
    ],
    pitfalls: [
      {
        title: '括号用错',
        bad: 'doubled = n * 2 for n in nums   # 少了 []',
        good: 'doubled = [n * 2 for n in nums]',
        note: '推导式外面必须用方括号包住整个表达式。',
      },
      {
        title: '列表推导误以为会改原列表',
        bad: 'nums = [n * 2 for n in nums]\nprint(nums)  # 已经变了，旧数据没了',
        good: 'doubled = [n * 2 for n in nums]\nprint(nums, doubled)',
        note: '推导式生成的是新的列表；若想保留原数据，就赋给另一个名字。',
      },
      {
        title: '逻辑复杂硬写成推导式',
        bad: '[[x for x in range(y)] for y in range(3)]   # 看不懂',
        good: '先拆成普通 for 循环写清楚',
        note: '嵌套又长又绕的时候别硬挤成一行，清晰优先。',
      },
      {
        title: '过滤 if 和取舍 if/else 放错位置',
        bad: '[n for n in nums if n > 2 else 0]   # 语法错误',
        good: '[n if n > 2 else 0 for n in nums]',
        note: '纯筛选的 if 放在 for 后面；"有保留有替换"的 if/else 表达式要放在 for 前面。'
      },
    ],
    practice: [
      {
        prompt: '用列表推导式生成 0 到 9 中偶数的平方，例如 [0, 4, 16, 36, 64]。',
        starter: '# TODO: 用推导式生成列表并打印\n',
        answer: 'even_squares = [n * n for n in range(10) if n % 2 == 0]\nprint(even_squares)',
        output: '[0, 4, 16, 36, 64]',
        hint: '先 range(10) 取 0~9，加 if n % 2 == 0 过滤偶数，再平方。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '[n for n in range(5) if n > 1] 的结果是什么？',
        options: ['[0,1,2,3,4]', '[2,3,4]', '[3,4]', '[n]'],
        answer: 1,
        explain: '取 0~4 里大于 1 的 n，得到 2、3、4。',
      },
      {
        type: 'judge',
        question: '列表推导式会生成一个新的列表。',
        answer: true,
        explain: '推导式的作用就是从旧列表（或别的可迭代对象）生成一个新的列表。',
      },
      {
        type: 'code',
        question: '补全：把 nums 里的每个数平方放进新列表。',
        code: 'nums = [1, 2, 3, 4]\nsquares = [__________ for n in nums]',
        answer: 'n * n',
        accept: ['n**2', 'pow(n, 2)'],
        explain: '把每个 n 变换为 n*n 后放进新列表。',
      },
    ]
  },
  {
    id: 'sets',
    title: '集合：去重与关系运算',
    phase: 2,
    order: 9,
    minutes: 25,
    rating: { level: 3, must: 4 },
    summary: '自动去重、超快的成员判断，还有并集交集差集：处理"一堆不重复的东西"。',
    keywords: ['set', '集合', '去重', '交集', '并集', '差集'],
    tip: '零基础提示：集合像一袋"不重复的弹珠"——扔进去两个一样的，袋子里只留一个。它最大的本事是去重和"我有的你没有"这类关系运算。',
    what: '集合（set）是无序、不重复的容器。把列表转成 set 一行去重；in 判断在集合里极快。两个集合之间还能做数学：| 并集（合在一起）、& 交集（共有的）、- 差集（我有他没有）。注意空集合要写 set()，因为 {} 表示空字典。',
    analogy: '集合像班级里的"兴趣小组名单"：一个人要么在要么不在（不重复），两张名单一比对，立刻知道"都报名的"（交集）和"只有甲组报的"（差集）。',
    terms: [
      { term: 'set', zh: '集合', note: '无序、不重复的容器，用 set() 或 {a, b} 创建。' },
      { term: 'deduplicate', zh: '去重', note: 'set(列表) 一行去掉重复元素。' },
      { term: 'union', zh: '并集', note: 'a | b：两个集合合在一起的所有元素。' },
      { term: 'intersection', zh: '交集', note: 'a & b：两个集合共有的元素。' },
      { term: 'difference', zh: '差集', note: 'a - b：在 a 里但不在 b 里的元素。' }
    ],
    steps: [
      '把一个有重复的列表用 set() 去重，观察结果',
      '用 add 和 discard 增删元素',
      '用 in 感受集合的成员判断（比列表快得多）',
      '做两个集合，试 | 并集、& 交集、- 差集',
      '记住：空集合写 set()，{} 是空字典',
    ],
    examples: [
      {
        title: '一行去重',
        code: `nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)
print(unique)
print(len(unique))`,
        output: `{1, 2, 3}
3`,
        note: 'set(列表) 自动去掉重复；小数字集合按大小显示。需要变回列表用 list(unique)。',
      },
      {
        title: '增删与成员判断',
        code: `tags = {"python", "web", "ai"}
tags.add("git")
tags.discard("web")
print(sorted(tags))
print("python" in tags)`,
        output: `['ai', 'git', 'python']
True`,
        note: '集合无序，打印顺序不可靠，用 sorted 排好再打印；discard 删不存在的元素也不报错。',
      },
      {
        title: '并集、交集、差集',
        code: `a = {1, 2, 3, 4}
b = {3, 4, 5}
print(a | b)
print(a & b)
print(a - b)`,
        output: `{1, 2, 3, 4, 5}
{3, 4}
{1, 2}`,
        note: '| 全都要、& 只要共有的、- 去掉共有的；这三个符号是集合专属的数学运算。',
      }
    ],
    pitfalls: [
      {
        title: '空集合写成大括号',
        bad: 's = {}   # 这是空字典！',
        good: 's = set()',
        note: '大括号历史上属于字典；空集合必须用 set() 创建。'
      },
      {
        title: '给集合按下标取值',
        bad: 's = {1, 2, 3}\ns[0]   # 报错 TypeError',
        good: 'for x in s:\n    print(x)   # 或 sorted(s)[0]',
        note: '集合无序，没有下标；要按下标取先转列表或用 sorted 排序。'
      },
      {
        title: '用 remove 删不存在的元素',
        bad: 's.remove("git")   # 不存在时报 KeyError',
        good: 's.discard("git")   # 不存在也不吭声',
        note: '确定存在用 remove（能帮你发现 bug）；不确定就用 discard。'
      }
    ],
    practice: [
      {
        prompt: 'a = {"小明", "小红", "小刚"}，b = {"小红", "小亮"}。求两个名单都报名的（交集）和只有 a 报名的（差集），用 sorted 打印。',
        starter: `a = {"小明", "小红", "小刚"}
b = {"小红", "小亮"}
# TODO: 求交集和差集
`,
        answer: `a = {"小明", "小红", "小刚"}
b = {"小红", "小亮"}
print(sorted(a & b))
print(sorted(a - b))`,
        output: `['小红']
['小明', '小刚']`,
        hint: '& 求共有的，- 求我这里有的；集合打印顺序不可靠，套 sorted 再输出。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'set([1, 2, 2, 3, 3, 3]) 的长度是？',
        options: ['6', '3', '1', '0'],
        answer: 1,
        explain: '集合自动去重，只剩 1、2、3 三个元素。',
      },
      {
        type: 'judge',
        question: 'a & b 表示两个集合的并集。',
        answer: false,
        explain: '& 是交集（共有的部分）；并集是 |（a | b）。',
      },
      {
        type: 'code',
        question: '补全：创建一个空集合。',
        code: 'nums = __________',
        answer: 'set()',
        accept: [],
        explain: '大括号 {} 是空字典，空集合必须用 set()。',
      }
    ]
  }
]