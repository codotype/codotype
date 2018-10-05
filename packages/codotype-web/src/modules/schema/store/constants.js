
// Schema constants
export const DEFAULT_SCHEMA = {
  _id: null,
  label: '',
  label_plural: '',
  identifier: '',
  identifier_plural: '',
  class_name: '',
  class_name_plural: '',
  relations: [],
  attributes: [
    {
      order: 0,
      label: 'Label',
      identifier: 'label',
      help: '',
      required: true,
      unique: true,
      datatype: 'TEXT',
      datatypeOptions: {}
    }
  ]
}

export const RELATION_TYPES = [

  // { id: 'HAS_ONE', text: 'Has One', desc: 'one to one' },
  // { id: 'BELONGS_TO', text: 'Belongs To', desc: 'many to one' },
  // { id: 'HAS_MANY', text: 'Has Many', desc: 'one to many' },
  // { id: 'HAS_AND_BELONGS_TO_MANY', text: 'Many to Many', desc: 'many to many' }

  // // // //

  // Newer relation types
  // { id: 'ONE_TO_ONE', text: 'One to One', desc: 'One to One description here...' },
  { id: 'BELONGS_TO', label: 'Belongs To', description: 'Many to One description here...' },
  { id: 'HAS_ONE', label: 'Has One', description: 'One to One description here...' },
  { id: 'HAS_MANY', label: 'Has Many', description: 'one to many description here...' }

  // { id: 'MANY_TO_MANY', text: 'Many to Many', desc: 'Many to Many description here...' },

  // { id: 'ONE_TO_MANY', text: 'One to Many', desc: 'One to Many description here...' },
  // { id: 'BELONGS_TO_MANY', text: 'Has Many', desc: 'one to many description here...' },
  // { id: 'BELONGS_TO', text: 'Belongs To', desc: 'one to many description here...' }
]

// Datattype IDs
// TODO - these are duplicated in the Option store
export const TEXT = 'TEXT'
export const NUMBER = 'NUMBER'
export const BOOL = 'BOOL'
export const DATE = 'DATE'
export const TIME = 'TIME'
export const DATETIME = 'DATETIME'
export const COLOR = 'COLOR'
// export const RELATION = 'RELATION'

export const DATATYPES = [
  { value: TEXT, text: 'String', icon: 'fa fa-quote-left' },
  { value: NUMBER, text: 'Number', icon: 'fa fa-hashtag' },
  // { value: 'NUMBER_ARRAY', text: 'Number Array', icon: 'fa fa-hashtag' },
  // { value: 'STRING_ARRAY', text: 'String Array', icon: 'fa fa-quote-left' },
  { value: BOOL, text: 'Boolean', icon: 'far fa-check-square' },
  { value: DATE, text: 'Date', icon: 'far fa-calendar' },
  { value: TIME, text: 'Time', icon: 'far fa-clock' },
  { value: DATETIME, text: 'DateTime', icon: 'far fa-calendar-alt' },
  // { value: COLOR, text: 'Color', icon: 'far fa-eyedropper' },
  { value: 'JSON', text: 'JSON', icon: 'fa fa-code' }
  // { value: 'GEO', text: 'Geolocation', icon: 'fa-map' },
  // { value: RELATION, text: 'Relation', icon: 'fa-link' }
]
