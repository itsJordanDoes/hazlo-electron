<template>
<div class="project-cards">
  project-cards
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-cards',
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