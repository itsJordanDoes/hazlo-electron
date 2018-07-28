<template>
  <!-- <div :class="['project-view',user.settings.view_state.projects_view?'open':'closed']"> -->
  <div class="project-view">
    <div class="project-container">
      <div class="projects-tab">
        <span @click="ownedProjectsView = true" :class="ownedProjectsView?'active-tab':''">Owned</span>
        <span @click="ownedProjectsView = false" :class="!ownedProjectsView?'active-tab':''">Shared</span>
      </div>
      <div v-if="ownedProjectsView" :class="['project',user.views.active_project === i?'active':'']" v-for="project, i in ownedProjectsMeta" @click="selectProject(i)">
        <input class="project-name" :id="'project-name-' + i" :value="project.name" placeholder="Untitled Project" @keyup="updateName(i)"></input>
        <!-- <font-awesome-icon @click="deleteProject(i)" class="trash" :icon="['far', 'trash-alt']" /> -->
        <!-- {{ project.name }} -->
      </div>
    </div>
    <hr>
    <div class="new-project" @click="createProject()">
      Create New Project
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'project-view',
    components: { },
    methods: {
      createProject () {
        this.$store.dispatch('createProject').then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      },
      listenOwnedProjectsMeta () {
        var that = this
        this.$store.dispatch('listenOwnedProjectsMeta').then(function (response) {
          that.ownedProjectsMeta = that.state.owned_projects_meta
        }).catch(function (error) {
          console.log(error)
        })
      },
      stopOwnedProjectsMeta () {
        this.$store.dispatch('stopOwnedProjectsMeta').then(function (response) {
          // console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      },
      selectProject (i) {
        var that = this
        this.previousProjectId = this.user.views.active_project
        this.$store.dispatch('selectProject', {
          prev: that.previousProjectId,
          new: i
        }).then(function (response) {

        }).catch(function (error) {
          console.log(error)
        })
      },
      updateName (i) {
        var name = document.getElementById('project-name-' + i).value
        var that = this
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function () {
          that.$store.dispatch('updateProjectName', {
            name: name,
            key: i
          }).then(function (response) {

          }).catch(function (error) {
            console.log(error)
          })
        }, 500)
      }
    },
    computed: mapGetters({
      user: 'user',
      state: 'state'
    }),
    mounted () {
      this.listenOwnedProjectsMeta()
    },
    beforeDestroy () {
      this.stopOwnedProjectsMeta()
    },
    data () {
      return {
        ownedProjectsView: true,
        ownedProjectsMeta: null,
        handler: false,
        timeout: null,
        previousProjectId: null
      }
    },
    watch: {
      '$store.state.data.owned_projects_meta': function () {
        this.ownedProjectsMeta = this.state.owned_projects_meta
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
    .projects-tab {
      height:35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color:white;
      cursor:pointer;
      span:first-of-type {
        border-right:1px solid #cacaca;
      }
      span {
        height: 100%;
        width: 50%;
        border-bottom: 1px solid #cacaca;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active-tab {
        background-color:#cacaca;
      }
    }
    .project {
      white-space: nowrap;
      padding: 0.75em;
      cursor: pointer;
      font-size:14px;
      .trash {
        float:right;
        color:rgb(179, 179, 179);
        cursor:pointer;
      }
      .trash:hover {
        color:rgb(146, 146, 146);
      }
      .project-name {
        background: none;
        border:none;
        font-size:14px;
      }
      .project-name:focus {
        outline:none;
      }
    }
    .project:hover {
      background-color:rgba(0,0,0,0.05);
    }
    .active {
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