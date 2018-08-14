<template>
  <!-- <div :class="['notes-view',user.settings.view_state.notes_view?'open':'closed']"> -->
  <div class="notes-view" id="notes-view">

    <div v-if="views.active_notes" class="editor-container">
      <h1 class="note-title">Notes Title {{ $route.params.project }}</h1>
      <editor v-if="live" id="editor" inline :init="init" api-key="ipdkwew8kl6935yqdqe0z5bbflvbxi0k9p79od81lfpwf1zy" v-model="selectedNotes"></editor>
    </div>
    <div v-else>
      Select Notes Brah!
    </div>
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  // import interact from 'interactjs'
  // var jsdiff = require('diff')
  import { mapGetters } from 'vuex'
  export default {
    name: 'notes',
    components: { Editor },
    methods: {
      resetNotes () {
        this.live = false
        this.intilize()
      },
      intilize () {
        var that = this
        this.init = {
          selector: '#notes-menu',
          branding: false,
          menubar: false,
          toolbar: false,
          inline: true,
          theme: 'inlite',
          plugins: [
            'lists'
          ],
          insert_toolbar: '| h2 bold italic bullist numlist numlist bullist |',
          selection_toolbar: '| h2 bold italic bullist numlist currentselection |',
          //   contextmenu: 'inserttable | cell row column deletetable',
          setup: function (editor) {
            that.editor = editor
            function cPin () {
              that.createPin(editor.selection.getContent())
            }
            editor.addButton('currentselection', {
              text: 'Create Pin',
              tooltip: 'Convert To Pin',
              onclick: cPin
            })
          }
        }
        this.live = true
        that.listenNotes()
      },
      listenNotes () {
        let that = this
        this.$store.dispatch('listenNotes', this.views.active_project).then((response) => {
          if (that.views.active_notes) {
            that.selectedNotes = that.notes[that.views.active_notes].content
          }
        })
      },
      stopProjectNotes (key) {
        // firebase.database().ref('projects/' + key + '/project_notes').off()
      },
      updateNotes () {
        var that = this
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function () {
          that.$store.dispatch('updateNotesContent', {
            project: that.views.active_project,
            notes: that.views.active_notes,
            content: that.selectedNotes
          })
        }, 500)
      },
      createPin (content) {
        this.$store.dispatch('createUserPin', content)
      }
    },
    computed: mapGetters({
      user: 'user',
      notes: 'notes',
      views: 'views'
    }),
    mounted () {
      this.resetNotes()
    },
    beforeDestroy () {
      this.live = false
      this.$store.dispatch('stopNotes', this.views.active_project)
      // this.stopProjectNotes(this.user.views.active_project)
      // this.stopProjectNotes(this.user.views.previous_project)
    },
    data () {
      return {
        init: {},
        live: false,
        timeout: '',
        editor: null,
        selectedNotes: null
      }
    },
    watch: {
      'views.active_notes': function () {
        console.log('changed active notes!')
      },
      'notes': function () {
        if (this.views.active_notes) {
          this.selectedNotes = this.notes[this.views.active_notes].content
        }
      },
      'selectedNotes': function () {
        this.updateNotes()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
.editor-container {
  width:auto;
  height:100%;
  padding:20px;
}
.notes-view{
  // min-width:33%;
  width:100%;
  height:100%;
  background-color:white;
  border-right:1px solid #cacaca;
  z-index:2;
  .note-title {
    color:#cacaca;
    border-bottom:1px solid #cacaca;
  }
  .editor-container {
    height:100%;
    width:100%;
    #editor {
      width:100%;
      height:100%;
      outline:none;
    }
  }
}
</style>