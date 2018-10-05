import cloneDeep from 'lodash/cloneDeep'
import ObjectID from 'bson-objectid'
import { DEFAULT_RELATION } from './constants'
import { SELECT_MODEL_ACTIONS, EDIT_MODEL_ACTIONS } from '@/store/lib/mixins'

// Relation module actions
export default {
  ...SELECT_MODEL_ACTIONS,
  ...EDIT_MODEL_ACTIONS,
  resetNewModel ({ state, commit }) {
    let newModel = cloneDeep(DEFAULT_RELATION)
    newModel.order = state.collection.length
    return commit('newModel', newModel)
  },
  create ({ state, commit, dispatch, rootGetters }) {
    // Isolates current Relation model and the schema to which the attribute belongs
    let model = cloneDeep(state.newModel)
    // let modelSchema = rootGetters['schema/selectedModel']

    // Assigns uniaue ID to attribute model
    model._id = ObjectID().toString()

    // Pulls relational metadata (if needed)
    // const relationType = model.type
    // const relatedSchemaId = model.related_schema_id

    // Gets relatedSchema from schema/collection
    // let relatedSchema = rootGetters['schema/collection'].find(m => m._id === relatedSchemaId)

    // Handles MANY_TO_ONE
    // if (relationType === 'BELONGS_TO') {
    //   console.log('MANY_TO_ONE')

    //   model.as = model.as || relatedSchema.label
    //   model.type = 'BELONGS_TO'

    //   // Defines inverse relation on relatedSchema
    //   // INVERSE OF BELONGS_TO === OWNS_MANY
    //   let reverseRelation = cloneDeep(DEFAULT_RELATION)
    //   reverseRelation._id = ObjectID().toString()
    //   reverseRelation.type = 'OWNS_MANY'
    //   reverseRelation.order = relatedSchema.relations.length + 1 // TODO - there should be no identifier for the OWNS_MANY relation attribute
    //   reverseRelation.as = modelSchema.label
    //   reverseRelation.related_schema_id = modelSchema._id

    //   // Assigns reverse-relational IDs
    //   model.reverse_relation_id = reverseRelation._id
    //   reverseRelation.reverse_relation_id = model._id

    //   // TODO - remove these log statements
    //   console.log('RELATION:')
    //   console.log(JSON.stringify(model, null, 2))
    //   console.log('REVERSE RELATION:')
    //   console.log(JSON.stringify(reverseRelation, null, 2))

    //   // Adds the reverse relation to the relatedSchema
    //   let relatedSchemaRelations = relatedSchema.relations
    //   relatedSchemaRelations.push(reverseRelation)
    //   commit('schema/relations', { schema_id: relatedSchemaId, collection: relatedSchemaRelations }, { root: true })
    // }

    // Updates the collection belonging to the currently selected schema
    let collection = state.collection
    collection.push(model)
    commit('collection', collection)
    commit('schema/relations', { collection }, { root: true })
    dispatch('resetNewModel')
  },
  update ({ state, commit, dispatch }) {
    let model = cloneDeep(state.editModel)

    let collection = state.collection.map((m) => {
      if (m._id === model._id) {
        return model
      } else {
        return m
      }
    })

    commit('collection', collection)
    commit('schema/relations', { collection }, { root: true })
    dispatch('clearEditModel')
  },
  destroy ({ state, commit, rootGetters }, model) {
    // Stores attribute, relatedAttribute IDs
    let attrId = model._id
    let relatedSchemaId = model.related_schema_id
    let relatedAttrId = model.reverse_relation_id

    // Removes the relation from the current model
    let collection = state.collection.filter((a) => { return a._id !== attrId })
    commit('collection', collection)
    commit('schema/relations', { collection: collection }, { root: true })

    // Finds relatedSchema
    let relatedSchema = rootGetters['schema/collection'].find(m => m._id === relatedSchemaId)

    // Removes the reverse relation from the related model
    let relatedSchemaRelations = relatedSchema.relations.filter((a) => { return a._id !== relatedAttrId })
    commit('collection', relatedSchemaRelations)
    commit('schema/relations', { schema_id: relatedSchemaId, collection: relatedSchemaRelations }, { root: true })
    console.log('UPDATED SCHEMA')
  }
}
