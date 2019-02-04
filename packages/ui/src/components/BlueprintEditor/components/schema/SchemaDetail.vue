<template>

  <b-row>

    <b-col lg=12>

      <b-row class="d-flex align-items-center">

        <b-col lg=7>
          <h4 class="mb-0 d-flex">

            {{ model.label + ' Model' }}

            <b-button
              v-if="!isUserModel"
              title='Edit Model Name'
              variant="link"
              class="py-0"
              v-b-tooltip.hover.right
            >
              <i class="fas fa-pencil-alt"></i>
            </b-button>

          </h4>
        </b-col>

        <b-col lg=5 class="d-flex align-items-center justify-content-end">

          <b-button
            v-if="!isUserModel"
            title='Remove Model'
            size="sm"
            variant="outline-danger"
            v-b-tooltip.hover.left
          >
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

          <!-- Edit Schema Modal GOES HERE -->
          <!-- Destroy Schema Modal GOES HERE -->
        </b-col>

        <b-col lg=12 class="pb-1">
          <small class="text-muted">
            {{ 'Define attributes and relations that describe a single ' + model.label + ' model'}}
          </small>
        </b-col>

        <!-- USER MODEL NOTICE -->
        <b-col class="pb-1" v-if="isUserModel">
          <b-alert show>
            <i class="fa fa-info-circle mr-2"></i>The <strong>User Model</strong> is included by default
            <br>
            <small>
              It comes pre-loaded with <strong>Email</strong> &amp; <strong>Username</strong> attributes that cannot be removed
            </small>
          </b-alert>
        </b-col>

      </b-row>

    </b-col>

    <b-col lg=12>
      <AttributeList />
      <AttributeNewModal />
      <AttributeEditModal />

      <hr>

      <RelationList />
      <RelationForm />
    </b-col>

  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import AttributeNewModal from '../attribute/AttributeNewModal'
import AttributeEditModal from '../attribute/AttributeEditModal'
import AttributeList from '../attribute/AttributeList'
import RelationForm from '../relation/RelationForm'
import RelationList from '../relation/RelationList'

export default {
  name: 'SchemaDetail',
  components: {
    AttributeNewModal,
    AttributeEditModal,
    AttributeList,
    RelationForm,
    RelationList
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel'
    }),
    isUserModel () {
      return this.model.identifier === 'user'
    }
  }
}
</script>
