<template>
  <div class="top-bar">
    <div class="top-bar-btn-container">
      <div class="top-bar-btn" v-show="$route.name !== 'feed'" @click="route('/')">Project Feed</div>
      <div class="top-bar-btn" v-show="$route.name !== 'workspace'" @click="route('/workspace')">Workspace</div>
    </div>
    <div class="top-bar-btn-container" v-show="$route.name === 'workspace'">
      <div :class="['top-bar-btn icon',$store.state.data.settings.project_view?'active':'']" @click="viewToggle('project_view')">
        <font-awesome-icon :icon="['far', 'folder-open']" />
      </div>
      <div :class="['top-bar-btn icon',$store.state.data.settings.notes_view?'active':'']" @click="viewToggle('notes_view')">
        <font-awesome-icon :icon="['far', 'edit']" />
      </div>
      <div :class="['top-bar-btn icon',$store.state.data.settings.view_view?'active':'']" @click="viewToggle('view_view')">
        <font-awesome-icon :icon="['far', 'list-alt']" />
      </div>
    </div>
    <div class="top-bar-btn-container right">
      <div class="top-bar-btn" v-show="$route.name !== 'settings'" @click="route('/settings')">Settings</div>
    </div>
  </div>
</template>

<script>
  let { remote } = require('electron')
  let win = remote.getCurrentWindow()
  export default {
    name: 'top-bar',
    components: { },
    methods: {
      route (route) {
        this.$router.push({path: route})
      },
      viewToggle (event) {
        this.clicks++
        if (this.clicks === 1) {
          var self = this
          this.timer = setTimeout(function () {
            self.$store.dispatch('toggleView', event)
            self.clicks = 0
          }, this.delay)
        } else {
          clearTimeout(this.timer)
          this.windowSelect(event)
          this.clicks = 0
        }
      },
      windowSelect (type) {
        if (type === 'project_view') {
          this.dispatchView('project_view', true)
          this.dispatchView('notes_view', false)
          this.dispatchView('view_view', true)
          win.setSize(1024, 768, true)
        } else if (type === 'notes_view') {
          this.dispatchView('project_view', false)
          this.dispatchView('notes_view', true)
          this.dispatchView('view_view', false)
          win.setSize(450, 600, true)
        } else if (type === 'view_view') {
          this.dispatchView('project_view', false)
          this.dispatchView('notes_view', false)
          this.dispatchView('view_view', true)
          win.setSize(1024, 768, true)
        }
      },
      dispatchView (type, boolean) {
        this.$store.dispatch('setView', {
          type: type,
          boolean: boolean
        })
      },
      workspaceRoute () {
        this.$router.push({path: `/workspace`})
      },
      ideaBoardView () {
        var i = this.$route.params.id
        this.$router.push({path: `/project/${i}/home`, params: { i }})
      },
      boardView () {
        var i = this.$route.params.id
        this.$router.push({path: `/project/${i}/board`, params: { i }})
      }
    },
    computed: {

    },
    mounted () {
    },
    data () {
      return {
        delay: 200,
        clicks: 0,
        timer: null
      }
    },
    watch: {
      '$store.state.data.settings.project_view': function () {

      },
      '$store.state.data.settings.notes_view': function () {
        if (!this.$store.state.data.settings.notes_view && !this.$store.state.data.settings.view_view) {
          this.dispatchView('view_view', true)
        }
      },
      '$store.state.data.settings.view_view': function () {
        if (!this.$store.state.data.settings.notes_view && !this.$store.state.data.settings.view_view) {
          this.dispatchView('notes_view', true)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
$top-bar-color: rgb(238, 238, 238);
$btn-color: rgb(255, 255, 255);
.top-bar {
  width:calc(100% - 80px);
  height:$top-bar-height;
  background: linear-gradient($top-bar-color, darken($top-bar-color, 12%));
  -webkit-user-select: none;
  -webkit-app-region: drag;
  padding-left:80px;
  display:flex;
  flex-direction: row;
  align-items: center;
  .top-bar-btn-container {
    height:100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding-left:10px;
    padding-right:10px;
    border-left:1px solid darken($top-bar-color, 15%);
    border-right:1px solid darken($top-bar-color, 15%);
    .top-bar-btn {
      margin-right:5px;
      margin-left:5px;
    }
  }
  .top-bar-btn {
    color:darken($btn-color, 40%);
    background-color:$btn-color;
    height:$top-bar-height/1.5;
    padding:0 0.5em 0 0.5em;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    border-radius:3px;
    box-shadow:1px 1px 3px rgba(darken($btn-color, 50%), 0.2);
    // svg {
    //   color:darken($btn-color, 30%);
    // }
  }
  .icon {
    width:25px;
  }
  .top-bar-btn:hover {
    background-color:darken($btn-color, 5%);
  }
  .top-bar-btn:active {
    box-shadow: inset 2px 2px 5px rgba(darken($btn-color, 50%), 0.2);
  }
  .active {
    box-shadow: inset 2px 2px 5px rgba(darken($btn-color, 50%), 0.6);
    background-color:darken($btn-color, 10%);
  }
  .right {
    margin-left: auto;
  }
}
</style>