const routes = [
  {
    path: '/the-editor',
    name: 'the-editor',
    meta: {
      auth: 3,
      name: '富文本编辑器-wangEditor'
    },
    component: () =>
      import(
        /* webpackChunkName: "case-show" */ '@/modules/case-show/modules/the-editor/views/index.vue'
      )
  }
];

export default routes;
