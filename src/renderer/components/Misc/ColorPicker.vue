<template>
  <div class="color-picker">
    <div class="color-outline" :style="'border-color:' + mainColor + ';'" @click="colorSelect = true">
      <div class="color-circle" :style="'background-color:' + mainColor + ';'">
      </div>
    </div>
    <div v-if="colorSelect" class="color-selection">
      <div v-for="color in colors" class="color-outline" :style="'border-color:' + color + ';'" @click="selectColor(color)">
        <div class="color-circle" :style="'background-color:' + color + ';'"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Color Picker',
    components: { },
    data () {
      return {
        colorSelect: false,
        colors: ['#124DFF', '#A409FF', '#FF0023', '#FFAB00', '#FFF800', '#4CFF00', '#333333', '#cacaca']
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      selectColor (color) {
        this.$emit('update:color', color)
        this.colorSelect = false
      }
    },
    mounted () {
    },
    beforeDestroy () {
    },
    props: ['mainColor']
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
$background-color:$white;
$border-color:$grey;

.color-picker {
  height:22px;
  width:22px;
  .color-selection {
    position:absolute;
    background-color:$background-color;
    border:1px solid $border-color;
    width:250px;
    height:100%;
    padding:1px;
    top:-1px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius:10px;
    display:flex;
    justify-content: space-around;
    align-items:center;
  }
  .color-outline {
    height:18px;
    width:18px;
    border-style:solid;
    border-width:2px;
    border-radius:50%;
    display:flex;
    justify-content: center;
    align-items: center;
    .color-circle {
      width:75%;
      height:75%;
      border-radius:50%;
    }
  }
}
</style>