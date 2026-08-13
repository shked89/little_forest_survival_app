import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/router'

import './interface/styles/reset.css'
import './interface/styles/main.css'
import './interface/styles/global.css'

createApp(App).use(router).mount('#app')
