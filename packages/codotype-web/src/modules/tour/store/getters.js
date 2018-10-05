import {
  APP_EDITOR_TOUR,
  GENERATOR_LIST_TOUR,
  APP_LIST_TOUR
} from './constants'

// Addon Module Getters
export default {
  appEditorSteps: state => {
    return APP_EDITOR_TOUR
  },
  generatorListSteps: state => {
    return GENERATOR_LIST_TOUR
  },
  appListSteps: state => {
    return APP_LIST_TOUR
  }
}
