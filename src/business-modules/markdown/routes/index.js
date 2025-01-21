const routes = [
  {
    path: '/markdown',
    name: 'markdown',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "markdown" */ '@/business-modules/markdown/views/index.vue')
  }
]

export default routes
