<template>
<div class="create-project">
  create project
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'create-project',
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