<template>
  <b-row>
    <b-col lg=12>

      <div class="card" id='attribute-detail'>

        <!-- Attribute card header -->
        <div class="card-header d-flex justify-content-between align-items-center">

          <span>
            <i class="fa fa-tags mr-1"></i>
            Attributes
          </span>

          <NewModalButton
            id="add-attribute-button"
            vuexModule="editor/schema/attribute/modals/new/showing"
          />

        </div>

        <b-list-group flush>
          <AttributeListItem v-for="item in collection" :key="item.id" :item="item" />
        </b-list-group>

      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import NewModalButton from '../NewModalButton'
import AttributeListItem from './AttributeListItem'

export default {
  name: 'AttributeList',
  components: {
    NewModalButton,
    AttributeListItem
  },
  computed: mapGetters({
    collection: 'editor/schema/attribute/collection/items'
  })
}
</script>
