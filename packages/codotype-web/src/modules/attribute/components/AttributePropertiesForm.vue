<template>
  <div class="row mt-2">

    <div class="col-lg-12">
      <p class="lead mb-0">Attribute Properties</p>
    </div>

    <div class="col-lg-6 col-sm-12">
      <FormInput label="Label" :required="true" placeholder="Label" v-model="attributeLabel" example="Example: 'Last Name'" help="The human-readable name for this attribute." />
    </div>

    <div class="col-lg-6 col-sm-12">
      <FormInput label="Field Name" :required="true" placeholder="Field Name" v-model="model.identifier" example="Example: 'last_name'" help="Lowercase, no spaces." />
    </div>

    <div class="col-sm-12">
      <FormInput label="Description" placeholder="Description" v-model="model.help" example="Example: 'The Last Name of the individual'" help="A description of this attribute." />
    </div>

    <!-- TODO - keep this? -->
    <!-- <div class="form-group"> -->
      <!-- <label>Preferred Display Attribute</label> -->
      <!-- <small class="form-text text-muted">This attribute will be the user-facing label when entities belonging to this schema are referenced in a relation.</small> -->
      <!-- <input type="checkbox" class="form-control" v-model="model.preferred" > -->
    <!-- </div> -->

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
    datatypeLabel () {
      let datatypes = this.$store.getters['schema/datatypes']
      let datatype = datatypes.find(d => d.value === this.model.datatype)
      return datatype.text
    },
    attributeLabel: {
      get () {
        // console.log('getter: ', this.schema.label)
        return this.model.label
      },
      set (label) {
        this.$store.dispatch('attribute/setLabel', { model: this.model, label: label })
      }
    }
  }
}
</script>
