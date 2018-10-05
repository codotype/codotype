const titleize = require('underscore.string/titleize')
const underscored = require('underscore.string/underscored')
const classify = require('underscore.string/classify')
const pluralize = require('pluralize')

// // // //

// inflateMeta
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
module.exports.inflateMeta = (label) => {
  return {
    label: titleize(label),
    label_plural: pluralize(titleize(label)),
    identifier: underscored(label),
    identifier_plural: underscored(pluralize(label)),
    class_name: classify(titleize(label)),
    class_name_plural: pluralize(classify(titleize(label)))
  }
}
