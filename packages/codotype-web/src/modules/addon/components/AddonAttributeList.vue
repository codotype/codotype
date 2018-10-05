<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="m in collection">
      {{ m.label }}
      {{ m.identifier }}
      <button class="btn btn-sm btn-outline-warning">EDIT</button>
      <button class="btn btn-sm btn-outline-danger">DELETE</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AddonAttributeList',
  props: ['collection']
}
</script>
