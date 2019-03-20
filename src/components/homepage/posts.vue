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
import globalAxios from 'axios'
import posting from './post.vue'
import { db } from '../../firebase';
  
export default {
  data () {
      return {
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
    // this.fetchBlogPosts(); // USING VUEFIRE NOW INSTEAD OF AXIOS FOR FETCHING
    // this.sortPosts()
  },
  firebase: {
    blogPosts: {
      source: db.ref('blog-posts'), //.orderByChild('featured').equalTo('n'), //ADD BACK IN AFTER FIXING MASONRY
      readyCallback(snapshot) {
          // console.log('snapshot')
          // console.log(snapshot)
          this.sortPosts()
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
    sortPosts() {
      this.sortedPosts = this.blogPosts.sort(compare)
      // console.dir(this.sortedPosts)
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