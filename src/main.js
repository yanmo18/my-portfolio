import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
app.use(router)//安装路由插件，使整个应用都能访问到路由功能，之后模版中就可以使用router-view和router-link了组件树中的所有组件都都可以访问到router实例
app.use(i18n)
app.mount('#app')