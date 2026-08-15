import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/app/pages/HomePage.vue'
import GamePage from '@/app/pages/GamePage.vue'
import AboutPage from '@/app/pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/game', name: 'game', component: GamePage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
})

export default router
