<template>
  <div id="app">
    <auth v-if="!auth"></auth>
    <top-bar v-if="auth"></top-bar>
    <router-view v-if="auth" class="router-view"></router-view>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  import Auth from './components/auth/Auth'
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  export default {
    name: 'Hazlo',
    components: { TopBar, Auth },
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
        auth: false
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
      width:100%;
      height:100%;
      display:flex;
      flex-direction: row;
      flex-wrap: none;
    }
  }
</style>
