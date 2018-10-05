<template>
  <a class='mr-3' role="button" @click.stop="startTour()">
    <i class="fa fa-fw fa-lg fa-question-circle" v-b-tooltip.hover.left :title='"Tutorial"'></i>
  </a>
</template>

<script>
import Driver from 'driver.js'

export default {
  name: 'HelpButton',
  props: ['tour'],
  created () {
    this.driver = new Driver()
  },
  methods: {
    startTour () {
      this.driver.defineSteps(this.tour)
      return this.driver.start()
    }
  }
}
</script>
