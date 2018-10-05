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
      <b-modal id="new-addon" :title="'New Addon'" size="lg" @ok="createAddon()" ok-title='Create'>
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
import EditorLayout from '@/components/EditorLayout'
import AddonForm from './AddonForm'
import AddonList from './AddonList'
import AddonDetail from './AddonDetail'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddonEditor',
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
