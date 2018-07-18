<template>
  <div>
    <project-view></project-view>
    <notes-view></notes-view>
    <view-view></view-view>
  </div>
</template>

<script>
  import ProjectView from './ProjectView'
  import NotesView from './NotesView'
  import ViewView from './ViewView'
  import { mapGetters } from 'vuex'
  export default {
    name: 'workspace',
    components: { ProjectView, NotesView, ViewView },
    methods: { },
    computed: mapGetters({ }),
    mounted () { },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";

</style>