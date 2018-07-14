const Store = require('electron-store')
const localStore = new Store({
  defaults: {
    cards: [],
    projects: [],
    settings: {
      name: ''
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
  }
}

const actions = {
  addCard ({ commit }, data) {
    commit('ADD_CARD', data)
  },
  deleteCard ({ commit }, id) {
    commit('DELETE_CARD', id)
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
