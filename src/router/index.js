import { createRouter, createWebHashHistory } from 'vue-router'
import { lessonById } from '../data/curriculum.js'

const routes = [
  { path: '/', name: 'overview', component: () => import('../views/OverviewView.vue'), meta: { title: '学习总览' } },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: () => import('../views/LessonView.vue'),
    meta: { title: '知识点' },
  },
  { path: '/practice', name: 'practice', component: () => import('../views/PracticeView.vue'), meta: { title: '综合实战' } },
  { path: '/cheatsheet', name: 'cheatsheet', component: () => import('../views/CheatSheetView.vue'), meta: { title: 'Java → Python 速查表' } },
  { path: '/finish', name: 'finish', component: () => import('../views/FinishView.vue'), meta: { title: '通关' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const lesson = to.name === 'lesson' ? lessonById[to.params.id] : null
  const title = lesson ? `${lesson.title} · Python 速通` : `${to.meta.title || 'Python 速通'} · Python 速通`
  document.title = title
})

export default router
