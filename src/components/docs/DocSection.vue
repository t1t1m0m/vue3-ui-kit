<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'
import Preview from './Preview.vue'

defineProps<{
  id: string
  title: string
  description: string
  code?: string
  stack?: boolean
  align?: 'center' | 'start'
}>()
</script>

<template>
  <section :id="id" class="doc" tabindex="-1">
    <div class="doc__head">
      <h2 class="doc__title">
        <a :href="`#${id}`" class="doc__anchor" :aria-label="`Link to ${title}`">#</a>
        {{ title }}
      </h2>
      <p class="doc__desc">{{ description }}</p>
    </div>

    <Preview :stack="stack" :align="align">
      <slot />
    </Preview>

    <CodeBlock v-if="code" :code="code" />

    <div v-if="$slots.notes" class="doc__notes">
      <slot name="notes" />
    </div>
  </section>
</template>

<style scoped>
.doc {
  scroll-margin-top: 88px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.doc + .doc {
  margin-top: var(--space-8);
}

.doc__title {
  position: relative;
  font-size: var(--text-2xl);
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}
.doc__anchor {
  color: var(--color-border-strong);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease);
}
.doc__anchor:hover {
  color: var(--color-primary);
}
.doc__desc {
  margin-top: var(--space-2);
  color: var(--color-muted);
  font-size: var(--text-md);
  max-width: 60ch;
}

.doc__notes {
  font-size: var(--text-sm);
  color: var(--color-muted);
}
</style>
