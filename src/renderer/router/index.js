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
      path: '*',
      redirect: '/'
    }
  ]
})
