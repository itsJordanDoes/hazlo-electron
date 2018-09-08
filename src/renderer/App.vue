<template>
  <div id="app">
    <auth v-if="!auth"></auth>
    <sidebar :open="open" v-if="auth" v-on:update:open="open = $event"></sidebar>
    <router-view v-if="auth" :class="[open?'router-view-open':'router-view-closed','router-view']"></router-view>
  </div>
</template>

<script>
  import Sidebar from './components/Navigation/Sidebar'
  import Auth from './components/Auth/Auth'
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  export default {
    name: 'Hazlo',
    components: { Auth, Sidebar },
    computed: mapGetters({
      user: 'user'
    }),
    methods: {
      checkAuth () {
        var that = this
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            that.$store.dispatch('authUser', user).then(function (response) {
              that.auth = true
            })
          } else {
            that.auth = false
          }
        })
      }
    },
    mounted () {
      this.checkAuth()
    },
    data () {
      return {
        auth: false,
        open: false
      }
    },
    watch: {
      'user': function () {
        if (!this.auth) {
          this.checkAuth()
        }
      }
    }
  }
</script>
<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  @import "./sass/main.scss";
  /* CSS */
  #app {
    width:100%;
    height:100%;
    background-color:$white;
  }
  .router-view {
    transition: transform $msDelay ease-in-out;
    position:absolute;
    left:$padding;
    top:0;
    bottom:0;
  }
  .router-view-open {
    transform:translate($sidebar-open, 0px);
    right:-$sidebar-open;
  }
  .router-view-closed {
    transform:translate($sidebar-closed, 0px);
    right:$sidebar-closed;
  }
</style>
