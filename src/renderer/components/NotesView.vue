<template>
  <div :class="['notes-view',$store.state.data.settings.notes_view?'open':'closed']">
    NOTES VIEW
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-view',
    components: { },
    methods: {
      addProject () {
        this.$router.push({path: '/create-project'})
      },
      viewProject (i) {
        console.log(i)
        // this.$router.push({path: `/project/${i}/home`, params: { i }})
      }
    },
    computed: mapGetters({
      projects: 'projects'
    }),
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
.closed {
  width:0%;
  min-width:0% !important;
}
.open {
  width:100%;
}
.notes-view{
  transition: min-width 0.4s ease,width 0.4s ease;
  min-width:33%;
  height:100%;
  background-color:white;
  border-right:1px solid #cacaca;
  z-index:2;
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