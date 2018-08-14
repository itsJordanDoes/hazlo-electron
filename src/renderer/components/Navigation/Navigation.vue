<template>
  <div :class="['nav',open?'open':'closed']" v-click-outside="closeSidebar">
    <div class="side-bar">
      <div class="window-bar"></div>
      <div class="clip"></div>
      <div class="project-select">
        <div class="active-project project" @click="projectMenu()">
          <div class="project-thumbnail">
            1
          </div>
          <div class="project-name" v-if="open">
            1234
          </div>
        </div>
        <transition name="slidedown">
          <ul class="project-list" v-if="open && projectDrop" @click="closeSidebar()">
            <router-link tag="li" v-for="proj, i in projectList" class="project" :to="'/project/' + i + '/home'">
              <div class="project-thumbnail">
                1
              </div>
              <div class="project-name">
                {{ proj.name }}
              </div>
            </router-link>
            <router-link tag="li" class="project create-project" to="/project/create">
              <font-awesome-icon :icon="['far', 'plus-circle']" />
              Create Project
            </router-link>
          </ul>
        </transition>
      </div>
      <ul class="option-list">
      <router-link tag="li" v-for="opt, i in navOptions" :class="['option']" :to="opt.route">
        <div class="option-content" @click="setOpen(true)">
          <font-awesome-icon :icon="['far', opt.icon]" />
        </div>
      </router-link>
      </ul>
      <transition name="fade">
        <!-- <router-view name="nav" v-if="open" class="side-bar-content"></router-view> -->
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'navigation',
    components: { },
    data () {
      return {
        projectDrop: false,
        projectList: {
          'project-1': {
            name: 'Project 1'
          },
          'project-2': {
            name: 'Project 2 long long long long long'
          },
          'project-3': {
            name: 'Project 3'
          },
          'project-4': {
            name: 'Project 4'
          },
          'project-5': {
            name: 'Project 5'
          }
        },
        navOptions: [
          {
            icon: 'home',
            route: 'home'
          },
          {
            icon: 'book-open',
            route: 'notes'
          },
          {
            icon: 'chalkboard',
            route: 'boards'
          },
          {
            icon: 'credit-card-blank',
            route: 'cards'
          },
          {
            icon: 'thumbtack',
            route: 'pins'
          },
          {
            icon: 'comments',
            route: 'chats'
          }
        ]
      }
    },
    methods: {
      setOpen (val) {
        if (val === 'toggle') {
          this.$emit('update:open', !this.open)
        } else if (!this.open) {
          this.$emit('update:open', val)
        }
      },
      closeSidebar () {
        this.projectDrop = false
        this.$emit('update:open', false)
      },
      projectMenu () {
        if (this.open && !this.projectDrop) {
          this.projectDrop = true
        } else if (this.open && this.projectDrop) {
          this.projectDrop = false
        } else {
          this.setOpen(true)
          this.projectDrop = true
        }
      }
    },
    watch: {
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    mounted () {
    },
    props: ['open']
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
// Colors
$sidebar-color:#f8f8f8;
$border-color:#cacaca;
$topbar-color:$white;
// $icon-color:lighten($sidebar-color, 30%);
$icon-color:$dark-blue;
$active-color:$orange;
// Sidebar Animation Variables
$numNav: 6;
$xSpacing: $sidebar-open/$numNav;
$ySpacing: 60px;
.nav {
  position:fixed;
  top:0;
  left:0;
  z-index:1;
  width:auto;
  height:100%;
  border-right:1px solid $border-color;
  .window-bar {
    width:100%;
    height:$window-bar-height;
    background-color:darken($sidebar-color,10%);
    position:relative;
    z-index:4;
  }
  .side-bar {
    background-color:$sidebar-color;
    height:100%;
    position:relative;
    transition: width $msDelay ease-in-out;
    .clip {
      background-color:$sidebar-color;
      width:100%;
      height:20px;
      position:absolute;
      z-index:3;
    }
    .project-select {
      position:relative;
      height:70px;
      border-bottom:1px solid $border-color;
      cursor:pointer;
      .active-project {
        position:absolute;
        top:10px;
        left:10px;
        right:10px;
        bottom:10px;
        border-radius:10px;
        border:1px solid $dark-blue;
        background-color:white;
        z-index:3;
      }
      .project-list {
        padding-top:10px;
        background-color:white;
        position:absolute;
        height:auto;
        width:auto;
        left:10px;
        right:10px;
        top: 50px;
        z-index:2;
        border-radius:0px 0px 10px 10px;
        li {
          height:50px;
          margin-bottom:4px;
          border:1px solid $dark-blue;
          border-radius:10px;
        }
        li:first-of-type {
          margin-top:4px;
        }
        .create-project {
          display:flex;
          justify-content: center;
          align-items:center;
          border-color:$orange;
          color:$orange;
          font-weight:600;
          svg {
            margin-right:10px;
          }
        }
      }
      .project-thumbnail {
        position:absolute;
        // background-color:blue;
        width:50px;
        height:50px;
        border-radius:10px;
        left:0;
        display:flex;
        justify-content: center;
        align-items: center;
        color:$dark-blue;
        font-weight:600;
        font-size:16px;
      }
      .project-name {
        font-weight:300;
        max-width:calc(100% - 70px);
        text-align:center;
        font-size:18px;
        text-align:center;
        margin-left:auto;
        margin-right:10px;
        line-height:50px;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
    .project {
      position:relative;
    }
    .option-list {
      height:auto;
      width:100%;
      position:relative;
      color:$icon-color;
      .router-link-active {
        color:$active-color;
      }
      .router-link-active:hover {
        color:lighten($active-color, 15%);
      }
      .option {
      cursor:pointer;
      position:absolute;
      display:flex;
      justify-content: center;
      align-items:center;
      z-index:1;
      // TODO: I DON'T LIKE THIS PLEASE CHANGE EVENTUALLY. SPECIFICALLY THE OPTION-CONTENT TO FIRE JAVASCRIPT METHOD
        .option-content {
          width:100%;
          height:100%;
          display:flex;
          justify-content: center;
          align-items:center;
        }
     }
    }
    .option:hover {
      color:lighten($icon-color, 15%);
    }
    .side-bar-content {
      // background-color:lighten($sidebar-color,10%);
      // border-radius:5px;
      width:auto;
      position:absolute;
      top:$ySpacing + 20px;
      bottom:20px;
      left:20px;
      right:20px;
      // transition: opacity $msDelay ease-in-out $msDelay;
    }
  }
}
.open {
  .side-bar {
    width: $sidebar-open;
    @for $i from 1 through $numNav {
      .option:nth-of-type(#{$i}) {
        width:$xSpacing;
        height:$xSpacing;
        transform:translate(($xSpacing) * $i - $xSpacing,0px);
        transition: transform $msDelay + 100 ease-in-out;
        transition-delay:($i * 100ms) - 100ms;
        transition-timing-function: cubic-bezier(.9,-0.52,.24,1.54);
      }
    }
    .option-list {
      .router-link-active {
        border-bottom:0px solid $active-color;
        animation: $msDelay ease-in-out borderFade forwards;
      }
    }
    .project-select {
      .project-thumbnail {
          border-right:1px solid $dark-blue;
      }
    }
  }
  .window-bar {
    .left-bar {
      width:$sidebar-open;
    }
    .right-bar {
      width:calc(100% - #{$sidebar-open});
    }
  }
}
.closed {
  .side-bar {
    width: $sidebar-closed;
    @for $i from 1 through $numNav {
      .option:nth-of-type(#{$i}) {
        width:100%;
        height:$ySpacing;
        transform:translate(0px,($i * $ySpacing) - $ySpacing);
        transition: all $msDelay ease-in-out;
        transition-delay:0s;
        transition-timing-function: cubic-bezier(.36,.34,.6,1.32);
      }
    }
    .option-list {
      .router-link-active {
        border-left:0px solid $active-color;
        animation: $msDelay ease-in-out borderFade forwards;
        svg {
          // border centering
          margin-left: -6px;
        }
      }
    }
    .side-bar-content {
      // opacity:0;
    }
  }
  .window-bar {
    .left-bar {
      width:$sidebar-closed;
    }
    .right-bar {
      width:calc(100% - #{$sidebar-closed});
    }
  }
}
// Vue Transitions
.fade-enter-active {
  transition: opacity $msDelay ease-in-out $msDelay/2;
}
.fade-leave-active {
  transition: opacity $msDelay ease-in-out 0ms;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slidedown-enter-active, .slidedown-leave-active {
  transition: transform 1000ms ease-in-out 0ms;
}
.slidedown-enter-to, .slidedown-leave {
  transform:translate(0px);
}
.slidedown-enter, .slidedown-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform:translate(0px, -400px);
}

// Animation Keyframe
@keyframes borderFade {
    0% {
      border-width: 0px;
    }
    75% {
      border-width: 0px;
    }
    100% {
      border-width: 4px;
    }
}
</style>