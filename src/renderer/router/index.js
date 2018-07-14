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
      path: '*',
      redirect: '/'
    }
  ]
})
