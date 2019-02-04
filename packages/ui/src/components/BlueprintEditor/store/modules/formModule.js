// TODO - annotate the purpose and usage of this Vuex module
export default {
  namespaced: true,
  state: {
    showingModal: false
  },
  getters: {
    showingModal: state => state.showingModal
  },
  mutations: {
    showingModal (state, bool) {
      state.showingModal = bool
    }
  },
  actions: {}
}
