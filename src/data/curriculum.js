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
import practice from './practice.js'
import cheatsheet from './cheatsheet.js'

export const PHASES = [
  { id: 1, name: '快速基础', short: '基础', minutes: 60, desc: '变量、条件、循环、函数、三大容器：和 Java 最像的一部分，快速对齐。' },
  { id: 2, name: 'Python 核心', short: '核心', minutes: 70, desc: '推导式、字典、f-string、解包、lambda、异常：写 Pythonic 代码的关键。' },
  { id: 3, name: '工程基础', short: '工程', minutes: 54, desc: 'import、pip、venv、requirements、类型注解、环境变量：能独立跑起一个项目。' },
  { id: 4, name: 'Python OOP', short: 'OOP', minutes: 38, desc: 'class、self / __init__、继承：读懂框架源码的最小 OOP 知识。' },
  { id: 5, name: 'Python 高级特性', short: '高级', minutes: 50, desc: '装饰器、生成器、with、迭代器：AI 项目里最常见的四个语法特性。' },
  { id: 6, name: '异步编程', short: '异步', minutes: 62, desc: 'async / await / 事件循环 / gather：并发调用模型与工具的基础。' },
  { id: 7, name: '数据与 API', short: 'API', minutes: 56, desc: 'JSON、文件、HTTP、requests、httpx：调用 LLM 接口前必须掌握的一层。' },
  { id: 8, name: 'FastAPI', short: 'FastAPI', minutes: 72, desc: '路由、POST、Pydantic、async API、依赖注入：把 AI 能力包成 HTTP 服务。' },
]

const RAW = { 1: phase1, 2: phase2, 3: phase3, 4: phase4, 5: phase5, 6: phase6, 7: phase7, 8: phase8 }

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
 * Java → Python 速查表（给每个条目补上稳定 id）。
 * 视图依赖 id 做「展开某一条」和 `?item=` 深链跳转，因此这里统一生成，避免与搜索索引不一致。
 */
export const CHEATSHEET = {
  ...cheatsheet,
  categories: cheatsheet.categories.map((cat, catIndex) => ({
    ...cat,
    items: cat.items.map((item, itemIndex) => ({ ...item, id: `cs-${catIndex}-${itemIndex}` })),
  })),
}

/** Java → Python 速查表的扁平条目（带 id，供搜索跳转） */
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
  stars: lesson.rating?.ai || 1,
}))

const cheatIndex = cheatItems.map((item) => ({
  type: 'cheatsheet',
  id: item.id,
  title: `${item.java} ⇄ ${item.python}`,
  path: `/cheatsheet?item=${item.id}`,
  breadcrumb: `Java → Python 速查表 / ${item.category}`,
  haystack: [item.java, item.python, item.note, item.detail, item.category].join(' ').toLowerCase(),
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
