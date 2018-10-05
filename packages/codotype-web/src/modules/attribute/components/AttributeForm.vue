
<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- <small class="form-text text-muted">Define the core parameters that are used to create a valid Attribute.</small> -->

      <!-- Step 1 - Select Datatype -->
      <DatatypeSelector v-model="model.datatype" v-if="formStep" />

      <template v-else>
        <b-tabs pills v-if="model.datatype !== 'RELATION'">
          <b-tab title="Properties" active>
            <AttributePropertiesForm :model="model" />
          </b-tab>
          <b-tab title="Validations" >
            <AttributeValidationsForm :model="model" />
          </b-tab>
        </b-tabs>

        <!-- <RelationForm :schema="schema" :model="model" v-if="model.datatype === 'RELATION'" /> -->
      </template>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import DatatypeSelector from './DatatypeSelector'
import AttributePropertiesForm from './AttributePropertiesForm'
import AttributeValidationsForm from './AttributeValidationsForm'

export default {
  props: ['schema', 'model'],
  components: {
    DatatypeSelector,
    AttributePropertiesForm,
    AttributeValidationsForm
  },
  computed: {
    formStep () {
      // return (this.model._id || !this.model.datatype)
      return (!this.model.datatype)
    }
  }
}
</script>

<!-- TODO - abstract elsewhere, or scope to this component -->
<style lang="sass">
  @import '../../../sass/vendor.sass'

  .form-group
    label
      margin-bottom: 0
    small
      margin-bottom: .6rem
</style>
