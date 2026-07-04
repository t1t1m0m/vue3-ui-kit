<script setup lang="ts">
import { computed, ref } from 'vue'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  /** Show a small presence dot. */
  status?: 'online' | 'offline' | null
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  status: null,
})

const failed = ref(false)
const showImage = computed(() => Boolean(props.src) && !failed.value)

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

// Deterministic hue from the name so fallbacks stay stable + varied.
const hue = computed(() => {
  let h = 0
  for (let i = 0; i < props.name.length; i++) {
    h = (h * 31 + props.name.charCodeAt(i)) % 360
  }
  return h
})
</script>

<template>
  <span
    class="p-avatar"
    :class="`p-avatar--${size}`"
    :style="{ '--avatar-hue': hue }"
    role="img"
    :aria-label="name"
  >
    <img v-if="showImage" :src="src" :alt="name" class="p-avatar__img" @error="failed = true" />
    <span v-else class="p-avatar__initials" aria-hidden="true">{{ initials }}</span>
    <span
      v-if="status"
      class="p-avatar__status"
      :class="`is-${status}`"
      :aria-label="status"
    />
  </span>
</template>

<style scoped>
.p-avatar {
  --sz: 40px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--sz);
  height: var(--sz);
  border-radius: 50%;
  overflow: visible;
  flex: none;
  background: hsl(var(--avatar-hue, 250) 70% 92%);
  color: hsl(var(--avatar-hue, 250) 55% 38%);
  font-family: var(--font-display);
  font-weight: 600;
  user-select: none;
}
[data-theme='dark'] .p-avatar {
  background: hsl(var(--avatar-hue, 250) 45% 26%);
  color: hsl(var(--avatar-hue, 250) 80% 82%);
}

.p-avatar--sm {
  --sz: 28px;
  font-size: var(--text-xs);
}
.p-avatar--md {
  --sz: 40px;
  font-size: var(--text-base);
}
.p-avatar--lg {
  --sz: 56px;
  font-size: var(--text-lg);
}

.p-avatar__img,
.p-avatar__initials {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.p-avatar__img {
  object-fit: cover;
}
.p-avatar__initials {
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-avatar__status {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 28%;
  height: 28%;
  border-radius: 50%;
  border: 2px solid var(--color-surface-raised);
}
.p-avatar__status.is-online {
  background: var(--color-success);
}
.p-avatar__status.is-offline {
  background: var(--color-muted);
}
</style>
