<template>
  <b-row>
    <b-col>
      <EditorHeader
        title="Select a generator"
        help="Select a generator with which to build your codebase"
      />
      <hr>

      <b-card-group deck>
        <GeneratorListItem v-for="m in generators" :model="m" :key="m.id" :selectMethod="selectGenerator" v-if="m.id" />
      </b-card-group>

    </b-col>
  </b-row>
</template>

<script>
import EditorHeader from '@/components/EditorHeader'
import GeneratorListItem from '@/modules/generator/components/GeneratorCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    EditorHeader,
    GeneratorListItem
  },
  computed: {
    ...mapGetters({
      newBuildModel: 'build/newModel',
      generatorCollection: 'generator/collection'
    }),
    generators () {
      let generatorIds = this.newBuildModel.stages.map(s => s.generator_id)
      return this.generatorCollection.filter((g) => {
        return !generatorIds.includes(g.id)
      })
    }
  },
  methods: mapActions({
    selectGenerator: 'build/addNewStage'
  })
}
</script>
