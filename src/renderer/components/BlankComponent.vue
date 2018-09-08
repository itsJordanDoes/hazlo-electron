<template>
  <div>
    {{ $route.path }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: '',
    components: { },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
</style>