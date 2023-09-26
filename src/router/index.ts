import { createRouter, createWebHistory } from 'vue-router'

import CounterPage from '@/counter/pages/Counter1Page.vue'
import CounterSetupPage from '@/counter/pages/CounterSetupPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter1',
      component: CounterPage
    },
    {
      path: '/setup',
      name: 'counter2',
      component: CounterSetupPage
    },

  ]
})

export default router
