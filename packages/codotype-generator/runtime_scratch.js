const _ = require('lodash')
const Promise = require('bluebird')

// // // //

console.log('Hello from Codotype')
// NOTE
// The purpose of the codotype/codotype
// repository is to maintain the code that can register and execute (?) codotype generators.
// This repository's library will expose an API that
// will be used by codotype-api, codotype-cli, and codotype-client (likely).

// TODO - we'll need a way to cache some user configuration between sessions
// Perhaps something like a `.codotyperc` file would do the trick?
class Codotype {
  // registerGenerator
  // Registers an individual generator with codotype
  // codotype-cli and codotype-api will auto-register all official generators
  // This library will NOT have any generators as a dependencies
  registerGenerator ({ name, generator, options, etc }) {
    console.log('REGISTER GENERATOR')
  }

  // runGenerator
  // Runs an individual generator
  // This constructs the destination paths for an indiviudal generator
  // And produces the unique ID for each build
  // QUESTION - will we ever run MORE than one generator at a time? <- this is likely.
  // To accommodate this, the `executeBuild` method will invoke the `runGenerator` method
  // once for each app being generated in the build
  runGenerator ({ app, generator, generator_options }) {
    console.log('RUN GENERATOR')
  }

  // executeBuild
  // Runs the generators for an individual build
  // At this point, all the metadata about the application and the desired build has already
  // been collected through one of the client applications
  // TODO - a scope needs to be defined for what kinds of UI elements are available to pull this information from the user
  // i.e. Should we support a font-awesome icon picker widget? Or just adhere to the DATATYPE a la Hotsheets?
  // Long-term, widgets should be an option - make it easy by integrating an editor into the web app
  executeBuild ({ app, build }) {
    // Below in an example of an individual build
    // The object inside can be repeated for multi-generator builds
    // Notice the `generator_options` object populated by collecting
    // data from the end user or by using default options
    // build = [
    //   {
    //     generator: 'VueJsVuexOnsenui',
    //     generator_options: {
    //       email_auth: true,
    //       facebook_auth: true,
    //       twitter_auth: false,
    //       model_options: {
    //         user: { icon: 'fa-user', requireAuth: true, requireAdmin: true },
    //         task: { icon: 'fa-checkbox', requireAuth: true, requireAdmin: false },
    //         list: { icon: 'fa-list', requireAuth: true, requireAdmin: false }
    //       }
    //     }
    //   }
    // ]

    console.log('EXECUTING BUILD')

    // Invokes `runGenerator` for each stage in the build
    Promise.each(build, b => return runGenerator({ app, ...b }) )
    .then(() => {
      console.log('BUILD EXECUTED')
    })
  }
}