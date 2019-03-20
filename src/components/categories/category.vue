<template>
  <section class="s-content">
    <div class="row masonry-wrap">
      <div class="masonry">

      <div class="s-content__header col-full">
        <h1 class="s-content__header-title">
          {{ cat }}
        </h1>
      </div>
      <!-- end s-content__header -->

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
import globalAxios from 'axios'
import posting from '../homepage/post.vue'
  
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
      this.fetchBlogPosts();
  },
  methods: {
    fetchBlogPosts() {
      globalAxios.get('blog-posts.json')
        .then(res => {
            const results = res.data
            // console.log('category results');
            // console.dir(results);
            let matchingPostsArray = []
            for (let i = 0; i < results.length; i++){
              if (results[i] != null) {
                for (let ii = 0; ii < results[i].tags.length; ii++){
                  if (results[i].tags[ii]){
                    // console.log(this.cat + ' is maybe ' + results[i].tags[ii].toLowerCase())
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
    sortPosts() {
      this.sortedPosts = this.blogPosts.sort(compare)
    }
  },
  components: {
    'appPost': posting
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