<script setup lang="ts">
import { useClipboard } from '@/composables/useClipboard'

const props = defineProps<{
  code: string
  language?: string
}>()

const { copied, copy } = useClipboard()
</script>

<template>
  <div class="code">
    <div class="code__bar">
      <span class="code__lang">{{ language ?? 'vue' }}</span>
      <button type="button" class="code__copy" @click="copy(props.code)">
        <svg v-if="!copied" viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <pre class="code__pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
}

.code__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-raised);
}
.code__lang {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.code__copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
}
.code__copy:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.code__pre {
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.7;
  color: var(--color-ink);
  tab-size: 2;
}
</style>
