import cloneDeep from 'lodash/cloneDeep'
import { DEFAULT_ADDON } from './constants'
import { SELECT_MODEL_ACTIONS } from '@/store/lib/mixins'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

// Schema module actions
export default {
  ...SELECT_MODEL_ACTIONS,
  selectModel: ({ commit, state }, model_id) => {
    let model = state.collection.find(m => m._id === model_id)
    commit('selectedModel', model)
    commit('attribute/collection', model.attributes, { root: true })
  },
  create ({ state, dispatch, commit }) {
    let model = cloneDeep(state.newModel)
    dispatch('resetNewModel')
    commit('persist', { schema: model })
  },
  edit ({ state, commit }, schema) {
    commit('editModel', schema)
  },
  remove ({ state, commit }, schema) {
    let collection = state.collection.filter((s) => { return s._id !== schema._id })
    return commit('collection', collection)
  },
  resetNewModel ({ commit }) {
    let newModel = cloneDeep(DEFAULT_ADDON)
    return commit('newModel', newModel)
  },
  setLabel ({ state, commit }, { model, label }) {
    // model = { ...model, ...inflateMeta(model.label) }
    const inflated = inflateMeta(label)

    model.label = inflated.label
    model.label_plural = inflated.label_plural
    model.identifier = inflated.identifier
    model.identifier_plural = inflated.identifier_plural
    model.class_name = inflated.class_name
    model.class_name_plural = inflated.class_name_plural
    console.log(model)
    commit('newModel', model)
  }
}
