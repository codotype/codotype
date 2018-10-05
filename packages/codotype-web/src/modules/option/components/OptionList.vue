<template>
  <ul class="list-group list-group-flush">
    <OptionListItem v-for="model in collection" :key="model.id" :model="model" />
    <li class="list-group-item list-group-item-warning" v-if="!collection[0]">
      No options defined
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import OptionListItem from './OptionListItem'

export default {
  name: 'OptionList',
  components: {
    OptionListItem
  },
  computed: mapGetters({
    collection: 'option/collection'
  })
}
</script>
