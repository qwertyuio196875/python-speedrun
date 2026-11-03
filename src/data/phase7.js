/**
 * 第七阶段：进阶选修（约 105 分钟）
 * 主线之外按需选学的高级特性，面向从未写过代码的人。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'lambda-sorted',
    title: 'lambda 与 sorted：灵活排序',
    phase: 7,
    order: 1,
    minutes: 25,
    rating: { level: 3, must: 3 },
    summary: 'lambda 匿名函数配合 sorted 的 key 参数，能用一行代码自定义几乎任何排序规则。',
    keywords: ['lambda', 'sorted', 'key', '匿名函数', '排序', 'reverse'],
    tip: '零基础提示：lambda 就是一个没有名字的小函数，只在"用一次"的场合用；排序难就难在想清楚"按什么排"，key 就是回答这个问题的地方。',
    what: 'lambda 的写法是 lambda 参数: 返回的结果，它不需要 def 和函数名，常用于要立刻传给别人的场景。sorted(集合, key=函数) 会先调 key 算出每个元素的"排序依据"再据此排序，key 常常就用 lambda 来写。默认按依据从小到大排（升序），想反过来就加 reverse=True。真正做事的是内置排序算法 Timsort（稳定排序）：当两条数据的排序依据算出来一样时，它不会乱换位置，而是保持它们在原数据里的先后。记住 sorted 返回一个新的排好序的列表、原集合不变，而列表自己的 .sort() 才会直接改动原列表。',
    analogy: '打个比方：一群人要按身高排队，长什么样不重要，关键是"按身高排"还是"按年龄排"。人群就是原始数据，key 就是你说的那条"按身高排"的规则，lambda 就是顺手把这条规则写下来的小纸条。身高一样的人不会随便插队，谁原来站前面就还站前面——这就是"稳定"。',
    terms: [
      { term: 'lambda', zh: '匿名函数', note: '没有名字的一行小函数，写法是 lambda 参数: 返回结果' },
      { term: 'key', zh: '排序依据', note: '传给 sorted 的一个函数，用它算出的值来决定谁先谁后' },
      { term: 'sorted', zh: '排序函数', note: '返回新排序列表，不改动原集合' },
      { term: 'reverse', zh: '反向', note: '设成 True 就从大到小排' },
      { term: 'stable', zh: '稳定排序', note: '排序依据相同时，保持原来的先后顺序不变' }
    ],
    steps: [
      '先想清楚"按什么排"，比如按字符串长度、按元组的第几个元素。',
      '把这条规则写成一个函数：能直接用的就写 key=len，要自己定就写 lambda。',
      '决定顺序：默认升序，要降序就加 reverse=True。'
    ],
    examples: [
      {
        title: '按字符串长度排序',
        code: `words = ["pear", "grape", "kiwi", "apple"]
print(sorted(words, key=len))`,
        output: "['pear', 'kiwi', 'grape', 'apple']",
        note: 'len 计算每个单词的长度，一样长（pear 和 kiwi 都是 4）时保持原来的先后顺序。'
      },
      {
        title: '用 lambda 按元组的第二项排序',
        code: `people = [("林晚", 20), ("阿明", 18), ("小林", 30)]
people.sort(key=lambda p: p[1])
print(people)`,
        output: "[('阿明', 18), ('林晚', 20), ('小林', 30)]",
        note: 'p[1] 取出每个人元组的第二个值（年龄），这样排出来就是从年轻到年长。'
      },
      {
        title: '二级排序：先按分数，同分再按名字',
        code: `students = [("林晚", 88), ("阿明", 95), ("小林", 88)]
print(sorted(students, key=lambda s: (-s[1], s[0])))
print(sorted(students, key=lambda s: s[1]))`,
        output: `[('阿明', 95), ('小林', 88), ('林晚', 88)]
[('林晚', 88), ('小林', 88), ('阿明', 95)]`,
        note: 'key 返回一个元组，就按元组各项依次比较：先用 -s[1] 让分数从高到低，同分时再用 s[0] 按名字排。下面那行只按分数排，同为 88 的两人保持了原来的先后（林晚在小林前面），这就是稳定排序。'
      },
      {
        title: 'reverse 让分数从高到低',
        code: `students = [("林晚", 92), ("阿明", 88), ("小林", 95)]
print(sorted(students, key=lambda s: s[1], reverse=True))`,
        output: "[('小林', 95), ('林晚', 92), ('阿明', 88)]",
        note: 'reverse=True 让排序结果反过来，这里是考得高的在前。'
      }
    ],
    pitfalls: [
      {
        title: '忘了给元组指定 key，默认按第一项排',
        bad: `sorted([("b", 2), ("a", 1)])`,
        good: `sorted([("b", 2), ("a", 1)], key=lambda x: x[1])`,
        note: '元组直接排默认比较第一个元素，要按别的字段排必须写明 key。'
      },
      {
        title: 'lambda 里写多行复杂逻辑',
        bad: `lambda x: \\n    if x > 0:\\n        return 1`,
        good: `def rule(x):\\n    if x > 0:\\n        return 1\\n    return 0`,
        note: 'lambda 只能写一行表达式，逻辑一多就退回用普通 def 定义函数。'
      },
      {
        title: '混淆 sorted 和 list.sort',
        bad: `data = sorted(data)  # 以为 data 被改了？不，返回的是新列表`,
        good: `new_data = sorted(data)\ndata.sort()  # sort 才是在原地改`,
        note: 'sorted 改不了原变量，结果要接住；要在原列表上改就用 .sort()。'
      },
      {
        title: 'reverse=True 会连同同分顺序一起反过来',
        bad: `sorted(students, key=lambda s: s[1], reverse=True)`,
        good: `sorted(students, key=lambda s: (-s[1], s[0]))`,
        note: 'reverse=True 反转整个比较结果，同分的原有先后也会颠倒；只想让分数降序、同分保持原序，用取负数的元组写法。'
      }
    ],
    practice: [
      {
        prompt: '把字符串列表按长度从短到长排序并打印：["apple", "kiwi", "banana", "plum"]。',
        starter: `words = ["apple", "kiwi", "banana", "plum"]
# TODO: 用 sorted 和 key=len 排序
`,
        answer: `words = ["apple", "kiwi", "banana", "plum"]
print(sorted(words, key=len))`,
        output: "['kiwi', 'plum', 'apple', 'banana']",
        hint: 'kiwi 和 plum 都长 4，排在前，且保持原来的先后。'
      },
      {
        prompt: '把成绩列表按分数从高到低排，分数相同按姓名升序排：[("林晚", 88), ("阿明", 95), ("小林", 88)]。',
        starter: `students = [("林晚", 88), ("阿明", 95), ("小林", 88)]
# TODO: 用 sorted 和一个返回元组的 key 排序
`,
        answer: `students = [("林晚", 88), ("阿明", 95), ("小林", 88)]
print(sorted(students, key=lambda s: (-s[1], s[0])))`,
        output: "[('阿明', 95), ('小林', 88), ('林晚', 88)]",
        hint: 'key 里写 (-s[1], s[0])：分数取负变成高到低，分数相同再按姓名（s[0]）升序。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'key=lambda s: (-s[1], s[0]) 表示什么排序？',
        options: ['先按名字升序，再按分数降序', '先按分数降序，同分再按名字升序', '先按分数升序，同分再按姓名降序', '先随机打乱，再按分数排序'],
        answer: 1,
        explain: '元组从左到右依次比较：-s[1] 让分数高的在前，s[0] 让同分时按名字升序。'
      },
      {
        type: 'choice',
        question: 'sorted(数据, key=函数) 里的 key 参数负责什么？',
        options: ['决定是否原地改动原数据', '决定"按什么值"来排序的函数', '决定返回几个元素', '决定是否去掉重复'],
        answer: 1,
        explain: 'key 先算出每个元素的排序依据，Python 再按这个依据排。'
      },
      {
        type: 'code',
        question: '补全代码：用 lambda 按元组第二个元素（分数）排序。',
        code: `students = [("林晚", 88), ("阿明", 95)]
print(sorted(students, key=______))`,
        answer: 'lambda s: s[1]',
        accept: ['lambda s: s[1]'],
        explain: 'lambda s: s[1] 取出每个元组的第二个值作为排序依据。'
      },
      {
        type: 'judge',
        question: '调用 sorted(列表) 会直接修改原来的列表。',
        answer: false,
        explain: 'sorted 返回新的排序列表，原列表不被改动；要原地改得用 .sort()。'
      }
    ]
  },
  {
    id: 'generator-yield',
    title: '生成器与 yield：按需产出',
    phase: 7,
    order: 2,
    minutes: 26,
    rating: { level: 4, must: 3 },
    summary: '用 yield 写生成器，数据"边算边给"而不是一次把一整批全塞进内存。',
    keywords: ['yield', '生成器', 'generator', '惰性', '内存', '迭代'],
    tip: '零基础提示：把"一口气造一整个列表"换成"要一个给一个"这种思路，就是生成器的核心，累数据多的时候它特别省内存。',
    what: '普通函数用 return 一次性返回结果，带着 yield 的函数叫生成器函数：它执行到 yield 会交出一个值并暂停住，下次继续从暂停处往下走。所以它是"你问一次、它给一个"，边算边给，而不是像一个大列表那样一次全部造好放在内存里。可以 for x in 生成器 这样遍历，也可以用 list(生成器) 一次性收齐，或用 sum、max 这些直接消化。用括号写 (i for i in range(10)) 则得到一个生成器对象，跟 [i for i in range(10)] 的大列表形成对比。',
    analogy: '打个比方：一箱水果不能一次搬进冰箱，就用保鲜盒一小份一小份地装进去——装一份拎进一份。列表就是先把整箱都摆在地上（全占内存），生成器就是"要几份装几份"，手上有多少算多少，不囤货。',
    terms: [
      { term: 'yield', zh: '让出/吐出', note: '函数里出现它此函数就变成生成器，每执行到它会交出一个值并暂停' },
      { term: 'generator', zh: '生成器', note: '按需产生值的一类对象，可以 for 遍历' },
      { term: '惰性求值', zh: '用到才计算', note: '不一次性全算完，真正被要的时候才算出下一个值' },
      { term: '迭代', zh: '逐个取出', note: '用 for 循环从头到尾把每个元素取一遍' }
    ],
    steps: [
      '把一个普通函数的 return 换成 yield，逐个交出值。',
      '用 for x in 生成器 或 list(生成器) 来消费它。',
      '数据量很大时优先用生成器，避免一次占满内存。'
    ],
    examples: [
      {
        title: 'yield 逐个交出数字',
        code: `def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1

for x in count_up(3):
    print(x)`,
        output: `0
1
2`,
        note: '每次 for 循环要一个，count_up 就 yield 一个，交完 2 后 i 到 3 不再满足条件就自然结束。'
      },
      {
        title: '列表推导式 vs 生成器表达式',
        code: `nums = [i for i in range(3)]      # 一口气全造出来装进列表
gen = (i for i in range(3))       # 生成器，要一个给一个
print(nums)
print(list(gen))`,
        output: `[0, 1, 2]
[0, 1, 2]`,
        note: '两者结果一样，但生成器不一次性占用全部内存，处理成万上亿个数时差别明显。'
      },
      {
        title: '生成器和 sum 一起用',
        code: `def squared(n):
    for i in range(n):
        yield i * i

print(sum(squared(4)))`,
        output: '14',
        note: 'sum 一边从生成器拿一边累加，0+1+4+9=14，全程只存着一个数。'
      }
    ],
    pitfalls: [
      {
        title: '生成器只能从头遍历一次',
        bad: `g = (i for i in range(3))
list(g)
list(g)  # 这次是空列表`,
        good: `g = (i for i in range(3))
print(sum(g))   # 一次性用掉`,
        note: '生成器是被"消费"掉的，遍历完就空，想要多份就用列表存一份或重新建一个。'
      },
      {
        title: '把 return 混进生成器函数当普通函数',
        bad: `def f():
    yield 1
    return 5  # 这个 5 不会成为结果`,
        good: `def f():
    yield 1
    yield 2`,
        note: 'return 只负责让生成器结束，返回的值不当作输出，想要就继续用 yield。'
      },
      {
        title: '为只取前几个而去遍历超长生成器',
        bad: `for x in huge_generator:  # 数据太多时没必要全跑`,
        good: `from itertools import islice

for x in islice(huge_generator, 3):
    print(x)`,
        note: '只要前几个就用 islice 截取，避免把整个生成器跑完。'
      }
    ],
    practice: [
      {
        prompt: '写一个生成器，依次产出前 3 个偶数 0、2、4，然后打印成列表。',
        starter: `def even_up_to(n):
    # TODO: 用 yield 产出 n 个偶数
    pass

print(list(even_up_to(3)))`,
        answer: `def even_up_to(n):
    for i in range(n):
        yield i * 2

print(list(even_up_to(3)))`,
        output: '[0, 2, 4]',
        hint: 'i * 2 当 i 是 0、1、2 时正好得到 0、2、4。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '相比一次性建一个装满的大列表，生成器最主要的优势是？',
        options: ['每行代码更短', '更省内存，按需取值边算边给', '速度一定更快', '支持用下标直接取某一位'],
        answer: 1,
        explain: '生成器不一次性把所有值都造出来放内存里，数据量大时才不爆内存。'
      },
      {
        type: 'code',
        question: '补全代码，让生成器依次产出 1 和 2。',
        code: `def count_up():
    yield 1
    yield 2

print(list(__________()))`,
        answer: 'count_up',
        accept: ['count_up'],
        explain: '函数名是 count_up，加括号再调用它才拿到生成器。'
      },
      {
        type: 'judge',
        question: '同一个生成器对象可以多次从头遍历，每次都能拿到全部元素。',
        answer: false,
        explain: '生成器是一次性消费的，遍历一遍之后就空了，需要重新调用函数得到新的生成器。'
      }
    ]
  },
  {
    id: 'decorators',
    title: '装饰器：给函数"加外衣"',
    phase: 7,
    order: 3,
    minutes: 28,
    rating: { level: 4, must: 3 },
    summary: '装饰器是在函数外面再套一层函数，用 @ 语法给原函数统一加日志、计时等外衣。',
    keywords: ['装饰器', '@', 'decorator', 'wrapper', '日志', '外层函数'],
    tip: '零基础提示：装饰器不改变原函数的"内脏"，只是给它套上一件外衣，进出都先经过外衣；第一次看 @ 看不太懂是正常的，动手抄一遍就通。',
    what: '装饰器本身是个函数，它接收另一个函数，再返回一个"包了一层新逻辑的函数"（常叫 wrapper）。用 @装饰器名 写在某个函数定义的上方，就表示"把这个函数包上这件外衣"。wrapper 里用 *args, **kwargs 原样接住和转发参数，就能做到只在进出时做点额外的事（比如打印日志、统计次数、测时间），函数本体一行都不用改。这样批量给很多函数加同样的能力，比在每个函数里重复写日志代码清爽得多。',
    analogy: '打个比方：给手机套个手机壳，手机本身的屏幕、摄像头一样没变，只是在外面多包了一层。装饰器就是那个手机壳——你的原函数是手机，@ 语法把壳套上去，进出都先经过这层壳（比如开机壳时记一笔日志）。',
    terms: [
      { term: 'decorator', zh: '装饰器', note: '接收一个函数、返回新函数的函数，用 @ 语法套在原函数外' },
      { term: '@', zh: 'at 语法糖', note: '写在一个函数上方，表示把这个函数交给装饰器包一层' },
      { term: 'wrapper', zh: '包装函数', note: '装饰器里返回的那个"多了一层逻辑"的函数' },
      { term: 'nonlocal', zh: '外层变量声明', note: '让内层函数能读写外围函数里的变量' }
    ],
    examples: [
      {
        title: '给函数加一条调用日志',
        code: `def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def say(name):
    return f"你好,{name}"

print(say("林晚"))`,
        output: `调用 say
你好,林晚`,
        note: '打印完再原样返回原函数的结果，所以 say 的输出没被改动。'
      },
      {
        title: '统计函数被调用了多少次',
        code: `def count_calls(func):
    n = 0
    def wrapper(*args, **kwargs):
        nonlocal n
        n += 1
        print(f"第 {n} 次调用")
        return func(*args, **kwargs)
    return wrapper

@count_calls
def hi():
    return "hi"

print(hi())
print(hi())`,
        output: `第 1 次调用
hi
第 2 次调用
hi`,
        note: 'nonlocal n 让 wrapper 能累加外层变量 n，两次调用计数分别变成 1 和 2。'
      },
      {
        title: '计时外衣：记录一次任务',
        code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        print("计时开始")
        result = func(*args, **kwargs)
        print("计时结束")
        return result
    return wrapper

@timer
def double(x):
    return x * 2

print(double(21))`,
        output: `计时开始
计时结束
42`,
        note: '真正的测时间由 start=time.perf_counter() 和结束相减实现，这里先体会"进出都经过外衣"的结构。'
      }
    ],
    pitfalls: [
      {
        title: '装饰器忘了把结果 return 回去',
        bad: `def log(func):
    def wrapper(*args, **kwargs):
        print("记录")
        # 漏了 return func(...)
    return wrapper

@log
def add(a, b):
    return a + b

print(add(2, 3))`,
        good: `def log(func):
    def wrapper(*args, **kwargs):
        print("记录")
        return func(*args, **kwargs)
    return wrapper`,
        note: 'wrapper 必须把 func 的结果原样 return 出来，否则外面拿到的永远是 None。'
      },
      {
        title: '@ 忘记加括号/写错名字',
        bad: `@  # 缺装饰器名
def f():
    return 1`,
        good: `def log(func):
    ...
@log
def f():
    return 1`,
        note: '@ 后面必须跟一个已经定义好的装饰器函数名，且装饰器要在被装饰函数之前定义。'
      },
      {
        title: '本来干净的函数被装饰后名字变了',
        bad: `@log
def add(a, b):
    ...

print(add.__name__)  # 变成 'wrapper' 而不是 'add'`,
        good: `import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper`,
        note: '用 functools.wraps(func) 能把原函数的名字等信息保留下来，调试更方便。'
      }
    ],
    practice: [
      {
        prompt: '写一个装饰器 timer，在被装饰函数前后各打印一行，并让 double 函数正常返回结果。',
        starter: `def timer(func):
    def wrapper(*args, **kwargs):
        # TODO: 打印开始、返回结果、打印结束
        pass
    return wrapper

@timer
def double(x):
    return x * 2

print(double(21))`,
        answer: `def timer(func):
    def wrapper(*args, **kwargs):
        print("计时开始")
        result = func(*args, **kwargs)
        print("计时结束")
        return result
    return wrapper

@timer
def double(x):
    return x * 2

print(double(21))`,
        output: `计时开始
计时结束
42`,
        hint: '记住把 result 用 return 传回去，否则 double(21) 打印出来是 None。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '在函数定义上方写的 @装饰器名 起到什么作用？',
        options: ['立即调用并执行这个函数', '把这个函数包进装饰器，套上外衣', '传参数给这个函数', '删除这个函数的定义'],
        answer: 1,
        explain: '@ 定义时就把函数交给装饰器包装，之后调用走的都是包了外衣的版本。'
      },
      {
        type: 'code',
        question: '补全代码，让 hi 函数被 log 装饰器包起来。',
        code: `def log(func):
    def wrapper(*args, **kwargs):
        print("开始")
        return func(*args, **kwargs)
    return wrapper

@______
def hi():
    return "hi"

print(hi())`,
        answer: 'log',
        accept: ['log'],
        explain: '@ 后面跟装饰器函数名 log，表示给 hi 套上这件外衣。'
      },
      {
        type: 'judge',
        question: '装饰器必须把原函数的返回值原样 return 出去，否则调用结果会是 None。',
        answer: true,
        explain: 'wrapper 只在原函数结果上"经手"一遍，忘记 return 结果外层就接不到真值了。'
      }
    ]
  },
  {
    id: 'itertools',
    title: 'itertools：好用的迭代工具箱',
    phase: 7,
    order: 4,
    minutes: 26,
    rating: { level: 3, must: 2 },
    summary: '用标准库 itertools 里的 chain、islice、cycle、combinations 等工具组合出各种迭代花样。',
    keywords: ['itertools', 'chain', 'islice', 'cycle', 'combinations', '迭代工具'],
    tip: '零基础提示：itertools 是 Python 自带的"迭代拼装工具箱"，需求正好命中某个工具时，几行就能省掉一长串 for 循环，先认识几个常用的即可。',
    what: 'itertools 是标准库里专门摆弄"可迭代对象"的工具箱。chain 把好几个可迭代对象拼成一条长流；cycle 让它无限循环往复地给出元素；islice 像切片那样从迭代流里取一段（用它的次数跑在超长流上更省内存）；combinations 依次给出所有"选 r 个"的组合。这些函数的返回多是迭代器本身并不一次算完，配合 list() 或 for 才真正取出来。',
    analogy: '打个比方：itertools 就像抽屉里整齐码好的小零件——链条（chain）把几段接一起、切片刀（islice）截一段、旋转托盘（cycle）转圈出料、组合卡片（combinations）列所有选法。需要哪种就抽哪种，不用自己拿胶带拼。',
    terms: [
      { term: 'itertools', zh: '迭代工具库', note: 'Python 标准库，提供组合与处理可迭代对象的小函数' },
      { term: 'chain', zh: '拼接', note: '把多个可迭代对象接成一条连续的长流' },
      { term: 'islice', zh: '迭代切片', note: '按住止序号从迭代流里截取一段' },
      { term: 'cycle', zh: '无限循环', note: '不断循环往复地给出元素，取数要配合 islice 截断' },
      { term: 'combinations', zh: '组合', note: '列举出所有"选 r 个"且不分先后顺序的选法' }
    ],
    examples: [
      {
        title: 'chain 拼接多段数据',
        code: `from itertools import chain

a = [1, 2]
b = [3, 4]
print(list(chain(a, b)))`,
        output: '[1, 2, 3, 4]',
        note: 'chain 把两个列表接成一条流，不需要手写两个 for 再拼结果。'
      },
      {
        title: 'islice 从超长流里取一段',
        code: `from itertools import islice

print(list(islice(range(100), 10, 15)))`,
        output: '[10, 11, 12, 13, 14]',
        note: 'range(100) 有 100 个数，islice 只要下标 10 到 14 这一段，不会把整段都装进内存。'
      },
      {
        title: 'combinations 列出所有两两组合',
        code: `from itertools import combinations

print(list(combinations(range(4), 2)))`,
        output: '[(0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3)]',
        note: '从 0、1、2、3 里不重复地选 2 个，组合不分先后，(0,1) 和 (1,0) 只会出现一次。'
      },
      {
        title: 'cycle 无限循环配 islice 截取',
        code: `from itertools import cycle, islice

alarm = cycle(["红", "绿"])
print(list(islice(alarm, 5)))`,
        output: "['红', '绿', '红', '绿', '红']",
        note: 'cycle 会永远循环下去，所以一定要用 islice 限定只取 5 个，否则程序停不下来。'
      }
    ],
    pitfalls: [
      {
        title: 'cycle 不给出口导致无线循环',
        bad: `for x in cycle(["红", "绿"]):\n    print(x)  # 永远打印下去`,
        good: `for x in islice(cycle(["红", "绿"]), 5):\n    print(x)`,
        note: 'cycle 是无限的，直接遍历会一直跑，必须用 islice 或 break 设上限。'
      },
      {
        title: '把迭代器当列表反复访问',
        bad: `it = chain([1], [2])\nprint(list(it))  # 第一次有值\nprint(list(it))  # 第二次空`,
        good: `it = chain([1], [2])\nprint(list(it))`,
        note: '迭代器用一次就"耗尽"，需要复用时就先转成 list 存起来，或重新构造。'
      },
      {
        title: 'combinations 参数顺序写反',
        bad: `combinations(2, range(4))  # 第一个应是可迭代对象`,
        good: `combinations(range(4), 2)`,
        note: '先写从哪个集合里选，再写一次选几个 r。'
      }
    ],
    practice: [
      {
        prompt: '用 itertools.chain 拼接 [1, 2] 和 ["a"]，再打印成列表。',
        starter: `from itertools import chain

# TODO: 拼接并打印
`,
        answer: `from itertools import chain

print(list(chain([1, 2], ["a"])))`,
        output: "[1, 2, 'a']",
        hint: 'list(...) 把拼接出来的迭代流转成列表就能打印。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'itertools.cycle(["红", "绿"]) 会怎样？',
        options: ['只给出前两个元素就结束', '无限循环往复地给出红、绿、红、绿…', '把所有元素随机打乱', '把红绿合并成一个字符串'],
        answer: 1,
        explain: 'cycle 会无限循环地重复给出的元素，必须用 islice 或 break 提前终止。'
      },
      {
        type: 'code',
        question: '补全代码：让 cycle 只循环给出前 4 个元素。',
        code: `from itertools import cycle, islice

alarm = cycle(["红", "绿"])
print(list(islice(alarm, ______)))`,
        answer: '4',
        accept: ['4', '4)'],
        explain: 'islice(迭代器, 4) 只取前 4 个，结果是红、绿、红、绿。'
      },
      {
        type: 'judge',
        question: 'itertools 是 Python 内置标准库，导入（import itertools）后即可直接使用。',
        answer: true,
        explain: 'itertools 随 Python 自带，无需安装额外第三方包。'
      }
    ]
  },
  {
    id: 'stream-pipeline',
    title: '实战：流式处理日志并用装饰器计时',
    phase: 7,
    order: 5,
    minutes: 32,
    rating: { level: 4, must: 4 },
    summary: '把筛选、转换、统计三步串成一条生成器流水线，再给耗时的步骤套上计时装饰器：从“会语法”走到“能实现”。',
    keywords: ['生成器流水线', 'yield from', '装饰器', '计时', '流式处理', 'pipeline', 'itertools'],
    tip: '零基础提示：别一上来就想把所有代码写进一个 for。把每一步拆成一个只做一件事的函数，再用生成器把它们串起来，程序会小很多，也好出错定位。',
    what: '真实程序里，数据常常一批批来：一行日志、一段文本、一条记录。如果先读进列表再每一步都建一个新列表，内存会浪费。流水线的写法是：每一步都是生成器，上一步产出、下一步消费，数据始终只有一份在流。再用计时装饰器包住耗时步骤，就能知道瓶颈在哪。',
    analogy: '把它想成一条食品流水线：选菜 → 洗菜 → 切菜。菜在流水线上传递，不必每步都搬到仓库存一大筐。计时员贴在某一站，就能记录这站累计花了多久。',
    terms: [
      { term: 'pipeline', zh: '流水线', note: '把一段输入按固定步骤逐步转换为结果的一串函数' },
      { term: 'generator pipeline', zh: '生成器流水线', note: '每个环节都是生成器，数据边流过边处理，不物化完整中间结果' },
      { term: 'timing decorator', zh: '计时装饰器', note: '在函数执行前后记录耗时的装饰器' },
      { term: 'yield from', zh: '委托生成器', note: '从另一个可迭代对象里依次交出所有值的语法' },
    ],
    steps: [
      '把需求先写成三个小函数：读取、筛选、转换，不要先合并。',
      '让“筛选”和“转换”函数都用 yield 交出结果，形成可组合的流。',
      '写一个 timed 装饰器，用 time.perf_counter 记录函数累计耗时。',
      '用 @timed 装饰耗时步骤，再打印统计摘要，确认它只包住该包的部分。',
      '换一份 1000 行左右的测试数据，确认一次遍历就能出统计结果。',
    ],
    examples: [
      {
        title: '三个生成器串成一条流水线',
        code: `lines = [
    "2026-11-01 INFO start",
    "2026-11-01 ERROR disk full",
    "2026-11-01 INFO done",
    "2026-11-02 ERROR timeout",
]

def read_lines(source):
    yield from source

def errors_only(records):
    for line in records:
        if " ERROR " in line:
            yield line

def shout(records):
    for line in records:
        yield line.split(" ERROR ", 1)[1].upper()

stream = shout(errors_only(read_lines(lines)))
print(list(stream))`,
        output: "['DISK FULL', 'TIMEOUT']",
        note: 'yield from 把 source 里的值逐个交给 read_lines 的调用方；两个处理步骤不建中间列表，list 只在最终取结果时触发执行。'
      },
      {
        title: '给流水线装上计时装饰器',
        code: `import time
from functools import wraps

def timed(func):
    total = [0.0]
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        total[0] += time.perf_counter() - start
        return result
    wrapper.elapsed = total
    return wrapper

@timed
def heavy_sum(numbers):
    total = 0
    for n in numbers:
        total += n * n
    return total

print(heavy_sum([1, 2, 3]))
print(heavy_sum([1, 2, 3]))
print(round(heavy_sum.elapsed[0], 6) >= 0)`,
        output: `14
14
True`,
        note: 'perf_counter 用于测量时间间隔。wraps 保留原函数名，避免调试时函数名被 wrapper 覆盖；elapsed 挂在函数对象上，可多次累计。'
      },
      {
        title: 'islice 切出前几条做抽样',
        code: `from itertools import islice

def logs():
    for i in range(1, 11):
        yield f"log-{i}"

print(list(islice(logs(), 3)))`,
        output: "['log-1', 'log-2', 'log-3']",
        note: 'islice 只真正取前几个元素，不需要把 logs 全部跑完。抽样、预览、限流都用它。'
      },
    ],
    pitfalls: [
      {
        title: '把每一步都做成列表，流水线就失去了意义',
        bad: 'step1 = list(load())\nstep2 = list(clean(step1))\nstep3 = list(report(step2))',
        good: 'stream = report(clean(load()))\nresult = list(stream)',
        note: '只有最终需要落地结果时再 list；中间每一步都物化会成倍增加内存和等待时间。'
      },
      {
        title: '计时装饰器忘了保留原函数信息',
        bad: 'def wrapper(*args, **kwargs):\n    ...',
        good: 'from functools import wraps\n\n@wraps(func)\ndef wrapper(*args, **kwargs):\n    ...',
        note: '不用 wraps，函数名、文档字符串都会变成 wrapper，排查调用栈和写文档时都很难受。'
      },
      {
        title: '在生成器里做一次性统计却还想回头遍历',
        bad: 'stats = (sum(x * x for x in rows), rows)  # 生成器只能消费一次',
        good: '先完成统计函数返回结果，或把输入转成可重复访问的列表再复用',
        note: '生成器被消费后就空了。需要多次使用时，要么重建流，要么接受一次性物化。'
      },
    ],
    practice: [
      {
        prompt: '写一个生成器 evens(numbers)，只交出其中的偶数；再用它输出 [1, 2, 3, 4] 中的偶数。',
        starter: `def evens(numbers):
    # TODO: 用 yield 交出偶数
    pass

print(list(evens([1, 2, 3, 4])))
`,
        answer: `def evens(numbers):
    for n in numbers:
        if n % 2 == 0:
            yield n

print(list(evens([1, 2, 3, 4])))`,
        output: '[2, 4]',
        hint: '判断 n % 2 == 0，再 yield n；不要 return 整个列表。'
      },
      {
        prompt: '写一个 timed 装饰器，包住 add(a, b) 并返回结果；然后调用 add(2, 3) 打印结果。',
        starter: `from functools import wraps
import time

def timed(func):
    # TODO: 记录耗时并返回结果，保留函数名
    pass

@timed
def add(a, b):
    return a + b

print(add(2, 3))
`,
        answer: `from functools import wraps
import time

def timed(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        wrapper.elapsed = time.perf_counter() - start
        return result
    return wrapper

@timed
def add(a, b):
    return a + b

print(add(2, 3))`,
        output: '5',
        hint: '装饰器里的 wrapper 必须 return func(...)；@wraps(func) 保留 add 的名字。'
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '为什么流水线里的每一步都建议写成生成器？',
        options: ['生成器必须放在最外层才能运行', '数据可以边流过边处理，不必一次装满内存', '生成器不能被多次调用', '因为 yield 比 return 快一倍'],
        answer: 1,
        explain: '生成器按需交出下一个值，中间结果不必全部物化，内存占用稳定。'
      },
      {
        type: 'judge',
        question: 'timed 装饰器用 @wraps(func) 是为了保留被包装函数的名字和文档信息。',
        answer: true,
        explain: 'wraps 会复制 name、qualname、doc 等属性，调试时更容易看出真正调用的是哪个函数。'
      },
      {
        type: 'code',
        question: '补全成一个从 source 逐个交出值的生成器：________ source。',
        code: 'def copy(source):\n    ________',
        answer: 'yield from source',
        accept: ['yield from source', 'for item in source:\n        yield item'],
        explain: 'yield from source 等价于把 source 里每个元素依次 yield 出去。'
      },
    ]
  }
]