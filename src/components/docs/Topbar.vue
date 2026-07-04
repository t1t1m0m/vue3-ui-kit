<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

defineProps<{ sidebarOpen: boolean }>()
const emit = defineEmits<{ (e: 'toggle-sidebar'): void }>()

const { theme, toggle } = useTheme()
</script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <button
        type="button"
        class="topbar__hamburger"
        :aria-expanded="sidebarOpen"
        aria-label="Toggle navigation"
        @click="emit('toggle-sidebar')"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <RouterLink to="/" class="wordmark" aria-label="Prism UI home">
        <span class="wordmark__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M12 3 L22 20 H2 Z" fill="url(#pm)" />
            <defs>
              <linearGradient id="pm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#5B3DF5" />
                <stop offset="1" stop-color="#FF9E7D" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span class="wordmark__text">Prism<span class="wordmark__ui"> UI</span></span>
      </RouterLink>

      <span class="topbar__version">v1.0</span>
    </div>

    <nav class="topbar__right">
      <RouterLink to="/components" class="topbar__nav-link">Components</RouterLink>
      <a
        class="topbar__nav-link topbar__nav-link--muted"
        href="https://vuejs.org"
        target="_blank"
        rel="noopener"
        >Docs</a
      >
      <button
        type="button"
        class="theme-toggle"
        role="switch"
        :aria-checked="theme === 'dark'"
        :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        @click="toggle"
      >
        <svg v-if="theme === 'light'" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
          <path
            d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 70;
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-inline: var(--space-5);
  background: color-mix(in srgb, var(--color-canvas) 82%, transparent);
  backdrop-filter: saturate(1.4) blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.topbar__hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: var(--color-ink);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.wordmark__mark {
  display: inline-flex;
}
.wordmark__text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-lg);
  letter-spacing: -0.02em;
  color: var(--color-ink);
}
.wordmark__ui {
  color: var(--color-primary);
}

.topbar__version {
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.topbar__nav-link {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-ink);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
}
.topbar__nav-link:hover {
  color: var(--color-primary);
}
.topbar__nav-link--muted {
  color: var(--color-muted);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: var(--color-ink);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
}
.theme-toggle:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

@media (max-width: 900px) {
  .topbar__hamburger {
    display: inline-flex;
  }
  .topbar__version,
  .topbar__nav-link {
    display: none;
  }
  .topbar {
    padding-inline: var(--space-4);
  }
}
</style>
