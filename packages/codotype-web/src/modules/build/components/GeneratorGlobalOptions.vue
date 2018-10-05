<template>
  <div>
    <EditorHeader
      title="Global Options"
      help="Configure global options for this generator"
      url="https://codotype.github.io"
    />

    <div class="card card-body" v-for="attr in selectedGenerator.global_options">
      <OptionFormItem :model="attr" />
    </div>

    <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!selectedGenerator.global_options[0]">
      <p class="lead mb-0">No global options exposed by this generator</p>
    </div>
  </div>
</template>

<script>
import EditorHeader from '@/components/EditorHeader'
import OptionFormItem from '@/modules/option/components/OptionFormItem'
import { mapGetters } from 'vuex'

export default {
  name: 'GeneratorGlobalOptions',
  components: {
    EditorHeader,
    OptionFormItem
  },
  computed: mapGetters({
    selectedGenerator: 'generator/selectedModel'
  })
}
</script>
