import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'prism-theme'

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Shared singleton state so every consumer stays in sync.
const theme = ref<Theme>(resolveInitialTheme())

function apply(value: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
}

apply(theme.value)

watch(theme, (value) => {
  apply(value)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, value)
  }
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function set(value: Theme) {
    theme.value = value
  }

  return { theme, toggle, set }
}
