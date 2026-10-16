<template>
  <section class="quiz">
    <div class="section-head">
      <h3 class="h3"><span class="idx">{{ index }}</span> 自测</h3>
      <div class="head-right">
        <span class="badge" v-if="score">{{ score.correct }} / {{ score.total }} 正确</span>
        <span class="badge primary" v-else>{{ quiz.length }} 题</span>
      </div>
    </div>

    <div class="q-list">
      <div v-for="(q, qi) in quiz" :key="qi" class="q card" :class="{ done: isSubmitted(qi) }">
        <div class="q-head">
          <span class="q-type">{{ typeLabel(q.type) }}</span>
          <span class="q-title"><RichText :text="q.question" /></span>
          <span v-if="isSubmitted(qi)" class="q-mark" :class="isCorrect(qi) ? 'ok' : 'no'">
            {{ isCorrect(qi) ? '✓ 正确' : '✗ 错误' }}
          </span>
        </div>

        <!-- 选择题 -->
        <div v-if="q.type === 'choice'" class="options">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="option"
            :class="optionClass(qi, oi)"
            :disabled="isSubmitted(qi)"
            @click="select(qi, oi)"
          >
            <span class="bullet">{{ String.fromCharCode(65 + oi) }}</span>
            <span class="opt-text">{{ opt }}</span>
          </button>
        </div>

        <!-- 判断题 -->
        <div v-else-if="q.type === 'judge'" class="options inline">
          <button
            v-for="opt in judgeOptions"
            :key="String(opt.value)"
            class="option"
            :class="judgeClass(qi, opt.value)"
            :disabled="isSubmitted(qi)"
            @click="select(qi, opt.value)"
          >
            <span class="bullet">{{ opt.value ? 'Q' : 'N' }}</span>
            <span class="opt-text">{{ opt.label }}</span>
          </button>
        </div>

        <!-- 代码题 -->
        <div v-else class="code-q">
          <CodeBlock
            v-if="q.code"
            :code="q.code"
            lang="python"
            :editable="false"
            :runnable="false"
            title="补全下面的代码"
          />
          <textarea
            v-model="codeAnswers[qi]"
            class="answer-input"
            :disabled="isSubmitted(qi)"
            rows="2"
            spellcheck="false"
            placeholder="在这里写下你的答案，例如 [n * 2 for n in nums]"
          />
        </div>

        <div class="q-foot">
          <button v-if="!isSubmitted(qi)" class="btn sm primary" :disabled="!canSubmit(qi)" @click="submit(qi)">
            提交答案
          </button>
          <button v-else class="btn sm" @click="redo(qi)">再做一次</button>
          <span v-if="!isSubmitted(qi) && !canSubmit(qi)" class="hint muted">请先作答</span>
        </div>

        <div v-if="isSubmitted(qi)" class="explain" :class="{ ok: isCorrect(qi) }">
          <div class="explain-head">{{ isCorrect(qi) ? '✓ 回答正确' : '✗ 回答错误' }}</div>
          <div class="explain-body"><RichText :text="q.explain || ''" /></div>
          <div v-if="q.type === 'code'" class="explain-answer">
            参考答案：<code class="inline-code">{{ q.answer }}</code>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import CodeBlock from './CodeBlock.vue'
import RichText from './RichText.vue'
import { useProgressStore } from '../stores/progress.js'

const props = defineProps({
  lesson: { type: Object, required: true },
  /** 章节序号（由 LessonView 计算，保证与其它小节连续） */
  index: { type: Number, default: 6 },
})

const store = useProgressStore()
const quiz = computed(() => props.lesson.quiz || [])

const judgeOptions = [
  { label: '正确', value: true },
  { label: '错误', value: false },
]

const picked = reactive({}) // 选择/判断题的答案
const codeAnswers = reactive({}) // 代码题输入
const submitted = reactive({}) // { [qi]: true }

const score = computed(() => store.quizOf(props.lesson.id))

function typeLabel(type) {
  return type === 'choice' ? '选择题' : type === 'judge' ? '判断题' : '代码题'
}

function isSubmitted(qi) {
  return Boolean(submitted[qi])
}

function canSubmit(qi) {
  const q = quiz.value[qi]
  if (!q) return false
  if (q.type === 'code') return Boolean((codeAnswers[qi] || '').trim())
  return picked[qi] !== undefined
}

function isCorrect(qi) {
  const q = quiz.value[qi]
  if (!q) return false
  if (q.type === 'code') {
    const candidates = [q.answer, ...(q.accept || [])].map(normalize)
    return candidates.includes(normalize(codeAnswers[qi] || ''))
  }
  return picked[qi] === q.answer
}

function normalize(text) {
  return String(text ?? '')
    .replace(/\s+/g, '')
    .replace(/["'`]/g, '')
    .replace(/；/g, ';')
    .replace(/。$/, '')
    .trim()
}

function select(qi, value) {
  if (isSubmitted(qi)) return
  picked[qi] = value
}

function optionClass(qi, oi) {
  const q = quiz.value[qi]
  const classes = { picked: picked[qi] === oi }
  if (isSubmitted(qi)) {
    if (q.answer === oi) classes.correct = true
    else if (picked[qi] === oi) classes.wrong = true
  }
  return classes
}

function judgeClass(qi, value) {
  const q = quiz.value[qi]
  const classes = { picked: picked[qi] === value }
  if (isSubmitted(qi)) {
    if (q.answer === value) classes.correct = true
    else if (picked[qi] === value) classes.wrong = true
  }
  return classes
}

function submit(qi) {
  if (!canSubmit(qi)) return
  submitted[qi] = true
  persistScore()
}

function redo(qi) {
  delete submitted[qi]
  if (quiz.value[qi]?.type === 'code') delete codeAnswers[qi]
  else delete picked[qi]
  persistScore()
}

function persistScore() {
  const answered = quiz.value.map((_, i) => i).filter((i) => isSubmitted(i))
  if (!answered.length) return
  const correct = answered.filter((i) => isCorrect(i)).length
  store.recordQuiz(props.lesson.id, correct, answered.length)
}

// 切换知识点时清空作答状态
watch(
  () => props.lesson.id,
  () => {
    Object.keys(picked).forEach((k) => delete picked[k])
    Object.keys(codeAnswers).forEach((k) => delete codeAnswers[k])
    Object.keys(submitted).forEach((k) => delete submitted[k])
  },
)
</script>

<style scoped>
.quiz {
  margin-top: 30px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.h3 {
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.idx {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--primary-weak);
  color: var(--primary);
  font-size: 12px;
  font-family: var(--font-mono);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.q-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.q {
  padding: 14px;
}

.q.done {
  border-color: var(--border-strong);
}

.q-head {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
}

.q-type {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  background: var(--surface-2);
  flex-shrink: 0;
  margin-top: 2px;
}

.q-title {
  flex: 1;
  font-size: 14.5px;
  color: var(--text-strong);
  min-width: 200px;
}

.q-mark {
  font-size: 12.5px;
  font-weight: 600;
  flex-shrink: 0;
}

.q-mark.ok {
  color: var(--success);
}

.q-mark.no {
  color: var(--danger);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0 0;
}

.options.inline {
  flex-direction: row;
  flex-wrap: wrap;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-size: 13.5px;
  cursor: pointer;
  text-align: left;
  transition: all 0.12s ease;
}

.option:hover:not(:disabled) {
  border-color: var(--primary);
}

.option:disabled {
  cursor: default;
}

.option.picked {
  border-color: var(--primary);
  background: var(--primary-weak);
  color: var(--primary);
}

.option.correct {
  border-color: var(--success);
  background: var(--success-weak);
  color: var(--success);
}

.option.wrong {
  border-color: var(--danger);
  background: transparent;
  color: var(--danger);
}

.bullet {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid currentColor;
  font-size: 11px;
  font-family: var(--font-mono);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.85;
}

.code-q {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.answer-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--border-strong);
  background: var(--surface-2);
  color: var(--text-strong);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  outline: none;
  resize: vertical;
}

.answer-input:focus {
  border-style: solid;
  border-color: var(--primary);
}

.q-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.hint {
  font-size: 12px;
}

.explain {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--warning-weak);
  border-left: 3px solid var(--warning);
  font-size: 13.5px;
}

.explain.ok {
  background: var(--success-weak);
  border-left-color: var(--success);
}

.explain-head {
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 4px;
  font-size: 13px;
}

.explain-body {
  color: var(--text);
}

.explain-answer {
  margin-top: 6px;
  color: var(--muted);
  font-size: 12.5px;
}
</style>
