
<template>
  <div class="row">

    <!-- Edit Attribute Form -->
    <b-modal :id="'edit-relation'"
      lazy
      size="lg"
      :title="'Edit Relation'"
      ref='editRelationModal'
      @ok="updateRelation()"
      ok-title='Update'
      cancel-title='Cancel'
    >
      <RelationForm :schema="schema" :model="editRelation" />
    </b-modal>

    <!-- New Relation Form -->
    <b-modal :id="'new-relation'"
      lazy
      size="lg"
      ref="newRelationModal"
      :title="'New Relation'"
      @ok="createRelation()"
      ok-title='Create'
      cancel-title='Cancel'
    >
      <RelationForm :schema="schema" :model="newRelation" />
    </b-modal>

     <div class="col-lg-12">
      <div class="card" id='relation-detail'>

        <!-- Relation card header -->
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>
            <i class="fa fa-link mr-1"></i>
            Relations
          </span>
          <button class="btn btn-sm btn-primary" id="add-relation-button" @click="showNewRelationForm()">
            <i class="fa fa-plus"></i>
            Add Relation
          </button>
        </div>

        <!-- Draggable Relation List -->
        <draggable class='list-group list-group-flush' v-model='relations' :options="sortableOptions" v-if="relations.length">
          <RelationListItem v-for="each in relations" :item="each" v-if="each.datatype !== 'RELATION'" :key="each._id" :schema="schema" :edit="selectEditRelation" />
        </draggable>

        <!-- Undraggable Reference List -->
        <ul class='list-group list-group-flush' v-if="referencedBy.length">
          <ReferenceListItem v-for="each in referencedBy" :item="each" :key="each._id" :schema="schema" :edit="selectEditRelation" />
        </ul>

        <!-- Empty Relation view -->
        <ul class="list-group list-group-flush" v-if="!relations.length && !referencedBy.length">
          <li class="list-group-item text-center text-primary">
            <i class="fa fa-lg fa-info-circle"></i>
            <p class="mb-0 mt-1">
              <!-- TODO - Click to add your first Relation -->
              Relations define associations between different models
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
import RelationListItem from './RelationListItem'
import ReferenceListItem from './ReferenceListItem'
import RelationForm from './RelationForm'

export default {
  mixins: [smoothReflow],
  components: {
    draggable,
    RelationListItem,
    ReferenceListItem,
    RelationForm
  },
  mounted () {
    this.$smoothReflow()
  },
  methods: {
    ...mapActions({
      createRelation: 'relation/create',
      updateRelation: 'relation/update',
      selectEditAttr: 'relation/selectEditModel',
      resetNewRelation: 'relation/resetNewModel'
    }),
    showNewRelationForm () {
      this.resetNewRelation()
      this.$refs.newRelationModal.show()
    },
    selectEditRelation (attr) {
      this.selectEditAttr(attr)
      this.$refs.editRelationModal.show()
    }
  },
  computed: {
    ...mapGetters({
      schema: 'schema/selectedModel',
      editRelation: 'relation/editModel',
      newRelation: 'relation/newModel'
    }),
    sortableOptions () {
      return {
        animation: 150,
        fallbackTolerance: 100
      }
    },
    referencedBy () {
      const inflatedApp = this.$store.getters['project/inflated']
      const selectedSchema = inflatedApp.schemas.find(s => s._id === this.schema._id)
      return selectedSchema.relations.filter(r => ['REF_BELONGS_TO'].includes(r.type))
    },
    // TODO - this should be moved into Vuex store, but how?
    relations: {
      get () {
        this.schema.relations = orderBy(this.schema.relations, ['order'], ['asc'])
        return this.schema.relations
      },
      set (value) {
        value.forEach((s, i) => { s.order = i })
      }
    }
  }
}
</script>
