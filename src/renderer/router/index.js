import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: require('@/components/ProjectFeed').default
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: require('@/components/Workspace').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/AppSettings').default
    },
    {
      path: '/create-project',
      name: 'create-project',
      component: require('@/components/CreateProject').default
    },
    // {
    //   path: '/project/:id/home',
    //   name: 'project-view',
    //   component: require('@/components/ProjectView').default
    // },
    // {
    //   path: '/project/:id/board',
    //   name: 'board-view',
    //   component: require('@/components/BoardView').default
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
