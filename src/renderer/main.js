import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// Font Awesome Stuff
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFolderOpen, faEdit, faListAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder, faFolderOpen, faEdit, faListAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// End Font Awesome Stuff

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
