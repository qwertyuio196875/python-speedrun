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
      { term: '迭代', zh: '逐个取出', note: '用 for 循环从头到尾把每个元素取一遍' },
      { term: 'one-shot', zh: '一次性消费', note: '生成器遍历完就空了；重复使用要重新创建' }
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
      },
      {
        title: '对生成器用 len()',
        bad: 'g = (i for i in range(3))\nprint(len(g))   # 报错 TypeError',
        good: 'print(sum(1 for _ in g))   # 数一遍（会消耗它）',
        note: '生成器没有长度；要数就得逐个消费一遍，或先 list() 物化。'
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
      { term: 'nonlocal', zh: '外层变量声明', note: '让内层函数能读写外围函数里的变量' },
      { term: 'functools.wraps', zh: '保留原函数信息', note: '装饰器里 @wraps(func) 保留原函数的名字和文档，调试友好' }
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
      },
      {
        title: 'combinations 和 permutations 混淆',
        bad: 'combinations([1, 2, 3], 2)   # 以为会给出 (1,2) 和 (2,1) 两种',
        good: 'from itertools import permutations\npermutations([1, 2, 3], 2)   # 分先后顺序用这个',
        note: 'combinations 不分先后（组合）；要区分顺序（排列）用 permutations。'
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
      { term: 'perf_counter', zh: '高精度计时', note: 'time.perf_counter() 测时间间隔，比 time.time 更适合计时' },
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
      {
        title: '计时装饰器直接包生成器函数',
        bad: '@timed\ndef gen():\n    yield ...   # 调用瞬间根本没执行',
        good: '把计时放在消费端：start = perf_counter()\nlist(gen()) 后相减',
        note: '生成器是惰性的，装饰器测到的只是"创建"的一瞬；要测真实耗时得包住消费那一步。'
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
  },
  {
    id: 'regex-basics',
    title: '正则表达式：文本查找的万能模板',
    phase: 7,
    order: 6,
    minutes: 30,
    rating: { level: 4, must: 3 },
    summary: '用标准库 re 按模式批量提取手机号、邮箱、数字：写一个模板，处处匹配。',
    keywords: ['正则', 're', 'findall', '匹配', '提取', '模式'],
    tip: '零基础提示：正则像"填空模板"——\\d\\d\\d 的意思是"连续三个数字"，正则引擎拿着模板去文本里挨个比对，对上就捞出来。先学会 \\d、+、[] 三个零件就能干很多活。',
    what: 're 是标准库里的正则模块。re.findall(r"模式", 文本) 返回所有匹配组成的列表。常用零件：\\d 表示一个数字、\\w 表示字母数字下划线、+ 表示前一个至少一次、{n} 表示恰好 n 次、[abc] 表示方括号里任意一个。模式字符串前面加 r（原始字符串），防止反斜杠被转义处理。',
    analogy: '打个比方：正则像海关的查验模板。你说"放所有长得像 11 位数字的过来"，它就把整篇文本里符合特征的一个不漏地挑出来。',
    terms: [
      { term: 're', zh: '正则模块', note: 'Python 标准库，提供按模式查找、提取文本的能力。' },
      { term: 'pattern', zh: '模式', note: '描述文本特征的模板字符串，如 r"1\\d{10}" 表示 1 开头共 11 位数字。' },
      { term: 'raw string', zh: '原始字符串', note: '引号前加 r 的字符串，反斜杠不当转义符处理，写正则必用。' },
      { term: 'findall', zh: '找出全部', note: 're.findall(模式, 文本) 返回所有匹配组成的列表。' },
      { term: 'search', zh: '找第一个', note: 're.search 返回第一个匹配对象，取 .group() 得到文字。' }
    ],
    steps: [
      'import re 导入模块',
      '想清楚要提取的内容有什么特征（几位数字、什么开头）',
      '写出模式字符串，引号前记得加 r，如 r"1\\d{10}"',
      '用 re.findall(r"模式", 文本) 试跑，看返回的列表对不对',
      '按需加量词：+ 至少一次、{n} 恰好 n 次、[abc] 任选其一',
    ],
    examples: [
      {
        title: '从文本里捞手机号',
        code: `import re

text = "联系张三：13812345678，办公室 010-12345678"
print(re.findall(r"1\\d{10}", text))`,
        output: `['13812345678']`,
        note: '1\\d{10} 表示"1 开头、后面正好 10 个数字"；座机号 010 开头不符合特征，被自动排除。',
      },
      {
        title: '批量提取邮箱',
        code: `import re

text = "发到 a@demo.com 或 b@test.org.cn，都行"
print(re.findall(r"[\\w.]+@[\\w.]+", text))`,
        output: `['a@demo.com', 'b@test.org.cn']`,
        note: '[\\w.]+ 表示"字母数字下划线点号至少一个"，前后用 @ 连起来，就是一个简单的邮箱模板。',
      }
    ],
    pitfalls: [
      {
        title: '模式字符串忘了加 r 前缀',
        bad: 're.findall("\\d+", text)   # 会有转义警告，行为不可靠',
        good: 're.findall(r"\\d+", text)',
        note: '普通字符串里 \\d 不是合法转义，Python 会给警告且容易埋坑；正则模式一律加 r。'
      },
      {
        title: '贪婪匹配吃掉太多内容',
        bad: 're.findall(r"<.+>", "<a>和<b>")   # 结果整段被吃掉',
        good: 're.findall(r"<.+?>", "<a>和<b>")',
        note: '默认"能吃多少吃多少"，.+ 会一直吃到最后一处；加 ? 变成"够吃就走"的非贪婪匹配。'
      },
      {
        title: '以为 findall 只找第一个',
        bad: 're.findall(r"\\d+", "A1 B22")   # 以为返回 "1"',
        good: 're.search(r"\\d+", "A1 B22").group()   # 只要第一个用 search',
        note: 'findall 返回全部匹配组成的列表；只想要第一个，用 re.search 再取 group()。'
      },
      {
        title: '忘了正则里的点号是"任意字符"',
        bad: 're.findall(r"1.3", "1×3 123")   # "1×3" 也会被匹配',
        good: 're.findall(r"1\\.3", text)   # 只匹配真正的 1.3',
        note: '. 在正则里代表任意一个字符；要匹配字面上的点，写成 \\.。'
      }
    ],
    practice: [
      {
        prompt: '从成绩行"小明 92 分, 小红 88 分, 小刚 95 分"里提取所有分数，转成整数列表并打印。',
        starter: `import re

line = "小明 92 分, 小红 88 分, 小刚 95 分"
# TODO: 提取所有数字并转成 int
`,
        answer: `import re

line = "小明 92 分, 小红 88 分, 小刚 95 分"
scores = re.findall(r"\\d+", line)
print([int(s) for s in scores])`,
        output: `[92, 88, 95]`,
        hint: 're.findall(r"\\d+", line) 得到字符串列表，再用 int(s) 逐个转换。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '正则模式里的 \\d 代表什么？',
        options: ['任意字符', '一个数字', '字母 d', '一个空格'],
        answer: 1,
        explain: '\\d 是 digit（数字）的缩写，匹配 0 到 9 中的一个字符。'
      },
      {
        type: 'judge',
        question: '写正则模式时，引号前加 r 可以让反斜杠不被转义处理。',
        answer: true,
        explain: 'r"\\d" 是原始字符串，\\d 原样交给正则引擎；不加 r 容易和字符串转义打架。'
      },
      {
        type: 'code',
        question: '补全模式，找出文本里所有连续 3 位数字：re.findall(r"\\d{____}", text)',
        code: 're.findall(r"\\d{____}", text)',
        answer: '3',
        accept: [],
        explain: '{3} 表示前面的 \\d 恰好重复 3 次，匹配所有连续三位数字。'
      }
    ]
  },
  {
    id: 'type-hints',
    title: '类型注解：给代码写说明书',
    phase: 7,
    order: 7,
    minutes: 25,
    rating: { level: 3, must: 4 },
    summary: '给函数参数和返回值标注类型：编辑器会提前提醒，Pydantic 等库靠它自动校验。',
    keywords: ['类型注解', 'type hint', '标注', 'list', '返回类型'],
    tip: '零基础提示：类型注解像菜单上的"微辣/中辣"标记——不改变菜的味道，但点单的人一眼明白。Python 不会因为注解报错，它主要写给人看、给编辑器和工具看。',
    what: '在参数后面写 : 类型，括号后写 -> 返回类型：def add(a: int, b: int) -> int。Python 本身不强制注解（传错类型不会立刻报错），但好处很多：编辑器能提前提醒写错的地方；第 8 阶段的 Pydantic、FastAPI 靠注解自动校验数据；大项目里读代码更快。容器也能标：list[int] 表示整数列表，dict[str, int] 表示键是字符串、值是整数的字典。',
    analogy: '打个比方：注解像快递箱上的"易碎品、向上"标签——不影响里面装什么，但让每个经手的人和机器都知道该怎么对待它。',
    terms: [
      { term: 'type hint', zh: '类型注解', note: '标注变量、参数、返回值类型的写法，如 name: str。' },
      { term: 'return annotation', zh: '返回值注解', note: '括号后用 -> 类型 说明函数交回什么类型。' },
      { term: 'generic', zh: '容器注解', note: 'list[int]、dict[str, int] 这类带内部类型的写法。' },
      { term: 'static check', zh: '静态检查', note: '不运行代码就检查注解是否一致，编辑器和 mypy 都能做。' },
      { term: 'mypy', zh: '类型检查器', note: 'pip install mypy 后运行 mypy 文件名，帮你找出注解不一致的地方。' }
    ],
    steps: [
      '给函数每个参数补上 : 类型，如 def repeat(text: str, times: int)',
      '括号后加 -> 类型，说明返回值是什么',
      '容器参数用 list[int]、dict[str, int] 这类写法',
      '有默认值的参数照常写：bonus: float = 0',
      '运行一遍确认程序正常（注解本身不改变行为）',
      '选修：pip install mypy 后运行 mypy 文件名，让工具帮你检查类型',
    ],
    examples: [
      {
        title: '基本注解：参数与返回值',
        code: `def repeat(text: str, times: int) -> str:
    return text * times

print(repeat("ab", 3))`,
        output: `ababab`,
        note: 'text: str 说明要传字符串，-> str 说明交回字符串；编辑器把鼠标放上去就能看到这些信息。',
      },
      {
        title: '容器注解与默认值',
        code: `def average(scores: list[float], bonus: float = 0) -> float:
    return round(sum(scores) / len(scores) + bonus, 1)

print(average([92, 88, 95]))
print(average([92, 88, 95], bonus=0.5))`,
        output: `91.7
92.2`,
        note: 'list[float] 说明传的是小数列表；bonus: float = 0 既有注解也有默认值，不传就按 0 算。',
      }
    ],
    pitfalls: [
      {
        title: '类型名大小写写错',
        bad: 'def add(a: Int, b: Int) -> Int:',
        good: 'def add(a: int, b: int) -> int:',
        note: '基本类型是小写的 int、str、float、bool；写成 Int 会在定义时就报 NameError。'
      },
      {
        title: '以为注解会强制类型',
        bad: 'def repeat(text: str, times: int) -> str: ...\nrepeat(3, "ab")   # 不会立刻报错，运算时才炸',
        good: 'repeat("ab", 3)',
        note: '注解是"说明书"不是"门卫"，Python 不因传错类型而拦截；想自动校验要靠 Pydantic 这类库或 mypy 检查。'
      },
      {
        title: '返回值注解的箭头写错',
        bad: 'def f() : int:',
        good: 'def f() -> int:',
        note: '返回值注解用 ->（减号加大于号），写在括号后面、冒号前面；位置写错直接语法错误。'
      },
      {
        title: '返回值和注解对不上',
        bad: 'def get_name() -> int:\n    return "小明"   # 返回了字符串',
        good: 'def get_name() -> str:\n    return "小明"',
        note: 'Python 不会拦，但编辑器会标灰、mypy 会报错；注解和实际类型一致，工具才帮得上忙。'
      }
    ],
    practice: [
      {
        prompt: '给下面的函数补上类型注解：text 是字符串，返回值是整数，然后运行确认。',
        starter: `def count_vowels(text):
    return sum(1 for ch in text.lower() if ch in "aeiou")

print(count_vowels("Beautiful Day"))
`,
        answer: `def count_vowels(text: str) -> int:
    return sum(1 for ch in text.lower() if ch in "aeiou")

print(count_vowels("Beautiful Day"))`,
        output: `6`,
        hint: '参数 text: str，括号后 -> int；注解不影响计算结果。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '给参数写了 : int 但运行时传了字符串，Python 会怎样？',
        options: ['立刻报错拦截', '静默把字符串转成整数', '不会拦截，运算时才可能出错', '自动改成正确类型'],
        answer: 2,
        explain: '注解本身不做强制检查；传错类型要到真正运算时才可能报错，强制校验要靠 Pydantic 或 mypy。'
      },
      {
        type: 'judge',
        question: 'def average(scores: list[float]) -> float: 表示传入小数列表、返回一个小数。',
        answer: true,
        explain: 'list[float] 是容器注解，-> float 是返回值注解，读函数签名就知道怎么调用。'
      },
      {
        type: 'code',
        question: '补全函数签名，说明 name 是字符串：def greet(name: ____) -> str:',
        code: 'def greet(name: ____) -> str:\n    return "你好, " + name',
        answer: 'str',
        accept: [],
        explain: '字符串类型写作小写的 str。'
      }
    ]
  },
  {
    id: 'threading',
    title: '多线程：同时做多件事',
    phase: 7,
    order: 8,
    minutes: 30,
    rating: { level: 4, must: 4 },
    summary: '用 threading 开多个线程"同时"等网络、处理文件；共享数据要用锁保护好。',
    keywords: ['threading', '线程', 'join', '锁', '竞态'],
    tip: '零基础提示：多线程像同时开三个下载窗口——等网络的时间被重叠起来。记住两件事：start 后要 join 等它们干完；大家共用一个变量时要加锁。',
    what: 'threading 模块让程序开多个线程并发执行。Thread(target=函数, args=(参数,)) 创建，start() 启动，join() 等它结束。多个线程共享同一份变量，同时改一个数就会"打架"（竞态条件），要用 Lock 加锁保护。受 GIL 限制，多线程适合"等外部"的活（下载、读写文件），大量计算要提速请用下一节的多进程。',
    analogy: '打个比方：多线程像同时烧三个水壶——水开的等待时间重叠了。但三个人共用一个账本记账时必须排队（锁），否则你写一半他插进来，账就错了。',
    terms: [
      { term: 'thread', zh: '线程', note: '程序内部的一条执行线，多个线程共享同一份变量。' },
      { term: 'join', zh: '等待结束', note: '主线程停下来等某个线程干完再继续。' },
      { term: 'race condition', zh: '竞态条件', note: '多个线程同时改一份数据，结果取决于执行顺序的 bug。' },
      { term: 'Lock', zh: '锁', note: '保证同一时间只有一个线程进关键代码段，with lock: 使用。' },
      { term: 'GIL', zh: '全局解释器锁', note: '同一时刻只有一个线程执行字节码；IO 等待会放锁，所以多线程适合 IO 密集。' }
    ],
    steps: [
      'import threading，把要并发干的活写成一个函数',
      '创建线程：t = threading.Thread(target=函数, args=(参数,))',
      't.start() 启动；主线程继续做自己的事',
      '需要等结果就 t.join()；多个线程挨个 join',
      '多线程共用一个变量时，用 with lock: 保护修改处',
    ],
    examples: [
      {
        title: '两个线程同时干活，join 后汇总',
        code: `import threading

results = []

def download(name):
    for i in range(3):
        results.append(f"{name}-{i + 1}")

t1 = threading.Thread(target=download, args=("A",))
t2 = threading.Thread(target=download, args=("B",))
t1.start()
t2.start()
t1.join()
t2.join()
print(sorted(results))`,
        output: `['A-1', 'A-2', 'A-3', 'B-1', 'B-2', 'B-3']`,
        note: '两个线程交错往列表里塞，谁先谁后不定，所以 join 后用 sorted 排好再打印，结果才稳定。',
      },
      {
        title: '共享变量要加锁：锁住后结果才正确',
        code: `import threading

counter = 0
lock = threading.Lock()

def add_many():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1

t1 = threading.Thread(target=add_many)
t2 = threading.Thread(target=add_many)
t1.start()
t2.start()
t1.join()
t2.join()
print(counter)`,
        output: `200000`,
        note: 'counter += 1 其实是"读、加、写"三步，不加锁时两线程互相插队会丢更新；加锁后 2×100000 一次不少。',
      },
      {
        title: '三个"下载"并行，总耗时约一份',
        code: `import threading
import time

def slow_task(n):
    time.sleep(0.2)   # 模拟等网络

start = time.perf_counter()
threads = [threading.Thread(target=slow_task, args=(i,)) for i in range(3)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print("并行耗时约", round(time.perf_counter() - start, 1), "秒")`,
        output: `并行耗时约 0.2 秒`,
        note: '三个 0.2 秒的等待并行重叠，总耗时约 0.2 秒而不是串行的 0.6 秒；等待类任务正是多线程的主场（真实值随机器略有浮动）。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '忘了 join，主线程先跑完了',
        bad: 't = threading.Thread(target=work)\nt.start()\nprint("结果", results)   # 线程还没干完',
        good: 't.start()\nt.join()\nprint("结果", results)',
        note: 'start 只是"发动"，不等干完；要拿结果先 join 等它收工。'
      },
      {
        title: '不加锁地累加共享变量',
        bad: 'for _ in range(100000):\n    counter += 1   # 两个线程同时跑会丢更新',
        good: 'with lock:\n    counter += 1',
        note: '读、加、写三步随时可能被别的线程插队，最终结果比预期小；关键段用锁排他。'
      },
      {
        title: '用多线程给计算提速',
        bad: '大量数字运算拆成 10 个线程，期待快 10 倍',
        good: '计算密集用 multiprocessing 多进程；多线程留给等网络的活',
        note: 'GIL 让同一时刻只有一个线程在跑字节码，计算任务不会加速；等 IO 时锁会放开，并发才有效。'
      }
    ],
    practice: [
      {
        prompt: '开 3 个线程，每个往列表里追加自己的名字 3 次；join 后打印 sorted(列表) 和它的长度。',
        starter: `import threading

results = []

def worker(name):
    for _ in range(3):
        results.append(name)

# TODO: 开 3 个线程（小明/小红/小刚），join 后打印
`,
        answer: `import threading

results = []

def worker(name):
    for _ in range(3):
        results.append(name)

threads = [threading.Thread(target=worker, args=(n,)) for n in ["小明", "小红", "小刚"]]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(sorted(results))
print(len(results))`,
        output: `['小明', '小明', '小明', '小刚', '小刚', '小刚', '小红', '小红', '小红']
9`,
        hint: '列表推导式批量建线程；先全部 start 再全部 join；sorted 让输出顺序稳定。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 't.join() 的作用是？',
        options: ['启动线程', '暂停线程', '等这个线程结束后再继续', '给线程加锁'],
        answer: 2,
        explain: 'join 让调用方（通常是主线程）等目标线程执行完毕再往下走。',
      },
      {
        type: 'judge',
        question: '由于 GIL 的存在，用多线程并行做大量数学计算可以获得成倍提速。',
        answer: false,
        explain: 'GIL 让同一时刻只有一个线程执行字节码；计算密集要提速用多进程，多线程适合 IO 密集。',
      },
      {
        type: 'code',
        question: '补全：启动这个线程。',
        code: 't = threading.Thread(target=work)\nt.______()',
        answer: 'start',
        accept: [],
        explain: 'start() 才会真正开线程跑 target；直接调用 target() 是普通函数调用，没有并发。'
      }
    ]
  },
  {
    id: 'multiprocessing',
    title: '多进程：绕开限制真正并行',
    phase: 7,
    order: 9,
    minutes: 30,
    rating: { level: 4, must: 3 },
    summary: '用 multiprocessing 开多个进程做计算密集活；Windows 下必须写在 if __name__ 里。',
    keywords: ['multiprocessing', '进程', 'Pool', '进程池', '并行计算'],
    tip: '零基础提示：进程是"另一个 Python 程序"，各自有独立内存，所以能真正并行烧 CPU。Windows 下有个铁律：启动代码必须写进 if __name__ == "__main__": 里。',
    what: 'multiprocessing 每个进程有独立内存，绕开 GIL，适合把大量计算拆给多个 CPU 核心。Pool(进程数) 建进程池，pool.map(函数, 列表) 把活分下去、按顺序收回结果。进程之间不共享变量，要传数据用 Queue。三大铁律：启动代码放进 if __name__ == "__main__":；给 Pool 用的函数要定义在模块顶层；函数要用 def 具名函数，lambda 传不进去。',
    analogy: '打个比方：线程是同一间办公室里共用文件的同事（快但要排队用文件），进程是外包给另外几间办公室——各自有全套设备真正同时干活，但交换结果要走快递（Queue）。',
    terms: [
      { term: 'multiprocessing', zh: '多进程模块', note: '标准库，用多个独立进程实现真正的并行计算。' },
      { term: 'Process', zh: '进程对象', note: '一个独立运行的子进程，用法和 Thread 很像。' },
      { term: 'Pool', zh: '进程池', note: '管理固定数量的进程，用 map 把任务分给它们。' },
      { term: 'Queue', zh: '进程队列', note: '进程之间传递数据的"快递柜"，两边进程都能放和取。' },
      { term: 'current_process', zh: '当前进程', note: '拿到当前进程对象，可读它的 name 等信息。' }
    ],
    steps: [
      '把要并行的计算函数定义在模块顶层（if __name__ 外面）',
      '启动代码写进 if __name__ == "__main__": 里（Windows 必须）',
      '简单并行用 Pool：with multiprocessing.Pool(2) as pool，然后 pool.map(函数, 列表)',
      '需要自己控制就用 Process + Queue：put 放结果、get 取结果',
      '先小数据试通，再上大数据量',
    ],
    examples: [
      {
        title: '进程池：把列表分给两个进程算',
        code: `import multiprocessing

def square(n):
    return n * n

if __name__ == "__main__":
    with multiprocessing.Pool(2) as pool:
        results = pool.map(square, [1, 2, 3, 4])
    print(results)`,
        output: `[1, 4, 9, 16]`,
        note: 'pool.map 把列表分给 2 个进程算，结果按原顺序收回来——用起来和普通 map 几乎一样。',
      },
      {
        title: 'Process + Queue：自己控制进程',
        code: `import multiprocessing

def worker(n, q):
    q.put(n * 10)

if __name__ == "__main__":
    q = multiprocessing.Queue()
    p1 = multiprocessing.Process(target=worker, args=(1, q))
    p2 = multiprocessing.Process(target=worker, args=(2, q))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print(q.get(), q.get())`,
        output: `10 20`,
        note: 'worker 把结果放进 Queue；join 之后再 get，两个结果按放入顺序拿到 10 和 20。',
      },
      {
        title: '看看子进程叫什么名字',
        code: `import multiprocessing

def who():
    print("我是", multiprocessing.current_process().name)

if __name__ == "__main__":
    p = multiprocessing.Process(target=who, name="计算小分队")
    p.start()
    p.join()`,
        output: `我是 计算小分队`,
        note: '每个进程有自己的名字；主进程叫 MainProcess，子进程默认叫 ForkPoolWorker-1 这种，也可以像这里自己起名。',
      }
    ],
    pitfalls: [
      {
        title: 'Windows 下忘了 if __name__ == "__main__"',
        bad: 'import multiprocessing\n\np = multiprocessing.Process(target=work)\np.start()   # 直接写在模块顶层',
        good: 'if __name__ == "__main__":\n    p = multiprocessing.Process(target=work)\n    p.start()',
        note: 'Windows 用 spawn 方式启动子进程会重新导入本文件；不加守卫就无限创建进程，报 RuntimeError 或卡死。'
      },
      {
        title: '给 Pool 传 lambda',
        bad: 'pool.map(lambda x: x ** 2, nums)   # PicklingError',
        good: 'def square(x):\n    return x ** 2\n\npool.map(square, nums)',
        note: '任务要通过 pickle 发给子进程，lambda 发不出去；写成模块顶层的具名函数。'
      },
      {
        title: '给 Pool 用的函数定义在 if __name__ 里面',
        bad: 'if __name__ == "__main__":\n    def cube(n):\n        return n ** 3\n    pool.map(cube, nums)   # 子进程找不到 cube',
        good: 'def cube(n):\n    return n ** 3   # 模块顶层\n\nif __name__ == "__main__":\n    pool.map(cube, nums)',
        note: '子进程重新导入模块时只看模块顶层；藏在守卫里的函数子进程找不到，报 AttributeError。'
      }
    ],
    practice: [
      {
        prompt: '用进程池把 [1, 2, 3, 4, 5] 每个数求立方，打印结果列表（记得 main 守卫和顶层函数）。',
        starter: `import multiprocessing

def cube(n):
    return n ** 3

# TODO: 用 Pool(2) 和 map 求立方并打印
`,
        answer: `import multiprocessing

def cube(n):
    return n ** 3

if __name__ == "__main__":
    with multiprocessing.Pool(2) as pool:
        print(pool.map(cube, [1, 2, 3, 4, 5]))`,
        output: `[1, 8, 27, 64, 125]`,
        hint: 'cube 在顶层、启动在守卫里；pool.map 返回结果列表，顺序和输入一致。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Windows 下多进程代码必须写进 if __name__ == "__main__": 里，是因为？',
        options: ['语法规定所有程序都要这么写', '子进程启动时会重新导入本文件，防止无限创建进程', '这样运行更快', '为了保护代码不被复制'],
        answer: 1,
        explain: 'spawn 方式启动子进程会重新导入主模块；不加守卫，导入时又开进程，无限循环。',
      },
      {
        type: 'judge',
        question: '多个进程可以直接共享同一个全局变量并同步修改。',
        answer: false,
        explain: '每个进程有独立内存，各自的变量互不相通；要传数据用 Queue 或 Pipe。',
      },
      {
        type: 'code',
        question: '补全：让子进程开始运行。',
        code: 'p = multiprocessing.Process(target=work)\np.______()',
        answer: 'start',
        accept: [],
        explain: '和线程一样，Process 创建后要 start() 才真正跑起来。'
      }
    ]
  },
  {
    id: 'asyncio-basics',
    title: 'asyncio：单线程的并发',
    phase: 7,
    order: 10,
    minutes: 30,
    rating: { level: 4, must: 4 },
    summary: '用 async/await 写异步程序：等待网络时去干别的，一个线程也能并发成百上千个任务。',
    keywords: ['asyncio', 'async', 'await', 'gather', '异步'],
    tip: '零基础提示：异步像"一个服务员看多桌"——某桌等菜的间隙去招呼别桌。await 的地方就是"等一等，先去干别的"的切换点。',
    what: 'async def 定义协程函数，await 表示"这里要等一个结果，事件循环先去干别的"。asyncio.run(主协程) 是整个异步程序的入口。asyncio.gather(任务1, 任务2) 把多个协程并发跑，结果按传入顺序收集。它适合大量 IO 等待（网络请求、读文件）；CPU 计算该用多进程。第 8 阶段 httpx 的异步请求就是这套。',
    analogy: '打个比方：同步程序像一个人排队买五杯奶茶，买完一杯才去买下一杯；异步像把五杯都下单，取餐号先到先取——一个人（单线程）也能把等待时间全部重叠起来。',
    terms: [
      { term: 'async def', zh: '异步函数', note: '定义协程函数；调用它得到协程对象，还没执行。' },
      { term: 'await', zh: '等待', note: '只能在 async 函数里用；等待时让出控制权给事件循环。' },
      { term: 'event loop', zh: '事件循环', note: '调度所有协程的"总指挥"，asyncio.run 负责启动它。' },
      { term: 'asyncio.run', zh: '异步入口', note: '运行最外层主协程，整个程序异步部分的起点。' },
      { term: 'gather', zh: '并发收集', note: '同时跑多个协程，结果按传入顺序组成列表返回。' }
    ],
    steps: [
      '把要并发的动作写成 async def 函数，等待处用 await asyncio.sleep 或 await 请求',
      '写一个 async def main() 把任务组织起来',
      '用 asyncio.run(main()) 启动',
      '要并发多个任务用 await asyncio.gather(任务1, 任务2)',
      '记住：await 只能在 async 函数里；耗时计算别放在事件循环里',
    ],
    examples: [
      {
        title: '最小的异步程序',
        code: `import asyncio

async def hello():
    print("你好")
    await asyncio.sleep(0.1)
    print("异步世界")

asyncio.run(hello())`,
        output: `你好
异步世界`,
        note: 'asyncio.run 启动事件循环并执行 hello；await asyncio.sleep(0.1) 模拟一次 0.1 秒的等待。',
      },
      {
        title: 'gather：两个任务并发，总耗时约最长的那个',
        code: `import asyncio
import time

async def task(name, seconds):
    await asyncio.sleep(seconds)
    return f"{name} 完成"

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(
        task("A", 0.2),
        task("B", 0.1),
    )
    print(results)
    print("耗时约", round(time.perf_counter() - start, 1), "秒")

asyncio.run(main())`,
        output: `['A 完成', 'B 完成']
耗时约 0.2 秒`,
        note: '0.2 秒和 0.1 秒两个等待重叠，总耗时约等于最长的 0.2 秒而不是相加的 0.3 秒；结果按传入顺序排列（真实值随机器略有浮动）。',
        verify: false
      },
      {
        title: '顺序 await 还是串行，别搞混',
        code: `import asyncio

async def fetch(name):
    print(f"开始 {name}")
    await asyncio.sleep(0.1)
    print(f"完成 {name}")

async def main():
    await fetch("第一个")
    await fetch("第二个")

asyncio.run(main())`,
        output: `开始 第一个
完成 第一个
开始 第二个
完成 第二个`,
        note: '一个 await 完成才走下一个，这仍是串行；想重叠必须把任务放进 gather。',
      }
    ],
    pitfalls: [
      {
        title: '忘了 asyncio.run 直接调用协程',
        bad: 'async def main(): ...\nmain()   # 只是创建了协程对象',
        good: 'asyncio.run(main())',
        note: '直接调用 async 函数得到协程对象，里面的代码根本没跑，还会收到 never awaited 警告。'
      },
      {
        title: '在协程里用 time.sleep',
        bad: 'async def task():\n    time.sleep(1)   # 整个事件循环卡住',
        good: 'async def task():\n    await asyncio.sleep(1)',
        note: 'time.sleep 会把唯一的线程冻住，别的协程全停；异步世界里等待用 asyncio.sleep。'
      },
      {
        title: 'gather 里一个任务失败全盘皆输',
        bad: 'results = await asyncio.gather(t1(), t2())   # t2 抛错，整体抛出',
        good: 'results = await asyncio.gather(t1(), t2(), return_exceptions=True)',
        note: '默认任何一个任务抛异常，gather 就立刻抛出；加 return_exceptions=True 把异常当结果收集。'
      }
    ],
    practice: [
      {
        prompt: '写协程 work(name) 返回 f"{name} 结果"；用 gather 并发跑 任务1 和 任务2，打印结果列表。',
        starter: `import asyncio

async def work(name):
    # TODO: 返回 f"{name} 结果"
    pass

# TODO: 用 asyncio.run 和 gather 并发两个任务并打印
`,
        answer: `import asyncio

async def work(name):
    return f"{name} 结果"

async def main():
    results = await asyncio.gather(work("任务1"), work("任务2"))
    print(results)

asyncio.run(main())`,
        output: `['任务1 结果', '任务2 结果']`,
        hint: 'gather 按传入顺序返回结果列表；最外层用 asyncio.run 启动。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'await 关键字可以出现在哪里？',
        options: ['任何函数里', '只能在 async def 定义的函数里', '只能在 for 循环里', '只能在模块顶层'],
        answer: 1,
        explain: 'await 是协程专属语法，普通函数里写它直接语法错误。',
      },
      {
        type: 'judge',
        question: 'asyncio.gather 的结果列表顺序与传入任务的顺序一致。',
        answer: true,
        explain: '不管谁先完成，gather 都按传入顺序整理结果，所以输出可以预期。',
      },
      {
        type: 'code',
        question: '补全：启动异步主函数。',
        code: 'async def main():\n    ...\n\nasyncio.________(main())',
        answer: 'run',
        accept: [],
        explain: 'asyncio.run 启动事件循环并执行主协程，是异步程序的固定入口。'
      }
    ]
  },
  {
    id: 'socket-basics',
    title: 'socket：程序之间的对话',
    phase: 7,
    order: 11,
    minutes: 30,
    rating: { level: 4, must: 3 },
    summary: '用标准库 socket 在本机开一个小服务器和客户端：发一条消息、收一条回复。',
    keywords: ['socket', '套接字', 'TCP', 'UDP', '网络编程'],
    tip: '零基础提示：socket（套接字）就是程序之间的"电话"。本机自己跟自己通话用地址 127.0.0.1（localhost），发的是字节，记得 encode / decode。',
    what: 'socket 是网络编程的底层接口。TCP 像打电话：bind 绑定地址、listen 排号、accept 接通，之后 sendall/recv 收发，关掉用 close。UDP 像寄快递：不用接通，sendto 直接发、recvfrom 直接收，快但可能丢。所有收发的都是字节（bytes），文字要用 encode("utf-8") 转进去、decode("utf-8") 转回来。第 8 阶段用 requests 调 API 时，底下就是这些。',
    analogy: '打个比方：TCP 像打电话——先拨号（connect）、对方接听（accept）、说完挂断；UDP 像往对讲机喊话——不管对方在不在线，喊出去就完事，快但不保证送达。',
    terms: [
      { term: 'socket', zh: '套接字', note: '程序之间收发数据的"电话两端"。' },
      { term: 'AF_INET', zh: 'IPv4 地址族', note: '创建 socket 时指定用 IPv4 地址。' },
      { term: 'localhost', zh: '本机回环', note: '地址 127.0.0.1，指这台电脑自己，本机测试用。' },
      { term: 'recv', zh: '接收', note: '从连接里收字节，参数是本次最多收多少字节。' },
      { term: 'sendall', zh: '全部发送', note: '把字节全部发出去，比 send 更可靠。' }
    ],
    steps: [
      '服务器：socket → bind(地址) → listen → accept 等客上门',
      '客户端：socket → connect(地址) → sendall 发字节',
      '服务器 recv 收到后可以 sendall 回复，最后 close',
      '收发的都是字节：发前 encode("utf-8")，收后 decode("utf-8")',
      '本机测试用 127.0.0.1，端口挑个不常用的（如 9412）',
    ],
    examples: [
      {
        title: '本机 TCP 一问一答',
        code: `import socket
import threading
import time

def server():
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.bind(("127.0.0.1", 9412))
    srv.listen(1)
    conn, addr = srv.accept()   # 等客上门
    data = conn.recv(1024)
    conn.sendall(("收到：" + data.decode("utf-8")).encode("utf-8"))
    conn.close()
    srv.close()

t = threading.Thread(target=server)
t.start()
time.sleep(0.3)   # 等服务器先就绪

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("127.0.0.1", 9412))
client.sendall("你好，服务器".encode("utf-8"))
print(client.recv(1024).decode("utf-8"))
client.close()
t.join()`,
        output: `收到：你好，服务器`,
        note: '服务器跑在子线程里，客户端连上后发一句话、收一句回复。真实项目里服务器是独立程序，这里为了演示放同一个文件。',
      },
      {
        title: '认识本机地址',
        code: `import socket

print(socket.gethostname() != "")
print(socket.gethostbyname("localhost"))`,
        output: `True
127.0.0.1`,
        note: 'gethostbyname("localhost") 返回本机回环地址 127.0.0.1：发到这里就是发给自己。',
      },
      {
        title: 'UDP：不用接通直接发',
        code: `import socket
import threading
import time

def udp_server():
    srv = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    srv.bind(("127.0.0.1", 9413))
    data, addr = srv.recvfrom(1024)
    srv.sendto(("UDP 收到：" + data.decode("utf-8")).encode("utf-8"), addr)
    srv.close()

t = threading.Thread(target=udp_server)
t.start()
time.sleep(0.3)

c = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
c.sendto("你好 UDP".encode("utf-8"), ("127.0.0.1", 9413))
print(c.recv(1024).decode("utf-8"))
c.close()
t.join()`,
        output: `UDP 收到：你好 UDP`,
        note: 'UDP 没有 connect/accept，sendto 直接发、recvfrom 直接收；少了几次握手所以更快，但可能丢包。',
      }
    ],
    pitfalls: [
      {
        title: '发送忘了编码、接收忘了解码',
        bad: 'client.sendall("你好")   # 报错：需要字节',
        good: 'client.sendall("你好".encode("utf-8"))\n# 收到后 data.decode("utf-8")',
        note: '网络上传的是字节不是文字；两边用同一种编码，否则收到乱码。'
      },
      {
        title: '端口被占用',
        bad: 'srv.bind(("127.0.0.1", 80))   # 80 端口早被别的程序占了',
        good: '挑一个不常用的高位端口，如 9412；报 OSError 就换一个',
        note: '一个端口同时只能被一个程序监听；报 OSError: Only one usage... 就换端口重试。'
      },
      {
        title: '以为 recv(1024) 一定收满 1024 字节',
        bad: 'data = conn.recv(1024)\n# 以为 data 长度是 1024',
        good: 'data 是"这次实际到达的字节"，长消息要循环收',
        note: 'recv 的参数是上限，网络分包后可能只到一部分；完整收一条大消息要按约定循环收。'
      }
    ],
    practice: [
      {
        prompt: '把 TCP 例子里的服务器改成"收到后回复：收到：加感叹号"，运行后客户端应打印 收到：你好，服务器！。',
        starter: `# 服务器回复处原为：
conn.sendall(("收到：" + data.decode("utf-8")).encode("utf-8"))
# TODO: 在末尾追加一个感叹号
`,
        answer: `conn.sendall(("收到：" + data.decode("utf-8") + "！").encode("utf-8"))`,
        output: `收到：你好，服务器！`,
        hint: '在 decode 后的字符串末尾 + "！"，再 encode 发回去。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'TCP 和 UDP 最主要的区别是？',
        options: ['TCP 更快', 'TCP 先接通再收发、可靠；UDP 直接发、快但可能丢', 'UDP 只能发文字', '没有区别'],
        answer: 1,
        explain: 'TCP 有连接、可靠不丢；UDP 无连接、开销小可能丢包，按场景选。',
      },
      {
        type: 'judge',
        question: 'socket 收发的都是字节，文字要 encode 后发送、decode 后使用。',
        answer: true,
        explain: '网络只认字节；两端编码一致才不会乱码。',
      },
      {
        type: 'code',
        question: '补全：让服务器占用 127.0.0.1 的 9412 端口。',
        code: 'srv.__________(("127.0.0.1", 9412))',
        answer: 'bind',
        accept: [],
        explain: 'bind 把套接字和"地址 + 端口"绑定，之后才能 listen 和 accept。'
      }
    ]
  }
]