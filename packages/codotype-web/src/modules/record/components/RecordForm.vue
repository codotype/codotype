<template>
  <div class="row">

    <div class='col-lg-6' v-for="attr in schema.attributes" :key="attr._id">
      <div class="form-group">
        <label>
          {{ attr.label }}
          <span class='text-danger' v-if="attr.required">*</span>
        </label>
        <small class="form-text text-danger" v-if="errors[attr.identifier]">{{errors[attr.identifier]}}</small>
        <small class="form-text text-muted" v-else>{{attr.help || 'No description for this attribute' }}</small>

        <!-- TEXT -->
        <input type="text" class="form-control" :placeholder="attr.label" :required="attr.required" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TEXT'">

        <!-- DATE -->
        <input type="date" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'DATE'">

        <!-- TIME -->
        <input type="time" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TIME'">

        <!-- TIME -->
        <input type="datetime-local" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'DATETIME'">

        <!-- BOOL -->
        <input type="checkbox" class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'BOOL'">

        <!-- NUMBER -->
        <input type="number" class="form-control" :placeholder="attr.label" :required="attr.required" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'NUMBER'">

        <!-- COLOR -->
        <input type="color" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'COLOR'">

        <!-- JSON -->
        <!-- TODO - add better editor, validations to this input -->
        <!-- TODO - on change, update record.attributes[attr.identifier] to be JSON.parse() -->
        <textarea type="textarea" class="form-control bg-dark text-light" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'JSON'">
        </textarea>

        <!-- PHONE_NUMBER -->
        <!-- <masked-input type="tel" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" mask="\+\1 (111) 111-1111" v-if="attr.datatype === 'PHONE_NUMBER'"/> -->

        <!-- BELONGS_TO -->
        <select class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatypeOptions.relationType === 'BELONGS_TO'">
          <option v-for="rec in relatedDropdown(attr.datatypeOptions.schema_id)" :key="rec.value" :value="rec.value">
            {{ rec.label }}
          </option>
        </select>

        <!--  -->
        <select class="form-control" multiple v-model="record.attributes[attr.identifier]" v-if="attr.datatypeOptions.relationType === 'HAS_MANY'">
          <option v-for="rec in relatedDropdown(attr.datatypeOptions.schema_id)" :key="rec.value" :value="rec.value">
            {{ rec.label }}
          </option>
        </select>

        <!-- BELONGS TO (SELECT2) -->
        <!-- TODO - this is pending the following fix: -->
        <!-- https://github.com/sagalbot/vue-select/issues/122 -->
        <!-- <v-select class="bg-light text-dark" v-model="record.attributes[attr.identifier]" :options="relatedDropdownVselect(attr.datatypeOptions.schema_id, attr.datatypeOptions.schema_attribute_identifier)" v-if="attr.datatype === 'BELONGS_TO'" /> -->

        <!-- TEXT_SELECT & NUMBER_SELECT (OLD) -->
        <!-- <select class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TEXT_SELECT' || attr.datatype === 'NUMBER_SELECT'"> -->
          <!-- <option v-for="opt in attr.datatypeOptions.dropdownOptions" :key="opt" :value="opt">{{ opt }}</option> -->
        <!-- </select> -->

        <!-- TEXT_SELECT & NUMBER_SELECT (SELECT2) -->
        <!-- <v-select class="bg-light text-dark" v-model="record.attributes[attr.identifier]" :options="attr.datatypeOptions.dropdownOptions" v-if="attr.datatype === 'TEXT_SELECT' || attr.datatype === 'NUMBER_SELECT'" /> -->

      </div>
    </div>

    <div class="col-lg-12">
      <hr>
    </div>

    <div class="col-lg-12 text-right">
      <button class="btn btn-light" @click="onCancel()">
        <i class="fa fa-times mr-2"></i>
        Cancel
      </button>

      <button class="btn btn-success" @click="onSubmit()">
        <i class="fa fa-check mr-2"></i>
        Submit
      </button>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import router from '@/routers'
import { mapGetters } from 'vuex'

export default {
  props: ['record', 'onSubmit'],
  computed: mapGetters({
    schema: 'schema/selectedModel'
  }),
  created () {
    this.assignDefaultValues()
  },
  methods: {
    // TODO - assignDefaultValues method should be moved into the Vuex store
    assignDefaultValues () {
      this.schema.attributes.forEach((attr) => {
        // Skip attributes are are defined
        if (this.record.attributes[attr.identifier]) return
        // Assign defaults for JSON, Number, String
        if (attr.datatype === 'JSON') {
          this.record.attributes[attr.identifier] = JSON.stringify({})
        } else if (attr.datatypeOptions && attr.datatypeOptions.default) {
          this.record.attributes[attr.identifier] = attr.datatypeOptions.default
        }
      })
    },
    onCancel () {
      router.go(-1)
    },
    relatedDropdown (schema_id) {
      console.log(schema_id)
      const records = this.$store.getters['record/collection']
      const schema = this.$store.getters['schema/collection'].find(m => m_id === schema_id)
      const leadAttribute = schema.attributes[0]
      if (!leadAttribute) return []
      return records
      .filter((s) => { return s.schema_id === schema_id })
      .map((s) => {
        return {
          value: s._id,
          label: s.attributes[leadAttribute.identifier]
        }
      })
    }
  },
  data () {
    return {
      errors: {}
    }
  }
}
</script>
