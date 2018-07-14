<template>
  <div class="side-bar">
    <button>Drawing Board</button>
    <button v-for="project, i in projects">{{ title }}</button>
    <hr>
    <button>Add New Project</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'side-bar',
    components: { },
    methods: {
    },
    computed: mapGetters({
      projects: 'projects'
    }),
    mounted () {

    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.side-bar {
  width:$side-bar-width;
  height:100%;
  background-color:blue;
  position:absolute;
  top:$top-bar-height;
  left:0;
  // -webkit-user-select: none;
  // -webkit-app-region: drag;
}
</style>