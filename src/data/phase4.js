/**
 * 第四阶段：认识"对象"（class 和实例，约 2.5 小时）
 * 面向从未写过代码的人的零基础 Python 课程数据。
 * 字段规范见 docs/content-schema.md。
 */
export default [
  {
    id: 'class-basics',
    title: 'class：给数据和行为打包',
    phase: 4,
    order: 1,
    minutes: 24,
    rating: { level: 3, must: 5 },
    summary: '用 class 画出"做事的模板"，再用模板做出一个又一个能自己干活的对象。',
    keywords: ['class', '类', '实例', '对象', '模板', '打包'],
    tip: '零基础提示：先别管那些吓人的术语。你只需要记住一句话——class 是一张图纸，对象是按图纸做出来的东西，看下面的比方你就懂了。',
    what: 'class 用来把"一些数据"和"关于这些数据的行为"打包成一份同类的模板。写出 class 之后，模板本身不会跑，只有用"类名()"照着模板做出一个对象（也叫实例）才有实际的值。同一个模板可以做出很多互不干扰的对象，就像用同一张图纸能盖很多户房子。',
    analogy: '打个比方：class 就像蛋糕模具，模具本身不能吃；用模具压一次、几次都行，每次压出来的面团切片才是能用的蛋糕。同理，类定义了"长什么样"，实例才是真正拿在手里的东西。',
    terms: [
      { term: 'class', zh: '类', note: '一份描述数据和行为的模板，用 class 关键字来写' },
      { term: 'instance', zh: '实例', note: '照着类的模板做出来的一个具体对象' },
      { term: 'object', zh: '对象', note: '在运行程序时真实存在、能装数据的那个东西' },
      { term: 'instantiate', zh: '实例化', note: '用 类名() 制造一个实例的动作。' },
      { term: 'PascalCase', zh: '大驼峰命名', note: '类名每个单词首字母大写，如 Pet、BankAccount。' }
    ],
    steps: [
      '用 class 加一个以大写字母开头的名字，例如 class Pet:',
      '在类里写 def 开头的方法（方法就是后面要讲到的事）',
      '用 类名() 做出一个实例，比如 Pet()',
      '用 实例.数据名 去读写这个实例自己放着的东西'
    ],
    examples: [
      {
        title: '一张模板，做出好几个独立对象',
        code: `class Pet:
    def __init__(self, name):
        self.name = name

    def say(self):
        return self.name + " 在叫"

cat = Pet("咪咪")
dog = Pet("旺财")
print(cat.name)
print(dog.say())`,
        output: `咪咪
旺财 在叫`,
        note: '同一个 Pet 类做出了猫和狗两个对象，每个对象各有自己的名字。'
      },
      {
        title: '每个实例各自管自己的数据',
        code: `class Box:
    def __init__(self):
        self.items = 0

a = Box()
b = Box()
a.items = 5
print(a.items)
print(b.items)`,
        output: `5
0`,
        note: '给 a 加东西不会影响 b，因为它们是两个完全独立的对象。'
      }
    ],
    pitfalls: [
      {
        title: '类名用了小写开头',
        bad: 'class pet:\n    pass',
        good: 'class Pet:\n    pass',
        note: '约定俗成：类名用大写字母开头，一眼就能看出它是一份模板而不是普通的值。'
      },
      {
        title: '定义完 class 就急着看结果',
        bad: 'class Pet:\n    pass\nprint("已经建好了")',
        good: 'p = Pet()\nprint(p)',
        note: 'class 只是画图纸，必须用 类名() 先做出一个对象，图纸本身不会自己显示内容。'
      },
      {
        title: '以为一个类只能做一个对象',
        bad: '只做了一个对象，就以为模板用完不能再做了',
        good: 'class Fruit:\n    def __init__(self, name):\n        self.name = name\n\nprint(Fruit("苹果").name)\nprint(Fruit("梨").name)',
        note: '一个类能做出很多独立的实例，每个实例各管各的数据。'
      },
      {
        title: '方法体忘了缩进，跑到类外面去了',
        bad: 'class Pet:\n    def say(self):\n    return "hi"   # 没缩进',
        good: 'class Pet:\n    def say(self):\n        return "hi"',
        note: 'def 要缩进在 class 里、方法体再缩进在 def 里；少一层它就变成类外的普通函数。'
      }
    ],
    practice: [
      {
        prompt: '定义一个类 Fruit，让 __init__ 接收 name 并保存，再让 describe 返回"这是一个"加上名字的那句话。最后用 Fruit("苹果") 做出对象并打印 describe() 的结果。',
        starter: `class Fruit:
    def __init__(self, name):
        pass  # 先留着

    def describe(self):
        pass  # 先留着

apple = Fruit("苹果")
print(apple.describe())`,
        answer: `class Fruit:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return "这是一个" + self.name

apple = Fruit("苹果")
print(apple.describe())`,
        output: '这是一个苹果',
        hint: '在 __init__ 里用 self.name = name 把名字存进对象，describe 里再读 self.name。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '写下一行 class Pet: 之后，接下来首先应该做什么？',
        options: [
          '等程序自己把类显示出来',
          '用 Pet() 照模板做出一个对象',
          '把 Pet 改成小写',
          '什么都不用做'
        ],
        answer: 1,
        explain: 'class 只是模板，必须用 类名() 才能做出真正能用的对象。'
      },
      {
        type: 'judge',
        question: '同一个 class 只能做出一个实例。',
        answer: false,
        explain: '一个类能做出很多互不干扰的实例，就像一张图纸能盖很多户房子。'
      },
      {
        type: 'code',
        question: '用类 Cat 做出一个实例，并把变量名取为 kitty。',
        code: 'class Cat:\n    pass\n\n____',
        answer: 'kitty = Cat()',
        accept: ['kitty = Cat()', "^\\s*kitty\\s*=\\s*Cat\\s*\\(\\)\\s*$"],
        explain: '照模板做对象要写"类名加括号"，即 Cat()，并交给一个变量。'
      }
    ]
  },
  {
    id: 'self-init',
    title: '__init__ 与 self：创建时的准备工作',
    phase: 4,
    order: 2,
    minutes: 25,
    rating: { level: 4, must: 5 },
    summary: '__init__ 在对象出生时自动打扫房间并记下信息，self 就是"正在干活的那个对象自己"。',
    keywords: ['self', '__init__', '初始化', '实例属性', '准备'],
    tip: '零基础提示：你不需要背定义，只要记住两点——__init__ 是在创建对象那一刻自动做准备的工序；self 就是"我自己"，方法里想拿自己的数据就得写 self 开头。',
    what: '__init__（读作 init）是一个特殊的名字，只要用 类名(...) 创建对象，它就会自动执行一次，用来把传入的信息存进对象，顺便做些准备工作。self 是方法里代表"正在干活的这一个对象自己"的词：想在方法里读写自己的数据，就要用 self.数据名。这样每个对象都知道自己是谁、放着什么。',
    analogy: '打个比方：__init__ 就像入住酒店时的开房登记，一进门就把你的名字、房号记下来，之后这间房的一切都跟"你"有关；self 就是服务员口里的"您"，谁进来它就服务谁。',
    terms: [
      { term: '__init__', zh: '初始化方法', note: '创建对象时自动运行的准备工作，两边各两个下划线' },
      { term: 'self', zh: '自身', note: '方法里指"正在干活的这个对象自己"，写在第一个参数位置' },
      { term: 'attribute', zh: '属性', note: '挂在对象上、跟着对象一起存取的数据' },
      { term: 'constructor', zh: '构造方法', note: '__init__ 的通用叫法：对象出生时自动执行的初始化。' },
      { term: 'state', zh: '状态', note: '对象此刻所有属性值的总称，会随方法调用而变化。' }
    ],
    steps: [
      '在类里写 def __init__(self, ...) 来规定新对象的"开房登记"要接收什么',
      '用 self.名字 = 值 把传入的信息存进这个对象',
      '想在别的动作里用这些信息，就通过 self.名字 去读',
      '创建对象时就提供 __init__ 要的那些参数'
    ],
    examples: [
      {
        title: '__init__ 在创建时把信息存进对象',
        code: `class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

stu = Student("小红", 3)
print(stu.name)
print(stu.grade)`,
        output: `小红
3`,
        note: '创建 Student("小红", 3) 时，__init__ 自动把名字和年级分别收进对象的 self.name 和 self.grade。'
      },
      {
        title: 'self 让方法认识"这个对象自己"',
        code: `class Cat:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "你好，我是 " + self.name

cat = Cat("咪咪")
print(cat.greet())`,
        output: '你好，我是 咪咪',
        note: 'greet 拿到 self 后，读到的是自己这个对象的 name，而不是别的猫的。'
      }
    ],
    pitfalls: [
      {
        title: '方法带参数的个数写错',
        bad: 'class Cat:\n    def __init__(self, name):\n        self.name = name\n\n    def greet():\n        return self.name\n\ncat = Cat("咪咪")\nprint(cat.greet())',
        good: 'class Cat:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return self.name\n\ncat = Cat("咪咪")\nprint(cat.greet())',
        note: '方法被对象调用时会自动把对象本身传进来，所以每个普通方法都要把 self 写在参数最前面。'
      },
      {
        title: '存数据时忘了写 self',
        bad: 'class Student:\n    def __init__(self, name):\n        name = name  # 只改了一个临时变量',
        good: 'class Student:\n    def __init__(self, name):\n        self.name = name',
        note: '想让数据跟着对象走，就必须写成 self.name；不写 self 它只是个用完就丢的局部东西。'
      },
      {
        title: '在 __init__ 里写 return',
        bad: 'class Cat:\n    def __init__(self, name):\n        return "建好了"',
        good: 'class Cat:\n    def __init__(self, name):\n        self.name = name',
        note: '__init__ 只能返回 None，写 return 值会直接报 TypeError；要交数据就挂到 self 上。'
      },
      {
        title: '重新创建对象，把旧数据弄丢',
        bad: 'stu = Student("小明")\nstu = Student("小红")   # 小明的数据没了',
        good: 'stu = Student("小明")\nstu2 = Student("小红")',
        note: '同一个变量名再次赋值会指向新对象，旧对象被丢弃；想都留着就起不同名字或装进列表。'
      }
    ],
    practice: [
      {
        prompt: '让 Student 的 __init__ 把传入的 name 存成 self.name，让 introduce 返回"我叫"加上名字的那句话。最后用 Student("小明") 创建对象并打印 introduce() 的结果。',
        starter: `class Student:
    def __init__(self, name):
        pass  # 在这里把 name 存进对象

    def introduce(self):
        return "我叫" + self.name

s = Student("小明")
print(s.introduce())`,
        answer: `class Student:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return "我叫" + self.name

s = Student("小明")
print(s.introduce())`,
        output: '我叫小明',
        hint: '在 __init__ 里写 self.name = name，把参数交给对象保管。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '__init__ 会在什么时候自动运行一次？',
        options: [
          '它永远不会自动运行',
          '每次整个程序运行时',
          '用 类名(...) 创建对象的那一刻',
          '调用 print 的时候'
        ],
        answer: 2,
        explain: '只要执行 类名(...)，尤其是一开始创建对象，__init__ 就会自动被调用。'
      },
      {
        type: 'judge',
        question: 'self 指的是正在创建或正在干活的那个具体对象自己。',
        answer: true,
        explain: '同一个类做出多个对象时，self 每次都代表当前那一个对象。'
      },
      {
        type: 'code',
        question: '在 __init__ 里，把参数 score 保存为对象自己的 score。',
        code: 'class Result:\n    def __init__(self, score):\n        ____',
        answer: 'self.score = score',
        accept: ['self.score = score', "^\\s*self\\.score\\s*=\\s*score\\s*$"],
        explain: '写成 self.score = score 才能让数据跟着这个对象走。'
      }
    ]
  },
  {
    id: 'methods',
    title: '方法：跟着对象走的行为',
    phase: 4,
    order: 3,
    minutes: 24,
    rating: { level: 3, must: 5 },
    summary: '方法就是写在类里面、跟着具体对象走的一串动作，第一次参数永远写 self。',
    keywords: ['方法', 'method', '自我', 'def', '行为'],
    tip: '零基础提示：可以把方法想成对象随身带着的"说明书动作"。调用时不要忘了在方法名后面加一对括号 ()，这点最容易漏。',
    what: '方法就是写在 class 里的 def 函数，是"这个对象会做的事"。和普通函数不同，方法总把 self 当第一个参数，所以它知道自己属于哪个对象、能读自己的数据。调用时写成 对象.方法名(...)，一旦创建了对象，就能随时让它干活，而且每个对象都能调用自己那份。',
    analogy: '打个比方：类里的方法就像手机里的 App。手机（对象）出厂时自带这些程序，你点开谁就用谁，而且每个手机里都有一份自己装的程序，互不混用。',
    terms: [
      { term: 'method', zh: '方法', note: '写在类里、跟着对象走的一串动作，用 def 定义' },
      { term: 'call', zh: '调用', note: '让方法真正跑起来，写法是在名字后面加括号 ()' },
      { term: 'return', zh: '返回', note: '方法干完活后把结果交给调用它的那一行' },
      { term: 'instance method', zh: '实例方法', note: '第一个参数是 self、属于具体对象的方法，最常见的一种。' },
      { term: 'parameter', zh: '参数', note: '方法名括号里声明的变量，调用时传入具体值。' }
    ],
    steps: [
      '在 class 里用 def 方法名(self, ...) 定义这个方法',
      '方法内部用 self.数据名 去读或改对象自己的数据',
      '想让外部拿到结果就用 return',
      '在外部用 对象.方法名(参数) 来调用'
    ],
    examples: [
      {
        title: '方法用对象自己的数据算结果',
        code: `class Alarm:
    def __init__(self, hour, minute):
        self.hour = hour
        self.minute = minute

    def ring(self):
        return f"叮铃铃！已经 {self.hour}:{self.minute} 了"

clock = Alarm(7, 30)
print(clock.ring())`,
        output: '叮铃铃！已经 7:30 了',
        note: 'ring 方法通过 self.hour 和 self.minute 读到自己这组闹钟的时间。'
      },
      {
        title: '方法能改变对象自己的数据',
        code: `class Score:
    def __init__(self):
        self.points = 0

    def add(self, n):
        self.points += n

    def total(self):
        return self.points

s = Score()
s.add(10)
s.add(5)
print(s.total())`,
        output: '15',
        note: '每次 add 都累加到 self.points 上，方法之间通过 self 共享这同一个对象的数据。'
      }
    ],
    pitfalls: [
      {
        title: '调用方法忘了加括号',
        bad: 's = Score()\nprint(s.total)',
        good: 's = Score()\nprint(s.total())',
        note: '不加括号它只是一段"说明书"，加上括号才是真的让它干活并拿到结果。'
      },
      {
        title: '方法里想记录状态却没通过 self',
        bad: 'def add(self, n):\n    total = total + n',
        good: 'def add(self, n):\n    self.total = self.total + n\n    return self.total',
        note: '只有挂到 self 上的数据才会跟着对象一直保留，method 里临时写的变量会丢失。'
      },
      {
        title: '方法之间互相调用忘了 self',
        bad: 'class Score:\n    def add(self, n):\n        return n\n    def total(self):\n        return add(3)   # 找不到 add',
        good: '    def total(self):\n        return self.add(3)',
        note: '在方法里调用同类的其他方法也要写 self.方法名()，否则被当成外部函数。'
      },
      {
        title: '属性名和方法名重名',
        bad: 'class Score:\n    def __init__(self):\n        self.total = 0\n    def total(self):   # 和属性同名，互相覆盖',
        good: '    self.value = 0\n    def get_total(self):',
        note: '属性和方法挂在同一个对象上，重名会互相顶掉；命名时区分开（如 value / get_total）。'
      }
    ],
    practice: [
      {
        prompt: '给类 Counter 加一个 step 方法：每次调用让对象的 value 加 1。加完后先调用两次 step，再打印对象的 value。',
        starter: `class Counter:
    def __init__(self):
        self.value = 0

    def step(self):
        pass  # TODO

c = Counter()
c.step()
c.step()
print(c.value)`,
        answer: `class Counter:
    def __init__(self):
        self.value = 0

    def step(self):
        self.value += 1

c = Counter()
c.step()
c.step()
print(c.value)`,
        output: '2',
        hint: '在方法里用 self.value += 1 来更新对象自己的数字。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '方法里想读写"对象自己的数据"，应该用哪个词开头？',
        options: ['self', 'object', 'value', 'it'],
        answer: 0,
        explain: '方法内用 self.数据名 才能访问属于当前对象的数据。'
      },
      {
        type: 'judge',
        question: '调用一个方法只需要写它的方法名，不用加括号。',
        answer: false,
        explain: '方法名后面必须加括号 () 才代表真正调用它并拿到结果。'
      },
      {
        type: 'code',
        question: '补全：调用 Alarm 对象的 ring 方法。',
        code: 'clock = Alarm(7, 30)\nprint(clock.__________())',
        answer: 'ring',
        accept: [],
        explain: '用 对象.方法名() 调用，括号不能少。'
      }
    ]
  },
  {
    id: 'properties-static',
    title: '属性进阶：@property 与类方法/静态方法',
    phase: 4,
    order: 4,
    minutes: 28,
    rating: { level: 4, must: 4 },
    summary: '@property 让方法伪装成属性，@classmethod 和 @staticmethod 是挂在类身上的另两件工具。',
    keywords: ['property', 'classmethod', 'staticmethod', '装饰器', '工厂方法'],
    tip: '零基础提示：这三个 @ 开头的小标记是"变身贴纸"——@property 把方法变成像属性一样直接读，@classmethod、@staticmethod 则是挂在类上、不依赖某个具体对象的工具。',
    what: '@property 装饰的方法，调用时不加括号，像读属性一样读它，适合"由已有数据算出来的值"。@classmethod 用 cls 代表类本身，常用来写工厂方法——提供另一种创建对象的方式。@staticmethod 既不用 self 也不用 cls，是纯工具函数，只是借住在类里。三个都靠装饰器实现，第 7 阶段会讲装饰器原理。',
    analogy: '打个比方：@property 像汽车的"实时油耗表"——看起来是个读数（属性），背后其实每次都在计算（方法）；@classmethod 像 4S 店的另一个下单入口（按配置单订车），@staticmethod 则是销售顺手借你的计算器，跟具体哪台车无关。',
    terms: [
      { term: 'property', zh: '特性', note: '@property 装饰的方法，像属性一样读，背后是计算。' },
      { term: 'classmethod', zh: '类方法', note: '@classmethod 装饰，第一个参数是 cls（类本身）。' },
      { term: 'staticmethod', zh: '静态方法', note: '@staticmethod 装饰的纯工具函数，不依赖实例和类。' },
      { term: 'factory method', zh: '工厂方法', note: 'classmethod 的常见用法：提供另一种创建对象的方式。' },
      { term: 'cls', zh: '类自身', note: '类方法里的第一个参数，类似 self，但代表类。' }
    ],
    steps: [
      '写一个由已有数据算值的函数，上面加 @property，试试不加括号直接读',
      '故意不加 @property，看调用方式的差别',
      '写一个 @classmethod，在里面用 cls(...) 创建并返回新对象',
      '写一个 @staticmethod 放纯计算工具，用 类名.工具名() 调用',
      '想想每个新场景：读算出来的值用 property，换个方式创建用 classmethod',
    ],
    examples: [
      {
        title: '@property：方法伪装成属性',
        code: `class Circle:
    def __init__(self, r):
        self.r = r

    @property
    def area(self):
        return round(3.14159 * self.r ** 2, 2)

c = Circle(2)
print(c.area)`,
        output: `12.57`,
        note: '读 c.area 不加括号，像属性一样；背后每次都在用半径现算。改成 c.area() 反而报错。',
      },
      {
        title: '@classmethod：另一种创建对象的方式',
        code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)

t = Temperature.from_fahrenheit(212)
print(t.celsius)`,
        output: `100.0`,
        note: 'from_fahrenheit 是"工厂方法"：给华氏度，它替你算好摄氏度再 cls(...) 建对象。212°F 正好是 100°C。',
      },
      {
        title: '@staticmethod：挂在类里的纯工具',
        code: `class MathTool:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathTool.is_even(10), MathTool.is_even(7))`,
        output: `True False`,
        note: '不需要 self 也不需要 cls，纯粹借住在类名下的工具函数，用 类名.方法() 直接调用。',
      }
    ],
    pitfalls: [
      {
        title: '@property 的方法当方法调用',
        bad: 'c = Circle(2)\nprint(c.area())   # 报错 int is not callable',
        good: 'print(c.area)',
        note: '加了 @property 后 area 已经是"属性"，再加括号等于调用一个数字，直接报错。'
      },
      {
        title: 'classmethod 忘了写 cls',
        bad: 'class Temperature:\n    @classmethod\n    def from_fahrenheit(f):   # 第一个参数不是 cls',
        good: '    @classmethod\n    def from_fahrenheit(cls, f):\n        return cls((f - 32) * 5 / 9)',
        note: '类方法的第一个参数约定叫 cls，代表类本身；少了它就没法用 cls(...) 建对象。'
      },
      {
        title: 'staticmethod 里想用 self',
        bad: 'class MathTool:\n    @staticmethod\n    def is_even(self, n):   # 参数画蛇添足',
        good: '    @staticmethod\n    def is_even(n):\n        return n % 2 == 0',
        note: '静态方法和具体对象无关，写 self 反而让调用时多传一个参数而报错。'
      }
    ],
    practice: [
      {
        prompt: '给 Rectangle（宽 w、高 h）加一个 @property area，返回面积；打印 Rectangle(3, 4).area。',
        starter: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    # TODO: 加 @property area
`,
        answer: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    @property
    def area(self):
        return self.w * self.h

print(Rectangle(3, 4).area)`,
        output: `12`,
        hint: '在 area 上一行写 @property；函数体 return self.w * self.h；读取时不加括号。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '@classmethod 的第一个参数 cls 代表什么？',
        options: ['当前对象', '类本身', '父类', '模块'],
        answer: 1,
        explain: 'cls 是 class 的缩写，代表类本身，常用 cls(...) 来创建新对象。',
      },
      {
        type: 'judge',
        question: '@staticmethod 里通常不需要 self 参数，因为它不依赖任何具体对象。',
        answer: true,
        explain: '静态方法是纯工具，跟实例无关，所以不需要 self。',
      },
      {
        type: 'code',
        question: '补全装饰器，让 area 像属性一样被读取。',
        code: 'class Circle:\n    __________\n    def area(self):\n        return 3.14',
        answer: '@property',
        accept: ['@property '],
        explain: '@property 让方法变身属性，读取时不用加括号。'
      }
    ]
  },
  {
    id: 'inheritance',
    title: '继承：复用并扩展已有的类',
    phase: 4,
    order: 5,
    minutes: 28,
    rating: { level: 4, must: 4 },
    summary: '继承让你站在已有类的基础上，直接沿用它的方法，再加一点自己的新东西。',
    keywords: ['继承', 'inheritance', '父类', '子类', 'super', '扩展'],
    tip: '零基础提示：继承就是"照抄老模板再改改"。子类自动拥有父类的所有方法和数据，你只需写"多出来的那一部分"，超省事。',
    what: '用 class 子类名(父类名): 这样的写法，子类就自动沿用了父类的数据和方法，这就是继承。你可以在子类里加自己的新方法，也可以重写（覆盖）父类里同名的方法来改变行为。子类重写 __init__ 时，通常要调用 super().__init__(...) 让父类先把自己的准备做完。核心价值是复用已有的东西，只写变化的部分。',
    analogy: '打个比方：父类是"通用宠物"，子类是"狗狗""猫咪"。狗狗自动会所有宠物都会的事（睡觉），还多会一个汪汪叫；猫咪则多会喵喵叫。你要做的只是说清楚"狗多了什么"。',
    terms: [
      { term: 'parent class', zh: '父类', note: '被继承的类，提供通用能力' },
      { term: 'child class', zh: '子类', note: '继承父类并可能添加新东西的类，写在括号里' },
      { term: 'super', zh: '调用父类', note: 'super() 表示去调用父类里现成的代码' },
      { term: 'override', zh: '覆盖', note: '在子类写一个和父类同名的方法，替换原行为' },
      { term: 'multilevel inheritance', zh: '多层继承', note: 'class Puppy(Dog) 还能再被继承，属性和方法沿链条一路往上找。' }
    ],
    steps: [
      '写 class 子类名(父类名): 开始继承',
      '父类的方法和数据子类拿来直接用，不需要重写',
      '需要不同行为时，在子类写同名方法来做覆盖',
      '子类想重写 __init__ 时，先 super().__init__(...) 让父类做准备'
    ],
    examples: [
      {
        title: '子类直接用父类方法，还加自己的方法',
        code: `class Pet:
    def __init__(self, name):
        self.name = name

    def sleep(self):
        return self.name + " 在睡觉"

class Dog(Pet):
    def bark(self):
        return self.name + " 汪汪叫"

class Cat(Pet):
    def purr(self):
        return self.name + " 喵喵叫"

d = Dog("旺财")
c = Cat("咪咪")
print(d.sleep())
print(d.bark())
print(c.purr())`,
        output: `旺财 在睡觉
旺财 汪汪叫
咪咪 喵喵叫`,
        note: 'sleep、name 都来自父类 Pet；bark 和 purr 是各自子类新加的动作。'
      },
      {
        title: '覆盖方法并让父类先做铺垫',
        code: `class Pet:
    def __init__(self, name):
        self.name = name

    def call(self):
        return "宠物 " + self.name

class Dog(Pet):
    def __init__(self, name, legs):
        super().__init__(name)
        self.legs = legs

    def call(self):
        return self.name + " 甩着" + str(self.legs) + "条腿跑过来"

d = Dog("旺财", 4)
print(d.call())`,
        output: '旺财 甩着4条腿跑过来',
        note: '子类 Dog 覆盖了 call，并先用 super().__init__ 让父类把 name 存好。'
      }
    ],
    pitfalls: [
      {
        title: '子类重写 __init__ 后忘了初始化父类',
        bad: 'class Dog(Pet):\n    def __init__(self, name, legs):\n        self.legs = legs  # self.name 根本不存在',
        good: 'class Dog(Pet):\n    def __init__(self, name, legs):\n        super().__init__(name)\n        self.legs = legs',
        note: '子类一但自己写了 __init__，父类的准备代码不会自动跑，要用 super().__init__() 补上。'
      },
      {
        title: '以为子类只能继承、不能加方法',
        bad: '每次新种类都想把父类的东西全部重写一遍',
        good: 'class Cat(Pet):\n    def purr(self):\n        return self.name + " 喵喵叫"',
        note: '父类的方法直接用，子类还能再添加自己的专属方法。'
      },
      {
        title: '用父类名硬调用父类方法漏了 self',
        bad: 'class Dog(Pet):\n    def __init__(self, name):\n        Pet.__init__()   # 漏传 self',
        good: '    def __init__(self, name):\n        super().__init__(name)',
        note: 'super() 会自动处理对象本身；用父类名直接调用则要自己传 self，容易漏。'
      },
      {
        title: '覆盖后想用父类的原版却没辙',
        bad: 'def call(self):\n    return "宠物 " + self.name   # 把父类版本整个丢了',
        good: 'def call(self):\n    return super().call() + "，快过来！"',
        note: '覆盖后仍想复用父类逻辑，用 super().方法名() 调用父类版本再加工。'
      }
    ],
    practice: [
      {
        prompt: '让 RoboDog 继承 Pet，并加一个自己的方法 recharge 返回"充电完成"。Pet 已有的 sleep 方法直接拿来用。最后打印 r.sleep() 和 r.recharge()。',
        starter: `class Pet:
    def __init__(self, name):
        self.name = name

    def sleep(self):
        return self.name + " 睡着了"

class RoboDog(Pet):
    pass  # TODO

r = RoboDog("大毛")
print(r.sleep())
print(r.recharge())`,
        answer: `class Pet:
    def __init__(self, name):
        self.name = name

    def sleep(self):
        return self.name + " 睡着了"

class RoboDog(Pet):
    def recharge(self):
        return "充电完成"

r = RoboDog("大毛")
print(r.sleep())
print(r.recharge())`,
        output: `大毛 睡着了
充电完成`,
        hint: '在 class RoboDog(Pet): 的缩进里加一个自己的方法 recharge。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '写法 class Dog(Pet) 里括号中的 Pet 表示什么？',
        options: [
          'Dog 会复制一份 Pet',
          'Pet 是 Dog 要继承的父类',
          '括号里是一个列表',
          'Pet 会被完全替换掉'
        ],
        answer: 1,
        explain: '括号里写的是父类，Dog 会自动拥有 Pet 的方法和数据。'
      },
      {
        type: 'judge',
        question: '子类会自动拥有父类定义的方法和数据。',
        answer: true,
        explain: '这就是继承的核心：子类直接沿用父类已有的东西，还能再扩展。'
      },
      {
        type: 'code',
        question: '写一个子类 Cat 继承 Pet，让它能直接用 Pet 已有的方法。',
        code: 'class Pet:\n    def speak(self):\n        return "meow"\n\n____',
        answer: 'class Cat(Pet):\n    pass',
        accept: ['class Cat(Pet):\n    pass', "^\\s*class\\s+Cat\\s*\\(\\s*Pet\\s*\\)\\s*:*\\s*$"],
        explain: '把父类写在 class 名后面的括号里，子类就继承了父类的全部方法。'
      }
    ]
  },
  {
    id: 'polymorphism',
    title: '多态与鸭子类型：同一动作，各自表现',
    phase: 4,
    order: 6,
    minutes: 25,
    rating: { level: 4, must: 4 },
    summary: '不同类的对象调用同名方法，各干各的事：让代码不关心"你是什么"，只关心"你会什么"。',
    keywords: ['多态', '鸭子类型', '重写', '统一调用'],
    tip: '零基础提示：多态就是"同一句话，不同对象有不同反应"。对狗说"叫"是汪汪，对猫说"叫"是喵喵——调用方完全不用管对面是谁。',
    what: '子类重写父类方法后，同一句 对象.speak() 会根据对象的真实身份执行不同版本，这就是多态。Python 更进一步：不看继承关系，只要对象有这个方法就能调——这叫鸭子类型（"走起来像鸭子、叫起来像鸭子，那它就是鸭子"）。配合 for 循环统一调用，代码就不用写一堆 if 判断类型。',
    analogy: '打个比方：指挥家和乐手说"演奏你的部分"——小提琴拉弦、鼓打鼓，指挥不需要解释每件乐器怎么响；甚至来个"会演奏的"新乐器，不用彩排也能直接上台。',
    terms: [
      { term: 'polymorphism', zh: '多态', note: '同名方法在不同对象上有不同表现。' },
      { term: 'override', zh: '重写', note: '子类改写父类同名方法，调用时执行子类版本。' },
      { term: 'duck typing', zh: '鸭子类型', note: '只看对象有没有这个方法，不看重不继承。' },
      { term: 'isinstance', zh: '类型判断', note: 'isinstance(x, 类) 检查对象是否属于某个类，需要区分时才用。' }
    ],
    steps: [
      '写父类 Animal 和两个子类，各自重写 speak',
      '把它们放进同一个列表，for 循环统一调用 speak',
      '再造一个不继承任何人的类，只要它有 speak 也放进列表试试',
      '体会"不用写 if isinstance"的简洁',
      '真需要区分类型时，再用 isinstance',
    ],
    examples: [
      {
        title: '重写带来的多态',
        code: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "汪汪"

class Cat(Animal):
    def speak(self):
        return "喵喵"

for a in [Dog(), Cat()]:
    print(a.speak())`,
        output: `汪汪
喵喵`,
        note: '同一句 a.speak()，Dog 执行子类版本，Cat 执行自己的版本——这就是多态。',
      },
      {
        title: '鸭子类型：不继承也行',
        code: `class Robot:
    def speak(self):
        return "滴嘟"

for thing in [Dog(), Robot()]:
    print(thing.speak())`,
        output: `汪汪
滴嘟`,
        note: 'Robot 没继承 Animal，但有 speak 方法就能被统一调用——Python 只看"有没有这个动作"。',
      },
      {
        title: '内置函数也是多态的',
        code: `print(len("你好吗"), len([1, 2, 3]), len({"a": 1}))`,
        output: `3 3 1`,
        note: '同一个 len，对字符串数字符、对列表数元素、对字典数键值——你早就在享受多态了。',
      }
    ],
    pitfalls: [
      {
        title: '重写时参数列表不一致',
        bad: 'class Dog(Animal):\n    def speak(self, word):   # 父类 speak(self)',
        good: 'class Dog(Animal):\n    def speak(self):   # 参数要和父类对齐',
        note: '统一调用时按父类的签名传参，子类签名不一致就会报 TypeError。'
      },
      {
        title: '以为必须继承才能参与多态',
        bad: '为了能用同一个循环，硬把 Robot 继承 Animal 却什么都不写',
        good: '只要实现同名方法就能参与统一调用（鸭子类型）',
        note: 'Python 不检查血统；为了形式而继承反而让类关系变乱。'
      },
      {
        title: '调用对象没有的方法',
        bad: 'robot.fly()   # Robot 没定义 fly',
        good: '确认对象确实实现了该方法，或先 hasattr(thing, "fly")',
        note: '鸭子类型把检查推迟到运行时，调不存在的属性会 AttributeError。'
      }
    ],
    practice: [
      {
        prompt: '写 Circle 和 Square 两个类，都有 area 方法返回面积；把它们放进列表统一循环打印。',
        starter: `class Circle:
    def __init__(self, r):
        self.r = r
    # TODO: area 方法

# TODO: Square 同理
`,
        answer: `class Circle:
    def __init__(self, r):
        self.r = r

    def area(self):
        return round(3.14159 * self.r ** 2, 2)

class Square:
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

for shape in [Circle(2), Square(3)]:
    print(shape.area())`,
        output: `12.57
9`,
        hint: '两个类各自实现 area；循环只管调 area()，不关心它是圆还是方。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Dog 重写了 speak，执行 Dog().speak() 时运行的是哪个版本？',
        options: ['父类的', '子类的', '两个都执行', '随机一个'],
        answer: 1,
        explain: '重写后调用对象自己的类版本——子类覆盖父类同名方法。',
      },
      {
        type: 'judge',
        question: 'Python 里只要对象有同名方法，就能参与统一调用，不要求有继承关系。',
        answer: true,
        explain: '这就是鸭子类型：看行为不看血统。',
      },
      {
        type: 'code',
        question: '补全：检查对象 x 是否是 Dog 类的实例。',
        code: 'print(__________(x, Dog))',
        answer: 'isinstance',
        accept: [],
        explain: 'isinstance(对象, 类) 返回 True/False，真需要区分类型时用它。'
      }
    ]
  },
  {
    id: 'magic-methods',
    title: '魔法方法：str/len/eq 的故事',
    phase: 4,
    order: 7,
    minutes: 27,
    rating: { level: 4, must: 4 },
    summary: '用双下划线取名的魔法方法，让 print、len、== 这些内置动作也能读懂你的对象。',
    keywords: ['魔法方法', '__str__', '__len__', '__eq__', '神奇', '内置'],
    tip: '零基础提示：这些方法名字里外都带两个下划线，像一个"咒语"。想让打印、算长度、比大小这些现成动作认识你的对象，就在类里写上对应的咒语。哪怕现在还不想深究，先认得 __str__、__len__、__eq__ 三个就够用了。',
    what: '方法名两边各有两个下划线（如 __str__）的方法叫魔法方法，它们让对象更好地配合 Python 自带的动作。有了 __str__，print(对象) 就能打印出你想要的句子；有了 __len__，len(对象) 就能算出一个数字；有了 __eq__，用 == 比两个对象是不是相等就能按你的规则判断。它们让对象用起来像天生的数字或文本一样顺手。',
    analogy: '打个比方：魔法方法就像给插座配了万能转接头。默认的插座只认识固定形状，你写好对应的魔法方法，就能让打印机、充电器、测量仪这些"现成的工具"顺利插进来用。',
    terms: [
      { term: 'magic method', zh: '魔法方法', note: '名字两边各两个下划线、配合内置动作的特殊方法' },
      { term: '__str__', zh: '转文字', note: 'print(对象) 时调用，决定打印出来的样子' },
      { term: '__len__', zh: '算长度', note: 'len(对象) 时调用，返回一个数字' },
      { term: '__eq__', zh: '判相等', note: '用 == 比较时调用，决定两者是否相等' }
    ],
    steps: [
      '在类里写 def __str__(self):，return 让 print 显示的文本',
      '写 def __len__(self):，return 一个长度数字',
      '写 def __eq__(self, other):，return 一个真/假的判断',
      '方法名必须一字不差，括号里的变量名自己取',
      '用内置动作（print、len、==）去验证效果'
    ],
    examples: [
      {
        title: '__str__ 与 __len__ 让对象更好用',
        code: `class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return "<书：" + self.title + ">"

    def __len__(self):
        return self.pages

book = Book("童话集", 120)
print(book)
print(len(book))`,
        output: `<书：童话集>
120`,
        note: 'print(book) 走 __str__，len(book) 走 __len__，内置动作都认识了你的对象。'
      },
      {
        title: '__eq__ 让 == 按你的规则比较',
        code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)
print(p1 == p2)
print(p1 == p3)`,
        output: `True
False`,
        note: '不写 __eq__ 时 == 只会看是不是同一个对象；写了就能按横纵坐标都相同才算相等。'
      }
    ],
    pitfalls: [
      {
        title: '魔法方法名少写了一个下划线',
        bad: 'def __str_(self):\n    return "书"',
        good: 'def __str__(self):\n    return "书"',
        note: '名字必须完全叫 __str__、__len__、__eq__（左右都是两个下划线），少一个就不生效，而且多半不报错。'
      },
      {
        title: '把魔法方法想成普通随意起名的方法',
        bad: 'def print_me(self):\n    return "你好"',
        good: 'def __str__(self):\n    return "你好"',
        note: 'print、len、== 都只会认固定那一个魔法方法名，自己起个名字它们不会自动调用。'
      },
      {
        title: '__eq__ 里比完忘了 return',
        bad: 'def __eq__(self, other):\n    self.name == other.name   # 算了没交',
        good: 'def __eq__(self, other):\n    return self.name == other.name',
        note: '只写比较不写 return，方法交回 None，== 永远是 False。'
      }
    ],
    practice: [
      {
        prompt: '给 Cat 类加上 __eq__：当两只猫的名字相同时返回 True。要求 a == b 是 True，a == c 是 False。',
        starter: `class Cat:
    def __init__(self, name):
        self.name = name

# TODO: 添加 __eq__

a = Cat("咪咪")
b = Cat("咪咪")
c = Cat("旺财")
print(a == b)
print(a == c)`,
        answer: `class Cat:
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        return self.name == other.name

a = Cat("咪咪")
b = Cat("咪咪")
c = Cat("旺财")
print(a == b)
print(a == c)`,
        output: `True
False`,
        hint: '定义 def __eq__(self, other): 并在里面比较 self.name 和 other.name。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'print(对象) 会调用对象的哪个魔法方法？',
        options: ['__str__', '__len__', '__eq__', '__call__'],
        answer: 0,
        explain: 'print 会用 __str__ 拿到对象的文字描述，所以它会打印出 __str__ 返回的内容。'
      },
      {
        type: 'judge',
        question: '魔法方法名少写一个下划线（如 __str_）程序会立刻报错。',
        answer: false,
        explain: '名字不对通常只是让它不生效，并不会明显报错，因此要仔细检查方法名。'
      },
      {
        type: 'code',
        question: '补全：让 len(book) 返回页数。',
        code: 'class Book:\n    def __len__(self):\n        ________',
        answer: 'return self.pages',
        accept: [],
        explain: '写上 __len__ 魔法方法后，len(book) 会自动调用它拿到页数。'
      }
    ]
  },
  {
    id: 'magic-methods-overview',
    title: '魔法方法全景：还有哪些咒语',
    phase: 4,
    order: 8,
    minutes: 25,
    rating: { level: 4, must: 3 },
    summary: '一张表认全常见魔法方法：让对象会相加、能取元素、能放进 with，还能像函数一样被调用。',
    keywords: ['魔法方法', '__repr__', '__getitem__', '__add__', '__call__', '全景'],
    tip: '零基础提示：这一节是"认脸"课，不求全记住。先记住一张全景表，等你想让对象支持某个动作时，回来查表找到对应方法名即可。日常最常用的仍是 __str__、__len__、__eq__、__repr__ 这几个。',
    what: '上一节认识了 __str__、__len__、__eq__ 三个魔法方法。同一家族还有很多成员，规律都一样：Python 执行某个内置动作时，会自动调用对象里对应名字的方法。想让对象用 + 号相加就写 __add__，想用中括号取元素就写 __getitem__，想让对象像函数一样加括号调用就写 __call__。记住"内置动作对应方法名"这张表，你的对象就能用起来像列表、数字一样顺手。',
    analogy: '打个比方：上一节你学会了三句常用咒语，这一节是整本咒语书的目录。不用全会念，需要时翻开目录找到那一句即可。',
    terms: [
      { term: '__repr__', zh: '调试表示', note: '调试和 repr(对象) 时调用；类里没写 __str__ 时，print 也会用它' },
      { term: '__getitem__', zh: '取元素', note: '写 对象[下标] 时调用，让对象像列表一样取值' },
      { term: '__add__', zh: '相加', note: '写 对象A + 对象B 时调用' },
      { term: '__call__', zh: '可调用', note: '写 对象() 时调用，让对象能像函数一样使用' },
      { term: '__enter__', zh: '进入', note: '进入 with 代码块时调用，离开时对应 __exit__' }
    ],
    steps: [
      '浏览全景表，记住"内置动作 -> 方法名"的对应关系',
      '想支持哪个动作，就在类里写上同名的魔法方法，名字前后各两个下划线',
      '每个魔法方法都要 return 一个合适的结果：文字、数字或新对象',
      '写完后用对应的内置动作（+、中括号、with）实际跑一遍验证'
    ],
    examples: [
      {
        title: '全景表与容器协议：让对象像列表',
        code: `# 魔法方法全景表：内置动作 -> 自动调用的方法
# print(对象)        -> __str__
# repr(对象)/调试    -> __repr__
# len(对象)          -> __len__
# 对象A == 对象B     -> __eq__
# 对象A < 对象B      -> __lt__
# 对象[下标]         -> __getitem__（存元素用 __setitem__）
# 元素 in 对象       -> __contains__
# for 元素 in 对象   -> __iter__
# 对象A + 对象B      -> __add__
# with 对象:         -> __enter__ 进入 / __exit__ 离开
# 对象()             -> __call__
# if 对象:           -> __bool__
# 放进 dict/集合     -> __hash__
# 访问不存在的属性   -> __getattr__

class Bag:
    def __init__(self, items):
        self.items = list(items)

    def __len__(self):
        return len(self.items)

    def __getitem__(self, index):
        return self.items[index]

    def __contains__(self, item):
        return item in self.items

bag = Bag(["苹果", "香蕉", "梨"])
print(len(bag))
print(bag[1])
print("苹果" in bag)`,
        output: `3
香蕉
True`,
        note: 'Bag 写上 __len__、__getitem__、__contains__ 后，len、中括号、in 三个动作都认识了它。'
      },
      {
        title: '__repr__ 与 __add__：会相加的对象',
        code: `class Money:
    def __init__(self, yuan):
        self.yuan = yuan

    def __repr__(self):
        return "Money(" + str(self.yuan) + ")"

    def __add__(self, other):
        return Money(self.yuan + other.yuan)

a = Money(10)
b = Money(25)
print(a + b)
print(a)`,
        output: `Money(35)
Money(10)`,
        note: '__add__ 里返回一个新的 Money 对象；类里没写 __str__ 时，print 会改用 __repr__。'
      },
      {
        title: '__call__：让对象能像函数一样调用',
        code: `class Greeter:
    def __init__(self, name):
        self.name = name

    def __call__(self):
        return "你好，" + self.name

g = Greeter("小明")
print(g())`,
        output: `你好，小明`,
        note: '写了 __call__ 后，g() 就像调用函数；第 5 阶段 with 语句用到的 __enter__ 和 __exit__ 也是同一套道理。'
      }
    ],
    pitfalls: [
      {
        title: '__repr__ 忘了返回字符串',
        bad: 'class Money:\n    def __repr__(self):\n        return self.yuan',
        good: 'class Money:\n    def __repr__(self):\n        return "Money(" + str(self.yuan) + ")"',
        note: '__repr__ 必须返回文字，返回数字会报 TypeError: __repr__ returned non-string (type int)。'
      },
      {
        title: '__getitem__ 里错把 self.items 写成 self',
        bad: 'def __getitem__(self, index):\n    return self[index]',
        good: 'def __getitem__(self, index):\n    return self.items[index]',
        note: '取数据要用 self.items；写成 self[index] 会不停地调用自己，最后报 RecursionError。'
      },
      {
        title: '__add__ 假设右边也是同种对象',
        bad: 'Money(1) + "x"',
        good: 'Money(1) + Money(2)',
        note: '加号右边的对象没有 yuan 属性时会报 AttributeError，初学阶段先保证两边都是同一种对象。'
      }
    ],
    practice: [
      {
        prompt: '给 Playlist 补上 __len__ 和 __getitem__：让 len(p) 打印 2，p[0] 打印第一首歌名。',
        starter: `class Playlist:
    def __init__(self, songs):
        self.songs = list(songs)

# TODO: 添加 __len__ 和 __getitem__

p = Playlist(["晴天", "稻香"])
print(len(p))
print(p[0])`,
        answer: `class Playlist:
    def __init__(self, songs):
        self.songs = list(songs)

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

p = Playlist(["晴天", "稻香"])
print(len(p))
print(p[0])`,
        output: `2
晴天`,
        hint: '__len__ 返回 len(self.songs)；__getitem__ 返回 self.songs[index]。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '写 对象[0] 取元素时，Python 会自动调用哪个方法？',
        options: ['__getitem__', '__len__', '__call__', '__repr__'],
        answer: 0,
        explain: '中括号取元素对应 __getitem__，名字对上了才会被自动调用。'
      },
      {
        type: 'judge',
        question: '只要在类里写 def add(self, other):，对象就能用 + 号相加。',
        answer: false,
        explain: '+ 对应的是 __add__，前后各两个下划线，写成 add 不会被自动调用。'
      },
      {
        type: 'code',
        question: '下面代码会打印什么？',
        code: 'class Box:\n    def __getitem__(self, i):\n        return i * 2\n\nbox = Box()\nprint(box[3])',
        answer: '6',
        accept: [],
        explain: 'box[3] 触发 __getitem__，返回 3 * 2，所以打印 6。'
      }
    ]
  },
  {
    id: 'class-design',
    title: '类设计综合实战',
    phase: 4,
    order: 9,
    minutes: 30,
    rating: { level: 4, must: 4 },
    summary: '把本阶段全部招式串起来：从零设计银行账户、歌单、待办清单三个真实小系统。',
    keywords: ['类设计', '综合实战', '封装', '组合'],
    tip: '零基础提示：这一节不学新语法，专门练"设计"。拿到需求先问三个问题：要存什么数据（属性）、要做什么动作（方法）、要不要给内置动作配魔法方法。',
    what: '类设计的通用思路：先用 __init__ 定下对象出生时有哪些数据（属性），再按需求补方法（动作），最后看要不要用 __str__、__len__ 这类魔法方法让它更好用。更进一层是组合：把对象装进列表、把别的对象当属性，拼出真正的程序结构。第 8 阶段 FastAPI 的数据模型，用的就是这套思路。',
    analogy: '打个比方：设计类像规划一家小店——__init__ 是装修进货（初始状态），方法是营业项目，魔法方法是店面招牌（别人一眼看懂怎么用）；组合则是开分店。',
    terms: [
      { term: 'composition', zh: '组合', note: '把对象作为属性装进另一个对象，拼出更大的结构。' },
      { term: 'encapsulation', zh: '封装', note: '数据和操作它的方法绑在一起，外部只通过方法打交道。' },
      { term: 'state', zh: '状态', note: '对象此刻所有属性值的总称，随方法调用而变化。' },
      { term: 'PascalCase', zh: '大驼峰命名', note: '类名每个单词首字母大写，如 BankAccount、TodoList。' }
    ],
    steps: [
      '需求一：银行账户——存款、取款、余额不足要拦住',
      '需求二：歌单——能加歌、能用 len() 数、能 print 出好看的一句话',
      '需求三：待办清单——列表里装对象（组合），能加任务、标记完成、打印全部',
      '每个类写完先用两三行调用验证，再做下一个',
      '回头检查命名（大驼峰类名）、属性是否都挂在 self 上',
    ],
    examples: [
      {
        title: '银行账户：状态 + 规则校验',
        code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return "余额不足"
        self.balance -= amount
        return self.balance

acc = BankAccount("小明", 100)
acc.deposit(50)
print(acc.withdraw(30))
print(acc.withdraw(500))`,
        output: `120
余额不足`,
        note: '属性是状态，方法改变状态并守护规则（余额不足不放行）——这就是封装。',
      },
      {
        title: '歌单：用魔法方法融入内置动作',
        code: `class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

    def __str__(self):
        return f"歌单《{self.name}》共 {len(self)} 首"

p = Playlist("通勤")
p.add("晴天")
p.add("稻香")
print(p)
print(len(p))`,
        output: `歌单《通勤》共 2 首
2`,
        note: '__str__ 让 print 好看好懂，__len__ 让 len() 直接可用——内置动作都认识了你的类。',
      },
      {
        title: '待办清单：组合（列表里装对象）',
        code: `class Task:
    def __init__(self, title, done=False):
        self.title = title
        self.done = done

class TodoList:
    def __init__(self):
        self.tasks = []

    def add(self, title):
        self.tasks.append(Task(title))

    def finish(self, index):
        self.tasks[index].done = True

    def show(self):
        for i, t in enumerate(self.tasks):
            mark = "✓" if t.done else " "
            print(f"{mark} {i + 1}. {t.title}")

todo = TodoList()
todo.add("买牛奶")
todo.add("写作业")
todo.finish(0)
todo.show()`,
        output: `✓ 1. 买牛奶
  2. 写作业`,
        note: 'TodoList 里装 Task 对象——"组合"是真实程序的基本结构，第 8 阶段存数据库的就是它们。',
      }
    ],
    pitfalls: [
      {
        title: '把属性写成局部变量',
        bad: 'def deposit(self, amount):\n    balance = self.balance + amount   # 没挂 self',
        good: 'def deposit(self, amount):\n    self.balance = self.balance + amount',
        note: '不挂 self 的变量只在这一行存活，对象的状态根本没变。'
      },
      {
        title: '方法只 print 不 return',
        bad: 'def total(self):\n    print(self.value)   # 想继续算就拿不到',
        good: 'def total(self):\n    return self.value',
        note: '需要被别的代码使用的结果一律 return；print 只是给人看的调试输出。'
      },
      {
        title: '类名方法名混用小驼峰',
        bad: 'class bankAccount:   # 类名小写开头',
        good: 'class BankAccount:   # 大驼峰',
        note: '类名大驼峰（BankAccount）、方法和变量小写下划线（deposit_money）是社区铁律。'
      }
    ],
    practice: [
      {
        prompt: '给 BankAccount 加一个 @property display，返回形如 ￥120.00 的余额展示（保留两位小数），打印 acc.display。',
        starter: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    # TODO: 加 @property display，返回 "￥120.00" 这样的文字
`,
        answer: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    @property
    def display(self):
        return f"￥{self.balance:.2f}"

acc = BankAccount("小明", 120)
print(acc.display)`,
        output: `￥120.00`,
        hint: '@property + f"￥{self.balance:.2f}"：金额保留两位小数、前面加 ￥。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'TodoList 里装 Task 对象，这种"对象里装对象"的做法叫？',
        options: ['继承', '组合', '多态', '递归'],
        answer: 1,
        explain: '把对象作为另一个对象的属性（或装进它的列表）就是组合，是拼出大程序的基本手段。',
      },
      {
        type: 'judge',
        question: '类名约定用大驼峰命名，如 BankAccount、TodoList。',
        answer: true,
        explain: '类名大驼峰、函数和变量小写下划线，是 Python 社区的命名铁律。',
      },
      {
        type: 'code',
        question: '补全：让 len(歌单) 返回歌曲数量。',
        code: 'class Playlist:\n    def __________(self):\n        return len(self.songs)',
        answer: '__len__',
        accept: ['__len__ '],
        explain: '__len__ 魔法方法让 len() 内置函数直接作用于你的对象。'
      }
    ]
  }
]