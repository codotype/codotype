<template>
  <b-row>
    <b-col lg="12">

      <!-- Validations -->
      <FormInput label="Required" placeholder="Required" v-model="model.required" help="Whether or not a value for this option is required" type="BOOL" v-if="model.type !== 'BOOL'"/>

      <FormInput label="Default Value" placeholder="Default Value" v-model="model.default_value" help="The default value for this option" :type="model.type" v-if="model.type === 'TEXT'" />

      <!-- NUMBER_SELECT -->
      <ArrayInput
        label="Number Select Options"
        placeholder="Number Select Options"
        help="Define options values for this number dropdown"
        v-model="model.datatypeOptions.dropdownOptions"
        :type="model.type"
        v-if="model.type === 'NUMBER_SELECT' || model.type === 'TEXT_SELECT'"
      />

      <!-- MULTIPLE -->
      <FormInput
        label="Select Multiple"
        placeholder="Select Multiple"
        v-model="model.datatypeOptions.multiple"
        help="Whether or not a user can select multiple options"
        type="BOOL"
        v-if="model.type === 'NUMBER_SELECT' || model.type === 'TEXT_SELECT'"
      />

      <!-- TODO - add form elements for the rest of these options -->
      <!-- datatypeOptions: {} -->
      <!-- Different types of configurations for TEXT_DROPDOWN and whatnot -->

    </b-col>
  </b-row>
</template>

<script>
import FormInput from '@/components/FormInput'
import ArrayInput from '@/components/ArrayInput'

export default {
  props: ['model'],
  components: {
    FormInput,
    ArrayInput
  }
}
</script>
