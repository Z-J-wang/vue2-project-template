// 全局注册组件
export default Vue => {
  Vue.component('base-template', () => import(/* webpackChunkName: "base-template" */ '@/components/template/base-template.vue'));
  Vue.component('template-code', () => import(/* webpackChunkName: "template-code" */ '@/components/template/template-code.vue'));
};
