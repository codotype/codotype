#!/usr/bin/env node
const prog = require('caporal');

const CLI_VERSION = '0.1.0'

prog
  .version(CLI_VERSION)
  // first command
  .command('generator')
  .help('my help for the generator command')
  .action(function(args, options) {
    console.log('GENERATOR')
  })
  // second command
  .command('cancel')
  .help('my help for the cancel command')
  .action(function(args, options) {
    console.log('CANCEL CANCEL')
  })

prog.parse(process.argv);