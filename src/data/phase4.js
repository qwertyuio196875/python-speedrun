/**
 * 第四阶段：Python OOP（约 40 分钟）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'class-basics',
    title: 'class 与对象',
    phase: 4,
    order: 1,
    minutes: 14,
    rating: { python: 2, java: 1, ai: 4 },
    summary: '用 class 定义类型，属性直接赋值不用声明；比 Java 少一半样板代码。',
    keywords: ['class', 'object', '实例', '属性', '方法', 'POJO', 'dataclass'],
    tip: 'Java 开发者提示：没有 private/public 关键字，也没有 getter/setter 强制要求，字段直接访问。',
    what: 'class 定义类型，类里可以写方法和属性。Python 没有访问修饰符，约定用下划线开头表示"内部使用"（_name）。属性不需要提前声明，在 __init__ 里直接赋值即可，因此写一个数据类非常短；真要更省事可以用 @dataclass 自动生成 __init__ 和 __repr__。',
    javaCompare: [
      {
        title: '定义一个数据类',
        java: 'public class User {\n    private final String name;\n    private final int age;\n    public User(String name, int age) { this.name = name; this.age = age; }\n    public String getName() { return name; }\n}',
        python: 'class User:\n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age\n\nu = User("张三", 20)\nprint(u.name)',
        diff: '不需要字段声明、getter；字段公开访问，__init__ 就是构造方法。'
      }
    ],
    examples: [
      {
        title: '类、方法与实例',
        code: 'class ChatSession:\n    model = "deepseek-chat"          # 类属性，所有实例共享\n\n    def __init__(self, user_id):\n        self.user_id = user_id       # 实例属性\n        self.messages = []\n\n    def add(self, role, content):\n        self.messages.append({"role": role, "content": content})\n        return len(self.messages)\n\ns = ChatSession("u-1")\nprint(s.add("user", "你好"))\nprint(s.messages, s.model)',
        output: "[{'role': 'user', 'content': '你好'}]\n1 deepseek-chat",
        note: '这就是 Agent / RAG 项目里会话对象的最小形态。'
      },
      {
        title: 'dataclass 少写样板',
        code: 'from dataclasses import dataclass, field\n\n@dataclass\nclass Doc:\n    text: str\n    score: float = 0.0\n    tags: list[str] = field(default_factory=list)\n\nd = Doc("FastAPI 教程")\nprint(d)\nprint(d == Doc("FastAPI 教程"))',
        output: "Doc(text='FastAPI 教程', score=0.0, tags=[])\nTrue",
        note: 'dataclass 自动生成 __init__、__repr__、__eq__，相当于 Lombok 的 @Data。'
      }
    ],
    pitfalls: [
      {
        title: '把可变对象写成类属性',
        bad: 'class S:\n    messages = []   # 所有实例共享同一个列表',
        good: 'class S:\n    def __init__(self):\n        self.messages = []',
        note: '类属性属于类本身，所有实例都能看到并修改同一个对象。'
      },
      {
        title: '以为下划线是私有',
        bad: 'obj._secret   # 其实照样能访问',
        good: '# 双下划线 __name 会做名字改写（name mangling），但依然不是真私有',
        note: '下划线只是约定，Python 不做访问控制。'
      }
    ],
    practice: [
      {
        prompt: '定义一个类 Tool，__init__ 接收 name，方法 run 返回 f"{name} 已执行"。',
        starter: 'class Tool:\n    # TODO\n    pass\n\nprint(Tool("搜索").run())',
        answer: 'class Tool:\n    def __init__(self, name):\n        self.name = name\n\n    def run(self):\n        return f"{self.name} 已执行"\n\nprint(Tool("搜索").run())',
        output: '搜索 已执行',
        hint: '方法第一个参数必须是 self。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 中表示"内部使用"的约定是？',
        options: ['private 关键字', '下划线开头的命名', 'final 关键字', 'package-private'],
        answer: 1,
        explain: 'Python 没有访问修饰符，用前导下划线表达"不要从外部依赖它"。'
      },
      {
        type: 'judge',
        question: 'Python 类的实例属性必须在 class 里提前声明。',
        answer: false,
        explain: '属性可以直接在 __init__ 或其他方法里赋值创建。'
      }
    ]
  },
  {
    id: 'self-init',
    title: 'self / __init__ / 实例属性',
    phase: 4,
    order: 2,
    minutes: 12,
    rating: { python: 3, java: 2, ai: 4 },
    summary: 'self 就是 Java 的 this，但必须显式写在参数里；__init__ 是构造方法。',
    keywords: ['self', 'this', '__init__', '实例属性', '构造方法', '实例方法'],
    tip: 'Java 开发者提示：self 不是关键字而是习惯命名，是实例方法的第一个参数，由解释器自动传入。',
    what: '实例方法定义的第一个参数固定是 self（名字可以改，但没人这么干），调用 obj.method(x) 时解释器会把它翻译成 Class.method(obj, x)。__init__ 是初始化方法，在对象创建后自动调用，用来设置实例属性。类方法（@classmethod）和静态方法（@staticmethod）分别用 cls 和无参数形式。',
    javaCompare: [
      {
        title: '字段访问',
        java: 'public String describe() { return this.name + "-" + this.version; }',
        python: 'def describe(self):\n    return f"{self.name}-{self.version}"',
        diff: 'Python 里必须写 self. 才能访问实例属性，漏写就会变成局部变量或直接在类的作用域里找不到名字。'
      }
    ],
    examples: [
      {
        title: 'self 与实例属性',
        code: 'class LLMClient:\n    def __init__(self, api_key, model="deepseek-chat"):\n        self.api_key = api_key\n        self.model = model\n        self.calls = 0\n\n    def chat(self, message):\n        self.calls += 1\n        return {"model": self.model, "message": message, "calls": self.calls}\n\nc = LLMClient("sk-1")\nprint(c.chat("你好"))\nprint(c.chat("再见"))',
        output: "{'model': 'deepseek-chat', 'message': '你好', 'calls': 1}\n{'model': 'deepseek-chat', 'message': '再见', 'calls': 2}",
        note: '每次调用都修改 self.calls，状态保存在实例上，和 Java 字段完全一致。'
      },
      {
        title: '类方法与静态方法',
        code: 'class Config:\n    defaults = {"temperature": 0.7}\n\n    @classmethod\n    def from_dict(cls, data):\n        obj = cls()\n        obj.defaults = {**cls.defaults, **data}\n        return obj\n\n    @staticmethod\n    def describe(name):\n        return f"配置 {name}"\n\nprint(Config.from_dict({"temperature": 0}).defaults)\nprint(Config.describe("prod"))',
        output: "{'temperature': 0}\n配置 prod",
        note: 'classmethod 常用于"工厂方法"（如 from_env、from_json），staticmethod 相当于纯函数挂在类里。'
      }
    ],
    pitfalls: [
      {
        title: '方法忘记写 self',
        bad: 'class A:\n    def f():\n        return 1\nA().f()   # TypeError: f() takes 0 positional arguments but 1 was given',
        good: 'def f(self):\n    return 1',
        note: '报错信息里的 "but 1 was given" 指的就是被自动传入的实例本身。'
      },
      {
        title: '局部变量没赋值给 self',
        bad: 'def __init__(self, x):\n    x = x   # 只改了局部变量',
        good: 'def __init__(self, x):\n    self.x = x',
        note: '属性必须显式挂到 self 上，之后才能通过对象访问。'
      }
    ],
    practice: [
      {
        prompt: '补全 __init__，把传入的 name 保存为实例属性，并让 info() 返回 f"工具:{name}"。',
        starter: 'class Tool:\n    def __init__(self, name):\n        # TODO\n        pass\n\n    def info(self):\n        return f"工具:{self.name}"\n\nprint(Tool("检索").info())',
        answer: 'class Tool:\n    def __init__(self, name):\n        self.name = name\n\n    def info(self):\n        return f"工具:{self.name}"\n\nprint(Tool("检索").info())',
        output: '工具:检索',
        hint: '写 self.name = name。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'self 在 Python 中是什么？',
        options: ['关键字', '实例方法的第一个参数（习惯名，可由解释器自动传入）', '类型注解', '模块级变量'],
        answer: 1,
        explain: 'self 是普通参数名，约定俗成；obj.f() 等价于 Class.f(obj)。'
      },
      {
        type: 'judge',
        question: '@staticmethod 定义的方法第一个参数需要写 self。',
        answer: false,
        explain: '静态方法不接收 self 或 cls，和普通函数一样。'
      }
    ]
  },
  {
    id: 'inheritance',
    title: '继承与多态',
    phase: 4,
    order: 3,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 3 },
    summary: 'class A(B) 继承、super() 调用父类、鸭子类型让多态不需要接口声明。',
    keywords: ['继承', 'inheritance', 'super', 'override', '多态', 'ABC', 'Protocol', '鸭子类型'],
    tip: 'Java 开发者提示：Python 没有 implements，只要对象"有这个方法"就能用（鸭子类型）；要显式约束可用 ABC 或 Protocol。',
    what: '继承写在类名后的括号里：class Dog(Animal)。子类用 super().__init__() 调父类构造。方法重名即覆盖，没有 @Override 注解（可以用 typing.override 做静态检查）。Python 的多态不依赖接口声明，只看对象提供什么方法，这就是鸭子类型；需要强制子类实现时用 abc.ABC + @abstractmethod。',
    javaCompare: [
      {
        title: '继承与调用父类',
        java: 'class Retriever extends Tool {\n    Retriever(String name) { super(name); }\n}',
        python: 'class Retriever(Tool):\n    def __init__(self, name):\n        super().__init__(name)',
        diff: '用括号表示继承，构造函数用 __init__，父类调用统一写 super()。'
      },
      {
        title: '抽象方法',
        java: 'public abstract class Tool { abstract String run(); }',
        python: 'from abc import ABC, abstractmethod\n\nclass Tool(ABC):\n    @abstractmethod\n    def run(self) -> str: ...',
        diff: '抽象约束靠 ABC + 装饰器，实例化未实现抽象方法的子类会抛 TypeError。'
      }
    ],
    examples: [
      {
        title: '继承与覆盖',
        code: 'class Tool:\n    def __init__(self, name):\n        self.name = name\n\n    def run(self, arg):\n        return f"{self.name} 处理 {arg}"\n\nclass SearchTool(Tool):\n    def run(self, arg):\n        result = super().run(arg)\n        return result + " -> 返回 3 条结果"\n\nprint(SearchTool("搜索").run("天气"))',
        output: '搜索 处理 天气 -> 返回 3 条结果',
        note: 'super().run(arg) 让子类复用父类逻辑后再扩展，是包装工具的标准写法。'
      },
      {
        title: '鸭子类型与 isinstance',
        code: 'class CalcTool:\n    def run(self, arg):\n        return str(eval(arg))\n\ndef execute(tool, arg):\n    return tool.run(arg)      # 不检查类型，只要有 run 方法即可\n\nprint(execute(CalcTool(), "1 + 2"))\nprint(isinstance(CalcTool(), object))',
        output: '3\nTrue',
        note: '所有类都隐式继承 object，所以 isinstance(x, object) 恒为真。'
      }
    ],
    pitfalls: [
      {
        title: '忘记调用父类构造',
        bad: 'class T(Tool):\n    def __init__(self, name, extra):\n        self.extra = extra   # self.name 不存在',
        good: 'def __init__(self, name, extra):\n    super().__init__(name)\n    self.extra = extra',
        note: '子类覆盖 __init__ 时必须自己调 super().__init__()。'
      },
      {
        title: '多重继承的 MRO 混乱',
        bad: 'class C(A, B) 里两边都有同名方法，凭直觉认为一定用 A 的',
        good: 'C.mro() 查看解析顺序，或用组合代替多重继承',
        note: 'Python 用 C3 线性化决定方法查找顺序，多重继承要谨慎。'
      },
      {
        title: '改父类属性影响所有子类',
        bad: 'Tool.timeout = 5   # 影响所有实例',
        good: '在实例上设置 self.timeout = 5',
        note: '类属性是共享的，热更新配置时要改实例属性或专门的配置对象。'
      }
    ],
    practice: [
      {
        prompt: '定义 BaseTool.run 返回 "base"，子类 Echo.run 先调用父类再拼接 " echo"，打印结果。',
        starter: 'class BaseTool:\n    def run(self):\n        return "base"\n\nclass Echo(BaseTool):\n    # TODO\n    pass\n\nprint(Echo().run())',
        answer: 'class BaseTool:\n    def run(self):\n        return "base"\n\nclass Echo(BaseTool):\n    def run(self):\n        return super().run() + " echo"\n\nprint(Echo().run())',
        output: 'base echo',
        hint: '在子类方法里用 super().run() 复用父类实现。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 中调用父类方法的标准写法是？',
        options: ['parent.method()', 'super().method()', 'base.method()', 'this.parent.method()'],
        answer: 1,
        explain: 'super() 返回父类代理对象，配合 MRO 正确解析方法。'
      },
      {
        type: 'judge',
        question: 'Python 的对象必须显式实现某个接口才能被当作该接口使用。',
        answer: false,
        explain: 'Python 采用鸭子类型：只要有对应方法就能用，接口约束需要 ABC/Protocol 额外声明。'
      }
    ]
  }
]
