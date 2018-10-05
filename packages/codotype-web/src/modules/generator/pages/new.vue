<template>
  <div class="row">
    <div class="col-lg-12">

      <b-tabs lazy no-fade>

        <b-tab title="Overview" active>
          <br>
          <GeneratorMetaEditor />
        </b-tab>

        <b-tab title="Global Options" active>
          <br>
          <OptionEditorLayout />
        </b-tab>

        <b-tab title="Model Options">
          <br>
          <ModelOptionEditorLayout />
        </b-tab>

        <b-tab title="Addons">
          <br>
          <AddonEditor/>
        </b-tab>

      </b-tabs>

    </div>
  </div>
</template>

<script>
import AddonEditor from '@/modules/addon/components/AddonEditor'
import GeneratorMetaEditor from '@/modules/generator/components/GeneratorMetaEditor'
import OptionEditorLayout from '@/modules/option/components/OptionEditorLayout'
import ModelOptionEditorLayout from '@/modules/option/components/ModelOptionEditorLayout'

export default {
  name: 'GeneratorForm',
  components: {
    AddonEditor,
    GeneratorMetaEditor,
    OptionEditorLayout,
    ModelOptionEditorLayout
  }
}
</script>
