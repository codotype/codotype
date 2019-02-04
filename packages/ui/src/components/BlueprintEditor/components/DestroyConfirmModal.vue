<template>
  <b-modal
    lazy
    :visible="showingModal"
    title="Destroy XYZ??"
    ok-title='Submit'
    ok-variant='danger'
    cancel-title='Cancel'
    cancel-variant='light'
  >
    <!-- @hide="$store.commit('editor/schema/attribute/form/showingModal', false)" -->
    <!-- @ok="submit(newModel)" -->
    <p class="mb-2 form-text text-muted">Are you sure you want to destroy the following model?</p>

  </b-modal>
</template>

<script>
// import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'DestroyConfirmModal'
  computed: mapGetters({
    showingModal: 'editor/schema/attribute/form/showingModal'
  }),
  // methods: {
  //   ...mapActions({
  //     createPersonModel: 'editor/schema/attribute/collection/create',
  //     updateParentSchemaAttributes: 'editor/schema/updateAttributes'
  //   }),
  //   ...mapMutations({
  //     setNewPersonModel: 'editor/schema/attribute/collection/newModel',
  //   }),
  //   submit (newModel) {
  //     this.setNewPersonModel(newModel)
  //     this.createPersonModel()
  //     this.updateParentSchemaAttributes()
  //   }
  // }
}
</script>
