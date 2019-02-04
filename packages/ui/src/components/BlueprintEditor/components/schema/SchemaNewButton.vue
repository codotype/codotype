<template>
  <b-button
    id="new-model-button"
    block
    variant="primary"
    size="lg"
    class="mb-3"
    @click="$store.commit('editor/schema/modals/form/showing', true)"
  >
    <i class="fa fa-fw fa-plus"></i>
    Add Model
  </b-button>
</template>

<script>
export default {
  name: 'SchemaNewButton'
}
</script>
