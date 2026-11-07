<template>
  <aside v-if="items.length" class="toc" aria-label="本文目录">
    <div class="toc-title">本文目录</div>
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="toc-item"
      :class="{ active: item.id === active }"
      @click="scrollTo(item.id)"
    >
      <span class="toc-idx">{{ item.index }}</span>
      <span class="toc-label">{{ item.label }}</span>
    </button>
  </aside>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }, // [{ id, label, index }]
})
const items = props.items

const active = ref('')
let ticking = false

function update() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const offset = 76 // 顶栏高度 + 呼吸空间
    let current = ''
    for (const { id } of items) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= offset) current = id
    }
    if (current) active.value = current
  })
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  active.value = id
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', update))
</script>

<style scoped>
.toc {
  display: none;
  width: 204px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--header-h) + 24px);
  align-self: flex-start;
  max-height: calc(100vh - var(--header-h) - 48px);
  overflow-y: auto;
  padding: 4px 0 24px 18px;
  border-left: 1px solid var(--border);
}

@media (min-width: 1200px) {
  .toc {
    display: block;
  }
}

.toc-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin: 4px 0 10px;
}

.toc-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  padding: 4px 8px 4px 0;
  border: 0;
  border-left: 2px solid transparent;
  background: transparent;
  text-align: left;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
  cursor: pointer;
  transition: color 0.15s ease;
  border-radius: 0;
}

.toc-item:hover {
  color: var(--primary);
}

.toc-idx {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--border-strong);
  min-width: 16px;
}

.toc-item.active {
  color: var(--primary);
  font-weight: 600;
  border-left-color: var(--primary);
}

.toc-item.active .toc-idx {
  color: var(--primary);
}
</style>
