<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'New Relation'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(newModel)"
    @hide="showModal(false)"
  >

    <b-form>
      <p class="mb-2 form-text text-muted">TODO - add relation form here</p>
      <input type="" v-model="newModel.label" name="">
    </b-form>

  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'RelationForm',
  computed: mapGetters({
    showingModal: 'editor/schema/relation/modals/form/showing',
    newModel: 'editor/schema/relation/collection/newModel'
  }),
  methods: {
    ...mapActions({
      createPersonModel: 'editor/schema/relation/collection/create',
      updateParentSchemaRelations: 'editor/schema/updateRelations'
    }),
    ...mapMutations({
      showModal: 'editor/schema/relation/modals/form/showing',
      setNewPersonModel: 'editor/schema/relation/collection/newModel'
    }),
    submit (newModel) {
      this.setNewPersonModel(newModel)
      this.createPersonModel(),
      this.updateParentSchemaRelations()
    }
  }
}
</script>
