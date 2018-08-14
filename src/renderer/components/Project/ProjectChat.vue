<template>
<div class="project-chat">
  project-chat
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-chat',
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