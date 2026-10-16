/**
 * 第八阶段：FastAPI（约 1 小时）
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'fastapi-basics',
    title: 'FastAPI 基础与 Uvicorn',
    phase: 8,
    order: 1,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 5 },
    summary: 'FastAPI 相当于 Python 的 Spring Boot：几行代码起一个带文档的 API 服务。',
    keywords: ['FastAPI', 'uvicorn', 'ASGI', '启动', 'Swagger', 'docs', 'Spring Boot'],
    tip: 'Java 开发者提示：FastAPI ≈ Spring Boot + Swagger，uvicorn ≈ 内置 Tomcat，但没有 XML/YAML 配置。',
    what: 'FastAPI 是基于 ASGI 的 Web 框架：创建 FastAPI 实例、用装饰器注册路由、用 uvicorn 启动。它自带交互式文档（/docs 与 /redoc），会根据类型注解和 Pydantic 模型自动生成参数说明与校验。最小应用只有三行代码，非常适合快速把 LLM 能力包成 HTTP 接口。',
    javaCompare: [
      {
        title: '最小 Web 应用',
        java: '@SpringBootApplication\n@RestController\npublic class App {\n    @GetMapping("/health")\n    public Map<String, String> health() { return Map.of("status", "ok"); }\n}',
        python: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/health")\ndef health():\n    return {"status": "ok"}',
        diff: 'Python 不需要启动类、注解扫描和配置文件；一个模块就是一个服务。'
      }
    ],
    examples: [
      {
        title: '最小应用与启动',
        code: '# main.py\nfrom fastapi import FastAPI\n\napp = FastAPI(title="Python AI Chat API")\n\n@app.get("/health")\ndef health():\n    return {"status": "ok"}\n\n# 终端启动：\n# uvicorn main:app --reload --port 8000',
        output: 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)\nINFO:     Started reloader process\nINFO:     Application startup complete.',
        note: 'main:app 表示 main.py 文件里的 app 对象；--reload 只在开发用。'
      },
      {
        title: '调用与文档',
        code: 'curl http://127.0.0.1:8000/health\n# 浏览器打开 http://127.0.0.1:8000/docs 可以看到自动生成的 Swagger 文档',
        output: '{"status":"ok"}',
        note: 'FastAPI 会自动生成 OpenAPI 描述，前端联调和接口测试都不用额外写文档。'
      }
    ],
    pitfalls: [
      {
        title: '把 --reload 带到生产',
        bad: 'uvicorn main:app --reload   # 生产环境',
        good: 'uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4',
        note: 'reload 会监控文件变化并自动重启，性能和稳定性都不适合生产。'
      },
      {
        title: '在 async def 路由里写阻塞代码',
        bad: 'async def health():\n    time.sleep(1)   # 阻塞事件循环',
        good: '用同步 def（FastAPI 会丢到线程池）或改成 await asyncio.sleep(1)',
        note: 'FastAPI 对同步 def 会在线程池执行；async def 里绝不要放阻塞调用。'
      },
      {
        title: '返回对象不是可序列化类型',
        bad: 'return datetime.now()',
        good: 'return {"time": datetime.now().isoformat()}  或声明 response_model',
        note: 'FastAPI 能处理 datetime，但自定义类需要 Pydantic 模型或手动序列化。'
      }
    ],
    practice: [
      {
        prompt: '写一个最小 FastAPI 应用，路径 /ping 返回 {"pong": True}。',
        starter: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n# TODO: 注册 GET /ping\n',
        answer: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/ping")\ndef ping():\n    return {"pong": True}',
        output: '{"pong":true}',
        hint: '装饰器写 @app.get("/ping")，函数返回字典即可。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'uvicorn main:app 中的 main:app 表示？',
        options: ['模块名 main，应用对象 app', '端口 8000', '包名 main', '数据库连接'],
        answer: 0,
        explain: '格式是 文件/模块 : 应用实例变量名。'
      },
      {
        type: 'judge',
        question: 'FastAPI 会根据类型注解与 Pydantic 模型自动生成接口文档。',
        answer: true,
        explain: '默认在 /docs（Swagger UI）和 /redoc 提供交互式文档。'
      }
    ]
  },
  {
    id: 'routing',
    title: '路由与路径参数',
    phase: 8,
    order: 2,
    minutes: 12,
    rating: { python: 2, java: 2, ai: 5 },
    summary: '路径参数、查询参数、状态码与 APIRouter；等价于 @GetMapping + @PathVariable + @RequestParam。',
    keywords: ['routing', 'path parameter', 'query parameter', 'APIRouter', 'status_code', '路由'],
    tip: 'Java 开发者提示：@app.get("/items/{id}") ≈ @GetMapping("/items/{id}")，参数名和路径占位符同名即自动注入。',
    what: '路由装饰器决定方法与路径：@app.get、@app.post 等。路径里的 {name} 是路径参数，函数同名参数接收并做类型转换（声明 int 时传入非数字会返回 422）；函数里非路径参数的普通参数自动成为查询参数（如 ?limit=10）。多个路由可以用 APIRouter 分组，再用 app.include_router 挂载——相当于 Controller + 前缀。',
    javaCompare: [
      {
        title: '路径变量与查询参数',
        java: '@GetMapping("/docs/{doc_id}")\npublic Doc get(@PathVariable int docId, @RequestParam(defaultValue = "5") int top) { }',
        python: '@app.get("/docs/{doc_id}")\ndef get_doc(doc_id: int, top: int = 5):\n    ...',
        diff: '不需要额外注解：出现在路径里的参数就是路径参数，其余带默认值的普通参数就是查询参数。'
      }
    ],
    examples: [
      {
        title: '路径参数与查询参数',
        code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/items/{item_id}")\ndef read_item(item_id: int, verbose: bool = False):\n    return {"item_id": item_id, "verbose": verbose}\n\n# GET /items/7?verbose=true\n# GET /items/abc  -> 422 校验失败（int 转换失败）',
        output: 'GET /items/7?verbose=true\n{"item_id":7,"verbose":true}\n\nGET /items/abc\n{"detail":[{"type":"int_parsing","loc":["path","item_id"],"msg":"Input should be a valid integer","input":"abc"}]}',
        note: '类型注解直接变成校验与文档来源，这是 FastAPI 最大的便利。'
      },
      {
        title: 'APIRouter 分组',
        code: 'from fastapi import APIRouter, FastAPI\n\nrouter = APIRouter(prefix="/chat", tags=["chat"])\n\n@router.post("")\ndef chat(payload: dict):\n    return {"reply": f"收到: {payload}"}\n\napp = FastAPI()\napp.include_router(router)\n\n# 最终路径是 POST /chat',
        output: 'POST /chat\n{"reply":"收到: {\'message\': \'你好\'}"}',
        note: '大项目按功能拆多个 Router，等价于多个 @RestController。'
      }
    ],
    pitfalls: [
      {
        title: '路由顺序导致匹配错乱',
        bad: '@app.get("/items/{item_id}")\n@app.get("/items/count")   # 永远匹配不到 /items/count',
        good: '把固定路径 /items/count 写在带参数的路由前面',
        note: '路由按注册顺序匹配，具体路径必须放在通配路径之前。'
      },
      {
        title: '以为查询参数会做业务校验',
        bad: 'def search(q: str):   # 空字符串也能通过',
        good: 'from fastapi import Query\ndef search(q: str = Query(min_length=1, max_length=50)):',
        note: '注解只能保证类型，长度、范围等约束要交给 Query / Path / Field。'
      },
      {
        title: '路径参数命名不含类型注解',
        bad: 'def read_item(item_id):   # 变成字符串，无法自动校验',
        good: 'def read_item(item_id: int):',
        note: '不写注解时路径参数恒为 str，后续比较大小会出错。'
      }
    ],
    practice: [
      {
        prompt: '写一个 GET /users/{user_id} 路由，返回 {"user_id": user_id}，user_id 声明为 int。',
        starter: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n# TODO: 注册路由\n',
        answer: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/users/{user_id}")\ndef get_user(user_id: int):\n    return {"user_id": user_id}',
        output: 'GET /users/3\n{"user_id":3}',
        hint: '路径占位符和函数参数名保持一致。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '函数参数 user_id: int 且路径是 /users/{user_id}，请求 /users/abc 会返回？',
        options: ['500 服务器错误', '422 校验失败', '字符串 "abc"', '404'],
        answer: 1,
        explain: 'FastAPI 用类型注解做转换与校验，失败时返回 422。'
      },
      {
        type: 'judge',
        question: '/items/{item_id} 这条路由应该注册在 /items/count 之前。',
        answer: false,
        explain: '固定路径要写在前面，否则会被带参数的路由先匹配走。'
      }
    ]
  },
  {
    id: 'post-request',
    title: 'POST 请求与请求体',
    phase: 8,
    order: 3,
    minutes: 12,
    rating: { python: 3, java: 2, ai: 5 },
    summary: '用 Pydantic 模型接收 JSON 请求体、设置状态码与响应模型；POST /chat 的核心。',
    keywords: ['POST', 'request body', 'BaseModel', 'status_code', 'response_model', '@RequestBody'],
    tip: 'Java 开发者提示：函数参数是 Pydantic 模型时，FastAPI 自动把请求体 JSON 反序列化进去，等于 @RequestBody。',
    what: 'POST 请求体用 Pydantic 模型声明：当参数类型是 BaseModel 子类时，FastAPI 会把 JSON 请求体解析成该对象并校验，失败返回 422。可以用 status_code 指定成功状态码，用 response_model 声明响应结构（只暴露允许的字段）。这是实现 POST /chat 接口的全部要点。',
    javaCompare: [
      {
        title: '接收 JSON 请求体',
        java: '@PostMapping("/chat")\npublic ChatResponse chat(@RequestBody ChatRequest req) { }',
        python: '@app.post("/chat")\ndef chat(req: ChatRequest) -> ChatResponse:\n    ...',
        diff: 'Python 用参数类型声明请求体，不需要 @RequestBody；响应结构用返回注解或 response_model。'
      }
    ],
    examples: [
      {
        title: 'POST /chat 最小实现',
        code: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n\nclass ChatResponse(BaseModel):\n    reply: str\n\n@app.post("/chat", response_model=ChatResponse)\nasync def chat(req: ChatRequest):\n    return ChatResponse(reply=f"你说的是：{req.message}")',
        output: 'curl -X POST http://127.0.0.1:8000/chat -H "Content-Type: application/json" -d \'{"message": "你好"}\'\n{"reply":"你说的是：你好"}',
        note: 'response_model 会过滤掉多余字段并按声明结构输出。'
      },
      {
        title: '状态码与错误处理',
        code: 'from fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n\n@app.post("/chat", status_code=status.HTTP_201_CREATED)\nasync def chat(req: ChatRequest):\n    if not req.message.strip():\n        raise HTTPException(status_code=400, detail="message 不能为空")\n    return {"reply": "ok"}',
        output: 'POST 空消息 -> 400\n{"detail":"message 不能为空"}\n\nPOST 正常  -> 201\n{"reply":"ok"}',
        note: 'raise HTTPException 就是 Java 里的抛业务异常 + 全局异常处理器。'
      }
    ],
    pitfalls: [
      {
        title: '参数忘了加类型，变成查询参数',
        bad: 'def chat(message: str):   # POST /chat?message=xx，请求体被忽略',
        good: 'def chat(req: ChatRequest):   # 或 message: str = Body(embed=True)',
        note: '只有 Pydantic 模型（或显式 Body）才会从请求体取值。'
      },
      {
        title: '直接返回 ORM/内部对象',
        bad: 'return {"reply": text, "api_key": self.api_key}   # 泄露内部字段',
        good: '声明 response_model 或用 Pydantic 响应模型',
        note: 'response_model 会按声明裁剪字段，避免把密钥、内部状态返回给前端。'
      },
      {
        title: 'Pydantic v2 用了 v1 写法',
        bad: 'req.dict() / class Config: ...',
        good: 'req.model_dump() / model_config = ConfigDict(...)',
        note: 'FastAPI 0.100+ 基于 Pydantic v2，旧教程代码会报 AttributeError。'
      }
    ],
    practice: [
      {
        prompt: '定义 ChatRequest(message: str) 并写 POST /chat 返回 {"reply": message}。',
        starter: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n# TODO: 定义模型与路由\n',
        answer: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n\n@app.post("/chat")\nasync def chat(req: ChatRequest):\n    return {"reply": req.message}',
        output: 'curl -X POST http://127.0.0.1:8000/chat -d \'{"message":"你好"}\' -H "Content-Type: application/json"\n{"reply":"你好"}',
        hint: '参数名 req，类型 ChatRequest；用 req.message 取字段。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '要让 POST 接口从 JSON 请求体取数据，参数应该怎么写？',
        options: ['message: str', 'message: str = Query(...)', 'req: ChatRequest（Pydantic 模型）', 'req: dict = Body(False)'],
        answer: 2,
        explain: '参数类型是 Pydantic 模型时，FastAPI 会解析请求体并校验。'
      },
      {
        type: 'judge',
        question: 'FastAPI 参数校验失败时会返回 500 错误。',
        answer: false,
        explain: '返回 422 Unprocessable Entity，并在 detail 里说明出错字段。'
      }
    ]
  },
  {
    id: 'pydantic',
    title: 'Pydantic 数据模型与校验',
    phase: 8,
    order: 4,
    minutes: 14,
    rating: { python: 3, java: 3, ai: 5 },
    summary: '用 BaseModel 做类型校验、默认值、嵌套模型与自定义校验器；Tool Calling 参数校验的基石。',
    keywords: ['Pydantic', 'BaseModel', 'Field', 'validator', 'model_dump', 'DTO', '校验'],
    tip: 'Java 开发者提示：BaseModel ≈ DTO + Bean Validation（@NotNull/@Size），但校验在构造时立刻执行。',
    what: 'Pydantic 的 BaseModel 通过类型注解定义字段，实例化时自动校验并转换类型（"20" 会被转成 20）。Field 提供约束与描述，嵌套模型表示复杂结构，field_validator 做自定义校验，model_dump / model_dump_json 负责序列化。FastAPI 的请求校验和 LLM 的结构化输出（structured output）都建立在它之上。',
    javaCompare: [
      {
        title: '带校验的 DTO',
        java: 'public class ChatRequest {\n    @NotBlank @Size(max = 2000) private String message;\n    @Min(0) @Max(2) private double temperature = 0.7;\n}',
        python: 'class ChatRequest(BaseModel):\n    message: str = Field(min_length=1, max_length=2000)\n    temperature: float = Field(default=0.7, ge=0, le=2)',
        diff: '约束直接写在字段声明里；实例化即校验，不需要 @Valid 与容器配合。'
      }
    ],
    examples: [
      {
        title: '校验、默认值与序列化',
        code: 'from pydantic import BaseModel, Field\n\nclass ChatRequest(BaseModel):\n    message: str = Field(min_length=1, max_length=10, description="用户消息")\n    temperature: float = Field(default=0.7, ge=0, le=2)\n\nreq = ChatRequest(message="你好", temperature=5)\nprint(req.model_dump())\n# ChatRequest(message="")  -> ValidationError: String should have at least 1 character',
        output: "Traceback (most recent call last):\n  ...\npydantic_core._pydantic_core.ValidationError: 1 validation error for ChatRequest\ntemperature\n  Input should be less than or equal to 2 [type=less_than_equal, input_value=5, input_type=int]",
        note: '温度 5 超出范围，构造时就抛 ValidationError；请求体校验失败时 FastAPI 把它转成 422 响应。'
      },
      {
        title: '嵌套模型与自定义校验器',
        code: 'from pydantic import BaseModel, field_validator\n\nclass Message(BaseModel):\n    role: str\n    content: str\n\nclass ChatRequest(BaseModel):\n    messages: list[Message]\n\n    @field_validator("messages")\n    @classmethod\n    def not_empty(cls, v):\n        if not v:\n            raise ValueError("messages 不能为空")\n        return v\n\nreq = ChatRequest(messages=[{"role": "user", "content": "你好"}])\nprint(req.messages[0].content, len(req.messages))',
        output: '你好 1',
        note: '嵌套字典会自动转成 Message 对象；自定义校验器用 @field_validator（Pydantic v2 写法）。'
      }
    ],
    pitfalls: [
      {
        title: '混用 Pydantic v1 与 v2 的 API',
        bad: 'req.dict()、@validator、class Config',
        good: 'req.model_dump()、@field_validator、model_config = ConfigDict(...)',
        note: 'FastAPI 0.100+ / Pydantic 2.x 用新 API，照抄旧教程会直接报错。'
      },
      {
        title: '以为类型会自动转换一切',
        bad: 'ChatRequest(message=123)   # 会转成 "123"，可能不是你想要的',
        good: '需要严格模式用 model_config = ConfigDict(strict=True)',
        note: 'Pydantic 默认做宽松转换，接 LLM 输出时可能把奇怪的值"洗白"，要注意校验语义。'
      },
      {
        title: '用 dict 直接当参数做 Tool Calling 校验',
        bad: 'def tool(params: dict):   # 完全没有校验',
        good: '定义 Pydantic 模型，用 model_json_schema() 生成工具参数描述',
        note: '把工具的 JSON Schema 交给模型并发结果回来时，用同一个模型校验，是最稳的做法之一。'
      }
    ],
    practice: [
      {
        prompt: '定义 AskRequest(question: str, top_k: int = 3)，实例化并打印 model_dump()。',
        starter: 'from pydantic import BaseModel\n\n# TODO: 定义模型并打印 model_dump()\n',
        answer: 'from pydantic import BaseModel\n\nclass AskRequest(BaseModel):\n    question: str\n    top_k: int = 3\n\nprint(AskRequest(question="什么是 RAG？").model_dump())',
        output: "{'question': '什么是 RAG？', 'top_k': 3}",
        hint: '默认值写在字段上；model_dump() 返回字典。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Pydantic v2 中把模型转成字典的方法是？',
        options: ['.dict()', '.model_dump()', '.to_json()', '.serialize()'],
        answer: 1,
        explain: 'v2 用 model_dump / model_dump_json，v1 的 dict() 已废弃。'
      },
      {
        type: 'judge',
        question: 'Pydantic 在实例化时就会执行校验，而不是等到访问字段时。',
        answer: true,
        explain: '校验发生在构造阶段，失败直接抛 ValidationError（FastAPI 转成 422）。'
      },
      {
        type: 'code',
        question: '补全约束：temperature 必须在 0 到 2 之间（含边界）。',
        code: 'temperature: float = Field(default=0.7, __________)',
        answer: 'ge=0, le=2',
        accept: ['ge=0, le=2', 'le=2, ge=0'],
        explain: 'ge 是大于等于、le 是小于等于；gt/lt 是不含边界。'
      }
    ]
  },
  {
    id: 'async-api',
    title: 'async API 与流式响应',
    phase: 8,
    order: 5,
    minutes: 12,
    rating: { python: 4, java: 3, ai: 5 },
    summary: 'async def 路由 + await 调 LLM，并用 StreamingResponse 实现"打字机"效果。',
    keywords: ['async api', 'await', 'StreamingResponse', 'SSE', '流式', 'GatewayResponse'],
    tip: 'Java 开发者提示：async def 路由 ≈ WebFlux 的异步接口；阻塞的同步库要换成异步客户端。',
    what: '在 FastAPI 里，async def 路由运行在事件循环上，遇到 await 就能处理别的请求，因此高并发 IO 场景吞吐更好。反之同步 def 会被放进线程池执行，写阻塞代码也不会卡死事件循环。实现流式输出用 StreamingResponse，把一个生成器/异步生成器作为 body 迭代器，配合 SSE 格式逐块推送 token。',
    javaCompare: [
      {
        title: '流式返回',
        java: 'return Flux<String>   // WebFlux + SSE',
        python: 'return StreamingResponse(event_stream(), media_type="text/event-stream")',
        diff: 'Python 的异步生成器天然适合逐块产出；Java 侧通常要用 Flux。'
      }
    ],
    examples: [
      {
        title: 'async 路由调用 LLM（伪代码）',
        code: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\nimport asyncio\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n\nasync def call_llm(message: str) -> str:\n    await asyncio.sleep(0.5)          # 真实场景：await client.post(...)\n    return f"回复：{message}"\n\n@app.post("/chat")\nasync def chat(req: ChatRequest):\n    reply = await call_llm(req.message)\n    return {"reply": reply}',
        output: 'curl -X POST http://127.0.0.1:8000/chat -H "Content-Type: application/json" -d \'{"message": "你好"}\'\n{"reply":"回复：你好"}',
        note: '等待模型的 0.5 秒里，事件循环可以继续处理其它请求。'
      },
      {
        title: 'SSE 流式返回 token',
        code: 'import asyncio\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n\nasync def fake_stream(text: str):\n    for ch in text:\n        await asyncio.sleep(0.05)          # 真实场景：async for chunk in llm.stream(...)\n        yield f"data: {ch}\\n\\n"\n    yield "data: [DONE]\\n\\n"\n\n@app.post("/chat/stream")\nasync def chat_stream(req: ChatRequest):\n    return StreamingResponse(fake_stream(req.message), media_type="text/event-stream")',
        output: 'curl -N -X POST http://127.0.0.1:8000/chat/stream -H "Content-Type: application/json" -d \'{"message": "你好"}\'\ndata: 你\n\ndata: 好\n\ndata: [DONE]',
        note: '每个数据块以 "data: " 开头、以空行结尾，这是 SSE 协议格式，前端用 EventSource 消费。'
      }
    ],
    pitfalls: [
      {
        title: 'async 路由里用同步 LLM SDK',
        bad: 'async def chat(req):\n    return client.chat.completions.create(...)   # openai 同步客户端，阻塞事件循环',
        good: '用 AsyncOpenAI 并 await，或把路由写成 def 交给线程池',
        note: '阻塞调用会让所有并发请求排队，压测时 QPS 会掉得很明显。'
      },
      {
        title: '流式响应里忘了 DONE 与空行',
        bad: 'yield "data: token"   # 缺少空行分隔，前端收不到完整事件',
        good: 'yield "data: token\\n\\n"',
        note: 'SSE 以空行作为一个事件结束的标志；结束哨兵能让前端正确收尾。'
      },
      {
        title: '流式场景还在用普通 dict 返回',
        bad: '@app.post("/chat")\nasync def chat(req):\n    return {"reply": "".join([...])}   # 等全部生成完才返回',
        good: 'StreamingResponse(async_generator(), media_type="text/event-stream")',
        note: '要"边生成边返回"必须用流式响应，普通响应会等所有 token 生成完。'
      }
    ],
    practice: [
      {
        prompt: '把 async def chat(req) 改成流式：返回 StreamingResponse，body 是逐字符 yield "data: ch\\n\\n" 的异步生成器。',
        starter: 'import asyncio\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\n\napp = FastAPI()\n\nasync def gen(text):\n    # TODO: 逐字符 yield SSE 数据块\n    pass\n\n@app.post("/chat/stream")\nasync def chat_stream(req: dict):\n    return StreamingResponse(gen(req["message"]), media_type="text/event-stream")',
        answer: 'import asyncio\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\n\napp = FastAPI()\n\nasync def gen(text):\n    for ch in text:\n        await asyncio.sleep(0.05)\n        yield f"data: {ch}\\n\\n"\n\n@app.post("/chat/stream")\nasync def chat_stream(req: dict):\n    return StreamingResponse(gen(req["message"]), media_type="text/event-stream")',
        output: 'data: 你\n\ndata: 好\n\n',
        hint: '每个数据块都要以两个换行结束，否则 SSE 事件不完整。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'FastAPI 中实现流式响应应该返回？',
        options: ['dict', 'JSONResponse', 'StreamingResponse', 'FileResponse'],
        answer: 2,
        explain: 'StreamingResponse 接收生成器/异步生成器，适合 SSE 与 token 流。'
      },
      {
        type: 'judge',
        question: '在 async def 路由里调用阻塞的同步函数不会影响并发性能。',
        answer: false,
        explain: '阻塞调用会占住事件循环，使其它请求无法被处理。'
      }
    ]
  },
  {
    id: 'depends',
    title: '依赖注入 Depends',
    phase: 8,
    order: 6,
    minutes: 10,
    rating: { python: 3, java: 3, ai: 4 },
    summary: '用 Depends 复用配置、客户端与鉴权逻辑，等价于 @Autowired + 拦截器。',
    keywords: ['Depends', '依赖注入', 'DI', 'lifespan', '鉴权', '@Autowired'],
    tip: 'Java 开发者提示：Depends ≈ 方法级 @Autowired + HandlerInterceptor，但依赖是"声明在参数上"的。',
    what: 'Depends(func) 写在路由参数上，FastAPI 会在调用路由前执行 func，并把返回值注入参数。它适合：读取配置、构造带 API Key 的 LLM 客户端、校验请求头里的 token、复用数据库会话。依赖还能嵌套依赖、用 yield 做"用完自动清理"（类似请求级作用域）。',
    javaCompare: [
      {
        title: '注入共享组件',
        java: '@Autowired private LlmClient client;',
        python: 'def get_client() -> LlmClient:\n    return LlmClient(api_key=os.environ["LLM_API_KEY"])\n\n@app.post("/chat")\nasync def chat(req: ChatRequest, client: LlmClient = Depends(get_client)):\n    ...',
        diff: 'Python 不需要容器与注解处理；依赖就是普通函数，返回值直接当参数用，测试时方便替换（override）。'
      }
    ],
    examples: [
      {
        title: '依赖提供 LLM 客户端',
        code: 'import os\nfrom fastapi import Depends, FastAPI, HTTPException\n\napp = FastAPI()\n\nclass LlmClient:\n    def __init__(self, api_key):\n        self.api_key = api_key\n\ndef get_client():\n    key = os.getenv("LLM_API_KEY")\n    if not key:\n        raise HTTPException(status_code=500, detail="未配置 LLM_API_KEY")\n    return LlmClient(key)\n\n@app.post("/chat")\nasync def chat(message: dict, client: LlmClient = Depends(get_client)):\n    return {"reply": f"使用密钥 {client.api_key[:4]}**** 调用模型"}',
        output: '{"reply":"使用密钥 sk-a**** 调用模型"}',
        note: '配置缺失时依赖内部直接抛 HTTPException，业务代码不需要重复判断。'
      },
      {
        title: 'yield 依赖：用完自动清理',
        code: 'from fastapi import Depends, FastAPI\n\napp = FastAPI()\n\ndef get_session():\n    session = {"id": "db-session-1"}\n    print("打开会话")\n    try:\n        yield session\n    finally:\n        print("关闭会话")\n\n@app.get("/history")\ndef history(session: dict = Depends(get_session)):\n    return {"session": session["id"], "items": []}',
        output: '打开会话\n{"session":"db-session-1","items":[]}\n关闭会话',
        note: '相当于请求级作用域 Bean：请求结束（含异常）后执行 finally 清理。'
      }
    ],
    pitfalls: [
      {
        title: '每次请求都新建连接客户端',
        bad: '在依赖里 httpx.AsyncClient() 然后不关闭',
        good: '用 lifespan 创建应用级客户端，依赖只返回它',
        note: '连接池需要跨请求复用，反复创建会浪费资源并可能泄漏连接。'
      },
      {
        title: '把依赖当普通参数默认值',
        bad: 'def chat(client = get_client())   # 导入时就执行了一次',
        good: 'def chat(client = Depends(get_client))',
        note: '不加 Depends 会立即执行函数，结果是所有请求共用一个实例。'
      },
      {
        title: '鉴权依赖写成"只校验不阻断"',
        bad: 'def verify(token: str = ""):\n    return token == "ok"   # 返回值被忽略，等于没校验',
        good: 'if token != expected:\n    raise HTTPException(401, "未授权")',
        note: '依赖里必须显式抛异常才能拦截请求，返回值仅用于注入。'
      }
    ],
    practice: [
      {
        prompt: '写依赖 get_config() 返回 {"model": "deepseek-chat"}，路由 GET /config 通过 Depends 注入并返回它。',
        starter: 'from fastapi import Depends, FastAPI\n\napp = FastAPI()\n\n# TODO: 定义依赖与路由\n',
        answer: 'from fastapi import Depends, FastAPI\n\napp = FastAPI()\n\ndef get_config():\n    return {"model": "deepseek-chat"}\n\n@app.get("/config")\ndef read_config(config: dict = Depends(get_config)):\n    return config',
        output: '{"model":"deepseek-chat"}',
        hint: '参数默认值写成 Depends(依赖函数)，FastAPI 会自动调用并注入。'
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: 'Depends(get_client) 与参数默认值 get_client() 的区别是？',
        options: ['没有区别', '前者在每次请求时调用，后者在导入时调用一次', '后者更快', '前者不能传参数'],
        answer: 1,
        explain: 'Depends 交给 FastAPI 在请求期解析；写成函数调用则是导入时立即执行一次。'
      },
      {
        type: 'judge',
        question: '用 yield 的依赖可以在请求结束后执行清理代码。',
        answer: true,
        explain: 'yield 之后的 finally 部分在响应完成后执行，适合关闭会话/连接。'
      }
    ]
  }
]
