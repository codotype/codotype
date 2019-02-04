import { inflateMeta } from '@codotype/util/lib/inflateMeta'

export default {
  namespaced: true,
  state: {
    label: '',
    identifier: ''
  },
  mutations: {
    label (state, label) {
      state.label = label
    },
    identifier (state, label) {
      const { identifier } = inflateMeta(label)
      state.identifier = identifier
    }
  },
  getters: {
    label: state => {
      return state.label
    },
    identifier: state => {
      return state.identifier
    }
  }
}
