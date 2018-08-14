<template>
<div class="project-card-create">
  project-card-create
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-card-create',
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