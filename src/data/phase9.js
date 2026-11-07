/**
 * 第九阶段：常用框架与工具（主线与选修之间的桥梁，约 3.5 小时）
 * 目标读者：学完主线、想用现成框架写小工具的人。
 * 每个知识点都给出"装什么、跑什么、看到什么"，示例需装包或联网时标 verify: false。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'flask-basics',
    title: 'Flask：最小的网页框架',
    phase: 9,
    order: 1,
    minutes: 32,
    rating: { level: 3, must: 4 },
    summary: '装一个 Flask，用十几行代码起一个小网站：一个网址对应一个函数，浏览器一打开就能看到结果。',
    keywords: ['Flask', 'flask', '路由', 'route', '网页', '框架', '服务器', 'WSGI'],
    tip: '零基础提示：Flask 把"做一个网站"拆成小得不能再小的两步——写一个普通函数，再告诉它"访问哪个网址时执行这个函数"。函数返回什么，浏览器就显示什么。',
    lecture: [
      '现在的程序都是"运行一下、跑完就停"。Flask 让程序一直运行、等着别人来访问——这就是"网页服务"的雏形。',
      '核心就一个装饰器：@app.route("/路径") 把一个函数挂到某个网址上。别人访问这个地址，Flask 就执行函数，把返回值当作网页内容发回去。',
      '最小形态：from flask import Flask；app = Flask(__name__)；@app.route("/hello") + return "你好"；app.run(debug=True) 启动；浏览器访问 /hello 就看结果。',
      'Flask 是"微框架"：只给你路由和模板这两样最少的东西，数据库、登录、表单都靠插件或自己写。优点是上手极快、结构清晰，缺点是要自由发挥得规矩点。',
      '- @app.route("/路径")：路由挂载',
      '- return 字符串：原样发回；return render_template(...)：渲染模板',
      '- app.run(debug=True)：开发模式，改代码自动重启',
      '- 一条路由 = 一个函数 = 一个页面',
      'Flask 把"函数"变成"网页"——这是搭后端的最快方式。',
    ],
    terms: [
      { term: 'framework', zh: '框架', note: '别人已经写好骨架、你只填自己那部分代码的工具包；Flask 是专做网页服务的框架。' },
      { term: 'route', zh: '路由', note: '网址和函数之间的对应关系：访问这个网址，就执行这个函数。' },
      { term: 'debug mode', zh: '调试模式', note: 'app.run(debug=True) 出错时直接在网页上显示完整报错，方便开发期排查。' },
      { term: 'status code', zh: '状态码', note: '服务器对这次访问的回答代号，200 表示一切正常，404 表示这个网址不存在。' },
      { term: 'wsgi', zh: 'WSGI', note: 'Python 网页服务程序的通用接口标准，Flask 应用按这个标准被服务器调用。' },
    ],
    steps: [
      '在终端输入 pip install flask 安装。',
      '新建文件 app.py，从 flask 导入 Flask 并创建 app = Flask(__name__)。',
      '用 @app.route("/") 装饰一个函数，函数里 return 一段文字。',
      '终端输入 flask --app app run 启动（文件名用 app.py 时可以省略 --app）。',
      '浏览器打开 http://127.0.0.1:5000 查看结果，按 Ctrl+C 停止服务。',
    ],
    examples: [
      {
        title: '一个能打开的网页',
        code: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "<h1>你好，Flask</h1>"\n\n# 终端启动：flask --app app run',
        output: '预期说明：启动后浏览器打开 http://127.0.0.1:5000 会看到加粗的"你好，Flask"。需先安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。@app.route("/") 表示"访问网站首页时执行下面这个函数"，函数名随便起，但要能看懂。',
        verify: false,
      },
      {
        title: '多个网址与网址里带参数',
        code: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "首页"\n\n@app.route("/hello/<name>")\ndef hello(name):\n    return f"你好，{name}"\n\n# 浏览器访问 /hello/小明 会显示：你好，小明',
        output: '预期说明：访问 / 显示"首页"；访问 /hello/小明 显示"你好，小明"。需安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。网址里的 <name> 是占位符，函数必须有一个同名参数来接它，名字要一模一样。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '函数忘了 return',
        bad: '@app.route("/")\ndef index():\n    print("你好")',
        good: '@app.route("/")\ndef index():\n    return "你好"',
        note: '网页内容来自函数的返回值。只 print 不 return，浏览器会收到"服务器内部错误"，而终端里能看到你打印的字。',
      },
      {
        title: '文件名起成 flask.py',
        bad: '把代码存成 flask.py 再运行',
        good: '存成 app.py、main.py 这类别的名字',
        note: '文件名叫 flask.py 时，import flask 会引到自己这个文件，报错说找不到 Flask，很难看出原因。',
      },
      {
        title: '占位符和函数参数名字不一致',
        bad: '@app.route("/hello/<name>")\ndef hello(username):\n    return username',
        good: '@app.route("/hello/<name>")\ndef hello(name):\n    return name',
        note: '网址里的占位符名要和函数参数名完全一致，差一个字母就会报缺参数。',
      },
    ],
    practice: [
      {
        prompt: '写一个 Flask 应用：根网址返回"欢迎"，另加一个 /about 返回"关于本站"。',
        starter: 'from flask import Flask\n\napp = Flask(__name__)\n\n# TODO: 写两个路由和函数\n',
        answer: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "欢迎"\n\n@app.route("/about")\ndef about():\n    return "关于本站"',
        output: '预期说明：访问 / 显示"欢迎"，访问 /about 显示"关于本站"。需安装 flask 并在本机运行。',
        hint: '每个网址写一个 @app.route(...) 装饰的函数，函数里的 return 就是显示内容。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '@app.route("/about") 这行代码的作用是什么？',
        options: ['打印一段文字', '把网址 /about 交给下面这个函数处理', '安装 Flask', '把网页保存到文件'],
        answer: 1,
        explain: 'route 建立"网址 → 函数"的对应关系，访问该网址时执行被装饰的函数。',
      },
      {
        type: 'judge',
        question: 'Flask 里函数用 print 输出内容，浏览器就能看到这段内容。',
        answer: false,
        explain: '浏览器看到的是函数 return 的内容；print 只会打印在运行服务的那个终端里。',
      },
    ],
  },
  {
    id: 'django-intro',
    title: 'Django：带后台的完整框架',
    phase: 9,
    order: 2,
    minutes: 34,
    rating: { level: 4, must: 3 },
    summary: '认识"大而全"的 Django：用命令生成项目结构，写一个视图返回网页，再把数据登记进自带的后台管理界面。',
    keywords: ['Django', 'django', '项目结构', '视图', 'view', '模型', 'model', '后台', 'admin'],
    tip: '零基础提示：Django 不像 Flask 那样从空文件开始，而是用命令先给你生成一堆文件夹。别被吓到——你只要认识其中几个文件，其余交给它。',
    lecture: [
      'Flask 是"毛坯房"，Django 是"精装房"：网址、页面、数据库、后台管理全部内置，代价是结构比 Flask 复杂、约定更多。',
      '三步跑起来：pip install django；django-admin startproject 项目名 生成骨架；在 urls.py 把网址接到视图函数上，python manage.py runserver 启动。',
      '数据库模型：写一个"模型类"描述数据长什么样（类名 + 属性 = 字段），跑两条命令——makemigrations 生成变更、migrate 建表——就能在自带的 /admin 后台里添加、修改数据，不用自己写管理页面。',
      'Django 的核心思路：配置优于自由发挥。适合后台管理、内容型网站、标准 CRUD；验证过的大规模工程很多。Python 圈有名的网站大量用 Django 起步。',
      '- pip install django；django-admin startproject mysite',
      '- urls.py 接线：网址 → 视图函数',
      '- 模型类 → makemigrations → migrate：从类到表',
      '- /admin 自带后台，跑完自带一整套管理页面',
      '- 全套约定好了，适合"快速上线+后期扩展"',
      '要全套基础设施就选 Django，要轻装起步就选 Flask——看团队偏好。',
    ],
    terms: [
      { term: 'project', zh: '项目', note: 'Django 对一个网站的称呼，用 django-admin startproject 生成，包含一个同名文件夹和 manage.py。' },
      { term: 'view', zh: '视图', note: 'Django 里处理一次访问的函数，接收请求参数 request，返回一个响应对象。' },
      { term: 'model', zh: '模型', note: '用类描述数据库里的一张表：一个类对应一张表，一个属性对应一列。' },
      { term: 'migration', zh: '迁移', note: '把模型里的字段变化变成数据库建表 / 改表动作的记录，先 makemigrations 再 migrate。' },
      { term: 'admin', zh: '后台管理', note: 'Django 自带的数据管理页面 /admin，把模型登记一下就有一整套增删改查界面。' },
    ],
    steps: [
      '在终端输入 pip install django 安装。',
      '输入 django-admin startproject mysite，生成项目文件夹。',
      '进入项目文件夹，新建 views.py 写一个返回 HttpResponse 的函数。',
      '在 urls.py 里用 path("", views.index) 把网址接到这个函数。',
      '输入 python manage.py runserver 启动，浏览器打开 http://127.0.0.1:8000 查看。',
      '想存数据时：写 models.py → python manage.py makemigrations → python manage.py migrate。',
      '在 admin.py 里 admin.site.register(你的模型)，再用 python manage.py createsuperuser 建管理账号，访问 /admin。',
    ],
    examples: [
      {
        title: '最小视图与网址配置',
        code: '# views.py\nfrom django.http import HttpResponse\n\ndef index(request):\n    return HttpResponse("你好，Django")\n\n# urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path("", views.index),\n]',
        output: '预期说明：python manage.py runserver 启动后，浏览器打开 http://127.0.0.1:8000 显示"你好，Django"。需先安装 django 并生成项目。',
        note: '需先安装 django。视图函数第一个参数必须是 request；urls.py 里的 path 第一个参数是网址，第二个参数是处理它的函数。',
        verify: false,
      },
      {
        title: '用模型描述数据，并登记到后台',
        code: '# models.py\nfrom django.db import models\n\nclass Todo(models.Model):\n    title = models.CharField(max_length=100)\n    done = models.BooleanField(default=False)\n\n# admin.py\nfrom django.contrib import admin\nfrom .models import Todo\n\nadmin.site.register(Todo)',
        output: '预期说明：makemigrations 与 migrate 之后，用 createsuperuser 建好账号，访问 /admin 就能在网页上添加、修改待办数据。需安装 django 并运行服务。',
        note: '需先安装 django 并运行服务。类名 Todo 会变成数据库表名和后台里的菜单名；CharField 表示短文本，BooleanField 表示真假。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '改了模型忘了建迁移',
        bad: '在 models.py 加了字段，直接刷新页面找新字段',
        good: '改完模型先跑 python manage.py makemigrations，再跑 python manage.py migrate',
        note: '模型只是代码里的描述，要让数据库真的建表或加列，必须跑这两条命令，缺一条页面就报错找不到字段。',
      },
      {
        title: '视图函数忘了 request 参数',
        bad: 'def index():\n    return HttpResponse("你好")',
        good: 'def index(request):\n    return HttpResponse("你好")',
        note: 'Django 调用视图时会把这次请求的信息当第一个参数传进来，少了它会被当成网址配置写错，报参数数量不对。',
      },
      {
        title: '网址没接上却以为是代码问题',
        bad: 'views.py 写好了函数，urls.py 里没写 path，访问直接 404',
        good: '在 urls.py 的 urlpatterns 里加 path("index/", views.index)',
        note: '404 有时不是代码错，而是这个网址压根没登记。写完视图顺手把网址接上，再看结果。',
      },
      {
        title: '新建了 app 却没登记进 INSTALLED_APPS',
        bad: '写了 myapp/ 应用，settings.py 里没有加它',
        good: "在 settings.py 的 INSTALLED_APPS 列表里加上 'myapp'",
        note: 'Django 的模型、后台都对 INSTALLED_APPS 里的应用生效；忘了登记会出现"表不存在"这类奇怪报错。'
      },
    ],
    practice: [
      {
        prompt: '写一个 Django 视图函数，访问 /about 时返回"关于本站"，并写出 urls.py 里对应的那行 path。',
        starter: '# views.py\nfrom django.http import HttpResponse\n\n# TODO: 写 about 视图\n\n# urls.py\n# TODO: 写出 path 那一行\n',
        answer: '# views.py\nfrom django.http import HttpResponse\n\ndef about(request):\n    return HttpResponse("关于本站")\n\n# urls.py\npath("about/", views.about)',
        output: '预期说明：浏览器访问 http://127.0.0.1:8000/about 显示"关于本站"。需安装 django 并在本机运行。',
        hint: '视图第一个参数写 request；urls.py 里 path 的第二个参数是 views 加函数名，不要写成调用（不加括号）。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '在 Django 里，用类描述数据库表结构，这个类放在哪个文件？',
        options: ['views.py', 'models.py', 'admin.py', 'manage.py'],
        answer: 1,
        explain: 'models.py 放模型类；views.py 放视图，admin.py 负责把模型登记到后台，manage.py 是命令行入口。',
      },
      {
        type: 'judge',
        question: '写完模型后，直接刷新页面数据库就会自动建表。',
        answer: false,
        explain: '必须运行 makemigrations 生成迁移、再运行 migrate 应用迁移，数据库才会真正建表或改列。',
      },
    ],
  },
  {
    id: 'httpx-async',
    title: 'httpx：会"同时等"的请求库',
    phase: 9,
    order: 3,
    minutes: 30,
    rating: { level: 4, must: 4 },
    summary: '用 httpx 的异步写法一次发出多个请求：不必等第一个返回再发第二个，总耗时从"相加"变成"取最长的那一个"。',
    keywords: ['httpx', 'async', 'await', 'asyncio', 'AsyncClient', '并发', '超时', 'timeout'],
    tip: '零基础提示：同步就像排队打电话，一个人打完全程才轮到下一个；异步像同时发好几条短信，谁先回就先处理谁。httpx 两种写法都支持，先学最稳的那种。',
    lecture: [
      'requests 每次请求都会"停在那里等"服务器回复——发三个请求就要等三次的时间。httpx 提供同步和异步两种写法，是既兼容 requests 又能异步的进化版。',
      '同步写法几乎就是 requests 的翻版：r = httpx.get(url)；r.status_code；r.json()。真正的区别是异步：用 async def 定义函数、在请求前加 await，再用 asyncio 的 gather 把多个请求一起发。',
      '异步的收益在"同时发很多"时体现出来：三个耗时各 1 秒的请求，同步要 3 秒，gather 并发要约 1 秒——等待时间全部重叠。',
      'httpx 还默认带超时（requests 默认没有超时，网络不好会永远卡住），这是它工程上更省心的地方之一。',
      '- httpx.get(url)：同步版，写法近似 requests',
      '- async def + await httpx.AsyncClient().get(url)：异步版',
      '- asyncio.gather(t1, t2, t3)：并发发出、按序收结果',
      '- 默认带超时，网络问题不会无限卡住',
      '- 想一次获取大量页面：httpx 异步是最顺手的',
      '同步代码先跑通逻辑，性能敏感处换成 httpx 异步即可。',
    ],
    terms: [
      { term: 'async', zh: '异步', note: '一种写代码的标记：函数里能用 await 去等待网络这类慢操作，等待期间程序可以去做别的事。' },
      { term: 'await', zh: '等待', note: '写在慢操作前面，表示"这里等它返回"，同时把控制权让出去，不被干等着卡住。' },
      { term: 'asyncio', zh: '异步标准库', note: 'Python 自带的异步工具箱，asyncio.run 负责跑起异步函数，asyncio.gather 负责把多个任务一起等。' },
      { term: 'timeout', zh: '超时', note: '最多等多久，超过就报错，避免网络卡住时程序一直不动。httpx 默认 5 秒。' },
      { term: 'concurrent', zh: '并发', note: '多个任务在时间上重叠执行，看起来像同时在跑。' },
    ],
    steps: [
      '在终端输入 pip install httpx 安装。',
      '写一个 async def 函数，里面用 await client.get(...) 发请求。',
      '用 asyncio.run(...) 跑起这个异步函数，先确认能正常拿到结果。',
      '把多个请求放进 asyncio.gather(...)，观察总耗时比逐个请求短。',
      '给请求加 timeout=10，避免网络不好时一直等。',
    ],
    examples: [
      {
        title: '一次发出三个请求',
        code: 'import asyncio\nimport time\nimport httpx\n\nasync def main():\n    start = time.time()\n    async with httpx.AsyncClient(timeout=10) as client:\n        urls = ["https://example.com"] * 3\n        results = await asyncio.gather(*(client.get(u) for u in urls))\n    for r in results:\n        print(r.status_code)\n    print("耗时", round(time.time() - start, 2), "秒")\n\nasyncio.run(main())',
        output: '预期说明：打印三个 200，最后一行是总耗时秒数；因为三个请求同时在跑，耗时接近一个请求的时间。需安装 httpx 并联网在本机运行（示例站点的实际响应时间取决于网络）。',
        note: '需安装 httpx 并在本机运行（需要联网）。asyncio.gather 收一串任务，一起等它们完成；* 号把生成器里的任务一个个摊开放进去。',
        verify: false,
      },
      {
        title: '用同一个客户端连发多个请求',
        code: 'import asyncio\nimport httpx\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return r.status_code\n\nasync def main():\n    async with httpx.AsyncClient(timeout=10) as client:\n        codes = await asyncio.gather(\n            fetch(client, "https://example.com"),\n            fetch(client, "https://example.com"),\n        )\n    print(codes)\n\nasyncio.run(main())',
        output: '预期说明：打印一个列表，里面是两个 200。需安装 httpx 并联网在本机运行。',
        note: '需安装 httpx 并在本机运行（需要联网）。复用一个 client 能省下重复建立连接的开销，比每次新建再发要快。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '在普通函数里用 await',
        bad: 'def main():\n    r = await client.get(url)',
        good: 'async def main():\n    r = await client.get(url)',
        note: 'await 只能写在 async def 里面，普通函数里用会直接报语法错误。改函数声明是第一步。',
      },
      {
        title: '忘记 asyncio.run',
        bad: 'async def main():\n    ...\n\nmain()　# 没有任何输出，只提示协程对象',
        good: 'asyncio.run(main())',
        note: '异步函数写好后必须交给 asyncio.run 去执行；直接调用只会得到一个"协程对象"，里面代码根本没跑。',
      },
      {
        title: '不给超时，网络一卡就干等',
        bad: 'client = httpx.AsyncClient()　# 只依赖默认值，长任务里容易等太久',
        good: 'client = httpx.AsyncClient(timeout=10)',
        note: '显式写超时，等于说"最多等 10 秒"。网络不稳时程序会及时报错，而不是一直转圈。',
      },
      {
        title: '拿 r.text 当 JSON 解析失败还不知道原因',
        bad: 'data = r.json()   # 返回的不是 JSON 时抛异常',
        good: '先看 r.headers["content-type"] 是不是 application/json，再决定 r.json()',
        note: '接口出错时常常返回 HTML 错误页；先看响应头里的类型，再选解析方式。'
      },
    ],
    practice: [
      {
        prompt: '用 httpx 异步并发访问两个网址，打印各自的状态码与总耗时。',
        starter: 'import asyncio\nimport time\nimport httpx\n\nasync def main():\n    # TODO: 用 AsyncClient 并发请求两个网址并打印结果\n    pass\n\nasyncio.run(main())\n',
        answer: 'import asyncio\nimport time\nimport httpx\n\nasync def main():\n    start = time.time()\n    async with httpx.AsyncClient(timeout=10) as client:\n        results = await asyncio.gather(\n            client.get("https://example.com"),\n            client.get("https://example.com"),\n        )\n    for r in results:\n        print(r.status_code)\n    print("耗时", round(time.time() - start, 2), "秒")\n\nasyncio.run(main())',
        output: '预期说明：打印两个 200 和一行耗时。需安装 httpx 并联网在本机运行。',
        hint: '把两次 client.get(...) 放进 asyncio.gather，再 await 整个 gather 的结果。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '异步请求相比逐个同步请求，主要好处是什么？',
        options: ['不用联网也能拿到数据', '多个请求同时在等，总耗时接近最慢的那一个', '自动帮你写好解析代码', '不需要安装库'],
        answer: 1,
        explain: '异步让等待时间重叠：发三个请求的总耗时接近最常见的一个，而不是三个相加。',
      },
      {
        type: 'judge',
        question: '在普通 def 函数里也可以直接使用 await。',
        answer: false,
        explain: 'await 只能出现在 async def 定义的函数里，否则是语法错误。',
      },
      {
        type: 'judge',
        question: '给 httpx.AsyncClient 设置 timeout=10 后，请求超过 10 秒会抛超时异常。',
        answer: true,
        explain: '超时就是"最多等多久"；到点报错总比无限等待好，还能在 except 里给出提示。',
      },
    ],
  },
  {
    id: 'pytest-basics',
    title: 'pytest：给你的代码加自动检查',
    phase: 9,
    order: 4,
    minutes: 32,
    rating: { level: 3, must: 4 },
    summary: '把"我手动跑了一次，看起来对"变成一条能重复执行的检查：写一个以 test_ 开头的函数，用 assert 说明期望。',
    keywords: ['pytest', '测试', 'assert', '断言', 'fixture', '夹具', 'parametrize', '用例'],
    tip: '零基础提示：测试不是什么高深的东西，就是把"我试过、结果对"写成一行可以反复运行的检查。以后改了代码，一跑就知道有没有把原来的功能弄坏。',
    lecture: [
      '代码改一处，另一处悄悄坏了——没有测试就只能靠"上线后用户来报 bug"。pytest 让你把"期望的结果"写成自动化清单。',
      '约定：测试文件名以 test_ 开头，测试函数名以 test_ 开头；函数里用 assert 直接比较"实际结果 == 期望结果"，断言失败 pytest 会指出哪一行、实际值是什么。',
      '运行 pytest，它自动收集并执行所有测试：全绿表示行为符合预期。失败时会打印完整 traceback 和差异，定位比自己 print 排查快得多。',
      '数据一多可以用 parametrize 一次跑多组输入——省得复制粘贴同一个测试。Fixture（如 临时文件、测试客户端）把"搭场子"的代码抽出来复用。',
      '- 文件 test_xxx.py，函数 test_yyy()',
      '- assert 实际 == 期望：错了自动报差异',
      '- 运行 pytest，全绿即通过',
      '- @pytest.mark.parametrize 一次跑多组数据',
      '- 用测试锁住关键逻辑，改代码不再提心吊胆',
      '没有测试的代码=黑盒。先让核心函数有测试，再谈上线。',
    ],
    terms: [
      { term: 'test case', zh: '测试用例', note: '一条具体的检查：给定输入，看结果是否等于预期。' },
      { term: 'assert', zh: '断言', note: 'Python 关键字，后面跟一个条件，条件不成立就报错——这就是测试失败的信号。' },
      { term: 'fixture', zh: '夹具', note: '用 @pytest.fixture 装饰的函数，为多个测试准备好公共数据，谁需要就在参数里写谁的名字。' },
      { term: 'parametrize', zh: '参数化', note: '用 @pytest.mark.parametrize 给同一个测试喂多组输入，一次跑完所有组合。' },
      { term: 'regression', zh: '回归', note: '改代码后跑一遍旧测试，确认没把原来能用的功能弄坏。' },
    ],
    steps: [
      '在终端输入 pip install pytest 安装。',
      '新建文件 test_utils.py，写一个 test_ 开头的函数，里面写 assert。',
      '在终端输入 pytest 运行，看到收集到几条用例、几条通过。',
      '故意改错一处，再跑一次，看失败信息里给出的差异。',
      '数据多时用 @pytest.mark.parametrize 写出多组输入。',
    ],
    examples: [
      {
        title: '第一个测试与参数化',
        code: 'import pytest\n\ndef add(a, b):\n    return a + b\n\ndef test_add_once():\n    assert add(1, 2) == 3\n\n@pytest.mark.parametrize("a, b, expected", [\n    (1, 1, 2),\n    (2, 3, 5),\n    (0, 5, 5),\n])\ndef test_add_many(a, b, expected):\n    assert add(a, b) == expected',
        output: '预期说明：终端运行 pytest 会显示收集到 4 条用例并全部通过。需先安装 pytest 并在本机运行。',
        note: '需安装 pytest 并在本机运行。函数名必须以 test_ 开头才会被收集；parametrize 的每一组数据会被当成一条独立用例，失败时能直接看出是哪一组。',
        verify: false,
      },
      {
        title: '用夹具准备公共数据',
        code: 'import pytest\n\n@pytest.fixture\ndef todos():\n    return [{"title": "写作业", "done": False}]\n\ndef test_has_one(todos):\n    assert len(todos) == 1\n\ndef test_not_done(todos):\n    assert todos[0]["done"] is False',
        output: '预期说明：终端运行 pytest 显示两条用例通过。需先安装 pytest 并在本机运行。',
        note: '需安装 pytest 并在本机运行。夹具函数用 @pytest.fixture 装饰，测试函数在参数里写上它的名字就能拿到返回值，省掉重复准备数据。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '文件名或函数名没以 test 开头',
        bad: '文件 check_utils.py 里的 def check_add():',
        good: '文件 test_utils.py 里的 def test_add():',
        note: 'pytest 只收集文件名 test_ 开头或 _test 结尾、函数名 test_ 开头的用例。名字不对，运行时会显示"没有收集到任何用例"。',
      },
      {
        title: '用 assert 写在函数外',
        bad: 'assert add(1, 2) == 3  # 直接写在文件顶层',
        good: '把 assert 放进 def test_add(): 里',
        note: '顶层断言只在文件被导入或执行时跑一次，pytest 收集不到，也就不会当成用例统计。',
      },
      {
        title: '期望值和实际值写反或写死了自己的输出',
        bad: 'assert add(1, 2) == "3"  # 字符串和整数永远不相等',
        good: 'assert add(1, 2) == 3',
        note: '类型不同也是不相等。失败信息里会同时给出左右两边的值和类型，一行行读它就能定位问题。',
      },
      {
        title: '测试之间互相依赖执行顺序',
        bad: 'def test_b():\n    assert cache.count == 1   # 依赖 test_a 先跑过',
        good: '每个测试自己准备数据（或用 fixture），互不依赖',
        note: 'pytest 不保证顺序；单独跑某一个测试时也能通过，测试才可靠。'
      },
    ],
    practice: [
      {
        prompt: '为函数 double(x) 写一个测试，覆盖 double(2) == 4 和 double(-1) == -2 两组输入。',
        starter: 'import pytest\n\ndef double(x):\n    return x * 2\n\n# TODO: 用 parametrize 写一个测试\n',
        answer: 'import pytest\n\ndef double(x):\n    return x * 2\n\n@pytest.mark.parametrize("x, expected", [(2, 4), (-1, -2)])\ndef test_double(x, expected):\n    assert double(x) == expected',
        output: '预期说明：终端运行 pytest 显示收集到 2 条用例并全部通过。需先安装 pytest 并在本机运行。',
        hint: 'parametrize 的第二个参数是组数的列表，函数参数要与它一一对应。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'pytest 会收集哪些函数当作测试用例？',
        options: ['所有函数', '名字以 test_ 开头的函数', '名字以 main 开头的函数', '写在文件末尾的函数'],
        answer: 1,
        explain: '默认规则是文件名符合 test_*.py 或 *_test.py，函数名以 test_ 开头。',
      },
      {
        type: 'judge',
        question: '测试函数里的 assert 条件不成立时，pytest 会报告这条用例失败。',
        answer: true,
        explain: 'assert 后面条件为假就抛错误，pytest 捕获后报告失败并给出实际值与预期值的对比。',
      },
      {
        type: 'code',
        question: '补全：用参数化覆盖 double(0) == 0 这一组。',
        code: '@pytest.mark.parametrize("x, expected", [(0, ____)])\ndef test_double(x, expected):\n    assert double(x) == expected',
        answer: '0',
        accept: [],
        explain: 'parametrize 的每组数据是一个元组，(0, 0) 表示输入 0 期望 0。'
      }
    ],
  },
  {
    id: 'writing-checklist',
    title: '写 Python 前先过一遍：四个必查',
    phase: 9,
    order: 5,
    minutes: 22,
    rating: { level: 2, must: 5 },
    summary: '把最常见的书写错误记成四条检查：半角标点、缩进一致、引号成对、类型先搞清楚。',
    keywords: ['语法', '中文标点', '缩进', '引号', '类型转换', '报错', '书写'],
    tip: '零基础提示：报语法错误不一定是你"不会"，很多只是多了一个中文逗号、少了一个括号，或者缩进没对齐。先过这四条，再谈逻辑。',
    lecture: [
      '写 Python 之前先记住四件小事，它们覆盖了初学错误率最高的四大类：标点、缩进、引号、类型。',
      '第一，中文输入法状态下输入的括号是全角（），Python 只认半角 ()，一遇到全角标点直接报 SyntaxError——切换到英文输入再写代码。',
      '第二，同一层代码严格对齐；缩进用 4 个空格（不要用 Tab、空格混排）。缩进决定了代码"属于谁"，缩错一格整个逻辑就跑偏。',
      '第三，引号成对出现：单引号、双引号都行，但要成对——少一个引号整行都是报错。三引号 """""" 用来装多行字符串。',
      '第四，先想类型再写代码：input() 永远得到字符串，想算数先 int()/float() 转换——类型不匹配是初学者的头号拦路虎。',
      '- 全角标点（）→ SyntaxError；写代码切英文输入',
      '- 缩进：4 个空格，统一风格，别混用 Tab',
      '- 引号成对：\'...\' 或 "..."，数清楚',
      '- input() 结果永远是 str，运算前先转换',
      '- 养成习惯：先想类型，再落笔',
      '把这四条想清楚，你将少掉大半"看了半天不知道错在哪"的时间。',
    ],
    terms: [
      { term: 'syntax', zh: '语法', note: '规定"怎么写才算合法代码"的规则集合；违反它就会报语法错误。' },
      { term: 'indentation', zh: '缩进', note: '每一行代码前的空格，Python 用它表示代码块的层次。' },
      { term: 'type', zh: '类型', note: '数据的种类，决定它能和哪些操作结合；str、int 不是随便互换的。' },
      { term: 'error', zh: '错误', note: '程序没法继续正常往下跑时，Python 停下并告诉你出错原因的提示。' },
      { term: 'half-width', zh: '半角字符', note: '英文标点占一格、全角占两格；代码里只用半角符号。' },
    ],
    steps: [
      '写代码前先看编辑器里有没有中文标点（括号、逗号、引号、冒号）。',
      '同一段里的行，用空格或 Tab 保持一致缩进，不要复制粘贴后一行对齐一行不对齐。',
      '写完一组引号，立刻确认前后引号都在：字符串没闭合会把后面整段都吞进去。',
      '写变量时想清它是数字还是文字；需要加减时确认是数字，需要拼接时确认是文字。',
    ],
    examples: [
      {
        title: '标点错误最容易骗过自己',
        code: 'name = "小明"\nprint(name）',
        output: '预期说明：会报 SyntaxError（语法错误），因为 print 后面用了中文括号。把）改成英文括号即可。',
        note: '中文输入法很容易顺手打出全角括号。代码里所有括号、引号、逗号、冒号都必须是英文半角。',
        verify: false,
      },
      {
        title: '缩进不一致会制造假象',
        code: 'def hello():\n    print("你好")\n  print("再见")',
        output: '预期说明：会报 IndentationError（缩进错误），因为函数内两行代码的缩进不一样。',
        note: '复制粘贴时尤其容易出错。统一用 4 个空格或一个 Tab，别混用。',
        verify: false,
      },
      {
        title: '类型没想清楚，加法就报错',
        code: 'age = "18"\nprint(age + 1)',
        output: '预期说明：会报 TypeError，因为字符串 age 不能直接加整数 1。先把 age 转成 int，或者把两边都转成 str。',
        note: 'int(age) + 1 得到 19；age + "1" 得到 "181"——后者不是给年龄回答的人准备的。先决定你要的是算术还是拼接。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '复制粘贴后中英文括号混用',
        bad: 'print（"你好"）',
        good: 'print("你好")',
        note: '从聊天窗口/文档复制的代码常带中文括号。发现整行红波浪线，先检查最显眼的括号和逗号。',
      },
      {
        title: '缩进一行 4 空格、另一行 1 个 Tab',
        bad: 'def run():\n    print("a")\n\tprint("b")',
        good: 'def run():\n    print("a")\n    print("b")',
        note: '看起来都对齐，机器却判定层次不同。打开编辑器的显示空格功能，能一眼看出混用的 Tab。',
      },
      {
        title: '先写再补括号，结果引号没闭合',
        bad: 'title = "我喜欢 Python',
        good: 'title = "我喜欢 Python"',
        note: '字符串的结束引号忘写，后面几行都会被算作字符串的一部分，报错信息往往指向后面，很难让人直接想到是上一行漏了。',
      },
      {
        title: '把输入值当数字用',
        bad: 'n = input("请输入年龄：")\nprint(n + 1)',
        good: 'n = int(input("请输入年龄："))\nprint(n + 1)',
        note: 'input 读到的永远是字符串。要做算术先转 int/float；要拼接到文字里，保持它是 str 即可。',
      },
    ],
    practice: [
      {
        prompt: '下面这行不能运行。找出错误并修正：age = "18"；print(age + 1)。',
        starter: 'age = "18"\nprint(age + 1)\n',
        answer: 'age = "18"\nprint(int(age) + 1)',
        output: '19',
        hint: 'input/input() 风格来的字符串要先转 int 才能做算术。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '代码报语法错误，最先应当检查什么？',
        options: ['电脑是否需要重启', '括号、引号、逗号是否用了中文半角/全角', '变量名是不是起得太长', '有没有装第三方库'],
        answer: 1,
        explain: '中文标点和括号不成对是最常见的语法错误来源，往往和逻辑无关。',
      },
      {
        type: 'judge',
        question: 'input() 读到的内容可以直接拿来加 1。',
        answer: false,
        explain: 'input() 返回的是字符串，要先用 int() 或 float() 转换成数字再做算术。',
      },
    ],
  },
  {
    id: 'flask-api',
    title: '用 Flask 写一个 JSON 接口',
    phase: 9,
    order: 6,
    minutes: 34,
    rating: { level: 4, must: 4 },
    summary: '做一个能被别的程序调用的接口：收到 JSON 校验字段，处理后在响应里带上正确的状态码。',
    keywords: ['Flask', 'JSON', '接口', 'request.get_json', 'jsonify', '状态码', '400', 'API'],
    tip: '零基础提示：网页接口和 JSON 接口是同一个东西的两种用途——前者给人看，后者给程序读。判断标准是"调用方是不是程序"：是程序就返回 JSON。',
    lecture: [
      '接口不是给"人"看的，是给另一段程序调用的。调用方看不见你的代码，只认你约定的输入、输出和状态码——这就是接口设计的核心。',
      '三个约定：输入约定——接收什么样的 JSON、哪些字段必填；输出约定——始终返回同样的 JSON 结构，字段名固定；错误约定——状态码只在约定的范围里枚举（400 参数问题 / 401 没登录 / 500 服务器错误）。',
      'Flask 里：request.get_json() 取请求体；jsonify(字典) 返回 JSON 响应；数据不对时 return jsonify(error="score 必须是整数"), 400——让调用方一看状态码就知道问题出在自己，而不是收到格式混乱的错误页面。',
      '错误提示要对调用方友好：指出哪个字段、什么值、什么约束，而不是抛一大坨堆栈轨迹。',
      '- 输入：request.get_json()，校验字段、类型',
      '- 输出：jsonify({"ok": true, "data": ...})',
      '- 错误：jsonify({"error": "字段 xxx：..."}) + 400',
      '- 状态码枚举：200 成功 / 400 参数错 / 401 未登录 / 404 不存在 / 500 服务端错',
      '接口做好的标志是：陌生的程序看一份文档就能用，不需要问你。',
    ],
    terms: [
      { term: 'jsonify', zh: '转成 JSON 响应', note: '把 Python 字典变成带 JSON 内容的响应对象' },
      { term: 'request', zh: '请求对象', note: '本次访问带进来的信息，包含请求体、网址参数和请求头' },
      { term: 'status code', zh: '状态码', note: '数字形式的处理结果：200 成功、400 调用方数据不对、404 找不到、500 服务端出错' },
      { term: 'validate', zh: '校验', note: '检查调用方传来的字段是否齐全、类型是否正确' },
      { term: 'get_json', zh: '取请求体', note: 'request.get_json(silent=True) 拿到请求体字典，格式不对也不炸' },
    ],
    steps: [
      '写 @app.post("/todos") 的接口函数，先只返回一个固定字典，确认能通。',
      '用 data = request.get_json(silent=True) 取请求体，处理"没传或不是 JSON"的情况。',
      '逐项检查字段是否齐全、类型对不对；不对就 return jsonify(...), 400。',
      '成功时用 jsonify 返回业务数据，并明确带上 201 或 200。',
      '用另一个脚本或浏览器插件发一次请求，把 200 和 400 两条路都走通。',
    ],
    examples: [
      {
        title: '接收 JSON 并返回结果',
        code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post("/todos")
def create_todo():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or "title" not in data:
        return jsonify({"error": "缺少 title 字段"}), 400
    title = str(data["title"]).strip()
    if not title:
        return jsonify({"error": "title 不能为空"}), 400
    return jsonify({"id": 1, "title": title, "done": False}), 201`,
        output: '预期说明：用 JSON 请求体 {"title": "写作业"} 访问 /todos，返回 201 和 {"done": false, "id": 1, "title": "写作业"}；不传 title 时返回 400 和提示。需安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。get_json(silent=True) 在请求体不是合法 JSON 时返回 None 而不是直接抛异常，配合后面的判断就能给出友好提示。',
        verify: false,
      },
      {
        title: '在同一个接口里返回不同状态码',
        code: `from flask import Flask, request, jsonify

app = Flask(__name__)
todos = {}

@app.post("/todos")
def create_todo():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or "title" not in data:
        return jsonify({"error": "缺少 title 字段"}), 400
    todo_id = len(todos) + 1
    todos[todo_id] = {"id": todo_id, "title": data["title"], "done": False}
    return jsonify(todos[todo_id]), 201

@app.get("/todos/<int:todo_id>")
def get_todo(todo_id):
    todo = todos.get(todo_id)
    if todo is None:
        return jsonify({"error": "没有这条待办"}), 404
    return jsonify(todo)`,
        output: '预期说明：创建成功返回 201，查询一个不存在的编号返回 404 和错误说明。需安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。返回 jsonify(...), 状态码 这种写法末尾的逗号是"再返回一个状态码"的意思，Flask 会照着它设置响应码。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '直接用 request.json 但调用方没带 JSON',
        bad: 'data = request.json  # 没带请求体时会报错或得到 None',
        good: 'data = request.get_json(silent=True)\nif not isinstance(data, dict):\n    return jsonify({"error": "请发送 JSON"}), 400',
        note: '调用方忘记带 Content-Type 或没带请求体时，接口应当友好地返回 400 提示，而不是抛 500 让调用方一头雾水。',
      },
      {
        title: '失败时也返回 200',
        bad: 'return jsonify({"error": "缺少 title"})  # 状态码还是 200',
        good: 'return jsonify({"error": "缺少 title"}), 400',
        note: '调用方多数靠状态码判断成功与否。失败却返回 200，会让自动化逻辑把错误当成结果处理。',
      },
      {
        title: '响应字段名随意变动',
        bad: '这次返回 {"title": ...}，下次改成 {"name": ...}',
        good: '字段名一次定好并保持不变，只增不改',
        note: '接口字段是两边程序之间的约定。改名等于让所有调用方同时失效，属于破坏性改动。',
      },
    ],
    practice: [
      {
        prompt: '写一个 POST /echo 接口：接收 {"text": "..."} 并原样返回；没有 text 字段时返回 400。',
        starter: `from flask import Flask, request, jsonify

app = Flask(__name__)

# TODO: 写 POST /echo 接口
`,
        answer: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post("/echo")
def echo():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or "text" not in data:
        return jsonify({"error": "缺少 text 字段"}), 400
    return jsonify({"text": data["text"]})`,
        output: '预期说明：传 {"text": "你好"} 返回 200 和 {"text": "你好"}；不传 text 返回 400。需安装 flask 并在本机运行。',
        hint: '先取出请求体并判断类型，再检查字段；成功返回 jsonify，失败返回 jsonify(...), 400。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '调用方传来的数据缺了必填字段，接口最合适的响应是？',
        options: ['返回 200 和一段 HTML 错误页', '返回 400 和说明缺哪个字段的 JSON', '让程序直接崩溃', '忽略这次请求不做任何返回'],
        answer: 1,
        explain: '400 表示调用方的请求有问题，配一段说明字段的 JSON，调用方才能自动修正。',
      },
      {
        type: 'judge',
        question: '给程序调用的接口，返回 JSON 比返回 HTML 页面更合适。',
        answer: true,
        explain: '调用方是程序，需要能直接解析的数据结构，而不是给人看的页面。',
      },
    ],
  },
  {
    id: 'mysql-basics',
    title: 'MySQL 与 SQL：把数据存进真正的数据库',
    phase: 9,
    order: 7,
    minutes: 32,
    rating: { level: 4, must: 4 },
    summary: '把 sqlite 里学的 SQL 搬到 MySQL：装服务、装驱动、用同样的语句读写真实的多用户数据库。',
    keywords: ['MySQL', 'SQL', '数据库', 'DDL', 'DML', '连接'],
    tip: '零基础提示：你在第 5 阶段用过的 CREATE TABLE、INSERT、SELECT 是通用语言——MySQL 里几乎原样能用。差别是：MySQL 是"独立安装的服务"，多个人、多个程序可以同时用它。',
    lecture: [
      'sqlite3 适合单机和学习，MySQL 是最常用的开源数据库软件，适合多人、多服务、量大的场景——连接写法和 sqlite3 几乎一样。',
      '三步：装好 MySQL 服务并建一个库；pip install mysql-connector-python 装驱动；mysql.connector.connect(host="127.0.0.1", user="root", password="...", database="库名") 连接。',
      '连上之后 execute / fetchall / commit 的用法和 sqlite3 一致。注意：cursor 和 connection 用完后都要 close()，或者指望连接池统一管理。',
      'SQL 三类操作先记住缩写：DDL（CREATE / ALTER / DROP）管结构；DML（INSERT / UPDATE / DELETE）管数据；DQL（SELECT）管查询，查完把结果 fetchall() 或 fetchone()。',
      '- pip install mysql-connector-python',
      '- connect(host, user, password, database) 建连接',
      '- cursor.execute(sql, (参数,))：参数占位防注入',
      '- cursor.fetchall() / fetchone()：取回结果',
      '- commit() 提交修改；记得 close cursor 和 connection',
      '- DDL 改结构 · DML 改数据 · DQL 读数据',
      '从 SQLite 切到 MySQL，几乎不需要重新学——区别主要在连接配置和并发特性。',
    ],
    terms: [
      { term: 'mysql', zh: 'MySQL', note: '最常用的开源数据库服务，需要独立安装并保持运行。' },
      { term: 'connector', zh: '连接驱动', note: 'pip install mysql-connector-python，让 Python 能连上 MySQL。' },
      { term: 'ddl', zh: '数据定义语言', note: 'CREATE TABLE、ALTER TABLE 这类"定义结构"的 SQL。' },
      { term: 'dml', zh: '数据操作语言', note: 'INSERT、UPDATE、DELETE 这类"改数据"的 SQL。' },
      { term: 'dql', zh: '数据查询语言', note: 'SELECT 这类"查数据"的 SQL。' }
    ],
    steps: [
      '安装 MySQL 并记住 root 密码；用命令行或图形工具建一个库：CREATE DATABASE shop;',
      'pip install mysql-connector-python 安装 Python 驱动',
      '连接：mysql.connector.connect(host="localhost", user="root", password="...", database="shop")',
      '建表、插入、查询——语句和 sqlite 阶段学的相同',
      '连接放 try/finally 里，finally 中 close',
    ],
    examples: [
      {
        title: '先在 sqlite 里把 SQL 练熟（本机可跑）',
        code: `import sqlite3

conn = sqlite3.connect("shop.db")
cur = conn.cursor()
cur.execute("CREATE TABLE goods (name TEXT, price INT)")
cur.executemany("INSERT INTO goods VALUES (?, ?)", [("钢笔", 5), ("台灯", 39)])
cur.execute("SELECT name, price FROM goods WHERE price > 10 ORDER BY price")
print(cur.fetchall())
conn.close()`,
        output: `[('台灯', 39)]`,
        note: 'CREATE、INSERT、SELECT、WHERE、ORDER BY 在 sqlite 和 MySQL 里写法一致——先把 SQL 练熟，换数据库零成本。',
      },
      {
        title: '连接真正的 MySQL',
        code: `import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="你的密码",
    database="shop",
)
cur = conn.cursor()
cur.execute("SELECT name, price FROM goods")
print(cur.fetchall())
conn.close()`,
        output: `预期说明：打印你 shop 库里 goods 表的所有行，例如 [('钢笔', 5), ('台灯', 39)]。需先安装 MySQL、建库并 pip install mysql-connector-python，在本机运行。`,
        note: '连接参数四件套：主机、账号、密码、库名；密码不要写死在代码里，用环境变量（第 10 阶段细讲）。',
        verify: false
      },
      {
        title: 'SQL 三大类对照',
        code: `sql_types = {
    "CREATE TABLE / ALTER": "DDL：定义结构",
    "INSERT / UPDATE / DELETE": "DML：修改数据",
    "SELECT": "DQL：查询数据",
}
for sql, kind in sql_types.items():
    print(kind, "→", sql)`,
        output: `DDL：定义结构 → CREATE TABLE / ALTER
DML：修改数据 → INSERT / UPDATE / DELETE
DQL：查询数据 → SELECT`,
        note: '报错或看文档时先分清类别：结构问题查 DDL 语法，数据不对查 DML，查不出结果看 DQL 的 WHERE。',
      }
    ],
    pitfalls: [
      {
        title: 'UPDATE / DELETE 忘了 WHERE',
        bad: 'UPDATE goods SET price = 0   # 全表价格都变 0',
        good: 'UPDATE goods SET price = 0 WHERE name = "钢笔"',
        note: '没有 WHERE 就是"对全表执行"，MySQL 里一秒毁掉全部数据；执行前先 SELECT 确认范围。'
      },
      {
        title: '数据库密码写死在代码里',
        bad: 'password="我的密码123"   # 提交到仓库就泄露了',
        good: 'password 存进环境变量，代码里 os.environ["MYSQL_PASSWORD"]',
        note: '代码会进 Git 历史，密码一旦提交就删不干净；一律走环境变量或配置文件。'
      },
      {
        title: '连不上就乱猜',
        bad: "报 Access denied 或 Can't connect，反复改代码",
        good: '先确认 MySQL 服务在运行、账号密码正确、库名存在，再看驱动装没装',
        note: '连接错误分三类：服务没启动、凭据不对、驱动缺失；按顺序排查一遍基本都能解决。'
      }
    ],
    practice: [
      {
        prompt: '在 sqlite 里建 products 表（name TEXT, price INT），插入两件商品，按价格从高到低查询并打印全部。',
        starter: `import sqlite3

conn = sqlite3.connect("products.db")
cur = conn.cursor()
# TODO: 建表、插入、排序查询
conn.close()
`,
        answer: `import sqlite3

conn = sqlite3.connect("products.db")
cur = conn.cursor()
cur.execute("CREATE TABLE products (name TEXT, price INT)")
cur.executemany("INSERT INTO products VALUES (?, ?)", [("键盘", 199), ("鼠标", 79)])
conn.commit()
cur.execute("SELECT name, price FROM products ORDER BY price DESC")
print(cur.fetchall())
conn.close()`,
        output: `[('键盘', 199), ('鼠标', 79)]`,
        hint: 'ORDER BY price DESC 是从高到低；这些语句到 MySQL 里一字不改也能用。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'SELECT 属于哪一类 SQL？',
        options: ['DDL（定义结构）', 'DML（修改数据）', 'DQL（查询数据）', '都不是'],
        answer: 2,
        explain: 'SELECT 只查不改，属于数据查询语言 DQL。',
      },
      {
        type: 'judge',
        question: '在 sqlite 里学的 CREATE TABLE、INSERT、SELECT 语句，到 MySQL 里基本原样可用。',
        answer: true,
        explain: 'SQL 是通用语言，基础语句跨数据库通用；差异主要在高级特性和连接方式。',
      },
      {
        type: 'code',
        question: '补全：安装 MySQL 的 Python 驱动。',
        code: 'pip install mysql-connector-____',
        answer: 'python',
        accept: [],
        explain: '驱动包名是 mysql-connector-python。'
      }
    ]
  },
  {
    id: 'debug-methodology',
    title: '调试方法论：系统化地找 bug',
    phase: 9,
    order: 8,
    minutes: 28,
    rating: { level: 3, must: 5 },
    summary: '复现、二分定位、最小复现、修复后回归：一套可重复的排错流程，不再凭感觉乱改。',
    keywords: ['调试', '复现', '二分', '最小复现', '回归'],
    tip: '零基础提示：第 1 阶段学过读报错和 print 打点，这一节把它们升级成一套"按步骤走"的流程——bug 不靠灵感抓，靠流程围。',
    lecture: [
      '排错不是运气，是一套流程。按五步走，你会发现大多数 bug 都没有那么玄。',
      '第一步，稳定复现：每次都能让它出错——固定输入、固定数据、固定操作顺序。不能复现的 bug 无法修。',
      '第二步，读报错定位到行：从最后一行往回找最末 tb，再找自己代码的行号。错误类型告诉你"怎么错"（NameError/TypeError），行号告诉你"哪里错"。',
      '第三步，缩小范围：在关键位置 print 打点，或用二分法注释一半代码——每一步都把问题从 200 行缩小到 2 行。',
      '第四步，造最小复现：把问题压缩成几行就能触发同样错误的独立脚本，方便慢慢看、方便发给别人看。',
      '第五步，回归验证：用原来的数据再跑一遍，确认修好了且没有引入新问题。',
      '- ①稳定复现：固定输入与步骤',
      '- ②读报错：最后一行错误类型 + 倒数第一条自己代码的行号',
      '- ③二分/print：把范围从 200 行缩到 2 行',
      '- ④最小复现：几行脚本独立复现',
      '- ⑤回归验证：原数据从头跑一遍',
      '排错能力决定了交付速度——这五步值得练到肌肉记忆。',
    ],
    terms: [
      { term: 'reproduce', zh: '复现', note: '让 bug 每次都稳定出现；能复现的 bug 已经解决了一半。' },
      { term: 'bisection', zh: '二分定位', note: '注释掉一半代码看错误还在不在，反复对半缩小范围。' },
      { term: 'minimal example', zh: '最小复现', note: '用最少的代码触发同一个错误，聚焦真正的原因。' },
      { term: 'regression', zh: '回归', note: '修好后把原来的用法再跑一遍，确认没修出新问题。' }
    ],
    steps: [
      '让 bug 稳定复现：记录输入和操作步骤',
      '读报错：类型、行号、原因（第 1 阶段的藏宝图）',
      '范围大时用二分：注释掉一半代码，看错误还在不在，反复对半',
      '写最小复现：用最少几行代码触发同样的错误',
      '修复后回归：用当初出错的输入再跑一遍全部功能',
    ],
    examples: [
      {
        title: 'print 打点对照预期',
        code: `data = "1,2,三"
parts = data.split(",")
print("拆分结果:", parts)   # 打点：看到 '三' 就知道 int() 会炸`,
        output: `拆分结果: ['1', '2', '三']`,
        note: '在每步之后打印中间值，和"预期应该是什么"对照：第一个和预期不一致的地方就是病根。',
      },
      {
        title: '最小复现：200 行缩到 2 行',
        code: `print("最小复现：'3' + 4")
try:
    _ = "3" + 4
except TypeError as e:
    print("TypeError:", e)`,
        output: `最小复现：'3' + 4
TypeError: can only concatenate str (not "int") to str`,
        note: '大程序里报 TypeError，二分后只剩一行 "3" + 4——原因一目了然：文字加数字。修复方案立刻就清楚了。',
      },
      {
        title: '修复后加防御并回归',
        code: `def parse_numbers(text):
    ok, skipped = [], 0
    for p in text.split(","):
        try:
            ok.append(int(p))
        except ValueError:
            skipped += 1
    return ok, skipped

nums, skipped = parse_numbers("1,2,x,4")
print(nums, "跳过", skipped)`,
        output: `[1, 2, 4] 跳过 1`,
        note: '修复不只"让它别炸"：给出合理行为（跳过坏数据并计数），再用当初出错的输入回归验证。',
      }
    ],
    pitfalls: [
      {
        title: '凭感觉乱改，改完也不验证',
        bad: '同时改 5 处，运行一次说"好像好了"',
        good: '一次改一处 → 运行 → 确认 → 记录',
        note: '不验证的修复等于没修；"好像好了"的 bug 通常还在，只是这次输入没踩到。'
      },
      {
        title: '只修表象不修根因',
        bad: '用 try/except 把 TypeError 吞掉，程序不炸了就算修好',
        good: '顺着异常找到 "3" + 4 的来源，修数据或转类型',
        note: '吞掉异常只是把症状掩盖，根因还在；先问"这里为什么会出现文字加数字"。'
      },
      {
        title: '修好一个坏三个（没有回归）',
        bad: '改完只测了出错的那个输入',
        good: '把正常的输入也全部再跑一遍（或跑 pytest）',
        note: '改动可能影响别的路径；回归就是"确认没修出新问题"的那一步。'
      }
    ],
    practice: [
      {
        prompt: 'parse_numbers("1,2,x,4") 会因 int("x") 报错。先运行复现，再用 try/except 修复：跳过非数字并统计跳过了几个。',
        starter: `def parse_numbers(text):
    return [int(p) for p in text.split(",")]

# TODO: 修复它，让坏数据被跳过并计数
`,
        answer: `def parse_numbers(text):
    ok, skipped = [], 0
    for p in text.split(","):
        try:
            ok.append(int(p))
        except ValueError:
            skipped += 1
    return ok, skipped

nums, skipped = parse_numbers("1,2,x,4")
print(nums, "跳过", skipped)`,
        output: `[1, 2, 4] 跳过 1`,
        hint: '复现 → 知道是 int("x") 炸 → 把推导式展开成循环加 try/except → 用原输入回归。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '报错范围横跨 200 行代码，最快的定位方法是？',
        options: ['从头到尾逐行读三遍', '注释掉一半代码看错误还在不在，反复对半缩小', '重写整个程序', '把所有变量都打印一遍'],
        answer: 1,
        explain: '二分定位每次把范围减半，7 次就能从 200 行缩到 2 行。',
      },
      {
        type: 'judge',
        question: '修好 bug 后，只要出错的那个输入能跑了，就算修复完成。',
        answer: false,
        explain: '还要回归：用其他正常输入（或跑测试）确认这次修改没有弄坏原来的功能。',
      },
      {
        type: 'code',
        question: '补全：把错误"藏"起来之前，先把它打印出来留线索。',
        code: 'except ValueError as e:\n    ______("跳过:", e)',
        answer: 'print',
        accept: ['print'],
        explain: '捕获异常时打印一条线索，之后排查就不用从零开始。'
      }
    ]
  }
]
