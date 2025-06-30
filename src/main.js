import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { VueSpinnersPlugin } from 'vue3-spinners'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)
app.use(VueSpinnersPlugin)

app.mount('#app')
