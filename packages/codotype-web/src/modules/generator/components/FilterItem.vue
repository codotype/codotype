<template>
  <li :class="className" @click="toggleFilter()">
    <span>{{ label }}</span>
    <input type="checkbox" v-model='checked'>
  </li>
</template>

<script>
export default {
  props: ['label'],
  data () {
    return { checked: false }
  },
  methods: {
    toggleFilter () {
      this.checked = !this.checked
    }
  },
  computed: {
    className () {
      let css = ['list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center']
      if (this.checked) css.push('list-group-item-primary')
      return css.join(' ')
    }
  }
}
</script>

<style scoped>
  li.list-group-item {
    font-size: 0.8rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
</style>
