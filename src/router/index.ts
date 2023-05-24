import { createRouter, createWebHistory } from 'vue-router'
import CoinListView from '@/views/CoinListView.vue'
import CoinInfoView from '@/views/CoinInfoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'coinList',
      component: CoinListView
    },
    {
      path: '/coin/:id',
      component: CoinInfoView
    }
  ]
})

export default router
