<template>
  <div class="col-lg-4 mb-4">
    <div class="card border-light shadow-hover">
      <div class="card-body">
        <div class="row d-flex align-items-end flex-column">

          <div class="col-lg-12">
            <p class="lead mb-0">
              <button @click.prevent="onClick()" class="btn btn-link d-flex align-items-center flex-column" style='text-decoration: none; font-size: 1.5rem;'>
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
        <!-- <small> -->
          <!-- <a class='text-muted' :href="model.github_url"> -->
            <!-- <i class="fa fa-github"></i> -->
            <!-- codotype -->
          <!-- </a> -->
          <!-- <span class='badge badge-light text-muted'>{{ model.version }}</span> -->
          <!-- <span class='badge badge-warning' v-if="model.official">Official</span> -->
          <!-- <br> -->
          <!-- <span class='badge badge-light mr-1' v-for="tag in model.tech_tags.slice(0,3)" :key="tag">{{ tag }}</span> -->
          <!-- <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span> -->
        <!-- </small> -->
        <span class='badge badge-primary mr-1' v-for="tag in model.schemas" :key="tag.id">
          {{ tag.label }}
        </span>
      </div>
    </div>

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
      selectApp: 'build/selectApp'
    }),
    onClick () {
      this.selectApp(this.model._id)
      window.location = '#/build/new'
    }
  }
}
</script>
