<template>
  <div class="practice">
    <header class="head card">
      <div class="head-top">
        <span class="badge primary">综合实战</span>
        <span class="badge">{{ PRACTICE.steps.length }} 个 Step</span>
        <span class="badge">约 {{ PRACTICE.minutes }} 分钟</span>
      </div>
      <h1 class="title">{{ PRACTICE.title }}</h1>
      <p class="sub">{{ PRACTICE.subtitle }}</p>
      <p class="goal">{{ PRACTICE.goal }}</p>

      <div class="stack">
        <span v-for="s in PRACTICE.stack" :key="s" class="badge">{{ s }}</span>
      </div>

      <div class="prog">
        <div class="progress-track big">
          <div class="progress-fill" :style="{ width: store.practicePercent + '%' }" />
        </div>
        <div class="prog-meta">
          <span>已完成 <strong>{{ store.practiceDoneCount }} / {{ store.practiceTotal }}</strong> Step</span>
          <span>{{ store.practicePercent }}%</span>
        </div>
      </div>
    </header>

    <div class="notice card">
      <div class="notice-title">关于「▶ 运行」</div>
      <div class="notice-body">
        本页代码块运行按钮展示的是<strong>示例输出</strong>（浏览器里没有 Python 解释器）。要真正跑起来，请在本机执行：
        <code class="inline-code">python -m venv .venv</code> →
        <code class="inline-code">.venv\Scripts\activate</code> →
        <code class="inline-code">pip install -r requirements.txt</code> →
        <code class="inline-code">uvicorn main:app --reload</code>
      </div>
    </div>

    <div class="steps">
      <section v-for="step in PRACTICE.steps" :key="step.id" class="step card" :class="{ done: isDone(step.id) }">
        <div class="step-head">
          <div class="step-no" :class="{ done: isDone(step.id) }">
            {{ isDone(step.id) ? '✓' : String(step.step).padStart(2, '0') }}
          </div>
          <div class="step-title-wrap">
            <div class="step-title">
              Step {{ step.step }} · {{ step.title }}
              <span class="step-time">约 {{ step.minutes }} 分钟</span>
            </div>
            <div class="step-goal">{{ step.goal }}</div>
          </div>
          <button class="btn sm" :class="{ success: isDone(step.id) }" @click="toggle(step.id)">
            {{ isDone(step.id) ? '✓ 已完成' : '标记完成' }}
          </button>
        </div>

        <div class="step-body">
          <div class="tasks">
            <div class="tasks-label">要做的事</div>
            <ul class="task-list">
              <li v-for="(task, i) in step.tasks" :key="i">{{ task }}</li>
            </ul>
          </div>

          <div v-for="(snip, i) in step.snippets" :key="i" class="snippet">
            <div class="snippet-title">{{ snip.title }}</div>
            <CodeBlock
              :code="snip.code"
              :lang="snip.lang || 'python'"
              :output="snip.output"
              :note="snip.note"
              :title="snip.title"
              :storage-key="`${step.id}-snip-${i}`"
            />
          </div>

          <div class="check">
            <span class="check-label">完成标志</span>
            <span>{{ step.check }}</span>
          </div>
        </div>
      </section>
    </div>

    <section class="accept card">
      <div class="accept-title">验收清单</div>
      <ul class="accept-list">
        <li v-for="(item, i) in PRACTICE.acceptance" :key="i">
          <span class="tick">□</span>{{ item }}
        </li>
      </ul>
      <div class="accept-foot">
        <span class="muted">
          实战全部完成（{{ store.practiceDoneCount }}/{{ store.practiceTotal }}）后，建议回到
          <RouterLink to="/cheatsheet">速查表</RouterLink> 扫一遍，再进入 AI 应用开发。
        </span>
        <RouterLink class="btn primary" to="/finish">查看通关页面 →</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { PRACTICE } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import CodeBlock from '../components/CodeBlock.vue'

const store = useProgressStore()

const isDone = (id) => store.practice.includes(id)

function toggle(id) {
  if (isDone(id)) {
    store.unmarkStep(id)
    return
  }
  store.markStep(id)
  ElMessage({ message: `Step 已完成（${store.practiceDoneCount}/${store.practiceTotal}）`, type: 'success', duration: 1400 })
}

onMounted(() => {
  store.setCurrent('practice')
})
</script>

<style scoped>
.practice {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.head {
  padding: 22px;
}

.head-top {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.title {
  font-size: 24px;
}

.sub {
  color: var(--muted);
  font-size: 14px;
  margin-top: 6px;
}

.goal {
  margin-top: 10px;
  font-size: 14px;
  color: var(--text);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border-left: 3px solid var(--primary);
}

.stack {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.prog {
  margin-top: 16px;
}

.progress-track.big {
  height: 10px;
}

.prog-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 8px;
}

.prog-meta strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
}

.notice {
  padding: 14px 16px;
  border-left: 3px solid var(--warning);
}

.notice-title {
  font-weight: 600;
  color: var(--text-strong);
  font-size: 13.5px;
}

.notice-body {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text);
  line-height: 1.9;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  padding: 16px;
}

.step.done {
  border-color: var(--success);
}

.step-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.step-no {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--surface-3);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-no.done {
  background: var(--success-weak);
  color: var(--success);
}

.step-title-wrap {
  flex: 1;
  min-width: 0;
}

.step-title {
  font-size: 15.5px;
  font-weight: 600;
  color: var(--text-strong);
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.step-time {
  font-size: 11.5px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-weight: 400;
}

.step-goal {
  font-size: 13px;
  color: var(--muted);
  margin-top: 3px;
}

.step-body {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tasks-label {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 4px;
}

.task-list {
  margin: 0;
  padding-left: 20px;
  font-size: 13.5px;
  color: var(--text);
}

.task-list li {
  margin: 2px 0;
}

.snippet-title {
  display: none;
}

.check {
  font-size: 13px;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  background: var(--success-weak);
  color: var(--text);
}

.check-label {
  color: var(--success);
  font-weight: 600;
  margin-right: 6px;
}

.accept {
  padding: 18px;
}

.accept-title {
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 10px;
}

.accept-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 18px;
  font-size: 13.5px;
}

.accept-list li {
  display: flex;
  gap: 8px;
}

.tick {
  color: var(--primary);
  font-family: var(--font-mono);
}

.accept-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 12.5px;
  flex-wrap: wrap;
}

@media (max-width: 760px) {
  .accept-list {
    grid-template-columns: 1fr;
  }

  .step-head {
    flex-wrap: wrap;
  }
}
</style>
