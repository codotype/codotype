const ejs = require('ejs')
const path = require('path');
const fsExtra = require('fs-extra')
const trailingComma = require('@codotype/util/lib/trailingComma')

// // // //

// CodotypeGenerator class definition
module.exports = class CodotypeGenerator {

  // constructor
  // Handles build options
  constructor (constructorOptions, options) {

    // Assigns constructorOptions
    this.write = constructorOptions.write || this.write
    this.forEachSchema = constructorOptions.forEachSchema || this.forEachSchema
    this.compileInPlace = constructorOptions.compileInPlace || []

    // Assigns this.options
    this.options = options;

    // Assigns helper libraries to class variables
    this.fs = fsExtra

    // PASS this.options.resolved in from codotype/codotype
    this.resolved = this.options.resolved;

    // Returns the instance
    return this
  }

  // write
  // Method for write files to the filesystem
  async write () {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // forEachSchema
  // Method to write files to the filesystem for each schema in blueprints.schemas
  forEachSchema({ schema, blueprint, configuration }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  async ensureDir (dir) {
    const destination_path = path.join(this.options.dest, dir)
    return new Promise((resolve, reject) => {
      return fsExtra.ensureDir(destination_path, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // copyDir
  // copy a directory from src to dest
  async copyDir (src, dest) {
    return new Promise((resolve, reject) => {
      return this.fs.copy(src, dest, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // compileInPlace
  // Returns an array of filenames whos
  // templatePath and destinationPath are identical
  // Helpful for compiling lots of one-off templates without writing lots of machinery around them
  // compileInPlace () {
  //   return []
  // }

  // compileTemplatesInPlace
  // Compiles and writes each template defined in the `compileInPlace` method
  compileTemplatesInPlace () {
    // For each inPlaceTemplate, compile and write
    return Promise.all(this.compileInPlace.map((template) => {
      return this.copyTemplate(
        this.templatePath(template),
        this.destinationPath(template)
      )
    }))
  }

  // renderComponent
  // Compiles and writes each template defined in the `compileInPlace` method
  renderComponent ({ src, dest, options = {} }) {
    // For each inPlaceTemplate, compile and write
    return this.copyTemplate(
      this.templatePath(src),
      this.destinationPath(dest),
      options
    )
  }

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate (src, options = {}) {
    return new Promise((resolve, reject) => {

      let renderOptions = {}

      const data = {
        blueprint: this.options.blueprint,
        configuration: this.options.configuration,
        helpers: {
          trailingComma
        },
        ...options
      }

      // Compiles EJS template
      return ejs.renderFile(src, data, renderOptions, (err, str) => {

        // Handles template compilation error
        if (err) return reject(err)

        // Resolves with compiled template
        return resolve(str);

      })

    })
  }

  // copyTemplate
  // Compiles a template and writes to the dest location
  copyTemplate (src, dest, options = {}) {
    // console.log('Copying:' + dest)
    return new Promise(async (resolve, reject) => {

      // console.log('Rendering:' + dest)
      const compiledTemplate = await this.renderTemplate(src, options)
      // console.log('Rendered:' + dest)

      // Writes the compiled template to the dest location
      // console.log('Writing: ' + dest)
      this.fs.writeFile(dest, compiledTemplate, (err) => {
        if (err) return reject(err)
        // console.log('Wrote: ' + dest)
        // console.log('\n')
        return resolve();
      });

    })
  }

  // templatePath
  // TODO - document
  templatePath (template_path = './') {
    return path.join(this.resolved, 'templates', template_path)
  }

  // destinationPath
  // TODO - document
  destinationPath (destination_path = './') {
    return path.join(this.options.dest, destination_path)
  }

  // composeWith
  // Enables one generator to fire off several child generators
  // TODO - clean up + document this function
  async composeWith (generatorModule, options={}) {

    // Defines module path
    let modulePath

    // Handle relative paths
    if (generatorModule.startsWith('./') || generatorModule.startsWith('../')) {

      // TODO - document
      let base = ''
      const stats = fsExtra.statSync(this.resolved)

      // TODO - document
      if (stats.isDirectory()) {
        base = this.resolved
      } else {
        base = path.dirname(this.resolved)
      }

      // TODO - document
      modulePath = path.join(base, generatorModule)

    // Handle absolute path
    // } else if (generatorModule.absolute_path) {
    } else if (generatorModule.startsWith('/')) {

      modulePath = path.join(generatorModule)

    // Handle module path
    } else if (generatorModule.module_path) {

      modulePath = generatorModule + '/generator'
    }

    try {
      // console.log(modulePath)
      const generatorPrototype = require(modulePath); // eslint-disable-line import/no-dynamic-require
      generatorPrototype.resolved = require.resolve(modulePath);

      console.log(`Running ${generatorPrototype.name}...`)

      let resolvedGeneratorPath = generatorPrototype.resolved.split('/')
      resolvedGeneratorPath.pop()
      resolvedGeneratorPath = resolvedGeneratorPath.join('/')

      let resolvedDestination = this.options.dest

      if (options.dest) {

        resolvedDestination = this.options.dest.split('/')
        resolvedDestination.pop()
        resolvedDestination.push(options.dest)
        resolvedDestination = resolvedDestination.join('/')

      }

      // Creates new instance of generatorPrototype
      const generator = new CodotypeGenerator(generatorPrototype, {
        ...this.options,
        dest: resolvedDestination,
        resolved: resolvedGeneratorPath
      })

      // Invokes `generator.forEachSchema` once for each in blueprint.schemas
      await Promise.all(this.options.blueprint.schemas.map((schema) => generator.forEachSchema({ schema: schema, ...this.options })))

      // Invokes `generator.write()` once
      await generator.write(this.options)

      // Invokes generator.compileTemplatesInPlace()
      await generator.compileTemplatesInPlace()

      // Logs output
      // TODO - add --verbose flag to conditionally print this output
      console.log(`Generated ${generatorPrototype.name}.\n`)

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('MODULE NOT FOUND')
      } else {
        console.log('OTHER ERROR')
        console.log(err)
        throw err;
      }
    }

  }

}
