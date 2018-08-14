<template>
<div class="project-boards">
  project-boards
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-boards',
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