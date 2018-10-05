import cloneDeep from 'lodash/cloneDeep'
import { COLLECTION_MUTATIONS, SELECT_MODEL_MUTATIONS } from '@/store/lib/mixins'

// // // //

export default {
  ...COLLECTION_MUTATIONS,
  ...SELECT_MODEL_MUTATIONS,
  // TODO - move into schema module
  removeSchema (state, { schema }) {
    let schemas = []
    state.selectedModel.schemas.forEach((s) => {
      if (s._id !== schema._id) {
        schemas.push(s)
      }
    })
    state.selectedModel.schemas = schemas
  },
  // TODO - abstract into editModel mixin
  edit (state, { _id }) { // TODO - DEPRECATE CURRENT
    state.edit = true
    state.selectedModel = cloneDeep(state.collection.find(m => m._id === _id))
  },
  remove (state, { record }) {
    state.collection = state.collection.filter(s => s._id !== record._id)
  },
  newModel (state, newModel) {
    state.newModel = newModel
  }
}
