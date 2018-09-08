<template>
  <div class="container">
    <div class="title">Chats</div>
    <ul class="side-bar-list">
      <li>Chat Category 1</li>
      <hr>
      <li class="link">
        <font-awesome-icon :icon="['far', 'hashtag']" />
        chatroom one
      </li>
      <li class="link">
        <font-awesome-icon :icon="['far', 'hashtag']" />
        chatroom two
      </li>
      <li>Chat Category 2</li>
      <hr>
      <li class="link">
        <font-awesome-icon :icon="['far', 'hashtag']" />
        chatroom one
      </li>
      <li class="link">
        <font-awesome-icon :icon="['far', 'hashtag']" />
        chatroom two
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'projects-nav',
    components: { },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
    },
    mounted () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../../sass/settings.scss";
$spacing: 10px;
$btn-color:$dark-blue;
$font-color:white;
.title {
  font-weight:600;
  font-size:1.4em;
  text-align: center;
  width:100%;
  margin-bottom:$spacing;
  margin-top:$spacing;
}
.create {
  background-color: $btn-color;
  margin:$spacing;
  padding:$spacing;
  border-radius:5px;
  color:$font-color;
  cursor:pointer;
  display:flex;
  justify-content: center;
  align-items: center;
}
.create:hover {
  background-color:darken($btn-color, 5%);
}
.side-bar-list {
  overflow:scroll;
  height:calc(100% - 70px);
  // margin:$spacing;
  .link {
    padding:$spacing;
    border-left:4px solid transparent;
  }
  .link:hover {
    background:#f8f8f8;
  }
  .router-link-active {
    color:$orange;
    border-color:$orange;
  }
}
</style>