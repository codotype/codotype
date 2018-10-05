<template>
  <b-row>
    <b-col lg='12'>
      <p class="lead mb-0">{{ title }}</p>
      <small class="text-muted">{{ help }}</small>
      <MoreInfoLink :url="url"/>
    </b-col>
  </b-row>
</template>

<!-- // // // //  -->

<script>
import MoreInfoLink from '@/components/MoreInfoLink'

export default {
  props: ['title', 'help', 'url'],
  components: {
    MoreInfoLink
  }
}
</script>


