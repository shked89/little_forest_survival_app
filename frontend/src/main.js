import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/router'

import './app/styles/reset.css'
import './app/styles/main.css'
import './app/styles/global.css'

createApp(App).use(router).mount('#app')
