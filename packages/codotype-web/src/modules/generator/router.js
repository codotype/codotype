// Generator Containers
import GeneratorList from '@/modules/generator/pages/list'
import GeneratorShow from '@/modules/generator/pages/show'
import GeneratorNew from '@/modules/generator/pages/new'

export default [
  {
    path: '/generators',
    component: GeneratorList
  },
  {
    path: '/generators/new',
    component: GeneratorNew
  },
  {
    path: '/generators/:id',
    component: GeneratorShow,
    props: true
  }
]
