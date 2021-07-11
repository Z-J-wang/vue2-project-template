import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import util from '@/util/index';
import Cookies from './util/cookie';
import Axios from './axios/index.js';
import initExtendsFN from '@/extends/index';

import '@a/css/common.less';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/atom-one-light.css';
import globalDirectives from '@/global-components/index';

Vue.config.productionTip = false;
Vue.prototype.$Cookie = new Cookies();
Vue.prototype.$HttpApi = new Axios();
Vue.prototype.$Util = util;

// 全局注册 element-ui
Vue.use(ElementUI);
Vue.use(VueHighlightJS);
Vue.use(globalDirectives);
initExtendsFN();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
