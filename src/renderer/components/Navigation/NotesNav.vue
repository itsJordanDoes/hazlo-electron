<template>
<div class="notes-nav">
  notes-nav
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'notes-nav',
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