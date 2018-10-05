import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'

import project from '@/modules/project/store'
import schema from '@/modules/schema/store'
import attribute from '@/modules/attribute/store'
import relation from '@/modules/relation/store'
import notification from '@/modules/notification/store'
import generator from '@/modules/generator/store'
import addon from '@/modules/addon/store'
import tour from '@/modules/tour/store'
import option from '@/modules/option/store'
import build from '@/modules/build/store'
// import record from '@/modules/record/store'

export default new Vuex.Store({
  modules: {
    notification,
    project,
    schema,
    attribute,
    relation,
    generator,
    addon,
    tour,
    option,
    build
  },
  plugins: [createPersistedState()]
})
