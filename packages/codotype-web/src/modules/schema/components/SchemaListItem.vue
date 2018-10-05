<template>
  <li :class="className" :id="schema.identifier + '-model'" @click="selectModel(schema._id)">

    <div class="row align-items-center">
      <div class="col-md-8">
        {{ schema.label }}
      </div>

      <div class="col-md-4 text-right">
        <span class="badge badge-dark" v-if="!schema.attributes.length" v-b-tooltip.hover.left :title="schema.attributes.length + (schema.attributes.length === 1 ? ' Attribute' : ' Attributes')">
          <i class="fa fa-times mr-1"></i>
          0
        </span>

        <span class="badge badge-dark" v-else v-b-tooltip.hover.left :title="schema.attributes.length + (schema.attributes.length === 1 ? ' Attribute' : ' Attributes')">
          <i class="fa fa-tags mr-1"></i>
          {{ schema.attributes.length }}
        </span>

        <span class="badge badge-dark" v-b-tooltip.hover.right :title="schema.relations.length + (schema.relations.length === 1 ? ' Relation' : ' Relations')">
          <i class="fa fa-link mr-1"></i>
          {{ schema.relations.length }}
        </span>
      </div>

    </div>

  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['schema'],
  methods: mapActions({
    selectModel: 'schema/selectModel'
  }),
  computed: {
    ...mapGetters({
      selectedSchema: 'schema/selectedModel'
    }),
    className () {
      let css = ['list-group-item', 'list-group-item-action']

      if (this.schema._id === this.selectedSchema._id) {
        // css.push('active')
        css.push('list-group-item-primary')
      }

      return css.join(' ')
    },
    enableDestroy () {
      return this.schema.identifier !== 'user'
    }
  }
}
</script>

<style lang="sass" scoped>
  li.list-group-item
    cursor: pointer

  a.row.align-items-center
    text-decoration: none
</style>
