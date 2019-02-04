<template>
  <b-button
    variant="primary"
    size="sm"
    @click="$store.commit(vuexModule, true)"
  >
    <i class="fa fa-fw fa-plus"></i>
  </b-button>
</template>

<script>
export default {
  name: 'NewModalButton',
  props: {
    'vuexModule': {
      type: String,
      required: true
    },
  }
}
</script>
<NewModalButton />
