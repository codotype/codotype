const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const { inflate } = require('@codotype/util/lib/inflate')

// // // //
// Constants

const OUTPUT_DIRECTORY = 'build'
const MODULES_ROOT = 'node_modules'
const GENERATOR_META_FILENAME = 'codotype-generator-meta.json'
const GENERATOR_CLASS_PATH = 'generator'
const GENERATOR_README_FILENAME = 'README.md'

// // // //

// CodotypeRuntime class definition
module.exports = class CodotypeRuntime {

  // constructor
  // Handles options to run a single generator instance
  constructor(options = {}) {

    // Assigns this.options
    this.options = options;

    // Assigns this.generators
    this.generators = [];

    // Assigns this.options.cwd
    this.options.cwd = process.cwd();

    // Returns the runtime instance
    return this
  }

  // registerGenerator
  // Registers an individual generator by it's node_modules name
  // i.e. 'codotype-generator-nuxt' in `node_modules/codotype-generator-nuxt'`
  registerGenerator ({ module_path, relative_path, absolute_path }) {

    // Resolves path to generator
    let engine_path = ''

    // Generator is located in node_modules
    if (module_path) {
      engine_path = path.join(this.options.cwd, MODULES_ROOT, module_path)
    } else if (relative_path) {
      engine_path = path.join(this.options.cwd, relative_path)
    } else {
      engine_path = absolute_path
    }

    // Construct the module path
    const generator_path = path.join(engine_path, GENERATOR_CLASS_PATH)
    const generator_meta_path = path.join(engine_path, GENERATOR_META_FILENAME)
    const generator_readme_path = path.join(engine_path, GENERATOR_README_FILENAME)

    // console.log(generator_path)
    // console.log(generator_meta_path)
    // console.log(generator_readme_path)

    // Try to load up the generator & associated metadata, catch error
    try {
      // Require the class dynamically
      const GeneratorClass = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const GeneratorMeta = require(generator_meta_path); // eslint-disable-line import/no-dynamic-require

      // Pull in the generator's README.md
      const foundReadme = fs.existsSync(generator_readme_path);

      // Adds generator to this.generators if requirements are met
      if (GeneratorClass && GeneratorMeta && foundReadme) {

        // Adds generator_path (VERY IMPORTANT) to GeneratorMeta
        GeneratorMeta.generator_path = generator_path

        // Adds readme_markown to GeneratorMeta
        GeneratorMeta.readme = fs.readFileSync(generator_readme_path, 'utf8')

        // Tracks GeneratorMeta in this.generators
        this.generators.push(GeneratorMeta)

        // Logs
        console.info(`Registered ${GeneratorClass.name} generator`)
        return
      }

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('REGISTRATION ERROR - GENERATOR NOT FOUND')
      } else {
        console.log('REGISTRATION ERROR - OTHER')
        throw err;
      }
    }
  }

  // TODO - integrate into INTERNAL generator
  // async writeBuildManifest ({ build }) {
  //   return new Promise((resolve, reject) => {
  //     // Makes /build/buildId
  //     this.fs.mkdirSync(__dirname + `/build/${buildId}`)
  //     // Writes blazeplate.json file
  //     this.fs.writeFile(__dirname + `/build/${buildId}/blazeplate.json`, JSON.stringify(req.body, null, 2), (err) => {
  //       if (err) throw err;
  //       // console.log(`Build ${buildId} manfiest saved`);
  //       return resolve()
  //     });
  //   });
  // }

  // getGenerators
  // Returns an array of generators registered to this runtime instance
  getGenerators () {
    return this.generators;
  }

  // write
  // Method for write files to the filesystem
  async execute ({ build }) {

    // Pulls attributes out of build object
    // TODO - rename `app` to `blueprint`
    let { id, app, stages } = build

    // Inflates application metadata
    // TODO - handle missing app object
    console.log('RUNTIME!!!')
    app = inflate({ blueprint: app });

    // Runs stage of the build array
    // TODO - accept OUTPUT_DIRECTORY override
    // TODO - conflate each stage to its respective generator,
    // skipping / throwing errors on those whos generator is missing
    return Promise.each(stages, async ({ generator_id, configuration }) => {
      // stages.forEach(async ({ generator_id, configuration }) => {

      // Pulls generator from registry
      const generator = this.generators.find(g => g.id === generator_id)
      if (!generator) return
      const { generator_path, project_path } = generator

      // Sets output_directory default to build ID by default
      const output_directory = id || '';

      // Assigns `dest` option for generator
      // TODO - handle condition of missing app.identifier
      const dest = path.join(this.options.cwd, OUTPUT_DIRECTORY, output_directory, app.identifier, project_path);

      // Try to load up the generator from generator_path, catch error
      // TODO - this final check should be abstracted into a separate function
      try {
        const GeneratorClass = require(generator_path); // eslint-disable-line import/no-dynamic-require
        const resolved = require.resolve(generator_path);

        // Defines options for
        const generator_options = {
          app,
          dest,
          resolved,
          configuration
        }

        // Logging
        console.info(`Executing ${GeneratorClass.name} generators:`)
        return new Promise(async (resolve, rejcet) => {
          await new GeneratorClass(generator_options).write(this.options)
          return resolve()
        })

        // Logs which generator is being run
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.log('RUNTIME ERROR - GENERATOR NOT FOUND')
        } else {
          console.log('RUNTIME ERROR - OTHER')
          throw err;
        }
        return reject(err)
      }

    }).then(() => {
      // Thank you message
      console.log('\nBuild complete\nThank you for using Codotype :)\nFollow us on github.com/codotype\n')
    })
  }
}
