<template>
  <div class="top-bar">
    <div :class="['top-bar-btn',$store.state.data.settings.project_view?'active':'']" @click="viewToggle('project_view')">Projects</div>
    <div :class="['top-bar-btn',$store.state.data.settings.notes_view?'active':'']" @click="viewToggle('notes_view')">Notes</div>
    <div :class="['top-bar-btn',$store.state.data.settings.view_view?'active':'']" @click="viewToggle('view_view')">Views</div>
    <!-- <button @click="ideaBoardView()">Idea Board</button>
    <button @click="boardView()">Board</button>
    <button @click="$store.dispatch('exec', 'bold')">Bold</button>
    <button @click="$store.dispatch('exec', 'italic')">Italic</button>
    <button @click="$store.dispatch('exec', 'insertOrderedList')">Ordered List</button>
    <button @click="$store.dispatch('exec', 'insertUnorderedList')">Unordered List</button> -->
  </div>
</template>

<script>
  let { remote } = require('electron')
  let win = remote.getCurrentWindow()
  export default {
    name: 'top-bar',
    components: { },
    methods: {
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
          this.$store.dispatch('setView', {
            type: 'view_view',
            boolean: true
          })
        }
      },
      '$store.state.data.settings.view_view': function () {
        if (!this.$store.state.data.settings.notes_view && !this.$store.state.data.settings.view_view) {
          this.$store.dispatch('setView', {
            type: 'notes_view',
            boolean: true
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.top-bar {
  width:calc(100% - 80px);
  height:$top-bar-height;
  background-color:rgb(148, 148, 148);
  -webkit-user-select: none;
  -webkit-app-region: drag;
  // position:absolute;
  // top:0;
  // left:0;
  padding-left:80px;
  display:flex;
  flex-direction: row;
  // justify-content: left;
  align-items: center;
  .top-bar-btn {
    background-color:#f8f8f8;
    height:$top-bar-height/1.5;
    padding:0 0.5em 0 0.5em;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
  }
  .top-bar-btn:hover {
    background-color:#e0e0e0;
  }
  .active {
    background-color:#c9c9c9
  }
}
</style>