import firebase from 'firebase'
import Vue from 'vue'
// const Store = require('electron-store')
// const localStore = new Store({})

const state = {}

const mutations = {
  UPDATE_USER (state, payload) {
    Vue.set(state, 'user', payload)
  },
  LOGOUT_USER (state) {
    Vue.set(state, 'user', null)
  }
}

const actions = {
  registerUser ({ commit, dispatch }, data) {
    return new Promise(function (resolve, reject) {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function (user) {
        var newUser = {
          fields: {
            name: '',
            user_id: user.uid,
            joined: Date.now(),
            phone: '',
            verified: user.emailVerified,
            email: user.email
          }
        }
        firebase.database().ref('users').child(user.uid).set(newUser).then(function (response) {
          resolve(user)
          resolve(response)
        }).catch(function (error) {
          reject(error)
        })
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  authUser ({ commit }, user) {
    return new Promise(function (resolve, reject) {
      var updates = {}
      updates['/fields/verified'] = user.emailVerified
      firebase.database().ref('users/' + user.uid).update(updates)
      firebase.database().ref('users/' + user.uid).once('value', function (snapshot) {
        commit('UPDATE_USER', snapshot.val())
      }).then(function (response) {
        resolve(user)
        resolve(response)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  authUserWithLogin ({ commit, dispatch }, data) {
    return new Promise(function (resolve, reject) {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function (user) {
        dispatch('authUser', user).then(function (response) {
          resolve(response)
        }).catch(function (error) {
          reject(error)
        })
      }).catch(function (error) {
        // console.log(error)
        reject(error)
      })
    })
  },
  logoutUser ({ commit }) {
    return new Promise(function (resolve, reject) {
      firebase.auth().signOut().then(function (response) {
        resolve(response)
        commit('LOGOUT_USER')
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  sendEmailVerification ({ commit }) {
    return new Promise(function (resolve, reject) {
      firebase.auth().currentUser.sendEmailVerification().then(function (response) {
        resolve(response)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  selectProject ({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      commit('SELECT_PROJECT', payload)
      resolve(payload.new)
      reject(payload.new)
    })
  },
  listenNotes ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('projects/' + payload + '/notes').on('value', (snapshot) => {
        commit('UPDATE_ACTIVE_NOTES', snapshot.val())
        resolve(snapshot)
      })
    })
  },
  stopNotes ({ commit }, payload) {
    firebase.database().ref('projects/' + payload.project + '/notes').off()
  },
  updateNotesContent ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('projects/' + payload.project + '/notes/' + payload.notes + '/content').set(payload.content).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

const getters = {
  user (state) {
    if (state.user === undefined) {
      var user = {
        fields: {
          verified: false
        }
      }
      return user
    } else {
      return state.user
    }
  },
  state (state) {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
