
<template>
  <div class="form-group">
    <label>Option Type</label>
    <small class="form-text text-muted">The type of data represented by this option.</small>

    <!-- Hidden input (instead of select element above) -->
    <!-- <input class="form-control" type='hidden' ref="select" @change="updateModel()" /> -->

    <div class="row">
      <div class="col-sm-6 pb-2" v-for="opt in option_types">
        <OptionTypeItem :opt="opt" :val="value" :click="setOptionType" class='btn-outline-dark' />
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import OptionTypeItem from './OptionTypeItem'

export default {
  props: ['value'],
  components: {
    OptionTypeItem
  },
  computed: mapGetters({
    option_types: 'option/option_types'
  }),
  methods: {
    // TODO - this should hit the vuex store
    // The Vuex store should update the model.datatypeOptions object to reflect the
    // options associated with the selected datatype
    setOptionType (optionType) {
      this.$emit('input', optionType)
    }
  }
}
</script>
