<template>
  <div class="row">
    <div class="col-lg-9">
      <label>{{model.label}}</label>
      <br>
      <small>{{model.help}}</small>
      <MoreInfoLink :url="model.more_info_url" />
    </div>
    <div class="col-lg-3">
      <input type="checkbox" :checked="value" ref="input" @input="updateModel()" v-if="model.type === 'BOOLEAN'">

      <input class='form-control' :value="value" type="text" ref="input" @input="updateModel()" v-if="model.type === 'TEXT'">

      <select class='form-control' :value="value" type="text" ref="input" @input="updateModel()" v-if="model.type === 'TEXT_SELECT'">
        <option :value="opt.value" v-for="opt in model.options" :key="opt.id">{{opt.label}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import MoreInfoLink from '@/components/MoreInfoLink'

export default {
  name: 'OptionFormitem',
  props: ['model', 'value'],
  mounted () {
    console.log(this.value)
  },
  components: {
    MoreInfoLink
  },
  methods: {
    updateModel () {
      console.log('UPDATE MODEL')
      if (this.type === 'BOOL') {
        this.$emit('input', this.$refs.input.checked)
      } else if (this.type === 'NUMBER') {
        this.$emit('input', Number(this.$refs.input.value))
      } else {
        this.$emit('input', this.$refs.input.value)
      }
    }
  }
}
</script>
