<template>
  <div id="app">
    <auth v-if="!auth"></auth>
    <navigation :open="open" v-if="auth" v-on:update:open="open = $event"></navigation>
    <h3 style="margin-left:100px;">{{ $route.path }}</h3>
    <router-view v-if="auth" :class="[open?'router-view-open':'router-view-closed','router-view']"></router-view>
  </div>
</template>

<script>
  import Navigation from './components/Navigation/Navigation'
  import Auth from './components/Auth/Auth'
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  export default {
    name: 'Hazlo',
    components: { Auth, Navigation },
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
    // height:calc(100% - #{$top-bar-height});
    height:100%;
    .router-view {
      display:flex;
      flex-direction: row;
      flex-wrap: none;
      // margin-top:$window-bar-height;
      transition: transform $msDelay ease-in-out;
      width:calc(100% - #{$sidebar-closed});
    }
    .router-view-open {
      transform:translate($sidebar-open, 0px);
    }
    .router-view-closed {
      transform:translate($sidebar-closed, 0px);
    }
  }
</style>
