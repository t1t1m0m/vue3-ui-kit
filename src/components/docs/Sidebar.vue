<script setup lang="ts">
import { useRoute } from 'vue-router'
import { componentNav } from './navigation'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'navigate'): void }>()

const route = useRoute()
</script>

<template>
  <aside class="sidebar" :class="{ 'is-open': open }" aria-label="Component navigation">
    <nav class="sidebar__nav">
      <div class="sidebar__group">
        <p class="sidebar__title">Get started</p>
        <ul class="sidebar__list">
          <li>
            <RouterLink to="/" class="sidebar__link" @click="emit('navigate')">Overview</RouterLink>
          </li>
          <li>
            <RouterLink to="/components" class="sidebar__link" @click="emit('navigate')">
              All components
            </RouterLink>
          </li>
        </ul>
      </div>

      <div v-for="group in componentNav" :key="group.title" class="sidebar__group">
        <p class="sidebar__title">{{ group.title }}</p>
        <ul class="sidebar__list">
          <li v-for="link in group.links" :key="link.hash">
            <RouterLink
              :to="{ path: '/components', hash: link.hash }"
              class="sidebar__link sidebar__link--sub"
              :class="{ 'is-current': route.path === '/components' && route.hash === link.hash }"
              @click="emit('navigate')"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: var(--topbar-h);
  align-self: start;
  width: var(--sidebar-w);
  height: calc(100vh - var(--topbar-h));
  overflow-y: auto;
  padding: var(--space-5) var(--space-4) var(--space-6);
  border-right: 1px solid var(--color-border);
  background: var(--color-canvas);
  flex: none;
}

.sidebar__group + .sidebar__group {
  margin-top: var(--space-5);
}
.sidebar__title {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  margin-bottom: var(--space-2);
}
.sidebar__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sidebar__link {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-muted);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.sidebar__link:hover {
  color: var(--color-ink);
  background: var(--color-surface);
}
.sidebar__link.router-link-exact-active,
.sidebar__link.is-current {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: var(--topbar-h);
    left: 0;
    z-index: 60;
    transform: translateX(-100%);
    box-shadow: var(--shadow-lg);
    transition: transform var(--dur) var(--ease);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
}
</style>
