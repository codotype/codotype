<template>
  <b-form>
    <p class="mb-2 form-text text-muted">TODO - add attribute form here</p>
    <input v-model="model.label">
  </b-form>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'AttributeForm',
  props: {
    model: {
      required: true
    }
  }
}
</script>
