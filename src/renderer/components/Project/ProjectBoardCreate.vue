<template>
<div class="project-board-create">
  project-board-create
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-board-create',
    components: { },
    data () {
      return {
      }
    },
    computed: mapGetters({
      user: 'user'
    }),
    methods: {
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
</style>