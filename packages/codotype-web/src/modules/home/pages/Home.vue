<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-12 text-center">
          <!-- <img src="@/assets/logo_dark.png"> -->
          <!-- <img width="30%" src="https://github.com/codotype/codotype-branding/blob/master/codotype-02.png?raw=true"> -->
          <h1 class='display-3' style="font-family: monospace;">codotype</h1>
        </div>
      </div>

      <div class="row py-2">

        <div class="col-lg-12 text-center">
          <!-- <p class="lead">visual web application boilerplate</p> -->
          <p class='lead'>Jumpstart new software projects amazingly fast</p>
          <!-- <p>Define your models, attributes, and relations - codotype does the rest</p> -->
        </div>

        <div class="col-lg-12 text-center d-flex align-items-center justify-content-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
          <!-- <router-link to="/blueprints" class="btn btn-primary btn-block btn-lg"> -->
            <!-- <i class="fa fa-fire mr-2"></i> -->
            <!-- Let's get started. -->
          <!-- </router-link> -->
          <!-- <gh-btns-fork slug="codotype/codotype" show-count></gh-btns-fork> -->
        </div>

        <!-- <div class="col-lg-12 mt-3 text-center d-flex align-items-center justify-content-center"> -->
          <!-- <span> -->
            <!-- <span>Built with</span><i class="fa fa-heart ml-1 text-danger"></i><span class='px-1'>by</span><a href="https://github.com/aeksco" target='_blank'>@aeksco</a> -->
          <!-- </span> -->
        <!-- </div> -->
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <hr class='mt-2'>
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-lg-12 text-center">
          <p class="lead text-muted">Choose a generator to get started</p>
        </div>
        <GeneratorCard v-for="m in generatorCollection.slice(0, 3)" :model="m" :key="m.id" class='mx-2'/>
      </div>

      <div class="row mt-4 mb-4 justify-content-center">
        <div class="col-lg-4">
          <router-link to="/generators" class="btn btn-primary btn-block btn-lg">
            <i class="fa fa-list-alt mr-2"></i>
            <!-- Let's get started. -->
            More Generators
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import GeneratorCard from '@/modules/generator/components/GeneratorCard'
import GeneratorListItem from '@/modules/generator/components/GeneratorListItem'

export default {
  name: 'Home',
  components: {
    GeneratorCard,
    GeneratorListItem
  },
  metaInfo: {
    title: 'Welcome'
  },
  computed: mapGetters({
    generatorCollection: 'generator/collection',
    tourSteps: 'tour/generatorListSteps'
  })
}
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem

  .gh-button-container
    float: none !important
</style>
