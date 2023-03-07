import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// background
import './assets/css/background.css'

// scrollbar
import './assets/css/scrollbar.css'



const app = createApp(App)

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

// vue-toasted
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)


app.mount('#app')
