const Store = require('electron-store')
const localStore = new Store({
  defaults: {
    cards: [],
    projects: [],
    settings: {
      name: '',
      project_view: true,
      notes_view: true,
      view_view: true
    }
  },
  name: 'Data'
})

const state = localStore.store

const mutations = {
  ADD_CARD (state, data) {
    state.cards.push(data)
    localStore.set('cards', state.cards)
  },
  DELETE_CARD (state, id) {
    state.cards.splice(id)
    localStore.set('cards', state.cards)
  },
  ADD_PROJECT (state, data) {
    state.projects.push(data)
    localStore.set('projects', state.projects)
  },
  DELETE_PROJECT (state, id) {
    state.projects.splice(id)
    localStore.set('projects', state.projects)
  },
  TOGGLE_VIEW (state, obj) {
    state.settings[obj] = !state.settings[obj]
    localStore.set('settings', state.settings)
  },
  SET_VIEW (state, obj) {
    state.settings[obj.type] = obj.boolean
    localStore.set('settings', state.settings)
  }
}

const actions = {
  addCard ({ commit }, data) {
    commit('ADD_CARD', data)
  },
  deleteCard ({ commit }, id) {
    commit('DELETE_CARD', id)
  },
  addProject ({ commit }, data) {
    commit('ADD_PROJECT', data)
  },
  deleteProject ({ commit }, id) {
    commit('DELETE_PROJECT', id)
  },
  exec ({ commit }, command) {
    document.execCommand(command)
  },
  toggleView ({ commit }, obj) {
    commit('TOGGLE_VIEW', obj)
  },
  setView ({ commit }, obj) {
    commit('SET_VIEW', obj)
  }
}

const getters = {
  cards (state) {
    return state.cards
  },
  projects (state) {
    return state.projects
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
