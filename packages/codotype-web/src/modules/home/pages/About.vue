<template>
  <div class="row align-items-center">
    <div class="col-lg-12">

      <!-- <div class="row mt-2"> -->
        <!-- <div class="col-lg-12 text-center"> -->
          <!-- <h2>A B O U T</h2> -->
        <!-- </div> -->
      <!-- </div> -->

      <div class="row mt-2">
        <div class="col-lg-12 text-center">
          <!-- <img class='logo' src="@/assets/logo_dark.png"> -->
          <!-- <img width="30%" src="https://github.com/codotype/codotype-branding/blob/master/codotype-02.png?raw=true"> -->
          <h1 class='display-1' style="font-family: monospace;">codotype</h1>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-12 text-center">
          <p>Prototype projects amazingly fast.</p>
          <p>Codotype is a platform for model-driven code generation.</p>
          <p>The goal is to eliminate 'friction' in the process of collecting model metadata and passing it to a generator.</p>
        </div>

        <div class="col-lg-12 text-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>

          <br>
          <br>

          <p class="lead mb-0">
            <span>Built with </span><i class="fa fa-heart text-danger"></i><span class='px-1'>by</span><a href="https://github.com/aeksco" target='_blank'>@aeksco</a>
          </p>

          <gh-btns-follow class='mt-3' user="aeksco" show-count></gh-btns-follow>

          <!-- <br> -->
          <!-- <br> -->

          <!-- Share -->
          <!-- <social-sharing class='mt-3' url="https://codotype.io" inline-template> -->
            <!-- <div> -->
              <!-- <network network="facebook"> -->
                <!-- <i class="fab fa-lg fa-facebook mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="googleplus"> -->
                <!-- <i class="fab fa-lg fa-google-plus mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="linkedin"> -->
                <!-- <i class="fab fa-lg fa-linkedin mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="pinterest"> -->
                <!-- <i class="fab fa-lg fa-pinterest mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="reddit"> -->
                <!-- <i class="fab fa-lg fa-reddit mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="twitter"> -->
                <!-- <i class="fab fa-lg fa-twitter mx-1"></i> -->
              <!-- </network> -->
              <!-- <network network="vk"> -->
                <!-- <i class="fa fa-lg fa-vk"></i> -->
              <!-- </network> -->
              <!-- <network network="weibo"> -->
                <!-- <i class="fa fa-lg fa-weibo"></i> -->
              <!-- </network> -->
              <!-- <network network="whatsapp"> -->
                <!-- <i class="fa fa-lg fa-whatsapp"></i> -->
              <!-- </network> -->
            <!-- </div> -->
          <!-- </social-sharing> -->

          <br>
          <br>

          Get in touch.
          <br>
          <br>
          <a class='px-2' href="http://github.com/codotype/codotype" target='_blank'>
            <i class="fab fa-2x fa-github"></i>
          </a>

          <a class='px-2' href="mailto:aeksco@gmail.com" target='_blank'>
            <i class="far fa-2x fa-envelope"></i>
          </a>

        </div>
      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  name: 'About',
  metaInfo: {
    title: 'About'
  }
}
</script>

<style lang="sass" scoped="true">

  img.logo
    height: 4rem

</style>
