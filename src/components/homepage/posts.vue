<template>
    <!-- s-content
    ================================================== -->
    <section class="s-content">

      <div class="row masonry-wrap">
        <div class="masonry">

          <div class="grid-sizer"></div>

          <app-post v-for="posting in sortedPosts"
            :key="posting.id"
            :title="posting.title"
            :date="posting.date"
            :image="posting.image"
            :body="posting.body"
            :tags="posting.tags"
            :id="posting.id"></app-post>

        </div>
        <!-- end masonry -->
      </div>
      <!-- end masonry-wrap -->

      <!--
      <div class="row">
        <div class="col-full">
          <nav class="pgn">
            <ul>
              <li>
                <a class="pgn__prev" href="#0">Prev</a>
              </li>
              <li>
                <a class="pgn__num" href="#0">1</a>
              </li>
              <li>
                <span class="pgn__num current">2</span>
              </li>
              <li>
                <a class="pgn__num" href="#0">3</a>
              </li>
              <li>
                <a class="pgn__num" href="#0">4</a>
              </li>
              <li>
                <a class="pgn__num" href="#0">5</a>
              </li>
              <li>
                <span class="pgn__num dots">…</span>
              </li>
              <li>
                <a class="pgn__num" href="#0">8</a>
              </li>
              <li>
                <a class="pgn__next" href="#0">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      -->
      
    </section>
    <!-- s-content -->
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
// import globalAxios from 'axios'
import posting from './post.vue'
import { addKeysToArray, sortDesc } from '../../mixins/postHelpers'
import { db } from '../../firebase'
  
export default {
  data () {
      return {
        blogPosts: [],
        sortedPosts: []
      }
  },
  created () {
    // this.fetchBlogPosts(); // USING VUEFIRE NOW INSTEAD OF AXIOS FOR FETCHING
    // this.sortPosts()
  },
  firebase: {
    blogPosts: {
      source: db.ref('blog-posts').orderByChild('featured').equalTo('n'),
      readyCallback(snapshot) {
        /*
        for (let idx in this.blogPosts) { // add key id to each post
          const post = this.blogPosts[idx]
          const dbkey = post['.key']
          post.id = dbkey
          this.blogPosts[idx] = post
        }*/
        // let posts = addKeysToArray(this.blogPosts)
        this.sortedPosts = this.blogPosts.sort(sortDesc)
      },
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods: {
    /*
    fetchBlogPosts() {
      globalAxios.get('blog-posts.json')
        .then(res => {
            const results = res.data
            // console.log('results')
            // console.log(results)
            let nonFeaturedPostsArray = []
            for (let i = 0; i < results.length; i++){
              if (results[i] != null) {
                if (results[i].featured == 'n') nonFeaturedPostsArray.push(results[i])
              }
            }
            // console.log('nonFeaturedPostsArray')
            // console.log(nonFeaturedPostsArray)
            this.blogPosts = nonFeaturedPostsArray
            this.sortPosts()
        })
        .catch(error => console.log(error))
    },
    */
  },
  components: {
    'appPost': posting
  }
}

/*
function sortDesc(a, b) {
  if (a.date > b.date)
      return -1;
  if (a.date < b.date)
      return 1;
  return 0;
}
*/
</script>