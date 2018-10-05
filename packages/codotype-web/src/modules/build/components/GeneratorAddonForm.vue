<template>
  <EditorLayout
    title="Addons"
    help="Addons expose an additional layer of configuration for individual generators."
    url="https://github.com/codotype"
    icon="fa-link"
    button="New Addon"
  >

    <!-- New Option Modal -->
    <template slot="modal">
      <b-modal id="new-addon" :title="'New Addon'" @ok="createAddon()" ok-title='Create'>
        <AddonForm :model="newAddon" />
      </b-modal>

      <button class="btn btn-lg btn-primary btn-block" v-b-modal="'new-addon'">
        <i class="fa fa-plus"></i>
        New Addon
      </button>
    </template>

    <template slot="list">
      <AddonList />
    </template>

    <template slot="detail">
      <AddonDetail />
    </template>

  </EditorLayout>
</template>

<script>
// TODO - refactor this component to create new instances of Addon models
import EditorLayout from '@/components/EditorLayout'
import AddonForm from '@/modules/addon/components/AddonForm'
import AddonList from '@/modules/addon/components/AddonList'
import AddonDetail from '@/modules/addon/components/AddonDetail'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GeneratorAddonForm',
  components: {
    EditorLayout,
    AddonForm,
    AddonList,
    AddonDetail
  },
  computed: mapGetters({
    newAddon: 'addon/newModel'
  }),
  methods: mapActions({
    createAddon: 'addon/create'
  })
}
</script>
