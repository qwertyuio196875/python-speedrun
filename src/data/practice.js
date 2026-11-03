/**
 * 综合实战
 * 主线（steps）：零基础能用标准库做出的"待办清单 + 纪念日换算"命令行小工具。
 * 进阶（advanced）：选修，把能力包成 Web 接口并连上大模型，需要先学完主线。
 * 内容规范见 docs/content-schema.md
 */
export default {
  id: 'practice',
  title: '综合实战：做一个待办清单小工具',
  subtitle: '把你前面学到的基础，串起来做成第一个能真正用上的命令行小项目。',
  goal: '用纯标准库写一个 "番茄钟 + 待办清单" 的命令行小工具：能加待办、标记完成、查看列表、保存到文件，还能算两个日期的天数差。',
  stack: ['Python 标准库', '列表', '字典', '循环', '函数', '文件读写', 'json', 'datetime', 'input'],
  minutes: 150,
  acceptance: [
    '能新增、列出、标记完成、删除待办',
    '待办数据保存到文件，下次运行还在',
    '能计算"某天离今天还有多少天"',
    '能逐行解释自己每段代码在做什么',
  ],
  steps: [
    {
      id: 'p1',
      step: 1,
      title: '准备工作区',
      goal: '建一个干净的目录，确认 python 能跑，准备一个能长期存放数据的文件。',
      minutes: 10,
      tasks: [
        '新建目录 my-todo（放你自己项目的文件夹）',
        '在里面建 main.py 作为入口文件',
        '在终端用 python --version 确认版本在 3.10 以上',
        '想好吃什么存数据：一个叫 todos.json 的文件',
      ],
      snippets: [
        {
          title: '在终端确认环境',
          code: 'mkdir my-todo\ncd my-todo\nnotepad main.py   # 或用 VS Code 打开\n\npython --version',
          output: '',
          note: '以后每次练习都在 my-todo 里做，保持文件集中。',
        },
      ],
      check: 'my-todo 里有了 main.py，终端能打印出 Python 版本。',
    },
    {
      id: 'p2',
      step: 2,
      title: '用一个列表存放待办',
      goal: '定义一个待办的"样子"，用一个列表把每件事存起来。',
      minutes: 15,
      tasks: [
        '规定一条待办就是一个字典：{"title": 文字, "done": 真假}',
        '用一个列表 todo_list 保存所有待办',
        '写一个函数 add_todo(title) 往列表里加一条',
        '写一个函数 show_list() 把列表打印成 1. [x] 内容 的格式',
      ],
      snippets: [
        {
          title: 'main.py（第一步代码）',
          code: 'todo_list = []\n\n\ndef add_todo(title):\n    """加一条待办。"""\n    todo_list.append({"title": title, "done": False})\n\n\ndef show_list():\n    """把待办按编号打印出来。"""\n    for i, item in enumerate(todo_list):\n        mark = "x" if item["done"] else " "\n        print(f"{i + 1}. [{mark}] {item["title"]}")\n\n\nadd_todo("写作业")\nadd_todo("买菜")\nshow_list()',
          output: '1. [ ] 写作业\n2. [ ] 买菜',
          note: '用 enumerate 带编号，用字典保存"标题 + 是否完成"两条信息。',
        },
      ],
      check: '运行 main.py 能按编号打印两条待办。',
    },
    {
      id: 'p3',
      step: 3,
      title: '交互输入：让用户来操作',
      goal: '用循环 + input 做一个菜单，让用户自己输入命令来增删改查。',
      minutes: 20,
      tasks: [
        '写一个菜单："1 添加 2 标记完成 3 显示 4 退出"',
        '用 while True 循环一直显示菜单直到用户按退出',
        '用 input 读取用户选择，用 if 分派到不同功能',
        '用 int() 把输入转成数字，处理用户输入非法的情况',
      ],
      snippets: [
        {
          title: '菜单循环（核心片段）',
          code: 'def run():\n    while True:\n        choice = input("选一个：1添加 2完成 3显示 4退出 > ")\n        if choice == "1":\n            title = input("待办内容：").strip()\n            add_todo(title)\n        elif choice == "2":\n            n = int(input("第几号完成？").strip())\n            todo_list[n - 1]["done"] = True\n        elif choice == "3":\n            show_list()\n        elif choice == "4":\n            print("再见！")\n            break\n        else:\n            print("看不懂，重新选")',
          output: '',
          note: 'while True 让程序一直跑，用户选 4 用 break 退出。',
        },
      ],
      check: '运行后能反复选 1/2/3/4 完成一个完整的增删查流程。',
    },
    {
      id: 'p4',
      step: 4,
      title: '处理"第几号"越界',
      goal: '用户输入的数字可能超出列表范围，学会用 try/except 和 if 做好防御。',
      minutes: 15,
      tasks: [
        '标完成前先判断 n 是否在范围内',
        '用 try/except 接住用户输入"不是数字"的报错',
        '把"第几号"输入也包一层防御',
      ],
      snippets: [
        {
          title: '带防御的标记完成',
          code: 'def mark_done(n):\n    """把第 n 号（从 1 数）标记为完成。"""\n    if n < 1 or n > len(todo_list):\n        print(f"没有第 {n} 号，共 {len(todo_list)} 条")\n        return\n    todo_list[n - 1]["done"] = True\n\n\n# 在 run 里调用时\nn = int(input("第几号完成？").strip())\nmark_done(n)',
          output: '',
          note: '先判断范围再操作，输入越界就友好提示而不是崩掉。',
        },
      ],
      check: '输入超范围数字或"abc"不会让程序崩掉。',
    },
    {
      id: 'p5',
      step: 5,
      title: '保存到文件，下次还在',
      goal: '用 json 把待办列表保存到 todos.json，启动时读回来，数据不丢。',
      minutes: 25,
      tasks: [
        '退出前把 todo_list 用 json.dump 写到 todos.json',
        '启动时若文件存在就用 json.load 读回 todo_list',
        '处理文件不存在、内容损坏的异常',
        '写进 .gitignore 避免误提交（可选，但建议）',
      ],
      snippets: [
        {
          title: '加载与保存',
          code: 'import json\nimport os\n\nTODOS_FILE = "todos.json"\n\n\ndef load_todos():\n    """启动时从文件读回待办；文件不存在就返回空列表。"""\n    if os.path.exists(TODOS_FILE):\n        with open(TODOS_FILE, encoding="utf-8") as f:\n            return json.load(f)\n    return []\n\n\ndef save_todos():\n    """把待办列表写回文件。"""\n    with open(TODOS_FILE, "w", encoding="utf-8") as f:\n        json.dump(todo_list, f, ensure_ascii=False, indent=2)',
          output: '',
          note: 'with 自动关文件；ensure_ascii=False 保证中文按原样保存；indent=2 让文件可读。',
        },
        {
          title: '在 run() 里接上',
          code: '# 函数外用全局：\ntodo_list = load_todos()\n\n# 退出前调用：\n# （在 choice == "4" 的分支里，break 前）\nsave_todos()',
          output: '',
          note: '每次操作完手动 save 也行，但退出前 save 一次最简单可靠。',
        },
      ],
      check: '加几条待办、退出程序、再运行，待办还在。',
    },
    {
      id: 'p6',
      step: 6,
      title: '加一个"纪念日倒计时"',
      goal: '用 datetime 计算"某天距离今天还有多少天"，把日期处理串进来。',
      minutes: 20,
      tasks: [
        '用 datetime 拿到今天的日期',
        '让用户输入一个目标日期（如 2027-01-01）',
        '算出目标日期和今天差多少天并打印',
        '处理用户日期格式输错的情况',
      ],
      snippets: [
        {
          title: '倒计时函数',
          code: 'from datetime import datetime\n\n\ndef countdown(date_text):\n    """输入 2027-01-01 格式，返回还有多少天。"""\n    target = datetime.strptime(date_text, "%Y-%m-%d")\n    today = datetime.now()\n    delta = (target - today).days\n    return delta\n\n\n# 用法\nprint("距离目标还有", countdown("2027-01-01"), "天")',
          output: '距离目标还有 59 天',
          note: 'strptime 把文字转成日期，"%Y-%m-%d" 对应该格式；相减得到时间差取 .days。',
        },
      ],
      check: '输入一个合法日期能算出天数差；输错格式会得到友好提示。',
    },
    {
      id: 'p7',
      step: 7,
      title: '重组代码，加个功能菜单',
      goal: '把"添加/完成/显示/倒计时"都变成菜单项，让程序更好用。',
      minutes: 20,
      tasks: [
        '把倒计时也加进主菜单，做成一个选项',
        '把 add_todo / show_list / mark_done / countdown 整理到函数里',
        '保证整个程序入口是 run()',
      ],
      snippets: [
        {
          title: '完整入口骨架',
          code: 'def main():\n    while True:\n        print("\\n1 添加待办  2 标记完成  3 显示  4 倒计时  5 退出")\n        choice = input("> ").strip()\n        if choice == "1":\n            add_todo(input("内容：").strip())\n        elif choice == "2":\n            mark_done(int(input("第几号：")))\n        elif choice == "3":\n            show_list()\n        elif choice == "4":\n            print("还有", countdown(input("目标日期(2027-01-01)：")), "天")\n        elif choice == "5":\n            save_todos()\n            print("已保存，再见！")\n            break\n        else:\n            print("请选 1~5")',
          output: '',
          note: '把每个功能收敛到函数，main 只负责菜单和调用，好读也好改。',
        },
      ],
      check: '菜单能覆盖所有功能，程序结构清晰。',
    },
    {
      id: 'p8',
      step: 8,
      title: '测试并交付',
      goal: '完整跑一遍：添加、完成、倒计时、保存、重启，确认一切正常后收尾。',
      minutes: 15,
      tasks: [
        '从头到尾完整操作一遍所有功能',
        '重启程序确认数据还在',
        '给自己写一个简短的 README 说明怎么用',
        '总结：这个项目用到了本课程哪些知识点',
      ],
      snippets: [
        {
          title: '最终验证清单',
          code: '# 1. 运行 python main.py\n# 2. 添加 2 条待办\n# 3. 把第 1 条标完成\n# 4. 查看列表，确认 [x] 出现\n# 5. 算一个日期的倒计时\n# 6. 退出，再运行，确认数据还在',
          output: '',
          note: '数据能跨重启保存，说明文件读写、json、异常处理这几个点你都真正会用了。',
        },
      ],
      check: '功能全部正常，README 写好，你能讲清楚每段代码的用途。',
    },
  ],
  advanced: {
    id: 'advanced',
    title: '进阶选修：把待办清单变成 Web 接口',
    subtitle: '需要先做完上面的主线实战。用 FastAPI 把"新增待办、查待办"包成 HTTP 接口，为日后调用大模型服务打基础。',
    goal: '在本机安装 fastapi 和 uvicorn，把"查看待办、新增待办"写成两个 GET/POST 接口，能通过浏览器 /docs 和用 requests 调用。',
    stack: ['FastAPI', 'uvicorn', 'requests', 'Pydantic', 'HTTP', 'pip'],
    minutes: 120,
    acceptance: [
      'uvicorn 能启动 FastAPI 服务',
      'GET /todos 返回待办列表',
      'POST /todos 能新增一条待办',
      'requests 脚本能调用自己的接口',
    ],
    steps: [
      {
        id: 'a1',
        step: 1,
        title: '创建项目并安装依赖',
        goal: '为你的 Web 服务建独立环境，装好 fastapi 和 uvicorn。',
        minutes: 15,
        tasks: [
          '用 python -m venv .venv 建虚拟环境',
          '激活它（Windows: .venv\\Scripts\\activate）',
          '装 fastapi 与 uvicorn[standard]',
          '把依赖写进 requirements.txt',
        ],
        snippets: [
          {
            title: '安装依赖',
            code: 'python -m venv .venv\n\n# Windows PowerShell:\n.venv\\Scripts\\activate\n\npip install "fastapi" "uvicorn[standard]"',
            output: 'Successfully installed fastapi-0.115 uvicorn-0.30 pydantic-2.9',
            note: '虚拟环境隔离依赖；激活后命令行前面会出现 (.venv)。',
          },
        ],
        check: 'pip list 能看到 fastapi 和 uvicorn。',
      },
      {
        id: 'a2',
        step: 2,
        title: '写第一个接口',
        goal: '写一个最小 FastAPI 应用，让你访问 / 看到你好。',
        minutes: 15,
        tasks: [
          '新建 main.py',
          'import FastAPI，创建 app',
          '写一个 GET / 路由返回 {"hello": "world"}',
          '用 uvicorn 启动并访问',
        ],
        snippets: [
          {
            title: 'main.py',
            code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get("/")\ndef root():\n    """访问根路径返回一句话。"""\n    return {"hello": "world"}',
            output: '',
            note: '装饰器 @app.get("/") 把函数和网址绑定，返回 dict 会自动变 JSON。',
          },
          {
            title: '启动',
            code: 'uvicorn main:app --reload\n# 浏览器打开 http://127.0.0.1:8000/',
            output: 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)',
            note: '--reload 让改代码自动重启，开发很方便。',
          },
        ],
        check: '浏览器访问 http://127.0.0.1:8000/ 看到 {"hello":"world"}。',
      },
      {
        id: 'a3',
        step: 3,
        title: '写 GET /todos',
        goal: '把主线里的待办列表变成接口，谁访问都能拿到。',
        minutes: 20,
        tasks: [
          '定义一个全局 todo_list（可以从之前项目复制）',
          '写 GET /todos 返回这个列表',
          '用浏览器访问 /todos 确认返回列表',
        ],
        snippets: [
          {
            title: 'GET /todos',
            code: '@app.get("/todos")\ndef list_todos():\n    """返回全部待办。"""\n    return {"todos": todo_list}',
            output: '',
            note: '返回包裹在 "todos" 键里，方便后续扩展别的返回字段。',
          },
        ],
        check: '访问 /todos 返回 {"todos": [...]}。',
      },
      {
        id: 'a4',
        step: 4,
        title: '写 POST /todos 新增',
        goal: '用 Pydantic 规定请求体格式，接收前端发来的新待办。',
        minutes: 25,
        tasks: [
          '用 Pydantic 的 BaseModel 定义 TodoIn（title: str）',
          '写 POST /todos 接收它，加到 todo_list',
          '返回新增成功信息',
          '用 /docs 的 Try it out 或 curl 测一下',
        ],
        snippets: [
          {
            title: 'POST /todos',
            code: 'from pydantic import BaseModel\n\n\nclass TodoIn(BaseModel):\n    """请求体：新增待办需要的内容。"""\n    title: str\n\n\n@app.post("/todos")\ndef add_todo(item: TodoIn):\n    """接收新待办并加入列表。"""\n    todo_list.append({"title": item.title, "done": False})\n    return {"ok": True, "todos": todo_list}',
            output: '',
            note: '参数类型是 BaseModel 时，FastAPI 会自动解析并校验请求体 JSON，缺字段返回 422。',
          },
          {
            title: '用 requests 测试',
            code: 'import requests\n\nresp = requests.post("http://127.0.0.1:8000/todos", json={"title": "学 requests"})\nprint(resp.status_code, resp.json())',
            output: "200 {'ok': True, 'todos': [{'title': '学 requests', 'done': False}]}",
            note: 'requests 是测试和调用 HTTP 接口最常用的客户端，json= 参数自动转成 JSON 发出去。',
          },
        ],
        check: 'POST /todos 能新增，requests 脚本能拿到新列表。',
      },
      {
        id: 'a5',
        step: 5,
        title: '收尾：联调 doc 并总结',
        goal: '在 /docs 完整走一遍两个接口，确认前后端这一环通了。',
        minutes: 15,
        tasks: [
          '打开 http://127.0.0.1:8000/docs 看自动生成的文档',
          '用 Try it out 各测一次 GET 和 POST',
          '用一段 requests 脚本完整走"加一条然后查列表"',
          '总结 Web 接口的请求/响应分别是什么',
        ],
        snippets: [
          {
            title: '端到端脚本',
            code: 'import requests\n\nbase = "http://127.0.0.1:8000"\nrequests.post(base + "/todos", json={"title": "买个番茄钟"})\nresp = requests.get(base + "/todos")\nprint(resp.json())',
            output: "{'todos': [{'title': '买个番茄钟', 'done': False}]}",
            note: 'POST 用于"告诉服务器加一条"，GET 用于"从服务器拿数据"，这就是 HTTP 基础。',
          },
        ],
        check: '/docs 上两个接口都成功；你能讲清 GET 与 POST 的区别。',
      },
    ],
    acceptance: [
      'FastAPI 能启动并返回 JSON',
      'GET /todos 和 POST /todos 都可用',
      '能理解"请求体、响应、端口、状态码"的含义',
      'requests 脚本能调用自己的接口',
    ],
  },
}