import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',//url 路径
    name: 'Home',//路由名称，方便在代码中引用，代码里面跳转时可以使用这个名字，而不是写死路径，增加代码的可维护性。
    component: () => import('../views/Home.vue')//懒加载，访问到这个路由时才加载这个组件，优化性能。
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')//懒加载，访问到这个路由时才加载这个组件，优化性能。
  }
]

//创建路由实例
const router = createRouter({
  history: createWebHistory(),//使用HTML5 history模式，URL无#号，看起来更简洁。
  routes
})

export default router

//router控制url和页面对应关系