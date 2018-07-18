<template>
  <div :class="['project-view',$store.state.data.settings.project_view?'open':'closed']">
    <div class="project-container">
      <div class="project" v-for="project, i in projects" @click="viewProject(i)">{{ project.label }}</div>
    </div>
    <hr>
    <div class="new-project" @click="addProject()">
      Add New Project
    </div>
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
  visibility: hidden;
  opacity:0;
}
.open {
  width:$side-bar-width;
  visibility: visible;
  opacity:1;
}
.project-view{
  transition: min-width $delay ease 0s,width $delay ease 0s, opacity $delay ease $delay,visibility 0s ease 0s;
  min-width:$side-bar-width;
  height:100%;
  background-color:#f8f8f8;
  border-right:1px solid #cacaca;
  z-index:3;
  .project-container {
    display:flex;
    flex-direction: column;
    .project {
      white-space: nowrap;
      padding: 0.75em;
      cursor: pointer;
      font-size:14px;
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
    white-space: nowrap;
    padding: 0.75em;
    cursor:pointer;
    background-color:rgba(0,0,0,0.05);
    // transition: opacity 0.2s ease, visibility 0.2s ease;
  }
  .new-project:hover {
    background-color:rgba(0,0,0,0.1);
  }
}
</style>