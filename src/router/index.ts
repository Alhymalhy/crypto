import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinListView from '@/views/CoinListView.vue'
import CoinInfoView from '@/views/CoinInfoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/coinList',
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
