import Vue from 'vue'
import Router from 'vue-router'

import HomeRouter from '@/modules/home/router'
import ProjectRouter from '@/modules/project/router'
import GeneratorRouter from '@/modules/generator/router'
import BuildRouter from '@/modules/build/router'
import AuthRouter from '@/modules/auth/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    ...HomeRouter,
    ...GeneratorRouter,
    ...ProjectRouter,
    ...BuildRouter,
    ...AuthRouter
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 } // Top of page on change
  }
})
