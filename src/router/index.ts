import { createRouter, createWebHistory } from 'vue-router'

import CounterPage from '@/counter/pages/Counter1Page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter1',
      component: CounterPage
    },

  ]
})

export default router
