
<template>
  <table class="table table-striped table-hover">
    <thead>

      <!-- TODO - reintegrate relations & ignore attributes -->
      <th v-for="attr in schema.attributes" :key="attr._id" v-if="attr.datatype">
        {{attr.label}}
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom :title="attr.help" ></i>
      </th>

      <!-- (this is here for Edit / Destroy controls) -->
      <th></th>

    </thead>
    <tbody>

      <!-- Create one table row for each Record -->
      <tr v-for="record in records" :key="record._id">

        <!-- Record Data -->
        <td v-for="attr in schema.attributes" :key="attr._id">

          <span v-if="attr.datatype === 'BOOL'">
            <i class="fa fa-fw fa-check-square-o" v-if="record.attributes[attr.identifier]"></i>
            <i class="fa fa-fw fa-square-o" v-if="!record.attributes[attr.identifier]"></i>
          </span>

          <span v-else-if="attr.datatype === 'COLOR'">
            <i class="fa fa-fw fa-lg fa-square" :style="'color:' + record.attributes[attr.identifier]"></i>
          </span>

          <span v-else-if="attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'BELONGS_TO'">
            <!-- {{ record._id }} -->
            <!-- {{ record.attributes }} -->
            {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }}
            <!-- <a :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])"> -->
              <!-- {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }} -->
            <!-- </a> -->
          </span>

          <span v-else-if="attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'HAS_MANY'">
            <!-- {{ record._id }} -->
            <!-- {{ record.attributes[attr.identifier] }} -->
            {{ getListLength(record.attributes[attr.identifier]) }}
            <!-- {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }} -->
          </span>

          <span v-else-if="attr.datatype === 'JSON'">
            {{ JSON.stringify(record.attributes[attr.identifier]) }}
          </span>

          <span v-else>
            {{ record.attributes[attr.identifier] || attr.datatypeOptions.default }}
          </span>
        </td>

        <!-- Record Controls -->
        <td class='text-right controls'>

          <!-- Show Record -->
          <!-- <a class="btn btn-sm btn-outline-light" :href=" '#/blueprints/' + projectId + '/seeds/' + schema._id + '/records/' + record._id "> -->
            <!-- <i class="fa fa-fw fa-eye"></i> -->
          <!-- </a> -->

          <!-- Edit Record -->
          <a class="btn btn-sm btn-outline-warning" :href=" '#/blueprints/' + projectId + '/seeds/' + schema._id + '/records/' + record._id + '/edit' ">
            <i class="fas fa-fw fa-pencil-alt"></i>
          </a>

          <!-- Destroy Record Confirmation -->
          <!-- TODO - implement Record Destroy confirmation! -->
          <button class="btn btn-sm btn-outline-danger" v-b-modal="'modal_' + record._id">
            <i class="fa fa-fw fa-trash"></i>
          </button>

        </td>

        <!-- Bootstrap Modal Component -->
        <b-modal :id="'modal_' + record._id"
          :title="'Destroy Seed Data?'"
          @ok="onConfirmDestroy(record)"
          header-bg-variant='dark'
          header-text-variant='light'
          body-bg-variant='dark'
          body-text-variant='light'
          footer-bg-variant='danger'
          footer-text-variant='light'
          ok-variant='danger'
          ok-title='DESTROY'
          cancel-title='Cancel'
          cancel-variant='dark'
        >
          <p class="text-left">Are you sure you want to destroy this seed data?</p>
        </b-modal>

      </tr>

      <!-- Empty View -->
      <!-- Displays link to `New Record` form -->
      <tr v-if="!records.length">
        <td v-for="attr, i in schema.attributes">
          <span v-if="i === 0">
            <span class="text-warning mr-2">No records found.</span>
            <span class="">Click</span>
            <a :href=" '#/blueprints/' + projectId + '/seeds/' + schema._id + '/new' "> here </a>
            to create {{ schema.label_plural.toLowerCase() }}.
          </span>
        </td>
        <td></td>
      </tr>

    </tbody>
  </table>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['projectId', 'schema'],
  methods: {
    onConfirmDestroy (record) {
      return this.$store.dispatch('record/destroy', record)
    },
    getLinkedSchemaHref (attr, record_id) {
      // TODO - the href attribute is working, but the route doesn't trigger a re-render of the page
      // because the route doens't actually "change" - only the route parameter does
      let allRecords = this.$store.getters['record/collection']
      let allSchemas = this.$store.getters['schema/collection']
      let record = allRecords.find(m => m._id === record_id)
      if (!record) return
      let schema = allSchemas.find(m => m._id === record.schema_id)
      // return `#/blueprints/${this.projectId}/seeds/${schema._id}/${record._id}`
      return `#/blueprints/${this.projectId}/seeds/${schema._id}`
    },
    getRelatedSchema (attr) {
      let allSchemas = this.$store.getters['schema/collection']
      let schema = allSchemas.find(m => m._id === attr.datatypeOptions.schema_id)
      return schema
    },
    getLinkedSchemaLabel (attr, record_id) {
      let allRecords = this.$store.getters['record/collection']
      let allSchemas = this.$store.getters['schema/collection']
      let record = allRecords.find(m => m._id === record_id)
      if (!record) return
      let schema = allSchemas.find(m => m._id === record.schema_id)

      let identifier = schema.attributes[0].identifier
      return record.attributes[identifier]
    },
    getListLength (value) {
      value = value || []
      return `${value.length} Records`
    }
  },
  computed: {
    // TODO - move this into a getter, if possible
    records () {
      let records = this.$store.getters['record/collection']
      return records.filter((r) => { return r.schema_id === this.schema._id })
    }
  }
}
</script>

<style lang="sass">
  table.table
    tr
      td.controls
        opacity: 0
        transition: opacity 0.3s ease-in-out

      &:hover
        td.controls
          opacity: 1
</style>

