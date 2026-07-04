import { ref } from 'vue'

/**
 * Tiny clipboard helper with a "copied" flag that auto-resets.
 * Falls back to a hidden textarea when the async Clipboard API
 * is unavailable (e.g. insecure origins).
 */
export function useClipboard(resetAfter = 1600) {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy(text: string): Promise<void> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const el = document.createElement('textarea')
        el.value = text
        el.style.position = 'fixed'
        el.style.opacity = '0'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      copied.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => (copied.value = false), resetAfter)
    } catch {
      copied.value = false
    }
  }

  return { copied, copy }
}
