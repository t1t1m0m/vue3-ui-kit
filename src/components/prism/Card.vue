<script setup lang="ts">
export interface CardProps {
  /** Adds hover elevation + pointer affordance. */
  interactive?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<CardProps>(), {
  interactive: false,
  padding: 'md',
})
</script>

<template>
  <div class="p-card" :class="[`p-card--pad-${padding}`, { 'is-interactive': interactive }]">
    <header v-if="$slots.media" class="p-card__media">
      <slot name="media" />
    </header>
    <div v-if="$slots.header" class="p-card__header">
      <slot name="header" />
    </div>
    <div class="p-card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="p-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.p-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}

.p-card.is-interactive {
  cursor: pointer;
}
.p-card.is-interactive:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}

.p-card__media {
  margin: calc(-1 * var(--pad)) calc(-1 * var(--pad)) 0;
}
.p-card__media :deep(img) {
  display: block;
  width: 100%;
  height: auto;
}

.p-card--pad-sm {
  --pad: var(--space-4);
}
.p-card--pad-md {
  --pad: var(--space-5);
}
.p-card--pad-lg {
  --pad: var(--space-6);
}

.p-card__header,
.p-card__body,
.p-card__footer {
  padding-inline: var(--pad);
}
.p-card__header {
  padding-top: var(--pad);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
}
.p-card__body {
  padding-block: var(--pad);
  flex: 1;
  color: var(--color-ink);
}
.p-card__header + .p-card__body {
  padding-top: var(--space-2);
}
.p-card__footer {
  padding-bottom: var(--pad);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}
</style>
