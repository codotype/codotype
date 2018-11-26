<template>
  <div class="row">
    <div class="col-lg-12">
      <p class="lead mb-0">{{ title }}</p>
      <small class="text-muted">{{ help }}</small>
      <MoreInfoLink :url="url"/>
      <hr>
    </div>

    <div class="col-lg-4 border-right">

      <slot name="modal" />

      <div class="card mt-3">
        <div class="card-header d-flex align-items-center">
          <i :class="'mr-2 fa ' + icon"></i>
          {{ title }}
        </div>
        <slot name="list" />
      </div>
    </div>

    <div class="col-lg-8">
      <slot name="detail" />
    </div>

  </div>
</template>

<script>
import MoreInfoLink from './MoreInfoLink'

export default {
  props: ['title', 'url', 'help', 'icon', 'button'],
  components: {
    MoreInfoLink
  }
}
</script>
