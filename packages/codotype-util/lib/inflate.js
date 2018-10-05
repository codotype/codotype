const { inflateMeta } = require('./inflateMeta')
const clone = require('lodash/clone')
const uniqueId = require('lodash/uniqueId')
const cloneDeep = require('lodash/cloneDeep')

// // // //

function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  // let inflated = { ...relation }
  let inflated = clone(relation)

  // console.log(inflated)

  // defines inflated.alias && inflate.schema
  const relatedSchema = schemas.find((s) => { return s._id === inflated.related_schema_id })
  inflated.schema = inflateMeta(relatedSchema.label)
  inflated.alias = inflateMeta(inflated.as || relatedSchema.label)
  inflated.related_lead_attribute = relatedSchema.attributes[0].identifier

  // Returns the inflated relation
  return inflated;
}

function inflateSchema({ schema, schemas }) {
  let inflated = cloneDeep(schema)
  inflated.relations = schema.relations.map(relation => inflateRelation({ schemas, relation }))
  inflated.attributes = schema.attributes.map(attribute => attribute)
  return inflated
}

// object that gets passed into the generator
// const config = {
//   id: '...',
//   schemas: schemas.map(schema => inflateSchema({ schema, schemas }))
// }

// inflate
// Fomats the build parameters for the generator
// Mostly adds some additional metadata to each relation to simplify template rendering
// TODO - this may want to define the blueprint.identifier attribute (rather than relying on the client)
function inflate({ blueprint }) {

    const inflated = cloneDeep(blueprint)

    // Iterates over each schema
    inflated.schemas = inflated.schemas.map((schema) => {

        // Inflate relations
        schema.relations = schema.relations.map((relation) => {

            let rel = inflateRelation({
                relation: relation,
                schemas: inflated.schemas
            })

            let relatedSchema = inflated.schemas.find(s => s._id === rel.related_schema_id)
            // let reverse_relation = relatedSchema.relations.find(r => r._id === rel.reverse_relation_id)
            // rel.reverse_relation = cloneDeep(reverse_relation)

            // Handles REF_BELONGS_TO
            if (rel.type === 'BELONGS_TO') {

              const ref_relation = {
                id: uniqueId('REl_REF_'),
                order: relatedSchema.relations.length,
                type: 'REF_BELONGS_TO',
                required: false,
                related_schema_id: schema._id,
                as: rel.reverse_as,
                reverse_as: rel.as
              }

              // Inflates reference relation and appends to related schema
              const ref_relation_inflated = inflateRelation({ relation: ref_relation, schemas: inflated.schemas })
              relatedSchema.relations.push(ref_relation_inflated)
            }

            return rel
        })

        return schema
    })

    // Defines the data to split up blueprint.seeds by the records' respective schemas
    // blueprint.seed_data = {}
    // _.each(blueprint.schemas, (s) => {
    //     blueprint.seed_data[s._id] = {
    //         identifier: s.identifier_plural,
    //         records: []
    //     }
    // })

    // Iterates over each piece of seed data
    // _.each(blueprint.seeds, (seed) => {
    //     let seedObject = {}
    //     seedObject._id = { '$oid': seed._id }
    //     seedObject = {
    //         ...seedObject,
    //         ...seed.attributes
    //     }
    //     // Adds to blueprint.seed_data object
    //     blueprint.seed_data[seed.schema_id].records.push(seedObject)
    // })

    return inflated
}

// // // //

module.exports = {
  inflateSchema,
  inflateRelation,
  inflate
}
