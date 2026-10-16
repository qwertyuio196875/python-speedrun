/**
 * 学习进度状态：全部数据存在 localStorage，刷新不丢。
 * 存储结构见 STORAGE_KEY，版本号变化时自动丢弃旧数据。
 */
import { defineStore } from 'pinia'
import { lessons, PHASES, PRACTICE, totalMinutes } from '../data/curriculum.js'

const STORAGE_KEY = 'py-speedrun-v1'

function emptyState() {
  return {
    completed: {}, // { [lessonId]: 完成时间戳 }
    quiz: {}, // { [lessonId]: { correct, total, at } }
    practice: [], // 已完成的 Step id
    current: null, // 当前知识点 id
    visited: {}, // { [lessonId]: { count, firstAt, lastAt } }
    lastAt: null, // 最后学习时间
    totalMs: 0, // 累计学习时长（毫秒）
    theme: 'light',
    sidebarCollapsed: false,
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    return { ...emptyState(), ...parsed }
  } catch {
    return emptyState()
  }
}

export const useProgressStore = defineStore('progress', {
  state: () => load(),

  getters: {
    doneCount: (state) => Object.keys(state.completed).length,
    totalCount: () => lessons.length,
    percent() {
      if (!this.totalCount) return 0
      return Math.round((this.doneCount / this.totalCount) * 100)
    },
    /** 剩余预计学习时间（分钟）：只统计未完成的知识点 */
    remainingMinutes: (state) =>
      lessons.filter((l) => !state.completed[l.id]).reduce((sum, l) => sum + l.minutes, 0),
    totalMinutesAll: () => totalMinutes,
    /** 累计学习时长（分钟） */
    studyMinutes: (state) => Math.round(state.totalMs / 60000),
    isDone: (state) => (id) => Boolean(state.completed[id]),
    quizOf: (state) => (id) => state.quiz[id] || null,
    /** 阶段进度 */
    phaseProgress() {
      return PHASES.map((phase) => {
        const items = lessons.filter((l) => l.phaseId === phase.id)
        const done = items.filter((l) => this.completed[l.id]).length
        return {
          id: phase.id,
          name: phase.name,
          done,
          total: items.length,
          percent: items.length ? Math.round((done / items.length) * 100) : 0,
          finished: items.length > 0 && done === items.length,
        }
      })
    },
    /** 下一个建议学习的知识点：优先未完成的第一节 */
    nextLesson(state) {
      const unfinished = lessons.find((l) => !state.completed[l.id])
      if (unfinished) return unfinished
      return lessons.find((l) => l.id === state.current) || lessons[0]
    },
    practiceDoneCount: (state) => state.practice.length,
    practiceTotal: () => PRACTICE.steps.length,
    practicePercent() {
      if (!this.practiceTotal) return 0
      return Math.round((this.practiceDoneCount / this.practiceTotal) * 100)
    },
    allLessonsDone() {
      return this.totalCount > 0 && this.doneCount === this.totalCount
    },
  },

  actions: {
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
      } catch {
        /* 存储不可用时忽略，功能降级为"刷新后不保留" */
      }
    },

    /** 记录一次学习动作：更新时间戳 */
    touch() {
      this.lastAt = new Date().toISOString()
      this.persist()
    },

    setCurrent(id) {
      this.current = id
      this.touch()
    },

    visit(id) {
      if (!id) return
      const prev = this.visited[id] || { count: 0, firstAt: new Date().toISOString() }
      this.visited[id] = {
        count: prev.count + 1,
        firstAt: prev.firstAt,
        lastAt: new Date().toISOString(),
      }
      this.persist()
    },

    addMs(ms) {
      if (ms <= 0) return
      this.totalMs += ms
      this.persist()
    },

    markDone(id) {
      this.completed[id] = Date.now()
      if (this.current === id) this.current = id
      this.touch()
    },

    unmarkDone(id) {
      delete this.completed[id]
      this.touch()
    },

    toggleDone(id) {
      if (this.completed[id]) this.unmarkDone(id)
      else this.markDone(id)
    },

    recordQuiz(id, correct, total) {
      this.quiz[id] = { correct, total, at: new Date().toISOString() }
      this.touch()
    },

    markStep(stepId) {
      if (!this.practice.includes(stepId)) this.practice.push(stepId)
      this.touch()
    },

    unmarkStep(stepId) {
      this.practice = this.practice.filter((s) => s !== stepId)
      this.touch()
    },

    setTheme(theme) {
      this.theme = theme
      this.persist()
    },

    setSidebarCollapsed(collapsed) {
      this.sidebarCollapsed = collapsed
      this.persist()
    },

    /** 重置学习进度（保留主题偏好） */
    resetProgress() {
      const theme = this.theme
      const sidebarCollapsed = this.sidebarCollapsed
      Object.assign(this.$state, emptyState(), { theme, sidebarCollapsed })
      this.persist()
    },
  },
})
