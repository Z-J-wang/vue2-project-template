import modulesRoutes from '@/business-modules/case-show/util/getModulesRoutes'

let routes = [
  {
    path: '/case-show',
    name: 'case-show',
    meta: {
      scrollToTop: true
    },
    component: () => import(/* webpackChunkName: "case-show" */ '@/business-modules/case-show/views/index.vue')
  },
  ...modulesRoutes
]

export default routes
