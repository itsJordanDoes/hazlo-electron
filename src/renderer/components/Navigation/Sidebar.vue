<template>
  <div :class="['sidebar',open?'open':'closed']" v-click-outside="closeSidebar">
    <div class="clip"></div>
    <ul class="com-container">
      <li class="com" v-for="com, i in communities" v-if="i === $route.params.community_id || !open">
        <router-link tag="div" class="com-meta" :to="'/c/' + i + '/home'">
          <div :class="['thumbnail center-square',i === $route.params.community_id?'thumbnail-active':'']"  @click="setOpen(true)">
            <img v-if="com.image" :src="com.image" alt="">
            <label v-else class="com-acronym">{{ com.name.charAt(0) }}</label>
          </div>
          <div class="com-title" v-if="open"  @click="setOpen(true)">
            <p class="title-content">{{ com.name }}</p>
          </div>
        </router-link>
        <ul class="sub-nav" v-if="i === $route.params.community_id">
          <!-- <router-link tag="li" v-for="opt, ii in navOptions" class="sub-nav-item" :to="'/c/' + i + '/' + opt.route"> -->
          <router-link tag="li" v-for="opt, ii in navOptions" class="sub-nav-item" :to="{ name: opt.route, params: $route.params }">
            <div class="function" @click="setOpen(true)">
              <font-awesome-icon :icon="['far', opt.icon]" />
            </div>
          </router-link>
        </ul>
        <router-view class="options" v-if="i === $route.params.community_id && open" name="nav"></router-view>
      </li>
      <li class="com" v-if="!open">
        <router-link tag="div" class="discover" to="/c/discover">
          <div class="thumbnail center-square">
            <font-awesome-icon :icon="['far', 'plus']" />
          </div>
          <p v-if="open" class="title-content">Join New Community</p>
        </router-link>
      </li>
    </ul>
    <div class="profile" @click="setOpen(true)">
      <div class="thumbnail center-square">
        JG
      </div>
      <div class="profile-meta" v-if="open">
        <p class="title">Jordan Gorla</p>
        <div class="setting center-square">
          <font-awesome-icon :icon="['far', 'cog']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'sidebar',
    components: { },
    data () {
      return {
        communities: {
          'com1': {
            name: 'Community 1',
            image: 'https://www.designevo.com/res/templates/thumb_small/blue-and-white-square.png'
          },
          'com2': {
            name: 'Community 2',
            image: null
          },
          'com3': {
            name: 'Community 3',
            image: null
          },
          'com4': {
            name: 'Community 4',
            image: null
          },
          'com5': {
            name: 'Community 5',
            image: null
          },
          'com6': {
            name: 'Community 6',
            image: null
          },
          'com7': {
            name: 'Community 7',
            image: null
          },
          'com8': {
            name: 'Community 8',
            image: null
          },
          'com9': {
            name: 'Community 9',
            image: null
          }
        },
        navOptions: {
          'home': {
            icon: 'home',
            route: 'Community Home'
          },
          'projects': {
            icon: 'tasks',
            route: 'Projects'
          },
          'notes': {
            icon: 'book-open',
            route: 'Notes'
          },
          'boards': {
            icon: 'chalkboard',
            route: 'Boards'
          },
          'chat': {
            icon: 'comments',
            route: 'Chats'
          }
        }
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
        this.$emit('update:open', false)
      }
    },
    watch: {
      '$route': function () {
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    mounted () {
    },
    beforeDestroy () {
    },
    props: ['open']
  }
</script>

<style lang="scss">
@import "../../sass/settings.scss";
// Sizing
$sidebar-open: 350px;
$sidebar-closed: 70px;
$window-bar-height: 22px;
$spacing:10px;
// Colors
$sidebar-color:#fff;
$border-color:#cacaca;
$border:1px solid $border-color;
$topbar-color:$white;
// $icon-color:lighten($sidebar-color, 30%);
$icon-color:$dark-blue;
$active-color:$orange;
// Sidebar Animation Variables
$numNav: 5;
$xSpacing: $sidebar-open/$numNav;
$ySpacing: $sidebar-closed;
$delay: 300ms;
.center-square {
  display:flex;
  justify-content: center;
  align-items: center;
  height: $sidebar-closed - $spacing*2;
  width: $sidebar-closed - $spacing*2;
  border-radius:5px;
  border:$border;
}
.sidebar {
  background:$sidebar-color;
  border-right:$border;
  transition: width ease-in-out $delay;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  overflow:scroll;
  .com-container {
    position:relative;
    top:$window-bar-height;
    height:calc(100% - #{$sidebar-closed} - #{$window-bar-height});
    .com {
      min-height:$sidebar-closed;
      cursor:pointer;
      .com-meta {
        display:flex;
        position:relative;
        height:$sidebar-closed;
        .thumbnail {
          position:absolute;
          left:$spacing;
          background-color:#f8f8f8;
          img {
            width:100%;
            height:100%;
            border-radius:5px;
          }
          .com-acronym {
            font-weight:600;
            font-size:22px;
          }
        }
        .com-title {
          position:absolute;
          left:$sidebar-closed;
          right:$spacing;
          height:$sidebar-closed - $spacing*2;
          display:flex;
          align-items: center;
          .title-content {
            margin:0;
          }
        }
      }
      .discover {
        display:flex;
        cursor:pointer;
        .thumbnail {
          background-color:white;
          color:$border-color;
          border:2px dashed $border-color;
          margin-left:$spacing;
          margin-right:$spacing;
          font-size:24px;
        }
      }
    }
    .sub-nav {
      position:relative;
      .router-link-active {
        svg {
          color:$active-color;
        }
      }
      .sub-nav-item {
        height:$sidebar-closed;
        width:$sidebar-closed;
        position:absolute;
        color:$icon-color;
        cursor:pointer;
        .function {
          height:100%;
          width:100%;
          display:flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .profile {
    position:fixed;
    bottom:0;
    height:$sidebar-closed;
    border-top:$border;
    background-color:white;
    display:flex;
    cursor:pointer;
    .thumbnail {
      position:absolute;
      left:$spacing;
      bottom:$spacing;
      background-color:#f8f8f8;
    }
    .profile-meta {
      display:flex;
      justify-content: space-between;
      align-items: center;
      position:absolute;
      left:$sidebar-closed;
      top:$spacing;
      right:$spacing;
      .setting {
        color:#cacaca;
        background-color:#f8f8f8;
      }
      .setting:hover {
        background-color:darken(#f8f8f8, 5%);
      }
    }
  }
  .options {
    border-top:$border;
  }
}
.sidebar::-webkit-scrollbar {
  width:0px !important;
}
.open {
  width:$sidebar-open;
  .com {
    height:100%;
  }
  @for $i from 1 through $numNav {
    .sub-nav-item:nth-of-type(#{$i}) {
      transform:translate(($xSpacing) * $i - $xSpacing,0px);
      transition: transform $msDelay + 100 ease-in-out;
      transition-delay:($i * 100ms) - 100ms;
      transition-timing-function: cubic-bezier(.9,-0.52,.24,1.54);
    }
  }
  .sub-nav {
    height:$sidebar-closed;
    .router-link-active {
      border-bottom:4px solid $active-color;
    }
  }
  .profile {
    width:$sidebar-open;
  }
  .options {
    height:calc(100% - #{$sidebar-closed * 2});
  }
}
.closed {
  width:$sidebar-closed;
  .com {
    height:auto;
  }
  @for $i from 1 through $numNav {
    .sub-nav-item:nth-of-type(#{$i}) {
      transform:translate(0px,($i * $ySpacing) - $ySpacing);
      transition: transform $msDelay ease-in-out;
      transition-delay:0s;
      transition-timing-function: cubic-bezier(.36,.34,.6,1.32);
    }
  }
  .sub-nav {
    height:$numNav * $ySpacing;
    .router-link-active {
      // border-right:4px solid $active-color;
    }
  }
  .profile {
    width:$sidebar-closed;
  }
  .options {
    height:$numNav * $ySpacing;
  }
}

// Corner Style
.thumbnail-active:after,
.thumbnail-active:before {
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
.thumbnail-active:after {
    // top: 10px;
    border-color:$sidebar-color transparent transparent transparent;
    border-width: 10px;
}

/* this border color controlls the outside, thin border */
.thumbnail-active:before {
    // top: 8px;
    border-color:$border-color transparent transparent transparent;
    border-width: 11px;
}
</style>