<template>
  <b-row>
    <b-col lg=12>
      <h2>{{ model.label }} Generator</h2>
      <hr>

      <b-tabs>
        <b-tab title="README.md" active>
          <GeneratorReadme :model="model" class='mt-2'/>
        </b-tab>
        <b-tab title="Global Options" disabled></b-tab>
        <b-tab title="Model Options" disabled></b-tab>
        <b-tab title="Addons" disabled></b-tab>
      </b-tabs>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GeneratorReadme from '@/modules/generator/components/GeneratorReadme'

export default {
  name: 'GeneratorShow',
  props: ['id'],
  components: {
    GeneratorReadme
  },
  created () {
    this.selectModel(this.id)
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    model: 'generator/selectedModel'
  })
}
</script>
