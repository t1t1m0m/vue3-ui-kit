<script setup lang="ts">
import { computed, useId } from 'vue'

export interface InputProps {
  modelValue?: string
  label?: string
  placeholder?: string
  helper?: string
  error?: string
  type?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const uid = useId()
const helperId = computed(() => `${uid}-help`)
const hasError = computed(() => Boolean(props.error))

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="p-field" :class="{ 'is-invalid': hasError, 'is-disabled': disabled }">
    <label v-if="label" :for="uid" class="p-field__label">
      {{ label }}
      <span v-if="required" class="p-field__req" aria-hidden="true">*</span>
    </label>
    <div class="p-field__control">
      <span v-if="$slots.prefix" class="p-field__affix"><slot name="prefix" /></span>
      <input
        :id="uid"
        class="p-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="hasError || undefined"
        :aria-describedby="helper || error ? helperId : undefined"
        @input="onInput"
      />
      <span v-if="$slots.suffix" class="p-field__affix"><slot name="suffix" /></span>
    </div>
    <p v-if="error" :id="helperId" class="p-field__msg p-field__msg--error">{{ error }}</p>
    <p v-else-if="helper" :id="helperId" class="p-field__msg">{{ helper }}</p>
  </div>
</template>

<style scoped>
.p-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.p-field__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink);
}
.p-field__req {
  color: var(--color-danger);
}

.p-field__control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-inline: var(--space-3);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
}
.p-field__control:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.p-field__affix {
  display: inline-flex;
  color: var(--color-muted);
  flex: none;
}

.p-field__input {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-ink);
  background: transparent;
  border: none;
  outline: none;
}
.p-field__input::placeholder {
  color: var(--color-muted);
}

.p-field.is-invalid .p-field__control {
  border-color: var(--color-danger);
}
.p-field.is-invalid .p-field__control:focus-within {
  box-shadow: 0 0 0 3px var(--color-danger-soft);
}

.p-field.is-disabled {
  opacity: 0.6;
}
.p-field.is-disabled .p-field__control {
  background: var(--color-surface);
  cursor: not-allowed;
}

.p-field__msg {
  font-size: var(--text-xs);
  color: var(--color-muted);
}
.p-field__msg--error {
  color: var(--color-danger);
  font-weight: 500;
}
</style>
