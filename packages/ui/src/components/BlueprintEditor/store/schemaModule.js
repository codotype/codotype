import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import { NEW_SCHEMA_MODEL } from '@codotype/types/lib/default_schema'
import formModule from './modules/formModule'
import modalModule from './modules/modalModule'
import collectionModule from './modules/collectionModule'
import selectModelModule from './modules/selectModelModule'
import attributeModule from './attributeModule'
import relationModule from './relationModule'

export default {
  namespaced: true,
  actions: {
    selectModel ({ commit }, model) {
      commit('selectedModel/id', model.id)
      commit('attribute/collection/items', model.attributes)
      commit('relation/collection/items', model.relations)
    },
    setLabel ({ getters, commit }, label) {
      const newModel = getters['collection/newModel']

      const {
        label_plural,
        identifier,
        identifier_plural,
        class_name,
        class_name_plural
      } = inflateMeta(label)

      newModel.label = label // TODO - titleize
      newModel.label_plural = label_plural
      newModel.identifier = identifier
      newModel.identifier_plural = identifier_plural
      newModel.class_name = class_name
      newModel.class_name_plural = class_name_plural

      commit('collection/newModel', newModel)
    },
    updateAttributes ({ state, getters, dispatch }) {
      const model = getters['selectedModel']
      model.attributes = state.attribute.collection.items
      dispatch('collection/insert', model)
    },
    updateRelations ({ state, getters, dispatch }) {
      const model = getters['selectedModel']
      model.relations = state.relation.collection.items
      dispatch('collection/insert', model)
    }
  },
  getters: {
    selectedModel: state => {
      return state.collection.items.find(i => i.id === state.selectedModel.id)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: NEW_SCHEMA_MODEL })),
    selectedModel: Object.assign({}, selectModelModule),
    destroy_modal: Object.assign({}, modalModule),
    attribute: attributeModule,
    relation: relationModule,
    modals: {
      namespaced: true,
      modules: {
        form: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
