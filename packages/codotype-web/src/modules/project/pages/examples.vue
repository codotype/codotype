<template>
  <div class="container">

    <!-- TODO - abstract into PageHeader component -->
    <div class="row">
      <div class="col-lg-8">
        <h2>
          Example Apps
        </h2>
      </div>

      <div class="col-lg-4 text-right">
        <a class='btn btn-lg btn-outline-primary' href="#/blueprints">
          <i class="fa fa-fw fa-reply mr-2"></i>
          My Apps
        </a>
      </div>

      <div class="col-lg-12">
        <hr>
      </div>
    </div>

    <!-- Example Project List -->
    <ListView />

  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/project/components/ExampleList'

export default {
  name: 'example_list',
  metaInfo: {
    title: 'Examples'
  },
  components: {
    ListView
  }
}
</script>
