<template>
  <div class="top-bar">

  </div>
</template>

<script>
  // const Store = require('electron-store')
  // const store = new Store()
  export default {
    name: 'top-bar',
    components: { },
    methods: {
    },
    computed: {

    },
    mounted () {

    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.top-bar {
  width:100%;
  height:$top-bar-height;
  background-color:$bg-color-1;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  position:absolute;
  top:0;
  left:0;
}
</style>