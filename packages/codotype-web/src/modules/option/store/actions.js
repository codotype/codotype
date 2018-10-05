import cloneDeep from 'lodash/cloneDeep'
import ObjectID from 'bson-objectid'
import { DEFAULT_OPTION } from './constants'
import { SELECT_MODEL_ACTIONS, EDIT_MODEL_ACTIONS } from '@/store/lib/mixins'

// Option module actions
export default {
  ...SELECT_MODEL_ACTIONS,
  ...EDIT_MODEL_ACTIONS,
  resetNewModel ({ state, commit }) {
    let newModel = cloneDeep(DEFAULT_OPTION)
    newModel.order = state.collection.length
    return commit('newModel', newModel)
  },
  create ({ state, commit, dispatch, rootGetters }) {
    // Isolates current Attribute model and the schema to which the attribute belongs
    let model = cloneDeep(state.newModel)

    // Assigns uniaue ID to attribute model
    model._id = ObjectID().toString()

    // Updates the collection belonging to the currently selected schema
    let collection = state.collection
    collection.push(model)
    commit('collection', collection)
    commit('generator/attributes', { collection }, { root: true })
    dispatch('resetNewModel')
  },
  update ({ state, commit, dispatch }) {
    let model = cloneDeep(state.editModel)

    let collection = state.collection.map((m) => {
      if (m._id === model._id) {
        return model
      } else {
        return m
      }
    })

    commit('collection', collection)
    // commit('schema/attributes', { collection }, { root: true })
    dispatch('clearEditModel')
  },
  destroy ({ state, commit, rootGetters }, model) {
    let collection = state.collection.filter(m => m._id !== model._id)
    commit('collection', collection)
    // commit('schema/attributes', { collection }, { root: true })
  }
}
