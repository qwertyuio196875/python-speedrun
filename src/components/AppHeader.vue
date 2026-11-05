<template>
  <header class="app-header">
    <div class="left">
      <button class="icon-btn only-mobile" title="打开导航" @click="emit('toggle-drawer')">☰</button>
      <button class="icon-btn only-desktop" :title="collapsed ? '展开导航' : '收起导航'" @click="emit('toggle-sidebar')">
        {{ collapsed ? '☰' : '⇤' }}
      </button>
      <RouterLink v-if="collapsed" class="mini-brand" to="/">
        <span class="logo">{ }</span>
        <span class="mini-name">Python 零基础教程</span>
      </RouterLink>
    </div>

    <SearchBox class="search-slot" />

    <div class="right">
      <RouterLink to="/" class="progress-chip only-desktop" :title="`已掌握 ${store.doneCount} / ${store.totalCount} 个知识点`">
        <span class="pc-text">{{ store.doneCount }}/{{ store.totalCount }}</span>
        <span class="pc-bar">
          <span class="pc-fill" :style="{ width: store.percent + '%' }" />
        </span>
        <span class="pc-pct">{{ store.percent }}%</span>
      </RouterLink>

      <a
        class="icon-btn gh-link"
        href="https://github.com/qwertyuio196875/python-speedrun"
        target="_blank"
        rel="noopener"
        title="GitHub 仓库"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>

      <button class="icon-btn" :title="isDark ? '切换到浅色模式' : '切换到深色模式'" @click="toggleTheme">
        {{ isDark ? '☀️' : '🌙' }}
      </button>

      <div class="settings" ref="settingsRef">
        <button class="icon-btn" title="设置" @click="menuOpen = !menuOpen">⋯</button>
        <div v-if="menuOpen" class="menu card">
          <div class="menu-title">外观</div>
          <div class="theme-row">
            <button :class="['theme-btn', { on: !isDark }]" @click="setTheme('light')">☀️ 浅色</button>
            <button :class="['theme-btn', { on: isDark }]" @click="setTheme('dark')">🌙 深色</button>
          </div>
          <div class="divider" />
          <div class="menu-stat">
            <span>累计学习</span>
            <strong>{{ studyText }}</strong>
          </div>
          <div class="menu-stat">
            <span>预计剩余</span>
            <strong>{{ remainingText }}</strong>
          </div>
          <div class="divider" />
          <button class="menu-item danger" @click="onReset">重置学习进度</button>
          <button class="menu-item" @click="menuOpen = false">关闭设置</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SearchBox from './SearchBox.vue'
import { useProgressStore } from '../stores/progress.js'
import { useResetProgress } from '../composables/useResetProgress.js'

const props = defineProps({
  collapsed: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle-drawer', 'toggle-sidebar', 'set-theme'])

const store = useProgressStore()
const resetProgress = useResetProgress()

const menuOpen = ref(false)
const settingsRef = ref(null)

const isDark = computed(() => props.dark)

const studyText = computed(() => {
  const m = store.studyMinutes
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

const remainingText = computed(() => {
  const m = store.remainingMinutes
  if (m === 0) return '已完成全部知识点'
  if (m < 60) return `${m} 分钟`
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分钟`
})

function toggleTheme() {
  emit('set-theme', isDark.value ? 'light' : 'dark')
}

function setTheme(theme) {
  emit('set-theme', theme)
}

async function onReset() {
  menuOpen.value = false
  await resetProgress()
}

function onDocClick(event) {
  if (settingsRef.value && !settingsRef.value.contains(event.target)) menuOpen.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.app-header {
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 40;
}

.left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.mini-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-strong);
}

.search-slot {
  flex: 1;
  max-width: 520px;
}

.right {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  flex-shrink: 0;
}

.progress-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
}

.progress-chip:hover {
  border-color: var(--primary-border);
  background: var(--primary-weak);
}

.pc-text {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--muted);
}

.pc-bar {
  width: 54px;
  height: 5px;
  border-radius: 999px;
  background: var(--surface-3);
  overflow: hidden;
}

.pc-fill {
  display: block;
  height: 100%;
  background: var(--primary);
}

.pc-pct {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--primary);
}

.gh-link svg {
  width: 18px;
  height: 18px;
  display: block;
}

.settings {
  position: relative;
}

.menu {
  position: absolute;
  right: 0;
  top: 40px;
  width: 232px;
  padding: 8px;
  z-index: 70;
  box-shadow: var(--shadow-md);
}

.menu-title {
  font-size: 11.5px;
  color: var(--muted);
  padding: 4px 8px;
}

.theme-row {
  display: flex;
  gap: 6px;
  padding: 2px 6px 6px;
}

.theme-btn {
  flex: 1;
  height: 30px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-size: 12.5px;
  cursor: pointer;
}

.theme-btn.on {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-weak);
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 6px 0;
}

.menu-stat {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: var(--muted);
  padding: 4px 8px;
}

.menu-stat strong {
  color: var(--text-strong);
  font-family: var(--font-mono);
  font-size: 12px;
}

.menu-item {
  width: 100%;
  text-align: left;
  height: 30px;
  padding: 0 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--surface-3);
}

.menu-item.danger:hover {
  background: var(--danger);
  color: #fff;
}

.only-mobile {
  display: none;
}

@media (max-width: 900px) {
  .only-mobile {
    display: inline-flex;
  }

  .only-desktop {
    display: none;
  }
}
</style>
