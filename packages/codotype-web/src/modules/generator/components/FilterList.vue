<template>
  <div class="card border-light shadow-sm">

    <!-- TODO - abstract card-header into separate component -->
    <div class="card-header d-flex justify-content-between align-items-center">
      <p class="lead mb-0">Type</p>
      <button class="btn btn-sm btn-link">
        <i class="fa fa-chevron-down"></i>
      </button>
    </div>

    <ul class="list-group list-group-flush">
      <FilterItem label="Fontend" />
      <FilterItem label="Backend" />
      <FilterItem label="Fullstack" />
      <FilterItem label="Other" />
    </ul>

    <div class="card-header d-flex justify-content-between align-items-center">
      <p class="lead mb-0">Tech</p>
      <button class="btn btn-sm btn-link">
        <i class="fa fa-chevron-down"></i>
      </button>
    </div>

    <ul class="list-group list-group-flush">
      <FilterItem label="Vue.js" />
      <FilterItem label="React.js" />
      <FilterItem label="Express.js" />
      <FilterItem label="Flask" />
    </ul>

  </div>
</template>

<script>
import FilterItem from '@/modules/generator/components/FilterItem'

export default {
  components: {
    FilterItem
  }
}
</script>
