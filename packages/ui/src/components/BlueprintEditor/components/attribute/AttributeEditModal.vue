<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'Edit Attribute'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(editModel)"
    @hide="showModal(false)"
  >
    <AttributeForm :model="editModel" />
  </b-modal>
</template>

<script>
import AttributeForm from '../attribute/AttributeForm'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AttributeNewModal',
  components: {
    AttributeForm
  },
  computed: mapGetters({
    showingModal: 'editor/schema/attribute/modals/edit/showing',
    editModel: 'editor/schema/attribute/collection/editModel'
  }),
  methods: {
    ...mapActions({
      updateModel: 'editor/schema/attribute/collection/update',
      updateParentSchema: 'editor/schema/updateAttributes'
    }),
    ...mapMutations({
      showModal: 'editor/schema/attribute/modals/edit/showing',
      setEditModel: 'editor/schema/attribute/collection/editModel'
    }),
    submit (editModel) {
      this.setEditModel(editModel)
      this.updateModel()
      this.updateParentSchema()
    }
  }
}
</script>
