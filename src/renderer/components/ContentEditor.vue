<template>
  <div class="editor">
    <label>Editor</label>
    <!-- <textarea v-model="content" id="text-area" autocomplete="on"></textarea> -->
    <!-- <button @click="apply()">Log Nodes</button> -->
    <text-editor :content="content" @update="update($event)"></text-editor>
    <pre>
      {{ content }}
    </pre>
  </div>
</template>

<script>
  import TextEditor from './TextEditor'
  export default {
    name: 'content-editor',
    components: { TextEditor },
    methods: {
      update (event) {
        // console.log(event)
        // var nodes = document.getElementById('text-editor').childNodes
        // console.log(nodes)
        // nodes.forEach(function (node) {
        //   node.tagName
        // })
      },
      log () {
        // var nodes = document.getElementById('text-editor').childNodes
        // console.log(nodes)
      },
      apply () {
        // var nodes = document.getElementById('text-editor').childNodes
        // nodes.forEach(function (node) {
        //   console.log(node)
        //   // if (!node.contains('<br>')) {
        //   //   node.style = 'border:1px solid red;'
        //   //   console.log(node.innerHtml)
        //   // }
        // })
      }
    },
    computed: {

    },
    mounted () {
      // var that = this
      // this.loop.forEach(function (a) {
      //   that.content += a.html
      // })
      // console.log(this.content)
    },
    data () {
      return {
        content: [
          {
            type: 'red',
            html: '<div>What?</div>'
          },
          {
            type: 'blue',
            html: '<ol><li>what</li><li>two</li></ol>'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.editor {
  display:flex;
  flex-direction: column;
  height:100%;
  width:100%;
  #editor-area {
    width:100%;
    height:100%;
  }
}
</style>