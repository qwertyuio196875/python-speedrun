<template>
  <div class="cheat">
    <header class="head card">
      <div class="head-top">
        <span class="badge primary">速查表</span>
        <span class="badge">{{ CHEATSHEET.categories.length }} 个分类</span>
        <span class="badge">{{ cheatItems.length }} 条对照</span>
      </div>
      <h1 class="title">{{ CHEATSHEET.title }}</h1>
      <p class="sub">{{ CHEATSHEET.subtitle }}</p>

      <div class="filter">
        <span class="f-ico">🔍</span>
        <input v-model="keyword" type="text" placeholder="在速查表里过滤：ArrayList / dict / await / FastAPI …" />
        <button v-if="keyword" class="f-clear" @click="keyword = ''">✕</button>
      </div>

      <div class="cats">
        <button
          v-for="cat in filteredCategories"
          :key="cat.name"
          class="cat-chip"
          :class="{ on: keyword && cat.items.length }"
          @click="jump(cat.name)"
        >
          {{ cat.icon }} {{ cat.name }}
          <span class="chip-count">{{ cat.items.length }}</span>
        </button>
      </div>
    </header>

    <div v-if="!filteredCategories.length" class="empty card">
      没有匹配的条目。试试：ArrayList、dict、await、Pydantic、Maven。
    </div>

    <section v-for="cat in filteredCategories" :key="cat.name" :id="anchor(cat.name)" class="cat">
      <div class="cat-head">
        <span class="cat-icon">{{ cat.icon }}</span>
        <h2 class="cat-title">{{ cat.name }}</h2>
        <span class="cat-count muted">{{ cat.items.length }} 条</span>
      </div>

      <div class="items">
        <div
          v-for="item in cat.items"
          :key="item.id"
          :id="item.id"
          class="item card"
          :class="{ open: expanded.has(item.id), flash: highlightId === item.id }"
        >
          <button class="item-row" @click="toggle(item.id)">
            <span class="cell java">
              <span class="cell-label">Java</span>
              <code>{{ item.java }}</code>
            </span>
            <span class="arrow">→</span>
            <span class="cell python">
              <span class="cell-label">Python</span>
              <code>{{ item.python }}</code>
            </span>
            <span class="cell note">{{ item.note }}</span>
            <span class="caret" :class="{ open: expanded.has(item.id) }">▾</span>
          </button>

          <div v-if="expanded.has(item.id)" class="detail">
            <div class="detail-text">{{ item.detail }}</div>
            <CodeBlock v-if="item.code" :code="item.code" :output="item.output || ''" lang="python" title="示例" :storage-key="`cs-${item.id}`" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CHEATSHEET, cheatItems } from '../data/curriculum.js'
import { useProgressStore } from '../stores/progress.js'
import CodeBlock from '../components/CodeBlock.vue'

const route = useRoute()
const store = useProgressStore()

const keyword = ref('')
const expanded = reactive(new Set())
const highlightId = ref('')

const anchor = (name) => `cat-${name}`

const filteredCategories = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return CHEATSHEET.categories
  return CHEATSHEET.categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        [item.java, item.python, item.note, item.detail, cat.name].join(' ').toLowerCase().includes(q),
      ),
    }))
    .filter((cat) => cat.items.length)
})

function toggle(id) {
  if (expanded.has(id)) expanded.delete(id)
  else expanded.add(id)
}

function jump(name) {
  const el = document.getElementById(anchor(name))
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function flash(id) {
  expanded.add(id)
  highlightId.value = id
  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => (highlightId.value = ''), 2200)
  })
}

// 支持从搜索/其他页面直接跳转到某一条
watch(
  () => route.query.item,
  (id) => {
    if (typeof id === 'string' && id) flash(id)
  },
  { immediate: true },
)

onMounted(() => {
  store.setCurrent('cheatsheet')
})
</script>

<style scoped>
.cheat {
  display: flex;
  flex-direction: column;
  gap: 22px;
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

.filter {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  margin-top: 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
}

.filter:focus-within {
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--primary-weak);
}

.f-ico {
  font-size: 12px;
  opacity: 0.7;
}

.filter input {
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-strong);
  font-size: 13.5px;
  font-family: inherit;
  min-width: 0;
}

.f-clear {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.cats {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.cat-chip {
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-size: 12.5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cat-chip:hover,
.cat-chip.on {
  border-color: var(--primary-border);
  color: var(--primary);
  background: var(--primary-weak);
}

.chip-count {
  font-family: var(--font-mono);
  font-size: 10.5px;
  opacity: 0.8;
}

.empty {
  padding: 22px;
  color: var(--muted);
  font-size: 13.5px;
}

.cat {
  scroll-margin-top: calc(var(--header-h) + 12px);
}

.cat-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.cat-title {
  font-size: 17px;
}

.cat-count {
  font-size: 12px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.item.open {
  border-color: var(--primary-border);
}

.item.flash {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-weak);
}

.item-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20px minmax(0, 1fr) minmax(0, 1.05fr) 18px;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 13px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.item-row:hover {
  background: var(--surface-2);
}

.cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.cell code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-strong);
  background: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell-label {
  font-size: 10px;
  letter-spacing: 0.04em;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--border);
  color: var(--muted);
  flex-shrink: 0;
}

.cell.java .cell-label {
  color: #b45309;
  border-color: transparent;
  background: var(--warning-weak);
}

.cell.python .cell-label {
  color: var(--primary);
  border-color: transparent;
  background: var(--primary-weak);
}

.arrow {
  color: var(--muted);
  text-align: center;
  font-size: 12px;
}

.cell.note {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

.caret {
  color: var(--muted);
  font-size: 11px;
  transition: transform 0.15s ease;
}

.caret.open {
  transform: rotate(180deg);
}

.detail {
  padding: 0 13px 14px;
  border-top: 1px dashed var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
}

.detail-text {
  font-size: 13.5px;
  color: var(--text);
}

@media (max-width: 820px) {
  .item-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .arrow {
    display: none;
  }

  .caret {
    display: none;
  }

  .item.open .item-row {
    background: var(--surface-2);
  }
}
</style>
