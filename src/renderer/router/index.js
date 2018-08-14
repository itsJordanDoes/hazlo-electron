import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/project/1234/home'
    },
    // {
    //   path: '/',
    //   name: 'Home'
    // }
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: require('@/components/Auth/Auth').default
    // },
    // PROJECT ROUTES
    {
      path: '/project/:project_id/home',
      name: 'Project Home',
      component: require('@/components/Project/ProjectHome').default
    },
    {
      path: '/project/:project_id/notes/:notes_id?',
      name: 'Project Notes',
      components: {
        default: require('@/components/Project/ProjectNotes').default,
        nav: require('@/components/Navigation/NotesNav').default
      }
    },
    {
      path: '/project/:project_id/boards/:board_id?',
      name: 'Project Board',
      components: {
        default: require('@/components/Project/ProjectBoard').default,
        nav: require('@/components/Navigation/BoardsNav').default
      }
    },
    {
      path: '/project/:project_id/boards/create',
      name: 'Create Project Board',
      component: require('@/components/Project/ProjectBoardCreate').default
    },
    {
      path: '/project/:project_id/pins',
      name: 'Project Pins',
      components: {
        default: require('@/components/Project/ProjectPins').default,
        nav: require('@/components/Navigation/PinsNav').default
      }
    },
    {
      path: '/project/:project_id/cards',
      name: 'Project Cards',
      component: require('@/components/Project/ProjectCards').default
    },
    {
      path: '/project/:project_id/cards/:card_id',
      name: 'Card',
      component: require('@/components/Project/ProjectCardView').default
    },
    {
      path: '/project/:project_id/cards/create',
      name: 'Create Project Card',
      component: require('@/components/Project/ProjectCardCreate').default
    },
    {
      path: '/project/:project_id/chats/:chat_id?/:message_id?',
      name: 'Project Chat',
      component: require('@/components/Project/ProjectChat').default
    },
    {
      path: '/project/:project_id/settings',
      name: 'Project Settings',
      component: require('@/components/Project/ProjectSettings').default
    },
    {
      path: '/project/create',
      name: 'Create Project',
      component: require('@/components/Project/CreateProject')
    }
  ]
})
