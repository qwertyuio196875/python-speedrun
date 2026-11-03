<template>
  <div class="overview">
    <!-- 全部主线完成时，优先给出明确的下一步 -->
    <section v-if="allLessonsDone" class="complete-banner card">
      <div class="complete-copy">
        <span class="complete-kicker">主线完成</span>
        <h1>全部知识点已标记掌握</h1>
        <p>下一步：确认综合实战与通关页已完成，再按学习路线补齐与框架和工具相关的选修。</p>
      </div>
      <RouterLink class="btn primary" to="/finish">查看通关情况</RouterLink>
    </section>

    <!-- 聚焦式：只突出下一步最该做什么 -->
    <section class="focus card" :class="{ 'route-hidden': !routeExpanded }" aria-labelledby="focus-title">
      <div class="focus-head">
        <span class="kicker">当前任务</span>
        <span class="focus-meta">{{ currentLesson?.phaseName }} · 第 {{ currentLesson?.phaseOrder }} 节 · 约 {{ currentLesson?.minutes }} 分钟</span>
      </div>

      <div class="focus-grid">
        <div class="focus-main">
          <h1 id="focus-title" class="focus-title">{{ currentLessonTitle }}</h1>
          <p class="focus-summary">{{ currentLessonSummary }}</p>

          <div class="fact-list" aria-label="本节信息">
            <span class="fact">难度 {{ currentLesson?.rating?.level }} / 5</span>
            <span class="fact">重要度 {{ currentLesson?.rating?.must }} / 5</span>
            <span class="fact ok" v-if="currentLesson && store.isDone(currentLesson.id)">已标记掌握</span>
          </div>

          <div v-if="currentLesson?.tip" class="why">
            <span class="why-label">为什么先学它</span>
            <p>{{ currentLesson.tip.replace(/^零基础提示[：:]\s*/, '') }}</p>
          </div>

          <div class="step-panel">
            <div class="step-title">完成这一节前，按顺序确认</div>
            <ol class="step-list">
              <li><span class="step-no">1</span><span>先读“它是什么”，能说清它解决什么问题就过关</span></li>
              <li><span class="step-no">2</span><span>照示例做一遍，字符、括号和中文标点都要对上</span></li>
              <li><span class="step-no">3</span><span>完成一个小练习，报错就对照“常见坑”</span></li>
              <li><span class="step-no">4</span><span>做一遍自测，答错的回到对应代码再看一遍</span></li>
            </ol>
          </div>
        </div>

        <aside class="focus-side" aria-label="学习进度与操作">
          <div class="progress-summary">
            <div class="progress-line">
              <span>整体进度</span>
              <strong>{{ store.percent }}%</strong>
            </div>
            <div class="progress-track big" aria-label="整体进度">
              <div class="progress-fill" :style="{ width: store.percent + '%' }" />
            </div>
            <div class="progress-detail">
              <span>已完成 <strong>{{ store.doneCount }} / {{ store.totalCount }}</strong></span>
              <span>剩余 <strong>{{ remainingText }}</strong></span>
            </div>
          </div>

          <button class="btn primary action-main" @click="goLesson(currentLesson)">
            {{ allLessonsDone ? '回看已完成内容' : '继续这一节' }}
          </button>
          <RouterLink class="btn secondary action-secondary" to="/cheatsheet">遇到没记住的写法，查速查表</RouterLink>

          <div class="quick-stats" aria-label="学习数据">
            <div><span>累计学习</span><strong>{{ studyText }}</strong></div>
            <div><span>自测正确率</span><strong>{{ quizAccuracy }}</strong></div>
          </div>
        </aside>
      </div>
    </section>

    <!-- 完整路线按需展开，避免和当前任务抢注意力 -->
    <section class="route-wrap">
      <button
        class="route-toggle"
        type="button"
        :aria-expanded="routeExpanded"
        aria-controls="route-details"
        @click="routeExpanded = !routeExpanded"
      >
        <span>
          <strong>{{ routeExpanded ? '收起完整路线' : '查看完整路线和学习数据' }}</strong>
          <small>{{ nextStepText }}</small>
        </span>
        <span class="toggle-action">{{ routeExpanded ? '收起' : '展开' }}</span>
      </button>

      <div v-if="routeExpanded" id="route-details" class="route-details card">
        <div class="section-head">
          <h2>完整路线</h2>
          <span class="section-note">按顺序推进，也可以点进需要补的章节</span>
        </div>

        <div class="route-list" role="list">
          <button
            v-for="(phase, i) in phases"
            :key="phase.id"
            type="button"
            class="route-row"
            :class="{ done: progressOf(phase.id).finished, current: isCurrent(phase.id) }"
            role="listitem"
            @click="goPhase(phase)"
          >
            <span class="route-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="route-copy">
              <span class="route-name">{{ phase.name }}</span>
              <span class="route-desc">{{ phase.desc }}</span>
            </span>
            <span class="route-count">{{ progressOf(phase.id).done }}/{{ phase.count }}</span>
            <span class="route-bar" aria-hidden="true"><span :style="{ width: progressOf(phase.id).percent + '%' }" /></span>
          </button>

          <button
            type="button"
            class="route-row practice-row"
            :class="{ done: store.practicePercent === 100 }"
            role="listitem"
            @click="router.push('/practice')"
          >
            <span class="route-index">实</span>
            <span class="route-copy">
              <span class="route-name">综合实战：待办清单小工具</span>
              <span class="route-desc">用纯标准库做一个能存能查的命令行小工具</span>
            </span>
            <span class="route-count">{{ store.practiceDoneCount }}/{{ store.practiceTotal }}</span>
            <span class="route-bar" aria-hidden="true"><span :style="{ width: store.practicePercent + '%' }" /></span>
          </button>
        </div>

        <div class="study-strip">
          <div><strong>{{ store.doneCount }}</strong><span>已掌握</span></div>
          <div><strong>{{ store.totalCount - store.doneCount }}</strong><span>未完成</span></div>
          <div><strong>{{ quizCount }}</strong><span>完成自测</span></div>
          <div><strong>{{ totalLessons }}</strong><span>知识点总数</span></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { phaseStats, totalLessons } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'

const router = useRouter()
const store = useProgressStore()
const phases = phaseStats
const routeExpanded = ref(false)

const allLessonsDone = computed(() => store.allLessonsDone)
const currentLesson = computed(() => store.nextLesson)
const currentLessonTitle = computed(() => (allLessonsDone.value ? '主线已经完成，接下来补齐进阶' : currentLesson.value?.title || '准备开始第一节'))
const currentLessonSummary = computed(() => (allLessonsDone.value ? '主线知识点已经全部标记掌握。建议回看综合实战，并按新的框架进阶路线继续补齐。' : currentLesson.value?.summary || ''))
const quizCount = computed(() => Object.keys(store.quiz).length)

const progressOf = (id) => store.phaseProgress.find((phase) => phase.id === id) || { done: 0, percent: 0, finished: false }

const remainingText = computed(() => {
  const m = store.remainingMinutes
  if (m === 0) return '已完成'
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

const studyText = computed(() => {
  const m = store.studyMinutes
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

const quizAccuracy = computed(() => {
  const records = Object.values(store.quiz)
  if (!records.length) return '暂无'
  const total = records.reduce((sum, record) => sum + record.total, 0)
  const correct = records.reduce((sum, record) => sum + record.correct, 0)
  return total ? `${Math.round((correct / total) * 100)}%` : '暂无'
})

const isCurrent = (phaseId) => !allLessonsDone.value && currentLesson.value?.phaseId === phaseId
const nextStepText = computed(() => (allLessonsDone.value ? '主线已完成，查看下一步进阶路线' : `下一步：${currentLesson.value?.phaseName || '开始学习'}`))

function goLesson(lesson) {
  if (lesson) router.push(`/lesson/${lesson.id}`)
}

function goPhase(phase) {
  const first = phase.lessons.find((lesson) => !store.completed[lesson.id]) || phase.lessons[0]
  if (first) router.push(`/lesson/${first.id}`)
}
</script>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 880px;
}

/* 聚焦卡：当前任务优先，减少装饰和信息噪声 */
.focus {
  padding: 18px 20px;
}

.focus-head,
.progress-line,
.progress-detail,
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.kicker {
  color: var(--primary);
  background: var(--primary-weak);
  border: 1px solid var(--primary-border);
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 7px;
  white-space: nowrap;
}

.focus-meta {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11.5px;
  text-align: right;
}

.focus-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 244px;
  gap: 24px;
  margin-top: 14px;
}

.focus-title {
  font-size: 25px;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.focus-summary {
  margin-top: 8px;
  color: var(--text);
  font-size: 14px;
  max-width: 640px;
}

.fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 13px;
}

.fact {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-size: 11.5px;
  padding: 2px 7px;
}

.fact.ok {
  color: var(--success);
  border-color: transparent;
  background: var(--success-weak);
}

.why {
  border-left: 3px solid var(--primary);
  background: var(--surface-2);
  padding: 9px 12px;
  margin-top: 14px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.why-label {
  color: var(--muted);
  font-size: 11px;
}

.why p {
  margin-top: 2px;
  font-size: 12.5px;
  line-height: 1.65;
}

.step-panel {
  border-top: 1px solid var(--border);
  margin-top: 16px;
  padding-top: 12px;
}

.step-title {
  color: var(--text-strong);
  font-size: 12px;
  font-weight: 600;
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: grid;
  gap: 6px;
  font-size: 12.5px;
}

.step-list li {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 25px;
  color: var(--text);
}

.step-no {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  flex: 0 0 21px;
  border: 1px solid var(--border-strong);
  border-radius: 4px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.focus-side {
  border-left: 1px solid var(--border);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-summary {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.progress-line span {
  color: var(--muted);
  font-size: 11.5px;
}

.progress-line strong {
  font-family: var(--font-mono);
  font-size: 19px;
  color: var(--text-strong);
}

.progress-track.big {
  height: 8px;
}

.progress-detail {
  color: var(--muted);
  font-size: 10.5px;
}

.progress-detail strong {
  color: var(--text-strong);
  font-weight: 600;
}

.action-main,
.action-secondary {
  width: 100%;
}

.action-secondary {
  justify-content: flex-start;
  white-space: normal;
  height: auto;
  min-height: 36px;
}

.quick-stats {
  border-top: 1px solid var(--border);
  padding-top: 11px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 12px;
}

.quick-stats div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quick-stats span {
  color: var(--muted);
  font-size: 10.5px;
}

.quick-stats strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
  font-size: 12px;
}

/* 完整路线按需展开 */
.route-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.route-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.route-toggle:hover {
  background: var(--surface-3);
}

.route-toggle:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.route-toggle span:first-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.route-toggle strong {
  color: var(--text-strong);
  font-size: 13px;
}

.route-toggle small {
  color: var(--muted);
  font-size: 11px;
}

.toggle-action {
  color: var(--primary);
  font-size: 12px;
  white-space: nowrap;
}

.route-details {
  border: 0;
  border-top: 1px solid var(--border);
  border-radius: 0;
  box-shadow: none;
  padding: 14px;
}

.section-head {
  margin-bottom: 10px;
}

.section-head h2 {
  font-size: 15px;
}

.section-note {
  color: var(--muted);
  font-size: 11px;
}

.route-list {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.route-row {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) 42px;
  grid-template-areas:
    "index copy count"
    "index bar bar";
  column-gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border: 0;
  border-top: 1px solid var(--border);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.route-row:first-child {
  border-top: 0;
}

.route-row:hover {
  background: var(--surface-3);
}

.route-row:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.route-row.current {
  background: var(--primary-weak);
}

.route-index {
  grid-area: index;
  align-self: start;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding-top: 2px;
}

.route-copy {
  grid-area: copy;
  min-width: 0;
}

.route-name,
.route-desc {
  display: block;
}

.route-name {
  color: var(--text-strong);
  font-size: 12px;
  font-weight: 600;
}

.route-desc {
  color: var(--muted);
  font-size: 10.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.route-count {
  grid-area: count;
  align-self: start;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
  text-align: right;
}

.route-bar {
  grid-area: bar;
  display: block;
  height: 4px;
  margin-top: 5px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--surface-3);
}

.route-bar > span {
  display: block;
  height: 100%;
  background: var(--success);
}

.route-row.done .route-index,
.route-row.done .route-count {
  color: var(--success);
}

.route-row.current .route-name {
  color: var(--primary);
}

.practice-row .route-index {
  color: var(--primary);
}

.study-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.study-strip div {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 10px;
}

.study-strip strong {
  display: block;
  color: var(--text-strong);
  font-family: var(--font-mono);
  font-size: 16px;
}

.study-strip span {
  color: var(--muted);
  font-size: 10.5px;
}

/* 主线完成 */
.complete-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-color: var(--success);
  background: var(--success-weak);
  padding: 16px 18px;
}

.complete-kicker {
  color: var(--success);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.complete-banner h1 {
  margin-top: 2px;
  font-size: 20px;
}

.complete-banner p {
  color: var(--muted);
  font-size: 12px;
  margin-top: 5px;
  max-width: 650px;
}

@media (max-width: 860px) {
  .overview {
    gap: 10px;
  }

  .focus {
    padding: 14px;
  }

  .focus-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .focus-side {
    border-left: 0;
    border-top: 1px solid var(--border);
    padding-left: 0;
    padding-top: 14px;
  }

  .focus-meta {
    max-width: 46%;
  }

  .study-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .route-desc {
    white-space: normal;
  }

  .complete-banner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
