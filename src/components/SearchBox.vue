<template>
  <div class="search" ref="rootRef">
    <div class="search-input" :class="{ focused }">
      <span class="ico">🔍</span>
      <input
        ref="inputRef"
        v-model="keyword"
        type="text"
        placeholder="搜索 Python 知识点…（装饰器 / async / dict / FastAPI）"
        @focus="focused = true"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="goActive"
        @keydown.esc="clear"
      />
      <button v-if="keyword" class="clear" @click="clear">✕</button>
    </div>

    <div v-if="focused && keyword.trim()" class="results card">
      <div v-if="!results.length" class="empty">
        <div class="empty-title">没有匹配的知识点</div>
        <div class="empty-sub">试试：装饰器、async、dict、FastAPI、Pydantic</div>
      </div>
      <button
        v-for="(item, i) in results"
        :key="item.path + item.id"
        class="result"
        :class="{ active: i === cursor }"
        @mouseenter="cursor = i"
        @click="go(item)"
      >
        <span class="r-title">
          <span class="type" :class="item.type">{{ item.type === 'lesson' ? '知识点' : '速查' }}</span>
          {{ item.title }}
        </span>
        <span class="r-path">{{ item.breadcrumb }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { search } from '../data/curriculum.js'

const router = useRouter()
const keyword = ref('')
const focused = ref(false)
const cursor = ref(0)
const rootRef = ref(null)
const inputRef = ref(null)

const results = computed(() => search(keyword.value, 10))

watch(results, () => {
  cursor.value = 0
})

function move(delta) {
  if (!results.value.length) return
  cursor.value = (cursor.value + delta + results.value.length) % results.value.length
}

function go(item) {
  router.push(item.path)
  clear()
}

function goActive() {
  if (results.value.length) go(results.value[cursor.value])
}

function clear() {
  keyword.value = ''
  cursor.value = 0
  inputRef.value?.blur()
  focused.value = false
}

function onDocClick(event) {
  if (rootRef.value && !rootRef.value.contains(event.target)) focused.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.search {
  position: relative;
  flex: 1;
  max-width: 480px;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  transition: all 0.15s ease;
}

.search-input.focused {
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--primary-weak);
}

.ico {
  font-size: 12px;
  opacity: 0.7;
}

input {
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-strong);
  font-size: 13.5px;
  font-family: inherit;
  min-width: 0;
}

input::placeholder {
  color: var(--muted);
}

.clear {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
}

.results {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 60;
  padding: 6px;
  max-height: 60vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
}

.result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.result.active {
  background: var(--primary-weak);
}

.r-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text-strong);
}

.type {
  font-size: 10.5px;
  padding: 0 5px;
  border-radius: 4px;
  border: 1px solid var(--primary-border);
  color: var(--primary);
  background: var(--primary-weak);
}

.type.cheatsheet {
  border-color: var(--border-strong);
  color: var(--muted);
  background: var(--surface-3);
}

.r-path {
  font-size: 11.5px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.empty {
  padding: 14px 12px 16px;
}

.empty-title {
  font-size: 13.5px;
  color: var(--text-strong);
}

.empty-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 3px;
}
</style>
