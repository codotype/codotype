
// Attribute constants
export const DEFAULT_OPTION = {
  _id: null,
  order: 0,
  label: 'Use Bootstrap 4',
  identifier: 'include_template',
  help: 'Whether or not to build the UI using Bootstrap 4.',
  more_info_url: 'https://getbootstrap.com',
  required: false,
  unique: false,
  type: '',
  default_value: true,
  datatypeOptions: {}
}

// Datattype IDs
// TODO - these are duplicated in the Option store
export const TEXT = 'TEXT'
export const TEXT_SELECT = 'TEXT_SELECT'
export const NUMBER = 'NUMBER'
export const NUMBER_SELECT = 'NUMBER_SELECT'
export const BOOL = 'BOOL'
export const DATE = 'DATE'
export const TIME = 'TIME'
export const DATETIME = 'DATETIME'
export const COLOR = 'COLOR'
// export const RELATION = 'RELATION'

export const OPTION_TYPES = [
  { value: TEXT, text: 'Text', icon: 'fa-quote-left' },
  { value: NUMBER, text: 'Number', icon: 'fa-hashtag' },
  { value: BOOL, text: 'Boolean', icon: 'fa-check-square-o' },
  // { value: DATE, text: 'Date', icon: 'fa-calendar-o' },
  // { value: TIME, text: 'Time', icon: 'fa-clock-o' },
  // { value: DATETIME, text: 'DateTime', icon: 'fa-calendar-plus-o' },
  { value: COLOR, text: 'Color', icon: 'fa-eyedropper' },
  { value: NUMBER_SELECT, text: 'Number Select', icon: 'fa-list' },
  { value: TEXT_SELECT, text: 'Text Select', icon: 'fa-list' }
  // { value: 'JSON', text: 'JSON', icon: 'fa-code' }
  // { value: 'GEO', text: 'Geolocation', icon: 'fa-map' },
  // { value: RELATION, text: 'Relation', icon: 'fa-link' }
]
