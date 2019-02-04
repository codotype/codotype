import schemaModule from './schemaModule'
import projectModule from './projectModule'
import { DEFAULT_USER_SCHEMA } from '@codotype/types/lib/default_user'

export default {
  namespaced: true,
  actions: {
    created ({ getters, commit, dispatch }) {
      if (!getters['schema/collection/first']) {
        commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      }
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    reset ({ getters, commit, dispatch }) {
      commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      dispatch('schema/selectModel', getters['schema/collection/first'])
    }
  },
  modules: {
    schema: schemaModule,
    project: projectModule
  }
}
