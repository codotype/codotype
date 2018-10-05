<template>
  <div class="row">

    <!-- Header -->
    <div class="col-lg-12">
      <EditorHeader :help="'Define the attributes that can be assigned to a single ' + schema.label">
        <a class='btn btn-outline-warning float-right mr-2' :href="'#/blueprints/' + project_id >
          <i class="fas fa-fw fa-pencil-alt mr-2"></i>
          Attributes
        </a>

        <a class='btn btn-primary float-right' :href="'#/blueprints/' + project_id + '/seeds/' + schema_id + '/new'" >
          <i class="fa fa-fw fa-plus mr-2"></i>
          New {{ schema.label }}
        </a>
      </EditorHeader>
    </div>

    <!-- Record List -->
    <div class="col-lg-12">
      <RecordList :schema="schema" :projectId="project_id" />
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import RecordList from '@/components/record/RecordList'

export default {
  props: ['project_id', 'schema_id'],
  metaInfo: {
    title: 'Seed - List'
  },
  components: {
    RecordList
  },
  created () {
    this.selectModel(this.schema_id)
  },
  computed: mapGetters({
    schema: 'schema/selectedModel'
  }),
  methods: mapActions({
    selectModel: 'schema/selectModel'
  })
}
</script>
