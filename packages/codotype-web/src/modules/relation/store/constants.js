
// Relation constants
export const DEFAULT_RELATION = {
  id: null,
  order: 0,
  type: 'MANY_TO_ONE', // Moved from datatypeOptions.relationType
  required: false,
  // QUESTION - add schema id here?
  generate_reverse: true,
  related_schema_id: '',
  reverse_relation_id: '',
  as: '',
  reverse_as: ''
}
