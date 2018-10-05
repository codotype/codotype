import cloneDeep from 'lodash/cloneDeep'
import { NEW_MODEL_ACTIONS } from '@/store/lib/mixins'
import { DEFAULT_BUILD_STAGE } from './constants'
const GENERATE_ROUTE = '/api/generate'
const DownloadFile = require('downloadjs')

export default {
  ...NEW_MODEL_ACTIONS,
  selectApp ({ state, commit, dispatch }, app_id) {
    // Sets newModel.app_id
    const newModel = cloneDeep(state.newModel)
    newModel.app_id = app_id
    commit('newModel', newModel)

    // sets project.state.selectedModel
    dispatch('project/selectModel', app_id, { root: true })
  },
  // TODO - stage management should be moved into the `stage` module
  addNewStage ({ state, rootGetters, commit, dispatch }, generator_id) {
    // Checks to ensure this generator isn't already in the build
    if (state.newModel.stages.map(stage => stage.generator_id).includes(generator_id)) return

    // Creates newStage, assigns generator_id
    const newStage = cloneDeep(DEFAULT_BUILD_STAGE)
    newStage.generator_id = generator_id

    // // // //
    // Generates stage configuration object
    // TODO - abstract into @codotype/util

    const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)

    function buildConfiguration (generator, blueprint) {
      const configuration = {
        options: {},
        model_options: {}
      }

      // Defines global options
      generator.global_options.forEach((opt) => {
        configuration.options[opt.identifier] = opt.default_value
      })

      // Defines model options
      const defaultModelOptions = {}
      generator.model_options.forEach((opt) => {
        defaultModelOptions[opt.identifier] = opt.default_value
      })

      // Creates an instance of defaultModelOptions in
      // configuration.model_options for each model in the blueprint
      blueprint.schemas.forEach((model) => {
        configuration.model_options[model._id] = cloneDeep(defaultModelOptions)
      })

      // Returns configuration object
      console.log(configuration)
      return configuration
    }
    // // // //

    // Pulls the blueprint to define the build configuration
    const blueprint = rootGetters['project/selectedModel']

    // Generates the stage's configuration from the selected generator
    newStage.configuration = buildConfiguration(generatorMeta, blueprint)

    // Adds the newStage to state.newModel
    const newModel = cloneDeep(state.newModel)

    // TODO - should only be added to newModel.stages
    // once it's been created in the `stage` module
    newModel.stages.push(newStage)
    commit('newModel', newModel)
    commit('choosingGenerator', false)

    // sets generator.state.selectedModel
    // TODO - should be moved into the `stage` store
    // TODO - should be part of `stage/selectModel` action
    dispatch('generator/selectModel', generator_id, { root: true })
  },
  selectStage ({ state, commit, dispatch }, stage_id) {
    console.log('SELECT STAGE')
  },

  // generate
  // Builds the application on the server
  // TODO - this needs error handling!
  generate: ({ rootGetters, state, commit }) => {
    // Pulls requisite data from state
    const { stages } = state.newModel
    const app = rootGetters['project/selectedModel']

    // Defines build object to send to the server
    let build = { app, stages }

    // Sets `state.fetching` to `true`
    commit('fetching', true)

    // Generates the app and downloads the response
    return fetch(GENERATE_ROUTE, {
      method: 'post',
      body: JSON.stringify({ build }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then((response) => { return response.blob() })
    .catch((err) => {
      commit('fetching', false)
      console.log('ERR ERR')
      throw err
      // return reject(err)
    })
    .then((blob) => {
      commit('fetching', false)
      // console.log('GENERATED')
      // console.log(blob)
      DownloadFile(blob, `${app.identifier}_codotype.zip`, 'application/zip')
    })
  }

}
