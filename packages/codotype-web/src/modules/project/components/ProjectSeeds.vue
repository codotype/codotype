<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- Header -->
      <EditorHeader :help="'Define seed data for the ' + project.label + ' app.'" />

      <!-- Schema List -->
      <ul class='list-group'>
        <a class='list-group-item' v-for="schema in collection" :key="schema._id" :href="'#/blueprints/' + project._id + '/seeds/' + schema._id">
          <div class="row">
            <div class="col-lg-3">
              {{ schema.label }}
            </div>
            <div class="col-lg-3 text-primary" v-if="recordCount(schema._id)">
              <i class="fa fa-check mr-2"></i>
              {{ recordCount(schema._id) }} records
            </div>
            <div class="col-lg-3 text-warning" v-else>
              <i class="fa fa-exclamation mr-2"></i>
              No records
            </div>
            <div class="col-lg-6">
            </div>
          </div>
        </a>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    collection: 'schema/collection',
    project: 'project/selectedModel'
  }),
  methods: {
    recordCount (schemaId) {
      let recordCollection = this.$store.getters['record/collection']
      let records = recordCollection.filter(s => s.schema_id === schemaId)
      return records.length
    }
  }
}
</script>
