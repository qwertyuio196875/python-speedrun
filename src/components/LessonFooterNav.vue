<template>
  <div class="lesson-footer">
    <div class="cur">
      <span class="label">当前章节</span>
      <span class="name">{{ lesson.title }}</span>
      <span class="pos">{{ lesson.phaseName }} · 第 {{ lesson.phaseOrder }} 节 · 全站第 {{ lesson.index + 1 }}/{{ total }}</span>
    </div>

    <div class="actions">
      <button class="btn sm" :disabled="!prev" @click="go(prev)">← 上一节</button>
      <button class="btn sm primary" :disabled="!next" @click="go(next)">下一节 →</button>
      <button class="btn sm" :class="{ success: done }" @click="store.toggleDone(lesson.id)">
        {{ done ? '✓ 已掌握（点击取消）' : '✓ 标记为已掌握' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { neighbors, totalLessons } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'

const props = defineProps({
  lesson: { type: Object, required: true },
})

const router = useRouter()
const store = useProgressStore()
const total = totalLessons

const nav = computed(() => neighbors(props.lesson.id))
const prev = computed(() => nav.value.prev)
const next = computed(() => nav.value.next)
const done = computed(() => store.isDone(props.lesson.id))

function go(target) {
  if (target) router.push(`/lesson/${target.id}`)
}
</script>

<style scoped>
.lesson-footer {
  position: sticky;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(6px);
}

.cur {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
}

.label {
  font-size: 11px;
  color: var(--muted);
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-strong);
}

.pos {
  font-size: 11.5px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .lesson-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .actions .btn:last-child {
    grid-column: 1 / -1;
  }
}
</style>
