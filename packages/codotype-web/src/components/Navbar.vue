<template>
  <BlueprintMenu v-if="showBlueprintMenu"/>
  <HomeMenu v-else/>
</template>

<script>
import HomeMenu from './HomeMenu'
import BlueprintMenu from './BlueprintMenu'

export default {
  name: 'Navbar',
  components: {
    HomeMenu,
    BlueprintMenu
  },
  computed: {
    showBlueprintMenu () {
      return this.$route.name === 'ProjectShow'
    }
  }
}
</script>

<style lang="sass">

  nav.navbar
    border-bottom: 1px solid #d3d3d3

    .navbar-brand
      letter-spacing: .25rem !important
      font-family: sans-serif
      font-weight: 100
      letter-spacing: 0.1rem
      // text-transform: uppercase
      // font-size: 1.5rem

      strong
        font-weight: 400

      img.logo
        float: left
        margin-right: 0.4rem
        height: 2rem
        display: flex

    // .nav-item
      // font-size: 1.1rem
</style>
