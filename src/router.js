import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from './views/DashBoard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('./views/Customers.vue')
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('./views/Staff.vue')
    }
  ]
})
