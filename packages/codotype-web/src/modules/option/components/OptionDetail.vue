<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- New Option Modal -->
      <b-modal
        id="edit-option"
        :title="'Edit Option'"
        @ok="updateOption()"
        ok-title='Update'
        cancel-title='Cancel'
      >
        <OptionForm :model="model" />
      </b-modal>

      <div class="row d-flex align-items-center">

        <div class="col-lg-7">
          <h4 class="mb-0">
            {{ model.label }}
            <button class="btn btn-link py-0" v-b-tooltip.hover.right title='Edit Option'  v-b-modal="'edit-option'">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </h4>
        </div>

        <div class="col-lg-5 d-flex align-items-center justify-content-end">

          <button class='btn btn-sm btn-outline-danger' v-b-modal="'destroy-schema'" v-b-tooltip.hover.left title='Destroy Option'>
            <i class="fa fa-fw fa-trash"></i>
          </button>

          <!-- Destroy Schema Confirmation -->
          <b-modal id="destroy-schema"
            :title="'Destroy Option?'"
            @ok="destroyOption(model)"
            ok-title='DESTROY'
            ok-variant='danger'
            cancel-title='Cancel'
          >
            <p>Are you sure you want to destroy this Option?</p>
          </b-modal>
        </div>

      </div>

    </div>

    <div class="col-lg-12">
      <OptionPreview :model="model" />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OptionForm from './OptionForm'
import OptionPreview from './OptionPreview'

export default {
  name: 'OptionDetail',
  components: {
    OptionForm,
    OptionPreview
  },
  computed: mapGetters({
    model: 'option/selectedModel'
  }),
  methods: mapActions({
    updateOption: 'option/update',
    destroyOption: 'option/destroy'
  })
}
</script>
