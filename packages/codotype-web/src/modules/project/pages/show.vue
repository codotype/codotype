<template>
  <div class="row">
    <!-- <div class="col-lg-12"> -->
      <!-- <ProjectDetailHeader/> -->
    <!-- </div> -->

    <!-- <div class="col-lg-12"> -->
      <!-- <hr> -->
    <!-- </div> -->

    <div class="col-lg-4 border-right">

      <!-- New Schema Modal -->
      <b-modal id="new-schema" :title="'New Model'" @ok="submit()" ok-title='Create' cancel-title='Cancel' >
        <SchemaForm :schema="newModel" />
      </b-modal>

      <!-- Model header -->
      <b-row class='mb-1'>
        <b-col lg='12'>
          <h4 class="mb-0">Models</h4>
          <small class="text-muted">Models encapsulate attributes and relations</small>
        </b-col>
        <!-- <b-col lg='12'> -->
          <!-- <hr> -->
        <!-- </b-col> -->
      </b-row>

      <button id="new-model-button" class="btn btn-primary btn-block btn-lg mb-3" v-b-modal="'new-schema'">
        <i class="fa fa-fw fa-plus"></i>
        Add Model
      </button>

      <SchemaList id="model-list" />

    </div>

    <div class="col-lg-8">
      <SchemaDetail id="model-detail" />
    </div>

    <!-- <div class="fixed-bottom text-right"> -->
      <!-- <button class="btn btn-link mb-2 mr-2"> -->
        <!-- <i class="fa fa-3x fa-question-circle"></i> -->
      <!-- </button> -->
    <!-- </div> -->

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectDetailHeader from '@/modules/project/components/ProjectDetailHeader'
import SchemaList from '@/modules/schema/components/SchemaList'
import SchemaForm from '@/modules/schema/components/SchemaForm'
import SchemaDetail from '@/modules/schema/components/SchemaDetail'

export default {
  name: 'project_show',
  props: ['project_id'],
  metaInfo: {
    title: 'Apps - Show'
  },
  components: {
    ProjectDetailHeader,
    SchemaList,
    SchemaForm,
    SchemaDetail
  },
  created () {
    this.resetNewSchemaModel()
    return this.selectModel(this.project_id)
  },
  destroyed () {
    return this.clearSelectedProject()
  },
  methods: mapActions({
    submit: 'schema/create',
    selectModel: 'project/selectModel',
    resetNewSchemaModel: 'schema/resetNewModel',
    clearSelectedProject: 'project/clearSelected'
  }),
  computed: mapGetters({
    newModel: 'schema/newModel'
  })
}
</script>

<style scoped>
  div.fixed-bottom.text-right {
    z-index: 2000;
  }
</style>
