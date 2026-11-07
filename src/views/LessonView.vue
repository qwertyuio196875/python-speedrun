<template>
  <div v-if="lesson" class="lesson-layout">
    <article class="lesson">
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
        <span class="meta-item"><StarRating label="难度" :value="lesson.rating.level" /></span>
        <span class="meta-item"><StarRating label="重要度" :value="lesson.rating.must" /></span>
        <span class="meta-item badge">⏱ 预计 {{ lesson.minutes }} 分钟</span>
        <span class="meta-item badge">🏷 {{ lesson.keywords.slice(0, 3).join(' · ') }}</span>
      </div>

      <div class="summary"><RichText :text="lesson.summary" /></div>

      <div class="tip">
        <span class="tip-label">零基础提示</span>
        <span class="tip-body"><RichText :text="lesson.tip" /></span>
      </div>
    </header>

    <!-- 1. 知识讲解（新格式）：系统讲完一个知识点 -->
    <section v-if="lesson.lecture" class="section" id="sec-lecture">
      <h2 class="h2"><span class="idx">{{ sec.lecture }}</span> 知识讲解</h2>
      <LectureBody :blocks="lesson.lecture" />
    </section>

    <!-- 旧格式兜底：它是什么 + 打个比方 -->
    <template v-else>
      <!-- 1. 它是什么 -->
      <section class="section" id="sec-what">
        <h2 class="h2"><span class="idx">{{ sec.what }}</span> 它是什么</h2>
        <p class="p"><RichText :text="lesson.what" /></p>
      </section>

      <!-- 2. 打个比方 -->
      <section class="section" id="sec-analogy">
        <h2 class="h2"><span class="idx">{{ sec.analogy }}</span> 打个比方</h2>
        <p class="p analogy"><RichText :text="lesson.analogy" /></p>
      </section>
    </template>

    <!-- 常用术语（细化补充） -->
    <section class="section" id="sec-terms">
      <h2 class="h2"><span class="idx">{{ sec.terms }}</span> 常用术语</h2>
      <div class="terms">
        <div v-for="(t, i) in lesson.terms" :key="i" class="term card">
          <div class="term-head">
            <code>{{ t.term }}</code>
            <span class="term-zh">{{ t.zh }}</span>
          </div>
          <div class="term-note"><RichText :text="t.note" /></div>
        </div>
      </div>
    </section>

    <!-- 4. 跟着做（可选） -->
    <section v-if="sec.steps" class="section" id="sec-steps">
      <h2 class="h2"><span class="idx">{{ sec.steps }}</span> 跟着做</h2>
      <ol class="steps">
        <li v-for="(s, i) in lesson.steps" :key="i"><RichText :text="s" /></li>
      </ol>
    </section>

    <!-- 5. 代码示例 -->
    <section class="section" id="sec-examples">
      <h2 class="h2"><span class="idx">{{ sec.examples }}</span> 代码示例</h2>
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

    <!-- 6. 常见坑 -->
    <section class="section" id="sec-pitfalls">
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

    <!-- 7. 小练习 -->
    <section class="section" id="sec-practice">
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

    <!-- 8. 自测 -->
    <div id="sec-quiz"><QuizSection :lesson="lesson" :index="sec.quiz" /></div>

    <!-- 底部《上一节 / 下一节 / 标记》 -->
    <LessonFooterNav :lesson="lesson" />
    </article>
    <LessonToc :items="tocItems" />
  </div>

  <div v-else class="not-found card">
    <h2 class="h2">没有找到这个知识点</h2>
    <p class="p muted">链接可能已失效。</p>
    <RouterLink class="btn" to="/">回到学习总览</RouterLink>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { lessonById, totalLessons } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import CodeBlock from '../components/CodeBlock.vue'
import QuizSection from '../components/QuizSection.vue'
import LessonFooterNav from '../components/LessonFooterNav.vue'
import LessonToc from '../components/LessonToc.vue'
import LectureBody from '../components/LectureBody.vue'
import StarRating from '../components/StarRating.vue'
import RichText from '../components/RichText.vue'
import { highlight } from '../utils/highlight.js'

const route = useRoute()
const store = useProgressStore()
const total = totalLessons

const lesson = computed(() => lessonById[route.params.id])

const revealed = reactive({})
const hl = (code) => highlight(code, 'python')

const sec = computed(() => {
  const item = lesson.value
  if (!item) return {}
  const hasLecture = Boolean(item.lecture && item.lecture.length)
  let i = 0
  const lecture = hasLecture ? ++i : null
  let what, analogy
  if (hasLecture) {
    what = null
    analogy = null
  } else {
    what = ++i
    analogy = ++i
  }
  const terms = ++i
  const steps = (item.steps || []).length ? ++i : null
  const examples = ++i
  const pitfalls = ++i
  const practice = ++i
  const quizNo = ++i
  return { lecture, what, analogy, terms, steps, examples, pitfalls, practice, quiz: quizNo }
})

const tocItems = computed(() => {
  const s = sec.value
  if (!lesson.value) return []
  const list = []
  if (s.lecture) {
    list.push({ id: 'sec-lecture', label: '知识讲解', index: String(s.lecture).padStart(2, '0') })
  } else {
    list.push(
      { id: 'sec-what', label: '它是什么', index: String(s.what).padStart(2, '0') },
      { id: 'sec-analogy', label: '打个比方', index: String(s.analogy).padStart(2, '0') },
    )
  }
  list.push({ id: 'sec-terms', label: '常用术语', index: String(s.terms).padStart(2, '0') })
  if (s.steps) list.push({ id: 'sec-steps', label: '跟着做', index: String(s.steps).padStart(2, '0') })
  list.push(
    { id: 'sec-examples', label: '代码示例', index: String(s.examples).padStart(2, '0') },
    { id: 'sec-pitfalls', label: '常见坑', index: String(s.pitfalls).padStart(2, '0') },
    { id: 'sec-practice', label: '小练习', index: String(s.practice).padStart(2, '0') },
    { id: 'sec-quiz', label: '自测', index: String(s.quiz).padStart(2, '0') },
  )
  return list
})

function toggleAnswer(i) {
  revealed[i] = !revealed[i]
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
.lesson-layout {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  max-width: 1120px;
  margin: 0 auto;
}

.lesson {
  max-width: 860px;
  flex: 1;
  min-width: 0;
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

.analogy {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border-left: 3px solid var(--warning);
}

.terms {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.term {
  padding: 11px 13px;
}

.term-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.term-head code {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--primary);
  background: var(--primary-weak);
  padding: 1px 7px;
  border-radius: 6px;
}

.term-zh {
  font-weight: 600;
  color: var(--text-strong);
  font-size: 14px;
}

.term-note {
  font-size: 13px;
  color: var(--text);
}

.steps {
  padding-left: 22px;
  list-style: decimal;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
}

.examples,
.practices {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ex-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 7px;
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