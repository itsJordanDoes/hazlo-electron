import Vue from 'vue'
import axios from 'axios'

// Vue Router state sync
import { sync } from 'vuex-router-sync'

import App from './App'
import router from './router'
import store from './store'

// Import Firebase Config
import firebase from 'firebase'
import firebaseConfig from './config/firebase'

// v-click-outside directive
import vClickOutside from 'v-click-outside'

// Vue Multiselect
import Multiselect from 'vue-multiselect'

// Font Awesome Stuff
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
require('./config/fontawesome.js')
Vue.component('font-awesome-icon', FontAwesomeIcon)
// End Font Awesome Stuff

// Vue Multiselect
Vue.component('multiselect', Multiselect)

// Recognize Clicks outside of components
Vue.use(vClickOutside)

// Sync Vue Router & Vuex
/* eslint-disable */
const unsync = sync(store, router)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  created () {
    firebase.initializeApp(firebaseConfig)
  }
}).$mount('#app')
