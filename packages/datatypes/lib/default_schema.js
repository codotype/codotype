const NEW_SCHEMA_MODEL = {
  id: null,
  order: 0,
  label: '',
  label_plural: '',
  identifier: '',
  identifier_plural: '',
  class_name: '',
  class_name_plural: '',
  relations: [],
  attributes: [
    { // TODO - ditch default attribute?
      order: 0,
      label: 'Label',
      identifier: 'label',
      help: '',
      required: true,
      unique: true,
      datatype: 'TEXT', // TODO - reference
      datatypeOptions: {}
    }
  ]
}

module.exports = {
  NEW_SCHEMA_MODEL
}
