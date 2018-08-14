<template>
<div class="project-pins">
  project-pins
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-pins',
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