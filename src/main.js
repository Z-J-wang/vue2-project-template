import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 全局引入 element-ui start */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 全局引入 element-ui end */

/* 全局引入 vue-highlightjs start */
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-light.css'
/* 全局引入 vue-highlightjs end */

/* 自定义全局插件引入 start */
import '@a/css/common.less'
import util from '@/util/index'
import Axios from './axios/index.js'
import initPluginsFN from '@/plugins/index'
import globalDirectives from '@/global-components/index'
/* 自定义全局插件引入 end */

Vue.config.productionTip = false
Vue.prototype.$Cookie = new util.cookie()
Vue.prototype.$HttpApi = new Axios()
Vue.prototype.$Util = util

// 全局注册 element-ui
Vue.use(ElementUI)
Vue.use(VueHighlightJS)
Vue.use(globalDirectives)
initPluginsFN()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
