import { DATATYPES } from './constants'
import { COLLECTION_GETTERS, SELECT_MODEL_GETTERS, NEW_MODEL_GETTERS } from '@/store/lib/mixins'

// Addon Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...SELECT_MODEL_GETTERS,
  ...NEW_MODEL_GETTERS,
  datatypes: state => {
    return DATATYPES
  },
  selectedSchema: state => {
    return state.selectedSchema
  },
  selectedAttribute: state => {
    return state.selectedAttribute
  },
  editModel: state => {
    return state.editModel
  }
}
