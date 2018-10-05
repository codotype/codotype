<template>
  <transition-group name="list" tag='div' class="container-fluid notifications">
    <div class="row" v-for="each in collection" v-bind:key="each.id">
      <NotificationChild :item="each"/>
    </div>
  </transition-group>
</template>

<!-- // // // //  -->

<script>
import NotificationChild from './NotificationChild'
import { mapGetters } from 'vuex'

export default {
  components: {
    NotificationChild
  },
  computed: mapGetters({
    collection: 'notification/collection'
  })
}
</script>

<!-- QUESTION - SCOPED? -->
<style>
  .container-fluid.notifications {
    position: fixed;
    width: 50%;
    right: 0;
    bottom: 0;
    margin-top: 7.5rem;
    margin-bottom: 3rem;
    margin-right: .5rem;
  }

  .list-enter-active, .list-leave-active {
    transition: opacity .1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
  }
</style>
