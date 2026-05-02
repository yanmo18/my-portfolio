import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import VueLazyPlugin from 'vue3-lazyload'

const app = createApp(App)
app.use(router)//安装路由插件，使整个应用都能访问到路由功能，之后模版中就可以使用router-view和router-link了组件树中的所有组件都都可以访问到router实例
app.use(i18n)
app.use(VueLazyPlugin, {
  loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHJlY3Qgd2lkdGg9IjEwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlZGUwIi8+PC9zdmc+', // 加载中占位图
  error: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTUwIDM1YzE2LjUxNyAwIDI5LjUgMTIuNDgzIDI5LjUgMjcuNUg0Ny41di01aDI1djI1aC0yNWw4LjUgMTBoLTI1bC04LjUgMTBoLTI1di0yNWg1bTI1LTI1djE1aC0xNWgtMTV2LTE1aDE1eiIgZmlsbD0iI2VkZWRlMCIvPjwvc3ZnPg==' // 加载失败占位图
})
app.mount('#app')