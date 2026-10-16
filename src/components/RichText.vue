<template>
  <span v-html="html" />
</template>

<script setup>
import { computed } from 'vue'
import { escapeHtml } from '../utils/highlight.js'

/**
 * 极简富文本：支持 `行内代码`、**加粗** 与换行。
 * 先整体转义再插入受控标签，避免 XSS。
 */
const props = defineProps({
  text: { type: String, default: '' },
})

const html = computed(() => {
  let s = escapeHtml(props.text || '')
  s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/\n/g, '<br>')
  return s
})
</script>
