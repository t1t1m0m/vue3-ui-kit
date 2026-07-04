<script setup lang="ts">
import { ref, watch } from 'vue'

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  modelValue: string
  items: TabItem[]
}

const props = defineProps<TabsProps>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const tabRefs = ref<HTMLButtonElement[]>([])

function select(value: string) {
  const item = props.items.find((i) => i.value === value)
  if (item?.disabled) return
  emit('update:modelValue', value)
}

function focusable(): number[] {
  return props.items.map((i, idx) => (i.disabled ? -1 : idx)).filter((i) => i >= 0)
}

function onKeydown(event: KeyboardEvent, index: number) {
  const enabled = focusable()
  const pos = enabled.indexOf(index)
  let nextIndex = index

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = enabled[(pos + 1) % enabled.length]
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = enabled[(pos - 1 + enabled.length) % enabled.length]
      break
    case 'Home':
      nextIndex = enabled[0]
      break
    case 'End':
      nextIndex = enabled[enabled.length - 1]
      break
    default:
      return
  }

  event.preventDefault()
  const item = props.items[nextIndex]
  select(item.value)
  tabRefs.value[nextIndex]?.focus()
}

// Keep refs array in sync with item count.
watch(
  () => props.items.length,
  () => (tabRefs.value = tabRefs.value.slice(0, props.items.length)),
)
</script>

<template>
  <div class="p-tabs">
    <div class="p-tabs__list" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="item.value"
        :ref="(el) => { if (el) tabRefs[index] = el as HTMLButtonElement }"
        type="button"
        role="tab"
        class="p-tabs__tab"
        :class="{ 'is-active': item.value === modelValue }"
        :aria-selected="item.value === modelValue"
        :tabindex="item.value === modelValue ? 0 : -1"
        :disabled="item.disabled"
        @click="select(item.value)"
        @keydown="onKeydown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="p-tabs__panel" role="tabpanel">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<style scoped>
.p-tabs__list {
  display: flex;
  gap: var(--space-1);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: none;
}
.p-tabs__list::-webkit-scrollbar {
  display: none;
}

.p-tabs__tab {
  position: relative;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease);
}
.p-tabs__tab::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transition: transform var(--dur) var(--ease);
}
.p-tabs__tab:hover:not(:disabled) {
  color: var(--color-ink);
}
.p-tabs__tab.is-active {
  color: var(--color-primary);
}
.p-tabs__tab.is-active::after {
  transform: scaleX(1);
}
.p-tabs__tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.p-tabs__panel {
  padding-top: var(--space-4);
}
</style>
