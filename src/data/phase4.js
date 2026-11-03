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
      { term: 'object', zh: '对象', note: '在运行程序时真实存在、能装数据的那个东西' }
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
      { term: 'attribute', zh: '属性', note: '挂在对象上、跟着对象一起存取的数据' }
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
      { term: 'return', zh: '返回', note: '方法干完活后把结果交给调用它的那一行' }
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
      }
    ]
  },
  {
    id: 'inheritance',
    title: '继承：复用并扩展已有的类',
    phase: 4,
    order: 4,
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
      { term: 'override', zh: '覆盖', note: '在子类写一个和父类同名的方法，替换原行为' }
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
    id: 'magic-methods',
    title: '魔法方法：str/len/eq 的故事',
    phase: 4,
    order: 5,
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
      }
    ]
  }
]