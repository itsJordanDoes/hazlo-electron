<template>
  <div class="project-view">
    <label for="">{{ projects[this.$route.params.id].label }}</label>
    <content-editor></content-editor>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ContentEditor from './ContentEditor'
  export default {
    name: 'project-view',
    components: { ContentEditor },
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
.project-view {
  height:100%;
  width:100%;
}
</style>