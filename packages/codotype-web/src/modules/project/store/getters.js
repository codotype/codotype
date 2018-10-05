import { COLLECTION_GETTERS, SELECT_MODEL_GETTERS } from '@/store/lib/mixins'
import { inflate } from '@codotype/util/lib/inflate'

// Project Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...SELECT_MODEL_GETTERS,
  exampleCollection: state => {
    return state.exampleCollection
  },
  newModel: state => {
    return state.newModel
  },
  inflated: state => {
    return inflate({ blueprint: state.selectedModel })
  }
}
