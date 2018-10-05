
<template>
  <div class="row mt-2">
    <div class="col-lg-12">
      <div class="card-body">

        <div class="row">
          <div class="col-lg-6 border-right">
            <!-- <AbstractTab :model="model" stackId="client" :stackOpts="opts.client" title="Frontend"/> -->
          </div>
          <div class="col-lg-6">
            <!-- <AbstractTab :model="model" stackId="server" :stackOpts="opts.server" title="Backend"/> -->
          </div>
        </div>

        <hr>

        <!-- Generate Modal Component -->
        <!-- TODO - prevent dismissal -->
        <b-modal ref="modal"
          :title="'Generating...'"
          @ok="generateApplication()"
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="dark"
          body-text-variant="light"
          footer-bg-variant="success"
          footer-text-variant="light"
          ok-variant='success'
          ok-title='GENERATE'
          cancel-title='Cancel'
          cancel-variant='dark'
        >
          <div class="row">
            <div class="col-sm-12 text-center">

              <p class="lead">
                Thank you for using codotype :)
              </p>

              <!-- <pre class='text-left bg-light'>{{model}}</pre> -->
              <!-- <p class="text-left text-warning">TODO - add social media</p> -->
              <!-- <p class="text-left text-warning">TODO - add github</p> -->
              <!-- <p class="text-left text-warning">TODO - add contribute + donate</p> -->

              Share
              <social-sharing class='mt-3' url="I just generated a full-stack app at https://codotype.io" inline-template>
                <div>
                  <network network="facebook">
                    <i class="fa fa-lg fa-facebook mx-1"></i>
                  </network>
                  <network network="googleplus">
                    <i class="fa fa-lg fa-google-plus mx-1"></i>
                  </network>
                  <network network="linkedin">
                    <i class="fa fa-lg fa-linkedin mx-1"></i>
                  </network>
                  <network network="pinterest">
                    <i class="fa fa-lg fa-pinterest mx-1"></i>
                  </network>
                  <network network="reddit">
                    <i class="fa fa-lg fa-reddit mx-1"></i>
                  </network>
                  <network network="twitter">
                    <i class="fa fa-lg fa-twitter mx-1"></i>
                  </network>
                  <!-- <network network="vk"> -->
                    <!-- <i class="fa fa-lg fa-vk"></i> -->
                  <!-- </network> -->
                  <!-- <network network="weibo"> -->
                    <!-- <i class="fa fa-lg fa-weibo"></i> -->
                  <!-- </network> -->
                  <!-- <network network="whatsapp"> -->
                    <!-- <i class="fa fa-lg fa-whatsapp"></i> -->
                  <!-- </network> -->
                </div>
              </social-sharing>

              <br>

              <i class="fa fa-2x fa-spinner fa-spin" v-if="fetching"></i>
              <p class="lead mb-0">Generating...</p>
            </div>
          </div>

        </b-modal>

        <div class="row d-flex justify-content-center">
          <div class="col-lg-6">
            <!-- Opens Generate Modal -->
            <button class="btn btn-lg btn-success btn-block py-4" @click="showGenerateModal()">
              <i class="fa fa-fw fa-play mr-2"></i>
              Generate Application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    model: 'project/selectedModel',
    fetching: 'generator/fetching',
    generatorCollection: 'generator/collection'
  }),
  methods: {
    showGenerateModal () {
      this.$refs.modal.show()
      console.log('generating?')
      // TODO - add a timeout here of a few seconds to allow the user to read the modal's message
      console.log(this.generateApplication())
    },
    ...mapActions({
      generateApplication: 'generator/generate'
    })
  }
}
</script>
