# 知识点内容数据规范（src/data/*.js）

所有阶段文件默认导出一个数组，每个元素是一个"知识点"（lesson）。渲染层（`src/views/LessonView.vue`）按统一结构渲染：

难度星级 → Java 开发者提示 → 它是什么 → Java 对比 → Python 写法 → 常见坑 → 小练习 → 自测 → 掌握情况。

## 字段规范

```js
export default [
  {
    id: 'variables',            // 必填，全局唯一，kebab-case
    title: '变量与数据类型',      // 必填，导航/搜索展示名
    phase: 1,                    // 必填，所属阶段号 1~8
    order: 1,                    // 必填，阶段内顺序，从 1 递增
    minutes: 10,                 // 必填，预计学习分钟数
    rating: { python: 1, java: 1, ai: 3 },  // 必填，1~5：Python 难度 / Java 开发者难度 / AI 开发重要度
    summary: '一句话说明这个知识点解决什么问题。',  // 必填，20~50 字
    keywords: ['variable', 'type', 'int'],       // 必填，搜索别名 3~6 个
    tip: 'Java 开发者提示：……',                   // 必填，1~2 句，写给 Java 开发者
    what: '它是什么。2~5 句，可用 `code` 和 **加粗**。',  // 必填
    javaCompare: [               // 可选（确实有帮助才写，0~3 组）
      {
        title: '声明字符串列表',
        java: 'List<String> names = new ArrayList<>();',
        python: 'names = []',
        diff: 'Python 不声明类型，容器字面量直接创建对象。'
      }
    ],
    examples: [                  // 必填，1~3 个，每个都要有可运行的输出
      {
        title: '基本示例',
        code: 'name = "张三"\nprint(name)',   // 多行用模板字符串
        output: '张三',
        note: 'print 默认换行，多个参数用空格分隔。'
      }
    ],
    pitfalls: [                  // 必填，2~4 条真实易错点
      {
        title: '可变默认参数',
        bad: 'def f(items=[]): ...',      // bad/good 可选
        good: 'def f(items=None): ...',
        note: '默认参数只在定义时求值一次，会跨调用共享同一个 list。'
      }
    ],
    practice: [                  // 必填，1~2 个
      {
        prompt: '把 Java 风格写法改成 Python 并打印名字。',
        starter: '# TODO: 在这里写代码\n',   // 练习起始代码（可运行）
        answer: 'print("张三")',              // 参考答案
        output: '张三',
        hint: 'Python 用 print 而不是 System.out.println。'
      }
    ],
    quiz: [                      // 必填，2~3 题
      { type: 'choice', question: '...', options: ['A', 'B', 'C', 'D'], answer: 0, explain: '...' },
      { type: 'judge', question: '...', answer: true, explain: '...' },
      { type: 'code', question: '...', code: 'print(____)', answer: '[n * 2 for n in nums]', accept: [], explain: '...' }
    ]
  }
]
```

## 硬性要求

1. `id` 全局唯一，只允许小写字母、数字、连字符。
2. `rating` 三个值均为 1~5 的整数，且必须符合分派给你的数值。
3. 每个 `examples[].output` 必须是真实运行 Python 会得到的输出（不要写"输出：xxx"之类的前缀）。
4. `quiz` 覆盖不同题型（choice / judge / code），`choice.answer` 是选项下标（从 0 开始），`judge.answer` 是布尔值，`code.answer` 是字符串（另有 `accept` 数组列出其它等价答案）。
5. 文案用简体中文；代码示例中的标识符/命名用英文；`print` 输出里可以出现中文。
6. 内容"够用即止"：一个知识点正文不要超过一屏半，重点是 Java 对比与易错点，不要抄文档。
7. 只使用 Python 3.10+ 的真实语法，不编造 API。
8. 代码字段（`code` / `starter` / `answer` / `bad` / `good` / `java` / `python` / `output`）用模板字符串或单引号字符串；说明性字段（`summary` / `tip` / `what` / `note` / `explain` / `question`）禁止出现反引号包裹的换行，保持单行。
