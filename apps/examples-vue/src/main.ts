import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@componentry/theme/styles/light.css"
import "@componentry/theme/styles/dark.css"
const app = createApp(App)

app.use(router)

app.mount('#app')
