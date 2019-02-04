<template>
  <b-row>
    <b-col lg=12>

      <div class='card' id='relation-detail'>

        <div class="card-header d-flex justify-content-between align-items-center">

          <span>
            <i class="fa fa-link mr-1"></i>
            Relationships
          </span>

          <NewModalButton
            id="add-relation-button"
            vuexModule="editor/schema/relation/modals/form/showing"
          />

        </div>

        <b-list-group flush v-if="collection[0]">
          <RelationListItem v-for="item in collection" :key="item.id" :model="item" />
        </b-list-group>

        <!-- NOTES FROM OLD VERSION -->
        <!-- <ul v-if="!relations.length && !referencedBy.length"> -->
        <b-list-group flush v-else>
          <b-list-group-item class="text-center text-primary">
            <i class="fa fa-lg fa-info-circle"></i>
            <p class="mb-0 mt-1">
              <!-- TODO - Click to add your first Relation -->
              Relations define associations between different models
            </p>
          </b-list-group-item>
        </b-list-group>

      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import NewModalButton from '../NewModalButton'
import RelationListItem from './RelationListItem'

export default {
  name: 'RelationList',
  components: {
    NewModalButton,
    RelationListItem
  },
  computed: mapGetters({
    collection: 'editor/schema/relation/collection/items'
  })
}
</script>
