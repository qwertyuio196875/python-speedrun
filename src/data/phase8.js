/**
 * 第八阶段：网络请求与用代码写一个能联网的小服务（选修）
 * 面向零基础、但有前置学习顺序的进阶内容，为后面调用大模型接口打基础。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'http-protocol',
    title: 'HTTP 协议：请求与响应的规矩',
    phase: 8,
    order: 1,
    minutes: 26,
    rating: { level: 3, must: 5 },
    summary: '看懂一次网络访问的两封信：请求（我要什么）和响应（给你什么），以及三位数状态码。',
    keywords: ['HTTP', '请求', '响应', '状态码', 'GET', 'POST', '请求头'],
    tip: '零基础提示：浏览器和服务器之间来回传的是两封"格式固定的信"——请求信写清"我要什么"，响应信写清"给不给、给什么"。会读这两封信，后面 requests、FastAPI、调大模型全都通透。',
    lecture: [
      '浏览器和服务器之间的一切通信，靠的都是一种文本格式——HTTP。它规定了请求长什么样、响应长什么样，是整个互联网的"对话规范"。',
      '请求由三部分组成：请求行（方法 + 路径 + 版本，如 GET /api/user HTTP/1.1）；请求头（Host、User-Agent、Content-Type 等说明信息）；请求体（POST 才有，真正交出去的数据）。',
      '响应也是三部分：状态行（HTTP/1.1 200 OK）；响应头；响应体（真正的数据，JSON、HTML、图片都行）。',
      '方法常用两个：GET 拿数据（参数在路径里）、POST 交数据（参数在请求体里）。状态码是办理结果的分类：200 成功、3xx 跳转、4xx 客户端的问题（地址错、没权限）、5xx 服务器的问题。',
      '- 请求行：方法 路径 版本；请求头：说明信息；请求体：POST 才有',
      '- 响应：状态行 + 响应头 + 响应体',
      '- GET：读数据；POST：写数据',
      '- 200 成功 · 301/302 跳转 · 404 找不到 · 422 数据不对 · 500 服务器炸了',
      '- 必须先理解这一页，后面调接口、排错才有共同的语言',
      'HTTP 是整个 Web 的地基——把它的结构刻进脑子里。',
    ],
    terms: [
      { term: 'http', zh: '超文本传输协议', note: '浏览器和服务器之间约定好的通信格式，两边都按这个规矩写信。' },
      { term: 'request line', zh: '请求行', note: '请求的第一行：方法 + 路径 + 版本，如 GET /api/user HTTP/1.1。' },
      { term: 'status line', zh: '状态行', note: '响应的第一行：版本 + 状态码 + 说明，如 HTTP/1.1 200 OK。' },
      { term: 'header', zh: '头', note: '一行一条的"说明信息"，如 Host、Content-Type，冒号分隔。' },
      { term: 'body', zh: '请求体/响应体', note: '真正装数据的那一段，与头部之间隔一个空行。' }
    ],
    steps: [
      '打开浏览器按 F12，切到 Network（网络）标签，随便打开一个网页',
      '点第一条请求，看 Request Headers（请求头）和 Response Headers（响应头）',
      '对照认识请求行和状态行：方法、路径、状态码',
      '把常见状态码记成小抄：200 成功、301/302 跳转、404 找不到、500 服务器出错',
      '下一节用 requests 发同样的请求，你会发现结构一模一样',
    ],
    examples: [
      {
        title: '拆解一个请求',
        code: `request = (
    "GET /api/user HTTP/1.1\\r\\n"
    "Host: example.com\\r\\n"
    "User-Agent: my-app/1.0\\r\\n"
)
lines = request.split("\\r\\n")
print("请求行:", lines[0])
print("请求头有", len(lines) - 2, "个")`,
        output: `请求行: GET /api/user HTTP/1.1
请求头有 2 个`,
        note: '第一行是请求行（方法 GET、路径 /api/user）；剩下的 Host、User-Agent 都是请求头。',
      },
      {
        title: '状态码速查表',
        code: `codes = {
    200: "成功",
    301: "永久跳转",
    404: "页面不存在",
    500: "服务器出错",
}
for code, meaning in codes.items():
    print(code, "→", meaning)`,
        output: `200 → 成功
301 → 永久跳转
404 → 页面不存在
500 → 服务器出错`,
        note: '2 开头成功、3 开头跳转、4 开头调用方的问题、5 开头服务器的问题——报错先看开头数字。',
      },
      {
        title: '拆解一个响应',
        code: `response = (
    "HTTP/1.1 200 OK\\r\\n"
    "Content-Type: application/json\\r\\n"
    "\\r\\n"
    '{"name": "小明"}'
)
head, body = response.split("\\r\\n\\r\\n")
print("状态行:", head.split("\\r\\n")[0])
print("响应体:", body)`,
        output: `状态行: HTTP/1.1 200 OK
响应体: {"name": "小明"}`,
        note: '头部和响应体之间隔一个空行；requests 里 r.status_code、r.headers、r.text/r.json() 分别对应这三样。',
      }
    ],
    pitfalls: [
      {
        title: '用 GET 去提交数据',
        bad: 'GET /send?message=你好   # 把要提交的数据挂在网址上',
        good: 'POST /send，数据放进请求体',
        note: 'GET 的语义是"获取"，数据会暴露在网址和日志里；提交数据用 POST + 请求体。'
      },
      {
        title: '看到 500 就以为自己写错了',
        bad: '状态码 500，翻来覆去检查自己的客户端代码',
        good: '4xx 查自己（参数、路径），5xx 查服务端（看服务日志）',
        note: '状态码开头数字就是"谁的锅"：4 开头先检查你发的请求，5 开头是服务器那边出错了。'
      },
      {
        title: '手拼网址时忘了给中文编码',
        bad: 'requests.get("https://a.com/查?词=你好")   # 网址里不该直接放中文',
        good: 'requests.get(url, params={"词": "你好"})   # 让库替你编码',
        note: '网址里只允许特定字符；中文和空格要 URL 编码，requests 的 params 会自动处理。'
      }
    ],
    practice: [
      {
        prompt: '从状态行 line = "HTTP/1.1 404 Not Found" 里取出状态码数字并打印。',
        starter: `line = "HTTP/1.1 404 Not Found"
# TODO: 拆出第二段并转成整数
`,
        answer: `line = "HTTP/1.1 404 Not Found"
print(int(line.split()[1]))`,
        output: `404`,
        hint: '按空格 split 后第 1 项（下标 1）就是 "404"，用 int() 转成数字。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '状态码 404 表示什么？',
        options: ['请求成功', '页面或资源不存在', '服务器内部出错', '需要登录'],
        answer: 1,
        explain: '4 开头是调用方的问题：404 是"找不到这个网址或资源"。',
      },
      {
        type: 'judge',
        question: 'GET 请求的数据放在请求体里，POST 请求的数据挂在网址上。',
        answer: false,
        explain: '正好相反：GET 的参数挂在网址上（params），POST 的数据放进请求体。',
      },
      {
        type: 'code',
        question: '补全：从请求行里取出访问路径。',
        code: 'line = "GET /api/user HTTP/1.1"\nprint(line.____()[1])',
        answer: 'split',
        accept: [],
        explain: '按空格 split 后，下标 1 是路径 /api/user。'
      }
    ]
  },
  {
    id: 'requests-http',
    title: 'requests：让程序去访问网页',
    phase: 8,
    order: 2,
    minutes: 25,
    rating: { level: 4, must: 4 },
    summary: '用 requests 库让你的程序像浏览器一样去访问网页，并读懂返回的"状态码"。',
    keywords: ['requests', 'GET', '响应', '状态码', '200', '网页'],
    tip: '零基础提示：这条放前面先学"怎么把网上的内容拉回程序里"，后面才能理解"大模型接口其实就是返回 JSON 的网页"。',
    lecture: [
      '打开网页的那个动作，本质上是向服务器发一个 GET 请求，服务器把页面内容发回来。requests 让你的程序也能干这件事，不再需要浏览器。',
      '最简单的用法：r = requests.get("https://example.com")。返回的 r 里最要紧的是 status_code：200 表示一切正常。其他常见值：404 找不到、403 没权限、500 服务器出错。',
      '拿内容：r.text 得到原始文本；如果返回的是 JSON 数据，r.json() 直接解析成 Python 字典/列表。r.headers 是响应头，里面有 Content-Type 等信息。',
      'requests 会自动帮你处理很多细节：自动处理编码、自动跟随 301/302 跳转、自动压缩解压。配合 timeout 参数（比如 requests.get(url, timeout=10)）防止请求悬死。',
      '- requests.get(url, timeout=10)：发 GET，设超时',
      '- r.status_code：200 表示成功',
      '- r.text：拿原始文本',
      '- r.json()：JSON 响应直接解析成 Python 数据',
      '- r.headers：响应头信息',
      '调接口的第一步永远是看 status_code——先确认通了，再解析数据。',
    ],
    terms: [
      { term: 'request', zh: '请求', note: '客户端（你的程序）向服务器提出的一次访问动作，包含网址、方法、参数等。' },
      { term: 'response', zh: '响应', note: '服务器针对请求发回的内容，包含状态码、响应头和正文。' },
      { term: 'status code', zh: '状态码', note: '三位数字说明访问结果，200 代表成功，404 代表找不到，500 代表服务器出错了。' },
      { term: 'get', zh: 'GET 方法', note: 'HTTP 的一种请求方法，语义是"把某个资源拿给我"，一般不带长内容，只带网址和少量参数。' },
      { term: 'params', zh: '查询参数', note: '拼在网址 ? 后面的参数，requests 里用 params={"q": "词"} 传。' }
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
      },
      {
        title: '不给超时，网络一卡就永远转圈',
        bad: 'requests.get(url)   # 默认一直等',
        good: 'requests.get(url, timeout=10)   # 最多等 10 秒',
        note: 'requests 默认不设超时；网络异常时程序会无限期卡住，显式写 timeout 才安全。'
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
      },
      {
        type: 'code',
        question: '补全：给请求附上查询参数 q=你好。',
        code: 'r = requests.get(url, ______={"q": "你好"})',
        answer: 'params',
        accept: [],
        explain: 'GET 的参数用 params= 传，requests 会自动拼到网址上并编码。'
      }
    ]
  },
  {
    id: 'web-basics',
    title: '前端三件套速成：看懂网页的构成',
    phase: 8,
    order: 3,
    minutes: 28,
    rating: { level: 3, must: 3 },
    summary: 'HTML 搭结构、CSS 管样式、JS 管交互：后端开发者需要看懂网页的三块积木。',
    keywords: ['HTML', 'CSS', 'JS', '前端', '标签', '选择器'],
    tip: '零基础提示：你不需要会写前端，但要"看得懂"：HTML 是骨架（有哪些内容）、CSS 是皮肤（长什么样）、JS 是肌肉（点了会怎样）。后端返回的 JSON，最终就是被这三样变成页面的。',
    lecture: [
      '网页由三样东西拼成：HTML 负责"有什么"（结构），CSS 负责"长什么样"（样式），交互脚本负责"能做什么"（行为）。作为后端，你不用会写漂亮页面，但必须看得懂页面结构和字段名。',
      'HTML 用标签描述结构：<h1> 标题、<p> 段落、<a> 链接、<div> 分块、<form> 表单。标签常常带有 class 和 id，方便被样式和脚本选中。',
      'CSS 用选择器给标签设样式：.class、#id、标签名——控制颜色、大小、布局（flex、grid）。JS 负责交互：点击、轮询刷新、表单校验。',
      '后端的日常配合：你写接口返回 JSON，前端负责把 JSON 渲染成页面；你经常需要看懂对方给的字段名（camelCase 居多）、接口文档里的示例数据、错误码与提示文案。',
      '- HTML：结构标签，如 h1、p、a、div、form',
      '- CSS：选择器（.class / #id / 标签）+ 样式属性',
      '- JS：点击、提交、轮询等交互行为',
      '- 后端核心产出：JSON 接口 + 状态码 + 文档',
      '- 前后端联调重点是字段名一致、类型一致',
      '后端的产出之一就是"让前端能用的结构化数据"——看不懂页面，接口也会对不齐。',
    ],
    terms: [
      { term: 'html', zh: '超文本标记语言', note: '用标签描述页面结构，如 <h1>、<p>、<div>，标签大多成对出现。' },
      { term: 'css', zh: '层叠样式表', note: '用选择器给标签定样式，如 h1 { color: red }。' },
      { term: 'selector', zh: '选择器', note: 'CSS/JS 里"选中哪类标签"的写法，如 .intro 选中 class="intro"。' },
      { term: 'js', zh: '脚本语言', note: '浏览器里运行的脚本语言，负责页面的交互和刷新数据。' }
    ],
    steps: [
      '在任意网页按 F12 打开 Elements（元素）面板，看标签的层级树',
      '对照认三个常用标签：<h1> 标题、<p> 段落、<div> 分块',
      '在 Styles 面板看 CSS 怎么改颜色和字号',
      '在 Console 面板输入 document.title 看页面标题',
      '回到后端视角：接口返回的 JSON 字段名，就是前端取值的键',
    ],
    examples: [
      {
        title: '认识 HTML 标签',
        code: `html = """
<html>
  <body>
    <h1>我的页面</h1>
    <p class="intro">你好，世界</p>
  </body>
</html>
"""
print("标签数量:", html.count("<"))
print("有 intro 样式:", 'class="intro"' in html)`,
        output: `标签数量: 8
有 intro 样式: True`,
        note: '<html>、<body>、<h1>、<p> 各有一对开合标签共 8 个"<"；class="intro" 是给标签贴的样式标记。',
      },
      {
        title: '从标签里取出文字（解析的雏形）',
        code: `html = '<p class="intro">你好，世界</p>'

start = html.find(">") + 1
end = html.find("</p>")
print(html[start:end])`,
        output: `你好，世界`,
        note: 'find 找到 ">" 后一位开始、"</p>" 前结束——这就是"网页解析"最原始的样子，第 11 阶段会用现成库替代手写。',
      },
      {
        title: 'CSS 与 JS 各管什么',
        code: `sheet = {
    "h1 { color: red }": "CSS：把标题涂红",
    "document.querySelector('p')": "JS：选中第一个 p 标签",
}
for code, meaning in sheet.items():
    print(code, "→", meaning)`,
        output: `h1 { color: red } → CSS：把标题涂红
document.querySelector('p') → JS：选中第一个 p 标签`,
        note: 'CSS 的选择器决定"给谁上样式"；JS 用同样的选择器选中标签做交互——两者共用一套定位规则。',
      }
    ],
    pitfalls: [
      {
        title: '标签只写一半不闭合',
        bad: '<p>你好，世界   # 少了 </p>',
        good: '<p>你好，世界</p>',
        note: '大部分标签要成对闭合；不闭合时浏览器会"猜"，猜的结果常和想的不一样。'
      },
      {
        title: 'CSS 类名和选择器对不上',
        bad: '标签写 class="intro"，样式却写 p { }',
        good: '样式写 .intro { }   # 点号表示按 class 选',
        note: '.intro 选中 class="intro" 的标签；光写 p 只对所有 <p> 生效。'
      },
      {
        title: '在后端里硬写页面',
        bad: '把整页 HTML 拼进 Python 字符串再返回',
        good: '后端返回 JSON 数据，结构和样式交给前端',
        note: '前后端分工：后端管数据和接口，前端管展示；写死页面是两头不讨好的做法。'
      }
    ],
    practice: [
      {
        prompt: '从 html = \'<h1>标题文字</h1>\' 里提取标签中间的文字并打印。',
        starter: `html = '<h1>标题文字</h1>'
# TODO: 取出两个标签之间的文字
`,
        answer: `html = '<h1>标题文字</h1>'

start = html.find(">") + 1
end = html.find("</h1>")
print(html[start:end])`,
        output: `标题文字`,
        hint: 'find(">") 找到开头标签的结尾，find("</h1>") 找到结尾标签的开头。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'HTML 的作用是？',
        options: ['让页面变色', '描述页面的结构和内容', '处理用户点击', '连接数据库'],
        answer: 1,
        explain: 'HTML 用标签搭出页面的"骨架"；变色是 CSS、交互是 JS 的事。',
      },
      {
        type: 'judge',
        question: 'CSS 选择器 .intro 选中的是 class="intro" 的标签。',
        answer: true,
        explain: '点号开头的选择器按 class 匹配；不带点的是按标签名匹配。',
      },
      {
        type: 'code',
        question: '补全：JS 选中页面上第一个 <p> 标签。',
        code: "document.__________('p')",
        answer: 'querySelector',
        accept: [],
        explain: 'querySelector 用 CSS 选择器的写法选中元素。'
      }
    ]
  },
  {
    id: 'fastapi-basics',
    title: 'FastAPI：一分钟写一个接口',
    phase: 8,
    order: 4,
    minutes: 28,
    rating: { level: 4, must: 4 },
    summary: '用 FastAPI 加 uvicorn 几行代码起一个本地 HTTP 服务，打开浏览器就能看到"你好"。',
    keywords: ['FastAPI', 'uvicorn', '接口', '服务', '浏览器', 'HTTP'],
    tip: '零基础提示：把"接口"想成"一个别人可以访问的网址"就够了。你现在只是让它跑在本机，等学到调用大模型时，你写的接口和调别人接口用的是同一套开始。',
    lecture: [
      '前面你的程序是"访问别人的网页"。这一节反过来：让你的程序变成被别人访问的服务器——这就是后端的核心工作。',
      'FastAPI 负责把你写的函数变成网址：在函数上方加 @app.get("/hello")，这个函数就成了一个接口；uvicorn 负责把服务真正跑起来。',
      '三步走：pip install fastapi uvicorn；写一个 main.py，@app.get("/hello") + return {"message": "你好"}；uvicorn main:app --reload 启动，浏览器访问 http://127.0.0.1:8000/hello 就能看到返回。',
      'FastAPI 还白送一份自动接口文档：浏览器打开 /docs 就能看到按 OpenAPI 规范生成的文档页，每个接口都能直接填参数、点按钮发请求——和前端联调省一大把时间。',
      '- pip install fastapi uvicorn',
      '- 函数上方加 @app.get("/路径") 变成接口',
      '- uvicorn main:app --reload：改代码自动重启',
      '- 返回 dict 自动变成 JSON',
      '- /docs：自动生成的接口文档页',
      '后端开发的第一步：先让一段 Python 代码被浏览器访问到。',
    ],
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
        title: '路径参数的花括号写法没掌握',
        bad: '@app.get("/users/用户ID")   # 写死的文字，不是动态的',
        good: '@app.get("/users/{user_id}")\ndef get_user(user_id: int):',
        note: '花括号 {名字} 是路径参数：网址里那一截会变成函数参数传进来，还能配类型校验。'
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
      },
      {
        type: 'code',
        question: '补全：把 hello 函数挂到 GET / 网址上。',
        code: '@app.____("/")\ndef hello():\n    return {"message": "你好"}',
        answer: 'get',
        accept: ['get'],
        explain: '@app.get("/") 表示"访问这个网址时执行下面的函数"——方法写在装饰器里。'
      }
    ]
  },
  {
    id: 'pydantic-basics',
    title: 'Pydantic：规定数据长什么样',
    phase: 8,
    order: 5,
    minutes: 24,
    rating: { level: 4, must: 4 },
    summary: '用 Pydantic 的 BaseModel 把"数据该有几个字段、各是什么类型"写清楚，让你调接口时不再糊涂。',
    keywords: ['Pydantic', 'BaseModel', '字段', '类型', '校验', '模型'],
    tip: '零基础提示：把 BaseModel 想成"养数据的表格模板"。你先把每列是什么类型定好，往里面装数据时，错的会被拦下来、对不上的会被提醒。',
    lecture: [
      '接口收发的数据几乎都是 JSON：字段多、类型乱，全靠人肉记不牢靠。Pydantic 用类把"该有哪些字段、每字段什么类型、缺了怎么办"一次性定死，并自动校验。',
      '用法：继承 BaseModel，声明带类型注解的字段。比如 class Score(BaseModel): name: str; score: int。装数据时 subject = Score(**字典)，Pydantic 会逐项检查：字符串进 int 字段会被提醒；缺 score 字段会说缺哪项。',
      '它和 json.loads 的差别：loads 只负责"变成字典"，类型对不对抓不住；BaseModel 是"验过的字典"——字段缺失、类型不对在源头就暴露，省得错误流进下游。',
      '类型注解写 int/str/bool/float/list[str] 都行；Optional[int] 表示可以没有；Field(default=..., ge=..., le=..., description="...") 能加默认值、数值范围和说明。',
      '- class Score(BaseModel): 声明字段类型',
      '- 三步：定义模型 → 载入数据 Score(**字典) → 用字段',
      '- 缺字段报错、类型不对自动报错，别等下游才发现',
      '- Optional[int]：字段可有可无',
      '- Field(...)：默认值、范围、说明文字',
      'Pydantic 是 FastAPI 数据校验的底层，也提高代码自我说明的程度。',
    ],
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
      },
      {
        title: '发出去的字段拼错了，被悄悄忽略',
        bad: 'User(nmae="小明", age=20)   # name 拼成了 nmae',
        good: 'User(name="小明", age=20)',
        note: 'Pydantic 默认忽略模型里没有的多余字段：拼错的键不报错，对应字段却缺了。收发字段名要照着模型核对。'
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
      },
      {
        type: 'judge',
        question: '给字段写默认值（如 name: str = ""）后，实例化时不传它也不会报错。',
        answer: true,
        explain: '有默认值的字段是可选的；没传就用默认值，必填字段则仍然必须传。',
      }
    ]
  },
  {
    id: 'post-request',
    title: 'POST：把数据发给服务器',
    phase: 8,
    order: 6,
    minutes: 26,
    rating: { level: 4, must: 4 },
    summary: '用 POST 请求把自己这一方的数据发给刚写的服务，服务接收并用 Pydantic 校验后返回结果。',
    keywords: ['POST', '请求体', 'Body', '发送', '接收', '响应'],
    tip: '零基础提示：GET 是去别人家要东西（参数挂在网址上），POST 是把自己这袋数据敲门递进去（放在请求体里）。调大模型的接口基本都用 POST，这一节是把前面几节串起来的关键一环。',
    lecture: [
      'GET 是"拿东西"，POST 是"交东西"。需要让服务器接收一整包数据——创建订单、提交表单、发消息——都要靠 POST，数据放在请求体（body）里，通常是一段 JSON。',
      'FastAPI 里：加 @app.post("/scores") 声明接口；想接收的请求体声明成一个 Pydantic 模型，放进函数参数——{"name": "小明", "score": 88} 就自动验完变成对象递进来。',
      '发 POST 也很简单：requests.post(url, json={"name": "小明", "score": 88})——json 参数自动加上 Content-Type 并序列化字典。',
      '大多数"发消息、拿回复"的 AI 接口本质都是 POST：你把 messages 列表以 JSON 交上去，服务器返回的 choices 里有模型的回答。这节课是下一节 LLM 接口的底子。',
      '- @app.post("/路径")：声明 POST 接口',
      '- 请求体 = 一个 Pydantic 模型的实例',
      '- requests.post(url, json={...})：发 JSON POST',
      '- GET 参数在路径，POST 数据在请求体——别用 GET 交账',
      '接口测试手法：先 GET 看通，再 POST 交数据，两边都过才算测完。',
    ],
    terms: [
      { term: 'post', zh: 'POST 方法', note: 'HTTP 请求里用来"提交数据"的方法，数据放进请求体而不是贴在网址上。' },
      { term: 'request body', zh: '请求体', note: '请求里携带的那一段数据内容，POST 通常放一段 JSON 在这里面。' },
      { term: 'request body model', zh: '请求体模型', note: '用 Pydantic 定义、用来接收并校验请求体的模型类，函数参数写上它，框架自动解析。' },
      { term: 'content-type', zh: '内容类型头', note: '请求/响应里说明数据格式的字段，发 JSON 时一般标 application/json。' },
      { term: 'requests.post', zh: '发 POST 请求', note: 'requests.post(url, json={...}) 一行把 JSON 请求体发出去。' }
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
      },
      {
        title: '服务没启动就发请求',
        bad: 'uvicorn 还没跑，直接 requests.post("http://127.0.0.1:8000/chat", ...)',
        good: '先启动 uvicorn main:app --reload，看到服务就绪再发',
        note: '本地端口连不上会抛 ConnectionError；先确认服务在跑、端口没写错。'
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
      },
      {
        type: 'judge',
        question: '用 requests.post(url, json={...}) 发送时，requests 会自动把字典变成 JSON 并加上 Content-Type 头。',
        answer: true,
        explain: 'json= 参数就是"序列化 + 设置 Content-Type"一条龙，比手动拼字符串可靠。',
      }
    ]
  },
  {
    id: 'llm-chat-api',
    title: '调用大模型接口：第一次拿到 AI 回复',
    phase: 8,
    order: 7,
    minutes: 32,
    rating: { level: 4, must: 5 },
    summary: '用一个 POST 请求调用兼容 OpenAI 格式的 chat 接口，拿到模型的回复；把密钥放进环境变量，再按类别处理报错。',
    keywords: ['LLM', '大模型', 'chat/completions', 'API Key', '环境变量', 'Bearer', 'OpenAI'],
    tip: '零基础提示：模型接口其实就是一个普通的 POST 网址。你已经会发请求、会读 JSON，把这两件事拼起来，就是所谓"调用 AI"。',
    lecture: [
      '大模型能用不是因为它懂"聊天"，而是因为它提供了一个 HTTP 接口：你发一段对话过去，它回一段对话。LLM API 本质就是你上两节的技能拼起来的产物——带请求体的 POST。',
      '请求长这样：POST 到某个 chat/completions 地址，body 里放 messages，是一组 {"role": "user", "content": "你好"} 的列表；带上 Authorization: Bearer 你的密钥 的请求头。',
      '响应里真正的回答藏在 choices[0].message.content，完整取法：data = r.json(); data["choices"][0]["message"]["content"]。额度用没用掉看 usage 里的 token 数。',
      '不依赖任何框架也能玩：requests（或 httpx）+ 一段 POST 就能接入大多数兼容接口。网络、密钥、状态码、JSON 解析全部在你眼皮底下——出了问题好排查。',
      '- 请求体：messages 列表，role + content',
      '- 请求头：Authorization: Bearer 密钥',
      '- 回答：data["choices"][0]["message"]["content"]',
      '- 用量：data["usage"] 记录 token 消耗',
      '- 密钥不进代码库——放环境变量或 .env 文件',
      '这一节之后，你就能让 Python 和真正的 AI 对话了。',
    ],
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