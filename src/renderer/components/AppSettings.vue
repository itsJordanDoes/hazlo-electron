<template>
  <div>
    <label for="">App Settings</label>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'settings',
    components: { },
    methods: { },
    computed: mapGetters({ }),
    mounted () { },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";

</style>