<template>
  <div class="text-editor">
    <div contentEditable="true" id="text-editor" @input="update()"></div>
  </div>
</template>

<script>
  export default {
    name: 'content-editor',
    components: { },
    methods: {
      update () {
        this.$emit('update', document.getElementById('text-editor').innerHTML)
      }
    },
    mounted () {
      var that = this
      this.content.forEach(function (a) {
        that.htmlString += a.html
      })
      document.getElementById('text-editor').innerHTML = this.htmlString
    },
    data () {
      return {
        htmlString: ''
      }
    },
    props: ['content']
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