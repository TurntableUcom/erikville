<template>
  <div id="admin">

    <div class="success" id="newPostSuccess" v-if="newPostSuccess">New Post Posted, Poster!!</div>

    <button @click="addPost" id="addNew">Add New Post</button>
    <div v-for="post in blogPosts" :key="post.id">
      <button @click="editPost($event, post.id)" class="editPost">Edit</button>
      &nbsp;
      <span class="postDate">[ {{ post.date }}</span>
      <span class="ft">.: {{ post.featuredOrder }} :.</span><span class="postDate"> ]</span>
      &nbsp;
      {{ post.title }}
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import { db } from '../../firebase'

  export default {
    data () {
      return {
        newPostSuccess: false,
        blogPosts: []
      }
    },
    methods: {
      addPost () {
        router.push('/admin/add-post')
      },
      editPost(event, postid) {
        router.push('/admin/edit-post/' + postid)
      }
    },
    created() {
      if (this.$route.query.post == 'added'){
        this.newPostSuccess = true
        window.setTimeout(() => $('#newPostSuccess').fadeOut(), 3600)
        window.setTimeout(() => this.newPostSuccess = false, 3601)
      }
    },
    firebase: {
      blogPosts: {
        source: db.ref('blog-posts').orderByChild('date'),
        readyCallback(snapshot) {
          for (let idx in this.blogPosts) { // add key id to each post
            const post = this.blogPosts[idx]
            const dbkey = post['.key']
            post.id = dbkey
            this.blogPosts[idx] = post
          }
          this.blogPosts = this.blogPosts.reverse()
        },
        cancelCallback(err) {
          console.error(err);
        }
      }
    }
  }
</script>

<style lang="scss">
  #admin {
    padding:35px 20px 16px;
    width:100%;
    max-width:1150px;
    margin:auto;
    position:relative;
    
    .form {
      width:100%;
    }

    button#addNew {
      position:absolute;right:20px;top:38px
    }

    .editPost {
      float:left;padding: 0 1.8rem;
      height:3.2rem;line-height:3rem;
    }
    .postDate, .ft {
      font-size:1.3rem;color:#aaa
    }
    .ft {
      font-weight:bold;
    }
  }
</style>