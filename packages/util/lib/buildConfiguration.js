const cloneDeep = require('lodash/cloneDeep')

function buildConfiguration ({ blueprint, generator }) {
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

  // // // //
  // OPTION_GROUPS Implementation
  generator.option_groups.forEach((group) => {
    console.log(group)

    // Handles OPTION_GROUP_TYPE_MODEL_ADDON
    if (group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
      // Defines an object on to store the addon instance data
      const instanceData = {}

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      blueprint.schemas.forEach((schema) => { instanceData[schema.identifier] = [] })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = instanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
      // Defines an object on to store the addon instance data
      const instanceData = {}

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      blueprint.schemas.forEach((schema) => {
        const schemaOptions = {}
        group.attributes.forEach(attr => schemaOptions[attr.identifier] = attr.default_value)
        instanceData[schema.identifier] = schemaOptions
      })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = instanceData
    }
    // TODO - define and handle other OPTION_GROUP_TYPE_* definitions
  })

  // // // //

  // Returns configuration object
  // console.log(configuration)
  return configuration
}

module.exports = buildConfiguration
