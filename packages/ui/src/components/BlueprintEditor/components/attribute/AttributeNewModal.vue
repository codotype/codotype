<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'New Attribute'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(newModel)"
    @hide="showModal(false)"
  >
    <AttributeForm :model="newModel" />
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
    showingModal: 'editor/schema/attribute/modals/new/showing',
    newModel: 'editor/schema/attribute/collection/newModel'
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/attribute/collection/create',
      updateParentSchema: 'editor/schema/updateAttributes'
    }),
    ...mapMutations({
      showModal: 'editor/schema/attribute/modals/new/showing'
    }),
    submit (newModel) {
      this.createModel()
      this.updateParentSchema()
    }
  }
}
</script>
