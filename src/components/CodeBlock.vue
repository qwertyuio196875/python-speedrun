<template>
  <div class="code-shell">
    <div class="code-head">
      <div class="code-title">
        <span class="lang">{{ langLabel }}</span>
        <span class="t" v-if="title">{{ title }}</span>
      </div>
      <div class="code-actions">
        <button v-if="runnable" class="code-btn run" @click="run">▶ 运行</button>
        <button class="code-btn" @click="copy">{{ copied ? '已复制' : '复制' }}</button>
        <button v-if="editable && !editing" class="code-btn" @click="startEdit">编辑</button>
        <template v-if="editing">
          <button class="code-btn" @click="reset">重置</button>
          <button class="code-btn" @click="editing = false">完成</button>
        </template>
      </div>
    </div>

    <textarea
      v-if="editing"
      ref="editorRef"
      v-model="draft"
      class="code-editor"
      spellcheck="false"
      :rows="editorRows"
      @keydown.tab.prevent="insertTab"
    />
    <pre v-else class="code-body" v-html="highlighted" />

    <div v-if="running || result !== null" class="terminal">
      <span class="term-label">>>> 运行输出</span>
      <span v-if="running" class="term-out">执行中…</span>
      <span v-else class="term-out">{{ result || '（没有输出）' }}</span>
    </div>

    <div v-if="note" class="code-note">
      <RichText :text="note" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { highlight } from '../utils/highlight.js'
import RichText from './RichText.vue'

const props = defineProps({
  code: { type: String, default: '' },
  /** 预置的示例输出；点击运行会以模拟方式展示 */
  output: { type: String, default: '' },
  title: { type: String, default: '' },
  lang: { type: String, default: 'python' },
  note: { type: String, default: '' },
  editable: { type: Boolean, default: true },
  runnable: { type: Boolean, default: true },
  /** 传入后，编辑内容会按此 key 草稿保存在 localStorage */
  storageKey: { type: String, default: '' },
})

const LANG_LABEL = { python: 'Python', java: 'Java', json: 'JSON', bash: 'Shell', text: 'Text' }
const langLabel = computed(() => LANG_LABEL[props.lang] || props.lang)

const draft = ref(props.code)
const editing = ref(false)
const running = ref(false)
const result = ref(null)
const copied = ref(false)
const editorRef = ref(null)

const draftKey = computed(() => (props.storageKey ? `py-speedrun-draft:${props.storageKey}` : ''))

const highlighted = computed(() => highlight(draft.value, props.lang))
const editorRows = computed(() => Math.min(30, Math.max(3, draft.value.split('\n').length + 1)))
const edited = computed(() => draft.value !== props.code)

// 恢复草稿 / 代码变更时同步，并复位上一次的运行状态（换知识点时会复用组件实例）
watch(
  () => props.code,
  (val) => {
    running.value = false
    result.value = null
    editing.value = false
    draft.value = val
    if (draftKey.value) {
      const saved = localStorage.getItem(draftKey.value)
      if (saved && saved !== val) draft.value = saved
    }
  },
  { immediate: true },
)

watch(draft, (val) => {
  if (draftKey.value) {
    try {
      localStorage.setItem(draftKey.value, val)
    } catch {
      /* 忽略存储失败 */
    }
  }
})

async function startEdit() {
  editing.value = true
  await nextTick()
  editorRef.value?.focus()
}

function reset() {
  draft.value = props.code
  result.value = null
  if (draftKey.value) localStorage.removeItem(draftKey.value)
}

function insertTab(event) {
  const el = event.target
  const { selectionStart: s, selectionEnd: e, value } = el
  draft.value = value.slice(0, s) + '    ' + value.slice(e)
  nextTick(() => {
    el.selectionStart = el.selectionEnd = s + 4
  })
}

async function copy() {
  try {
    await navigator.clipboard.writeText(draft.value)
  } catch {
    const el = document.createElement('textarea')
    el.value = draft.value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  ElMessage({ message: '代码已复制', type: 'success', duration: 1200 })
  setTimeout(() => (copied.value = false), 1200)
}

function run() {
  running.value = true
  result.value = null
  const started = Date.now()
  const delay = 260
  setTimeout(() => {
    running.value = false
    const elapsed = Date.now() - started - delay
    const out = props.output
    if (edited.value) {
      result.value = out
        ? `${out}\n\n# 提示：这里展示的是示例代码的输出。修改后的代码需要在本机运行 Python 才能看到真实结果。`
        : '# 提示：这里展示的是示例代码的输出。修改后的代码需要在本机运行 Python 才能看到真实结果。'
    } else {
      result.value = out
    }
    void elapsed
  }, 260)
}
</script>

<style scoped>
.code-note {
  padding: 8px 14px 10px;
  border-top: 1px solid var(--code-border);
  background: rgba(255, 255, 255, 0.03);
  color: #93a3b8;
  font-size: 12.5px;
  line-height: 1.65;
}

.code-note :deep(.inline-code) {
  background: rgba(255, 255, 255, 0.08);
  border-color: transparent;
  color: #dbe6f5;
}
</style>
