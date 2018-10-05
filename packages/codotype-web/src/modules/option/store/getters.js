import {
  COLLECTION_GETTERS,
  SELECT_MODEL_GETTERS,
  NEW_MODEL_GETTERS,
  EDIT_MODEL_GETTERS
} from '@/store/lib/mixins'

import {
  OPTION_TYPES
} from './constants'

// Attribute Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...SELECT_MODEL_GETTERS,
  ...NEW_MODEL_GETTERS,
  ...EDIT_MODEL_GETTERS,
  option_types: state => {
    return OPTION_TYPES
  }
}
