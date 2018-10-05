import {
  COLLECTION_STATE,
  SELECT_MODEL_STATE,
  NEW_MODEL_STATE,
  EDIT_MODEL_STATE
} from '@/store/lib/mixins'

// Attribute Module State
export default {
  ...COLLECTION_STATE,
  ...SELECT_MODEL_STATE,
  ...NEW_MODEL_STATE,
  ...EDIT_MODEL_STATE
}
