/**
 * 第八阶段：网络请求与用代码写一个能联网的小服务（选修）
 * 面向零基础、但有前置学习顺序的进阶内容，为后面调用大模型接口打基础。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'requests-http',
    title: 'requests：让程序去访问网页',
    phase: 8,
    order: 1,
    minutes: 25,
    rating: { level: 4, must: 4 },
    summary: '用 requests 库让你的程序像浏览器一样去访问网页，并读懂返回的"状态码"。',
    keywords: ['requests', 'GET', '响应', '状态码', '200', '网页'],
    tip: '零基础提示：这条放前面先学"怎么把网上的内容拉回程序里"，后面才能理解"大模型接口其实就是返回 JSON 的网页"。',
    what: '浏览器打开网址时会向服务器发一个 GET 请求，服务器把网页内容发回来。用 Python 的 requests 库，可以让你写的程序代替浏览器去发同一个请求，并把返回内容拿到手里。返回结果里最要紧的是 status_code（状态码）：200 表示"一切正常，你要的东西我给了"。你会先学会 GET 的基础用法，以及怎么读取返回的文本和 JSON。',
    analogy: '打个比方：你打电话点外卖要菜单，这就是 GET 请求；外卖小哥回你"好的，菜单发你"就是状态码 200，菜单正文就是响应内容。你的程序就是那个打电话的人。',
    terms: [
      { term: 'request', zh: '请求', note: '客户端（你的程序）向服务器提出的一次访问动作，包含网址、方法、参数等。' },
      { term: 'response', zh: '响应', note: '服务器针对请求发回的内容，包含状态码、响应头和正文。' },
      { term: 'status code', zh: '状态码', note: '三位数字说明访问结果，200 代表成功，404 代表找不到，500 代表服务器出错了。' },
      { term: 'get', zh: 'GET 方法', note: 'HTTP 的一种请求方法，语义是"把某个资源拿给我"，一般不带长内容，只带网址和少量参数。' }
    ],
    steps: [
      '在终端输入 pip install requests 安装这个库。',
      '新建文件 http_demo.py，写入你准备运行的代码。',
      '在终端输入 python http_demo.py 运行，程序就会去访问指定的网址。',
      '需要联网。地址要能拼对，访问不到会抛异常（ConnectionError）。'
    ],
    examples: [
      {
        title: 'GET 网页并打印状态码与内容',
        code: 'import requests\n\nr = requests.get("https://httpbin.org/get")\nprint(r.status_code)\nprint(r.text)',
        output: '预期说明：状态码会显示 200；r.text 是一大段 JSON 文本，里面带着你请求时的信息。该示例需联网，请在本地运行后查看。',
        note: '需安装 requests 并在本机运行（需要联网）。你会先看到 200，然后是一长串由大括号包起来的 JSON 文本——打印出来练练眼，后面会天天见这种格式。',
        verify: false
      },
      {
        title: '取回 JSON 并抽取字段',
        code: 'import requests\n\nr = requests.get("https://httpbin.org/anything")\ndata = r.json()\nprint(r.status_code)\nprint(data["url"])',
        output: '预期说明：第一行打印 200；第二行打印出一个网址字符串，内容就是刚才请求的那个地址。需联网在本机运行。',
        note: '需安装 requests 并在本机运行（需要联网）。r.json() 把响应正文解析成 Python 字典，之后就能用中括号按名字取字段，这跟"大模型接口拿返回字段"是同一套动作。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '忘了检查状态码就敢用结果',
        bad: 'r = requests.get(url)\nprint(r.json())',
        good: 'r = requests.get(url)\nif r.status_code == 200:\n    print(r.json())\nelse:\n    print("请求失败：", r.status_code)',
        note: '访问不到或服务器报错时，内容不是你要的格式，直接 .json() 会抛异常。养成"先看状态码再动手"的习惯。'
      },
      {
        title: '把打印出来的 200 当成功之后就不管网络问题',
        bad: '手一抖把网址少打一个字符，程序报错后直接忽略不看',
        good: '看清报错类型：ConnectionError 表示没连上网络或网址拼错，读一下完整错误再改',
        note: '报错本身就是在告诉你答案。连不上先查网址对不对、网络通不通，别急着怀疑代码。'
      },
      {
        title: '误以为 GET 只能拿网页，不能传数据',
        bad: 'requests.get(url, data={"k": "v"})　# 传了 data 也被忽略，GET 不认它',
        good: '传简单参数用 params：requests.get(url, params={"q": "你好"})',
        note: 'GET 的参数要拼在网址上（params），data 是后面 POST 的专属。记住这个分工，学完下一节就更清楚。'
      }
    ],
    practice: [
      {
        prompt: '写代码对着 https://httpbin.org/get 发一个 GET 请求，先打印状态码，再打印响应正文（r.text）。',
        starter: 'import requests\n\nr = requests.get("https://httpbin.org/get")\n# TODO: 打印状态码\n# TODO: 打印响应正文',
        answer: 'import requests\n\nr = requests.get("https://httpbin.org/get")\nprint(r.status_code)\nprint(r.text)',
        output: '200\n{"args": {}, "headers": {...}, "origin": "...", "url": "https://httpbin.org/get"}',
        hint: '先 requests.get(...) 存进变量 r，再用 r.status_code 和 r.text 两个字段分别打印。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '状态码 200 表示什么？',
        options: ['请求失败', '请求成功，服务器正常返回了内容', '网址不存在', '服务器内部出错'],
        answer: 1,
        explain: '200 是最常见的成功状态码；404 表示找不到，500 表示服务器出错。'
      },
      {
        type: 'judge',
        question: 'requests 的 GET 结果 r.json() 会把响应正文解析成一个 Python 字典。',
        answer: true,
        explain: '只要正文是 JSON 文本，.json() 就能解析成 dict，方便按字段取值。'
      }
    ]
  },
  {
    id: 'fastapi-basics',
    title: 'FastAPI：一分钟写一个接口',
    phase: 8,
    order: 2,
    minutes: 28,
    rating: { level: 4, must: 4 },
    summary: '用 FastAPI 加 uvicorn 几行代码起一个本地 HTTP 服务，打开浏览器就能看到"你好"。',
    keywords: ['FastAPI', 'uvicorn', '接口', '服务', '浏览器', 'HTTP'],
    tip: '零基础提示：把"接口"想成"一个别人可以访问的网址"就够了。你现在只是让它跑在本机，等学到调用大模型时，你写的接口和调别人接口用的是同一套开始。',
    what: '上一节你的程序是"访问别人的网页"，这一节反过来：让你的电脑变成一个"被访问的服务器"。FastAPI 负责把函数变成网址，uvicorn 负责真正把服务跑起来。整个过程只需要三步：装包、写一个带 @app.get 装饰器的函数、启动 uvicorn。启动后用浏览器打开本地地址，就能看到函数返回的"你好"，在浏览器输入另一个地址，还能看到自动生成的接口说明页。',
    analogy: '打个比方：你要开一个小卖部。装包是进货，FastAPI 是给你写好"菜单和收银规则"的门面，uvicorn 是真正开门营业的店员。顾客（浏览器）一推门（访问网址），店员就照着菜单把货递出去——返回"你好"。',
    terms: [
      { term: 'framework', zh: '框架', note: '一套帮你写好关键步骤、你只填自己那部分代码的工具库，FastAPI 就是专门做接口的框架。' },
      { term: 'decorator', zh: '装饰器', note: '写在函数上方、以 @ 开头的标记，告诉 FastAPI"这个函数要挂到哪个网址上"。' },
      { term: 'server', zh: '服务器', note: '持续监听某台机器上的端口、随时响应请求的程序；uvicorn 启动后你的电脑就成了一个服务器。' },
      { term: 'endpoint', zh: '接口（端点）', note: '一个可以被访问的具体网址加请求方法，比如 GET /，返回"你好"。' },
      { term: 'reload', zh: '热重载', note: 'uvicorn 的一个开关，存盘后自动重启服务，改代码不用手动重启。' }
    ],
    steps: [
      '在终端输入 pip install fastapi uvicorn 把两个包装好。',
      '新建文件 main.py，写入 import fastapi 开头的那段代码。',
      '在终端输入 uvicorn main:app --reload --port 8000 启动服务。',
      '浏览器打开 http://127.0.0.1:8000，能看到函数返回的 JSON"你好"。',
      '再打开 http://127.0.0.1:8000/docs，能看到自动生成的接口说明页面。',
      '改完代码存盘，服务会自动重启，刷新浏览器即可看到新结果。'
    ],
    examples: [
      {
        title: '最小接口：返回"你好"',
        code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef hello():\n    return {"message": "你好"}\n\n# 终端启动：uvicorn main:app --reload --port 8000',
        output: '预期说明：这是"服务类"示例，启动后浏览器打开 http://127.0.0.1:8000 会看到 {"message":"你好"}。需先安装 fastapi uvicorn 并在本机运行。',
        note: '需安装 fastapi uvicorn 并在本机运行。关键在于 main:app——main 是文件名，冒号后的 app 是代码里的那个 FastAPI() 实例，别写错。',
        verify: false
      },
      {
        title: '看自动生成的接口文档页',
        code: '# main.py 内容沿用上一个例子，保持不变\n# 服务已用 uvicorn main:app --reload 启动',
        output: '预期说明：浏览器打开 http://127.0.0.1:8000/docs 会看到一个交互式页面，里面列着 GET / 这个接口和它的返回示例。需在本机运行服务后查看。',
        note: '需安装 fastapi uvicorn 并在本机运行。FastAPI 会照着你的代码自动生成这套说明，不用手写文档——这正是它方便的地方。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: 'uvicorn main:app 启动失败',
        bad: '在 main.py 没写 app = FastAPI() 时输入 uvicorn main:app --reload',
        good: '确认文件里先有 app = FastAPI()，且启动命令里冒号两侧的名字完全对上',
        note: '报错找不到 app 时，九成是文件名或变量名对不上。微调一下就能跑起来。'
      },
      {
        title: '改了的代码看不到效果',
        bad: '启动时没加 --reload，改完代码不重启直接刷新浏览器',
        good: '开发时用 uvicorn main:app --reload，改完存盘自动生效',
        note: '没开 --reload 就得手动按 Ctrl+C 停止再重新启动，否则看得总是旧代码的结果。'
      },
      {
        title: '网址端口打不开',
        bad: '浏览器访问 http://127.0.0.1:9999，而服务跑在 8000',
        good: '端口要和启动命令 --port 8000 一致，用 127.0.0.1 或 localhost 都可以',
        note: '127.0.0.1 是"本机"的专用地址。端口不对就与服务器失联，检查一遍数字即可。'
      }
    ],
    practice: [
      {
        prompt: '写一个最小 FastAPI 应用：GET / 返回 {"message": "你好"}，并写出启动命令。',
        starter: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n# TODO: 加上 @app.get("/") 装饰器和 hello 函数\n',
        answer: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef hello():\n    return {"message": "你好"}',
        output: '浏览器打开 http://127.0.0.1:8000\n{"message":"你好"}',
        hint: '用 @app.get("/") 装饰函数，返回一个字典；启动命令是 uvicorn main:app --reload --port 8000。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '启动命令 uvicorn main:app 里的 main:app 表示？',
        options: ['文件名 main.py，实例 app', '端口号', '包名', '数据库名'],
        answer: 0,
        explain: '冒号左侧是模块名（文件 main.py），右侧是里面的 FastAPI 实例名 app，两者要对应。'
      },
      {
        type: 'judge',
        question: 'FastAPI 会在 /docs 地址自动生成一份交互式接口文档，不用手写。',
        answer: true,
        explain: '照着代码里的装饰器和类型注解，FastAPI 自动生成 /docs 页面，方便调试。'
      }
    ]
  },
  {
    id: 'pydantic-basics',
    title: 'Pydantic：规定数据长什么样',
    phase: 8,
    order: 3,
    minutes: 24,
    rating: { level: 4, must: 4 },
    summary: '用 Pydantic 的 BaseModel 把"数据该有几个字段、各是什么类型"写清楚，让你调接口时不再糊涂。',
    keywords: ['Pydantic', 'BaseModel', '字段', '类型', '校验', '模型'],
    tip: '零基础提示：把 BaseModel 想成"养数据的表格模板"。你先把每列是什么类型定好，往里面装数据时，错的会被拦下来、对不上的会被提醒。',
    what: '很多时候你发出去或收进来的数据是一串 JSON，字段多、类型乱，全靠人肉记很不牢靠。Pydantic 的 BaseModel 让你用一个类把"该有哪些字段、每字段是什么类型、缺了怎么办"一次性定死。装数据时它会自动检查：字符串进了 int 字段会被提醒，缺字段会说缺哪一项。前面网络请求里的 r.json() 只是把一个字典拿来，而 BaseModel 能把那个字典"验一遍、用起来更稳"。',
    analogy: '打个比方：BaseModel 就像一张有格子的报名表，格子旁边写着"这里填数字""这里必填，不能空"。你交上一张填得乱七八糟的表，它会逐格指出哪里不行。交上去的表被这样一规整，后面处理起来就清清楚楚。',
    terms: [
      { term: 'model', zh: '模型', note: '在这里指继承 BaseModel 的类，用来声明一组规定好的字段结构。' },
      { term: 'field', zh: '字段', note: '模型里的一个成员，有名字和固定的类型，比如 message: str 就是一个字段。' },
      { term: 'validation', zh: '校验', note: '装入数据时按规则逐一检查是否合规的过程，不通过会抛 ValidationError。' },
      { term: 'type hint', zh: '类型注解', note: '冒号后写字段类型（如 str、int）的写法，Pydantic 用它来决定怎么校验和转换。' },
      { term: 'json', zh: 'JSON', note: '一种用大括号和键值对表达数据的文本格式，接口之间传递数据最常用它。' }
    ],
    steps: [
      '在终端输入 pip install pydantic 安装。',
      '在代码里 from pydantic import BaseModel。',
      '定义一个类，类名大写开头，继承 BaseModel，类里用冒号+类型写出每个字段。',
      '用"类名(字段名=值)"去实例化，Pydantic 自动校验。',
      '看看报错信息怎么描述哪个字段不行，然后修正数据。'
    ],
    examples: [
      {
        title: '定义模型并从字典校验出对象',
        code: 'from pydantic import BaseModel\n\nclass User(BaseModel):\n    name: str\n    age: int\n\nu = User(name="小明", age="20")\nprint(u.name)\nprint(u.age, type(u.age))',
        output: '小明\n20 <class \'int\'>\n注意：名称为 "20" 的字符串被自动转成了真正的整数 20。',
        note: 'Pydantic 会把能转类型的值自动转好：字符串 "20" 存进 int 字段就变成了整数 20。这让代码不那么多疑，但也要知道它有这个默认动作。'
      },
      {
        title: '缺字段或类型错时抛校验错误',
        code: 'from pydantic import BaseModel\n\nclass User(BaseModel):\n    name: str\n    age: int\n\nUser(age=20)',
        output: '预期说明：会抛 ValidationError，提示 name 字段缺失。这就是"规定长什么样"的威力——缺一样它立刻告诉你。',
        note: '少传必填字段、类型填错、多的拼错，都会在实例化那一刻被拦下并给出是哪个字段的问题。靠这个不会让坏数据悄悄溜进你的程序。'
      }
    ],
    pitfalls: [
      {
        title: '字段没写类型，被当作普通函数变量',
        bad: 'class User(BaseModel):\n    name  # 只写了名字，没写 : str',
        good: 'class User(BaseModel):\n    name: str',
        note: '不加 : str 这类类型注解，Pydantic 就不知道该怎么校验，等于没规定。每个字段都得写类型。'
      },
      {
        title: '以为少了字段也能放进去',
        bad: 'User(age=20)　# name 没传',
        good: 'User(name="小明", age=20)  或把 name 改成 name: str = ""',
        note: '没给默认值的字段必须传，否则报缺字段错误。想"可空"就给默认值，想"不传也行但要提示"再另说。'
      },
      {
        title: '把可转类型的宽松校验当成百分百正确',
        bad: 'User(age="abc")　# 转不了还指望程序自己懂',
        good: '让字符串能转成 int；实在要严格，再用 strict 相关配置',
        note: '"20"->20 是便利，但"abc"转不成整数就会报错。理解这个转换方向，写数据时才不会踩意料之外的坑。'
      }
    ],
    practice: [
      {
        prompt: '定义一个 Book 模型，字段 title: str 和 pages: int，把它实例化并打印 pages 的类型。',
        starter: 'from pydantic import BaseModel\n\n# TODO: 定义 Book 模型\nb = Book(title="Python 入门", pages=120)\nprint(b.title)\nprint(b.pages, type(b.pages))',
        answer: 'from pydantic import BaseModel\n\nclass Book(BaseModel):\n    title: str\n    pages: int\n\nb = Book(title="Python 入门", pages=120)\nprint(b.title)\nprint(b.pages, type(b.pages))',
        output: 'Python 入门\n120 <class \'int\'>',
        hint: '类里写 title: str 和 pages: int 两行即可，实例化用 Book(title=..., pages=...)。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '继承 BaseModel 的类主要用来做什么？',
        options: ['把代码编译成机器码', '规定一组数据的字段和类型并校验', '启动一个服务器', '发送网络请求'],
        answer: 1,
        explain: 'BaseModel 用类型注解定期字段结构，实例化时自动校验与转换类型。'
      },
      {
        type: 'judge',
        question: '缺了必填字段时，Pydantic 在实例化那一刻就会报错，不会静悄悄地放过去。',
        answer: true,
        explain: '校验发生在构造阶段，哪缺哪错立刻抛 ValidationError，这正是它帮你兜底的价值。'
      }
    ]
  },
  {
    id: 'post-request',
    title: 'POST：把数据发给服务器',
    phase: 8,
    order: 4,
    minutes: 26,
    rating: { level: 4, must: 4 },
    summary: '用 POST 请求把自己这一方的数据发给刚写的服务，服务接收并用 Pydantic 校验后返回结果。',
    keywords: ['POST', '请求体', 'Body', '发送', '接收', '响应'],
    tip: '零基础提示：GET 是去别人家要东西（参数挂在网址上），POST 是把自己这袋数据敲门递进去（放在请求体里）。调大模型的接口基本都用 POST，这一节是把前面几节串起来的关键一环。',
    what: 'POST 和 GET 相对，专门用来"主动把一包数据发给服务器"。数据放在请求体（body）里，通常是一段 JSON。你在 FastAPI 里用 @app.post 声明一个接口，想接收的请求体就声明成一个 Pydantic 模型，函数参数一写，框架就把接收到的 JSON 验好、变成对象递给你。另一边要发 POST 很容易：requests.post(url, json={...})。以后调用大模型的"发消息、拿回复"就是一次标准化的 POST。',
    analogy: '打个比方：GET 是往墙外贴纸条让人看，POST 是把一封封好地址的信塞进邮筒。信纸上的内容就是请求体，收信人（服务器）拆开、核对格式（校验）、再寄回一封回信（响应）。你的程序在两头都能扮演角色：既能寄信，也能开个邮局收信。',
    terms: [
      { term: 'post', zh: 'POST 方法', note: 'HTTP 请求里用来"提交数据"的方法，数据放进请求体而不是贴在网址上。' },
      { term: 'request body', zh: '请求体', note: '请求里携带的那一段数据内容，POST 通常放一段 JSON 在这里面。' },
      { term: 'request body model', zh: '请求体模型', note: '用 Pydantic 定义、用来接收并校验请求体的模型类，函数参数写上它，框架自动解析。' },
      { term: 'content-type', zh: '内容类型头', note: '请求/响应里说明数据格式的字段，发 JSON 时一般标 application/json。' }
    ],
    steps: [
      '确认按前两节装好并写好接收 POST 的服务（fastapi uvicorn）。',
      '启动服务 uvicorn main:app --reload。',
      '另起一个终端，写一个开场小脚本，按本节方式用 requests.post 把数据发过去。',
      '看到服务端返回校验后的成果。',
      '再故意少传一个必填字段，观察返回的校验错误长什么样。'
    ],
    examples: [
      {
        title: '发送方：用 requests POST 发数据',
        code: 'import requests\n\npayload = {"message": "你好", "temperature": 0.7}\nr = requests.post(\n    "http://127.0.0.1:8000/chat",\n    json=payload,\n)\nprint(r.status_code)\nprint(r.json())',
        output: '预期说明：若 8000 端口已按上一节起好了接收该 POST 的服务，会打印 200 以及服务器返回的 JSON。需先装 requests、起服务并在本机运行。',
        note: '需安装 requests、先启动接收服务并在本机运行。json= 参数会把字典自动序列化成 JSON 放进请求体，并顺手带上 Content-Type: application/json。',
        verify: false
      },
      {
        title: '接收方：用 Pydantic 模型接请求体',
        code: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatBody(BaseModel):\n    message: str\n    temperature: float = 0.7\n\n@app.post("/chat")\ndef chat(body: ChatBody):\n    return {"reply": "你发来的消息是：" + body.message}\n\n# 终端启动：uvicorn main:app --reload',
        output: '预期说明：启动后，用上一个"发送方"脚本发一次，会返回 {"reply":"你发来的消息是：你好"}。需安装 fastapi uvicorn 并在本机运行。',
        note: '需安装 fastapi uvicorn 并在本机运行（联网类）。函数参数的 ChatBody 就是请求体模型，FastAPI 替你把收到的 JSON 校验成对象，用 body.message 取字段。',
        verify: false
      }
    ],
    pitfalls: [
      {
        title: '发送方没把数据放进请求体',
        bad: 'requests.post(url, data="message=你好")　# 当成了表单文本，服务端可能收不到',
        good: 'requests.post(url, json={"message": "你好"})',
        note: '要发 JSON 就用 json=；data= 是按另一套格式走，容易和服务器的 JSON 模型对不上。'
      },
      {
        title: '接收方接口写了 POST 却用错装饰器',
        bad: '@app.get("/chat")\ndef chat(body):  # 参数在 GET 里会被当作查询参数，而不是请求体',
        good: '@app.post("/chat")\ndef chat(body: ChatBody):',
        note: '请求体只在 POST 等提交型方法里由 Pydantic 模型解析。GET 里这样写参数会被当成别的解释，行为不符合预期。'
      },
      {
        title: '发送方拼错了字段名',
        bad: 'json={"messege": "你好"}　# 拼错成 messege',
        good: 'json={"message": "你好"}　# 与接收方模型字段名严格一致',
        note: 'Pydantic 对"模型里没有的字段"默认会忽略不报错，容易让你以为发出去了，结果服务端根本没用到。收发双方字段名要照着模型对一遍。'
      }
    ],
    practice: [
      {
        prompt: '写一个发送脚本：用 requests.post 向 http://127.0.0.1:8000/chat 发送 {"message":"你好"}，打印状态码和返回的 JSON。',
        starter: 'import requests\n\n# TODO: 用 requests.post 发送 JSON 并打印 r.status_code、r.json()',
        answer: 'import requests\n\nr = requests.post(\n    "http://127.0.0.1:8000/chat",\n    json={"message": "你好"},\n)\nprint(r.status_code)\nprint(r.json())',
        output: '预期说明：服务在跑时打印 200，第二行是服务器返回的 JSON。需先启动接收该 POST 的服务并在本机运行。',
        hint: 'post 的第一个参数是网址，json={...} 放进要发的请求体；结果对象上有 status_code 和 json() 两个可用。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'POST 请求想要携带数据，正确做法是？',
        options: ['把数据拼在网址后面当 GET 参数', '把数据放到请求体里，通常是一条 JSON', '把数据写进文件名', 'POST 不能带任何数据'],
        answer: 1,
        explain: 'POST 的核心就是靠请求体装箱数据；发送端用 requests.post(url, json=...)，接收端用 Pydantic 模型去接。'
      },
      {
        type: 'judge',
        question: '在 FastAPI 里，POST 接口想接收请求体，让参数沾上 Pydantic 模型类型就行，框架会自动解析校验。',
        answer: true,
        explain: '参数类型写成 Pydantic 模型，框架就把 JSON 请求体解析成对象并校验，取字段直接用 body.字段名。'
      }
    ]
  },
  {
    id: 'llm-chat-api',
    title: '调用大模型接口：第一次拿到 AI 回复',
    phase: 8,
    order: 5,
    minutes: 32,
    rating: { level: 4, must: 5 },
    summary: '用一个 POST 请求调用兼容 OpenAI 格式的 chat 接口，拿到模型的回复；把密钥放进环境变量，再按类别处理报错。',
    keywords: ['LLM', '大模型', 'chat/completions', 'API Key', '环境变量', 'Bearer', 'OpenAI'],
    tip: '零基础提示：模型接口其实就是一个普通的 POST 网址。你已经会发请求、会读 JSON，把这两件事拼起来，就是所谓"调用 AI"。',
    what: '大模型能力通过 HTTP 接口暴露出来：你发一段对话，它回一段对话。去掉名词，这一步就是你上一节学会的 POST——只是请求体里放的是消息列表，响应里多了一层 choices。多数平台都兼容同一套格式，因此你会用 requests 或 httpx 直接发，不依赖任何额外框架，网络、密钥、状态码、JSON 解析都在你手上。',
    analogy: '像给客服发一条工单：你填好表单（messages）、带上工牌（密钥）、投进指定的信箱（网址）；客服回你一张回执，真正的答复写在"回执里的第一条内容"那一栏（choices[0]），额度用没用掉写在另外一栏（usage）。',
    terms: [
      { term: 'api key', zh: '接口密钥', note: '一串证明"是你本人在调用"的字符，通常放在请求头里发出去' },
      { term: 'endpoint', zh: '接口地址', note: '具体的访问网址，比如 /v1/chat/completions' },
      { term: 'messages', zh: '消息列表', note: '一次对话的上下文，每条消息有 role（角色）和 content（内容）两个字段' },
      { term: 'token', zh: '词元', note: '模型计费和上下文长度的计量单位，一段文字会被切成若干词元' },
      { term: 'stream', zh: '流式返回', note: '模型边想边把内容分多次发回，而不是憋完整段再发' },
    ],
    steps: [
      '在模型平台申请一个 API Key，并记下它的接口地址（base_url）和模型名。',
      '把密钥写进环境变量：Windows 用 setx LLM_API_KEY "你的密钥"，然后重开终端。',
      '用 os.environ 读出来，写进请求头的 Authorization: Bearer 里。',
      '用 requests.post 发 messages 列表，先打印 status_code，再打印解析后的字段。',
      '刻意传一个错的密钥，观察 401；再传一个不存在的模型名，观察 404/400 的提示文字。',
    ],
    examples: [
      {
        title: '最小的一次模型调用',
        code: `import os
import requests

api_key = os.environ["LLM_API_KEY"]
url = "https://api.deepseek.com/chat/completions"

body = {
    "model": "deepseek-chat",
    "messages": [
        {"role": "user", "content": "用一句话解释什么是变量"}
    ],
}

r = requests.post(
    url,
    headers={"Authorization": f"Bearer {api_key}"},
    json=body,
    timeout=30,
)
print(r.status_code)
data = r.json()
print(data["choices"][0]["message"]["content"])`,
        output: '预期说明：正常时第一行打印 200，第二行打印模型对"变量"的一句话解释（内容每次不同）。需自行申请可用的 API Key、设置环境变量并联网运行。',
        note: '需联网并配置可用的 API Key 在本机运行。密钥从环境变量读取，不要写进代码；timeout=30 是必须的，模型生成比普通网页慢。',
        verify: false,
      },
      {
        title: '多轮对话与读取用量',
        code: `import os
import requests

api_key = os.environ["LLM_API_KEY"]
url = "https://api.deepseek.com/chat/completions"

messages = [
    {"role": "system", "content": "你是零基础 Python 老师，回答不超过 40 字。"},
    {"role": "user", "content": "列表和元组有什么区别？"},
]

r = requests.post(
    url,
    headers={"Authorization": f"Bearer {api_key}"},
    json={"model": "deepseek-chat", "messages": messages},
    timeout=30,
)
data = r.json()
print(data["choices"][0]["message"]["content"])
print(data["usage"])`,
        output: '预期说明：先打印一句简短解释，再打印一个含 prompt_tokens、completion_tokens 等字段的用量字典。需配置 API Key 并联网在本机运行。',
        note: '需联网并配置可用的 API Key 在本机运行。system 消息用来定角色和限制；把上一轮的回复按 {"role": "assistant", "content": ...} 追加进 messages，就能实现多轮对话。',
        verify: false,
      },
      {
        title: '把报错分开处理',
        code: `import os
import requests

api_key = os.environ["LLM_API_KEY"]

try:
    r = requests.post(
        "https://api.deepseek.com/chat/completions",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]},
        timeout=30,
    )
    r.raise_for_status()
    print(r.json()["choices"][0]["message"]["content"])
except requests.Timeout:
    print("超时：网络太慢或内容太长，重试或加大 timeout")
except requests.HTTPError as e:
    print("接口返回错误：", e.response.status_code, e.response.text[:200])
except requests.ConnectionError:
    print("连不上：检查网络和接口地址")`,
        output: '预期说明：正常时打印模型的回复；超时、接口报错、连不上三种情况分别打印不同的提示。需配置 API Key 并联网在本机运行。',
        note: '需联网并配置可用的 API Key 在本机运行。raise_for_status() 会在 4xx/5xx 时抛出异常，比"不检查状态码直接用 r.json()"更安全。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '把 API Key 写进代码并提交到仓库',
        bad: 'headers={"Authorization": "Bearer sk-真实密钥"}',
        good: 'key = os.environ["LLM_API_KEY"]\nheaders={"Authorization": f"Bearer {key}"}',
        note: '密钥进了公开仓库等于送给别人用你的额度。发现泄露后先去平台重置，再改代码。',
      },
      {
        title: '不检查状态码就取 choices',
        bad: 'print(r.json()["choices"][0]["message"]["content"])',
        good: 'r.raise_for_status()\ndata = r.json()\nprint(data["choices"][0]["message"]["content"])',
        note: '密钥错、额度用完、模型名写错都会返回非 200，此时的 JSON 里没有 choices，会报 KeyError 掩盖真正原因。',
      },
      {
        title: '请求体拼错结构',
        bad: 'json={"message": "你好"}  # 少了 model，也没有 messages 列表',
        good: 'json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]}',
        note: '接口要的是 messages 列表，每条里面有 role 和 content；消息写成字符串或漏掉 model 都会 400。',
      },
      {
        title: '不设超时，程序卡住不动',
        bad: 'requests.post(url, headers=..., json=body)',
        good: 'requests.post(url, headers=..., json=body, timeout=30)',
        note: '模型生成耗时不稳定，不设超时可能让你等很久且无法判断是慢还是挂了。',
      },
    ],
    practice: [
      {
        prompt: '写一段代码调用 chat 接口问"你好"，打印状态码和模型回复内容，密钥从环境变量 LLM_API_KEY 读取。',
        starter: `import os
import requests

api_key = os.environ["LLM_API_KEY"]
# TODO: 发送 POST 请求，打印 r.status_code 和 choices[0].message.content
`,
        answer: `import os
import requests

api_key = os.environ["LLM_API_KEY"]
r = requests.post(
    "https://api.deepseek.com/chat/completions",
    headers={"Authorization": f"Bearer {api_key}"},
    json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]},
    timeout=30,
)
print(r.status_code)
print(r.json()["choices"][0]["message"]["content"])`,
        output: '预期说明：正常时打印 200 和一句问候。需配置 API Key 并联网在本机运行。',
        hint: '请求头带 Authorization: Bearer <key>，请求体要有 model 和 messages 两个字段。',
      },
      {
        prompt: '写一个函数 ask(question)，用同一个会话连续问两个问题，并把第二次回答也打印出来。',
        starter: `import os
import requests

def ask(question, history=None):
    # TODO: 把 question 追加进 messages，发请求并返回回复文本
    pass
`,
        answer: `import os
import requests

def ask(question, history=None):
    history = history or []
    messages = history + [{"role": "user", "content": question}]
    r = requests.post(
        "https://api.deepseek.com/chat/completions",
        headers={"Authorization": f"Bearer {os.environ['LLM_API_KEY']}"},
        json={"model": "deepseek-chat", "messages": messages},
        timeout=30,
    )
    r.raise_for_status()
    reply = r.json()["choices"][0]["message"]["content"]
    history.append({"role": "assistant", "content": reply})
    return reply`,
        output: '预期说明：函数可被连续调用，history 里会累积 user/assistant 消息。需配置 API Key 并联网在本机运行。',
        hint: '把历史消息与本次问题拼成 messages；返回后记得把 assistant 的回复追加进历史。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '模型真正的回复文本在返回 JSON 的哪个位置？',
        options: ['data["text"]', 'data["choices"][0]["message"]["content"]', 'data["reply"]', 'data["usage"]["content"]'],
        answer: 1,
        explain: '兼容 OpenAI 格式的接口把回复放在 choices 数组第一条的 message.content 里。',
      },
      {
        type: 'judge',
        question: 'API Key 应该写进代码文件，方便部署到任何机器。',
        answer: false,
        explain: '密钥要放在环境变量或 .env 里，代码只读取；写进代码并提交会造成泄露。',
      },
      {
        type: 'code',
        question: '补全请求头，让它用变量 api_key 做认证：headers={"Authorization": ________}',
        code: `headers = {"Authorization": f"________"}`,
        answer: 'Bearer {api_key}',
        accept: ['Bearer {api_key}'],
        explain: '标准写法是 Authorization: Bearer <你的密钥>，中间有一个空格。'
      },
    ]
  }
]