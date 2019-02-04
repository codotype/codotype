<template>
  <b-list-group-item>

    <!--  -->
    <!--  -->
    <!--  -->
    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-lg-1 text-left d-flex align-items-center">
        <!-- <i class="fa fa-lg fa-fw fa-bars mr-3" v-if="!item.locked"></i> -->
        <i class="fa fa-lg fa-fw fa-bars mr-3" style='cursor: grab;' v-if="!item.locked"></i>
        <i class="fa fa-fw text-primary fa-eye mr-3" v-if="item.order === 0"  v-b-tooltip.hover.left title='Leading attribute'></i>
      </div>

      <!-- TODO - re-integrate AttributeLabel component -->
      <div class="col-lg-5">

        <!-- <AttributeLabel :item="item"/> -->
        {{ item.label }}

      </div>

      <div class="col-lg-3">
        <!-- REQUIRED -->
        <!-- <span class="badge" v-if="item.required" v-b-tooltip.hover.top title="Required"> -->
          <!-- <i class="fa fa-asterisk text-danger"></i> -->
        <!-- </span> -->

        <!-- UNIQUE Badge -->
        <span
          v-if="item.unique"
          title="Unique"
          class="badge badge-light"
          v-b-tooltip.hover.top
        >
          <i class="fas fa-snowflake text-dark"></i>
          Unique
        </span>

      </div>

      <div class="col-lg-3 text-right controls" v-if="item.locked">
        <b-badge
          variant="secondary"
          size="sm"
          v-b-tooltip.hover.left
          title="Locked attributes may not be edited or removed - they are required for correct baseline functionality."
        >
          <i class="fa fa-fw fa-lock"></i>
          Locked
        </b-badge>
      </div>

      <div class="col-lg-3 text-right controls" v-else>

        <b-button
          size="sm"
          title="Edit"
          variant="outline-warning"
          v-b-tooltip.hover.top
          @click="editModel"
        >
          <i class="fas fa-fw fa-pencil-alt"></i>
        </b-button>

        <b-button
          size="sm"
          title="Remove"
          variant="outline-danger"
          v-b-tooltip.hover.top
        >
          <i class="fa fa-fw fa-trash"></i>
        </b-button>

      </div>

    </div>
    <!--  -->
    <!--  -->
    <!--  -->



  </b-list-group-item>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'AttributeListItem',
  props: {
    item: {
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setEditModel: 'editor/schema/attribute/collection/editModel',
      showEditModal: 'editor/schema/attribute/modals/edit/showing',
    }),
    editModel () {
      this.setEditModel(this.item)
      this.showEditModal(true)
    }
  }
}
</script>

<!-- TODO - move some of this into AttributeLabel component -->
<style lang='sass' scoped>
  .list-group-item
    // border-left: .25rem solid #666666

  .list-group-item:hover i.fa-bars
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-bars
    transition: opacity .25s ease-in
    opacity: 0

  .badge
    font-weight: 300
    padding: .3rem .3rem

    &.bordered
      border: 1px solid

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
