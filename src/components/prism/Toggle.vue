<script setup lang="ts">
import { useId } from 'vue'

export interface ToggleProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const uid = useId()

function toggle() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <label class="p-toggle" :class="{ 'is-disabled': disabled }" :for="uid">
    <button
      :id="uid"
      type="button"
      role="switch"
      class="p-toggle__track"
      :class="{ 'is-on': modelValue }"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="p-toggle__thumb" aria-hidden="true" />
    </button>
    <span v-if="label" class="p-toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.p-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
}
.p-toggle.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.p-toggle__track {
  position: relative;
  width: 42px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
  cursor: inherit;
  transition: background-color var(--dur) var(--ease);
  flex: none;
}
.p-toggle__track.is-on {
  background: var(--color-primary);
}

.p-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur) var(--ease);
}
.p-toggle__track.is-on .p-toggle__thumb {
  transform: translateX(18px);
}

.p-toggle__label {
  font-size: var(--text-base);
  color: var(--color-ink);
  user-select: none;
}
</style>
