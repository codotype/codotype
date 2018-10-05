<template>
  <div class="row">
    <div class="col-sm-12">

      <div class="form-group">
        <label class='mb-0'>
          Label
          <span class='text-danger'>*</span>
        </label>
        <small class="form-text text-muted mb-2">The name of your project</small>
        <input type="text" class="form-control" placeholder="Label" v-model="newModel.label" @input="setIdentifier()">
      </div>

    </div>

    <div class="col-sm-12">
      <button class="btn btn-lg btn-primary btn-block" @click="submit()">
        <i class="fa fa-fw fa-plus"></i>
        Create Blueprint
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectForm',
  props: ['submit'],
  mounted () {
    this.resetNewModel()
  },
  computed: mapGetters({
    newModel: 'project/newModel'
  }),
  methods: mapActions({
    resetNewModel: 'project/resetNewModel',
    setIdentifier: 'project/setIdentifier'
  })
}
</script>
