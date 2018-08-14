<template>
<div class="project-card-view">
  project-card-view
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-card-view',
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