import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinListView from '@/views/CoinListView.vue'
import CoinInfoView from '@/views/CoinInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
