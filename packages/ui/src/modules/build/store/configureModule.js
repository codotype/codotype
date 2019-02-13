// import cloneDeep from 'lodash/cloneDeep'
// import { DEFAULT_BUILD_STAGE } from './constants'
// import buildConfiguration from '@codotype/util/lib/buildConfiguration'

export default {
  namespaced: true,
  state: {
    exists: true
  },
  actions: {
    addNewStage ({ state, rootGetters, commit, dispatch }, generator_id) {
      // Checks to ensure this generator isn't already in the build
      // if (state.newModel.stages.map(stage => stage.generator_id).includes(generator_id)) return

      // Creates newStage, assigns generator_id
      // const newStage = cloneDeep(DEFAULT_BUILD_STAGE)
      // newStage.generator_id = generator_id

      // // // //
      // Generates stage configuration object
      // TODO - abstract into @codotype/util??
      // const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)

      // Pulls the blueprint to define the build configuration
      // const blueprint = rootGetters['blueprint/selectedModel']

      // Generates the stage's configuration from the selected generator
      // newStage.configuration = buildConfiguration({ schemas: blueprint.schemas, generator: generatorMeta })

      // once it's been created in the `stage` module
      // newModel.stages.push(newStage)
      // commit('newModel', newModel)
    }
  },
  mutations: {},
  getters: {},
  modules: {}
}