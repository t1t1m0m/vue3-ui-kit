<script setup lang="ts">
defineProps<{
  /** Stack items vertically instead of a centered row. */
  stack?: boolean
  align?: 'center' | 'start'
}>()
</script>

<template>
  <div class="preview" :class="{ 'is-stack': stack, 'is-start': align === 'start' }">
    <div class="preview__inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.preview {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  /* Subtle checkerboard so translucent components read clearly */
  background-color: var(--color-surface);
  background-image:
    linear-gradient(45deg, var(--checker) 25%, transparent 25%),
    linear-gradient(-45deg, var(--checker) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--checker) 75%),
    linear-gradient(-45deg, transparent 75%, var(--checker) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

.preview__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  min-height: 140px;
  padding: var(--space-6);
}
.preview.is-start .preview__inner {
  justify-content: flex-start;
}
.preview.is-stack .preview__inner {
  flex-direction: column;
  align-items: stretch;
}
</style>
