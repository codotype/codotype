import cloneDeep from 'lodash/cloneDeep'
import ObjectID from 'bson-objectid'
import router from '@/routers'
import { DEFAULT_RECORD } from './constants'
import { SELECT_MODEL_ACTIONS, EDIT_MODEL_ACTIONS } from '@/store/lib/mixins'

// Record module actions
export default {
  ...SELECT_MODEL_ACTIONS,
  ...EDIT_MODEL_ACTIONS,
  resetNewModel ({ state, commit }, schema_id) {
    let newModel = cloneDeep(DEFAULT_RECORD)
    newModel.schema_id = schema_id
    return commit('newModel', newModel)
  },
  create ({ state, commit, dispatch }) {
    let collection = state.collection
    let model = cloneDeep(state.newModel)
    model._id = ObjectID().toString()
    collection.push(model)

    commit('collection', collection)
    router.go(-1)
    dispatch('resetNewModel')
  },
  update ({ state, commit, rootGetters, dispatch }) {
    let model = cloneDeep(state.editModel)

    // Validates datatypes before persist
    // TODO - wrap all of this in a try-catch block, add error handling to RecordForm
    // Checks each of the model's attributes against the attributes defined in the schema
    const schema = rootGetters['schema/collection'].find(s => { return s._id === model.schema_id })
    schema.attributes.forEach((attr) => {
      // Ensures proper JSON format
      if (attr.datatype === 'JSON') {
        model.attributes[attr.identifier] = JSON.parse(model.attributes[attr.identifier])
      }
    })

    // Updates the collection
    let collection = state.collection.map((m) => {
      if (m._id === model._id) {
        return model
      } else {
        return m
      }
    })

    commit('collection', collection)
    router.go(-1)
    dispatch('clearEditModel')
  },
  // TODO - why this method isn't working?
  destroy ({ state, commit }, model) {
    let collection = state.collection.filter(m => m._id !== model._id)
    commit('collection', collection)
  }
}
