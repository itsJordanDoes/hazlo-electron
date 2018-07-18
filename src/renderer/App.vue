<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  import ProjectView from './components/ProjectView'
  import NotesView from './components/NotesView'
  import ViewView from './components/ViewView'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Hazlo',
    components: { TopBar, ProjectView, NotesView, ViewView },
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
    height:calc(100% - #{$top-bar-height});
    .router-view {
      width:100%;
      height:100%;
      display:flex;
      flex-direction: row;
      flex-wrap: none;
    }
  }
</style>
