/**
 * 内容自检：校验所有知识点、速查表条目与两条实战线的结构与题型是否合法。
 * 会额外扫描所有文案字段，确保没有出现其它编程语言。
 * 运行：npm run validate
 */
import { lessons, PHASES, CHEATSHEET, practice, totalLessons } from '../src/data/curriculum.js'

const errors = []
const warnings = []

const REQUIRED = [
  'id', 'title', 'phase', 'order', 'minutes', 'rating', 'summary', 'keywords', 'tip', 'what',
  'analogy', 'terms', 'examples', 'pitfalls', 'practice', 'quiz',
]

/** 文案字段：禁止出现其它编程语言名称 */
const TEXT_FIELDS = ['summary', 'tip', 'what', 'analogy', 'note', 'explain', 'question', 'prompt', 'detail', 'hint']
const BANNED = /\b(Java|Spring|Maven|Gradle|JVM|Servlet|JUnit|JavaScript|TypeScript|C\+\+|C#|Rust|Go|Kotlin|Swift|PHP|Ruby)\b/
const bannedWord = /(Java|Maven|JVM|Spring Boot|JUnit)/

const seenIds = new Set()
let bannedCount = 0

for (const lesson of lessons) {
  const where = `${lesson.phase}·${lesson.order} ${lesson.title}`
  for (const field of REQUIRED) {
    if (lesson[field] === undefined || lesson[field] === null) {
      errors.push(`${where}: 缺少字段 ${field}`)
    }
  }

  if (!/^[a-z0-9-]+$/.test(lesson.id)) errors.push(`${where}: id 命名不合法（只允许小写字母/数字/连字符）`)
  if (seenIds.has(lesson.id)) errors.push(`${where}: id 重复 ${lesson.id}`)
  seenIds.add(lesson.id)

  if (!PHASES.some((p) => p.id === lesson.phase)) errors.push(`${where}: phase ${lesson.phase} 不存在`)

  for (const key of ['level', 'must']) {
    const value = lesson.rating?.[key]
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      errors.push(`${where}: rating.${key} 必须是 1~5 的整数，当前为 ${value}`)
    }
  }

  // 零基础专属字段
  if (!lesson.tip?.includes('零基础提示')) errors.push(`${where}: tip 必须以「零基础提示：」开头`)
  if (!lesson.analogy) errors.push(`${where}: 缺少类比 analogy`)
  if (!Array.isArray(lesson.terms) || lesson.terms.length < 2 || lesson.terms.length > 5) {
    errors.push(`${where}: terms 必须是 2~5 条`)
  } else {
    lesson.terms.forEach((t, i) => {
      if (!t.term || !t.zh || !t.note) errors.push(`${where}: terms[${i}] 需要 term/zh/note`)
    })
  }
  if (lesson.steps !== undefined && (!Array.isArray(lesson.steps) || lesson.steps.length < 2)) {
    errors.push(`${where}: steps（可选）必须是至少 2 条的数组`)
  }

  if (!Array.isArray(lesson.examples) || lesson.examples.length === 0) {
    errors.push(`${where}: examples 至少 1 个`)
  } else {
    lesson.examples.forEach((ex, i) => {
      if (!ex.code) errors.push(`${where}: examples[${i}] 缺少 code`)
      if (ex.output === undefined) warnings.push(`${where}: examples[${i}] 没有 output，运行按钮将没有输出`)
      if (!ex.title) warnings.push(`${where}: examples[${i}] 缺少 title`)
      if (!ex.note) warnings.push(`${where}: examples[${i}] 缺少 note`)
    })
  }

  if (!Array.isArray(lesson.pitfalls) || lesson.pitfalls.length < 1) {
    errors.push(`${where}: pitfalls 至少 1 条`)
  } else {
    lesson.pitfalls.forEach((p, i) => {
      if (!p.title) errors.push(`${where}: pitfalls[${i}] 缺少 title`)
      if (!p.note) errors.push(`${where}: pitfalls[${i}] 缺少 note`)
    })
  }

  if (!Array.isArray(lesson.practice) || lesson.practice.length < 1) {
    errors.push(`${where}: practice 至少 1 个`)
  } else {
    lesson.practice.forEach((p, i) => {
      if (!p.prompt) errors.push(`${where}: practice[${i}] 缺少 prompt`)
      if (!p.starter) errors.push(`${where}: practice[${i}] 缺少 starter`)
      if (!p.answer) errors.push(`${where}: practice[${i}] 缺少 answer`)
      if (p.output === undefined) warnings.push(`${where}: practice[${i}] 没有 output`)
    })
  }

  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 2) {
    errors.push(`${where}: quiz 至少 2 题`)
  } else {
    lesson.quiz.forEach((q, i) => {
      const tag = `${where}: quiz[${i}]`
      if (!q.question) errors.push(`${tag} 缺少 question`)
      if (!q.explain) warnings.push(`${tag} 缺少 explain（解析）`)
      if (q.type === 'choice') {
        if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${tag} options 至少 2 个`)
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length || 0)) {
          errors.push(`${tag} answer 必须是合法选项下标`)
        }
      } else if (q.type === 'judge') {
        if (typeof q.answer !== 'boolean') errors.push(`${tag} judge 题 answer 必须是布尔值`)
      } else if (q.type === 'code') {
        if (!q.answer) errors.push(`${tag} code 题缺少 answer`)
        if (q.accept && !Array.isArray(q.accept)) errors.push(`${tag} accept 必须是数组`)
        if (!q.code) warnings.push(`${tag} code 题没有 code 片段`)
      } else {
        errors.push(`${tag} 未知题型 ${q.type}`)
      }
    })
  }
}

// 禁用其它编程语言扫描（只扫文案字段）
function isText(field) {
  return TEXT_FIELDS.includes(field)
}
function walkText(obj, where) {
  if (!obj || typeof obj !== 'object') {
    if (typeof obj === 'string' && isText(where) && bannedWord.test(obj)) {
      errors.push(`${where}: 文案中出现其它语言关键词「${obj.match(bannedWord)?.[0]}」`)
      bannedCount++
    }
    return
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkText(v, `${where}`))
    return
  }
  for (const [k, v] of Object.entries(obj)) walkText(v, isText(k) ? k : '')
}
lessons.forEach((l) => walkText(l, l.title))
practice && walkText(practice, 'practice')
CHEATSHEET.categories.forEach((cat) => walkText(cat, cat.name))

// 阶段内 order 必须从 1 连续递增
for (const phase of PHASES) {
  const items = lessons.filter((l) => l.phaseId === phase.id)
  if (items.length === 0) {
    errors.push(`阶段 ${phase.id} ${phase.name} 没有知识点`)
    continue
  }
  const orders = items.map((l) => l.order)
  const expected = Array.from({ length: items.length }, (_, i) => i + 1)
  if (orders.join(',') !== expected.join(',')) {
    errors.push(`阶段 ${phase.id} ${phase.name} 的 order 不是从 1 连续递增：${orders.join(',')}`)
  }
}

// 实战步骤（主线 + 进阶）
function validateSteps(steps, label) {
  const stepIds = new Set()
  steps.forEach((step, i) => {
    if (stepIds.has(step.id)) errors.push(`实战 Step id 重复：${step.id}（${label}）`)
    stepIds.add(step.id)
    if (!step.title || !step.goal) errors.push(`实战 Step ${i + 1}（${label}）缺少 title/goal`)
    if (!Array.isArray(step.tasks) || !step.tasks.length) errors.push(`实战 Step ${step.id} 缺少 tasks`)
    if (!Array.isArray(step.snippets) || !step.snippets.length) errors.push(`实战 Step ${step.id} 缺少 snippets`)
    else
      step.snippets.forEach((s, si) => {
        if (!s.code) errors.push(`实战 Step ${step.id} snippets[${si}] 缺少 code`)
        if (!s.title) warnings.push(`实战 Step ${step.id} snippets[${si}] 缺少 title`)
      })
    if (!step.check) warnings.push(`实战 Step ${step.id} 缺少 check`)
  })
}
if (practice?.steps) validateSteps(practice.steps, '主线')
if (practice?.advanced?.steps) validateSteps(practice.advanced.steps, '进阶')
if (practice) {
  if (!practice.advanced) warnings.push('没有进阶实战 advanced，选修线缺失')
  if (!Array.isArray(practice.acceptance) || !practice.acceptance.length) {
    warnings.push('缺少实践验收清单 acceptance')
  }
}

// 速查表
if (!CHEATSHEET.categories?.length) errors.push('速查表没有分类')
CHEATSHEET.categories.forEach((cat, ci) => {
  if (!cat.name) errors.push(`速查表第 ${ci + 1} 个分类缺少 name`)
  if (!cat.items?.length) errors.push(`速查表分类 ${cat.name} 没有条目`)
  cat.items.forEach((item, ii) => {
    if (!item.task || !item.code) errors.push(`速查表 ${cat.name}[${ii}] 缺少 task/code`)
    if (!item.note) warnings.push(`速查表 ${cat.name}[${ii}] 缺少 note`)
    if (!item.detail) warnings.push(`速查表 ${cat.name}[${ii}] 缺少 detail 详细解释`)
  })
})

console.log('===== 内容自检结果 =====')
console.log(`知识点总数：${totalLessons}`)
PHASES.forEach((p) => {
  const count = lessons.filter((l) => l.phaseId === p.id).length
  console.log(`  阶段 ${p.id} ${p.name}：${count} 个`)
})
console.log(`综合实战主线 Step：${practice?.steps?.length || 0} 个`)
console.log(`综合实战进阶 Step：${practice?.advanced?.steps?.length || 0} 个`)
console.log(`速查表：${CHEATSHEET.categories.length} 个分类 / ${CHEATSHEET.categories.reduce((s, c) => s + c.items.length, 0)} 条`)
console.log(`警告：${warnings.length} 条，错误：${errors.length} 条${bannedCount ? `（其中禁用语命中 ${bannedCount} 条）` : ''}`)

if (warnings.length) {
  console.log('\n--- 警告 ---')
  warnings.forEach((w) => console.log(`  · ${w}`))
}

if (errors.length) {
  console.log('\n--- 错误 ---')
  errors.forEach((e) => console.log(`  ✗ ${e}`))
  process.exit(1)
}

console.log('\n✓ 内容结构校验通过')