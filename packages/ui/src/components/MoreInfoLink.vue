<template>
  <small>
    <a :href="url" target="_blank" class='d-flex align-items-center' v-if="url">
      <i class="fa fa-external-link-alt mr-1"></i>
      More Info
    </a>
  </small>
</template>

<script>
export default {
  name: 'MoreInfoLink',
  props: ['url']
}
</script>
