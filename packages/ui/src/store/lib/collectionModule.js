// Exports a collection build around a basic model prototype
export default function ({ NEW_MODEL }) {

  return {
    namespaced: true,
    state: {
      defaultNewModel: Object.assign({}, NEW_MODEL),
      newModel: Object.assign({}, NEW_MODEL),
      editModel: Object.assign({}, NEW_MODEL),
      collection: []
    },
    mutations: {
      collection (state, collection) {
        state.collection = collection
      },
      resetNewModel (state) {
        state.newModel = state.defaultNewModel
      },
      resetEditModel (state) {
        state.editModel = state.defaultNewModel
      },
      newModel (state, model) {
        state.newModel = Object.assign({}, model)
      },
      editModel (state, model) {
        state.editModel = Object.assign({}, model)
      }
    },
    getters: {
      collection (state) {
        return state.collection
      },
      newModel (state) {
        return Object.assign({}, state.newModel)
      },
      editModel (state) {
        return Object.assign({}, state.editModel)
      }
    },
    actions: {
      create ({ state, commit }) {
        // Sets up createdModel
        const createdModel = Object.assign({}, state.newModel);
        createdModel.id = Math.random()

        // Resets state.newModel()
        commit('resetNewModel')

        // Updates state.collection
        commit('collection', [...state.collection, createdModel])
      },
      update ({ state, commit }) {
        // Updates collection
        const collection = state.collection.map((model) => {
          if (model.id !== state.editModel.id) return model
          return state.editModel
        })
        commit('collection', collection)

        // Resets state.editModel
        commit('resetEditModel')
      },
      destroy ({ state, commit }, modelId) {
        const collection = state.collection.filter(m => m.id !== modelId)
        commit('collection', collection)
      }
    }

  }

}
