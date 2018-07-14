<template>
  <div id="app">
    <top-bar></top-bar>
    <side-bar></side-bar>
    <div id="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  import SideBar from './components/SideBar'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Hazlo',
    components: { TopBar, SideBar },
    computed: mapGetters({
      cards: 'cards'
    }),
    methods: {
      addCard () {
        this.$store.dispatch('addCard', {
          label: this.label,
          content: this.content
        })
      },
      deleteCard (i) {
        this.$store.dispatch('deleteCard', i)
      }
    },
    mounted () {
    },
    data () {
      return {
        label: '',
        content: ''
      }
    }
  }
</script>

<style lang="scss">
  @import "./sass/main.scss";
  /* CSS */
  #app {
    width:100%;
    height:100%;
    .router-view {
      margin-left: $side-bar-width;
      margin-top: $top-bar-height;
    }
  }
</style>
