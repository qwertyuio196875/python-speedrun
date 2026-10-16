<template>
  <article v-if="lesson" class="lesson">
    <!-- 标题与元信息 -->
    <header class="head">
      <div class="crumbs">
        <RouterLink to="/">学习总览</RouterLink>
        <span class="sep">/</span>
        <span>{{ lesson.phaseName }}</span>
        <span class="sep">/</span>
        <span>第 {{ lesson.phaseOrder }} 节</span>
        <span class="badge primary" style="margin-left: 8px">全站第 {{ lesson.index + 1 }} / {{ total }}</span>
      </div>

      <h1 class="title">
        {{ lesson.title }}
        <span v-if="store.isDone(lesson.id)" class="done-tag">✓ 已掌握</span>
      </h1>

      <div class="meta">
        <span class="meta-item"><StarRating label="Python 难度" :value="lesson.rating.python" /></span>
        <span class="meta-item"><StarRating label="Java 开发者难度" :value="lesson.rating.java" /></span>
        <span class="meta-item"><StarRating label="AI 开发重要度" :value="lesson.rating.ai" /></span>
        <span class="meta-item badge">⏱ 预计 {{ lesson.minutes }} 分钟</span>
        <span class="meta-item badge">🏷 {{ lesson.keywords.slice(0, 3).join(' · ') }}</span>
      </div>

      <div class="summary"><RichText :text="lesson.summary" /></div>

      <div class="tip">
        <span class="tip-label">Java 开发者提示</span>
        <span class="tip-body"><RichText :text="lesson.tip" /></span>
      </div>
    </header>

    <!-- 1. 它是什么 -->
    <section class="section">
      <h2 class="h2"><span class="idx">{{ sec.what }}</span> 它是什么</h2>
      <p class="p"><RichText :text="lesson.what" /></p>
    </section>

    <!-- 2. Java 对比 -->
    <section v-if="sec.java" class="section">
      <h2 class="h2"><span class="idx">{{ sec.java }}</span> Java 对比</h2>
      <div v-for="(cmp, i) in lesson.javaCompare" :key="i" class="compare">
        <div class="compare-title">{{ cmp.title }}</div>
        <div class="compare-grid">
          <CodeBlock :code="cmp.java" lang="java" title="Java" :editable="false" :runnable="false" />
          <CodeBlock :code="cmp.python" lang="python" title="Python" :editable="false" :runnable="false" />
        </div>
        <div class="compare-diff">
          <span class="diff-label">核心区别</span>
          <RichText :text="cmp.diff" />
        </div>
      </div>
    </section>

    <!-- 3. Python 写法 -->
    <section class="section">
      <h2 class="h2"><span class="idx">{{ sec.python }}</span> Python 写法</h2>
      <div class="examples">
        <div v-for="(ex, i) in lesson.examples" :key="`${lesson.id}-ex-${i}`" class="example">
          <div class="ex-title">{{ ex.title }}</div>
          <CodeBlock
            :code="ex.code"
            lang="python"
            :output="ex.output"
            :note="ex.note"
            :title="`示例 ${i + 1}`"
            :storage-key="`${lesson.id}-ex-${i}`"
          />
        </div>
      </div>
    </section>

    <!-- 4. 常见坑 -->
    <section class="section">
      <h2 class="h2"><span class="idx">{{ sec.pitfalls }}</span> 常见坑</h2>
      <div class="pitfalls">
        <div v-for="(p, i) in lesson.pitfalls" :key="i" class="pitfall card">
          <div class="pf-title"><span class="pf-no">{{ i + 1 }}</span>{{ p.title }}</div>
          <div v-if="p.bad || p.good" class="pf-grid">
            <div v-if="p.bad" class="pf-col bad">
              <div class="pf-label">✗ 容易写成</div>
              <pre class="pf-code" v-html="hl(p.bad)" />
            </div>
            <div v-if="p.good" class="pf-col good">
              <div class="pf-label">✓ 推荐写法</div>
              <pre class="pf-code" v-html="hl(p.good)" />
            </div>
          </div>
          <div class="pf-note"><RichText :text="p.note" /></div>
        </div>
      </div>
    </section>

    <!-- 5. 小练习 -->
    <section class="section">
      <h2 class="h2"><span class="idx">{{ sec.practice }}</span> 小练习</h2>
      <div class="practices">
        <div v-for="(ex, i) in lesson.practice" :key="`${lesson.id}-pr-${i}`" class="practice card">
          <div class="pr-prompt"><span class="pr-label">题目</span><RichText :text="ex.prompt" /></div>
          <CodeBlock
            :code="ex.starter"
            lang="python"
            :output="ex.output"
            :title="`练习代码（可编辑）`"
            :note="ex.hint ? `提示：${ex.hint}` : ''"
            :storage-key="`${lesson.id}-pr-${i}`"
          />
          <div class="pr-answer">
            <button class="btn sm" @click="toggleAnswer(i)">
              {{ revealed[i] ? '收起参考答案' : '查看参考答案' }}
            </button>
            <CodeBlock
              v-if="revealed[i]"
              :code="ex.answer"
              lang="python"
              :output="ex.output"
              title="参考答案"
              :editable="false"
              :runnable="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 6. 自测 -->
    <QuizSection :lesson="lesson" :index="sec.quiz" />

    <!-- 7. 掌握情况 -->
    <section class="section">
      <h2 class="h2"><span class="idx">{{ sec.mastery }}</span> 掌握情况</h2>
      <div class="mastery card">
        <div class="mastery-left">
          <div class="ms-title">
            {{ store.isDone(lesson.id) ? '你已标记该知识点为已掌握' : '学会了就把这一节标记为已掌握' }}
          </div>
          <div class="ms-sub muted">
            <template v-if="quiz">
              自测成绩：{{ quiz.correct }} / {{ quiz.total }}（{{ new Date(quiz.at).toLocaleString('zh-CN') }}）
            </template>
            <template v-else>还没有自测记录，建议先做一遍上面的自测。</template>
          </div>
        </div>
        <div class="mastery-actions">
          <button class="btn" :class="{ success: store.isDone(lesson.id) }" @click="store.toggleDone(lesson.id)">
            {{ store.isDone(lesson.id) ? '✓ 已掌握（点击取消）' : '✓ 标记为已掌握' }}
          </button>
          <button class="btn ghost" @click="relearn">重新学习</button>
        </div>
      </div>
    </section>

    <LessonFooterNav :lesson="lesson" />
  </article>

  <div v-else class="not-found card">
    <h2 class="h2">没有找到这个知识点</h2>
    <p class="p muted">链接可能已失效。</p>
    <RouterLink class="btn" to="/">回到学习总览</RouterLink>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { lessonById, totalLessons } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import CodeBlock from '../components/CodeBlock.vue'
import QuizSection from '../components/QuizSection.vue'
import LessonFooterNav from '../components/LessonFooterNav.vue'
import StarRating from '../components/StarRating.vue'
import RichText from '../components/RichText.vue'
import { highlight } from '../utils/highlight.js'

const route = useRoute()
const store = useProgressStore()
const total = totalLessons

const lesson = computed(() => lessonById[route.params.id])
const quiz = computed(() => store.quizOf(route.params.id))

const revealed = reactive({})
const hl = (code) => highlight(code, 'python')

const sec = computed(() => {
  const item = lesson.value
  if (!item) return {}
  let i = 0
  const what = ++i
  const java = (item.javaCompare || []).length ? ++i : null
  const python = ++i
  const pitfalls = ++i
  const practice = ++i
  const quizNo = ++i
  const mastery = ++i
  return { what, java, python, pitfalls, practice, quiz: quizNo, mastery }
})

function toggleAnswer(i) {
  revealed[i] = !revealed[i]
}

function relearn() {
  store.unmarkDone(route.params.id)
  ElMessage({ message: '已重置本节掌握状态，可以重新学一遍', type: 'info' })
}

watch(
  () => route.params.id,
  (id) => {
    if (!id) return
    Object.keys(revealed).forEach((k) => delete revealed[k])
    store.setCurrent(id)
    store.visit(id)
  },
  { immediate: true },
)
</script>

<style scoped>
.lesson {
  max-width: 860px;
}

.head {
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  flex-wrap: wrap;
}

.crumbs .sep {
  opacity: 0.5;
}

.title {
  font-size: 27px;
  margin: 10px 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.done-tag {
  font-size: 12px;
  font-weight: 500;
  color: var(--success);
  background: var(--success-weak);
  border-radius: 999px;
  padding: 2px 10px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
}

.summary {
  font-size: 14.5px;
  color: var(--text);
}

.tip {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--primary-weak);
  border-left: 3px solid var(--primary);
  font-size: 13.5px;
}

.tip-label {
  color: var(--primary);
  font-weight: 600;
  flex-shrink: 0;
}

.tip-body {
  color: var(--text);
}

.section {
  margin-top: 30px;
}

.h2 {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 17.5px;
  margin-bottom: 12px;
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
  flex-shrink: 0;
}

.p {
  color: var(--text);
  font-size: 14.5px;
}

.compare + .compare {
  margin-top: 18px;
}

.compare-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.compare-diff {
  margin-top: 10px;
  font-size: 13.5px;
  color: var(--text);
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px dashed var(--border-strong);
}

.diff-label {
  color: var(--warning);
  font-weight: 600;
  margin-right: 6px;
}

.examples,
.practices {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ex-title,
.example-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 7px;
}

.pitfalls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pitfall {
  padding: 13px 14px;
}

.pf-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-strong);
}

.pf-no {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--warning-weak);
  color: var(--warning);
  font-size: 11.5px;
  font-family: var(--font-mono);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 0;
}

.pf-label {
  font-size: 11.5px;
  margin-bottom: 5px;
}

.pf-col.bad .pf-label {
  color: var(--danger);
}

.pf-col.good .pf-label {
  color: var(--success);
}

.pf-code {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--code-bg);
  color: var(--code-fg);
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  border: 1px solid var(--code-border);
}

.pf-note {
  font-size: 13px;
  color: var(--text);
}

.practice {
  padding: 14px;
}

.pr-prompt {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: var(--text-strong);
  margin-bottom: 10px;
}

.pr-label {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--primary);
  background: var(--primary-weak);
  border-radius: 999px;
  padding: 1px 8px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  margin-top: 2px;
}

.pr-answer {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.mastery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  flex-wrap: wrap;
}

.ms-title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-strong);
}

.ms-sub {
  font-size: 12.5px;
  margin-top: 3px;
}

.mastery-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.not-found {
  padding: 28px;
  max-width: 520px;
}

@media (max-width: 760px) {
  .compare-grid,
  .pf-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 22px;
  }
}
</style>
