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
  { id: 1, name: '认识 Python', short: '入门', minutes: 165, desc: '安装运行环境、第一个程序、变量、条件、循环、函数：让程序第一次在你电脑上跑起来。' },
  { id: 2, name: '常用的数据', short: '数据', minutes: 190, desc: '字符串处理、列表、字典、元组、解包、推导式、小练习：能处理和展示数据。' },
  { id: 3, name: '组织代码', short: '组织', minutes: 150, desc: '函数进阶、模块与 import、写自己的工具函数：把一段段代码整理成能复用的模块。' },
  { id: 4, name: '认识"对象"', short: '对象', minutes: 130, desc: 'class、self、继承：理解什么是对象，给数据和行为打包。' },
  { id: 5, name: '读文件与异常', short: '异常', minutes: 160, desc: '文件读写、异常处理、with 语句、日志：让程序更健壮、遇错不崩。' },
  { id: 6, name: '常用模块', short: '模块', minutes: 150, desc: '标准库常用模块：json、datetime、random、os、命令行参数：直接解决日常小需求。' },
  { id: 7, name: '进阶选修', short: '选修', minutes: 120, desc: '装饰器、生成器、多进程与性能：主线之外，按需选学的高阶特性。' },
  { id: 8, name: 'AI 应用入门', short: 'AI', minutes: 130, desc: '选修主线：用 FastAPI + Pydantic 把能力包成 HTTP 服务，为调用 LLM 打基础。' },
  { id: 9, name: '常用框架与工具', short: '框架', minutes: 184, desc: '选修：Flask 与 Django 写网页、httpx 并发请求、pandas 处理表格、pytest 自动测试：把现成框架用起来。' },
  { id: 10, name: 'AI 应用框架', short: 'AI 框架', minutes: 278, desc: '选修：FastAPI 与 Flask/Django 进阶、LangChain 串起模型调用与工具、LlamaIndex 用你的资料作答：进阶到真实 AI 应用。' },
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