<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'New Schema'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(newModel)"
    @hide="showModal(false)"
  >

    <b-form>
      <p class="mb-2 form-text text-muted">Define the core metadata that's used to create a valid model.</p>
      <input type="" v-model="schemaLabel" name="">
    </b-form>

    <div class="col-lg-12">
      <p class="mb-2 form-text text-muted">Validate the results below before submission</p>

      <table class="table table-sm">
        <tbody>
          <tr>
            <td>
              Label
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Label" is the human readable token for this model'></i>
            </td>
            <td>{{ newModel.label || '...' }}</td>
          </tr>
          <tr>
            <td>Label Plural</td>
            <td>{{ newModel.label_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Identifier
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Identifier" is the lowecase, underscored token for this model'></i>
            </td>
            <td>{{ newModel.identifier || '...' }}</td>
          </tr>
          <tr>
            <td>Identifier Plural</td>
            <td>{{ newModel.identifier_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Class Name
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Class Name" is title-cased whitespace-free token for this model'></i>
            </td>
            <td>{{ newModel.class_name || '...' }}</td>
          </tr>
          <tr>
            <td>Class Name Plural</td>
            <td>{{ newModel.class_name_plural || '...' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'SchemaForm',
  computed: {
    ...mapGetters({
      showingModal: 'editor/schema/modals/form/showing',
      newModel: 'editor/schema/collection/newModel'
    }),
    schemaLabel: {
      get () {
        return this.newModel.label
      },
      set (label) {
        this.$store.dispatch('editor/schema/setLabel', label)
      }
    }
  },
  methods: {
    ...mapActions({
      createPersonModel: 'editor/schema/collection/create',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/form/showing',
      setNewPersonModel: 'editor/schema/collection/newModel',
    }),
    submit (newModel) {
      this.setNewPersonModel(newModel)
      this.createPersonModel()
    }
  }
}
</script>
