import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeAdmin from '../views/Admin/HomeAdmin.vue'
import UserView from '../views/User/ViewShape.vue'
import ManageShape from '../views/Admin/ManageShape.vue'
import CreateShape from '../views/Admin/CreateShape.vue'
import EditShape from '../views/Admin/EditShape.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: HomeAdmin
    },
    {
      path: '/admin/shapes',
      name: 'manageShapes',
      component: ManageShape
    },
    {
      path: '/admin/shapes/create',
      name: 'createShape',
      component: CreateShape
    },
    {
      path: '/admin/shapes/:id/edit',
      name: 'editShape',
      component: EditShape
    }
  ]
})

export default router
