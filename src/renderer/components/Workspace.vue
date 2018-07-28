<template>
  <div>
    <project-view v-if="user.views.projects_view"></project-view>
    <notes-view v-if="user.views.notes_view"></notes-view>
    <boards-view v-if="user.views.boards_view"></boards-view>
  </div>
</template>

<script>
  import ProjectView from './ProjectView'
  import NotesView from './NotesView'
  import BoardsView from './BoardsView'
  import { mapGetters } from 'vuex'
  export default {
    name: 'workspace',
    components: { ProjectView, NotesView, BoardsView },
    methods: { },
    computed: mapGetters({
      user: 'user'
    }),
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