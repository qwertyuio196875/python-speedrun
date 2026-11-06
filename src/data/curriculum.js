/**
 * 课程目录聚合层：把各阶段知识点组装成导航、进度、搜索所需的结构。
 * 新增知识点只需要改对应 phase 文件，这里会自动生效。
 */
import phase1 from './phase1.js'
import phase2 from './phase2.js'
import phase3 from './phase3.js'
import phase4 from './phase4.js'
import phase5 from './phase5.js'
import phase6 from './phase6.js'
import phase7 from './phase7.js'
import phase8 from './phase8.js'
import phase9 from './phase9.js'
import phase10 from './phase10.js'
import practice from './practice.js'
import cheatsheet from './cheatsheet.js'

export const PHASES = [
  { id: 1, name: '认识 Python', short: '入门', minutes: 255, desc: '安装运行、变量、类型、运算符、列表、判断、循环、分支循环实战与调试入门：让程序第一次在你电脑上跑起来。' },
  { id: 2, name: '常用的数据', short: '数据', minutes: 245, desc: '字符串与格式化编码、元组、列表深化（切片/排序/拷贝）、字典与遍历嵌套、解包、推导式、集合。' },
  { id: 3, name: '组织代码', short: '组织', minutes: 241, desc: '函数基础与进阶、闭包与高阶函数、递归、异常处理、模块与 import、作用域、Git 存档：把代码整理成能复用的模块。' },
  { id: 4, name: '认识"对象"', short: '对象', minutes: 236, desc: 'class、self、方法、@property 与类方法/静态方法、继承、多态与鸭子类型、魔法方法、类设计实战。' },
  { id: 5, name: '读文件与异常', short: '异常', minutes: 176, desc: '文件读写、CSV 与 pickle、with 语句、异常处理、日志、sqlite3 数据库：让数据落得下来、程序更健壮。' },
  { id: 6, name: '常用模块', short: '模块', minutes: 209, desc: '标准库常用模块：json、datetime、random、os/pathlib、input/sys.argv、argparse、pip 与虚拟环境、collections。' },
  { id: 7, name: '进阶特性', short: '进阶', minutes: 312, desc: 'lambda 排序、生成器、装饰器、itertools、正则、类型注解、多线程、多进程、asyncio、socket：进阶 Python 的全部钥匙。' },
  { id: 8, name: '网络与 AI 应用入门', short: 'AI', minutes: 189, desc: 'HTTP 协议、requests、前端三件套速成、FastAPI 与 Pydantic、POST、调用大模型接口：后端与 AI 的第一课。' },
  { id: 9, name: '常用框架与工程', short: '框架', minutes: 244, desc: 'Flask 与 Django、httpx 并发、pytest 自动测试、MySQL 与 SQL、调试方法论、Flask JSON 接口。' },
  { id: 10, name: 'AI 应用框架', short: 'AI 框架', minutes: 320, desc: 'LangChain 工具与结构化输出、LlamaIndex RAG、三大框架进阶、pytest 进阶、Docker 与部署上线，收口于可测试的问答接口。' },
]

const RAW = { 1: phase1, 2: phase2, 3: phase3, 4: phase4, 5: phase5, 6: phase6, 7: phase7, 8: phase8, 9: phase9, 10: phase10 }

/** 扁平化后的全部知识点（按阶段、阶段内顺序排序） */
export const lessons = PHASES.flatMap((phase) => {
  const list = [...(RAW[phase.id] || [])].sort((a, b) => a.order - b.order)
  return list.map((lesson, i) => ({
    ...lesson,
    phaseId: phase.id,
    phaseName: phase.name,
    phaseOrder: i + 1,
  }))
}).map((lesson, index) => ({ ...lesson, index }))

export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]))
export const totalLessons = lessons.length
export const totalMinutes = lessons.reduce((sum, l) => sum + l.minutes, 0)

/** 每个阶段的起止下标，供导航与进度使用 */
export const phaseStats = PHASES.map((phase) => {
  const items = lessons.filter((l) => l.phaseId === phase.id)
  const start = items.length ? items[0].index : -1
  return { ...phase, lessons: items, count: items.length, start }
})

/** 上一节 / 下一节 */
export function neighbors(lessonId) {
  const lesson = lessonById[lessonId]
  if (!lesson) return { prev: null, next: null }
  return {
    prev: lessons[lesson.index - 1] || null,
    next: lessons[lesson.index + 1] || null,
  }
}

/**
 * Python 语法速查表（给每个条目补上稳定 id）。
 * 视图依赖 id 做「展开某一条」和 `?item=` 深链跳转，因此这里统一生成，避免与搜索索引不一致。
 */
export const CHEATSHEET = {
  ...cheatsheet,
  categories: cheatsheet.categories.map((cat, catIndex) => ({
    ...cat,
    items: cat.items.map((item, itemIndex) => ({ ...item, id: `cs-${catIndex}-${itemIndex}` })),
  })),
}

/** 速查表的扁平条目（带 id，供搜索跳转） */
export const cheatItems = CHEATSHEET.categories.flatMap((cat, catIndex) =>
  cat.items.map((item) => ({
    ...item,
    category: cat.name,
    categoryIndex: catIndex,
  }))
)

/** 搜索索引：知识点 + 速查表条目 */
const lessonIndex = lessons.map((lesson) => ({
  type: 'lesson',
  id: lesson.id,
  title: lesson.title,
  path: `/lesson/${lesson.id}`,
  breadcrumb: `${lesson.phaseName} / 第 ${lesson.phaseOrder} 节`,
  haystack: [
    lesson.title,
    lesson.summary,
    lesson.tip,
    ...(lesson.keywords || []),
    ...(lesson.examples || []).map((e) => e.code),
  ]
    .join(' ')
    .toLowerCase(),
  stars: lesson.rating?.must || 1,
}))

const cheatIndex = cheatItems.map((item) => ({
  type: 'cheatsheet',
  id: item.id,
  title: `${item.task} ⇄ ${item.code}`,
  path: `/cheatsheet?item=${item.id}`,
  breadcrumb: `Python 速查表 / ${item.category}`,
  haystack: [item.task, item.code, item.note, item.detail, item.category].join(' ').toLowerCase(),
  stars: 1,
}))

export const searchIndex = [...lessonIndex, ...cheatIndex]

/** 简易搜索：标题/关键词优先，再匹配内容 */
export function search(rawQuery, limit = 12) {
  const q = (rawQuery || '').trim().toLowerCase()
  if (!q) return []
  const scored = []
  for (const entry of searchIndex) {
    const title = entry.title.toLowerCase()
    let score = 0
    if (title === q) score += 100
    if (title.includes(q)) score += 40
    if (entry.haystack.includes(q)) score += 10
    if (score > 0) scored.push({ entry, score })
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry)
}

export { practice, cheatsheet }
export const PRACTICE = practice