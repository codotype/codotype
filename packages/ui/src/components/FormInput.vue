<template>
  <div class="form-group">
    <label>
      {{ label }}
      <span class='text-danger' v-if="required">*</span>
    </label>
    <small class="form-text text-muted" v-if="example && help">{{example}}<br>{{help}}</small>
    <small class="form-text text-muted" v-else-if="help">{{help}}</small>

    <toggle-button
      v-if="type === 'BOOL'"
      ref="input_el"
      :value="value"
      :color="'#4582EC'"
      @change="updateModel()"
    />

    <input
      v-else-if="type === 'DATE'"
      type="date"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    >

    <input
      v-else-if="type === 'TIME'"
      type="time"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    >

    <input
      v-else
      type="text"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    >

  </div>
</template>

<script>

export default {
  props: ['required', 'focus', 'label', 'type', 'example', 'help', 'ex', 'help', 'placeholder', 'value'],
  mounted () {
    if (this.focus) {
      setTimeout(() => { this.$refs.input_el.focus() }, 200) // Minor delay for input element focus
    }
  },
  methods: {
    updateModel () {
      if (this.type === 'BOOL') {
        this.$emit('input', this.$refs.input_el.toggled)
      } else if (this.type === 'NUMBER') {
        this.$emit('input', Number(this.$refs.input_el.value))
      } else {
        this.$emit('input', this.$refs.input_el.value)
      }
    }
  }
}
</script>

<style lang="sass">
  .form-group
    label
      margin-bottom: 0
    small
      margin-bottom: .6rem
</style>
