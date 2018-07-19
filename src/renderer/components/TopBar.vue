<template>
  <div class="top-bar">
    <div class="top-bar-btn-container">
      <div class="top-bar-btn" v-show="$route.name !== 'feed'" @click="route('/')">Project Feed</div>
      <div class="top-bar-btn" v-show="$route.name !== 'workspace' && $store.state.data.projects.length > 0" @click="route('/workspace')">Workspace</div>
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
      <button @click="styleCommand('title')">Log</button>
    </div>
    <div class="top-bar-btn-container tool-tip-parent" v-click-outside="hideStyles" v-show="$store.state.data.settings.notes_view && $route.name === 'workspace'">
      <div class="top-bar-btn" @click="stylesView = !stylesView">
        <font-awesome-icon :icon="['fas', 'font']" />
      </div>
      <div id="tool-bar" class="tool-tip" v-show="stylesView">
        <button class="tool-tip-btn ql-header" @click="stylesView = false"><h2>Title</h2></button>
        <button class="tool-tip-btn ql-bold" @click="stylesView = false"><strong>Heading</strong></button>
        <button class="tool-tip-btn ql-italic" @click="stylesView = false"><em>Detail</em></button>
        <button class="tool-tip-btn ql-list" @click="stylesView = false"><ul><li>Bulleted List</li></ul></button>
        <button class="tool-tip-btn" @click="stylesView = false"><ol><li>Checklist</li></ol></button>
        <button class="tool-tip-btn ql-code-block" @click="stylesView = false"><code>Snippet</code></button>
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
      hideStyles () {
        this.stylesView = false
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
        timer: null,
        stylesView: false
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
  .tool-tip-parent {
    display:relative;
    .tool-tip {
      position: absolute;
      z-index:4;
      background-color:white;
      width:auto;
      height:auto;
      top:36px;
      display:flex;
      flex-direction: column;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.3);
      border-radius:3px;
      margin-left:-40px;
      padding:10px;
      .tool-tip-btn {
        font-size:14px;
        cursor:pointer;
        margin:0;
        padding:5px;
        background:none;
        border:none;
        h3, h2 {
          margin:0;
        }
        ul {
          margin:0;
          padding-left: 19px;
        }
        ol {
          margin:0;
          padding-left: 19px;
        }
      }
    }
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