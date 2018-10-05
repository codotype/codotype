<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- TODO - add link to documentation for 'Learn more about Codotype addons here' -->
      <p class="mb-2 form-text text-muted">Define the core metadata that's used to create a valid Addon</p>

      <div class="row">
        <div class="col-lg-6">

          <!-- <FormInput label="Label" placeholder="Label" example="Example: 'Odd Job'" v-model="modelLabel" required="true" help="The human-readable name for a single entity of this model." /> -->
          <FormInput label="Label" placeholder="Label" v-model="modelLabel" required="true" help="Example: 'Odd Job'" />

          <!-- <p class="mb-2 form-text text-muted">Validate the metadata below before submission</p> -->

          <table class="table table-sm">
            <tbody>
              <tr>
                <td>Label</td>
                <td>{{ model.label || '...' }}</td>
              </tr>
              <tr>
                <td>Label Plural</td>
                <td>{{ model.label_plural || '...' }}</td>
              </tr>
              <tr>
                <td>Identifier</td>
                <td>{{ model.identifier || '...' }}</td>
              </tr>
              <tr>
                <td>Identifier Plural</td>
                <td>{{ model.identifier_plural || '...' }}</td>
              </tr>
              <tr>
                <td>Class Name</td>
                <td>{{ model.class_name || '...' }}</td>
              </tr>
              <tr>
                <td>Class Name Plural</td>
                <td>{{ model.class_name_plural || '...' }}</td>
              </tr>
            </tbody>
          </table>

        </div>

        <div class="col-lg-6">
          <!-- <pre>{{model}}</pre> -->

          <FormInput label="Description" placeholder="Description" v-model="model.description" required="true" help="Example: 'A description of the functionality made available by this Addon'" />

          <FormInput label="More Info URL" placeholder="More Info URL" v-model="model.more_info_url" help="A link to a web page with more information about the functionality made available by this Addon'" />

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput'

export default {
  props: ['model'],
  components: {
    FormInput
  },
  computed: {
    modelLabel: {
      get () {
        return this.model.label
      },
      set (label) {
        this.$store.dispatch('addon/setLabel', { model: this.model, label: label })
      }
    }
  }
}
</script>
