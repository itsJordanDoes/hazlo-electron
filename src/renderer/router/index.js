import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/c/:community_id',
      name: 'Community',
      component: require('@/components/BlankComponent').default
    },
    {
      path: '/c/:community_id/home',
      name: 'Community Home',
      components: {
        default: require('@/components/BlankComponent').default,
        nav: require('@/components/Navigation/CommunityNav').default
      }
    },
    {
      path: '/c/:community_id/project/:project_id?',
      name: 'Projects',
      components: {
        default: require('@/components/BlankComponent').default,
        nav: require('@/components/Navigation/ProjectsNav').default
      }
    },
    {
      path: '/c/:community_id/notes/:note_id?',
      name: 'Notes',
      components: {
        default: require('@/components/Notes/NotesView').default,
        nav: require('@/components/Navigation/NotesNav').default
      }
    },
    {
      path: '/c/:community_id/boards/:board_id?',
      name: 'Boards',
      components: {
        default: require('@/components/BlankComponent').default,
        nav: require('@/components/Navigation/BoardsNav').default
      }
    },
    {
      path: '/c/:community_id/chats/:chat_id?',
      name: 'Chats',
      components: {
        default: require('@/components/BlankComponent').default,
        nav: require('@/components/Navigation/ChatsNav').default
      }
    }
  ]
})
