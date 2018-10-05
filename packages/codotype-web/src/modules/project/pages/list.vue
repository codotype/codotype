
<template>
  <div class="row">

    <!-- Bootstrap Modal Component -->
    <b-modal id="new-project-modal" ref="newModal" :title="'New Blueprint'" hide-footer>
      <ProjectForm :submit="submitProjectForm" />
    </b-modal>

    <!-- TODO - abstract into PageHeader component -->
    <b-col lg=12>
      <div class="row">
        <div class="col-lg-7">
          <h2 class='text-muted'>
            <span id="app-list">
              <i class="fas fa-drafting-compass"></i>
              Blueprints
            </span>
          </h2>
          <small class="text-muted">Blueprints encapsulate metadata about models, attributes, and associations that describe your project</small>

        </div>

        <div class="col-lg-5 text-right">

          <HelpButton :tour="tourSteps"/>

          <!-- <a class='btn btn-lg btn-outline-info' href="#/blueprints/examples"> -->
            <!-- <i class="fa fa-fw fa-folder-open-o mr-2"></i> -->
            <!-- Example Apps -->
          <!-- </a> -->

          <!-- <button class='btn btn-lg btn-primary ml-2' id="app-new-button" v-b-modal="'new-project-modal'" v-if="collection.length < 2"> -->

          <!-- <button class='btn btn-lg btn-primary ml-2' v-b-modal="'new-project-modal'" v-if="true"> -->
            <!-- <i class="fa fa-fw fa-plus"></i> -->
            <!-- New Blueprint -->
          <!-- </button> -->

          <!-- <button v-b-tooltip.hover.left title='Create unlimited Blueprints when you register' class='btn btn-lg btn-primary ml-2' id="app-new-button" v-else> -->
            <!-- <i class="fa fa-fw fa-plus"></i> -->
            <!-- New Blueprint -->
          <!-- </button> -->

        </div>

        <!-- <div class="col-lg-12"> -->
          <!-- <hr> -->
        <!-- </div> -->
      </div>
    </b-col>

    <!-- Project List -->
    <b-col lg=12 class='mt-4'>
      <ListView :collection="collection" />
    </b-col>

  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/project/components/ProjectList'
import ProjectForm from '@/modules/project/components/ProjectForm'
import HelpButton from '@/components/HelpButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectList',
  metaInfo: {
    title: 'Projects'
  },
  components: {
    ListView,
    ProjectForm,
    HelpButton
  },
  mounted () {
    this.fetch()
  },
  computed: mapGetters({
    collection: 'project/collection',
    tourSteps: 'tour/appListSteps'
  }),
  methods: {
    ...mapActions({
      fetch: 'project/fetchCollection',
      persist: 'project/create'
    }),
    submitProjectForm () {
      this.$refs.newModal.hide()
      this.persist()
    }
  }
}
</script>
