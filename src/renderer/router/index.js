import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
      // name: 'drawing-board',
      // component: require('@/components/DrawingBoard').default
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
