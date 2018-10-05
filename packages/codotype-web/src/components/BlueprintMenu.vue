<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top" class='bg-white'>
    <b-navbar-brand to="/blueprints">
      <!-- <img class='logo' src="@/assets/logo_dark.png"> -->
      <strong>codotype</strong>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item>
          <strong id="project-header" style='font-weight: 700;'>{{ project.label }}</strong> Blueprint
        </b-nav-item>

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

        <button class="btn btn-link py-0" id="project-edit-button" v-b-tooltip.hover.right title='Edit App Name' v-b-modal="'edit-project'">
          <i class="fa fa-pencil-alt"></i>
        </button>

      </b-navbar-nav>

      <!-- Navbar Links -->
      <!-- <b-navbar-nav class="m-auto"> -->

        <!-- <button class="btn btn-link active" v-b-tooltip.hover.left title='Edit'> -->
          <!-- <i class="fa fa-fw fa-columns"></i> -->
        <!-- </button> -->

        <!-- <button class="btn btn-link" v-b-tooltip.hover.right title='Preview'> -->
          <!-- <i class="fa fa-fw fa-eye"></i> -->
        <!-- </button> -->

        <!-- Public links -->
        <!-- <b-nav-item to="/build/new">Build</b-nav-item> -->
        <!-- <b-nav-item to="/generators">Generators</b-nav-item> -->
        <!-- <b-nav-item to="/build/new">Marketplace</b-nav-item> -->
        <!-- <b-nav-item to="#/examples">Example Apps</b-nav-item> -->
        <!-- <b-nav-item to="#/generator_new">New Generator</b-nav-item> -->
      <!-- </b-navbar-nav> -->

      <b-navbar-nav class="ml-auto">

        <b-nav-item>
          <HelpButton :tour="tourSteps"/>
        </b-nav-item>

        <button class="btn btn-sm btn-outline-primary mr-3" @click="exportProject(project)">
          <i class="fa fa-fw fa-download"></i>
          Export
        </button>

        <button id="generate-button" class="btn btn-sm btn-success"  @click="goToBuild()">
          <i class="fa fa-fw fa-check"></i>
          Generate App
        </button>

        <!-- <b-nav-item> -->
          <!-- <button class="btn btn-link"> -->
            <!-- <i class="fa fa-user"></i> -->
            <!-- Username -->
          <!-- </button> -->
        <!-- </b-nav-item> -->

        <!-- <b-nav-item target="_blank" href="https://github.com/codotype"> -->
          <!-- <i class="fa fa-fw fa-graduation-cap"></i> -->
          <!-- <i class="fa fa-fw fa-book"></i> -->
          <!-- Documentation -->
        <!-- </b-nav-item> -->

        <!-- <b-nav-item target="_blank" href="https://github.com/codotype"> -->
          <!-- <i class="fa fa-fw fa-dollar"></i> -->
          <!-- Donate -->
        <!-- </b-nav-item> -->

        <!-- <b-nav-item target="_blank" href="https://github.com/codotype"> -->
          <!-- <i class="fab fa-lg fa-fw fa-github text-dark"></i> -->
          <!-- GitHub -->
        <!-- </b-nav-item> -->

        <!-- <b-nav-item target="_blank" href="https://twitter.com/codotype"> -->
          <!-- <i class="fab fa-lg fa-fw fa-twitter text-primary"></i> -->
        <!-- </b-nav-item> -->

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HelpButton from '@/components/HelpButton'

export default {
  name: 'BlueprintMenu',
  components: {
    HelpButton
  },
  computed: mapGetters({
    project: 'project/selectedModel',
    tourSteps: 'tour/appEditorSteps'
  }),
  methods: {
    ...mapActions({
      exportProject: 'project/exportJson',
      selectBuildApp: 'build/selectApp'
    }),
    goToBuild () {
      this.selectBuildApp(this.project._id)
      window.location = '#/build/new' // TODO - use vue router
    }
  }
}
</script>
