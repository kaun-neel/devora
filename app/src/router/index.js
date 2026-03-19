import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import DebuggerPage from '../views/DebuggerPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import EditProfilePage from '../views/EditProfilePage.vue'
import CodePage from '../views/CodePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/debugger',
      name: 'debugger',
      component: DebuggerPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: EditProfilePage
    },
    {
      path: '/code',
      name: 'code',
      component: CodePage
    }
  ]
})

export default router
