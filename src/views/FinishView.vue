<template>
  <div class="finish">
    <!-- 通关头部 -->
    <header class="hero card" :class="{ done: allDone }">
      <div class="hero-emoji">{{ allDone ? '🎉' : '🏁' }}</div>
      <h1 class="hero-title">{{ allDone ? 'Python 基础通关' : '离通关还差一点' }}</h1>
      <p class="hero-sub">
        <template v-if="allDone">
          你已经掌握 Python AI 应用开发所需的全部核心基础，可以把时间投入 AI 方向了。
        </template>
        <template v-else>
          还有 <strong>{{ store.totalCount - store.doneCount }}</strong> 个知识点没有标记为已掌握，
          预计还需要 <strong>{{ remainingText }}</strong>。完成后这里会显示通关总结。
        </template>
      </p>

      <div class="hero-progress">
        <div class="progress-track big">
          <div class="progress-fill" :style="{ width: store.percent + '%' }" />
        </div>
        <div class="hero-meta">
          <span>已掌握 <strong>{{ store.doneCount }} / {{ store.totalCount }}</strong></span>
          <span>{{ store.percent }}%</span>
          <span>累计学习 <strong>{{ studyText }}</strong></span>
        </div>
      </div>

      <div class="hero-actions">
        <button v-if="!allDone" class="btn primary" @click="continueStudy">继续学习 →</button>
        <RouterLink v-else class="btn primary" to="/practice">去综合实战 →</RouterLink>
        <RouterLink class="btn" to="/cheatsheet">打开速查表</RouterLink>
      </div>
    </header>

    <!-- 已掌握清单 -->
    <section class="block">
      <div class="block-head">
        <h2 class="block-title">已掌握的知识点</h2>
        <span class="muted small">按阶段分组，✓ 表示已标记掌握</span>
      </div>
      <div class="grid">
        <div v-for="phase in phases" :key="phase.id" class="phase card">
          <div class="phase-head">
            <span class="phase-name">{{ phase.name }}</span>
            <span class="phase-count" :class="{ ok: progressOf(phase.id).finished }">
              {{ progressOf(phase.id).done }} / {{ phase.count }}
            </span>
          </div>
          <ul class="lesson-list">
            <li v-for="lesson in phase.lessons" :key="lesson.id" :class="{ done: store.isDone(lesson.id) }">
              <span class="mark">{{ store.isDone(lesson.id) ? '✓' : '○' }}</span>
              <RouterLink :to="`/lesson/${lesson.id}`">{{ lesson.title }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 下一阶段路线 -->
    <section class="block">
      <div class="block-head">
        <h2 class="block-title">下一阶段：AI 应用开发</h2>
        <span class="muted small">Python 只是入口，接下来才是主战场</span>
      </div>

      <div class="roadmap card">
        <div v-for="(node, i) in aiRoadmap" :key="node" class="node-item">
          <span class="node-idx">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="node-name">{{ node }}</span>
          <span v-if="i < aiRoadmap.length - 1" class="node-arrow">↓</span>
        </div>
      </div>

      <div class="prep card">
        <div class="prep-title">开始之前，先准备好这些</div>
        <ul class="prep-list">
          <li>一个可用的模型 API Key（放到 <code class="inline-code">.env</code>，不要写进代码）</li>
          <li>一个能跑通的 FastAPI 骨架（综合实战里已经完成）</li>
          <li>会看 JSON 请求/响应，会读接口文档（第八阶段成果）</li>
          <li>会写 async 并发调用（第六阶段成果）</li>
        </ul>
        <div class="prep-cmd">
          <CodeBlock
            :code="prepCode"
            lang="bash"
            :editable="false"
            :runnable="false"
            title="下一步可以直接执行"
          />
        </div>
        <div class="prep-actions">
          <button class="btn primary" @click="startAi">开始 AI 应用开发 →</button>
          <span class="muted small">（提示：按你自己的节奏，从 LLM API 调用开始练手）</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { phaseStats } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import CodeBlock from '../components/CodeBlock.vue'

const router = useRouter()
const store = useProgressStore()
const phases = phaseStats

const allDone = computed(() => store.allLessonsDone)

const aiRoadmap = [
  'LLM API',
  'Prompt 工程',
  'Structured Output',
  'RAG',
  'Embedding',
  'Vector Database',
  'Tool Calling',
  'Agent',
  'LangGraph',
  '完整 AI Agent 项目',
]

const prepCode = `mkdir ai-agent-lab && cd ai-agent-lab
python -m venv .venv
.venv\\Scripts\\activate          # macOS / Linux: source .venv/bin/activate
pip install "openai>=1.40" "httpx>=0.27" "python-dotenv>=1.0"

# .env
LLM_API_KEY=sk-你的密钥
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat

# 第一步练习：用 httpx 调一次 chat/completions，打印 reply 与 usage`

const progressOf = (id) => store.phaseProgress.find((p) => p.id === id) || { done: 0, percent: 0, finished: false }

const remainingText = computed(() => {
  const m = store.remainingMinutes
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

const studyText = computed(() => {
  const m = store.studyMinutes
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

function continueStudy() {
  const lesson = store.nextLesson
  if (lesson) router.push(`/lesson/${lesson.id}`)
}

async function startAi() {
  await ElMessageBox.alert(
    [
      '建议的学习顺序：',
      '',
      '1. LLM API：能发出一次请求、读懂返回的 choices 与 usage',
      '2. Prompt：把系统提示词、少样本示例结构化管理',
      '3. Structured Output：用 Pydantic 模型约束模型输出',
      '4. RAG：文档切分 → 向量化 → 检索 → 拼进 Prompt',
      '5. Tool Calling：把函数交给模型调用，并校验参数',
      '6. Agent / LangGraph：把工具与流程编排成可循环的智能体',
      '',
      '这四步都用得上你已经学到的：async / await、httpx、Pydantic、FastAPI、类型注解。',
    ].join('\n'),
    'AI 应用开发路线',
    { confirmButtonText: '知道了' },
  )
}

onMounted(() => {
  store.setCurrent('finish')
})
</script>

<style scoped>
.finish {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.hero {
  padding: 30px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero.done {
  border-color: var(--primary-border);
  background: linear-gradient(180deg, var(--primary-weak), transparent 70%);
}

.hero-emoji {
  font-size: 40px;
  line-height: 1;
}

.hero-title {
  font-size: 26px;
  margin-top: 12px;
}

.hero-sub {
  color: var(--muted);
  font-size: 14px;
  margin-top: 8px;
  max-width: 560px;
}

.hero-sub strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
}

.hero-progress {
  width: 100%;
  max-width: 560px;
  margin-top: 20px;
}

.progress-track.big {
  height: 12px;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 10px;
}

.hero-meta strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
}

.hero-actions {
  display: flex;
  gap: 8px;
  margin-top: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

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

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.phase {
  padding: 14px;
}

.phase-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.phase-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-strong);
}

.phase-count {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--muted);
}

.phase-count.ok {
  color: var(--success);
}

.lesson-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lesson-list li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
}

.lesson-list li a {
  color: var(--text);
}

.lesson-list li a:hover {
  color: var(--primary);
}

.lesson-list li.done .mark {
  color: var(--success);
}

.mark {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.roadmap {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
}

.node-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}

.node-idx {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--primary);
  background: var(--primary-weak);
  border-radius: 5px;
  padding: 1px 6px;
}

.node-name {
  font-size: 14px;
  color: var(--text-strong);
}

.node-arrow {
  color: var(--muted);
  font-size: 11px;
  margin-left: -2px;
}

.prep {
  margin-top: 14px;
  padding: 16px 18px;
}

.prep-title {
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.prep-list {
  margin: 0 0 12px;
  padding-left: 20px;
  font-size: 13.5px;
  color: var(--text);
}

.prep-list li {
  margin: 3px 0;
}

.prep-cmd {
  margin-bottom: 14px;
}

.prep-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 22px;
  }
}
</style>
