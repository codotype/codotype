import { COLLECTION_STATE, SELECT_MODEL_STATE } from '@/store/lib/mixins'
import { EXAMPLE_COLLECTION } from './examples'

export default {
  ...COLLECTION_STATE,
  ...SELECT_MODEL_STATE,
  exampleCollection: EXAMPLE_COLLECTION,
  new: false,
  edit: false,
  newModel: {}
}
