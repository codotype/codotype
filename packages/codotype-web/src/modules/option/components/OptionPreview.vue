<template>
  <b-row>
    <b-col lg='12'>
      <p class='card-text'>
        {{ model.label }}
        <small class="ml-2 text-muted">
          {{ model.identifier }}
        </small>
      </p>
    </b-col>

    <b-col lg='12'>
      <hr>
    </b-col>

    <b-col lg='12'>
      <p>Preview:</p>
      <b-card>
        <OptionFormItem :model="model" />
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import OptionFormItem from './OptionFormItem'
import MoreInfoLink from '@/components/MoreInfoLink'

export default {
  name: 'OptionPreview',
  props: ['model'],
  components: {
    MoreInfoLink,
    OptionFormItem
  }
}
</script>
