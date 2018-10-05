import axios from 'axios'
import { API_ROOT } from './constants'
import { SELECT_MODEL_ACTIONS } from '@/store/lib/mixins'

export default {
  ...SELECT_MODEL_ACTIONS,
  fetchCollection: async ({ commit, state }, model_id) => {
    const { data } = await axios.get(API_ROOT)
    commit('collection', data)
    return true
  },
  selectModel: ({ commit, state }, model_id) => {
    let model = state.collection.find(m => m.id === model_id) // NOTE - this is only here b.c. generators use `id` instead of `_id`
    commit('selectedModel', model)
    commit('addon/collection', model.addons, { root: true }) // TODO - move into mediator pattern
  },
  activateGlobalOptions: ({ commit, state }) => {
    let model = state.selectedModel
    commit('')
    commit('option/collection', model.global_options, { root: true }) // TODO - move into mediator pattern
  },
  activateModelOptions: ({ commit, state }) => {
    let model = state.selectedModel
    commit('option/collection', model.model_options, { root: true }) // TODO - move into mediator pattern
  }

}
