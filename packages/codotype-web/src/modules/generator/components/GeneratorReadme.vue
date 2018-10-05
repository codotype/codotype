<template>
  <div class='card card-body' v-html="compiledMarkdown"></div>
</template>

<!-- // // // //  -->

<script>
import marked from 'marked'

export default {
  props: ['model'],
  computed: {
    compiledMarkdown () {
      return marked(this.model.readme, { sanitize: true })
    }
  }
}
</script>
