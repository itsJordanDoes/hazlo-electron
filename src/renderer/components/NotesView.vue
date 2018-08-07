<template>
  <!-- <div :class="['notes-view',user.settings.view_state.notes_view?'open':'closed']"> -->
  <div class="notes-view" id="notes-view">
    <div class="editor-container">
      <editor v-if="live" id="editor" inline :init="init" api-key="ipdkwew8kl6935yqdqe0z5bbflvbxi0k9p79od81lfpwf1zy" v-model="notes"></editor>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import Editor from '@tinymce/tinymce-vue'
  import interact from 'interactjs'
  // var jsdiff = require('diff')
  // import { mapGetters } from 'vuex'
  export default {
    name: 'notes-view',
    components: { Editor },
    methods: {
      resetNotes () {
        this.live = false
        this.intilize()
      },
      intilize () {
        var that = this
        this.init = {
          selector: '#editor',
          branding: false,
          menubar: false,
          toolbar: false,
          inline: true,
          theme: 'inlite',
          plugins: [
            'lists'
          ],
          insert_toolbar: 'numlist bullist',
          selection_toolbar: 'bold italic | h2 h3 | bullist | currentselection',
          //   contextmenu: 'inserttable | cell row column deletetable',
          setup: function (editor) {
            that.editor = editor
            function createCard () {
              console.log(editor.selection.getContent())
            }
            editor.addButton('currentselection', {
              text: 'Create Card',
              tooltip: 'Convert To Card',
              onclick: createCard
            })
          }
        }
        this.live = true
        that.listenToNotes()
      },
      listenToNotes () {
        var that = this
        if (this.user.views.previous_project !== null) {
          this.stopProjectNotes(this.user.views.previous_project)
        }
        firebase.database().ref('projects/' + this.user.views.active_project + '/project_notes').on('value', function (snapshot) {
          // that.editor.setContent(snapshot.val())
          // var diff = jsdiff.diffChars(that.notes, snapshot.val())
          // diff.forEach(function (part) {
          //   console.log(part)
          // })
          that.notes = snapshot.val()
        })
      },
      stopProjectNotes (key) {
        firebase.database().ref('projects/' + key + '/project_notes').off()
      },
      updateProjectNotes () {
        var that = this
        var key = this.user.views.active_project
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function () {
          firebase.database().ref('projects/' + key + '/project_notes').set(that.notes)
        }, 500)
      },
      resizableNotes () {
        interact('.notes-view').resizable({
          edges: { left: true, right: true, bottom: false, top: false },
          restrictEdges: {
            outer: 'parent',
            endOnly: true
          },
          restrictSize: {
            min: { width: 300 }
          },
          inertia: false,
          onmove: function (event) {
          }
        }).on('resizemove', function (event) {
          event.target.style.width = event.rect.width + 'px'
        })
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    mounted () {
      this.resetNotes()
      if (this.user.views.boards_view) {
        this.resizableNotes()
      } else {
        document.getElementById('notes-view').style.width = '100%'
        interact('.notes-view').unset()
      }
    },
    beforeDestroy () {
      this.live = false
      this.stopProjectNotes(this.user.views.active_project)
      this.stopProjectNotes(this.user.views.previous_project)
    },
    data () {
      return {
        notes: '',
        init: {},
        live: false,
        timeout: '',
        editor: null
      }
    },
    watch: {
      '$store.state.data.user.views.active_project': function () {
        this.resetNotes()
      },
      'notes': function () {
        this.updateProjectNotes()
      },
      'user.views.boards_view': function () {
        if (this.user.views.boards_view) {
          this.resizableNotes()
        } else {
          document.getElementById('notes-view').style.width = '100%'
          interact('.notes-view').unset()
        }
      }
      // '$store.state.data.project_notes': function () {
      //   console.log('Notice Change?')
      //   this.notes = this.state.projects_notes[this.user.views.active_project]
      //   this.editor.setContent(this.notes)
      // },
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.editor-container {
  width:auto;
  height:100%;
  padding:20px;
}
.notes-view{
  transition: min-width $delay ease 0s,width $delay ease 0s, opacity $delay ease $delay,visibility 0s ease 0s;
  // min-width:33%;
  width:100%;
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