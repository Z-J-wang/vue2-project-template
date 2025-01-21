// initial state
const state = {
  userInfo: {}
}

// mutations
const mutations = {
  user(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  mutations
}
