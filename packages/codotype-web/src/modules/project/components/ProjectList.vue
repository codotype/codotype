<template>
  <div class='row'>

    <!-- TODO - only show when user is NOT logged in -->
    <div class="col-lg-4 mb-4" id="app-new-button">
      <a role="button" style='cursor: pointer;' v-b-modal="'new-project-modal'" class="card card-body border-primary bg-gradient-primary text-white h-100 d-flex align-items-center justify-content-center shadow-hover">

        <div class="row">
          <div class="col-lg-12 text-center">
            <p class='lead'>
              <i class="fas fa-plus mr-2"></i>
              New Blueprint
            </p>
            <p class='mb-0'>Generate apps from your Blueprints</p>
            <!-- <p class='mb-0'>Unlimited Blueprints when you register</p> -->
          </div>
        </div>

      </a>
    </div>



    <!-- Blueprint List -->
    <BlueprintListItem v-for="project in collection" v-bind:key="project._id" :project="project" />

    <!-- Empty -->
    <div class="col-lg-12 mb-3" v-if="!collection[0]">
      <div class="card bg-transparent border-warning text-warning card-body text-center">
        <p class="lead card-text">
          <i class="fa fa-fw fa-info-circle mr-2"></i>
          <br>
          No Apps found
        </p>
        <p class="card-text">
          See some <a href="#/examples">examples</a> or start a <a href="#/examples">new project</a>
        </p>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import BlueprintListItem from './BlueprintListItem'

export default {
  components: {
    BlueprintListItem
  },
  computed: mapGetters({
    collection: 'project/collection'
  })
}
</script>

