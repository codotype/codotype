<template>
  <b-row>
    <b-col lg='12'>
      <span class='d-flex align-items-center'>
        <p class="lead mb-0 mr-3">{{ title }}</p>
        <MoreInfoLink :url="url"/>
      </span>
      <small class="text-muted">{{ help }}</small>
    </b-col>
  </b-row>
</template>

<!-- // // // //  -->

<script>
import MoreInfoLink from './MoreInfoLink'

export default {
  props: ['title', 'help', 'url'],
  components: {
    MoreInfoLink
  }
}
</script>


