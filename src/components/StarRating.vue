<template>
  <span class="stars" :title="`${value} / ${max}`">
    <span class="label" v-if="label">{{ label }}</span>
    <span class="icons">
      <span v-for="i in max" :key="i" :class="['star', { on: i <= value }]">★</span>
    </span>
  </span>
</template>

<script setup>
defineProps({
  value: { type: Number, default: 1 },
  max: { type: Number, default: 5 },
  label: { type: String, default: '' },
})
</script>

<style scoped>
.stars {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.label {
  color: var(--muted);
  white-space: nowrap;
}

.icons {
  letter-spacing: 1px;
  line-height: 1;
}

.star {
  color: var(--border-strong);
  font-size: 13px;
}

.star.on {
  color: #f59e0b;
}
</style>
