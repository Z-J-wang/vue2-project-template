import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import exampleRoutes from './modules/exampleRoutes'

Vue.use(VueRouter)

// 为了防止相关过大导致 Routes 数组太长造成路由配置查阅编辑的不便，我们可以依照模块将 routes 进行拆分提取
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...exampleRoutes
]

const router = new VueRouter({
  routes
})

export default router
