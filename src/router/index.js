import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/projects',
    component: () => import('../views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () => import('../views/admin/AdminProjects.vue')
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('../views/admin/AdminProfile.vue')
      },
      {
        path: 'awards',
        name: 'AdminAwards',
        component: () => import('../views/admin/AdminAwards.vue')
      },
      {
        path: 'experience',
        name: 'AdminExperience',
        component: () => import('../views/admin/AdminExperience.vue')
      },
      {
        path: 'resume',
        name: 'AdminResume',
        component: () => import('../views/admin/AdminResume.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('admin_token') === 'authenticated'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router