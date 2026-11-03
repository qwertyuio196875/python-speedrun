# 知识点内容数据规范（src/data/phase1.js ~ phase10.js）

本项目是**面向零基础学习者**的 Python 教程。每个阶段文件默认导出一个数组，每个元素是一个"知识点"（lesson）。
渲染层（`src/views/LessonView.vue`）按统一结构渲染：

难度星级 -> 零基础提示 -> 它是什么 -> 打个比方 -> 术语卡 -> 跟着做（可选）-> 代码示例 -> 常见坑 -> 小练习 -> 自测 -> 掌握情况。

## 读者画像（写内容前先看这一段）

- 从未学过任何编程语言，看不懂"实例 / 返回值 / 可迭代"这类词，除非先解释。
- 不知道什么是终端 / 命令行 / PATH / 环境变量，第一次用 VS Code 或 IDLE。
- 会照着敲代码，但改一个空格就慌；报错信息看不懂就会放弃。
- 目标：能独立写出、运行、维护一个自己的小项目；学有余力再走进阶选修路线做 AI 应用。

## 写作铁律

1. **禁止出现任何其他编程语言**：正文、示例、题目、解析里不得出现 Java / Spring / Maven / JVM / Gradle / JavaScript / C++ 等对照或暗示。校验脚本会扫描所有文案字段，命中即报错。
2. **不假设任何前置知识**：第一次出现的术语必须写中文解释，并且收进该知识点的 `terms`。
3. **先跑起来，再讲原理**：能用例子说明的，不要用抽象定义开头。`what` 里必须包含"它能帮你做什么事"。
4. **短句**：一句话只说一件事，一段不超过 3 行。中文标点用全角，代码里的标识符用英文。
5. **不用行话缩写**：需要英文术语时写成"中文（English）"形式。
6. **够用即止**：一个知识点正文不超过一屏半，重点在类比、真实易错点和可动手的例子，不抄官方文档。
7. **只用 Python 3.10+ 的真实语法**，不编造 API、参数或库名。第三方库要写清安装方式。
8. **输出必须真实**：每个 `examples[].output` / `practice[].output` 必须是本机运行 Python 3.12 得到的原文，不加"输出："前缀。需要联网、装包、开浏览器才能跑的例子，标 `verify: false` 并在 `note` 里说明。

## 字段规范

```js
export default [
  {
    id: 'variables',                 // 必填，全局唯一，kebab-case（小写字母/数字/连字符）
    title: '变量与基本数据类型',      // 必填，导航与搜索展示名
    phase: 1,                        // 必填，阶段号 1~10
    order: 4,                        // 必填，阶段内从 1 连续递增
    minutes: 25,                     // 必填，预计"读 + 动手敲"分钟数（零基础请给足，宁多勿少）
    rating: { level: 1, must: 5 },   // 必填，1~5：level=对零基础的难度，must=重要度/常用度
    summary: '一句话说明这个知识点解决什么问题。',   // 必填，20~60 字
    keywords: ['变量', '类型', 'int', '赋值'],      // 必填，搜索别名 3~6 个，含中文
    tip: '零基础提示：……',            // 必填，1~2 句，写给第一次学编程的人
    what: '它是什么 + 用来做什么。2~5 句，可用 `code` 和 **加粗**。',  // 必填
    analogy: '打个比方：……',          // 必填，1~2 句生活化类比，不依赖编程知识
    terms: [                         // 必填，2~5 条：本知识点出现的新术语
      { term: 'variable', zh: '变量', note: '给数据起一个名字，之后可以用这个名字用它。' },
    ],
    steps: [                         // 可选，2~6 条：需要在自己电脑上动手跟着做的流程
      '打开终端，输入 python -V 并回车，看到 Python 3.12.x 说明装好了。',
    ],
    examples: [                      // 必填，1~3 个
      {
        title: '基本示例',
        code: 'name = "xiaoming"\nprint(name)',   // 多行用模板字符串
        output: 'xiaoming',                       // 真实运行结果
        note: 'print 会自动换行；多个参数用空格分隔。',
        verify: true,                             // 可选，默认 true；false = 本机不便自动复核
      },
    ],
    pitfalls: [                      // 必填，2~4 条真实易错点（零基础最常踩的）
      {
        title: '中文标点',
        bad: 'print（"nihao"）',
        good: 'print("nihao")',
        note: '括号、引号、冒号必须是英文半角，中文标点会报 SyntaxError。',
      },
    ],
    practice: [                      // 必填，1~2 个
      {
        prompt: '把名字和年龄打印成 name=xiaoming age=18。',
        starter: 'name = "xiaoming"\nage = 18\n# TODO: 用 f-string 打印\n',
        answer: 'print(f"name={name} age={age}")',
        output: 'name=xiaoming age=18',
        hint: '在引号前加 f，变量用花括号包起来。',
      },
    ],
    quiz: [                          // 必填，2~3 题，覆盖不同题型
      { type: 'choice', question: '...', options: ['A', 'B', 'C'], answer: 0, explain: '...' },
      { type: 'judge', question: '...', answer: true, explain: '...' },
      { type: 'code', question: '...', code: 'print(____)', answer: '...', accept: [], explain: '...' },
    ],
  },
]
```

## 硬性要求（`npm run validate` 会检查）

1. `id` 全局唯一，只允许小写字母、数字、连字符。
2. `rating.level` / `rating.must` 为 1~5 整数，且必须符合分派给你的数值表。
3. `order` 在阶段内从 1 连续递增；`phase` 必须是 1~10 中存在的阶段。
4. 必填字段不得缺省：`analogy`、`terms`、`tip`、`what`、`examples`、`pitfalls`、`practice`、`quiz`。
5. `terms[].term` 用小写英文术语（专有名词除外），`terms[].zh` 是中文名；一个知识点 2~5 条。
6. `quiz` 至少含两种题型；`choice.answer` 是选项下标（从 0 开始）；`judge.answer` 是布尔；
   `code.answer` 是字符串，`accept` 是其它等价答案数组。
7. 任何文案字段里不得出现其他编程语言的名称；`tip` 一律以"零基础提示："开头。
8. 代码字段（`code` / `starter` / `answer` / `bad` / `good` / `output`）用模板字符串或单引号字符串；
   说明性字段（`summary` / `tip` / `what` / `analogy` / `note` / `explain` / `question` / `prompt`）保持单行，不得包含反引号包裹的换行。
9. 示例里出现的中文人名/内容用字面中文即可（`print` 输出里允许中文），但标识符、文件名用英文。

## 速查表规范（src/data/cheatsheet.js）

速查表是 **Python 语法速查**（不是语言对照表）。条目按"我想做什么"来查，字段：

```js
{
  task: '去掉字符串两端空格',        // 必填，中文口语化描述，搜索主要靠它
  code: 's.strip()',                // 必填，写法本体
  note: '只去两端，中间空格不动。',    // 必填，一句话
  detail: '……',                     // 必填，2~4 句详细解释（点开才看）
  code2: 's.lstrip()',              // 可选，另一种常用写法
  example: { code: '…', output: '…' },  // 可选，可运行示例（output 必须真实）
}
```

分类要求：8~10 个分类，每类 4~8 条，总条目 45~60；条目 `id` 由 `curriculum.js` 统一生成，数据文件里不要写。
进阶选修相关内容（async / HTTP / FastAPI）单独成类，并在分类 `desc` 里注明"需要先学完主线"。

## 综合实战规范（src/data/practice.js）

两条实战线，都按 `steps` 数组组织：

- `steps`（主线实战，必修）：零基础能在**只用标准库**的前提下做出来的命令行小项目。
- `advanced`（进阶实战，选修）：需要装第三方包的 AI 接口项目，前置是主线全部完成。

```js
export default {
  id: 'practice',
  title: '…', subtitle: '…', goal: '…',
  stack: ['Python 标准库', '…'],   // 涉及的能力点
  minutes: 180,
  acceptance: ['…', '…'],          // 验收清单
  steps: [{ id: 'p1', step: 1, title, goal, minutes, tasks: ['…'], snippets: [{ title, code, output, note, lang }], check }],
  advanced: { /* 同上结构，step id 用 a1…，与 steps 合起来全局唯一 */ },
}
```

每个 Step 必须：`tasks` 至少 1 条、`snippets` 至少 1 个、有 `check`（做完能看到什么）。
`snippets[].lang` 默认 `python`，终端命令写 `bash`。