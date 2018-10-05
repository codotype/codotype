const ejs = require('ejs')
const path = require('path');
const fsExtra = require('fs-extra')
const trailingComma = require('@codotype/util/lib/trailingComma')

// // // //

// CodotypeGenerator class definition
module.exports = class CodotypeGenerator {

  // constructor
  // Handles build options
  constructor (options) {

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
    console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  async ensureDir (dir) {
    const destination_path = path.join(this.options.dest, dir)
    return new Promise((resolve, reject) => {
      return this.fs.ensureDir(destination_path, (err) => {
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

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate (src, options = {}) {
    return new Promise((resolve, reject) => {

      let renderOptions = {}

      const data = {
        app: this.options.app,
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
  async copyTemplate (src, dest, options = {}) {
    return new Promise(async (resolve, reject) => {

      const compiledTemplate = await this.renderTemplate(src, options)

      // Writes the compiled template to the dest location
      this.fs.writeFile(dest, compiledTemplate, (err) => {
        if (err) return reject(err)
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
  async composeWith (modulePath, options={}) {

    // Defines module path
    modulePath = path.join(path.dirname(this.resolved), modulePath)

    try {
      const GeneratorClass = require(modulePath); // eslint-disable-line import/no-dynamic-require
      GeneratorClass.resolved = require.resolve(modulePath);

      console.log(`Running ${GeneratorClass.name}...`)

      const generator = new GeneratorClass({
        ...this.options,
        resolved: modulePath
      })
      await generator.write(this.options)
      // console.log(`Generated ${GeneratorClass.name}.`)

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('MODULE NOT FOUND')
      } else {
        console.log('OTHER ERROR')
        throw err;
      }
    }

  }

}