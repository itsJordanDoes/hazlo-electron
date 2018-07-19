<template>
  <div class="project-feed">
    <div class="no-project" @click="$router.push({path:'/create-project'})">
      Create A Project
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'workspace',
    components: { },
    methods: { },
    computed: mapGetters({ }),
    mounted () { },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.project-feed {
  display:flex;
  justify-content: center;
  align-items:center;
  .no-project {
    border-radius:10px;
    border:5px #ddd dashed;
    width:75%;
    height:200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:26px;
    font-weight:bold;
    color:#ddd;
    cursor:pointer;
  }
}
</style>