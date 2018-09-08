import firebase from 'firebase'
import Vue from 'vue'
// const Store = require('electron-store')
// const localStore = new Store({})

const state = {
  user: {},
  projects_meta: {}
}

const mutations = {
  UPDATE_USER (state, payload) {
    Vue.set(state, 'user', payload)
  },
  LOGOUT_USER (state) {
    Vue.set(state, 'user', null)
  },
  ADD_PROJECT (state, payload) {
    Vue.set(state.user[payload.type], payload.key, true)
  },
  SELECT_PROJECT (state, payload) {
    Vue.set(state.user, 'active_project', payload)
  },
  UPDATE_PROJECT_META (state, payload) {
    Vue.set(state.projects_meta, payload.key, payload.value)
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
  authUser ({ commit, dispatch }, user) {
    return new Promise(function (resolve, reject) {
      let updates = {}
      updates['/fields/verified'] = user.emailVerified
      firebase.database().ref('users/' + user.uid).update(updates)
      firebase.database().ref('users/' + user.uid).once('value', (snapshot) => {
        commit('UPDATE_USER', snapshot.val())
      }).then((response) => {
        resolve(user)
        resolve(response)
      }).catch((error) => {
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
  createProject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let obj = {
        project_meta: {
          created: Date.now(),
          creator: state.user.fields.user_id,
          name: payload.name,
          description: payload.description,
          goal: payload.goal,
          type: payload.type,
          icon: payload.icon,
          iconColor: payload.iconColor,
          iconBkg: payload.iconBkg
        },
        owners: {}
      }
      obj['owners'][state.user.fields.user_id] = true
      console.log(obj)
      firebase.database().ref('projects').push(obj).then((response) => {
        resolve(response)
        firebase.database().ref('users/' + state.user.fields.user_id + '/projects/' + response.key).set(true).then((r) => {
          commit('ADD_PROJECT', {
            type: 'projects',
            key: response.key
          })
        })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  selectProject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + state.user.fields.user_id + '/fields/active_project').set(payload).then((response) => {
        commit('SELECT_PROJECT', payload)
        resolve(response)
      })
    })
  },
  listenProjectsMeta ({ commit }) {
    return new Promise((resolve, reject) => {
      let projects = Object.keys(state.user.projects)
      for (let i = 0; i < projects.length; i++) {
        firebase.database().ref('/projects/' + projects[i] + '/project_meta').on('value', (response) => {
          commit('UPDATE_PROJECT_META', {
            key: projects[i],
            value: response.val()
          })
        })
      }
      resolve('listening')
    })
  },
  stopProjectsMeta ({ commit }) {
    return new Promise((resolve, reject) => {
      let projects = Object.keys(state.user.projects)
      projects.forEach((project) => {
        firebase.database().ref('/projects/' + project + '/project_meta').off()
      })
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
  projectsMeta (state) {
    return state.projects_meta
  },
  currentProjectMeta (state) {
    return state.projects_meta[state.user.active_project]
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
