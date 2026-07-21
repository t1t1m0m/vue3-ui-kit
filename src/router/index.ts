import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Overview from '@/views/Overview.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
    meta: { title: 'Overview' },
  },
  {
    path: '/components',
    name: 'components',
    component: () => import('@/views/Components.vue'),
    meta: { title: 'Components' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 88 }
    }
    return { top: 0 }
  },
})
