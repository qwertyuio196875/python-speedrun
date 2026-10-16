<template>
  <nav class="side-nav">
    <div class="brand">
      <div class="brand-top">
        <span class="logo">{ }</span>
        <div>
          <div class="name">Python 速通</div>
          <div class="sub">Java 开发者 · 5~10 小时过关</div>
        </div>
      </div>
      <div class="brand-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: store.percent + '%' }" />
        </div>
        <div class="brand-progress-text">
          <span>{{ store.doneCount }} / {{ store.totalCount }} 节</span>
          <span>{{ store.percent }}%</span>
        </div>
      </div>
    </div>

    <div class="tree">
      <RouterLink class="row top" to="/" :class="{ active: route.name === 'overview' }" @click="emit('navigate')">
        <span class="ico">🏠</span>
        <span class="txt">学习总览</span>
        <span class="tail">{{ store.percent }}%</span>
      </RouterLink>

      <div v-for="phase in phases" :key="phase.id" class="group">
        <button class="group-head" @click="toggle(phase.id)">
          <span class="caret" :class="{ open: isOpen(phase.id) }">▸</span>
          <span class="gname">{{ phaseIndexLabel(phase.id) }}：{{ phase.name }}</span>
          <span class="gtail">
            <span v-if="progressOf(phase.id).finished" class="ok">✓</span>
            <span class="count">{{ progressOf(phase.id).done }}/{{ phase.count }}</span>
          </span>
        </button>

        <div v-show="isOpen(phase.id)" class="children">
          <RouterLink
            v-for="lesson in phase.lessons"
            :key="lesson.id"
            class="row lesson"
            :class="{ active: lesson.id === currentId, done: store.completed[lesson.id] }"
            :to="`/lesson/${lesson.id}`"
            @click="emit('navigate')"
          >
            <span class="ico">{{ store.completed[lesson.id] ? '✓' : '○' }}</span>
            <span class="txt">{{ lesson.title }}</span>
            <span class="tail">{{ lesson.phaseOrder }}</span>
          </RouterLink>
        </div>
      </div>

      <RouterLink
        class="row top"
        to="/practice"
        :class="{ active: route.name === 'practice' }"
        @click="emit('navigate')"
      >
        <span class="ico">🚀</span>
        <span class="txt">综合实战</span>
        <span class="tail">{{ store.practiceDoneCount }}/{{ store.practiceTotal }}</span>
      </RouterLink>

      <RouterLink
        class="row top"
        to="/cheatsheet"
        :class="{ active: route.name === 'cheatsheet' }"
        @click="emit('navigate')"
      >
        <span class="ico">📖</span>
        <span class="txt">Java → Python 速查表</span>
      </RouterLink>

      <RouterLink
        class="row top"
        to="/finish"
        :class="{ active: route.name === 'finish', locked: !store.allLessonsDone }"
        @click="emit('navigate')"
      >
        <span class="ico">🏁</span>
        <span class="txt">通关页面</span>
        <span class="tail" v-if="store.allLessonsDone">可进入</span>
        <span class="tail" v-else>{{ store.percent }}%</span>
      </RouterLink>
    </div>

    <div class="foot">
      <div class="foot-row">
        <span class="muted">累计学习 {{ studyTimeText }}</span>
      </div>
      <button class="reset" @click="onReset">重置学习进度</button>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { phaseStats } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import { useResetProgress } from '../composables/useResetProgress.js'

const emit = defineEmits(['navigate'])
const store = useProgressStore()
const route = useRoute()
const resetProgress = useResetProgress()

const phases = phaseStats
const open = ref(new Set())

const currentId = computed(() => route.params.id || '')

const PHASE_LABEL = { 1: '第一阶段', 2: '第二阶段', 3: '第三阶段', 4: '第四阶段', 5: '第五阶段', 6: '第六阶段', 7: '第七阶段', 8: '第八阶段' }
const phaseIndexLabel = (id) => PHASE_LABEL[id] || `第${id}阶段`

const progressOf = (id) => store.phaseProgress.find((p) => p.id === id) || { done: 0, percent: 0, finished: false }

const studyTimeText = computed(() => {
  const m = store.studyMinutes
  if (m < 60) return `${m} 分钟`
  const h = Math.floor(m / 60)
  return `${h} 小时 ${m % 60} 分钟`
})

function isOpen(id) {
  return open.value.has(id)
}

function toggle(id) {
  const next = new Set(open.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  open.value = next
}

// 默认展开：当前知识点所在阶段 + 第一个未完成阶段
function expandInitial() {
  const next = new Set(open.value)
  const lesson = route.name === 'lesson' ? route.params.id : null
  const target = store.nextLesson
  const id = lesson
    ? phases.find((p) => p.lessons.some((l) => l.id === lesson))?.id
    : target?.phaseId
  if (id) next.add(id)
  if (!next.size) next.add(1)
  open.value = next
}

watch(() => [route.name, route.params.id], expandInitial, { immediate: true })

async function onReset() {
  await resetProgress()
}
</script>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.brand {
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--border);
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--primary), #22b8cf);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.name {
  font-weight: 600;
  color: var(--text-strong);
  font-size: 15px;
  line-height: 1.3;
}

.sub {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.4;
}

.brand-progress {
  margin-top: 12px;
}

.brand-progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  color: var(--muted);
  margin-top: 6px;
  font-family: var(--font-mono);
}

.tree {
  flex: 1;
  overflow-y: auto;
  padding: 10px 8px 16px;
}

.group {
  margin-top: 6px;
}

.group-head {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 7px 8px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  border-radius: var(--radius-sm);
  text-align: left;
}

.group-head:hover {
  background: var(--surface-3);
  color: var(--text);
}

.caret {
  display: inline-block;
  transition: transform 0.15s ease;
  font-size: 10px;
  width: 10px;
}

.caret.open {
  transform: rotate(90deg);
}

.gname {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gtail {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 11px;
}

.gtail .ok {
  color: var(--success);
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 13.5px;
  border-left: 2px solid transparent;
  margin: 1px 0;
}

.row:hover {
  background: var(--surface-3);
  color: var(--text-strong);
}

.row .ico {
  width: 14px;
  text-align: center;
  font-size: 11px;
  color: var(--muted);
  flex-shrink: 0;
}

.row .txt {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row .tail {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}

.row.lesson {
  padding-left: 22px;
  font-size: 13px;
}

.row.lesson.done .ico {
  color: var(--success);
}

.row.active {
  background: var(--primary-weak);
  border-left-color: var(--primary);
  color: var(--primary);
  font-weight: 500;
}

.row.active .txt,
.row.active .ico,
.row.active .tail {
  color: var(--primary);
}

.row.top {
  font-weight: 500;
  margin-top: 2px;
}

.row.locked {
  opacity: 0.62;
}

.foot {
  border-top: 1px solid var(--border);
  padding: 10px 12px 12px;
}

.foot-row {
  font-size: 11.5px;
  margin-bottom: 8px;
}

.reset {
  width: 100%;
  height: 30px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: transparent;
  color: var(--muted);
  font-size: 12.5px;
  cursor: pointer;
}

.reset:hover {
  border-color: var(--danger);
  color: var(--danger);
}
</style>
