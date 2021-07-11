const routes = [
  {
    path: '/the-input-password-js',
    name: 'the-input-password-js',
    meta: {
      auth: 3,
      name: '密码输入框-原生js'
    },
    component: () =>
      import(
        /* webpackChunkName: "input-password-js" */ '@/modules/case-show/modules/input-password-js/views/index.vue'
      )
  }
];

export default routes;
