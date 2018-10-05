// Record Containers
import List from './pages/List'
import New from './pages/New'
import Edit from './pages/Edit'

// TODO - this isn't wired up, just here to be moved around a bit
export default {
  path: '/blueprints/:project_id/seeds',
  component: RouterView,
  meta: { bcLinkText: 'Seed Data' },
  children: [
    {
      path: '',
      component: ProjectSeeds
    },
    {
      path: '/blueprints/:project_id/seeds/:schema_id',
      component: RouterView,
      meta: { bcGetter: 'Show' },
      children: [
        {
          path: '',
          props: true,
          component: RecordList
        },
        {
          path: '/blueprints/:project_id/seeds/:schema_id/new',
          component: RecordNew,
          props: true,
          meta: { bcText: 'New' }
        },
        {
          path: '/blueprints/:project_id/seeds/:schema_id/records/:record_id',
          component: RecordNew, // TODO - Record SHOW
          props: true,
          meta: { bcText: 'Show' }
        },
        {
          path: '/blueprints/:project_id/seeds/:schema_id/records/:record_id/edit',
          component: RecordEdit,
          props: true,
          meta: { bcText: 'Edit' }
        }
      ]
    }
  ]
}
