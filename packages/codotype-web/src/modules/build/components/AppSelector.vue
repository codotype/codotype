<template>
  <b-row>
    <b-col>
      <EditorHeader
        title="Select a Blueprint"
        help="Select a Blueprint to generate your app around"
      />

      <small class='text-muted'>
        <i class="fa fa-info-circle"></i>
        Blueprints encapsulate metadata about models, attributes, and associations that describe the app you're building
      </small>

      <hr>

      <b-row>
        <AppCard v-for="app in appCollection" v-bind:key="app._id" :model="app"/>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
import EditorHeader from '@/components/EditorHeader'
import AppCard from '@/modules/project/components/AppCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    EditorHeader,
    AppCard
  },
  created () {
    this.clearSelectedApp()
  },
  computed: mapGetters({
    appCollection: 'project/collection'
  }),
  methods: mapActions({
    clearSelectedApp: 'project/clearSelected'
  })
}
</script>
