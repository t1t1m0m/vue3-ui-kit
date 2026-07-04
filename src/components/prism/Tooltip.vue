<script setup lang="ts">
import { ref, useId } from 'vue'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: string
  placement?: TooltipPlacement
}

withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
})

const open = ref(false)
const uid = useId()

function show() {
  open.value = true
}
function hide() {
  open.value = false
}
</script>

<template>
  <span
    class="p-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <span class="p-tooltip__trigger" :aria-describedby="open ? uid : undefined">
      <slot />
    </span>
    <transition name="p-tooltip-fade">
      <span
        v-if="open"
        :id="uid"
        role="tooltip"
        class="p-tooltip__bubble"
        :class="`p-tooltip__bubble--${placement}`"
      >
        {{ content }}
        <span class="p-tooltip__arrow" aria-hidden="true" />
      </span>
    </transition>
  </span>
</template>

<style scoped>
.p-tooltip {
  position: relative;
  display: inline-flex;
}
.p-tooltip__trigger {
  display: inline-flex;
}

.p-tooltip__bubble {
  position: absolute;
  z-index: 40;
  padding: 6px 10px;
  max-width: 220px;
  width: max-content;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-canvas);
  background: var(--color-ink);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  pointer-events: none;
}

.p-tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-ink);
  transform: rotate(45deg);
}

/* Placements */
.p-tooltip__bubble--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.p-tooltip__bubble--top .p-tooltip__arrow {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.p-tooltip__bubble--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.p-tooltip__bubble--bottom .p-tooltip__arrow {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.p-tooltip__bubble--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.p-tooltip__bubble--left .p-tooltip__arrow {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.p-tooltip__bubble--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.p-tooltip__bubble--right .p-tooltip__arrow {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.p-tooltip-fade-enter-active,
.p-tooltip-fade-leave-active {
  transition: opacity var(--dur-fast) var(--ease);
}
.p-tooltip-fade-enter-from,
.p-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
