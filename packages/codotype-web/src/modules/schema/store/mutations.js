// import orderBy from 'lodash/orderBy'
import { COLLECTION_MUTATIONS, SELECT_MODEL_MUTATIONS, NEW_MODEL_MUTATIONS } from '@/store/lib/mixins'

// Schema Module mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...SELECT_MODEL_MUTATIONS,
  ...NEW_MODEL_MUTATIONS,
  attributes (state, { schema_id, collection }) {
    if (schema_id) {
      let schema = state.collection.find(s => s._id === schema_id)
      schema.attributes = collection
    } else {
      state.selectedModel.attributes = collection
    }
  },
  relations (state, { schema_id, collection }) {
    if (schema_id) {
      let schema = state.collection.find(s => s._id === schema_id)
      schema.relations = collection
    } else {
      state.selectedModel.relations = collection
    }
  },
  editModel (state, schema) {
    state.editModel = schema
  }
}
