// trailingComma
// Helper function to conditionally add a trailing comma
// while iterating over an array in a generator template
// Auto-injected into the EJS runtime
module.exports = (arr, index) => {
  if ((arr.length - 1) === index) return ''
  return ','
}
