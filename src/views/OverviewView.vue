<template>
  <div class="overview">
    <!-- 目标 + 总进度 -->
    <section class="hero card">
      <div class="hero-main">
        <div class="hero-badges">
          <span class="badge primary">Java → Python</span>
          <span class="badge">{{ totalLessons }} 个知识点</span>
          <span class="badge">约 {{ Math.round(totalMinutes / 60) }} 小时</span>
        </div>
        <h1 class="hero-title">Python Java 开发者速通</h1>
        <p class="hero-sub">
          目标：<strong>5~10 小时</strong>完成 Python AI 应用开发所需的核心基础；学完直接进入 LLM、RAG、Tool Calling、Agent。
        </p>

        <div class="hero-progress">
          <div class="progress-track big">
            <div class="progress-fill" :style="{ width: store.percent + '%' }" />
          </div>
          <div class="hero-progress-meta">
            <span>整体进度 <strong>{{ store.percent }}%</strong></span>
            <span>已完成 <strong>{{ store.doneCount }} / {{ store.totalCount }}</strong></span>
            <span>预计剩余 <strong>{{ remainingText }}</strong></span>
          </div>
        </div>
      </div>

      <div class="hero-side">
        <div class="side-label">继续学习</div>
        <div class="side-title">↓ {{ nextLesson.title }}</div>
        <div class="side-sub">{{ nextLesson.phaseName }} · 第 {{ nextLesson.phaseOrder }} 节 · 约 {{ nextLesson.minutes }} 分钟</div>
        <button class="btn primary side-btn" @click="goLesson(nextLesson)">继续学习 →</button>
        <div class="side-stats">
          <div class="ss"><span class="muted">累计学习</span><strong>{{ studyText }}</strong></div>
          <div class="ss"><span class="muted">自测正确率</span><strong>{{ quizAccuracy }}</strong></div>
        </div>
      </div>
    </section>

    <!-- 通关提示 -->
    <section v-if="store.allLessonsDone" class="banner card">
      <div>
        <div class="banner-title">🎉 全部知识点已标记掌握</div>
        <div class="banner-sub muted">去看一眼通关页面，然后进入 AI 应用开发阶段。</div>
      </div>
      <RouterLink class="btn primary" to="/finish">进入通关页面 →</RouterLink>
    </section>

    <!-- 学习路线 -->
    <section class="roadmap">
      <div class="block-head">
        <h2 class="block-title">学习路线</h2>
        <span class="muted small">按顺序推进，也可以直接跳到需要的章节</span>
      </div>

      <div class="flow">
        <div v-for="(phase, i) in phases" :key="phase.id" class="flow-item">
          <div class="flow-rail">
            <span class="node" :class="{ done: progressOf(phase.id).finished, doing: isCurrent(phase.id) }">
              {{ progressOf(phase.id).finished ? '✓' : String(i + 1).padStart(2, '0') }}
            </span>
            <span class="line" />
          </div>
          <button class="flow-card card" :class="{ active: isCurrent(phase.id) }" @click="goPhase(phase)">
            <div class="fc-head">
              <span class="fc-name">{{ phase.name }}</span>
              <span class="fc-time">约 {{ Math.round(phase.minutes / 6) / 10 }} 小时</span>
            </div>
            <div class="fc-desc">{{ phase.desc }}</div>
            <div class="fc-foot">
              <div class="progress-track fc-bar">
                <div class="progress-fill" :style="{ width: progressOf(phase.id).percent + '%' }" />
              </div>
              <span class="fc-count">
                <span v-if="progressOf(phase.id).finished" class="ok">已完成 ✓</span>
                <span v-else>{{ progressOf(phase.id).done }} / {{ phase.count }}</span>
              </span>
            </div>
          </button>
        </div>

        <div class="flow-item">
          <div class="flow-rail">
            <span class="node final" :class="{ done: store.practicePercent === 100 }">
              {{ store.practicePercent === 100 ? '✓' : '🚀' }}
            </span>
          </div>
          <button class="flow-card card" @click="router.push('/practice')">
            <div class="fc-head">
              <span class="fc-name">综合实战：Python AI Chat API</span>
              <span class="fc-time">约 1~2 小时</span>
            </div>
            <div class="fc-desc">用 FastAPI + Pydantic + async 从零写出 POST /chat，把前面八阶段缝合成一个能跑的服务。</div>
            <div class="fc-foot">
              <div class="progress-track fc-bar">
                <div class="progress-fill" :style="{ width: store.practicePercent + '%' }" />
              </div>
              <span class="fc-count">{{ store.practiceDoneCount }} / {{ store.practiceTotal }} Step</span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- 学习数据 -->
    <section class="stats">
      <div class="block-head">
        <h2 class="block-title">学习数据</h2>
      </div>
      <div class="stat-grid">
        <div class="stat card">
          <div class="stat-num">{{ store.doneCount }}</div>
          <div class="stat-label">已掌握知识点</div>
        </div>
        <div class="stat card">
          <div class="stat-num">{{ store.totalCount - store.doneCount }}</div>
          <div class="stat-label">未完成知识点</div>
        </div>
        <div class="stat card">
          <div class="stat-num">{{ studyText }}</div>
          <div class="stat-label">累计学习时长</div>
        </div>
        <div class="stat card">
          <div class="stat-num">{{ quizCount }}</div>
          <div class="stat-label">已完成自测的章节</div>
        </div>
      </div>

      <div class="quick card">
        <div class="quick-title">需要快速查语法？</div>
        <div class="quick-sub muted">Java 和 Python 的对应关系都在速查表里，支持搜索与点击查看详细解释。</div>
        <div class="quick-actions">
          <RouterLink class="btn" to="/cheatsheet">打开 Java → Python 速查表</RouterLink>
          <RouterLink class="btn ghost" to="/finish">查看通关页面</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { phaseStats, totalLessons, totalMinutes } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'

const router = useRouter()
const store = useProgressStore()
const phases = phaseStats

const nextLesson = computed(() => store.nextLesson)
const quizCount = computed(() => Object.keys(store.quiz).length)

const progressOf = (id) => store.phaseProgress.find((p) => p.id === id) || { done: 0, percent: 0, finished: false }

const remainingText = computed(() => {
  const m = store.remainingMinutes
  if (m === 0) return '已完成全部知识点'
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
  if (!records.length) return '—'
  const total = records.reduce((s, r) => s + r.total, 0)
  const correct = records.reduce((s, r) => s + r.correct, 0)
  if (!total) return '—'
  return `${Math.round((correct / total) * 100)}%`
})

const isCurrent = (phaseId) => !store.allLessonsDone && store.nextLesson?.phaseId === phaseId

function goLesson(lesson) {
  if (lesson) router.push(`/lesson/${lesson.id}`)
}

function goPhase(phase) {
  const first = phase.lessons.find((l) => !store.completed[l.id]) || phase.lessons[0]
  if (first) router.push(`/lesson/${first.id}`)
}
</script>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(240px, 1fr);
  gap: 22px;
  padding: 22px;
}

.hero-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 25px;
  letter-spacing: -0.01em;
}

.hero-sub {
  margin-top: 8px;
  font-size: 14px;
  color: var(--muted);
  max-width: 640px;
}

.hero-sub strong {
  color: var(--text-strong);
}

.hero-progress {
  margin-top: 18px;
}

.progress-track.big {
  height: 12px;
}

.hero-progress-meta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 9px;
  font-size: 12.5px;
  color: var(--muted);
}

.hero-progress-meta strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
}

.hero-side {
  border-left: 1px solid var(--border);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.side-label {
  font-size: 11.5px;
  color: var(--muted);
}

.side-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-strong);
}

.side-sub {
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.side-btn {
  margin-top: 8px;
  width: 100%;
}

.side-stats {
  margin-top: auto;
  padding-top: 14px;
  display: flex;
  gap: 18px;
}

.ss {
  display: flex;
  flex-direction: column;
  font-size: 11.5px;
}

.ss strong {
  font-size: 14px;
  color: var(--text-strong);
  font-family: var(--font-mono);
}

/* Banner */
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-color: var(--primary-border);
  background: var(--primary-weak);
  flex-wrap: wrap;
}

.banner-title {
  font-weight: 600;
  color: var(--text-strong);
}

.banner-sub {
  font-size: 12.5px;
  margin-top: 3px;
}

/* Roadmap */
.block-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.block-title {
  font-size: 17px;
}

.small {
  font-size: 12px;
}

.flow {
  display: flex;
  flex-direction: column;
}

.flow-item {
  display: flex;
  gap: 14px;
}

.flow-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34px;
  flex-shrink: 0;
}

.node {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.node.done {
  border-color: var(--success);
  background: var(--success-weak);
  color: var(--success);
}

.node.doing {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-weak);
}

.node.final {
  font-size: 13px;
}

.line {
  flex: 1;
  width: 1px;
  background: var(--border);
  min-height: 14px;
}

.flow-card {
  flex: 1;
  margin-bottom: 12px;
  padding: 13px 15px;
  text-align: left;
  cursor: pointer;
  border: 1px solid var(--border);
  color: inherit;
  font: inherit;
}

.flow-card:hover {
  border-color: var(--primary-border);
  box-shadow: var(--shadow-md);
}

.flow-card.active {
  border-color: var(--primary-border);
  background: linear-gradient(90deg, var(--primary-weak), transparent 60%);
}

.fc-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.fc-name {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-strong);
}

.fc-time {
  font-size: 11.5px;
  color: var(--muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.fc-desc {
  font-size: 12.5px;
  color: var(--muted);
  margin: 5px 0 10px;
  line-height: 1.6;
}

.fc-foot {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fc-bar {
  flex: 1;
  height: 6px;
}

.fc-count {
  font-size: 11.5px;
  color: var(--muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.fc-count .ok {
  color: var(--success);
}

/* Stats */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.stat {
  padding: 14px;
}

.stat-num {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-strong);
  font-family: var(--font-mono);
  line-height: 1.3;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.quick {
  padding: 16px;
}

.quick-title {
  font-weight: 600;
  color: var(--text-strong);
}

.quick-sub {
  font-size: 12.5px;
  margin-top: 4px;
}

.quick-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-side {
    border-left: 0;
    border-top: 1px solid var(--border);
    padding-left: 0;
    padding-top: 16px;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
