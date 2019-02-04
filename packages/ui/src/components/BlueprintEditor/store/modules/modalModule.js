// TODO - annotate the purpose and usage of this Vuex module
// showing indicates whether or not the modal in question is being displayed to the end user
export default {
  namespaced: true,
  state: {
    showing: false
  },
  getters: {
    showing: state => state.showing
  },
  mutations: {
    showing (state, bool) {
      state.showing = bool
    }
  }
}
