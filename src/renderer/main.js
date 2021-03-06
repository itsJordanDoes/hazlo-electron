import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// v-click-outside directive
import vClickOutside from 'v-click-outside'

// Font Awesome Stuff
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faFont } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faFolderOpen, faEdit, faListAlt, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder, faFolderOpen, faEdit, faListAlt, faCog, faFont, faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// End Font Awesome Stuff

// Recognize Clicks outside of components
Vue.use(vClickOutside)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
