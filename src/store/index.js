import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server_url: process.env.VUE_APP_SERVER_URL, // 后台服务器网址
    account: {
      type: Object
    },
    userinfo: {
      type: Object
    }
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setUserinfo(state, userinfo){
      state.userinfo = userinfo;
    }
  },
  actions: {},
  modules: {}
});
