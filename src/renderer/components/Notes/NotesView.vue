<template>
  <div class="notes-container">
    <div class="notes-view" v-if="$route.params.note_id">
      <div class="notes-menu">
        <div class="notes-title">Notes Title</div>
      </div>
      <editor v-if="live" id="editor" inline :init="init" api-key="ipdkwew8kl6935yqdqe0z5bbflvbxi0k9p79od81lfpwf1zy" v-model="notes"></editor>
    </div>
    <div class="blank-state" v-else>
      Select a note or create one!
    </div>
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import { mapGetters } from 'vuex'
  const that = this
  export default {
    name: '',
    components: { Editor },
    data () {
      return {
        live: false,
        init: {},
        notes: ''
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      intilize () {
        this.live = false
        this.init = {
          selector: '#notes-menu',
          branding: false,
          menubar: false,
          toolbar: true,
          inline: false,
          theme: 'inlite',
          plugins: [
            'lists'
          ],
          selection_toolbar: '| h2 bold italic bullist numlist currentselection |',
          setup: function (editor) {
            that.editor = editor
            function create () {
              console.log('create')
            }
            editor.addButton('currentselection', {
              text: 'Create Card',
              tooltip: 'Create Card',
              onclick: create
            })
          }
        }
        this.live = true
      }
    },
    mounted () {
      this.intilize()
    },
    beforeDestroy () {
      this.live = false
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
$border:1px solid #cacaca;
$spacing:20px;
$menu-height:50px;
.notes-container {
  background-color:white;
  border-left:$border;
  .notes-view {
    height:100%;
    width:100%;
    .notes-menu {
      position:fixed;
      width: 100%;
      height: $menu-height;
      border-bottom:$border;
      z-index:1;
      background:white;
      .notes-title {
        font-weight:600;
        font-size:24px;
        // margin-bottom:$spacing;
        color:#cacaca;
      }
    }
    #editor {
      padding-left:$spacing;
      padding-top:$menu-height + $spacing;
      width:calc(100% - #{$spacing * 2});
      height:calc(100% - #{$spacing} - #{$menu-height});
      overflow:scroll;
      // padding:$spacing;
    }
  }
}
</style>