<template>
  <div class="container">
    <div class="title">Projects</div>
    <div class="cat-container">
      <div :class="['category',projectCategory === 'my' ? 'active' : '']" @click="selectCategory('my')">Owned</div>
      <div :class="['category',projectCategory === 'shared' ? 'active' : '']" @click="selectCategory('shared')">Shared</div>
      <div :class="['category',projectCategory === 'public' ? 'active' : '']" @click="selectCategory('public')">Public</div>
    </div>
    <router-link class="create" tag="div" to="create">
      Create a Project
    </router-link>
    <ul class="side-bar-list">
        <router-link class="link" tag="li" v-for="project, i in projects" :to="'/c/' + $route.params.community_id + '/project/' + i">
          {{ project.name }}
        </router-link>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'projects-nav',
    components: { },
    data () {
      return {
        projectCategory: 'my',
        myProjects: {
          '1': {
            name: 'Project 1'
          },
          '2': {
            name: 'Project 2'
          },
          '3': {
            name: 'Project 3'
          },
          '4': {
            name: 'Project 4'
          },
          '5': {
            name: 'Project 5'
          },
          '6': {
            name: 'Project 6'
          }
        },
        sharedProjects: {
          '7': {
            name: 'Shared Project'
          }
        },
        publicProjects: {
          '8': {
            name: 'Public Project'
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      projects () {
        let p = this.projectCategory
        if (p === 'my') {
          return this.myProjects
        } else if (p === 'shared') {
          return this.sharedProjects
        } else if (p === 'public') {
          return this.publicProjects
        } else {
          return {}
        }
      }
    },
    methods: {
      selectCategory (p) {
        this.projectCategory = p
      }
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
$spacing: 10px;
$btn-color:$dark-blue;
$font-color:white;
.title {
  font-weight:600;
  font-size:1.4em;
  text-align: center;
  width:100%;
  margin-bottom:$spacing;
  margin-top:$spacing;
}
.cat-container {
  display:flex;
  width:100%;
  .category {
    width:33%;
    height:40px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    background-color:darken(#f8f8f8, 5%);
  }
}
.create {
  background-color: $btn-color;
  margin:$spacing;
  padding:$spacing;
  border-radius:5px;
  color:$font-color;
  cursor:pointer;
  display:flex;
  justify-content: center;
  align-items: center;
}
.create:hover {
  background-color:darken($btn-color, 5%);
}
.side-bar-list {
  border:1px solid #cacaca;
  overflow:scroll;
  height:calc(100% - 142px);
  margin:$spacing;
  border-radius:5px;
  .link {
    padding:$spacing;
    border-left:4px solid transparent;
  }
  .link:hover {
    background:#f8f8f8;
  }
  .router-link-active {
    color:$orange;
    border-color:$orange;
  }
}
</style>