// 全局注册组件
export default Vue => {
  Vue.component('base-template', () =>
    import(
      /* webpackChunkName: "base-template" */ '@/global-components/modules/base-template.vue'
    )
  );
  Vue.component('template-code', () =>
    import(
      /* webpackChunkName: "template-code" */ '@/global-components/modules/template-code.vue'
    )
  );
};
