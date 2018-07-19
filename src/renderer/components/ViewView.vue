<template>
  <div id="view-view" :ondragenter="color('enter')" :ondragleave="color('leave')" :class="['view-view',$store.state.data.settings.view_view?'open':'closed']">
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'view-view',
    components: { },
    methods: {
      color (color) {
        console.log(color)
      }
    },
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
.closed {
  width:0%;
  min-width:0% !important;
  visibility: hidden;
  opacity:0;
}
.open {
  width:100%;
  visibility: visible;
  opacity:1;
}
.view-view{
  transition: min-width $delay ease 0s,width $delay ease 0s, opacity $delay ease $delay,visibility 0s ease 0s;
  min-width:50%;
  height:100%;
  background-color:white;
  .project-container {
    display:flex;
    flex-direction: column;
    .project {
      padding: 0.75em;
      cursor: pointer;
    }
    .project:hover {
      background-color:rgba(0,0,0,0.05);
    }
  }
  hr {
    border-color:rgba(0,0,0,0.05);
    margin:0;
    padding:0;
  }
  .new-project {
    padding: 0.75em;
    cursor:pointer;
    background-color:rgba(0,0,0,0.05);
  }
  .new-project:hover {
    background-color:rgba(0,0,0,0.1);
  }
}
</style>