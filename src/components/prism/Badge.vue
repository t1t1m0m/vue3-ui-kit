<script setup lang="ts">
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  tone?: BadgeTone
  /** Show a leading status dot. */
  dot?: boolean
}

withDefaults(defineProps<BadgeProps>(), {
  tone: 'neutral',
  dot: false,
})
</script>

<template>
  <span class="p-badge" :class="`p-badge--${tone}`">
    <span v-if="dot" class="p-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style scoped>
.p-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 3px 10px;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.4;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  white-space: nowrap;
}

.p-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.p-badge--neutral {
  background: var(--color-surface);
  color: var(--color-muted);
  border-color: var(--color-border);
}
.p-badge--primary {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.p-badge--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}
.p-badge--warning {
  background: var(--color-warning-soft);
  color: var(--color-warning);
}
.p-badge--danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
