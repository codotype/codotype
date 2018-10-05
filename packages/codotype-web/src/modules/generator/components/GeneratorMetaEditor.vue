<template>
  <div class="row">

    <div class="col-lg-12">
      <p class="lead mb-0">Generator Metadata</p>
      <small class="text-muted">Define the metadata for your new generator</small>
      <MoreInfoLink url="https://github.com/codotype"/>
      <hr>
    </div>

    <div class="col-lg-6">
      <FormInput label="Name" placeholder="Name" v-model="model.label" required="true" help="Name of the generator" />

      <FormInput label="Thumbnail URL" placeholder="Thumbnail URL" v-model="model.thumbnail_url" required="false" help="Thumbnail for the generator" />
    </div>


    <div class="col-lg-6">
      <FormInput label="GitHub URL" placeholder="GitHub URL" v-model="model.github_url" required="false" help="URL for the GitHub repository for this generator" />

      <FormInput label="Description" placeholder="Description" v-model="model.description" required="true" help="Description for this generator" />
    </div>

  </div>
</template>

<script>
import FormInput from '@/components/FormInput'
import MoreInfoLink from '@/components/MoreInfoLink'

export default {
  components: {
    MoreInfoLink,
    FormInput
  },
  data () {
    return {
      model: {
        id: 'react',
        label: 'React',
        thumbnail_url: 'https://via.placeholder.com/350x150',
        github_url: 'https://github.com/codotype/codotype-react-generator',
        description: 'Generate front-end API client applications with React, Redux, Axios, and Bootstrap'
      }
    }
  }
}
</script>
