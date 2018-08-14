<template>
<div class="project-home">
  project home
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-home',
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