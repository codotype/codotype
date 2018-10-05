
<template>
  <div class="row d-flex align-items-center">

    <b-modal
      id="edit-project"
      ref="editModal"
      :title="'Edit App'"
      @ok="submitProjectForm()"
      ok-title='Update'
      cancel-title='Cancel'
    >
      <!-- <ProjectForm :model= :submit="submitProjectForm" /> -->
      <p class="lead text-danger">TODO - add ProjectForm here</p>
    </b-modal>

    <div class="col-lg-7">
      <h4 class="mb-0">
        <span id="project-header">
          <!-- {{ project.label + ' App' }} -->
          {{ project.label + ' Blueprint' }}
        </span>
        <button class="btn btn-link py-0" id="project-edit-button" v-b-tooltip.hover.right title='Edit App Name' v-b-modal="'edit-project'">
          <i class="fa fa-pencil-alt"></i>
        </button>
      </h4>
      <small class="text-muted">
        {{ 'Define data modeled by the ' + project.label + ' app.' }}
      </small>
    </div>

    <!-- TODO - display app version somewhere -->

    <div class="col-lg-5 d-flex align-items-center justify-content-end">

      <HelpButton :tour="tourSteps"/>

      <a class='mr-3' role="button" @click.stop="exportProject(project)">
        <i class="fa fa-fw fa-lg fa-download" v-b-tooltip.hover.left :title='"Export"'></i>
      </a>

      <button class="btn btn-success btn-lg" id='generate-project-button' @click="goToBuild()">
        <i class="fa fa-fw fa-cogs"></i>
        Generate Code
      </button>

    </div>

  </div>
</template>

<script>
import HelpButton from '@/components/HelpButton'
import ProjectForm from '@/modules/project/components/ProjectForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    HelpButton,
    ProjectForm
  },
  computed: mapGetters({
    project: 'project/selectedModel',
    tourSteps: 'tour/appEditorSteps'
  }),
  methods: {
    ...mapActions({
      exportProject: 'project/exportJson',
      updateProject: 'project/update',
      selectBuildApp: 'build/selectApp'
    }),
    goToBuild () {
      // TODO - this is broken!
      // The component at page build/new will reset the selected model
      this.selectBuildApp(this.project._id)
      window.location = '#/build/new' // TODO - use vue router
    },
    submitProjectForm () {
      this.$refs.editModal.hide()
      this.updateProject()
    }
  }
}
</script>
