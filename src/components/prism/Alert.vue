<script setup lang="ts">
import { computed } from 'vue'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  tone?: AlertTone
  title?: string
  /** Show a dismiss button. */
  dismissible?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  tone: 'info',
  dismissible: false,
})

defineEmits<{ (e: 'dismiss'): void }>()

const icon = computed(() => {
  switch (props.tone) {
    case 'success':
      return 'M20 6L9 17l-5-5'
    case 'warning':
      return 'M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'
    case 'danger':
      return 'M12 8v5m0 3h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
    default:
      return 'M12 16v-5m0-3h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
  }
})
</script>

<template>
  <div class="p-alert" :class="`p-alert--${tone}`" role="alert">
    <svg class="p-alert__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path :d="icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="p-alert__content">
      <p v-if="title" class="p-alert__title">{{ title }}</p>
      <div class="p-alert__body"><slot /></div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="p-alert__close"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="16" height="16">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.p-alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-size: var(--text-base);
}

.p-alert__icon {
  width: 20px;
  height: 20px;
  flex: none;
  margin-top: 1px;
}
.p-alert__content {
  flex: 1;
  min-width: 0;
}
.p-alert__title {
  font-family: var(--font-display);
  font-weight: 600;
  margin-bottom: 2px;
}
.p-alert__body {
  color: var(--color-ink);
  opacity: 0.9;
}

.p-alert__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: inherit;
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0.7;
  flex: none;
}
.p-alert__close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.06);
}

.p-alert--info {
  background: var(--color-info-soft);
  border-color: color-mix(in srgb, var(--color-info) 24%, transparent);
  color: var(--color-info);
}
.p-alert--success {
  background: var(--color-success-soft);
  border-color: color-mix(in srgb, var(--color-success) 24%, transparent);
  color: var(--color-success);
}
.p-alert--warning {
  background: var(--color-warning-soft);
  border-color: color-mix(in srgb, var(--color-warning) 24%, transparent);
  color: var(--color-warning);
}
.p-alert--danger {
  background: var(--color-danger-soft);
  border-color: color-mix(in srgb, var(--color-danger) 24%, transparent);
  color: var(--color-danger);
}

/* Body text takes ink color; only icon/title keep the tone hue */
.p-alert__body {
  color: var(--color-ink);
}
</style>
