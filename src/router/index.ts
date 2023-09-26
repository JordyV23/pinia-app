import { createRouter, createWebHistory } from 'vue-router'

import CounterPage from '@/counter/pages/Counter1Page.vue'
import CounterSetupPage from '@/counter/pages/CounterSetupPage.vue'
import ClientsLayout from '@/clients/layouts/ClientsLayout.vue'
import ListPage from '@/clients/pages/ListPage.vue'
import ClientsPage from '@/clients/pages/ClientsPage.vue'

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
    {
      path: '/clients',
      name: 'clinetes',
      component: ClientsLayout,
      redirect: {name: 'list'},
      children: [
        {path: 'list', name:'list',component: ListPage},
        {path: '/clients/:id', name:'client-id',component: ClientsPage},
      ]
    },

  ]
})

export default router
