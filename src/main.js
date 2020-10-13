import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from '@/util/cookie'
import HttpApi from '@/axios/HttpApi'
import '@a/css/common.less'

Vue.config.productionTip = false

// 全局注册
Vue.prototype.$Cookie = new Cookies()
Vue.prototype.$HttpApi = new HttpApi()
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
