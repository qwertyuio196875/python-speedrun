/**
 * 第十阶段：AI 应用框架（进阶选修，约 3 小时）
 * 前置：第九阶段装包跑通、第八阶段会发请求与解析 JSON。
 * 只讲"框架帮你省掉哪一步、第一个能跑的例子长什么样"，不追求覆盖全部功能。
 * 所有示例都要 API Key 或额外服务，统一标 verify: false。
 * 内容规范见 docs/content-schema.md
 */
export default [
  {
    id: 'langchain-basics',
    title: 'LangChain：把模型调用串成流程',
    phase: 10,
    order: 1,
    minutes: 32,
    rating: { level: 5, must: 4 },
    summary: '用 LangChain 的 init_chat_model 拿到模型对象，再照着"提示词 → 模型 → 结果"的顺序把一次调用写出来。',
    keywords: ['LangChain', 'langchain', 'LLM', 'chat model', 'init_chat_model', 'invoke', '提示词'],
    tip: '零基础提示：你不用背 LangChain 的每个类。先记住三个动作——拿到模型、把话交给它、读它回来的内容。这就是所有 AI 应用的骨架。',
    lecture: [
      '直接调模型接口要自己拼 JSON、处理字段、管密钥，模型一换代码全要跟着改。LangChain 把这一层包起来，换模型只是改一个参数的事。',
      '最直的一条路：from langchain.chat_models import init_chat_model（版本演进较快，以官方文档为准），一行拿到模型对象；之后统一用 model.invoke("你好")，返回对象用 .content 取回答。',
      'LangChain 真正的价值在于生态：提示词模板、聊天历史管理、工具绑定、输出解析，都是可以自由组合的积木。这门课先学最直的一条，后面几节再加工具和结构化输出。',
      '模型名和密钥通过参数和环境变量配置。先能跑通一次 invoke，再谈工程化。',
      '- init_chat_model("模型名")：拿到统一接口的模型对象',
      '- model.invoke(消息列表)：发送并得到一个回复对象',
      '- 回复对象的 .content：真正的文字回答',
      '- 换模型：换参数名，改动量极小',
      'LangChain 让"调用大模型"从手工活变成配置化活。',
    ],
    terms: [
      { term: 'llm', zh: '大语言模型', note: '能读懂并生成文字的程序，通过接口调用，输入一段话，返回一段话。' },
      { term: 'chat model', zh: '对话模型对象', note: 'LangChain 里代表"某个可调用的模型"的对象，用 init_chat_model 拿到，之后统一用 invoke 调用。' },
      { term: 'invoke', zh: '调用', note: '把输入交给模型并等它返回的方法，最简单的一次一问一答就用它。' },
      { term: 'prompt', zh: '提示词', note: '你发给模型的全部文字说明，包括要求、背景和问题本身。' },
      { term: 'api key', zh: '接口密钥', note: '证明"是你本人在调用"的一串字符串，要放进环境变量，不能写死在代码里。' },
    ],
    steps: [
      '在终端输入 pip install -U langchain 安装核心包。',
      '按你要用的模型再装一个对接包（对接 OpenAI 时是 langchain-openai）。',
      '把密钥写进环境变量（Windows：setx OPENAI_API_KEY "你的密钥"，设完要重开终端）。',
      '写一个脚本：init_chat_model 拿到 model，然后 print(model.invoke("你好")) 看返回。',
      '跑通之后，再把问题换成你自己的需求，观察返回内容的变化。',
    ],
    examples: [
      {
        title: '第一次调用模型',
        code: 'import os\nfrom langchain.chat_models import init_chat_model\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\nmodel = init_chat_model("gpt-4o-mini")\nresponse = model.invoke("用一句话说明什么是变量")\nprint(response.content)',
        output: '预期说明：终端会打印一段说明"变量"的中文文字。需安装 langchain、langchain-openai，并配置可用的 API Key 后在本机运行。',
        note: '需安装相关包并配置密钥后在本机运行（需要联网）。把密钥写进代码只为方便演示，正式项目应放进 .env 或环境变量，不要提交到仓库。',
        verify: false,
      },
      {
        title: '带上明确的要求再问一次',
        code: 'import os\nfrom langchain.chat_models import init_chat_model\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\nmodel = init_chat_model("gpt-4o-mini")\nprompt = "你是零基础 Python 老师。用不超过 40 字解释列表，并给一个例子。"\nprint(model.invoke(prompt).content)',
        output: '预期说明：返回一段更短、更像"老师口吻"的解释，通常还带一行示例代码。需安装相关包并配置密钥后在本机运行。',
        note: '需安装相关包并配置密钥后在本机运行（需要联网）。同一句问题，加上角色和格式要求，返回内容的风格会明显不同——这就是提示词的作用。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '把密钥直接写进代码再传到公开仓库',
        bad: 'os.environ["OPENAI_API_KEY"] = "sk-真实密钥"  然后 git push',
        good: '把密钥放进 .env 或系统环境变量，代码里只读不写',
        note: '密钥一旦进了公开仓库就等于泄露，别人可以拿去消耗你的额度。删除文件历史也不能完全补救，发现泄露后第一件事是去平台重置密钥。',
      },
      {
        title: '装了框架包却没装对接模型的那个包',
        bad: '只 pip install langchain，然后调用 gpt 模型报模型找不到',
        good: '再装 langchain-openai（或对应平台的对接包），或用模型名前缀指明来源',
        note: 'LangChain 核心包不含各家模型的对接代码。报错说找不到模型提供方时，先检查对接包装没装。',
      },
      {
        title: '把整个返回对象当字符串用',
        bad: 'print("回答是：" + model.invoke("你好"))',
        good: 'print("回答是：" + model.invoke("你好").content)',
        note: 'invoke 返回的是带很多信息的消息对象，正文在 content 里。直接拼接会报类型错误，加上 .content 才是你要的那段文字。',
      },
    ],
    practice: [
      {
        prompt: '用你自己领域的例子问模型：让它用一个生活比喻解释"字典"。把回答打印出来。',
        starter: 'import os\nfrom langchain.chat_models import init_chat_model\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\nmodel = init_chat_model("gpt-4o-mini")\n# TODO: 给一句带要求的提示词并打印回答\n',
        answer: 'import os\nfrom langchain.chat_models import init_chat_model\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\nmodel = init_chat_model("gpt-4o-mini")\nanswer = model.invoke("用一个生活比喻解释 Python 的字典，不超过 50 字")\nprint(answer.content)',
        output: '预期说明：打印一段含生活比喻的短说明。需安装相关包并配置密钥后在本机运行。',
        hint: '提示词里写清"用比喻""不超过多少字"，然后别忘了 .content。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '模型返回的消息对象里，真正的那段回复文字放在哪个属性？',
        options: ['.text', '.content', '.message', '.body'],
        answer: 1,
        explain: 'invoke 返回消息对象，正文在 content 里；直接把它当字符串拼接会报类型错误。',
      },
      {
        type: 'judge',
        question: '接口密钥应该写进代码文件，方便随手部署到任何地方。',
        answer: false,
        explain: '密钥要放在环境变量或 .env 里，代码只读取不硬写，避免上传仓库时泄露。',
      },
    ],
  },
  {
    id: 'langchain-tools',
    title: 'LangChain 工具与结构化输出',
    phase: 10,
    order: 2,
    minutes: 32,
    rating: { level: 5, must: 3 },
    summary: '让模型不仅能说话，还能调用你写的函数；同时用结构化输出把"随便一段话"变成"填好的数据"。',
    keywords: ['tool', '工具', 'function calling', 'structured output', '结构化输出', 'agent', 'Pydantic'],
    tip: '零基础提示：模型本身只会生成文字，做不了"查天气""读文件"这类事。你把函数包成工具交给它，它就能在需要时点一下按钮，让你的代码真正去干活。',
    lecture: [
      '模型不会查天气、查库存、算数——它只会文字。"工具调用"让模型在需要时可以"拨通一个函数的电话"，你的代码负责真正执行，再把结果交回模型。',
      '用 @tool 装饰一个普通函数，写好 docstring 说明用途和参数，LangChain 自动把说明转成工具描述交给模型。模型看到问题后自己决定该用哪个工具、传什么参数。',
      '结构化输出解决另一半问题：你想要的数据如果有固定形状，就用 Pydantic 声明形状，要求模型按这个形状填——拿回来的是一个对象，不用再自己猜字符串怎么解析。',
      '两个能力合起来就是：模型判定"需要什么工具" + 模型按"你给定的格式"回填——一个是替模型补强能力，一个是替模型守规矩。',
      '- @tool + docstring：把函数变成模型可用的工具',
      '- 模型自主决定调用时机与参数，代码负责真正执行',
      '- model.with_structured_output(模型)：要求按 Pydantic 形状输出',
      '- 工具 + 结构化输出 = 能按约定规格干活的模型',
      '工具给模型手，结构化输出给模型规矩——缺一都会乱。',
    ],
    terms: [
      { term: 'tool', zh: '工具', note: '交给模型调用的一段函数，用 @tool 装饰并写明用途，模型据此决定什么时候用。' },
      { term: 'agent', zh: '智能体', note: '能自己决定"先做什么、调哪个工具、要不要再试一次"的程序，用 create_agent 一类接口搭起来。' },
      { term: 'structured output', zh: '结构化输出', note: '要求模型按给定字段结构返回，得到的不是散文而是可以直接取字段的数据。' },
      { term: 'response format', zh: '返回格式', note: '声明模型回答要符合哪个数据模型，框架据此校验回来内容的结构。' },
    ],
    steps: [
      '把要交给模型的函数用 @tool 装饰，并写清一句"这个工具是做什么的"。',
      '确认函数有类型注解和返回值，模型靠这些信息判断怎么传参。',
      '先用普通函数试跑一遍，确认它自己能正常工作，再接给模型。',
      '用 create_agent 把模型和工具放一起，问一个必须用工具才能回答的问题。',
      '要固定结构时再定义一个 Pydantic 模型，用 response_format 指定它。',
    ],
    examples: [
      {
        title: '把函数包成工具交给模型',
        code: 'import os\nfrom langchain.agents import create_agent\nfrom langchain.tools import tool\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\n@tool\ndef get_weather(city: str) -> str:\n    """查询某个城市今天的天气。"""\n    return f"{city} 今天晴，20 度"\n\nagent = create_agent(\n    model="openai:gpt-4o-mini",\n    tools=[get_weather],\n    system_prompt="需要天气信息时调用工具，不要自己编。",\n)\nresult = agent.invoke({"messages": [{"role": "user", "content": "北京今天天气怎么样？"}]})\nprint(result["messages"][-1].content)',
        output: '预期说明：模型发现要查天气，于是调用 get_weather，最终回复里包含"晴，20 度"。需安装相关包并配置密钥后在本机运行。',
        note: '需安装相关包并配置密钥后在本机运行（需要联网）。docstring 那句说明很关键——模型就是靠它决定要不要用这个工具，写清楚"做什么"比写得好听重要。',
        verify: false,
      },
      {
        title: '让模型按固定结构回答',
        code: 'import os\nfrom langchain.agents import create_agent\nfrom pydantic import BaseModel\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\nclass Answer(BaseModel):\n    """对用户问题的回答。"""\n    summary: str\n    confidence: float\n\nagent = create_agent(\n    model="openai:gpt-4o-mini",\n    tools=[],\n    response_format=Answer,\n)\nresult = agent.invoke({"messages": [{"role": "user", "content": "用一句话说明什么是列表"}]})\nprint(result["structured_response"])',
        output: '预期说明：打印出字段填好的对象，含 summary 和 confidence 两项，可以像字典一样按字段取值。需安装相关包并配置密钥后在本机运行。',
        note: '需安装相关包并配置密钥后在本机运行（需要联网）。结构由 Pydantic 模型规定，字段名写错或类型不符会被明确报出来，不用自己从文字里抠内容。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '工具函数没写说明，模型不会用',
        bad: '@tool\ndef f(x): return "晴"',
        good: '@tool\ndef get_weather(city: str) -> str:\n    """查询某个城市今天的天气。"""\n    return "晴"',
        note: '工具说明和参数类型是模型判断"该不该用、怎么传参"的唯一线索。说明含糊时，它会选择不调用或者传错参数。',
      },
      {
        title: '工具里写需要密钥或写文件的操作却不加校验',
        bad: '工具函数里直接根据模型给的文件名删除文件',
        good: '工具只做只读查询，或在函数里先校验参数范围再执行',
        note: '模型的参数是它自己生成的，可能超出你的预期。凡是会改数据、删文件、花钱的工具，都要在函数内部再加一层校验。',
      },
      {
        title: '一次塞太多工具还说"随便用"',
        bad: '把十几个功能相似的工具一起交给模型，问一个模糊问题',
        good: '一次给两三个职责清楚、名字能看出用途的工具',
        note: '工具太多太像时，模型容易选错。先把最有用的几个跑通，确认稳定后再加。',
      },
    ],
    practice: [
      {
        prompt: '写一个工具函数，接收城市名并返回当地温度（可以返回固定值），再用它回答"上海多少度"。',
        starter: 'from langchain.tools import tool\n\n# TODO: 用 @tool 写一个 get_temperature 工具\n# TODO: 写出你打算怎么把它交给模型\n',
        answer: 'from langchain.tools import tool\n\n@tool\ndef get_temperature(city: str) -> str:\n    """查询某个城市当前温度。"""\n    return f"{city} 现在 22 度"\n\n# 交给模型：\n# agent = create_agent(model="openai:gpt-4o-mini", tools=[get_temperature])',
        output: '预期说明：模型调用这个工具后，回答里会带上"22 度"。需安装相关包并配置密钥后在本机运行。',
        hint: '装饰器写 @tool，函数下面紧跟一句三引号说明，参数写上类型。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '模型决定要不要调用某个工具，主要依据是什么？',
        options: ['函数名的长度', '工具函数的说明文字和参数类型', '函数在文件里的位置', '工具的数量越多越好'],
        answer: 1,
        explain: '模型看不到函数内部实现，只能靠 docstring 说明和参数类型判断工具用途与传参方式。',
      },
      {
        type: 'judge',
        question: '结构化输出能让你直接按字段名取值，而不用从一段文字里自己抠内容。',
        answer: true,
        explain: '用 response_format 指定数据模型后，返回内容按字段组织，取用更稳、更好接进后续逻辑。',
      },
    ],
  },
  {
    id: 'llamaindex-rag',
    title: 'LlamaIndex：用你的资料回答',
    phase: 10,
    order: 3,
    minutes: 34,
    rating: { level: 5, must: 4 },
    summary: '把一叠文档读进来建索引，然后提问——答案依据来自你的资料，而不是模型的通用记忆。',
    keywords: ['LlamaIndex', 'RAG', '检索', '索引', 'index', 'query engine', 'SimpleDirectoryReader', '文档'],
    tip: '零基础提示：模型没读过你的文件，问它当然不知道。RAG 的思路很朴素——先把你的资料切好、编好索引，提问时先找出最相关的几段，再把这几段连同问题一起交给模型。',
    lecture: [
      '模型训练时的知识是截止到某个时间点的，而且它看不见你公司里的私有文档。RAG（检索增强生成）的思路是：先从你的资料里找相关片段，再把片段和问题一起交给模型——回答就有了出处。',
      'LlamaIndex 把这套流程压到几行代码：SimpleDirectoryReader 读一个文件夹里的文档；VectorStoreIndex.from_documents(documents) 建索引（内部做了切段 + 向量化）；index.as_query_engine() 提问。',
      '内部流程：你的文档切成小段 → 每段变成向量（一串数字，语义相近的段落向量接近）→ 问题也变向量 → 找出最相近的几段 → 连同问题交给模型 → 模型基于这几段作答。',
      'RAG 是目前私有知识问答最主流的做法——比微调便宜、比长上下文稳。它解决的是"回答必须来自你的资料"这个问题。',
      '- SimpleDirectoryReader("资料目录").load_data()',
      '- VectorStoreIndex.from_documents(docs)：切段 + 建向量索引',
      '- index.as_query_engine()：拿到查询引擎',
      '- response = query_engine.query("你的问题")',
      '- 回答基于检索到的原文，可追溯、可更新',
      '想让 AI 回答"我们公司的文档"，路径就是 RAG。',
    ],
    terms: [
      { term: 'rag', zh: '检索增强生成', note: '先在你的资料里检索出相关片段，再让模型基于这些片段生成回答的做法。' },
      { term: 'index', zh: '索引', note: '把文档切块、编号存放后的结构，提问时靠它快速找到相关内容。' },
      { term: 'embedding', zh: '向量化', note: '把文字转成一串数字，意义相近的文字数字也相近，检索就是靠这个找相似内容。' },
      { term: 'query engine', zh: '问答引擎', note: '接受一句提问、返回一个答案的对象，用 index.as_query_engine() 拿到。' },
      { term: 'retriever', zh: '检索器', note: '只负责"找出相关片段"的角色，用 index.as_retriever() 拿到，可以调检索条数。' },
    ],
    steps: [
      '在终端输入 pip install llama-index 安装。',
      '新建一个空文件夹（例如 data），把要问的 .txt 或 .md 文档放进去。',
      '按你的模型平台再装对应的对接包，并配好 API Key 环境变量。',
      '写脚本：读文档 → 建索引 → 建问答引擎 → query 一个问题。',
      '把提问换成资料里没有的内容，观察回答是不是变成"资料里没有提到"这类说法。',
      '要调检索效果时改用 as_retriever(similarity_top_k=5)，先看检索到的片段对不对，再看回答。',
    ],
    examples: [
      {
        title: '五行的最小 RAG',
        code: 'import os\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("这份资料主要讲了什么？")\nprint(response)',
        output: '预期说明：打印一段基于 data 文件夹里资料内容的回答。需安装 llama-index、配置密钥，并准备 data 文件夹和文档后在本机运行。',
        note: '需安装 llama-index、配置密钥并准备文档后在本机运行（需要联网，建立索引时会调用向量化服务）。第一次运行建索引最慢，文档越多等得越久。',
        verify: false,
      },
      {
        title: '先看检索到了什么，再看回答',
        code: 'import os\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\nos.environ["OPENAI_API_KEY"] = "你的密钥"\n\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nretriever = index.as_retriever(similarity_top_k=3)\nnodes = retriever.retrieve("这份资料里提到了哪些注意事项？")\nfor node in nodes:\n    print(node.score)\n    print(node.text[:80])',
        output: '预期说明：打印若干条相关片段，每条带一个相似度分数和开头几十个字。需安装 llama-index、配置密钥并准备文档后在本机运行。',
        note: '需安装 llama-index、配置密钥并准备文档后在本机运行（需要联网）。回答不对时，先看这一步检索出来的片段对不对——检索错了，模型再聪明也答不对。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '资料文件夹是空的或路径写错',
        bad: 'SimpleDirectoryReader("data").load_data() 而 data 里什么都没有',
        good: '确认 data 目录存在，里面确实放了 .txt 或 .md 文件',
        note: '读不到文档时要么直接报错，要么建出一个空索引、回答全是废话。先确认读进来几份文档，再往下走。',
      },
      {
        title: '问的问题和资料内容对不上',
        bad: '资料是产品说明，却问"今天天气怎么样"，然后以为框架坏了',
        good: '先问一个资料里明确写着答案的问题，验证链路通了再扩展',
        note: 'RAG 只能基于你的资料回答。用资料里确有答案的问题做第一次测试，才能分清是链路问题还是问题本身超出了资料范围。',
      },
      {
        title: '把密钥和资料一起提交进仓库',
        bad: 'documents 指向公司内部资料，密钥写在脚本里，一起 push',
        good: '密钥走环境变量，敏感资料目录写进 .gitignore',
        note: 'RAG 处理的常是内部文档。建索引前先想清楚这份资料能不能上传到外部服务，密钥和资料都要排除在版本库之外。',
      },
    ],
    practice: [
      {
        prompt: '准备一个 data 文件夹，放一段自己写的说明文档，用 LlamaIndex 建索引并提出一个文档里能答上的问题。',
        starter: 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\n# TODO: 读文档、建索引、建问答引擎、提问并打印回答\n',
        answer: 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()\nprint(query_engine.query("这份说明文档的主要内容是什么？"))',
        output: '预期说明：打印一段基于你文档内容的回答。需安装 llama-index、配置密钥并准备 data 文档后在本机运行。',
        hint: '四步顺序固定：读文档 → from_documents 建索引 → as_query_engine → query 提问。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: 'RAG 相比直接问模型，最大的区别是什么？',
        options: ['回答速度一定更快', '答案依据来自你先提供的资料，而不是模型原有的记忆', '不需要联网', '不用配置密钥'],
        answer: 1,
        explain: 'RAG 先把相关资料检索出来再让模型作答，所以能回答模型训练时没见过、但你资料里有的内容。',
      },
      {
        type: 'judge',
        question: '回答不准确时，可以先检查检索出来的片段对不对。',
        answer: true,
        explain: '检索错了，模型再强也答不对。用 as_retriever 把片段打出来看，是排查 RAG 问题的第一步。',
      },
    ],
  },
  {
    id: 'fastapi-advanced',
    title: 'FastAPI 进阶：依赖注入与路由分组',
    phase: 10,
    order: 4,
    minutes: 28,
    rating: { level: 5, must: 3 },
    summary: '把公共逻辑（取用户、校验权限）抽成依赖，把一组相关接口整理进 APIRouter，避免 main.py 无限变长。',
    keywords: ['FastAPI', 'Depends', 'APIRouter', '依赖注入', '路由分组', 'prefix'],
    tip: '零基础提示：依赖注入说的"注入"不是什么魔法，就是"每个接口需要什么，就由框架提前准备好再递进去"。省掉你到处复制同一段取用户代码。',
    lecture: [
      '接口一多，函数里就出现大量重复段落：查当前用户、校验权限、读配置。FastAPI 的 Depends 把这些抽成普通函数，接口只要声明"我需要它"就会先执行后注入。',
      'def 查当前用户(token: str = Depends(取token)) -> User: ...，接口参数里写 user: User = Depends(查当前用户)：框架先跑"查用户"，把结果送进接口，接口函数再开工——整个依赖链是声明式的。',
      'APIRouter 则把一组相关路由装箱再注册到主应用：一个文件一个路由组（auth、scores、chat），main.py 只负责组装，不会堆成一坨。',
      '两件套标准用法：APIRouter 分模块装箱 + Depends 抽公共逻辑 + main.py 统一注册——小项目就用这三步结构，不必再引入任何分层。',
      '- def get_user(): ...；接口参数 user=Depends(get_user)',
      '- 嵌套 Depends 可以链式传递：取 token → 查用户 → 查权限',
      '- APIRouter：每组路由一个文件，main.py include_router 注册',
      '- Depends 可测试、可缓存、可覆盖（测试时换假实现）',
      'Depends 是 FastAPI 的"依赖注入"——把公共逻辑从接口里抽干净。',
    ],
    terms: [
      { term: 'dependency', zh: '依赖', note: '接口运行前先执行的一段函数；它的返回值会被交给接口的参数。' },
      { term: 'apirouter', zh: '路由分组器', note: '把一组相关接口揽到一起、再整体挂进主应用的容器。' },
      { term: 'prefix', zh: '前缀', note: '给一组接口统一加上的网址开头，比如 /users。' },
      { term: 'include_router', zh: '注册子路由', note: '把分组器里的接口挂进主应用的方法。' },
    ],
    steps: [
      '写一个普通函数（例如 get_current_user），返回你需要的数据。',
      '在接口参数里写上它的返回类型并用 Depends 包住：user=Depends(get_current_user)。',
      '建一个 APIRouter，把相关的几个接口挂上去。',
      '在主应用用 app.include_router(... ) 把分组注册进去。',
      '用 main:app 起服务并确认每个接口仍能正常工作。',
    ],
    examples: [
      {
        title: '把取用户抽出来用依赖注入',
        code: 'from fastapi import FastAPI, Depends\n\ndef get_current_user():\n    return {"name": "小明", "role": "admin"}\n\napp = FastAPI()\n\n@app.get("/me")\ndef me(user=Depends(get_current_user)):\n    return user',
        output: '预期说明：接口 /me 会返回 get_current_user 准备好的那份用户数据。需安装 fastapi uvicorn 并在本机运行。',
        note: '需安装 fastapi uvicorn 并在本机运行。接口自己不再查用户，而是声明"我要一个 user"，框架自动把 get_current_user 的结果递进来——以后换取用户的方式，只改这一处。',
        verify: false,
      },
      {
        title: '用 APIRouter 把用户接口分组',
        code: 'from fastapi import FastAPI, APIRouter\n\nuser_router = APIRouter(prefix="/users", tags=["users"])\n\n@user_router.get("/")\ndef list_users():\n    return [{"name": "小明"}]\n\n@user_router.get("/1")\ndef get_user():\n    return {"name": "小明", "id": 1}\n\napp = FastAPI()\napp.include_router(user_router)',
        output: '预期说明：注册后可以访问 /users/ 和 /users/1，主应用里不再直接写这些接口。需安装 fastapi uvicorn 并在本机运行。',
        note: '需安装 fastapi uvicorn 并在本机运行。prefix 让同组接口网址统一加前缀，tags 让接口文档自动分组，主应用仍然保持清爽。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '依赖函数必须有返回值',
        bad: 'def get_current_user():\n    print("小明")',
        good: 'def get_current_user():\n    return {"name": "小明"}',
        note: 'Depends 拿到什么，接口参数就是什么。只 print 不 return，接口里拿到的 user 会是 None。',
      },
      {
        title: '子路由注册顺序与前缀对不上',
        bad: 'app.include_router(user_router)，而访问的却是 /user/ 而不是 /users/',
        good: '先确认 APIRouter(prefix="/users")，访问地址必须是 /users/...',
        note: 'prefix 拼错或忘了跟 include_router 对上，接口就"找不到"。调试时先把子路由里的接口单独拿出来跑一遍。',
      },
      {
        title: '在依赖里写可重复且有副作用的逻辑',
        bad: 'def verify():\n    log.write("又调用了一次")   # 每秒几十次就刷爆日志',
        good: '依赖只做轻量读取/校验；真正要记日志的逻辑放到接口里按需调用',
        note: '依赖会在每次请求时都执行。把沉重的或带副作用的操作塞进去，会让每个接口都在重复干同样的事。',
      },
    ],
    practice: [
      {
        prompt: '写一个依赖 get_config，返回 {"env": "dev"}，再让 /config 接口把它原样返回。',
        starter: 'from fastapi import FastAPI, Depends\n\ndef get_config():\n    # TODO: 返回配置字典\n\napp = FastAPI()\n\n# TODO: 写 /config 接口并用 Depends 接进来\n',
        answer: 'from fastapi import FastAPI, Depends\n\ndef get_config():\n    return {"env": "dev"}\n\napp = FastAPI()\n\n@app.get("/config")\ndef config(cfg=Depends(get_config)):\n    return cfg',
        output: '预期说明：访问 /config 会返回 {"env": "dev"}。需安装 fastapi uvicorn 并在本机运行。',
        hint: '依赖函数先写出来并 return 数据；接口参数用 cfg=Depends(get_config) 接住。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '接口参数写成 Depends(get_current_user)，表示什么？',
        options: ['接口启动时执行一次', '每次请求执行 get_current_user，并把结果传给参数', '依赖里必须写 print', '接口不能有返回值'],
        answer: 1,
        explain: 'Depends 表示"请求时先跑这段函数，把它的返回值作为参数交给你"。',
      },
      {
        type: 'judge',
        question: 'APIRouter 可以给一组接口统一加上网址前缀，再整体挂进主应用。',
        answer: true,
        explain: 'APIRouter(prefix="/users") 加前缀，include_router 挂进主应用，主文件保持简洁。',
      },
    ],
  },
  {
    id: 'flask-advanced',
    title: 'Flask 进阶：应用工厂与蓝图',
    phase: 10,
    order: 5,
    minutes: 30,
    rating: { level: 5, must: 3 },
    summary: '把创建 app 的代码放进函数里，按功能把路由拆进蓝图：项目从几十行扩展到稳定结构。',
    keywords: ['Flask', '应用工厂', 'create_app', 'blueprint', '蓝图', 'register_blueprint', '模块化'],
    tip: '零基础提示：蓝图不是蓝色的图，而是一组网址和函数的"分册"。项目大了以后，一册装会员、一册装报名，最后拼进一本"总册"里。',
    lecture: [
      '路由少的时候，所有 @app.route 写在一个 app.py 里没问题；项目一大就乱成一锅。蓝图（Blueprint）和应用工厂解决的是"怎么组织大项目"这个问题。',
      '蓝图：一组相关路由装箱——bp = Blueprint("auth", __name__)：然后把路由写成 @bp.route(...)，最后 app.register_blueprint(bp)。模块既能复用，又能避免路由互相踩。',
      '应用工厂：把"创建 + 配置 app"放进 create_app() 函数，而不是模块顶层直接建 app。测试时可以建一个专用配置的新实例，部署时按环境变量选配置——避免"导入即创建"带来的副作用。',
      '两者合起来就是 Flask 工程化的基本盘：工厂里注册蓝图，蓝图按功能划分，配置按环境分（开发/测试/生产）。',
      '- bp = Blueprint("名", __name__)：建蓝图',
      '- app.register_blueprint(bp)：注册进主应用',
      '- def create_app(config=None): app = Flask(__name__) ... return app',
      '- 大项目 + 多环境 + 可测试 = 应用工厂 + 蓝图',
      '当你发现 app.py 超过 200 行，就该上蓝图了。',
    ],
    terms: [
      { term: 'application factory', zh: '应用工厂', note: '一个叫 create_app 的函数，负责新建和配置 Flask 应用并返回它。' },
      { term: 'blueprint', zh: '蓝图', note: '一组相关路由和视图的容器，最后用 register_blueprint 挂进主应用。' },
      { term: 'register_blueprint', zh: '注册蓝图', note: '把蓝图里的网址告诉主应用的方法。' },
      { term: 'module', zh: '模块', note: '一个 .py 文件，蓝图通常放在单独文件里按功能划分。' },
    ],
    steps: [
      '新建 app 文件夹，里面放 __init__.py。',
      '在 __init__.py 写 def create_app():，创建并配置 app 再返回。',
      '另建一个 views 文件，里面定义蓝图 bp = Blueprint("main", __name__)。',
      '在 create_app 里 import 蓝图并 app.register_blueprint(bp)。',
      '保证路由文件的命名和引用一致，运行测试命令确认没拼错。',
    ],
    examples: [
      {
        title: '最小应用工厂',
        code: 'from flask import Flask\n\ndef create_app():\n    app = Flask(__name__)\n\n    @app.route("/")\n    def index():\n        return "欢迎"\n\n    return app\n\nif __name__ == "__main__":\n    create_app().run()',
        output: '预期说明：python app.py 启动后访问 / 显示"欢迎"。需安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。create_app 就是"工厂"：测试时想用不同配置，只改这一个函数里的内容，别的地方不动。',
        verify: false,
      },
      {
        title: '用蓝图拆出用户相关接口',
        code: 'from flask import Flask, Blueprint\n\nbp = Blueprint("users", __name__, url_prefix="/users")\n\n@bp.route("/")\ndef list_users():\n    return "小明，小红"\n\ndef create_app():\n    app = Flask(__name__)\n    app.register_blueprint(bp)\n    return app',
        output: '预期说明：访问 /users/ 显示"小明，小红"。需安装 flask 并在本机运行。',
        note: '需安装 flask 并在本机运行。蓝图里的网址会自动带上 url_prefix，注册到主应用后就能正常访问。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '蓝图路由写了却没注册',
        bad: '写了 bp = Blueprint(...) 和路由，忘了在 create_app 里 register_blueprint',
        good: 'create_app 里一定写上 app.register_blueprint(bp)',
        note: '蓝图相当于"待上架的货"，不注册就等于没挂到网址上，浏览器访问会 404。',
      },
      {
        title: '工厂函数里直接写成 app = Flask(...) 却还想测试',
        bad: '把 app 当全局变量，测试不能换配置',
        good: '永远通过 create_app() 拿 app',
        note: '工厂的价值就是"能造出不同配置的 app"。全局变量 app 会让测试和多环境配置都变麻烦。',
      },
      {
        title: '蓝图文件互相 import 造成循环引用',
        bad: 'users 蓝图 import views，views 又 import users 蓝图',
        good: '蓝图只定义路由和自己需要的工具，共享代码放到独立的模块里',
        note: '循环 import 会让程序启动时直接报错。工具函数、数据模型单独放一个文件，大家都从那里拿。',
      },
    ],
    practice: [
      {
        prompt: '写一个 create_app 函数，里面注册一个蓝图 /about 返回"关于"。',
        starter: 'from flask import Flask, Blueprint\n\n# TODO: 建蓝图 bp 并写 /about 路由\n\ndef create_app():\n    # TODO: 创建 app 并注册蓝图\n    pass\n',
        answer: 'from flask import Flask, Blueprint\n\nbp = Blueprint("about", __name__, url_prefix="/about")\n\n@bp.route("/")\ndef about():\n    return "关于"\n\ndef create_app():\n    app = Flask(__name__)\n    app.register_blueprint(bp)\n    return app',
        output: '预期说明：访问 /about/ 显示"关于"。需安装 flask 并在本机运行。',
        hint: '蓝图先建好再挂进 create_app；url_prefix 决定最终网址前缀。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '蓝图要在主应用里生效，必须调用哪个方法？',
        options: ['app.run()', 'app.register_blueprint(bp)', 'bp.route()', 'Flask(__name__)'],
        answer: 1,
        explain: '蓝图只是容器，register_blueprint 才把它里面的网址注册到主应用上。',
      },
      {
        type: 'judge',
        question: '应用工厂把"创建并配置 Flask 应用"放进一个函数里，方便测试和多环境配置。',
        answer: true,
        explain: 'create_app 可以返回不同配置的 app，是 Flask 长项目的标准结构。',
      },
    ],
  },
  {
    id: 'django-advanced',
    title: 'Django 进阶：模型、后台与 Admin',
    phase: 10,
    order: 6,
    minutes: 32,
    rating: { level: 5, must: 3 },
    summary: '用模型描述数据，makemigrations/migrate 建表，登记到 Admin 后台，零代码获得一套管理界面。',
    keywords: ['Django', '模型', 'model', 'makemigrations', 'migrate', 'Admin', '后台'],
    tip: '零基础提示：Django 最值钱的一句话是"把数据库表当成普通 Python 类写"。类加完字段，命令会自动帮你同步到数据库。',
    lecture: [
      'Flask 和 FastAPI 是接口层，真正"存"数据的是数据库。Django 把数据库一张表对应成一个 Python 类——你写类，它负责建表和建后台。',
      '模型类：class Score(models.Model): name = models.CharField(max_length=50); score = models.IntegerField()——属性就是列，类型就是字段类型。',
      '跑两条命令：python manage.py makemigrations 生成变更脚本、python manage.py migrate 执行建表（改模型后再跑一遍就是改表）。',
      'admin.site.register(Score) 把模型登记进后台——/admin 立刻有可增删改查的管理页面，内网运营、演示用数据录入，一页都不用自己写。',
      '- 模型类 = 表结构定义（属性即字段）',
      '- makemigrations → migrate：从类到真表',
      '- admin 登记：两行代码换一个完整后台',
      '- 改字段：改类 → makemigrations → migrate',
      '不写 SQL、不写后台，Django 把重复劳动的部分全包了——你只管业务字段。',
    ],
    terms: [
      { term: 'model', zh: '模型', note: 'Django 里对应数据库表的 Python 类。' },
      { term: 'makemigrations', zh: '生成迁移', note: '把模型的变化整理成"迁移文件"的命令。' },
      { term: 'migrate', zh: '应用迁移', note: '按迁移文件实际改数据库结构的命令。' },
      { term: 'admin', zh: '管理后台', note: 'Django 自带的数据管理网页，登记模型后即可使用。' },
      { term: 'field', zh: '字段', note: '模型类里的一个属性，对应数据库一列。' },
    ],
    steps: [
      '在 models.py 写一个模型类，继承 models.Model。',
      '给字段用合适的类型：CharField 文字、IntegerField 整数、BooleanField 真假。',
      '运行 python manage.py makemigrations 生成迁移。',
      '运行 python manage.py migrate 让数据库建表。',
      '在 admin.py 里登记模型，创建超级用户，访问 /admin 看结果。',
    ],
    examples: [
      {
        title: '写模型并登记后台',
        code: '# models.py\nfrom django.db import models\n\nclass Todo(models.Model):\n    title = models.CharField(max_length=100)\n    done = models.BooleanField(default=False)\n\n# admin.py\nfrom django.contrib import admin\nfrom .models import Todo\n\nadmin.site.register(Todo)',
        output: '预期说明：迁移并创建超级用户后，/admin 里会出现 Todo 列表，可以新增和修改数据。需安装 django 并在本机运行。',
        note: '需安装 django 并在本机运行。CharField 必须给 max_length；default=False 让没传 done 时自动为假。',
        verify: false,
      },
      {
        title: '列出未完成待办',
        code: '# 在视图里可以这样取数据\ntodos = Todo.objects.filter(done=False).values_list("title", flat=True)\nfor title in todos:\n    print(title)',
        output: '预期说明：打印出所有未完成待办的标题，每行一个。需安装 django 并配置好数据库。',
        note: '需安装 django 并配置好数据库。objects 是模型自带的"管理器"，filter 挑行、values_list 只取需要的列。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '改了模型忘了迁移',
        bad: '模型加了一个字段，直接运行代码',
        good: '改完模型先 makemigrations 再 migrate',
        note: '模型只是 Python 代码，数据库真正变化要靠这两条命令。忘做，数据库不会知道新字段。',
      },
      {
        title: '模型不继承 models.Model',
        bad: 'class Todo:\n    title = ...',
        good: 'class Todo(models.Model):\n    title = models.CharField(...)',
        note: '不继承 Model，Django 就不知道这是张表，也不会生成对应数据库结构。',
      },
      {
        title: 'CharField 不写 max_length',
        bad: 'title = models.CharField()',
        good: 'title = models.CharField(max_length=100)',
        note: 'CharField 必须指定最大长度，它是建表时不可省略的参数。',
      },
    ],
    practice: [
      {
        prompt: '写一个 Book 模型（title、pages 整数）并登记到 Admin 后台。',
        starter: '# models.py\n# TODO: 写 Book 模型\n\n# admin.py\n# TODO: 登记 Book\n',
        answer: '# models.py\nfrom django.db import models\n\nclass Book(models.Model):\n    title = models.CharField(max_length=100)\n    pages = models.IntegerField()\n\n# admin.py\nfrom django.contrib import admin\nfrom .models import Book\n\nadmin.site.register(Book)',
        output: '预期说明：迁移后 /admin 会出现 Book 管理界面。需安装 django 并在本机运行。',
        hint: 'CharField 必给 max_length；Boolean/Integer 字段按需选择。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '模型类准备好后，第一步应运行什么命令？',
        options: ['python manage.py runserver', 'python manage.py makemigrations', 'python manage.py migrate', 'python manage.py createsuperuser'],
        answer: 1,
        explain: '先 makemigrations 生成迁移文件，再 migrate 应用到数据库。',
      },
      {
        type: 'judge',
        question: 'Django 后台管理（Admin）可以在登记模型后自动获得增删改查界面。',
        answer: true,
        explain: 'admin.site.register(模型) 后，/admin 里就会有这个模型的管理界面。',
      },
    ],
  },
  {
    id: 'httpx-advanced',
    title: 'httpx 进阶：超时、连接池与异步批量请求',
    phase: 10,
    order: 7,
    minutes: 30,
    rating: { level: 5, must: 3 },
    summary: '用 timeout 防卡死、用 Limits 控制连接数、用同一个 AsyncClient 并发多个请求：又快又稳。',
    keywords: ['httpx', 'timeout', 'Limits', 'AsyncClient', '并发', '连接池', '异常'],
    tip: '零基础提示：网络请求最怕"无限等"。给请求定上限、把客户端复用起来，程序就不会因为一封慢信卡住整个人。',
    lecture: [
      '大批量并发请求时，不设限就是对自己和对方服务都不负责任。httpx 高级特性解决的就是"快但稳"这件事。',
      '超时：httpx.get(url, timeout=5) —— 对方迟迟没回复，就断掉重试或报错，不会把程序拖死。AsyncClient 同样带 timeout 参数，所有请求共享。',
      '限流：Limits(max_connections=10, max_keepalive_connections=5) 控制同时开几条连接——不让自己占满对方的承载能力，10 是一个常用的温和上限。',
      '连接复用：with httpx.AsyncClient() as client: 在 with 里发的所有请求复用同一批连接，省掉重复建连的开销——批量任务的性能提升非常明显。',
      '- httpx.get(url, timeout=5)：单次请求超时',
      '- Limits(max_connections=10)：并发上限',
      '- with AsyncClient() as client：复用连接',
      '- await client.get(url) 并发时记得搭配 gather',
      '- 正确姿势：超时 + 限流 + 复用，三者缺一不可',
      '批量请求写成"稳"而不是"猛"——对方撑得住，你自己也不慌。',
    ],
    terms: [
      { term: 'timeout', zh: '超时', note: '强制请求在指定时间内必须得到回应，否则放弃并报错。' },
      { term: 'limits', zh: '连接池上限', note: '规定同时最多开多少连接，避免把对方服务打爆或自己资源耗尽。' },
      { term: 'connection pool', zh: '连接池', note: '复用已建立的网络连接，不每次请求都重新建立。' },
      { term: 'async', zh: '异步', note: '等待网络时可以同时去做别的事，而不是干等着。' },
    ],
    steps: [
      '写一个异步函数，里面开 AsyncClient 并设置 timeout。',
      '用 asyncio.gather 同时发出多个请求。',
      '用 Limits 限制连接数，避免瞬间开太多连接。',
      '除去连接异常与状态码异常，两个都要处理。',
      '对照耗时，感受并发带来的差别（仅供参考）。',
    ],
    examples: [
      {
        title: '带超时的并发请求',
        code: 'import asyncio\nimport time\nimport httpx\n\nasync def main():\n    start = time.time()\n    limits = httpx.Limits(max_connections=10)\n    async with httpx.AsyncClient(timeout=10, limits=limits) as client:\n        results = await asyncio.gather(\n            client.get("https://example.com"),\n            client.get("https://example.com"),\n        )\n    print([r.status_code for r in results])\n    print("耗时", round(time.time() - start, 2), "秒")\n\nasyncio.run(main())',
        output: '预期说明：打印 [200, 200] 和一行耗时，第二个请求不用等第一个完全结束。需安装 httpx 并联网在本机运行。',
        note: '需安装 httpx 并联网在本机运行。复用同一个 client：每次新建客户端都要重复握手，复用 client 能明显省掉这部分开销。',
        verify: false,
      },
      {
        title: '处理超时和连接失败',
        code: 'import asyncio\nimport httpx\n\nasync def main():\n    try:\n        async with httpx.AsyncClient(timeout=1) as client:\n            await client.get("https://example.com")\n    except httpx.TimeoutException:\n        print("超时了")\n    except httpx.ConnectError:\n        print("连不上")\n\nasyncio.run(main())',
        output: '预期说明：网络正常时正常结束；太慢或连不上时分别打印"超时了"或"连不上"。需安装 httpx 并联网在本机运行。',
        note: '需安装 httpx 并联网在本机运行。处理两类异常：超时（TimeoutException）和连不上（ConnectError）。别让未处理的异常把程序整个崩掉。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '不设超时，网络一卡就卡住',
        bad: 'client = httpx.AsyncClient()\nawait client.get(url)',
        good: 'client = httpx.AsyncClient(timeout=10)',
        note: '默认有超时但建议显式写清楚：你的程序到底愿意为每次请求最多等多久，是必需的约定。',
      },
      {
        title: '用同步写法一次次串行请求',
        bad: 'for url in urls: httpx.get(url)',
        good: 'async 并配合 gather，让请求同时在等待中',
        note: '同步串行只会把所有请求的耗时相加；异步让它们同时在等待，总耗时接近最慢的那个。',
      },
      {
        title: '瞬时并发数没有限制',
        bad: '几百个请求同时发出，对方被打爆',
        good: '用 Limits(max_connections=…) 限制上限',
        note: '并发不是越高越好。礼貌的并发既保护你的程序，也保护对方的服务。',
      },
    ],
    practice: [
      {
        prompt: '写一个异步函数，同时请求两个网址并打印它们的状态码。',
        starter: 'import asyncio\nimport httpx\n\nasync def main():\n    # TODO: 同时请求两个网址并打印状态码\n    pass\n\nasyncio.run(main())\n',
        answer: 'import asyncio\nimport httpx\n\nasync def main():\n    async with httpx.AsyncClient(timeout=10) as client:\n        results = await asyncio.gather(\n            client.get("https://example.com"),\n            client.get("https://example.com"),\n        )\n    print([r.status_code for r in results])\n\nasyncio.run(main())',
        output: '预期说明：打印 [200, 200]。需安装 httpx 并联网在本机运行。',
        hint: '把两个 client.get 放进 asyncio.gather，然后 await。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '同一个连接池被复用，主要好处是？',
        options: ['不需要安装 httpx', '减少重复建连接的开销，请求更省时间', '可以自动解析 JSON', '不会报任何错'],
        answer: 1,
        explain: '复用 client 省去反复握手和协商的时间，很多小请求累积下来差别明显。',
      },
      {
        type: 'judge',
        question: 'asyncio.gather 可以把多个异步请求并发地一起等。',
        answer: true,
        explain: 'gather 同时启动多个任务并一起等它们完成，总耗时接近最慢的一个。',
      },
    ],
  },
  {
    id: 'docker-deploy',
    title: '部署上线：把项目发给全世界',
    phase: 10,
    order: 8,
    minutes: 32,
    rating: { level: 4, must: 4 },
    summary: '构建、授权、部署三步把项目发上线；本课程网站就是用这套流程部署的，环境变量管好密钥。',
    keywords: ['部署', '上线', 'Docker', '环境变量', '构建', '发布'],
    tip: '零基础提示：部署就是"让别人通过网址用到你的程序"。本课程网站自己就是案例：构建成静态文件、传到 Cloudflare，得到一个 workers.dev 网址——你现在看的页面就是这么上线的。',
    lecture: [
      '代码写完只是本地能跑，真正上线要按两条路走：静态网站和持续运行的后端服务。',
      '静态网站（比如本课程站）：npm run build 构建出一堆文件，传到托管平台就能访问——没有持续运行的进程，最便宜也最省心。',
      '后端服务（FastAPI/Flask）：需要一台 7×24 运行的机器。Docker 把"代码 + 解释器 + 依赖"打成一个镜像，到哪里都能原样跑；镜像由 Dockerfile 描述：FROM 基础镜像 → COPY 代码 → RUN 装依赖 → CMD 启动。',
      '共同铁律：密钥管理。数据库密码、API Key 一律放环境变量（或 .env 文件，且 .env 进 .gitignore），绝不进代码仓库——泄露一次密钥就等于交出整套系统的钥匙。',
      '- 静态：push 到仓库 → 托管平台自动 build 发布',
      '- 后端：Dockerfile → 镜像 → 服务器运行容器',
      '- 环境变量：os.environ.get("API_KEY") 读取密钥',
      '- .env 必须被 .gitignore',
      '- 上线三件套：镜像、域名、环境变量',
      '部署不是终点，而是"让别人也能用你的东西"的开始。',
    ],
    terms: [
      { term: 'deploy', zh: '部署', note: '把写好的程序放到服务器或托管平台，让别人能访问。' },
      { term: 'build', zh: '构建', note: '把源代码加工成可运行的产物，如 npm run build 生成 dist 文件夹。' },
      { term: 'docker', zh: '容器', note: '把代码和运行环境打包在一起的技术，解决"在我电脑能跑"的问题。' },
      { term: 'environment variable', zh: '环境变量', note: '在系统层面存配置（如密钥），代码里用 os.environ 读取。' },
      { term: 'static hosting', zh: '静态托管', note: '专门托管构建后静态文件的平台，如 Cloudflare Pages/Workers。' }
    ],
    steps: [
      '构建：npm run build（或你项目的构建命令），产出可发布的文件夹',
      '授权：npx wrangler login，浏览器里点一次 Allow',
      '部署：npx wrangler deploy，得到形如 xxx.workers.dev 的网址',
      '打开网址验证功能正常；把网址分享出去',
      '之后每次更新：重新构建再 deploy（或配好 Git 自动部署，push 即上线）',
    ],
    examples: [
      {
        title: '本课程网站真实的三步上线',
        code: `# 终端里依次执行（本项目真实使用过的命令）：
# 1) npm run build          # 构建出 dist/ 静态文件
# 2) npx wrangler login     # 浏览器弹出 Cloudflare 授权页，点允许
# 3) npx wrangler deploy    # 上传并发布

print("部署完成：https://python-speedrun.3356921908.workers.dev")`,
        output: `部署完成：https://python-speedrun.3356921908.workers.dev`,
        note: '这就是本课程网站的上线过程；你正在看的页面就是这三条命令的结果。以后 push 到 GitHub 会自动触发部署。',
      },
      {
        title: '认识 Dockerfile：把环境和代码一起打包',
        code: `dockerfile = """
FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
"""
lines = [l for l in dockerfile.strip().split("\\n") if l.strip()]
print("指令数:", len(lines))
print("基础镜像:", lines[0].split()[1])`,
        output: `指令数: 5
基础镜像: python:3.12-slim`,
        note: 'FROM 指定基础环境，COPY 把代码装进去，RUN 装依赖，CMD 是启动命令。有这份文件，任何装了 Docker 的机器都能跑出一样的结果。',
      },
      {
        title: '部署前检查：密钥走环境变量',
        code: `import os

config = {
    "数据库密码": os.environ.get("MYSQL_PASSWORD"),
    "AI 接口密钥": os.environ.get("LLM_API_KEY"),
}
for name, value in config.items():
    print(name, "→", "已配置" if value else "未设置")`,
        output: `数据库密码 → 未设置
AI 接口密钥 → 未设置`,
        note: '上线前跑一遍这个检查：两项都应"已配置"。密钥通过平台的环境变量设置页填入，不进代码、不进 Git。',
      }
    ],
    pitfalls: [
      {
        title: '密钥写进代码并推上仓库',
        bad: 'api_key = "sk-真实密钥"   # 提交后永久留在 Git 历史里',
        good: 'api_key = os.environ["LLM_API_KEY"]   # 平台环境变量里配置',
        note: '代码会进 Git 历史，删了文件也删不掉历史；泄露的密钥要立刻在平台上作废重发。'
      },
      {
        title: '改了代码忘了重新构建部署',
        bad: '改完源码直接刷新线上网址，看不到变化',
        good: '重新 build 再 deploy（或确认 Git 自动部署已触发）',
        note: '线上跑的是上次构建的产物；源码更新后必须重新走一遍构建和部署。'
      },
      {
        title: '本地能跑，服务器上跑不起来',
        bad: '依赖没写进 requirements.txt，服务器上根本没装',
        good: '依赖全部写进 requirements.txt，环境用 Docker 或平台配置固定',
        note: '"在我电脑能跑"的根因是环境不一致；把依赖和环境写进文件（或镜像）才能处处一致。'
      }
    ],
    practice: [
      {
        prompt: '写一个部署前自检脚本：用 for 循环逐条打印 4 项检查清单（构建产物、密钥、依赖、网址），每条前加 [ ] 标记。',
        starter: `checks = ["dist 目录已生成", "密钥已放环境变量", "依赖已写入 requirements.txt", "已拿到线上网址"]
# TODO: 循环打印检查清单
`,
        answer: `checks = ["dist 目录已生成", "密钥已放环境变量", "依赖已写入 requirements.txt", "已拿到线上网址"]
for i, item in enumerate(checks, start=1):
    print(f"[ ] {i}. {item}")`,
        output: `[ ] 1. dist 目录已生成
[ ] 2. 密钥已放环境变量
[ ] 3. 依赖已写入 requirements.txt
[ ] 4. 已拿到线上网址`,
        hint: 'enumerate(checks, start=1) 给每条加编号；[ ] 是待办标记，做完可以改成 [x]。',
      }
    ],
    quiz: [
      {
        type: 'choice',
        question: '为什么部署前要把密钥放进环境变量？',
        options: ['让密钥更难被猜到', '代码会进 Git 历史，写死的密钥等于公开', '环境变量让程序跑得更快', '平台要求必须这样'],
        answer: 1,
        explain: '写死在代码里的密钥会随仓库公开；环境变量存在平台配置里，不进代码。',
      },
      {
        type: 'judge',
        question: 'Docker 的价值之一是让程序在不同机器上有一致的运行环境。',
        answer: true,
        explain: '镜像把代码和依赖环境一起打包，"在我电脑能跑"就变成了"在哪都能跑"。',
      },
      {
        type: 'code',
        question: '补全：读取环境变量里的 API 密钥。',
        code: 'import os\nkey = os.__________["LLM_API_KEY"]',
        answer: 'environ',
        accept: [],
        explain: 'os.environ 是环境变量字典，按键取值；密钥都从这里来。'
      }
    ]
  },
  {
    id: 'pytest-advanced',
    title: 'pytest 进阶：参数化与夹具',
    phase: 10,
    order: 9,
    minutes: 30,
    rating: { level: 5, must: 3 },
    summary: '用 @pytest.mark.parametrize 把多组用例一行行写出来，用 @pytest.fixture 给测试准备公共数据：又快又不乱。',
    keywords: ['pytest', 'parametrize', 'fixture', '夹具', '参数化', '测试'],
    tip: '零基础提示：参数化就是"同一条检查，换五组数据跑五次"；夹具就是"多个测试共用的准备工作，写一次，哪里需要哪里拿"。',
    lecture: [
      '测试一多，就不能再靠复制粘贴写几十个 test_ 函数——参数化让你用一个函数覆盖多组输入。',
      '@pytest.mark.parametrize("输入,期望", [(1, 1), (2, 4), (3, 9)])：pytest 自动按列表跑三次，哪一组挂了报哪一组——失败信息里带上参数，定位零麻烦。',
      '夹具（fixture）负责"搭场子"：被测对象、临时目录、测试数据库链接，都写成一个普通函数、打上 @pytest.fixture，谁需要就在参数里写它的名字，pytest 自动注入。',
      '两个特性合起来解决"测试也是代码"这件事：参数化去掉重复，fixture 去掉样板——测试能长期维护，而不是两周后腐烂掉。',
      '- @pytest.mark.parametrize("参数名", [(..), (..)])',
      '- 参数化不通过时，失败信息指明具体输入',
      '- @pytest.fixture：公共准备工作抽成夹具',
      '- 参数里写夹具名字即可注入',
      '- 参数化 + 夹具 = 可维护的测试套件',
      '测试套件也要按代码标准维护——烂着的测试比没有测试更糟。',
    ],
    terms: [
      { term: 'parametrize', zh: '参数化', note: '用 @pytest.mark.parametrize 给同一测试函数喂多组参数，每组单独算一条用例。' },
      { term: 'fixture', zh: '夹具', note: '用 @pytest.fixture 装饰的函数，返回给测试用的准备好的数据。' },
      { term: 'assert', zh: '断言', note: '条件为假就报错，是测试失败的信号。' },
      { term: 'test case', zh: '测试用例', note: '一组"输入 → 期望输出"的检查。' },
    ],
    steps: [
      '写一个普通测试函数，确认能被 pytest 收集并通过。',
      '用 @pytest.mark.parametrize 写两三组输入，每组当一条用例。',
      '把准备数据的公共逻辑抽成一个 @pytest.fixture 函数。',
      '在测试函数参数里写上夹具的名字来引用它。',
      '故意改错一组参数，看 pytest 指出是哪一组失败。',
    ],
    examples: [
      {
        title: '参数化批量测试加法',
        code: 'import pytest\n\n@pytest.mark.parametrize("a, b, expected", [\n    (1, 2, 3),\n    (0, 0, 0),\n    (-1, 1, 0),\n])\ndef test_add(a, b, expected):\n    assert a + b == expected',
        output: '预期说明：终端运行 pytest 会收集到 3 条用例并全部通过。需先安装 pytest 并在本机运行。',
        note: '需安装 pytest 并在本机运行。parametrize 的第一个参数是参数名列表，第二个是数据列表；每一组数据会单独算一条用例。',
        verify: false,
      },
      {
        title: '用夹具准备公共数据',
        code: 'import pytest\n\n@pytest.fixture\ndef sample_todo():\n    return {"title": "写作业", "done": False}\n\ndef test_title(sample_todo):\n    assert sample_todo["title"] == "写作业"\n\ndef test_not_done(sample_todo):\n    assert sample_todo["done"] is False',
        output: '预期说明：终端运行 pytest 收集到 2 条用例并全部通过。需先安装 pytest 并在本机运行。',
        note: '需安装 pytest 并在本机运行。夹具函数用 @pytest.fixture 装饰；测试函数在参数里写夹具名，pytest 就会把它返回值喂进来。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '参数化名字和函数参数对不上',
        bad: '@pytest.mark.parametrize("a, b", [(1, 2)])\ndef test_add(x, y): ...',
        good: '参数名必须一模一样：a, b',
        note: '参数化里的名字和函数参数不一致时，pytest 会报参数找不到，容易误判成别的错误。',
      },
      {
        title: '测试函数之外还想传参但没写 fixture',
        bad: 'def test_read_file(): data = 读文件(...)',
        good: '把读文件抽成 @pytest.fixture，需要的测试函数写上它的名字',
        note: '公共准备工作抽成夹具，是测试可维护的关键一步；每个测试函数都自己抄一遍读文件的逻辑，改一次地方就要改十处。',
      },
      {
        title: '一个函数里塞太多断言',
        bad: 'def test_todo(): 测创建、测更新、还测删除',
        good: '一个函数只测一件事，组合起来的流程放整体测试里',
        note: '一个测试只验证一件事，失败时更容易定位哪条规则被破坏了。',
      },
    ],
    practice: [
      {
        prompt: '为函数 add(a, b) 写参数化测试，覆盖 (1, 2)→3、(5, 5)→10、(-1, 1)→0。',
        starter: 'import pytest\n\ndef add(a, b):\n    return a + b\n\n# TODO: 写参数化测试\n',
        answer: 'import pytest\n\ndef add(a, b):\n    return a + b\n\n@pytest.mark.parametrize("a, b, expected", [(1, 2, 3), (5, 5, 10), (-1, 1, 0)])\ndef test_add(a, b, expected):\n    assert add(a, b) == expected',
        output: '预期说明：终端运行 pytest 收集到 3 条用例并全部通过。需先安装 pytest 并在本机运行。',
        hint: 'parametrize 的第一个参数是参数名列表，第二个是输入输出列表。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '@pytest.mark.parametrize 的作用是？',
        options: ['只给测试起个名字', '给同一个测试函数喂多组参数，每组算一条用例', '标记测试预计会失败', '跳过这个测试'],
        answer: 1,
        explain: 'parametrize 会把同一组检查跑多次，每次传不同参数，数量变多但写法一样。',
      },
      {
        type: 'judge',
        question: '夹具函数用 @pytest.fixture 装饰，测试函数在参数名里写夹具的名字即可使用。',
        answer: true,
        explain: 'pytest 按参数名匹配夹具，并把夹具的返回值交给测试函数。',
      },
    ],
  },
  {
    id: 'ai-app-capstone',
    title: '实战：从零实现一个可运行的 RAG 问答接口',
    phase: 10,
    order: 10,
    minutes: 40,
    rating: { level: 5, must: 5 },
    summary: '把前面所有零件装成一台机器：FastAPI 提供接口、依赖注入管配置、LlamaIndex 检索你的资料、Pydantic 约束返回格式、pytest 守住行为。',
    keywords: ['实战', 'RAG', 'FastAPI', '依赖注入', 'Pydantic', 'pytest', '项目结构', '整合'],
    tip: '零基础提示：这一节不是在学新知识，而是把前面学过的零件按顺序装起来。跑不通时，一次只改一处，并确认上一步确实是好的。',
    lecture: [
      '前面所有章节，在这门课里组装成一个完整项目：一个"能被别人用的 AI 问答服务"。它不是新知识，而是把前面 24 节的知识拼成能交付的东西。',
      '需要同时成立的：稳定接口 + 错误处理（第 8、9 阶段）；可替换配置（环境变量、多环境）；检索来自真实资料（第 10 阶段 RAG）；返回结构固定（Pydantic 模型）；失败路径有测试（pytest 锁行为）。',
      '推荐的搭建顺序：先让检索能跑出一个正确回答 → 再套接口层（FastAPI）对外暴露 → 再补错误处理和依赖注入 → 最后补测试把行为固定。每一步验证一步，不要一次性铺开。',
      '你会反复用到：Pydantic 校验请求/响应、Depends 注入检索器、logging 记录请求、try/except 兜底模型失败、pytest 覆盖"检索为空""接口不通"两条失败路径。',
      '- 第一步：检索脚本跑通一个正确回答',
      '- 第二步：FastAPI 暴露 POST 接口',
      '- 第三步：错误处理 + 日志 + 配置外置',
      '- 第四步：pytest 锁住主流程与失败路径',
      '- 全部做到：它就是一个能交付的真项目',
      '这是整门课的终点：把你会的东西，拼成别人能用的东西。',
    ],
    terms: [
      { term: 'capstone', zh: '综合项目', note: '把多项技能合并到一个真实可运行的小项目里' },
      { term: 'layered app', zh: '分层结构', note: '把配置、检索、接口、模型分层放，方便替换和测试' },
      { term: 'dependency override', zh: '依赖覆盖', note: '测试时把真实依赖换成假对象，避开网络和密钥' },
      { term: 'graceful degradation', zh: '优雅降级', note: '依赖不可用时仍给出可理解的错误提示，而不是崩溃' },
    ],
    steps: [
      '建项目骨架：app/、tests/、data/、.env.example，先把目录定下来。',
      '单独写 retrieve.py，用 LlamaIndex 读 data 目录并建索引，让它在命令行里就能跑通。',
      '写 main.py：FastAPI 应用 + 一个返回 Pydantic 模型结果的 /ask 接口。',
      '把"加载配置""获取问答引擎"抽成依赖函数，用 Depends 注入进接口。',
      '补错误处理：资料为空、检索失败、超时分别返回不同提示。',
      '用 pytest 写三条测试：字段齐全、空问题被拒、依赖不可用时返回 503。',
    ],
    examples: [
      {
        title: '可测试的接口骨架',
        code: `# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

class AskBody(BaseModel):
    question: str

class AskResult(BaseModel):
    answer: str
    sources: list[str]

def get_engine():
    """真实项目里在这里加载索引；测试时会被替换掉。"""
    raise RuntimeError("尚未配置检索引擎")

app = FastAPI()

@app.post("/ask", response_model=AskResult)
def ask(body: AskBody, engine=Depends(get_engine)):
    question = body.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="question 不能为空")
    try:
        response = engine.query(question)
    except Exception:
        raise HTTPException(status_code=503, detail="检索服务暂不可用")
    return AskResult(answer=str(response), sources=["data/"])`,
        output: '预期说明：服务启动后，POST /ask 传 {"question": "..."} 会返回含 answer 和 sources 的 JSON；question 为空返回 400。需安装 fastapi uvicorn 并在本机运行。',
        note: '需安装 fastapi uvicorn 并在本机运行。response_model 让 FastAPI 按 AskResult 过滤和校验输出；把引擎做成依赖，测试时可以整体替换，不必联网。',
        verify: false,
      },
      {
        title: '用依赖覆盖写不联外网的测试',
        code: `# tests/test_ask.py
from fastapi.testclient import TestClient

from app.main import app, get_engine

class FakeEngine:
    def query(self, question):
        return f"针对「{question}」的回答"

def fake_engine():
    return FakeEngine()

app.dependency_overrides[get_engine] = fake_engine
client = TestClient(app)

def test_ask_ok():
    r = client.post("/ask", json={"question": "什么是变量"})
    assert r.status_code == 200
    assert "回答" in r.json()["answer"]

def test_ask_empty():
    r = client.post("/ask", json={"question": "  "})
    assert r.status_code == 400`,
        output: '预期说明：终端运行 pytest 显示两条用例通过，全程不联网、不需要密钥。需安装 fastapi、pytest 并在本机运行。',
        note: '需安装 fastapi、pytest 并在本机运行。dependency_overrides 是这套结构最大的好处：业务逻辑照常被测，耗时的真实检索被一个假对象顶替。',
        verify: false,
      },
    ],
    pitfalls: [
      {
        title: '把检索、接口、配置全写在一个文件里',
        bad: 'main.py 里既建索引、又写接口、还读环境变量',
        good: 'retrieve.py 管检索，main.py 管接口，配置由依赖提供',
        note: '混在一起时，改一行就可能同时影响三件事，测试也没法单独替换其中一块。',
      },
      {
        title: '测试时真的去调用模型',
        bad: '测试里直接用真实索引和真实 API Key 查询',
        good: '用 app.dependency_overrides 换成一个返回固定内容的假引擎',
        note: '真实调用慢、要花钱、还依赖网络，测试会变得又慢又随机。把外部依赖挡住，测试才可靠。',
      },
      {
        title: '异常全被吞掉，只回一个 200',
        bad: 'except Exception: return {"answer": ""}',
        good: 'except Exception: raise HTTPException(status_code=503, detail="检索服务暂不可用")',
        note: '把失败包装成成功，调用方无法区分"没检索到"和"服务挂了"，排查会变得非常困难。',
      },
    ],
    practice: [
      {
        prompt: '为 /ask 接口补一条测试：当引擎抛异常时，接口返回 503。',
        starter: `from fastapi.testclient import TestClient
from app.main import app, get_engine

class BrokenEngine:
    def query(self, question):
        raise RuntimeError("boom")

def broken_engine():
    return BrokenEngine()

# TODO: 用 dependency_overrides 替换引擎并断言 503
`,
        answer: `from fastapi.testclient import TestClient
from app.main import app, get_engine

class BrokenEngine:
    def query(self, question):
        raise RuntimeError("boom")

def broken_engine():
    return BrokenEngine()

app.dependency_overrides[get_engine] = broken_engine
client = TestClient(app)

def test_ask_unavailable():
    r = client.post("/ask", json={"question": "你好"})
    assert r.status_code == 503`,
        output: '预期说明：终端运行 pytest 时这条用例通过，接口返回 503。需安装 fastapi、pytest 并在本机运行。',
        hint: '先覆盖依赖，再建 TestClient，最后断言 status_code == 503。',
      },
    ],
    quiz: [
      {
        type: 'choice',
        question: '测试里用 app.dependency_overrides 的主要目的是？',
        options: ['让接口跑得更慢以便观察', '用假对象替换真实依赖，避开网络和密钥', '自动生成接口文档', '把测试结果写进数据库'],
        answer: 1,
        explain: '依赖覆盖让测试专注于自己的逻辑，不被外部服务影响，速度和稳定性都可控。',
      },
      {
        type: 'judge',
        question: '检索服务出错时，接口应当返回一个明确的状态码（如 503）并说明原因，而不是伪装成 200。',
        answer: true,
        explain: '调用方靠状态码区分成功和失败；伪装成功会让问题被掩盖到更难排查的地方。',
      },
      {
        type: 'code',
        question: '补全这行，让接口在 question 为空时返回 400：raise ________(status_code=400, detail="question 不能为空")',
        code: 'raise ________(status_code=400, detail="question 不能为空")',
        answer: 'HTTPException',
        accept: ['HTTPException', 'fastapi.HTTPException'],
        explain: 'FastAPI 里用 HTTPException 指定状态码和提示信息，框架会把它转成规范的错误响应。'
      },
    ],
  },
]
