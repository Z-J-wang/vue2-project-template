const routes = [
  {
    path: '/pagination',
    name: 'pagination',
    meta: {
      auth: 3,
      name: '基于 element-ui 的分页控件二次开发'
    },
    component: () => import(/* webpackChunkName: "case-show" */ '@/modules/case-show/modules/pagination/views/index.vue')
  }
];

export default routes;
