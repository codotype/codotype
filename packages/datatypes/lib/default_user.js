const DEFAULT_USER_EMAIL_ATTRIBUTE = {
  id: 'USER_EMAIL_ATTRIBUTE', // TODO - this should be given a random ID
  order: 0,
  label: 'E-Mail',
  identifier: 'email',
  help: 'The E-Mail address associated with this User',
  required: true,
  unique: true,
  datatype: 'TEXT', // TODO - import DATATYPE_STRING from @codotype/types
  datatypeOptions: {},
  locked: true
}

const DEFAULT_USER_SCHEMA = {
  id: null,
  order: 0,
  label: 'User',
  label_plural: 'Users',
  identifier: 'user',
  identifier_plural: 'users',
  class_name: 'User',
  class_name_plural: 'Users',
  attributes: [DEFAULT_USER_EMAIL_ATTRIBUTE],
  relations: []
}

module.exports = {
  DEFAULT_USER_SCHEMA
}
