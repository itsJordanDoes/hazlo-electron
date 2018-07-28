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
  },
  SET_VIEWS (state) {
    var views = {
      projects_view: true,
      notes_view: true,
      boards_view: false,
      active_project: null
    }
    Vue.set(state.user, 'views', views)
  },
  UPDATE_OWNED_PROJECT_META (state, payload) {
    if (state.owned_projects_meta === undefined) {
      state.owned_projects_meta = {}
    }
    Vue.set(state.owned_projects_meta, payload.key, payload.meta)
  },
  SELECT_PROJECT (state, payload) {
    Vue.set(state.user.views, 'active_project', payload.new)
    Vue.set(state.user.views, 'previous_project', payload.prev)
  },
  UPDATE_PROJECT_NAME (state, payload) {
    Vue.set(state.owned_projects_meta, payload.key['name'], payload.name)
  },
  UPDATE_NOTES (state, payload) {
    // if (state.project_notes === undefined) {
    //   state.project_notes = {}
    // }
    // console.log(payload.notes)
    // // how does this work? wtf
    // state.project_notes[payload.key] = payload.notes
    // Vue.set(state.project_notes, payload.key, payload.notes)
  },
  TOGGLE_VIEW (state, payload) {
    state.user.views[payload] = !state.user.views[payload]
  },
  SET_VIEW (state, payload) {
    state.user.views[payload.type] = payload.boolean
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
        commit('SET_VIEWS')
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
  toggleView ({ commit }, obj) {
    commit('TOGGLE_VIEW', obj)
  },
  setView ({ commit }, obj) {
    commit('SET_VIEW', obj)
  },
  createProject ({ commit }) {
    return new Promise(function (resolve, reject) {
      // Build Initial Project
      var project = {
        project_meta: {
          name: '',
          description: '',
          categories: [],
          thumbnail: '',
          created: Date.now(),
          updated: Date.now(),
          creator: state.user.fields.user_id,
          private: false
        },
        project_owners: {},
        project_notes: '',
        project_cards: {},
        project_messages: {},
        project_settings: {}
      }
      // Set user as project owner
      project.project_owners[state.user.fields.user_id] = true
      // Push to firebase
      firebase.database().ref('projects').push(project).then(function (data) {
        firebase.database().ref('users/' + state.user.fields.user_id + '/owned_projects').child(data.key).set(true).then(function (response) {
          // May not need to fire this... lets see
          commit('UPDATE_OWNED_PROJECT_META', {
            key: data.key,
            meta: project.project_meta
          })
          resolve(response)
        }).catch(function (error) {
          reject(error)
        })
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  listenOwnedProjectsMeta ({ commit }) {
    return new Promise(function (resolve, reject) {
      var keys = Object.keys(state.user.owned_projects)
      keys.forEach(function (key) {
        firebase.database().ref('projects/' + key + '/project_meta').on('value', function (snapshot) {
          commit('UPDATE_OWNED_PROJECT_META', {
            key: key,
            meta: snapshot.val()
          })
          resolve(snapshot)
          reject(snapshot)
        })
      })
    })
  },
  stopOwnedProjectsMeta ({ commit }) {
    return new Promise(function (resolve, reject) {
      var keys = Object.keys(state.user.owned_projects)
      keys.forEach(function (key) {
        firebase.database().ref('projects/' + key + '/project_meta').off()
        resolve(key)
        reject(key)
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
  updateProjectName ({ commit }, data) {
    return new Promise(function (resolve, reject) {
      firebase.database().ref('projects/' + data.key + '/project_meta').update({
        name: data.name
      }).then(function (success) {
        commit('UPDATE_PROJECT_NAME', data)
        resolve(success)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  listenProjectNotes ({ commit }, key) {
    // return new Promise(function (resolve, reject) {
    //   firebase.database().ref('projects/' + key + '/project_notes').on('value', function (snapshot) {
    //     commit('UPDATE_NOTES', {
    //       key: key,
    //       notes: snapshot.val()
    //     })
    //     resolve(snapshot)
    //     reject(snapshot)
    //   })
    // })
  },
  stopProjectNotes ({ commit }, key) {
    // return new Promise(function (resolve, reject) {
    //   firebase.database().ref('projects/' + key + '/project_notes').off()
    //   resolve(key)
    //   reject(key)
    // })
  },
  updateProjectNotes ({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      firebase.database().ref('projects/' + payload.key).update({
        project_notes: payload.notes
      }).then(function (success) {
        resolve(success)
      }).catch(function (error) {
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
