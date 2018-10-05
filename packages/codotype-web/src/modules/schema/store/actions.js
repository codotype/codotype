import cloneDeep from 'lodash/cloneDeep'
import ObjectID from 'bson-objectid'
import { DEFAULT_SCHEMA } from './constants'
import { SELECT_MODEL_ACTIONS } from '@/store/lib/mixins'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

// Schema module actions
export default {
  ...SELECT_MODEL_ACTIONS,
  selectModel: ({ commit, dispatch, state }, model_id) => {
    let model = state.collection.find(m => m._id === model_id)
    commit('selectedModel', model)
    dispatch('edit', model)
    commit('attribute/collection', model.attributes, { root: true })
    commit('relation/collection', model.relations, { root: true })
  },
  create ({ state, dispatch, commit }) {
    // Clones state.newModel
    let model = cloneDeep(state.newModel)

    // Assigns model meta
    model = {
      ...model,
      ...inflateMeta(model.label)
    }

    // Assigns ID
    model._id = ObjectID().toString()

    // Updates collection
    const collection = state.collection
    collection.push(model)
    commit('collection', collection)

    // Resets state.newModel
    dispatch('resetNewModel')

    // Selects the newly created model
    dispatch('selectModel', model._id)
  },
  edit ({ state, commit }, schema) {
    commit('editModel', cloneDeep(schema))
  },
  update ({ state, commit }, schema) {
    let collection = state.collection.map((s) => {
      if (s._id === schema._id) {
        s.label = schema.label // TODO - titleize
        s.label_plural = schema.label_plural
        s.identifier = schema.identifier
        s.identifier_plural = schema.identifier_plural
        s.class_name = schema.class_name
        s.class_name_plural = schema.class_name_plural
      }
      return s
    })
    return commit('collection', collection)
  },
  remove ({ state, commit }, schema) {
    let newCollection = []
    state.collection.forEach((s) => {
      if (s._id !== schema._id) newCollection.push(s)
    })
    return commit('collection', newCollection)
  },
  resetNewModel ({ commit }) {
    let newModel = cloneDeep(DEFAULT_SCHEMA)
    return commit('newModel', newModel)
  },
  setLabel ({ state, commit }, { schema, label }) {
    const {
      label_plural,
      identifier,
      identifier_plural,
      class_name,
      class_name_plural
    } = inflateMeta(label)

    schema.label = label // TODO - titleize
    schema.label_plural = label_plural
    schema.identifier = identifier
    schema.identifier_plural = identifier_plural
    schema.class_name = class_name
    schema.class_name_plural = class_name_plural
  }
}
