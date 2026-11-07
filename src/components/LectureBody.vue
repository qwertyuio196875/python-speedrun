<template>
  <div class="lecture">
    <template v-for="(block, i) in parsedBlocks" :key="i">
      <ul v-if="block.type === 'list'" class="lecture-list">
        <li v-for="(item, j) in block.items" :key="j"><RichText :text="item" /></li>
      </ul>
      <p v-else class="lecture-p"><RichText :text="block.text" /></p>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RichText from './RichText.vue'

const props = defineProps({
  blocks: { type: Array, required: true }, // string[]，行以 "- " 开头的是列表项
})

const parsedBlocks = computed(() => {
  const out = []
  for (const raw of props.blocks) {
    const line = String(raw)
    if (line.startsWith('- ')) {
      const item = line.slice(2).trim()
      const last = out[out.length - 1]
      if (last && last.type === 'list') last.items.push(item)
      else out.push({ type: 'list', items: [item] })
    } else {
      out.push({ type: 'p', text: line })
    }
  }
  return out
})
</script>

<style scoped>
.lecture {
  max-width: 72ch;
}

.lecture-p {
  margin: 0 0 14px;
  font-size: 16px;
  line-height: 1.85;
  color: var(--text);
}

.lecture-list {
  margin: 2px 0 16px 0;
  padding: 0 0 0 22px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.lecture-list li {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--text);
}
</style>
