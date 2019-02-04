// Exports a items build around a basic model prototype
export default function ({ NEW_MODEL }) {

  return {
    namespaced: true,
    state: {
      defaultNewModel: Object.assign({}, NEW_MODEL),
      newModel: Object.assign({}, NEW_MODEL),
      editModel: Object.assign({}, NEW_MODEL),
      items: []
    },
    mutations: {
      items (state, items) {
        state.items = items
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
      items (state) {
        return state.items
      },
      first (state) {
        return state.items[0]
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

        // Updates state.items
        commit('items', [...state.items, createdModel])
      },
      update ({ state, commit }) {
        // Updates items
        const items = state.items.map((model) => {
          if (model.id !== state.editModel.id) return model
          return state.editModel
        })
        commit('items', items)

        // Resets state.editModel
        commit('resetEditModel')
      },
      insert ({ state, commit }, model) { // Invoked from one module level above in a Vuex store
        const collection = state.items.map((m) => {
          if (model.id !== m.id) return m
          return model
        })
        commit('items', collection)
      },
      destroy ({ state, commit }, modelId) {
        const items = state.items.filter(m => m.id !== modelId)
        commit('items', items)
      }
    }

  }

}
