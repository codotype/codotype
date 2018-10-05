<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top" class='bg-white'>
    <b-navbar-brand to="/">
      <!-- <img class='logo' src="@/assets/logo_dark.png"> -->
      <strong>codotype</strong>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto">

        <!-- Public links -->
        <b-nav-item to="/blueprints">Blueprints</b-nav-item>
        <b-nav-item to="/generators">Generators</b-nav-item>
        <b-nav-item to="/build/new">Build</b-nav-item>
        <!-- <b-nav-item to="/build/new">Marketplace</b-nav-item> -->
        <!-- <b-nav-item to="#/examples">Example Apps</b-nav-item> -->
        <!-- <b-nav-item to="#/generator_new">New Generator</b-nav-item> -->

      </b-navbar-nav>

      <b-navbar-nav class="mr-0">

        <b-nav-item target="_blank" href="https://github.com/codotype">
          <i class="fab fa-lg fa-fw fa-github text-dark"></i>
          <!-- GitHub -->
        </b-nav-item>

        <b-nav-item target="_blank" href="https://twitter.com/codotype">
          <i class="fab fa-lg fa-fw fa-twitter text-primary"></i>
        </b-nav-item>

        <!-- <b-nav-item to="/auth/register"> -->
          <!-- <i class="fa fa-fw fa-user-plus"></i> -->
          <!-- Register -->
        <!-- </b-nav-item> -->

        <!-- <b-nav-item to="/auth/login"> -->
          <!-- <i class="fa fa-fw fa-sign-in-alt"></i> -->
          <!-- Login -->
        <!-- </b-nav-item> -->

      </b-navbar-nav>

    </b-collapse>

  </b-navbar>

</template>

<script>
export default {
  name: 'HomeMenu'
}
</script>
