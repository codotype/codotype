<template>
  <!-- TODO - use PageHeader component here, similar to App Editor page -->
  <!-- <EditorHeader
    title="Build"
    help="Configure a build using a single App and multiple generators"
    url="https://codotype.github.io"
  />
   -->
  <!-- <hr> -->

  <!-- Step 3 - Configure the generator -->
  <!-- Show ONLY when a generator and app are selected -->
  <div class="row">

    <!-- TODO - this should be shown/hidden depending on something different than 'showSidebar' -->
    <!-- <b-col lg=12 v-if="showSidebar"> -->
      <!-- <BuildHeader/> -->
      <!-- <hr> -->
    <!-- </b-col> -->

    <!-- Abstract this column into one or more components -->
    <b-col lg=3 class="border-right" v-if="showSidebar">

      <!-- <p class='lead mb-0'>App</p> -->
      <!-- <ul class="list-group"> -->
        <!-- <li class="list-group-item list-group-item-action" v-if="newBuildModel.app_id"> -->
          <!-- {{ selectedApp.label }} -->
        <!-- </li> -->
        <!-- <li class="list-group-item list-group-item-warning text-center" v-else> -->
          <!-- <i class="fa fa-warning"></i> -->
          <!-- No app selected -->
        <!-- </li> -->
      <!-- </ul> -->

      <!-- <p class='lead mb-0'>App</p> -->
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" v-if="newBuildModel.app_id">
          <i class="fa fa-database"></i>
          {{ selectedApp.label }}
        </li>
        <li class="list-group-item list-group-item-warning text-center" v-else>
          <i class="fa fa-warning"></i>
          No app selected
        </li>
      </ul>

      <br>
      <!-- <hr> -->

      <button class="btn btn-outline-secondary btn-lg btn-block mb-3" v-if="choosingGenerator" @click="showChoosingGenerator(false)">
        <i class="fa fa-times"></i>
        Cancel
      </button>

      <button class="btn btn-primary btn-lg btn-block mb-3" v-else @click="showChoosingGenerator(true)">
        <i class="fa fa-plus"></i>
        Add Generator
      </button>

      <button class="btn btn-success btn-lg btn-block mb-3" @click="generateCodebase()">
        <i class="fa fa-check"></i>
        Generate
      </button>

      <div class="card">
        <!-- <p class='lead mb-0'>App</p> -->
        <div class="card-header">
          <i class="fa fa-cog"></i>
          Generators
        </div>
        <ul class="list-group list-group-flush">
          <template v-if="newBuildModel.stages[0]" v-for="each in newBuildModel.stages">
            <li class="list-group-item list-group-item-action list-group-item-primary" v-if="each.generator_id === selectedGenerator.id">
              {{ each.generator_id }}
            </li>
            <li class="list-group-item list-group-item-action" @click="selectGeneratorModel(each.generator_id)" v-else>
              {{ each.generator_id }}
            </li>
          </template>

          <!-- <li class="list-group-item list-group-item-action" v-else v-for="each in newBuildModel.stages" v-if="newBuildModel.stages[0]"> -->
            <!-- {{ each.generator_id }} -->
          <!-- </li> -->

          <li class="list-group-item list-group-item-warning text-center" v-if="!newBuildModel.stages[0]">
            <i class="fa fa-warning"></i>
            No generators selected
          </li>
        </ul>
      </div>



    </b-col>

    <div :class="showSidebar ? 'col-lg-9' : 'col-lg-12'">

      <AppShow v-if="showingApp"/>

      <!-- STEP 1 - Select an App -->
      <!-- TODO - this should be determined by a state getter variable, `requiresApp` -->
      <AppSelector v-if="!newBuildModel.app_id"/>

      <!-- STEP 2 - Select a generator -->
      <GeneratorSelector v-if="(newBuildModel.app_id && !newBuildModel.stages[0]) || choosingGenerator"/>

      <!-- TODO - abstract ALL of this into a separate component -->
      <!-- GeneratorConfigure component -->
      <div class="row" v-else-if='newBuildModel.stages[0] && newBuildModel.app_id'>
        <div class="col-lg-12">

          <EditorHeader
            :title="selectedGenerator.label"
            :help="selectedGenerator.description"
            :url="'http://github.com/'+selectedGenerator.github_url"
          />

          <!-- {{ selectedGenerator }} -->

          <span class='badge badge-primary mr-1' v-for="tag in selectedGenerator.type_tags" :key="tag">{{ tag }}</span>
          <span class='badge badge-info' v-if="selectedGenerator.self_configuring">Self-Configuring</span>
          <span class='badge badge-light mr-1' v-for="tag in selectedGenerator.tech_tags" :key="tag">{{ tag }}</span>

          <hr>

          <b-tabs>

            <!-- TODO - move overview into its own component -->
            <b-tab title="README.md" active class='card-body bg-white' v-html="compileMarkdown(selectedGenerator.readme)">
              <!-- <br> -->
              <!-- <div class="card card-body" v-html="compileMarkdown(selectedGenerator.readme)"> -->
              <!-- </div> -->
            </b-tab>

            <!-- <b-tab title="Data Models"> -->
              <!-- <AppShow v-if="selectedApp"/> -->
            <!-- </b-tab> -->

            <b-tab title="Global Options" v-if="selectedGenerator.global_options[0]" >
              <br>
              <GeneratorGlobalOptions/>
            </b-tab>

            <b-tab title="Model Options" v-if="selectedGenerator.model_options[0]" >
              <br>
              <GeneratorModelOptions/>
            </b-tab>

            <b-tab title="Addons" v-if="selectedGenerator.addons[0]" >
              <br>
              <GeneratorAddonForm/>
            </b-tab>

          </b-tabs>

        </div>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import GeneratorModelOptions from '@/modules/build/components/GeneratorModelOptions'
import GeneratorGlobalOptions from '@/modules/build/components/GeneratorGlobalOptions'
import GeneratorAddonForm from '@/modules/build/components/GeneratorAddonForm'
import GeneratorSelector from '@/modules/build/components/GeneratorSelector'
import AppSelector from '@/modules/build/components/AppSelector'
import BuildHeader from '@/modules/build/components/BuildHeader'
import AppShow from '@/modules/project/pages/show'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import marked from 'marked'

export default {
  components: {
    GeneratorModelOptions,
    GeneratorGlobalOptions,
    GeneratorAddonForm,
    GeneratorSelector,
    AppSelector,
    BuildHeader,
    AppShow
  },
  data () {
    return { // TODO - move this into build vuex state
      showingApp: false
    }
  },
  destroyed () {
    this.resetNewBuildModel()
  },
  computed: mapGetters({
    newBuildModel: 'build/newModel',
    schemas: 'schema/collection',
    fetching: 'generator/fetching',
    generatorCollection: 'generator/collection',
    selectedGenerator: 'generator/selectedModel',
    selectedApp: 'project/selectedModel',
    showSidebar: 'build/showSidebar',
    choosingGenerator: 'build/choosingGenerator'
  }),
  methods: {
    ...mapActions({
      resetNewBuildModel: 'build/resetNewModel',
      selectGeneratorModel: 'generator/selectModel',
      generateCodebase: 'build/generate'
    }),
    ...mapMutations({
      showChoosingGenerator: 'build/choosingGenerator'
    }),
    compileMarkdown (markdown) {
      return marked(markdown, { sanitize: true })
    }
  }
}
</script>
