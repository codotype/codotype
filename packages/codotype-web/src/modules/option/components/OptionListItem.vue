<template>
  <li :class="className" @click="selectOption(model._id)">
    {{ model.label }}
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OptionListItem',
  props: ['model'],
  methods: mapActions({
    selectOption: 'option/selectModel'
  }),
  computed: {
    className () {
      let css = 'list-group-item list-group-item-action'
      if (this.model._id === this.selectedOption._id) css += ' list-group-item-primary'
      return css
    },
    ...mapGetters({
      selectedOption: 'option/selectedModel'
    })
  }
}
</script>
