import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import UserView from '../views/UserProfileView.vue'
import UserSettingView from '../views/UserSettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/userpg',
      redirect: '/userpg/profile'
    },
    {
      path: '/userpg/profile',
      name: 'profile',
      component: UserView
    },
    {
      path: '/userpg/setting',
      name: 'setting',
      component: UserSettingView
    }
  ]
})

export default router
