import { DATATYPES, RELATION_TYPES } from './constants'
import { COLLECTION_GETTERS, SELECT_MODEL_GETTERS, NEW_MODEL_GETTERS } from '@/store/lib/mixins'

// Schema Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...SELECT_MODEL_GETTERS,
  ...NEW_MODEL_GETTERS,
  datatypes: state => {
    return DATATYPES
  },
  relationTypes: state => {
    return RELATION_TYPES
  },
  selectedSchema: state => {
    return state.selectedSchema
  },
  selectedAttribute: state => {
    return state.selectedAttribute
  },
  selectedRelation: state => {
    return state.selectedRelation
  },
  editModel: state => {
    return state.editModel
  }
}
