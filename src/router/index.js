import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import memberinfo from '../components/MemberInfo.vue'
import Memberinfopage from '../views/Memberinfopage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/pot',
    name: 'Pot',
    component: () => import('../views/Pot.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import('../views/Check.vue')
  },
  {
    path: '/memberinfopage',
    name: 'memberinfopage',
    component: Memberinfopage
  },
  {
    path: '/memberinfo',
    name: 'memberinfo',
    component: memberinfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
