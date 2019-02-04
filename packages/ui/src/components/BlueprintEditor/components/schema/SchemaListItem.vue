<template>
  <b-list-group-item
    @click="selectModel(model)"
    :active="isSelected"
  >
    {{ model.label }}
  </b-list-group-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SchemaListItem',
  props: {
    model: {
      required: true
    }
  },
  computed: {
    isSelected () {
      return this.model.id === this.$store.getters['editor/schema/selectedModel/id']
    }
  },
  methods: mapActions({
    selectModel: 'editor/schema/selectModel'
  })
}
</script>
