import Vue from 'vue'
import Vuex from 'vuex'
import { automatedImportForObject } from '@/util/modules/automoted-import-modules'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const getter = {}
const moudules = automatedImportForObject(require.context('@/store/modules', true, /.\/.+\.js/))

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getter,
  modules: moudules
})
