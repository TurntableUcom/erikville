<template>
  <section class="s-content">

    <div class="s-content__header col-full">
      <h1 class="s-content__header-title">{{ cat }}</h1>
    </div>

    <div class="row masonry-wrap">
      <div class="masonry">

      <app-post v-for="posting in sortedPosts" :key="posting.id"
                :title="posting.title"
                :date="posting.date"
                :image="posting.image"
                :body="posting.body"
                :tags="posting.tags"
                :id="posting.id"></app-post>

      </div>
    </div>
  </section>
  <!-- s-content -->
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
// import globalAxios from 'axios'
import posting from '../homepage/post.vue'
import { db } from '../../firebase';
  
export default {
  data () {
      return {
        cat: this.$route.params.catname,
        blogPosts: [],
        sortedPosts: []
      }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  created () {
      // this.fetchBlogPosts();
  },
  methods: {
    /*
    fetchBlogPosts() {
      globalAxios.get('blog-posts.json') // TODO, UPDATE TO USE VUEFIRE
        .then(res => {
            const results = res.data
            // console.log('category results');
            console.dir(typeof results);  // THIS IS NOW AN OBJECT FOR SOME REASON, SO HAS NO LENGTH PROPERTY, SO NONE OF THE BELOW WORKS ANY LONGER
            let matchingPostsArray = []
            for (let i = 0; i < results.length; i++){
              console.log('null?', results[i] != null)
              if (results[i] != null) {
                for (let ii = 0; ii < results[i].tags.length; ii++){
                  if (results[i].tags[ii]){
                    console.log(this.cat + ' is maybe ' + results[i].tags[ii].toLowerCase())
                    if (results[i].tags[ii].toLowerCase() == this.cat) matchingPostsArray.push(results[i])
                  }
                }
              }
            }
            this.blogPosts = matchingPostsArray
            this.sortPosts()
        })
        .catch(error => console.log(error))
    },
    */
    sortPosts() {
      this.sortedPosts = this.blogPosts.sort(compare)
    }
  },
  components: {
    'appPost': posting
  },
  firebase: {
    blogPosts: {
      source: db.ref('blog-posts').orderByChild('date'),
      readyCallback(snapshot) {

        let matchingPostsArray = []
        for (let i = 0; i < this.blogPosts.length; i++){
          if (this.blogPosts[i] != null) {
            for (let ii = 0; ii < this.blogPosts[i].tags.length; ii++){
              if (this.blogPosts[i].tags[ii]){
                // console.log(this.cat + ' is maybe ' + this.blogPosts[i].tags[ii].toLowerCase())
                if (this.blogPosts[i].tags[ii].toLowerCase() == this.cat) matchingPostsArray.push(this.blogPosts[i])
              }
            }
          }
        }
        this.blogPosts = matchingPostsArray

        for (let idx in this.blogPosts) { // add key id to each post
          const post = this.blogPosts[idx]
          const dbkey = post['.key']
          post.id = dbkey
          this.blogPosts[idx] = post
        }
        this.sortPosts()
      },
      cancelCallback(err) {
        console.error(err.message);
      }
    }
  }
}

function compare(a, b) {
    if (a.date > b.date)
        return -1;
    if (a.date < b.date)
        return 1;
    return 0;
}
</script>

<style scoped>
  .s-content__header-title {text-transform:capitalize}
</style>