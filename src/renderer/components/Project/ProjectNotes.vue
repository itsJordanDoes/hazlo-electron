<template>
<div class="project-notes">
  project-notes
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-notes',
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