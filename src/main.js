import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Router'ı import et
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(router) // Vue Router'ı kullan
app.mount('#app')
