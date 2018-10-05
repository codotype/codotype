<template>
  <div>

    <EditorHeader
      title="Model Options"
      help="Configure model-specific options for this generator"
      url="https://codotype.github.io"
    />

    <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!selectedGenerator.global_options[0]">
      <p class="lead mb-0">No global options exposed by this generator</p>
    </div>

    <ModelOptionForm v-for="model in schemas" :model="model" :key="model._id" v-else/>

  </div>
</template>

<script>
import EditorHeader from '@/components/EditorHeader'
import ModelOptionForm from './ModelOptionForm'
import { mapGetters } from 'vuex'

export default {
  name: 'GeneratorModelOptions',
  components: {
    EditorHeader,
    ModelOptionForm
  },
  computed: mapGetters({
    model: 'project/selectedModel',
    schemas: 'schema/collection',
    selectedGenerator: 'generator/selectedModel'
  })
}
</script>
