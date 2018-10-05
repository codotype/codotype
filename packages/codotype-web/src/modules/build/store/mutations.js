import { NEW_MODEL_MUTATIONS } from '@/store/lib/mixins'

// // // //

export default {
  ...NEW_MODEL_MUTATIONS,
  choosingGenerator (state, choosing) {
    state.choosingGenerator = choosing
  }
}
