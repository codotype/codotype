const blueprint = require('@codotype/blueprints/lib/team-lists.json')
const fs = require('fs')

const { inflateSchema, inflateRelation, inflate } = require('../lib/inflate')

// console.log(blueprint);

const inflatedBlueprint = inflate({ blueprint })

fs.writeFile('inflated.json', JSON.stringify(inflatedBlueprint, null, 2))