import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/interface/pages/HomePage.vue'
import GamePage from '@/interface/pages/GamePage.vue'
import AboutPage from '@/interface/pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/game', name: 'game', component: GamePage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
})

export default router
