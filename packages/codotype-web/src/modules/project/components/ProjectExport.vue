<template>
  <div class="row">
    <div class="col-lg-12">

      <EditorHeader :help="'Export the ' + model.label + ' project definition.'" />

      <!-- Bootstrap Modal Component -->
      <b-modal :title="'Thanks!'"
        ref='modal'
        ok-title='EXPORT'
        cancel-title='Cancel'
      >
        <p>Exported Application.</p>
      </b-modal>

      <!-- TODO - CLEAN UP THIS UI -->
      <!-- TODO - display 'Thanks' message -->
      <!-- TODO - display follow us! message -->
      <!-- TODO - display REASON for export -->

      <div class="row d-flex align-items-center">
        <div class="col-lg-12">
          <button class="btn btn-outline-success" @click="exportProject(model)">
            <i class="fa fa-code mr-1"></i>
            Export JSON
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    model: 'project/selectedModel'
  }),
  methods: {
    ...mapActions({
      downloadFile: 'project/exportJson'
    }),
    exportProject (model) {
      this.downloadFile(model)
      this.$refs.modal.show()
    }
  }
}
</script>


