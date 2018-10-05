import { COLLECTION_STATE, SELECT_MODEL_STATE, NEW_MODEL_STATE } from '@/store/lib/mixins'

// Addon Module State
export default {
  ...COLLECTION_STATE,
  ...SELECT_MODEL_STATE,
  ...NEW_MODEL_STATE,
  selectedAttribute: null,
  editModel: {}
}
