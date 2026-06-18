import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@componentry-ui/theme/styles/light.css"
import "@componentry-ui/theme/styles/dark.css"
const app = createApp(App)

app.use(router)

app.mount('#app')
