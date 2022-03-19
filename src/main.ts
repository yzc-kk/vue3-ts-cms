import { createApp } from 'vue'
import { globalRegister } from './global'

import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// 注册 element-plus
app.use(globalRegister).use(store)
setupStore()
app.use(router)

app.mount('#app')
