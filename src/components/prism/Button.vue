<script setup lang="ts">
import { computed } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  /** Renders full container width. */
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false,
  type: 'button',
})

defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button
    :type="type"
    class="p-btn"
    :class="[`p-btn--${variant}`, `p-btn--${size}`, { 'is-loading': loading, 'is-block': block }]"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="p-btn__spinner" aria-hidden="true" />
    <span v-if="$slots.icon && !loading" class="p-btn__icon"><slot name="icon" /></span>
    <span class="p-btn__label"><slot>Button</slot></span>
  </button>
</template>

<style scoped>
.p-btn {
  --btn-h: 40px;
  --btn-px: var(--space-4);
  --btn-fs: var(--text-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: var(--btn-h);
  padding-inline: var(--btn-px);
  font-family: var(--font-display);
  font-size: var(--btn-fs);
  font-weight: 600;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
}

.p-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.p-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.p-btn.is-block {
  display: flex;
  width: 100%;
}

/* Sizes */
.p-btn--sm {
  --btn-h: 32px;
  --btn-px: var(--space-3);
  --btn-fs: var(--text-sm);
  border-radius: var(--radius-sm);
}
.p-btn--lg {
  --btn-h: 48px;
  --btn-px: var(--space-5);
  --btn-fs: var(--text-md);
}

/* Variants */
.p-btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-ink);
  box-shadow: var(--shadow-sm);
}
.p-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.p-btn--secondary {
  background: var(--color-surface-raised);
  color: var(--color-ink);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}
.p-btn--secondary:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.p-btn--ghost {
  background: transparent;
  color: var(--color-ink);
}
.p-btn--ghost:hover:not(:disabled) {
  background: var(--color-surface);
}

.p-btn--danger {
  background: var(--color-danger);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.p-btn--danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}

.p-btn__icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
}

.p-btn__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: p-btn-spin 0.6s linear infinite;
}

.p-btn.is-loading .p-btn__label {
  opacity: 0.9;
}

@keyframes p-btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
