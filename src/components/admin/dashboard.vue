<template>
  <div id="admin">

    <div class="success" id="newPostSuccess" v-if="newPostSuccess">New Post Posted, Poster!!</div>

    <button @click="addPost">Add New Post</button>
    <br/>
    <hr/>
    <br/>
    <p>etc. etc. list posts with edit buttons</p>
  </div>
</template>

<script>
  import router from '../../router'

  export default {
    data () {
      return {
        newPostSuccess: false
      }
    },
    methods: {
      addPost () {
        router.push('/admin/add-post')
      }
    },
    created() {
      if (this.$route.query.post == 'added'){
        this.newPostSuccess = true
        window.setTimeout(() => $('#newPostSuccess').fadeOut(), 4000)
        window.setTimeout(() => this.newPostSuccess = false, 4401)
      }
    }
  }
</script>

<style>
  #admin {
    padding:15px;
    width:100%;
    max-width:1000px;
    margin:auto;
  }
  
  #admin .form {
    width:100%;
  }
</style>