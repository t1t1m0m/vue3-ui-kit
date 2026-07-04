<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Topbar from '@/components/docs/Topbar.vue'
import Sidebar from '@/components/docs/Sidebar.vue'

const sidebarOpen = ref(false)
const route = useRoute()

// Close the mobile drawer whenever the route changes.
watch(
  () => route.fullPath,
  () => (sidebarOpen.value = false),
)
</script>

<template>
  <div class="shell">
    <Topbar :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="shell__body">
      <Sidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />

      <div
        v-if="sidebarOpen"
        class="shell__scrim"
        aria-hidden="true"
        @click="sidebarOpen = false"
      />

      <main class="shell__main">
        <RouterView v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
}

.shell__body {
  display: flex;
  align-items: flex-start;
}

.shell__main {
  flex: 1;
  min-width: 0;
}

.shell__scrim {
  display: none;
}

@media (max-width: 900px) {
  .shell__scrim {
    display: block;
    position: fixed;
    inset: var(--topbar-h) 0 0 0;
    z-index: 50;
    background: rgba(16, 18, 29, 0.45);
  }
}

.route-enter-active,
.route-leave-active {
  transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.route-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.route-leave-to {
  opacity: 0;
}
</style>
