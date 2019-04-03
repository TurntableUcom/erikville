<template>
  <section class="s-content" v-bind:class="{ noresults: hasSearchResults }">

    <div class="s-content__header col-full">
      <h1 class="s-content__header-title">{{ searchTerm }}</h1>
    </div>

    <div class="row masonry-wrap">
      <div class="masonry">

      <div v-if="!this.hasSearchResults" style="text-align:center">Sorry, we did not find any posts containing that term.</div>

      <app-post v-for="posting in sortedPosts" :key="posting.id"
                :title="posting.title"
                :date="posting.date"
                :image="posting.image"
                :body="posting.body"
                :tags="posting.tags"
                :id="posting.id"></app-post>

        <div class="clear"></div>

      </div>
    </div>
  </section>

</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import posting from '../homepage/post.vue'
import { db } from '../../firebase'
  
export default {
  data () {
      return {
        searchTerm: this.$route.params.searchTerm,
        blogPosts: [],
        sortedPosts: []
      }
  },
  computed: {
    hasSearchResults (){
      if (this.blogPosts){
        return this.blogPosts.length > 0
      } else {
        return false
      }
    }
  },
  methods: {
    
  },
  components: {
    'appPost': posting
  },
  firebase: {
    blogPosts: {
      source: db.ref('blog-posts').orderByChild('date'),
      readyCallback(snapshot) {
        let matchingPostsArray = []
        if (this.blogPosts){
          for (let i = 0; i < this.blogPosts.length; i++){
            if (this.blogPosts[i] != null) {
              for (let ii = 0; ii < this.blogPosts[i].tags.length; ii++){
                if (this.blogPosts[i].tags[ii]){
                  if (this.blogPosts[i].tags[ii].toLowerCase() == this.searchTerm.toLowerCase()) matchingPostsArray.push(this.blogPosts[i])
                }
              }
              if (this.blogPosts[i].title.includes(this.searchTerm)) matchingPostsArray.push(this.blogPosts[i])
              if (this.blogPosts[i].body.includes(this.searchTerm)) matchingPostsArray.push(this.blogPosts[i])
            }
          }
          this.blogPosts = matchingPostsArray
          this.sortedPosts = this.blogPosts.sort(compare)
        }
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

  .noresults {padding-bottom:50px}
</style>