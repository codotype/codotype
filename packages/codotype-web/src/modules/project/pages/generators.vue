<template>
  <div class="row">
    <div class="col-lg-12 d-flex justify-content-between align-items-center">
      <h2>Select a Generator</h2>
      <span>
        <HelpButton :tour="tourSteps" />
      </span>
    </div>
    <div class="col-lg-12">
      <hr>
    </div>
    <div class="col-lg-12" >
      <GeneratorListItem v-for="m in generatorCollection" :model="m" :key="m.id" :selectMethod="onSelect" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeneratorListItem from '@/modules/generator/components/GeneratorListItem'
import HelpButton from '@/components/HelpButton'

export default {
  components: {
    GeneratorListItem,
    HelpButton
  },
  computed: mapGetters({
    generatorCollection: 'generator/collection',
    tourSteps: 'tour/generatorListSteps'
  }),
  methods: {
    onSelect (generator) {
      console.log('SELECTED')
      console.log(generator) // TODO - send this generator and the app to the build module
      window.location = '#/build/new'
    }
  }
}
</script>
