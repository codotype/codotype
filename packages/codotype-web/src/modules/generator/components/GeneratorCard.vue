<template>
  <div class="card col-lg-3 shadow-hover border-light">
    <div class="card-body">
      <div class="row d-flex align-items-end flex-column">

        <div class="col-lg-12 d-flex justify-content-center">
          <p class="lead mb-0">
            <button @click.prevent="onClick()" class="btn btn-link d-flex align-items-center flex-column" style='text-decoration: none'>
              <i :class="model.icon + ' mb-2'" style="font-size: 4rem"></i>
              {{ model.label }}
            </button>
          </p>
        </div>

        <div class="col-lg-12">
          <p class="card-text mt-2">
            <small>
              {{ model.description }}
            </small>
          </p>
        </div>

      </div>
    </div>

    <div class="card-footer bg-white">
      <small>
        <a class='text-muted' :href="model.github_url">
          <i class="fab fa-github"></i>
          codotype
        </a>
        <span class='badge badge-light text-muted'>{{ model.version }}</span>
        <span class='badge badge-warning' v-if="model.official">Official</span>
        <br>
        <span class='badge badge-primary mr-1' v-for="tag in model.type_tags.slice(0,1)" :key="tag">{{ tag }}</span>
        <span class='badge badge-light mr-1' v-for="tag in model.tech_tags.slice(0,3)" :key="tag">{{ tag }}</span>
        <!-- <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span> -->
      </small>
    </div>

    <!-- <div class="card-footer"> -->
      <!-- <div class="row"> -->
        <!-- <b-col> -->
          <!-- <button class="btn btn-outline-primary btn-block"> -->
            <!-- <i class="fa fa-check"></i> -->
          <!-- </button> -->
          <!-- <span class='badge badge-primary mr-1' v-for="tag in model.type_tags.slice(0,3)" :key="tag">{{ tag }}</span> -->
          <!-- <br> -->
          <!-- <span class='badge badge-light mr-1' v-for="tag in model.tech_tags.slice(0,3)" :key="tag">{{ tag }}</span> -->
        <!-- </b-col> -->
      <!-- </div> -->
    <!-- </div> -->

  </div>
</template>

<script>
import MoreInfoLink from '@/components/MoreInfoLink'
import { mapActions } from 'vuex'

export default {
  name: 'GeneratorListItem',
  props: ['model'],
  components: {
    MoreInfoLink
  },
  methods: {
    ...mapActions({
      selectGenerator: 'build/addNewStage'
    }),
    onClick () {
      this.selectGenerator(this.model.id)
      window.location = '#/build/new'
    }
  }
}
</script>
