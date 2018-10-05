// Project module constants
export const DEFAULT_PROJECT = {
  _id: null,
  label: 'Codotype Project',
  identifier: 'codotype_project',
  schemas: [],
  seeds: [] // QUESTION - remove seeds?
}

export const DEFAULT_USER_SCHEMA = {
  _id: null,
  enabled: true,
  label: 'User',
  label_plural: 'Users',
  identifier: 'user',
  identifier_plural: 'users',
  class_name: 'User',
  class_name_plural: 'Users',
  attributes: [
    {
      order: 0,
      label: 'E-Mail',
      help: 'E-Mail address associated with this Contact.',
      required: true,
      unique: true,
      datatype: 'TEXT',
      datatypeOptions: {},
      identifier: 'email',
      _id: 'attr_26577092992831',
      locked: true
    },
    {
      order: 1,
      label: 'Username',
      help: 'The user\'s username',
      required: true,
      unique: true,
      datatype: 'TEXT',
      datatypeOptions: {},
      identifier: 'username',
      _id: 'attr_265770dpskks31',
      locked: true
    }
    // {
    //   order: 2,
    //   label: 'Name',
    //   help: 'Name of the individual',
    //   required: true,
    //   unique: false,
    //   datatype: 'TEXT',
    //   datatypeOptions: {},
    //   identifier: 'name',
    //   _id: 'attr_1',
    //   locked: true
    // },
    // {
    //   order: 3,
    //   label: 'Password',
    //   help: 'Encrypted user password for a user.',
    //   required: true,
    //   unique: false,
    //   datatype: 'TEXT',
    //   datatypeOptions: {},
    //   identifier: 'password',
    //   _id: 'attr_265770929axy31',
    //   locked: true
    // },
    // {
    //   order: 4,
    //   label: 'Admin',
    //   help: 'Wether or not the user is an administrator',
    //   required: false,
    //   unique: false,
    //   datatype: 'BOOL',
    //   datatypeOptions: {},
    //   identifier: 'admin',
    //   _id: 'attr_26577092d2ks31',
    //   locked: true
    // },
    // {
    //   order: 5,
    //   label: 'Password Reset Token',
    //   help: 'Encrypted password_reset_token for a user.',
    //   required: false,
    //   unique: false,
    //   datatype: 'TEXT',
    //   datatypeOptions: {},
    //   identifier: 'password_reset_token',
    //   _id: 'attr_265770929jjs31',
    //   locked: true
    // }
  ],
  relations: []
}

export const CREATE_SUCCESS_NOTIFICATION = {
  message: ':slow clap:',
  context: 'success',
  dismissible: true
}
