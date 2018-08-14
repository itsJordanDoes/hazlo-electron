<template>
  <div class="pins-view">
    <div class="pin" v-for="pin, i in user.pins">
      {{ pin.content }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'pins-view',
    components: { },
    methods: {
    },
    computed: mapGetters({
      user: 'user',
      state: 'state'
    }),
    mounted () {
    },
    beforeDestroy () {
    },
    data () {
      return {
        pins: {
          'pin-1': {
            content: 'Ola Como estas!'
          },
          'pin-2': {
            content: 'Muhahaha Boo!'
          }
        }
      }
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
.pins-view {
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  .pin {
    padding:20px;
    margin-bottom:10px;
    background-color:rgba(100, 50, 0, 0.2);
    width:80%;
    margin:auto;
  }
}
</style>