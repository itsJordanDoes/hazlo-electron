<template>
  <div class="create-project">
    <div class="input-group">
      <label for="project-name">Project Title</label>
      <input v-model="title" placeholder="Your Project Name" name="project-name" type="text">
    </div>
    <button class="create-btn" @click="addProject()">Create Project</button>
  </div>
</template>

<script>
  export default {
    name: 'create-project',
    components: { },
    methods: {
      addProject () {
        this.$store.dispatch('addProject', {
          label: this.title
        })
        var i = this.$store.state.data.projects.length - 1
        this.$store.dispatch('selectProject', i)
        this.$router.push({path: '/workspace'})
      }
    },
    computed: {

    },
    mounted () {

    },
    data () {
      return {
        title: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/settings.scss";
.create-project {
width:auto;
display:flex;
justify-content: center;
align-items:center;
flex-direction:column !important;
  .input-group {
    display:flex;
    flex-direction: column;
    width:auto;
    label {
      font-size:20px;
      margin-bottom:15px;
    }
    input {
      font-size:20px;
      border-radius:5px;
      padding:10px;
      width:auto;
      border:1px solid #ddd;
    }
  }
  .create-btn {
    background-color:rgb(208, 231, 0);
    font-size:26px;
    padding:20px;
    border-radius:5px;
    border:none;
    margin-top:20px;
    font-weight:bold;
    color:white;
    cursor:pointer;
  }
}
</style>