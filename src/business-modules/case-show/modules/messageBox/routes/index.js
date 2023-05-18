const routes = [
  {
    path: '/messageBox',
    name: 'messageBox',
    meta: {
      auth: 3,
      name: 'messageBox'
    },
    component: () =>
      import(
        /* webpackChunkName: "messageBox" */ '@/business-modules/case-show/modules/messageBox/views/index.vue'
      )
  }
];

export default routes;
