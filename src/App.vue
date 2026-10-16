<template>
  <div class="app">
    <AppHeader
      :collapsed="collapsed"
      :dark="isDark"
      @toggle-drawer="drawerOpen = true"
      @toggle-sidebar="toggleSidebar"
      @set-theme="setTheme"
    />

    <div class="body">
      <aside class="sidebar" :class="{ hidden: collapsed }" aria-label="课程导航">
        <SideNav />
      </aside>

      <main class="main">
        <div class="content">
          <RouterView />
        </div>
        <footer class="site-foot">
          <span>Python 速通 · 面向 Java 开发者的 5~10 小时过关路线</span>
          <span class="muted">进度保存在浏览器本地（localStorage），不会上传</span>
        </footer>
      </main>
    </div>

    <Transition name="fade">
      <div v-if="drawerOpen" class="drawer-mask" @click="drawerOpen = false">
        <aside class="drawer" @click.stop>
          <SideNav @navigate="drawerOpen = false" />
        </aside>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SideNav from './components/SideNav.vue'
import { useProgressStore } from './stores/progress.js'
import { neighbors, lessonById } from './data/curriculum.js'

const store = useProgressStore()
const router = useRouter()

const drawerOpen = ref(false)
const collapsed = computed(() => store.sidebarCollapsed)
const isDark = computed(() => store.theme === 'dark')

/* ============ 主题 ============ */
function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function setTheme(theme) {
  store.setTheme(theme)
  applyTheme(theme)
}

watch(isDark, (dark) => applyTheme(dark ? 'dark' : 'light'), { immediate: true })

function toggleSidebar() {
  store.setSidebarCollapsed(!store.sidebarCollapsed)
}

/* ============ 学习时长统计（页面可见且非长时间空闲时才计入） ============ */
const IDLE_MS = 5 * 60 * 1000
let tickTimer = null
let lastTick = Date.now()
let lastInteraction = Date.now()

function markInteraction() {
  lastInteraction = Date.now()
}

function flushTime() {
  const now = Date.now()
  const delta = now - lastTick
  lastTick = now
  if (document.visibilityState !== 'visible') return
  if (now - lastInteraction > IDLE_MS) return
  if (delta > 0 && delta < 10 * 60 * 1000) store.addMs(delta)
}

function onVisibility() {
  if (document.visibilityState === 'hidden') flushTime()
  else {
    lastTick = Date.now()
    markInteraction()
  }
}

/* ============ 快捷键：Alt + ← / → 切换上一节 / 下一节 ============ */
function onKeydown(event) {
  markInteraction()
  if (!event.altKey) return
  const current = router.currentRoute.value
  if (current.name !== 'lesson') return
  const lesson = lessonById[current.params.id]
  if (!lesson) return
  const { prev, next } = neighbors(lesson.id)
  if (event.key === 'ArrowLeft' && prev) {
    event.preventDefault()
    router.push(`/lesson/${prev.id}`)
  }
  if (event.key === 'ArrowRight' && next) {
    event.preventDefault()
    router.push(`/lesson/${next.id}`)
  }
}

onMounted(() => {
  lastTick = Date.now()
  lastInteraction = Date.now()
  tickTimer = setInterval(flushTime, 15000)
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('beforeunload', flushTime)
  window.addEventListener('keydown', onKeydown)
  ;['mousemove', 'keydown', 'scroll', 'touchstart'].forEach((evt) =>
    window.addEventListener(evt, markInteraction, { passive: true }),
  )
})

onBeforeUnmount(() => {
  clearInterval(tickTimer)
  flushTime()
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('beforeunload', flushTime)
  window.removeEventListener('keydown', onKeydown)
  ;['mousemove', 'keydown', 'scroll', 'touchstart'].forEach((evt) =>
    window.removeEventListener(evt, markInteraction),
  )
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.body {
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-height: 0;
}

.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  position: sticky;
  top: var(--header-h);
  height: calc(100vh - var(--header-h));
  overflow: hidden;
  transition: width 0.18s ease;
}

.sidebar.hidden {
  width: 0;
  border-right: 0;
}

.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-h));
}

.content {
  flex: 1;
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 26px 26px 40px;
}

.site-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 26px 22px;
  font-size: 11.5px;
  color: var(--muted);
  border-top: 1px solid var(--border);
  max-width: 940px;
  margin: 0 auto;
  width: 100%;
}

/* 移动端抽屉 */
.drawer-mask {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(8, 12, 20, 0.5);
  display: flex;
}

.drawer {
  width: min(84vw, var(--sidebar-w));
  height: 100%;
  background: var(--surface);
  box-shadow: var(--shadow-md);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.16s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }

  .content {
    padding: 18px 14px 32px;
  }

  .site-foot {
    padding: 12px 14px 20px;
  }
}
</style>
