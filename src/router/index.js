import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/projects',
    component: () => import('../views/admin/AdminLayout.vue'),
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

export default router