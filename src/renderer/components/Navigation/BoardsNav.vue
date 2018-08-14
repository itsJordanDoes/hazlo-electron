<template>
<div class="boards-nav">
  boards-nav
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'boards-nav',
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