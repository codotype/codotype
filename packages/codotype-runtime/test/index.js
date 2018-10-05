const CodotypeRuntime = require('../index.js');
const LibraryExampleApp = require('@codotype/generator/examples/library.json')

// // // //

// Test runtime.registerGenerator('...')
// TODO - this test file should implement a local dummy generator to test registration
const runtime = new CodotypeRuntime()
runtime.registerGenerator({ module_path: 'codotype-generator-nuxt' })
// console.log(runtime.getGenerators())

// Test runtime.execute({ build })
const build = {
  app: LibraryExampleApp,
  stages: [{
    generator_id: 'codotype-generator-nuxt',
    configuration: {}
  }]
}

runtime.execute({ build })
.then(() => {
  console.log('FINISHED BUILD')
})

