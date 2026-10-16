/**
 * 第三阶段：工程基础（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'modules-imports',
    title: 'import / 模块 / 包',
    phase: 3,
    order: 1,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 4 },
    summary: '一个 .py 文件就是模块，目录加 __init__.py 就是包；掌握四种导入写法与 __main__ 保护。',
    keywords: ['import', 'from', 'module', 'package', '__init__', '__main__', '模块'],
    tip: 'Java 开发者提示：没有 package 声明，模块路径由文件位置决定；import 是"导入对象"而不是"导入类名"。',
    what: '模块就是一个 .py 文件，包是包含 __init__.py 的目录。导入有四种常见写法：import module、from module import name、import module as alias、from module import *（不推荐）。用 if __name__ == "__main__": 判断脚本是否被直接运行，这是 Python 工程里最常见的一行。',
    javaCompare: [
      {
        title: '导入方式',
        java: 'import java.util.List;   // 导入类',
        python: 'from os.path import join   # 导入的是模块里的对象（函数/类/变量）',
        diff: 'Java 导入的是"类名"，Python 导入的是模块中的任意对象；也没有包声明，靠目录结构。'
      },
      {
        title: '入口方法',
        java: 'public static void main(String[] args) { }',
        python: 'if __name__ == "__main__":\n    main()',
        diff: 'Python 没有强制入口，用 __name__ 判断当前文件是被直接运行还是被 import。'
      }
    ],
    examples: [
      {
        title: '标准库导入的几种姿势',
        code: 'import json\nimport os.path as path\nfrom datetime import datetime\n\nprint(json.dumps({"a": 1}))\nprint(path.basename("C:/data/a.txt"))\nprint(type(datetime.now()).__name__)',
        output: '{"a": 1}\na.txt\ndatetime',
        note: 'as 起别名可以避免长名字，也让 import 意图更清楚。'
      },
      {
        title: '脚本入口保护',
        code: 'def main():\n    print("作为程序运行")\n\nprint("模块被加载了")\n\nif __name__ == "__main__":\n    main()',
        output: '模块被加载了\n作为程序运行',
        note: '被别的文件 import 时，只有第一行会执行，main() 不会运行。'
      }
    ],
    pitfalls: [
      {
        title: '文件名与标准库重名',
        bad: '自己建一个 json.py 或 typing.py',
        good: '换成 my_json_utils.py 这类明确的名字',
        note: '同目录文件优先于标准库，重名会让 import json 直接导入你的文件，引发莫名其妙的错误。'
      },
      {
        title: '循环导入',
        bad: 'a.py 顶部 import b，b.py 顶部又 import a',
        good: '把公共部分抽到 c.py，或在函数内部延迟导入',
        note: '循环导入常见报 ImportError: cannot import name，通常靠抽公共模块解决。'
      },
      {
        title: '使用 from x import *',
        bad: 'from utils import *',
        good: 'from utils import load_config, call_llm',
        note: '星号导入会污染命名空间、掩盖来源，静态检查工具也会报错。'
      }
    ],
    practice: [
      {
        prompt: '导入 json 模块的 dumps 函数，打印 {"ok": true}（键值用 Python 写法）。',
        starter: '# TODO: 导入 dumps 并打印\n',
        answer: 'from json import dumps\nprint(dumps({"ok": True}))',
        output: '{"ok": true}',
        hint: 'Python 的 True 会被 json 序列化成小写 true。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'if __name__ == "__main__": 的作用是？',
        options: ['声明主函数', '判断文件是被直接运行还是被导入', '设置程序入口类', '强制初始化包'],
        answer: 1,
        explain: '直接运行时 __name__ 是 "__main__"，被导入时是模块名。'
      },
      {
        type: 'judge',
        question: 'Python 包（package）通常是一个包含 __init__.py 的目录。',
        answer: true,
        explain: '目录 + __init__.py 构成包，模块之间用点号表示层级。'
      }
    ]
  },
  {
    id: 'pip',
    title: 'pip 与依赖管理',
    phase: 3,
    order: 2,
    minutes: 8,
    rating: { python: 2, java: 2, ai: 4 },
    summary: 'pip install / list / show，以及国内镜像加速；相当于 Maven 拉包，但没有 XML。',
    keywords: ['pip', 'install', '镜像', 'uv', '依赖', 'Maven'],
    tip: 'Java 开发者提示：pip ≈ Maven 的依赖下载能力，但没有坐标体系，直接写包名和版本号。',
    what: 'pip 是 Python 官方包管理工具，命令很少：install 安装、list 查看已装包、show 看包信息、uninstall 卸载、freeze 导出当前版本。默认从 PyPI 下载，国内可加 -i 参数换镜像源加速。安装依赖永远先激活虚拟环境，避免污染全局 Python。',
    javaCompare: [
      {
        title: '依赖来源',
        java: '<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>',
        python: 'pip install fastapi==0.115.0',
        diff: 'Python 直接写分发包名和版本，不需要 groupId/artifactId，也没有约定 scope。'
      }
    ],
    examples: [
      {
        title: '安装与查看',
        code: 'pip install fastapi\npip install "httpx>=0.27"\npip show fastapi',
        output: 'Successfully installed fastapi-0.115.0 starlette-0.38.6 pydantic-2.9.2\nSuccessfully installed httpx-0.27.2\nName: fastapi\nVersion: 0.115.0\nSummary: FastAPI framework, high performance, easy to learn\nRequires: pydantic, starlette, typing-extensions',
        note: 'install 会自动带上依赖；包名不区分大小写。'
      },
      {
        title: '镜像与依赖清单',
        code: 'pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple\npip list',
        output: 'Requirement already satisfied: fastapi in ./.venv/Lib/site-packages (0.115.0)\n...\nPackage    Version\n---------- -------\nfastapi    0.115.0\nhttpx      0.27.2',
        note: '-i 指定镜像源，国内环境能明显提速；-r 按文件批量安装。'
      }
    ],
    pitfalls: [
      {
        title: '在虚拟环境外安装',
        bad: '直接在系统 Python 里 pip install 一堆包',
        good: '先激活 .venv 再安装',
        note: '全局安装会导致不同项目依赖互相冲突，且难以复原。'
      },
      {
        title: '不锁版本',
        bad: 'pip install fastapi   # 下次可能装到不兼容版本',
        good: 'pip install fastapi==0.115.0',
        note: '生产项目应把版本写进 requirements.txt，避免"昨天能跑今天报错"。'
      },
      {
        title: '包名与 import 名不同',
        bad: 'pip install python-dotenv 后用 import python-dotenv',
        good: 'pip 名 python-dotenv，import dotenv',
        note: '安装名和导入名不一定一致（如 pillow → PIL、scikit-learn → sklearn）。'
      }
    ],
    practice: [
      {
        prompt: '写一条命令：用清华镜像安装 fastapi 和 uvicorn。',
        starter: '# TODO: 写 pip 命令\n',
        answer: 'pip install fastapi uvicorn -i https://pypi.tuna.tsinghua.edu.cn/simple',
        output: 'Successfully installed fastapi-0.115.0 uvicorn-0.30.6',
        hint: '一次可以安装多个包，镜像参数放最后。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'pip 在 Python 工程中最接近 Java 的哪个工具？',
        options: ['javac', 'Maven/Gradle 的依赖下载部分', 'JVM', 'JUnit'],
        answer: 1,
        explain: 'pip 负责下载、安装、卸载第三方包，相当于依赖管理工具的下载能力。'
      },
      {
        type: 'judge',
        question: 'pip 安装的包名一定等于代码里 import 的名字。',
        answer: false,
        explain: '常见反例：python-dotenv → dotenv，pillow → PIL。'
      }
    ]
  },
  {
    id: 'venv',
    title: 'venv 虚拟环境',
    phase: 3,
    order: 3,
    minutes: 8,
    rating: { python: 2, java: 2, ai: 4 },
    summary: '每个项目一个隔离的依赖环境，等价于给每个项目配一份独立的 classpath。',
    keywords: ['venv', 'virtualenv', 'virtual environment', '隔离', 'activate'],
    tip: 'Java 开发者提示：venv 隔离的是依赖，不是 JVM；每个项目一套包，互不影响。',
    what: '虚拟环境是一份独立的 Python 运行目录（包含解释器副本和 site-packages）。每个项目建一个 .venv 目录，激活后 pip 安装的包只进这个环境。这样项目 A 用 pydantic v1、项目 B 用 pydantic v2 也不会互相破坏。',
    javaCompare: [
      {
        title: '隔离依赖',
        java: '// 每个项目在 pom.xml / build.gradle 里声明自己的依赖',
        python: 'python -m venv .venv\n.venv\\Scripts\\activate     # Windows\nsource .venv/bin/activate  # macOS / Linux',
        diff: 'Java 由构建工具下载到统一仓库并按项目解析；Python 靠每个项目自己的虚拟环境目录。'
      }
    ],
    examples: [
      {
        title: '创建与激活（Windows / macOS）',
        code: 'python -m venv .venv\n# Windows\n.venv\\Scripts\\activate\n# macOS / Linux\nsource .venv/bin/activate\npython -V\nwhere python',
        output: '(venv) C:\\proj> python -V\nPython 3.12.4\n(venv) C:\\proj> where python\nC:\\proj\\.venv\\Scripts\\python.exe',
        note: '命令行前缀出现 (venv) 就说明激活成功；where/which python 应指向项目内的解释器。'
      },
      {
        title: '退出与清理',
        code: 'deactivate\n# 想彻底重来\nrm -rf .venv && python -m venv .venv',
        output: 'C:\\proj>',
        note: '激活只是修改当前终端的 PATH，退出后回到全局环境。'
      }
    ],
    pitfalls: [
      {
        title: '把 .venv 提交到 git',
        bad: 'git add .venv',
        good: 'echo ".venv/" >> .gitignore',
        note: '虚拟环境体积大且与本机路径绑定，必须忽略；依赖靠 requirements.txt 复现。'
      },
      {
        title: '没激活就安装依赖',
        bad: 'python -m venv .venv 之后直接 pip install',
        good: '先 activate，再用 where python 确认解释器路径',
        note: '装到全局环境后，项目在别的机器上跑不起来。'
      },
      {
        title: 'Windows PowerShell 执行策略拦截',
        bad: '.venv\\Scripts\\activate 报 "无法加载文件，因为在此系统上禁止运行脚本"',
        good: 'Set-ExecutionPolicy -Scope CurrentUser RemoteSigned\n# 或直接用 .venv\\Scripts\\python.exe 调用',
        note: '也可以不激活，直接用 .venv\\Scripts\\python -m pip install 的完整路径形式。'
      }
    ],
    practice: [
      {
        prompt: '写一条命令创建名为 .venv 的虚拟环境。',
        starter: '# TODO: 创建虚拟环境\n',
        answer: 'python -m venv .venv',
        output: '',
        hint: '推荐用 python -m venv 而不是依赖全局的 virtualenv 命令。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '虚拟环境解决的核心问题是？',
        options: ['提升运行速度', '隔离项目依赖，避免版本冲突', '替代 git', '编译 Python 代码'],
        answer: 1,
        explain: '虚拟环境让每个项目拥有独立的 site-packages，互不干扰。'
      },
      {
        type: 'judge',
        question: '.venv 目录应该被提交到 Git 仓库。',
        answer: false,
        explain: '应加入 .gitignore，依赖通过 requirements.txt 描述。'
      }
    ]
  },
  {
    id: 'requirements-txt',
    title: 'requirements.txt',
    phase: 3,
    order: 4,
    minutes: 6,
    rating: { python: 1, java: 2, ai: 3 },
    summary: '用文本文件记录项目依赖与版本，别人一条命令就能复现环境。',
    keywords: ['requirements.txt', 'freeze', 'pip', 'pyproject', '版本锁定'],
    tip: 'Java 开发者提示：requirements.txt 对应 pom.xml 的依赖列表，但没有传递依赖解析与 scope 概念。',
    what: 'requirements.txt 每行写一个依赖，可用 ==、>= 约束版本。pip freeze > requirements.txt 导出当前环境的精确版本，pip install -r requirements.txt 让别人一键复现。当项目变大（要发到 PyPI 或需要构建配置）时，会转向 pyproject.toml。',
    javaCompare: [
      {
        title: '依赖清单',
        java: '<dependency>\n  <groupId>fastapi</groupId>...',
        python: 'fastapi==0.115.0\npydantic==2.9.2\nhttpx==0.27.2',
        diff: '纯文本、一行一个包，没有坐标和 scope；开发依赖常写进 requirements-dev.txt。'
      }
    ],
    examples: [
      {
        title: '生成与安装',
        code: 'pip freeze > requirements.txt\npip install -r requirements.txt',
        output: 'annotated-types==0.7.0\nanyio==4.6.2\nfastapi==0.115.0\nhttpx==0.27.2\npydantic==2.9.2\nstarlette==0.38.6\nuvicorn==0.30.6',
        note: 'freeze 会把间接依赖也导出，保证环境可复现。'
      },
      {
        title: '手写一份简洁清单',
        code: '# requirements.txt\nfastapi>=0.115,<1.0\nuvicorn[standard]==0.30.6\nhttpx>=0.27\npython-dotenv==1.0.1',
        output: '',
        note: '方括号是 extras（附加依赖组），例如 uvicorn[standard] 会带上 uvloop、websockets。'
      }
    ],
    pitfalls: [
      {
        title: '把敏感的 .env 一起提交',
        bad: 'git add requirements.txt .env',
        good: 'git add requirements.txt   # .env 写进 .gitignore',
        note: 'requirements.txt 只写依赖，API Key 放 .env 且永不入库。'
      },
      {
        title: '只在开发机 freeze，环境里混入垃圾包',
        bad: '把全局环境 freeze 出的几十个无关包都提交',
        good: '在干净的虚拟环境里安装并 freeze',
        note: '混杂的清单会让部署变慢，也容易触发版本冲突。'
      }
    ],
    practice: [
      {
        prompt: '写一条命令：把当前虚拟环境依赖导出到 requirements.txt。',
        starter: '# TODO: 导出依赖清单\n',
        answer: 'pip freeze > requirements.txt',
        output: '',
        hint: '> 是重定向，会把命令输出写入文件。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'pip install -r requirements.txt 的作用是？',
        options: ['导出依赖', '按文件批量安装依赖', '升级 pip', '删除依赖'],
        answer: 1,
        explain: '-r 表示从文件读取依赖列表并安装。'
      },
      {
        type: 'judge',
        question: 'requirements.txt 里可以用 fastapi>=0.115,<1.0 这样的范围约束。',
        answer: true,
        explain: 'pip 支持 ==、>=、<=、!=、~= 等版本约束写法。'
      }
    ]
  },
  {
    id: 'type-hints',
    title: '类型注解',
    phase: 3,
    order: 5,
    minutes: 12,
    rating: { python: 3, java: 1, ai: 5 },
    summary: '给函数和变量标注类型，运行时不做校验，但 IDE、Pydantic、FastAPI 全靠它。',
    keywords: ['type hints', '类型注解', 'Optional', 'Union', 'TypedDict', 'mypy', 'Pydantic'],
    tip: 'Java 开发者提示：注解不改变运行行为，Python 仍是动态类型；但它决定了 FastAPI 文档和 Pydantic 校验。',
    what: '类型注解写成 def f(name: str, age: int = 18) -> dict:。内置泛型从 3.9 起可以直接写 list[str]、dict[str, int]，可选类型写 str | None。注解在运行时会被保存到 __annotations__，但不会强制检查——需要 mypy/pyright 这类工具做静态检查，需要真正校验时用 Pydantic。',
    javaCompare: [
      {
        title: '函数签名',
        java: 'String greet(String name, int age) { ... }',
        python: 'def greet(name: str, age: int) -> str:\n    ...',
        diff: 'Python 注解只是"声明给工具看"，类型写错不会在运行时报错，只有静态检查工具会报警。'
      }
    ],
    examples: [
      {
        title: '函数与容器注解',
        code: 'def build_prompt(question: str, docs: list[str], max_len: int | None = None) -> str:\n    text = "\\n".join(docs)\n    return f"{text}\\n{question}"\n\nprint(build_prompt("问题", ["资料1"]))\nprint(build_prompt.__annotations__)',
        output: "资料1\n问题\n{'question': <class 'str'>, 'docs': list[str], 'max_len': int | None, 'return': <class 'str'>}",
        note: '注解在运行时确实存在，框架可以读取它们（FastAPI 就是这样生成文档和校验参数的）。'
      },
      {
        title: '给结构化数据加注解',
        code: 'from typing import TypedDict\n\nclass ChatMessage(TypedDict):\n    role: str\n    content: str\n\nmsg: ChatMessage = {"role": "user", "content": "你好"}\nprint(msg["role"], len(msg))',
        output: 'user 2',
        note: 'TypedDict 描述"固定键的字典"，写 LLM 消息结构时很常用。'
      }
    ],
    pitfalls: [
      {
        title: '以为注解会做运行时校验',
        bad: 'def add(a: int, b: int) -> int:\n    return a + b\nadd("1", "2")   # 不会报错，返回 "12"',
        good: '需要运行时校验就用 Pydantic BaseModel 或手动检查',
        note: '注解只是元数据，真正校验靠 Pydantic / beartype / FastAPI。'
      },
      {
        title: '在旧版本写 list[str]',
        bad: 'Python 3.8 里直接写 list[str] 会报 TypeError',
        good: 'from typing import List  然后 List[str]；或升级到 3.9+',
        note: '本项目按 Python 3.10+ 讲解，现代代码直接用内置泛型即可。'
      },
      {
        title: '可选参数漏掉 None',
        bad: 'def f(x: str = None)   # 类型写错，工具会报错',
        good: 'def f(x: str | None = None)',
        note: '默认值是 None 时一定要把 None 写进类型，否则 mypy/pyright 会报警告。'
      }
    ],
    practice: [
      {
        prompt: '给函数加上类型注解：接收字符串列表，返回拼接结果。',
        starter: 'def join_all(items):\n    return ",".join(items)\n\nprint(join_all(["a", "b"]))',
        answer: 'def join_all(items: list[str]) -> str:\n    return ",".join(items)\n\nprint(join_all(["a", "b"]))',
        output: 'a,b',
        hint: '参数注解写在参数名后加冒号，返回值注解写在 -> 后。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '关于 Python 类型注解，正确的是？',
        options: ['运行时会强制校验类型', '只是给工具看的元数据', '必须写否则报错', '只能在类里使用'],
        answer: 1,
        explain: '注解不影响运行，FastAPI/Pydantic 等框架会读取它做校验与文档。'
      },
      {
        type: 'judge',
        question: 'str | None 表示"字符串或 None"。',
        answer: true,
        explain: '这是 Python 3.10+ 的联合类型写法，等价于 Optional[str]。'
      },
      {
        type: 'code',
        question: '补全返回值注解，函数返回字符串。',
        code: 'def name()__________:\n    return "张三"',
        answer: '-> str',
        explain: '返回值注解固定写成 -> 类型，写在参数列表的右括号之后。'
      }
    ]
  },
  {
    id: 'dotenv',
    title: '环境变量与 .env',
    phase: 3,
    order: 6,
    minutes: 8,
    rating: { python: 2, java: 3, ai: 5 },
    summary: 'API Key、模型名、数据库地址一律走环境变量；.env 只放本地、绝不入库。',
    keywords: ['dotenv', 'python-dotenv', 'os.environ', 'getenv', 'API Key', '配置', 'pydantic-settings'],
    tip: 'Java 开发者提示：相当于 application.yml + 环境变量覆盖，但 Python 侧通常直接读 os.environ。',
    what: '配置通过环境变量注入：os.environ 是进程环境字典，os.getenv("KEY", default) 安全取值。本地开发把变量写在项目根目录的 .env 文件里，用 python-dotenv 的 load_dotenv() 载入。生产中由容器/平台注入真实环境变量，.env 必须写进 .gitignore，因为它通常存放 LLM 的 API Key。',
    javaCompare: [
      {
        title: '读取配置',
        java: '@Value("${llm.api-key}")  // 由 application.yml / 环境变量提供',
        python: 'api_key = os.getenv("LLM_API_KEY")',
        diff: 'Python 直接读进程环境，没有集中的 application.yml；需要结构化管理时用 pydantic-settings。'
      }
    ],
    examples: [
      {
        title: '读取环境变量',
        code: 'import os\n\nmodel = os.getenv("LLM_MODEL", "deepseek-chat")\nkey = os.getenv("LLM_API_KEY")\nprint(model)\nprint("已配置" if key else "未配置 API Key")',
        output: 'deepseek-chat\n未配置 API Key',
        note: '给默认值可以让本地开发不写 .env 也能跑通非关键配置。'
      },
      {
        title: '用 .env 载入本地配置',
        code: 'from dotenv import load_dotenv\nimport os\n\nload_dotenv()   # 读取项目根目录的 .env\nprint(os.getenv("LLM_MODEL"))\nprint(os.environ["LLM_API_KEY"][:6] + "****")',
        output: 'deepseek-chat\nsk-abc****',
        note: '# .env 文件内容：\n# LLM_MODEL=deepseek-chat\n# LLM_API_KEY=sk-abcdef...'
      }
    ],
    pitfalls: [
      {
        title: '把 API Key 写进代码或提交 .env',
        bad: 'client = OpenAI(api_key="sk-real-key-123")',
        good: 'client = OpenAI(api_key=os.environ["LLM_API_KEY"])',
        note: 'Key 一旦进入 git 历史就会泄露，必须立刻作废重发。'
      },
      {
        title: '用 os.environ 取不存在的键',
        bad: 'key = os.environ["LLM_API_KEY"]   # 未配置时抛 KeyError',
        good: 'key = os.getenv("LLM_API_KEY")\nif not key:\n    raise RuntimeError("请先配置 LLM_API_KEY")',
        note: '关键配置建议"显式取 + 明确报错"，避免后面出现难查的 401。'
      },
      {
        title: '.env 位置与加载时机',
        bad: 'load_dotenv() 写在某个函数内部，且 .env 放错目录',
        good: '在程序入口（main.py 顶部）第一时间 load_dotenv()',
        note: 'load_dotenv 默认从当前工作目录向上找 .env，启动目录不同会读不到。'
      }
    ],
    practice: [
      {
        prompt: '用 getenv 读取 OPENAI_BASE_URL，未配置时使用 https://api.deepseek.com，并打印结果。',
        starter: 'import os\n# TODO: 读取并打印\n',
        answer: 'import os\nprint(os.getenv("OPENAI_BASE_URL", "https://api.deepseek.com"))',
        output: 'https://api.deepseek.com',
        hint: 'os.getenv(key, default) 的第二个参数是缺省值。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '.env 文件在项目里应该怎么处理？',
        options: ['提交到仓库方便同事', '加入 .gitignore，只留 .env.example', '编译进打包产物', '写进 requirements.txt'],
        answer: 1,
        explain: '.env 通常包含密钥，必须忽略；提供 .env.example 说明需要哪些变量。'
      },
      {
        type: 'judge',
        question: 'os.environ["KEY"] 在变量不存在时会抛 KeyError。',
        answer: true,
        explain: '想安全取值用 os.getenv("KEY")，它返回 None 而不是抛异常。'
      }
    ]
  }
]
