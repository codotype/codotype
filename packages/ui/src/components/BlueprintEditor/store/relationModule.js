import modalModule from './modules/modalModule'
import collectionModule from './modules/collectionModule'

// Relation constants
// TODO - move into @codotype/types
const DEFAULT_RELATION = {
  id: null,
  order: 0,
  type: 'BELONGS_TO', // Moved from datatypeOptions.relationType
  required: false,
  // QUESTION - add schema id here?
  related_schema_id: '',
  reverse_relation_id: '',
  as: '', // TODO - rename 'as' to something else?
  reverse_as: '' // TODO - rename 'reverse_as' to something else?
}

export default {
  namespaced: true,
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_RELATION })),
    modals: {
      namespaced: true,
      modules: {
        form: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
