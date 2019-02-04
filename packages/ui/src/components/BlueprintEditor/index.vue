<template>
  <div class="row">

    <div class="col-lg-4 border-right">
      <SchemaForm />
      <SchemaNewButton/>
      <SchemaList />
    </div>

    <div class="col-lg-8">
      <SchemaDetail />
    </div>

  </div>
</template>

<script>
import SchemaNewButton from './components/schema/SchemaNewButton'
import SchemaForm from './components/schema/SchemaForm'
import SchemaList from './components/schema/SchemaList'
import SchemaDetail from './components/schema/SchemaDetail'

export default {
  name: 'BlueprintEditor',
  components: {
    SchemaNewButton,
    SchemaForm,
    SchemaList,
    SchemaDetail
  },
  created () {
    this.$store.dispatch('editor/created')
  }
}
</script>
