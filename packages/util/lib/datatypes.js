
// Different relations
export const RELATION_TYPES = [
  { id: 'BELONGS_TO', label: 'Belongs To', description: 'A two-way association to a single model' },
  { id: 'HAS_ONE', label: 'Has One', description: 'A one-way association to a single model' },
  { id: 'HAS_MANY', label: 'Has Many', description: 'A one-way association to many models' }
]

// Datattype IDs
export const TEXT = 'TEXT' // TODO - change to 'STRING'
export const STRING_ARRAY = 'STRING_ARRAY'
export const NUMBER = 'NUMBER' // TODO - change to FLOAT, DOUBLE, INT
export const BOOLEAN = 'BOOL' // TODO - change to BOOLEAN
export const DATE = 'DATE'
export const TIME = 'TIME'
export const DATETIME = 'DATETIME'
export const COLOR = 'COLOR'

// Export each datatype definition
export const STRING_DATATYPE = { value: TEXT, text: 'String', icon: 'fa fa-quote-left' }
export const NUMBER_DATATYPE = { value: NUMBER, text: 'Number', icon: 'fa fa-hashtag' }
export const STRING_ARRAY_DATATYPE = { value: STRING_ARRAY, text: 'String Array', icon: 'fa fa-quote-left' }
export const BOOLEAN_DATATYPE = { value: BOOLEAN, text: 'Boolean', icon: 'far fa-check-square' }
export const DATE_DATATYPE = { value: DATE, text: 'Date', icon: 'far fa-calendar' }
export const TIME_DATATYPE = { value: TIME, text: 'Time', icon: 'far fa-clock' }
export const DATETIME_DATATYPE = { value: DATETIME, text: 'DateTime', icon: 'far fa-calendar-alt' }
export const JSON_DATATYPE = { value: 'JSON', text: 'JSON', icon: 'fa fa-code' }
// { value: 'NUMBER_ARRAY', text: 'Number Array', icon: 'fa fa-hashtag' },
// { value: COLOR, text: 'Color', icon: 'far fa-eyedropper' },
// { value: 'GEO', text: 'Geolocation', icon: 'fa-map' }

// Exports all datatype objects
export const DATATYPES = {
  STRING_DATATYPE,
  NUMBER_DATATYPE,
  STRING_ARRAY_DATATYPE,
  BOOLEAN_DATATYPE,
  DATE_DATATYPE,
  TIME_DATATYPE,
  DATETIME_DATATYPE,
  JSON_DATATYPE
}