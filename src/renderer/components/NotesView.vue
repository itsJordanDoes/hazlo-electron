<template>
  <div :class="['notes-view',$store.state.data.settings.notes_view?'open':'closed']">
    <div v-show="createCard">CAN MAKE A CARD</div>
    <div id="editor"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Quill from 'quill'
  export default {
    name: 'notes-view',
    components: { },
    methods: {
      log () {
        var selection = this.textEditor.getSelection()
        console.log(this.textEditor.getContents(selection.index, selection.length))
      },
      buildTextEditor () {
        var that = this
        var i = this.$store.state.data.settings.active_project
        var container = document.getElementById('editor')
        var toolBar = document.getElementById('tool-bar')
        var options = {
          // debug: 'info',
          modules: {
            toolbar: toolBar
          }
        }
        this.textEditor = new Quill(container, options)
        this.textEditor.setContents(this.$store.state.data.projects[i].notes)
        this.textEditor.on('text-change', function (delta, oldDelta, source) {
          if (source === 'api') {
            // console.log('An API call triggered this change.')
          } else if (source === 'user') {
            // console.log('A user action triggered this change.')
            that.$store.dispatch('saveNotes', {
              id: that.$store.state.data.settings.active_project,
              data: that.textEditor.getContents()
            })
          }
        })
      }
    },
    computed: mapGetters({ }),
    mounted () {
      var that = this
      this.buildTextEditor()
      document.addEventListener('selectionchange', function () {
        if (window.getSelection().toString() !== '') {
          that.createCard = true
        } else {
          that.createCard = false
        }
      })
    },
    data () {
      return {
        textEditor: null,
        createCard: false
      }
    },
    watch: {
      '$store.state.data.settings.active_project': function () {
        this.buildTextEditor()
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
.notes-view{
  transition: min-width $delay ease 0s,width $delay ease 0s, opacity $delay ease $delay,visibility 0s ease 0s;
  min-width:33%;
  height:100%;
  background-color:white;
  border-right:1px solid #cacaca;
  z-index:2;
  #editor {
    width:100%;
    height:100%;
    outline:none;
    .ql-editor {
      width:100%;
      height:100%;
      outline:none;
    }
  }
}
</style>