const routes = [
  {
    path: '/markdown',
    name: 'markdown',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "markdown" */ '@/modules/markdown/views/index.vue')
  }
];

export default routes;
