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
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => import('./views/Subscriptions.vue')
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('./views/Staff.vue')
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('./views/Documentation.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/ContactUs.vue')
    },
    {
      path: '/about',
      name: 'about System',
      component: () => import('./views/About.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    }
  ]
})
