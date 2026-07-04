<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'

export interface ModalProps {
  modelValue: boolean
  title?: string
  description?: string
  /** Close when clicking the backdrop. */
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  closeOnBackdrop: true,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const uid = useId()
const dialogRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

function close() {
  emit('update:modelValue', false)
}

function getFocusable(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab') return

  const focusable = getFocusable()
  if (focusable.length === 0) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement as HTMLElement

  if (event.shiftKey && (active === first || !dialogRef.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.modelValue,
  async (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      lastFocused = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      await nextTick()
      const focusable = getFocusable()
      ;(focusable[0] ?? dialogRef.value)?.focus()
    } else {
      document.body.style.overflow = ''
      lastFocused?.focus?.()
      lastFocused = null
    }
  },
)

function onBackdrop() {
  if (props.closeOnBackdrop) close()
}
</script>

<template>
  <teleport to="body">
    <transition name="p-modal">
      <div v-if="modelValue" class="p-modal" @keydown="onKeydown">
        <div class="p-modal__backdrop" @click="onBackdrop" />
        <div
          ref="dialogRef"
          class="p-modal__dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? `${uid}-title` : undefined"
          :aria-describedby="description ? `${uid}-desc` : undefined"
          tabindex="-1"
        >
          <header v-if="title || $slots.header" class="p-modal__header">
            <slot name="header">
              <h2 :id="`${uid}-title`" class="p-modal__title">{{ title }}</h2>
            </slot>
            <button type="button" class="p-modal__close" aria-label="Close dialog" @click="close">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </header>
          <p v-if="description" :id="`${uid}-desc`" class="p-modal__desc">{{ description }}</p>
          <div class="p-modal__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="p-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.p-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.p-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(16, 18, 29, 0.5);
  backdrop-filter: blur(3px);
}

.p-modal__dialog {
  position: relative;
  width: 100%;
  max-width: 460px;
  max-height: calc(100vh - 2 * var(--space-4));
  overflow-y: auto;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-5);
}

.p-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}
.p-modal__title {
  font-size: var(--text-xl);
}
.p-modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: -4px -4px 0 0;
  color: var(--color-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  flex: none;
}
.p-modal__close:hover {
  background: var(--color-surface);
  color: var(--color-ink);
}

.p-modal__desc {
  margin-top: var(--space-2);
  color: var(--color-muted);
  font-size: var(--text-base);
}

.p-modal__body {
  margin-top: var(--space-4);
  color: var(--color-ink);
}

.p-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

/* Transition */
.p-modal-enter-active,
.p-modal-leave-active {
  transition: opacity var(--dur) var(--ease);
}
.p-modal-enter-active .p-modal__dialog,
.p-modal-leave-active .p-modal__dialog {
  transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease);
}
.p-modal-enter-from,
.p-modal-leave-to {
  opacity: 0;
}
.p-modal-enter-from .p-modal__dialog,
.p-modal-leave-to .p-modal__dialog {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}
</style>
