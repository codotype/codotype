import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import modalModule from './modules/modalModule'
import collectionModule from './modules/collectionModule'
import { DEFAULT_ATTRIBUTE } from '@codotype/types/lib/default_attribute'

export default {
  namespaced: true,
  actions: {
    setLabel ({ commit, }, label) {
      const newModel = getters['collection/newModel']
      const { identifier } = inflateMeta(label)

      // Assigns the new label & identifier values
      newModel.label = label
      newModel.identifier = identifier

      commit('collection/newModel', newModel)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_ATTRIBUTE })),
    modals: {
      namespaced: true,
      modules: {
        new: Object.assign({}, modalModule),
        edit: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
