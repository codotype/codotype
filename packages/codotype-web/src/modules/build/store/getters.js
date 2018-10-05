import { NEW_MODEL_GETTERS } from '@/store/lib/mixins'

// Build Module Getters
// TODO - add availableGenerators getter
export default {
  ...NEW_MODEL_GETTERS,
  showSidebar: state => {
    if (state.choosingGenerator) return false
    return (state.newModel.app_id && state.newModel.stages[0])
  },
  choosingGenerator: state => {
    if (!state.newModel.app_id) return false
    return state.choosingGenerator
  }
}
