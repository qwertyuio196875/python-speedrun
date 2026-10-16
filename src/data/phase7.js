/**
 * 第七阶段：数据与 API（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'json',
    title: 'JSON 处理',
    phase: 7,
    order: 1,
    minutes: 12,
    rating: { python: 2, java: 1, ai: 5 },
    summary: 'json.dumps / json.loads 在字典与 JSON 文本之间转换；LLM 返回值和工具参数全是 JSON。',
    keywords: ['json', 'dumps', 'loads', 'ensure_ascii', '序列化', 'Jackson', 'LLM 输出'],
    tip: 'Java 开发者提示：json 模块 ≈ Jackson，但 dict 与 JSON 对象几乎一一对应，不需要为每种结构建类。',
    what: 'json.dumps 把 Python 对象转成 JSON 字符串，json.loads 把 JSON 字符串转回 Python 对象。对应关系：dict↔object、list↔array、str↔string、int/float↔number、True/False↔true/false、None↔null。写接口和解析 LLM 输出都要用它；中文要加 ensure_ascii=False，否则会被转成 \\uXXXX。',
    javaCompare: [
      {
        title: '对象与 JSON 互转',
        java: 'ObjectMapper mapper = new ObjectMapper();\nString s = mapper.writeValueAsString(map);\nMap<String, Object> back = mapper.readValue(s, Map.class);',
        python: 's = json.dumps(data)\nback = json.loads(s)',
        diff: 'Python 的 dict 天然就是 JSON object 的模型，不需要创建 DTO 类（要类型安全时再用 Pydantic）。'
      }
    ],
    examples: [
      {
        title: '序列化与反序列化',
        code: 'import json\n\ndata = {"model": "deepseek-chat", "temperature": 0.7, "stream": False}\ntext = json.dumps(data)\nprint(text)\nprint(json.loads(text)["model"])',
        output: '{"model": "deepseek-chat", "temperature": 0.7, "stream": false}\ndeepseek-chat',
        note: '注意 Python 的 False 被序列化成小写 false。'
      },
      {
        title: '中文与格式化输出',
        code: 'import json\n\ndata = {"问题": "你好", "选项": ["A", "B"]}\nprint(json.dumps(data))\nprint(json.dumps(data, ensure_ascii=False, indent=2))',
        output: '{"\\u95ee\\u9898": "\\u4f60\\u597d", "\\u9009\\u9879": ["A", "B"]}\n{\n  "问题": "你好",\n  "选项": [\n    "A",\n    "B"\n  ]\n}',
        note: '默认 ensure_ascii=True 会把中文转义；调试接口时建议关闭并加 indent。'
      },
      {
        title: '解析 LLM 返回的 JSON',
        code: 'import json, re\n\nraw = "```json\\n{\\"tool\\": \\"search\\", \\"args\\": {\\"q\\": \\"天气\\"}}\\n```"\nmatch = re.search(r"\\{.*\\}", raw, re.S)\ndata = json.loads(match.group())\nprint(data["tool"], data["args"]["q"])',
        output: 'search 天气',
        note: '模型经常把 JSON 包在代码块里，生产代码要先用正则或 json.JSONDecoder 抽出主体再解析。'
      }
    ],
    pitfalls: [
      {
        title: '直接 loads 带代码块的输出',
        bad: 'json.loads("```json\\n{}\\n```")   # JSONDecodeError',
        good: '先剥离 ```json 包裹，再用 json.loads',
        note: '这是接 LLM 时最高频的报错，务必加容错与日志。'
      },
      {
        title: '中文变成 \\uXXXX',
        bad: 'json.dumps({"名字": "张三"})',
        good: 'json.dumps({"名字": "张三"}, ensure_ascii=False)',
        note: '写配置文件、返回接口响应时通常希望保留中文。'
      },
      {
        title: '把不支持的类型塞进去',
        bad: 'json.dumps({"t": datetime.now()})   # TypeError: Object of type datetime is not JSON serializable',
        good: 'json.dumps({"t": datetime.now().isoformat()})',
        note: 'datetime、set、自定义类都不能直接序列化，要转成字符串或列表。'
      }
    ],
    practice: [
      {
        prompt: '把字典 {"name": "张三", "age": 20} 转成 JSON 字符串（保留中文）并打印。',
        starter: 'import json\n\nuser = {"name": "张三", "age": 20}\n# TODO: 打印 JSON 字符串\n',
        answer: 'import json\n\nuser = {"name": "张三", "age": 20}\nprint(json.dumps(user, ensure_ascii=False))',
        output: '{"name": "张三", "age": 20}',
        hint: '记得 ensure_ascii=False，否则中文会变成转义序列。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Python 的 None 用 json.dumps 序列化后是？',
        options: ['None', 'null', '"None"', 'undefined'],
        answer: 1,
        explain: 'JSON 标准没有 None，对应表示是 null。'
      },
      {
        type: 'judge',
        question: 'json.dumps 默认会把中文转义成 \\uXXXX 形式。',
        answer: true,
        explain: '这是 ensure_ascii=True 的默认行为，需要保留中文时显式设为 False。'
      },
      {
        type: 'code',
        question: '补全代码，把 JSON 字符串解析成 Python 对象。',
        code: 'import json\ntext = \'{"ok": true}\'\ndata = json.__________',
        answer: 'loads(text)',
        accept: ['loads(text)'],
        explain: 'loads = load string，处理字符串；load 处理文件对象。'
      }
    ]
  },
  {
    id: 'file-io',
    title: '文件操作',
    phase: 7,
    order: 2,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 4 },
    summary: 'open 的模式与编码、with 自动关闭、pathlib 路径操作；RAG 读文档的第一步。',
    keywords: ['open', 'read', 'write', 'pathlib', 'encoding', '文件', '遍历目录'],
    tip: 'Java 开发者提示：open(mode) 的 "r/w/a" 对应 Java 的 Reader/Writer 模式，中文文本务必显式 encoding="utf-8"。',
    what: 'open(name, mode, encoding) 打开文件，常用模式：r 读、w 覆盖写、a 追加、b 二进制。读整文件用 read()，按行遍历用 for line in f，写用 write/writelines。总是配合 with 使用以保证关闭。处理路径用 pathlib.Path：p.glob("*.md") 遍历、p.read_text() 直接读、p.name/suffix/parent 取部件。',
    javaCompare: [
      {
        title: '按行读文件',
        java: 'try (var lines = Files.lines(Path.of("a.txt"))) {\n    lines.forEach(System.out::println);\n}',
        python: 'from pathlib import Path\n\nfor line in Path("a.txt").read_text(encoding="utf-8").splitlines():\n    print(line)',
        diff: 'Python 直接 for line in open(...) 即可惰性逐行读，不需要 Stream 与 try-with-resources 组合。'
      }
    ],
    examples: [
      {
        title: '写文件与追加',
        code: 'with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("第一行\\n")\n\nwith open("notes.txt", "a", encoding="utf-8") as f:\n    f.write("第二行\\n")\n\nwith open("notes.txt", encoding="utf-8") as f:\n    print(f.read().strip().splitlines())',
        output: "['第一行', '第二行']",
        note: '"w" 会清空原内容，"a" 在末尾追加。'
      },
      {
        title: 'pathlib 处理路径与目录',
        code: 'from pathlib import Path\n\np = Path("docs/knowledge.md")\nprint(p.name, p.suffix, p.parent)\nbase = Path(".")\nprint(sorted(x.name for x in base.glob("*.js"))[:2])',
        output: "knowledge.md .md docs\n['vite.config.js']",
        note: '当前目录下只有一个 .js 文件，所以结果里只有 vite.config.js。'
      },
      {
        title: '读写 JSON 文件',
        code: 'import json\nfrom pathlib import Path\n\ndata = [{"id": 1, "text": "Python 支持异步"}]\npath = Path("kb.json")\npath.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")\nprint(json.loads(path.read_text(encoding="utf-8"))[0]["text"])',
        output: 'Python 支持异步',
        note: '把知识库文档存成 JSON 再加载，是 RAG 里最小可用的数据形态。'
      }
    ],
    pitfalls: [
      {
        title: '忘记 encoding 导致乱码',
        bad: 'open("cn.txt", "w").write("中文")',
        good: 'open("cn.txt", "w", encoding="utf-8")',
        note: 'Windows 默认编码不是 UTF-8，中文写入后读出来常变成乱码。'
      },
      {
        title: '用 "w" 误覆盖文件',
        bad: 'open("config.json", "w")   # 原内容被清空',
        good: '确认要覆盖再写；追加用 "a"，改动前先备份',
        note: '写配置文件前最好先读出来改，再整体写回。'
      },
      {
        title: '不存在的目录直接写',
        bad: 'open("data/out/a.txt", "w")   # FileNotFoundError: 目录不存在',
        good: 'Path("data/out").mkdir(parents=True, exist_ok=True)',
        note: 'open 只创建文件，不会自动创建父目录。'
      }
    ],
    practice: [
      {
        prompt: '把 "hello" 写入 out.txt（utf-8），再读出来打印。',
        starter: 'from pathlib import Path\n\n# TODO: 写入并读出打印\n',
        answer: 'from pathlib import Path\n\np = Path("out.txt")\np.write_text("hello", encoding="utf-8")\nprint(p.read_text(encoding="utf-8"))',
        output: 'hello',
        hint: 'pathlib 的 write_text / read_text 都支持 encoding 参数。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '模式 "a" 打开文件表示？',
        options: ['读取', '覆盖写入', '追加写入', '二进制读写'],
        answer: 2,
        explain: '"a" 在文件末尾追加内容，不删除原有数据。'
      },
      {
        type: 'judge',
        question: '在 Windows 上处理中文文本时建议显式指定 encoding="utf-8"。',
        answer: true,
        explain: 'Windows 默认编码可能是 GBK，与 Linux 服务器行为不一致会引发乱码。'
      }
    ]
  },
  {
    id: 'http',
    title: 'HTTP 基础与请求',
    phase: 7,
    order: 3,
    minutes: 10,
    rating: { python: 2, java: 2, ai: 5 },
    summary: '方法、URL、请求头、请求体、状态码；调用 LLM 接口本质就是一次 HTTP 请求。',
    keywords: ['HTTP', 'GET', 'POST', 'Header', '状态码', 'curl', 'REST'],
    tip: 'Java 开发者提示：这部分和 Java 侧完全一致；差别只是 Python 用 requests/httpx 上手更快。',
    what: '一次 HTTP 请求由方法（GET 查询、POST 提交、PUT/PATCH 更新、DELETE 删除）、URL、请求头（Header）和请求体（Body）组成；响应包含状态码、Header 和 Body。调用 LLM 就是 POST 到 /v1/chat/completions，带 Authorization 头和 JSON 请求体。状态码 2xx 成功、4xx 客户端错误（401 密钥错、404 路径错、429 限流）、5xx 服务端错误。',
    javaCompare: [
      {
        title: '发一个 POST 请求',
        java: 'HttpRequest req = HttpRequest.newBuilder()\n    .uri(URI.create(url))\n    .header("Authorization", "Bearer " + key)\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString(body))\n    .build();',
        python: 'requests.post(url, headers=headers, json=body, timeout=30)',
        diff: '协议概念完全一致，Python 侧代码量小很多。'
      }
    ],
    examples: [
      {
        title: '请求的组成（curl 视角）',
        code: 'curl -X POST https://api.deepseek.com/chat/completions \\\n  -H "Authorization: Bearer $LLM_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]}\'',
        output: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": "chat-1",\n  "choices": [\n    {"index": 0, "message": {"role": "assistant", "content": "你好，有什么可以帮助你的？"}, "finish_reason": "stop"}\n  ],\n  "usage": {"prompt_tokens": 8, "completion_tokens": 12}\n}',
        note: '调用 LLM 的请求/响应结构就是这样的 JSON；Authorization 头携带 API Key。'
      },
      {
        title: '常见状态码的含义',
        code: 'GET  /health          -> 200 OK        # 服务正常\nPOST /chat  无 Key    -> 401 Unauthorized    # 密钥缺失或错误\nGET  /items/999       -> 404 Not Found        # 资源不存在\nPOST /chat  高频调用  -> 429 Too Many Requests  # 触发限流，需要退避重试\nGET  /chat            -> 405 Method Not Allowed  # 方法用错\nPOST /chat  参数非法  -> 422 Unprocessable Entity # FastAPI 校验失败',
        output: '',
        note: '把状态码当协议用：429 要重试、4xx 不要重试、5xx 可以有限重试。'
      }
    ],
    pitfalls: [
      {
        title: '忽略状态码直接解析 JSON',
        bad: 'data = requests.post(url, json=body).json()',
        good: 'resp = requests.post(url, json=body, timeout=30)\nresp.raise_for_status()\ndata = resp.json()',
        note: '401/429 时返回体往往不是预期结构，直接解析会抛出难懂的异常。'
      },
      {
        title: '不设超时',
        bad: 'requests.post(url, json=body)',
        good: 'requests.post(url, json=body, timeout=(5, 30))',
        note: '默认不超时，服务端不响应时程序会一直挂住。'
      }
    ],
    practice: [
      {
        prompt: '写一条 curl 命令：GET 请求 http://127.0.0.1:8000/health（带 Accept: application/json 头）。',
        starter: '# TODO: curl 命令\n',
        answer: 'curl -X GET http://127.0.0.1:8000/health -H "Accept: application/json"',
        output: '{"status":"ok"}',
        hint: 'GET 可以省略 -X，直接 curl URL 也可以。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '调用 LLM 接口返回 429，通常表示？',
        options: ['密钥错误', '请求过于频繁被限流', '路径不存在', '服务端崩溃'],
        answer: 1,
        explain: '429 Too Many Requests 是限流，应退避重试并降低并发。'
      },
      {
        type: 'judge',
        question: 'API Key 一般放在 HTTP 请求头（如 Authorization）里传递。',
        answer: true,
        explain: '放在 Header 里比放 URL 参数更安全，不会出现在日志与浏览器历史中。'
      }
    ]
  },
  {
    id: 'requests',
    title: 'requests 同步请求',
    phase: 7,
    order: 4,
    minutes: 10,
    rating: { python: 2, java: 2, ai: 4 },
    summary: '最常用的同步 HTTP 客户端；json= 参数、headers、timeout、raise_for_status 四件套。',
    keywords: ['requests', 'requests.post', 'json=', 'headers', 'timeout', 'raise_for_status'],
    tip: 'Java 开发者提示：requests 走 HttpClient/RestTemplate 的定位，但几乎不需要配置。',
    what: 'requests.get(url, params=...) 发查询请求，requests.post(url, json=..., headers=...) 发 JSON 提交请求。返回的 Response 对象上常用：status_code、headers、text、json()、raise_for_status()。它是同步阻塞库，适合脚本、CLI 工具和简单的后端任务；在 async 路由里使用会阻塞事件循环，此时应换 httpx。',
    javaCompare: [
      {
        title: 'POST JSON 并解析响应',
        java: 'HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());\nString body = resp.body();',
        python: 'resp = requests.post(url, json=payload, timeout=30)\nresp.raise_for_status()\nbody = resp.json()',
        diff: 'requests 用 json= 参数自动序列化并设置 Content-Type，省掉手写 ObjectMapper 的步骤。'
      }
    ],
    examples: [
      {
        title: '调用 LLM 兼容接口',
        code: 'import requests\n\nresp = requests.post(\n    "https://api.deepseek.com/chat/completions",\n    headers={"Authorization": "Bearer sk-demo"},\n    json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]},\n    timeout=30,\n)\nprint(resp.status_code)\nprint(resp.json()["choices"][0]["message"]["content"])',
        output: '200\n你好，有什么可以帮助你的？',
        note: 'json= 会自动做 json.dumps 并加 Content-Type: application/json。'
      },
      {
        title: '错误处理与重试',
        code: 'import time, requests\n\ndef call_with_retry(url, payload, retries=2):\n    for attempt in range(retries + 1):\n        resp = requests.post(url, json=payload, timeout=10)\n        if resp.status_code == 429:\n            time.sleep(1)\n            continue\n        resp.raise_for_status()\n        return resp.json()\n    raise RuntimeError("重试次数用尽")\n\nprint(call_with_retry.__name__)',
        output: 'call_with_retry',
        note: '429 退避重试、其它错误直接抛，是 LLM 客户端里最实用的错误处理模板。'
      }
    ],
    pitfalls: [
      {
        title: '用 data= 传 JSON',
        bad: 'requests.post(url, data={"a": 1})   # 发成表单编码',
        good: 'requests.post(url, json={"a": 1})',
        note: 'data= 是表单/原始字节，json= 才是 JSON 请求体，两者在服务端解析结果完全不同。'
      },
      {
        title: '在 async 路由里用 requests',
        bad: 'async def route():\n    requests.get(url)   # 阻塞事件循环',
        good: 'async with httpx.AsyncClient() as client:\n    await client.get(url)',
        note: '同步调用会卡住整个事件循环，所有并发的请求都被拖慢。'
      },
      {
        title: '忘了超时与代理配置',
        bad: 'requests.get(url)',
        good: 'requests.get(url, timeout=(5, 30), proxies={"https": "http://127.0.0.1:7890"})',
        note: '需要走本机代理时显式传 proxies；不设超时可能永久挂起。'
      }
    ],
    practice: [
      {
        prompt: '用 requests.post 向 http://127.0.0.1:8000/chat 发送 JSON {"message": "你好"}（不实际发起请求，只写代码）。',
        starter: 'import requests\n\n# TODO: 写 requests.post 调用\n',
        answer: 'import requests\n\nresp = requests.post("http://127.0.0.1:8000/chat", json={"message": "你好"}, timeout=10)\nprint(resp.json())',
        output: "{'reply': '你好，有什么可以帮助你的？'}",
        hint: '请求体用 json= 参数，并记得设 timeout。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'requests.post(url, json=payload) 的 json= 参数会做什么？',
        options: ['把内容当作表单提交', '自动序列化并设置 Content-Type: application/json', '跳过校验', '把响应转成 dict'],
        answer: 1,
        explain: 'json= 会做 json.dumps 并自动加 JSON 的 Content-Type 头。'
      },
      {
        type: 'judge',
        question: 'res.json() 在响应体不是合法 JSON 时也会返回空字典。',
        answer: false,
        explain: '会抛 json.JSONDecodeError / requests.exceptions.JSONDecodeError。'
      }
    ]
  },
  {
    id: 'httpx',
    title: 'httpx 异步请求',
    phase: 7,
    order: 5,
    minutes: 12,
    rating: { python: 3, java: 2, ai: 5 },
    summary: '异步 HTTP 客户端，支持 async/await 与并发；FastAPI 里调用 LLM 的标准选择。',
    keywords: ['httpx', 'AsyncClient', 'async with', 'await', '并发', 'WebClient'],
    tip: 'Java 开发者提示：httpx.AsyncClient ≈ WebClient，requests ≈ RestTemplate；async 接口用前者。',
    what: 'httpx 的 API 与 requests 非常像（get/post/json=），但它同时提供同步和异步接口。异步用法是 async with httpx.AsyncClient() as client: 然后 await client.post(...)。AsyncClient 应该复用以共享连接池；并发调用多个接口时配合 asyncio.gather，性能提升非常明显。',
    javaCompare: [
      {
        title: '异步 POST',
        java: 'webClient.post().uri(url).bodyValue(payload).retrieve().bodyToMono(String.class)',
        python: 'async with httpx.AsyncClient(timeout=30) as client:\n    resp = await client.post(url, json=payload)',
        diff: 'Python 用 async with 管理客户端生命周期，await 等待响应；没有 Mono/Flux 这类响应式类型。'
      }
    ],
    examples: [
      {
        title: '异步单次请求',
        code: 'import asyncio, httpx\n\nasync def chat(message: str) -> str:\n    async with httpx.AsyncClient(timeout=30) as client:\n        resp = await client.post(\n            "http://127.0.0.1:8000/chat",\n            json={"message": message},\n        )\n        resp.raise_for_status()\n        return resp.json()["reply"]\n\nasync def main():\n    print(await chat("你好"))\n\nasyncio.run(main())',
        output: '你好，有什么可以帮助你的？',
        note: '生产代码会把 client 提升到应用级复用，而不是每次请求都新建。'
      },
      {
        title: '并发请求多个接口',
        code: 'import asyncio, httpx\n\nasync def fetch(client, path):\n    resp = await client.get(f"http://127.0.0.1:8000{path}")\n    return resp.json()\n\nasync def main():\n    async with httpx.AsyncClient(timeout=10) as client:\n        results = await asyncio.gather(fetch(client, "/health"), fetch(client, "/version"))\n    print(results)\n\nasyncio.run(main())',
        output: "[{'status': 'ok'}, {'version': '1.0.0'}]",
        note: '一个 client 连接池 + gather 并发，是批量调用外部接口的标准姿势。'
      }
    ],
    pitfalls: [
      {
        title: '忘记 await 或 async with',
        bad: 'resp = httpx.post(url, json=body)   # 在 async 函数里同步请求，照样阻塞',
        good: 'async with httpx.AsyncClient() as client:\n    resp = await client.post(url, json=body)',
        note: 'httpx 也提供同步 API，混淆两者会让异步代码失去并发能力。'
      },
      {
        title: '每次请求都新建客户端',
        bad: '每次调用都 httpx.AsyncClient() 进出一次',
        good: '复用同一个 AsyncClient（可用 FastAPI 的 lifespan 管理）',
        note: '频繁创建客户端会反复建立连接，浪费资源且更慢。'
      },
      {
        title: '不处理超时与状态码',
        bad: 'data = (await client.post(url, json=body)).json()',
        good: 'resp = await client.post(url, json=body, timeout=30)\nresp.raise_for_status()',
        note: '超时设成 httpx.Timeout(30, connect=5) 更精确，错误码要显式处理。'
      }
    ],
    practice: [
      {
        prompt: '用 httpx.AsyncClient 发一个 GET 请求到 http://127.0.0.1:8000/health 并打印 JSON。',
        starter: 'import asyncio, httpx\n\nasync def main():\n    # TODO: async with AsyncClient，await client.get，打印 json\n    pass\n\nasyncio.run(main())',
        answer: 'import asyncio, httpx\n\nasync def main():\n    async with httpx.AsyncClient(timeout=10) as client:\n        resp = await client.get("http://127.0.0.1:8000/health")\n        print(resp.json())\n\nasyncio.run(main())',
        output: "{'status': 'ok'}",
        hint: '三步：async with 建客户端 → await client.get → resp.json()。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '在 FastAPI 的 async 路由里调用外部 HTTP 接口，推荐用？',
        options: ['requests', 'urllib', 'httpx.AsyncClient', 'socket'],
        answer: 2,
        explain: '异步客户端才不会阻塞事件循环；requests 是阻塞式的，会拖慢全部并发请求。'
      },
      {
        type: 'judge',
        question: 'AsyncClient 建议复用以共享连接池。',
        answer: true,
        explain: '复用客户端可以避免反复建立 TCP/TLS 连接的开销。'
      }
    ]
  }
]
