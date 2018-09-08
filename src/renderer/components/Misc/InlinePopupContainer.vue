<template>
  <div class="inline-popup-container">
    <slot></slot>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Inline Popup Container',
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
@import "../../sass/settings.scss";
$background-color:$white;
$border-color:$grey;

.inline-popup-container {
  position:absolute;
  background-color:$background-color;
  border:1px solid $border-color;
  width:auto;
  display:flex;
  height:40px;
  top: -55px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border-radius:10px;
  .slot-obj {
    padding:5px;
    min-width:40px;
    display:flex;
    justify-content: center;
    align-items:center;
  }
}
.inline-popup-container:after,
.inline-popup-container:before {
    content: '';
    display: block;
    position: absolute;
    top:100%;
    width: 0;
    height: 0;
    border-style: solid;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}


/* this border color controlls the color of the triangle (what looks like the fill of the triangle) */
.inline-popup-container:after {
    // top: 10px;
    border-color:$background-color transparent transparent transparent;
    border-width: 10px;
}

/* this border color controlls the outside, thin border */
.inline-popup-container:before {
    // top: 8px;
    border-color:$border-color transparent transparent transparent;
    border-width: 11px;
}
</style>