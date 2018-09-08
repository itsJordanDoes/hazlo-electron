<template>
  <div class="icon-picker">
    <div class="icon" @click="iconSelect = true">
      <font-awesome-icon :icon="['far', icon]" />
    </div>
    <div v-if="iconSelect" class="icon-selection">
      <div class="icon" v-for="icon in icons" @click="selectIcon(icon)">
        <font-awesome-icon :icon="['far', icon]" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Icon Picker',
    components: { },
    data () {
      return {
        iconSelect: false,
        icons: ['tasks', 'palette', 'glasses', 'folder', 'list-alt', 'project-diagram', 'user', 'users']
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      selectIcon (icon) {
        this.$emit('update:icon', icon)
        this.iconSelect = false
      }
    },
    mounted () {
    },
    beforeDestroy () {
    },
    props: ['icon']
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
$background-color:$white;
$border-color:$grey;

.icon-picker {
  height:22px;
  width:22px;
  .icon-selection {
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
  .icon {
    height:100%;
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
  }
}
</style>