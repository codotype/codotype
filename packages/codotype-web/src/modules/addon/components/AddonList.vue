<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item list-group-item-action" v-for="m in collection" @click="selectAddon(m._id)">
      {{ m.label }}
    </li>
    <li class="list-group-item list-group-item-warning" v-if="!collection[0]">
      No addons defined
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddonList',
  computed: mapGetters({
    collection: 'addon/collection'
  }),
  methods: mapActions({
    selectAddon: 'addon/selectModel'
  })
}
</script>
