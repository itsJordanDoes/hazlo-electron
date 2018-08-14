<template>
<div class="project-settings">
  project-settings
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-settings',
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