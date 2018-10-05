<template>
  <div class='row'>

    <!-- Child -->
    <div v-for="project in collection" v-bind:key="project._id" class='col-lg-12 mb-3'>
      <div class="card card-body border-info">
        <div class="row align-items-center">

          <div class="col-lg-3 text-info">
            <!-- project URL -->
            <p class="lead mb-0">
              <a class='text-info' role='button' v-b-modal="'modal_' + project._id">{{project.label}}</a>
            </p>
          </div>

          <div class="col-lg-6">
            <div class='text-info'>
              <i class="fa fa-database mr-1"></i>
              <template v-if="project.schemas.length">
                <!-- {{ project.schemas.length + ' Schema' }} -->
                {{ schemaString(project) }}
              </template>
              <template v-else>
                No Schemas
              </template>
            </div>
          </div>

          <div class="col-lg-3 text-right">

            <!-- Clone example Confirmation -->
            <button class="btn btn-outline-info w-100" v-b-modal="'modal_' + project._id">
              <i class="fa mr-1 fa-copy"></i>
              Clone Example
            </button>

            <!-- Bootstrap Modal Component -->
            <b-modal :id="'modal_' + project._id"
              :title="'Clone ' + project.label + '?'"
              @ok="cloneExample(project)"
              ok-variant='info'
              ok-title='Clone'
              cancel-title='Cancel'
            >
              <p class="text-left">Are you sure you want to clone the {{ project.label }} project?</p>
            </b-modal>

          </div>

        </div>
      </div>
    </div>

    <!-- Empty -->
    <div class="col-lg-12 mb-3" v-if="!collection[0]">
      <div class="card border-warning text-warning card-body text-center">
        <p class="lead card-text">
          <i class="fa fa-fw fa-info-circle mr-2"></i>
          <br>
          No Example Apps found
        </p>
        <p class="card-text">
          Uh oh. Something must actually be wrong here.
          <a href="#/blueprints">My Projects</a>
        </p>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    collection: 'project/exampleCollection'
  }),
  methods: {
    ...mapActions({
      cloneExample: 'project/clone'
    }),
    schemaString (project) {
      let schemas = []
      project.schemas.forEach(s => schemas.push(s.label))
      return schemas.join(', ') + ' Models'
    }
  }
}
</script>
