
<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>
        <i class="fa fa-database mr-1"></i>
        Models
      </span>
    </div>
    <ul class='list-group list-group-flush'>
      <SchemaListItem v-for="schema in collection" :schema="schema" :key="schema._id" />
    </ul>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import smoothReflow from 'vue-smooth-reflow'
import SchemaListItem from './SchemaListItem'

export default {
  mixins: [smoothReflow],
  components: {
    SchemaListItem
  },
  mounted () {
    this.$smoothReflow()
  },
  computed: mapGetters({
    collection: 'schema/collection'
  })
}
</script>


