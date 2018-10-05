
<template>
  <div class="row">

    <!-- Edit Attribute Form -->
    <b-modal lazy
      size="lg"
      :title="'Edit Attribute'"
      ref='editAttributeModal'
      @ok="updateAttribute()"
      ok-title='Update'
      cancel-title='Cancel'
    >
      <AttributeForm :schema="schema" :model="editAttribute" />
    </b-modal>

    <!-- New Attribute Form -->
    <b-modal lazy
      size="lg"
      ref="newAttributeModal"
      :title="'New Attribute'"
      @ok="createAttribute()"
      ok-title='Create'
      cancel-title='Cancel'
    >
      <AttributeForm :schema="schema" :model="newAttribute" />
    </b-modal>

     <div class="col-lg-12">
      <div class="card" id='attribute-detail'>

        <!-- Attribute card header -->
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>
            <i class="fa fa-tags mr-1"></i>
            Attributes
          </span>
          <button class="btn btn-sm btn-primary" id="add-attribute-button" @click="showNewAttributeForm()">
            <i class="fa fa-plus"></i>
            Add Attribute
          </button>
        </div>

        <!-- Draggable Attribute List -->
        <draggable class='list-group list-group-flush'
          v-model='attributes'
          :options="sortableOptions"
          v-if="attributes.length"
        >

          <!-- Attribute List Items -->
          <AttributeListItem
            v-for="each in attributes"
            :item="each"
            :key="each._id"
            :schema="schema"
            :edit="selectEditAttribute"
          />

        </draggable>

        <!-- No Attributes View -->
        <ul class="list-group list-group-flush" v-if="!attributes.length">
          <li class="list-group-item text-center bg-transparent border-primary text-primary">
            <i class="fa fa-lg fa-info-circle"></i>
            <p class="mb-0 mt-1">
              <!-- TODO - Click to add your first Attribute -->
              <!-- Please create at least one attribute -->
              Attributes define properties that can be assigned to a single model
            </p>
          </li>
        </ul>

      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import orderBy from 'lodash/orderBy'
import smoothReflow from 'vue-smooth-reflow'
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import AttributeListItem from './AttributeListItem'
import AttributeForm from './AttributeForm'
export default {
  mixins: [smoothReflow],
  components: {
    draggable,
    AttributeListItem,
    AttributeForm
  },
  mounted () {
    this.$smoothReflow()
  },
  methods: {
    ...mapActions({
      createAttribute: 'attribute/create',
      updateAttribute: 'attribute/update',
      selectEditAttr: 'attribute/selectEditModel',
      resetNewAttribute: 'attribute/resetNewModel'
    }),
    showNewAttributeForm () {
      this.resetNewAttribute()
      this.$refs.newAttributeModal.show()
    },
    selectEditAttribute (attr) {
      this.selectEditAttr(attr)
      this.$refs.editAttributeModal.show()
    }
  },
  computed: {
    ...mapGetters({
      schema: 'schema/selectedModel',
      editAttribute: 'attribute/editModel',
      newAttribute: 'attribute/newModel'
    }),
    sortableOptions () {
      return {
        animation: 150,
        fallbackTolerance: 100
      }
    },
    // TODO - this should be moved into Vuex store, but how?
    attributes: {
      get () {
        this.schema.attributes = orderBy(this.schema.attributes, ['order'], ['asc'])
        return this.schema.attributes
      },
      set (value) {
        value.forEach((s, i) => { s.order = i })
      }
    }
  }
}
</script>
