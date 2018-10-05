
<template>
  <div class="row">

    <div class="col-lg-12">
      <EditorHeader :help="'Defines the attributes that can be assigned to a single ' + schema.label" />
    </div>

    <!-- Record Form -->
    <div class="col-lg-12">
      <RecordForm :record="record" :onSubmit="updateRecord" />
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import RecordForm from '@/components/record/RecordForm'

export default {
  props: ['project_id', 'schema_id', 'record_id'],
  metaInfo: {
    title: 'Seed - New'
  },
  components: {
    RecordForm
  },
  created () {
    // this.selectRecord(this.record_id)
    let recordModel = this.$store.getters['record/collection'].find(m => m._id === this.record_id)
    console.log(this.record_id)
    console.log(recordModel)
    this.selectRecord(recordModel)
  },
  computed: mapGetters({
    record: 'record/editModel',
    schema: 'schema/selectedModel'
  }),
  methods: mapActions({
    updateRecord: 'record/update',
    selectRecord: 'record/selectEditModel'
  })
}
</script>
