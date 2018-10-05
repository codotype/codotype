import orderBy from 'lodash/orderBy'
import ObjectID from 'bson-objectid'
import { COLLECTION_MUTATIONS, SELECT_MODEL_MUTATIONS, NEW_MODEL_MUTATIONS } from '@/store/lib/mixins'

// Addon Module mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...SELECT_MODEL_MUTATIONS,
  ...NEW_MODEL_MUTATIONS,
  attributes (state, { schema_id, collection }) {
    if (schema_id) {
      let schema = state.collection.find(m => m._id === schema_id)
      schema.attributes = collection
    } else {
      state.selectedModel.attributes = collection
    }
  },
  // REMOVE BELOW THIS LINE
  persist (state, { schema }) {
    if (schema._id) {
      state.collection = state.collection.map((s) => {
        if (s._id === schema._id) {
          return schema
        } else {
          return s
        }
      })
    } else {
      schema._id = ObjectID().toString()
      state.collection.push(schema)
    }
    // Updates attributes order
    schema.attributes = orderBy(schema.attributes, ['order'], ['asc'])
  },
  editSchema (state, { schema }) {
    state.selectedSchema = schema
  }
}
