<template>
  <li class="list-group-item">
    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-lg-1 text-left d-flex align-items-center">

      </div>

      <div class="col-lg-5">

        <!-- REF_BELONGS_TO -->
        <span class="badge" v-if="item.type === 'REF_BELONGS_TO'">
          <i class="fa fa-link text-primary mr-2" v-b-tooltip.hover.left title='Reference'></i>
          {{inflated.alias.label_plural}}
          <span class="badge badge-light ml-2">Referenced By Many</span>
          <span class="badge badge-light ml-2">one {{ schema.label }} to many {{ inflated.schema.label_plural }}</span>
        </span>

      </div>

      <div class="col-lg-6 text-right controls">
        <button class="btn btn-sm btn-outline-secondary" disabled="true">
          <i class="fa fa-fw fa-lock"></i>
          Locked
        </button>
      </div>

    </div>
  </li>
</template>

<!-- // // // //  -->
<script>
import { mapActions } from 'vuex'
import { inflateRelation } from '@codotype/util/lib/inflate'

export default {
  props: ['item', 'schema'],
  methods: mapActions({
    remove: 'relation/destroy'
  }),
  computed: {
    inflated () {
      let inflated = inflateRelation({ relation: this.item, schemas: this.$store.getters['schema/collection'] })
      // console.log(inflated)
      return inflated
    }
  }
}
</script>

<!-- TODO - move some of this into AttributeLabel component -->
<style lang='sass' scoped>

  .list-group-item:hover .controls
    opacity: 1

  .badge
    font-weight: 300
    padding: .3rem .3rem

    &.bordered
      border: 1px solid

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
