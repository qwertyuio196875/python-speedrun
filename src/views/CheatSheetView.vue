<template>
  <div class="cheat">
    <header class="head card">
      <div class="head-top">
        <span class="badge primary">速查表</span>
        <span class="badge">{{ CHEATSHEET.categories.length }} 个分类</span>
        <span class="badge">{{ cheatItems.length }} 条写法</span>
      </div>
      <h1 class="title">{{ CHEATSHEET.title }}</h1>
      <p class="sub">{{ CHEATSHEET.subtitle }}</p>

      <div class="filter">
        <span class="f-ico">🔍</span>
        <input v-model="keyword" type="text" placeholder="在速查表里找：去空格 / 遍历列表 / 读文件 / 发请求 …" />
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
      没有匹配的条目。试试：去空格、遍历列表、读文件、requests、装饰器。
    </div>

    <section v-for="cat in filteredCategories" :key="cat.name" :id="anchor(cat.name)" class="cat">
      <div class="cat-head">
        <span class="cat-icon">{{ cat.icon }}</span>
        <h2 class="cat-title">{{ cat.name }}</h2>
        <span v-if="cat.desc" class="cat-desc muted small">{{ cat.desc }}</span>
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
            <span class="cell task">{{ item.task }}</span>
            <code class="cell code">{{ item.code }}</code>
            <span class="cell note">{{ item.note }}</span>
            <span class="caret" :class="{ open: expanded.has(item.id) }">▾</span>
          </button>

          <div v-if="expanded.has(item.id)" class="detail">
            <div class="detail-text">{{ item.detail }}</div>
            <div v-if="item.code2" class="detail-alt">
              <span class="alt-label">另一种写法</span>
              <code>{{ item.code2 }}</code>
            </div>
            <CodeBlock v-if="item.example" :code="item.example.code" :output="item.example.output || ''" lang="python" title="示例" :storage-key="`cs-${item.id}`" />
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
        [item.task, item.code, item.note, item.detail, cat.name].join(' ').toLowerCase().includes(q),
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
</script>

<style scoped>
.cheat {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.head {
  padding: 20px;
}

.head-top {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.title {
  font-size: 24px;
  margin-bottom: 4px;
}

.sub {
  color: var(--muted);
  font-size: 13.5px;
  margin-bottom: 14px;
}

.filter {
  position: relative;
  margin-bottom: 14px;
}

.filter .f-ico {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
}

.filter input {
  width: 100%;
  height: 40px;
  padding: 0 38px 0 34px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-size: 14px;
  outline: none;
}

.filter input:focus {
  border-color: var(--primary);
}

.f-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
}

.cats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cat-chip {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12.5px;
  cursor: pointer;
}

.cat-chip.on {
  border-color: var(--primary);
  color: var(--primary);
}

.chip-count {
  opacity: 0.6;
  margin-left: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: var(--muted);
}

.cat {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cat-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.cat-icon {
  font-size: 18px;
}

.cat-title {
  font-size: 18px;
  margin: 0;
}

.cat-count {
  margin-left: auto;
  font-size: 12px;
}

.cat-desc {
  color: var(--muted);
}

.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  padding: 0;
  overflow: hidden;
}

.item-row {
  display: grid;
  grid-template-columns: minmax(180px, 1.2fr) minmax(160px, 1fr) minmax(180px, 1.4fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 12px 14px;
  cursor: pointer;
  font-size: 13.5px;
  color: var(--text);
}

.item-row:hover {
  background: var(--surface-2);
}

.cell.task {
  font-weight: 600;
  color: var(--text-strong);
}

.cell.code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--primary);
  background: var(--primary-weak);
  padding: 2px 6px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell.note {
  color: var(--muted);
  font-size: 12.5px;
}

.caret {
  color: var(--muted);
  transition: transform 0.15s ease;
}

.caret.open {
  transform: rotate(180deg);
}

.detail {
  border-top: 1px solid var(--border);
  padding: 14px;
  background: var(--surface-2);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-text {
  font-size: 13.5px;
  color: var(--text);
  line-height: 1.7;
}

.detail-alt {
  font-size: 12.5px;
  color: var(--text);
}

.alt-label {
  color: var(--warning);
  font-weight: 600;
  margin-right: 8px;
}

.detail-alt code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--primary);
}

.item.flash {
  box-shadow: 0 0 0 2px var(--primary);
}

@media (max-width: 760px) {
  .item-row {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'task caret'
      'code code'
      'note note';
    row-gap: 6px;
  }

  .cell.task {
    grid-area: task;
  }

  .cell.code {
    grid-area: code;
    overflow-x: auto;
    padding: 6px 8px;
  }

  .caret {
    grid-area: caret;
    align-self: center;
  }

  .cell.note {
    grid-area: note;
    grid-column: auto;
    font-size: 12.5px;
  }
}
</style>