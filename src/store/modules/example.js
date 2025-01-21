// initial state
const state = {
  exampleState: {}
}

// mutations
const mutations = {
  user(state, data) {
    state.exampleState = data
  }
}

// 注意：导出必须用 export default
export default {
  state,
  mutations
}
