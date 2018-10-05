<template>
  <div class="card">
    <div class="card-header">
      <button class="btn btn-outline-success">ADD DEFAULT</button>
      <button class="btn btn-outline-warning">EDIT</button>
      <button class="btn btn-outline-danger">REMOVE</button>
    </div>

    <div class="card-body">
      <p class="lead mb-0">{{ model.label }}</p>
      <small class='text-muted'>{{ model.description }}</small>
      <MoreInfoLink :url="model.more_info_url"/>

      <hr>

      <p class="card-text">{{ model.label }} Attributes</p>
      <button class="btn btn-outline-primary">New Attribute</button>

      <AddonAttributeList :collection="model.attributes" />

      <!-- <pre>{{ model }}</pre> -->

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MoreInfoLink from '@/components/MoreInfoLink'
import AddonAttributeList from './AddonAttributeList'

export default {
  components: {
    MoreInfoLink,
    AddonAttributeList
  },
  computed: mapGetters({
    model: 'addon/selectedModel'
  })
}
</script>
