
<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- <small class="text-warning">TODO - compute model.label, model.identifier in Vuex store</small> -->
      <!-- TODO - model.label should be RELATED_SCHEMA.label or RELATED_SCHEMA.label_plural -->
      <!-- <input type="text" v-model="model.label"> -->
      <!-- TODO - model.label should be RELATED_SCHEMA.identifier + '_id' or '_ids' -->
      <!-- <input type="text" v-model="model.identifier"> -->

      <div class="row">
        <div class="col-lg-4">
          <div class="form-group text-center">
            <!-- <label>This Model</label> -->
            <label>{{ schema.label }}</label>
            <small class="form-text text-muted">This Model</small>
            <input type="text" class='form-control form-control-lg' disabled :value="schema.label">
          </div>
        </div>

        <!-- RELATION TYPE -->
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group text-center">
                <!-- <label>Relation Type</label> -->
                <!-- <small class="form-text text-muted">The type of relation to define</small> -->
                <label>{{ selectedRelationType.label }}</label>
                <small class="form-text text-muted mb-0">{{ selectedRelationType.description }}</small>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="btn-group w-100">
                <button :class="relation.id === model.type ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'" v-for="relation in relationTypes" @click="model.type = relation.id">
                  <img class='relation-thumbnail' :src="'/static/' + relation.id.toLowerCase() + '.svg'"/>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- RELATED SCHEMA -->
        <div class="col-lg-4">
          <div class="form-group text-center">
            <label>Related Model</label>
            <small class="form-text text-muted">The related Model definition.</small>
            <select class="form-control form-control-lg" v-model="model.related_schema_id" >

              <!-- <option v-if="model.type === 'HAS_ONE'" v-for="s in allSchemas" :key="s._id" :value="s._id">{{s.label}}</option> -->
              <template v-if="model.type === 'MANY_TO_MANY'">
                <option v-for="s in allSchemas" :key="s._id" :value="s._id">
                  {{s.label_plural}}
                </option>
              </template>

              <!-- <option v-if="model.type === 'BELONGS_TO'" v-for="s in allSchemas" :key="s._id" :value="s._id">{{s.label}}</option> -->
              <template v-else>
                <option v-for="s in allSchemas" :key="s._id" :value="s._id">
                  {{s.label}}
                </option>
              </template>

            </select>
          </div>
        </div>

        <!-- <div class="row"> -->
          <!-- <div class="col-lg-6"> -->
            <!-- <pre class="bg-dark text-light">{{schema}}</pre> -->
          <!-- </div> -->

          <!-- <div class="col-lg-6"> -->
            <!-- <pre class="bg-dark text-light">{{allSchemas.find(s => s._id === model.related_schema_id)}}</pre> -->
          <!-- <pre class="bg-dark text-light">{{model}}</pre> -->
          <!-- </div> -->
        <!-- </div> -->

        <div class="col-lg-12">
          <hr>
        </div>

        <!-- Description / Relation Preview-->
        <div class="col-lg-6 text-center" v-if="selectedRelatedSchema">
          <!-- <pre class="bg-dark text-light">{{model}}</pre> -->

          <small v-if="model.type === 'HAS_ONE'">
            Each <span class='text-info'>{{ schema.label }}</span> references one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span>
          </small>

          <small v-if="model.type === 'BELONGS_TO'">
            Each <span class='text-warning'>{{ schema.label }}</span> references one <span class='text-info'>{{ selectedRelatedSchema.label }}</span>
          </small>

          <small v-if="model.type === 'HAS_MANY'">
            Each <span class='text-info'>{{ schema.label }}</span> references many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span>
          </small>

          <small v-if="model.type === 'MANY_TO_MANY'">
            One <span class='text-info'>{{ schema.label }}</span> HAS MANY <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span>
          </small>

          <small v-if="model.type === 'BELONGS_TO_MANY'">
            Many <span class='text-info'>{{ schema.label_plural }}</span> are referenced by one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span>
          </small>


          <small v-if="model.type === 'ONE_TO_MANY'">
            One <span class='text-info'>{{ schema.label }}</span> is referenced by many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span>
          </small>

        </div>

        <div class="col-lg-6 text-center" v-if="selectedRelatedSchema">
          <!-- <small v-if="model.type === 'MANY_TO_MANY'"> -->
            <!-- One <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> HAS MANY <span class='text-info'>{{ schema.label_plural }}</span> -->
          <!-- </small> -->

          <!-- <small v-if="model.type === 'BELONGS_TO_MANY'"> -->
            <!-- One <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> HAS MANY <span class='text-info'>{{ schema.label_plural }}</span> -->
          <!-- </small> -->

          <small v-if="model.type === 'HAS_MANY'">
            Many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span> are referenced by one <span class='text-info'>{{ schema.label }}</span>
          </small>

          <small v-if="model.type === 'HAS_ONE'">
            One <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> is referenced by one <span class='text-info'>{{ schema.label }}</span>
          </small>

          <!-- <small v-if="model.type === 'ONE_TO_MANY'"> -->
            <!-- Each <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> references one <span class='text-info'>{{ schema.label }}</span> -->
          <!-- </small> -->

          <small v-if="model.type === 'BELONGS_TO'">
            One <span class='text-info'>{{ selectedRelatedSchema.label }}</span> is referenced by many <span class='text-warning'>{{ schema.label_plural }}</span>
          </small>

        </div>

        <!-- Description / Relation Preview-->
        <div class="col-lg-12">
          <div class="card-deck">
            <div class="card">
              <pre class="bg-dark p-4 text-light h-100 mb-0">{{schemaPrototype}}</pre>
            </div>
            <div class="card">
              <pre class="bg-dark p-4 text-light h-100 mb-0">{{selectedRelatedSchemaPrototype}}</pre>
            </div>
          </div>
        </div>

        <div class="col-lg-12">
          <hr>
        </div>

        <!-- Alias inputs -->
        <div class="col-lg-6">
          <div class="form-group">
            <label>Alias</label>
            <small class="form-text text-muted">Alias this relation under a different name.</small>
            <input type="text" class='form-control' v-model="model.as">
          </div>
        </div>

        <!-- <div class="col-lg-4 text-center"> -->
          <!-- <p class="lead mt-4">{{ selectedRelationType.text }}</p> -->
          <!-- <small class="text-muted">{{ selectedRelationType.desc }}</small> -->
          <!-- <p class="lead">{{ selectedRelationType.text }}</p> -->
        <!-- </div> -->

        <div class="col-lg-6">
          <div class="form-group">
            <label>Reverse Alias</label>
            <small class="form-text text-muted">Reverse Alias</small>
            <input type="text" class='form-control' :disabled="model.type !== 'BELONGS_TO'" v-model="model.reverse_as">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

export default {
  props: ['schema', 'model'],
  mounted () {
    this.model.type = 'BELONGS_TO' // TODO - constantize
    const relatedSchema = this.$store.getters['schema/collection'].find(m => m._id !== this.schema._id)
    this.model.related_schema_id = relatedSchema ? relatedSchema._id : this.schema._id
  },
  computed: {
    ...mapGetters({
      relationTypes: 'schema/relationTypes'
    }),
    allSchemas () {
      // return this.$store.getters['schema/collection'].filter(s => s._id !== this.schema._id)
      return this.$store.getters['schema/collection']
    },
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m._id === this.model.related_schema_id)
    },
    selectedRelationType () {
      return this.relationTypes.find(r => r.id === this.model.type)
    },
    schemaPrototype () {
      let proto = {}
      let className = this.schema.class_name
      let identifier = this.schema.identifier
      proto.id = identifier + '_001'

      if (!this.selectedRelatedSchema) return className + ' = ' + JSON.stringify(proto, null, 2)

      // Handles valid Ids for a relation between the same schema
      const relatedIdentifier = this.selectedRelatedSchema.identifier
      let relatedId = this.selectedRelatedSchema.identifier === this.schema.identifier ? '_002' : '_001'
      relatedId = relatedIdentifier + relatedId

      let relatedMeta = inflateMeta(this.model.as || this.selectedRelatedSchema.label)

      if (this.model.type === 'HAS_ONE') {
        proto[relatedMeta.identifier + '_id'] = relatedId
      } else if (this.model.type === 'BELONGS_TO') {
        proto[relatedMeta.identifier + '_id'] = relatedId
      } else if (this.model.type === 'HAS_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [relatedId]
      } else if (this.model.type === 'MANY_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [relatedId]
      }

      return className + ' = ' + JSON.stringify(proto, null, 2)
    },
    selectedRelatedSchemaPrototype () {
      if (!this.selectedRelatedSchema) return ''
      let proto = {}
      let className = this.selectedRelatedSchema.class_name
      let identifier = this.selectedRelatedSchema.identifier
      const schemaIdentifier = this.schema.identifier

      let relatedId = identifier === schemaIdentifier ? '_002' : '_001'
      proto.id = identifier + relatedId

      let relatedMeta = inflateMeta(this.model.reverse_as || this.schema.label)

      if (this.model.type === 'ONE_TO_MANY') {
        proto[relatedMeta.identifier + '_id'] = schemaIdentifier + '_001'
      } else if (this.model.type === 'BELONGS_TO') {
        proto['getRelated' + relatedMeta.class_name_plural] = 'method'
      } else if (this.model.type === 'MANY_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [schemaIdentifier + '_001']
      } else if (this.model.type === 'BELONGS_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [schemaIdentifier + '_001']
      }

      return className + ' = ' + JSON.stringify(proto, null, 2)
    }
  }
}
</script>

<style scoped>

  img.relation-thumbnail {
    width: 50%;
    /*height: 100%;*/
  }

  .btn-outline-primary {
    width: 33%;
  }
</style>
