<template>
  <section class="s-pageheader s-pageheader--home">
    <header class="header">
      <div class="header__content row">

        <div class="header__logo">
          <router-link to="/">
            <img src="/assets/images/logo.svg" alt="Homepage" />
          </router-link>
        </div>

        <!--
        <ul class="header__social" style="top:0">
          <li>
            hp: {{ isOnHomepage }}
          </li>
        </ul>
        -->
        
        <ul class="header__social">
          <li v-if="!auth">
            <router-link to="/signin" exact>Sign In</router-link>
          </li>
          <li v-if="!auth">|</li>
          <li v-if="!auth">
            <router-link to="/signup" exact>Register</router-link>
          </li>
          <li v-if="auth">
            <a @click="onLogout" style="cursor:pointer">Log Out</a>
          </li>
          <li v-if="isAdmin">|</li>
          <li v-if="isAdmin">
            <router-link to="/admin">Admin Dashboard</router-link>
          </li>
        </ul>
        <!-- end header__social -->

        <a class="header__search-trigger" href="#0"></a>
        <div class="header__search">
          <form role="search" method="get" class="header__search-form" action="#">
            <label>
              <span class="hide-content">Search for:</span>
              <input type="search" class="search-field" placeholder="Type Keywords" value="" name="s" title="Search for:" autocomplete="off" />
            </label>
            <input type="submit" class="search-submit" value="Search" />
          </form>
          <a href="#0" title="Close Search" class="header__overlay-close">Close</a>
        </div>
        <!-- end header__search -->

        <a class="header__toggle-menu" href="#0" title="Menu">
          <span>Menu</span>
        </a>
        <nav class="header__nav-wrap">
          <h2 class="header__nav-heading h6">Site Navigation</h2>
          <ul class="header__nav">
            <router-link tag="li" to="/" exact><a href="/">Home</a></router-link>
            <li class="has-children">
              <router-link to="#">Categories</router-link>
              <ul class="sub-menu" v-if="blogCategories">
                <li v-for="category in blogCategories" :key="category['.key']"><router-link :to="'/category/' + category.name.toLowerCase()">{{ category.name }}</router-link></li>
              </ul>
            </li>
            <!--
            <li class="has-children">
              <a href="#0">Blog</a>
              <ul class="sub-menu">
                <li>
                  <router-link to="/post" exact>Video Post Example</router-link>
                </li>
                <li v-for="post in blogPosts" :key="post.id"><router-link :to="'/post/' + post.id + '/' + post.title.replace(/ /g,'-').toLowerCase()">{{ post.title }}</router-link></li>
              </ul>
            </li>
            -->
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li>
              <router-link to="/contact">Contact</router-link>
            </li>
          </ul>
          <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Close</a>
        </nav>
      </div>
    </header>
    <!-- end header -->

    <div class="pageheader-content row" v-if="isOnHomepage && sortedFeaturedPosts.length > 0">
      <div class="col-full">

        <div class="featured">

          <div class="featured__column featured__column--big" v-if="this.sortedFeaturedPosts[0]">
            <div class="entry" :style="'background-image:url(/assets/images/thumbs/featured/featured-' + this.sortedFeaturedPosts[0].image + '.jpg)'">

              <div class="entry__content">
                <span class="entry__category">
                  <a href="#0">{{ this.sortedFeaturedPosts && sortedFeaturedPosts[0].tags[0] }}</a>
                </span>

                <h1>
                  <router-link :to="'/post/' + this.sortedFeaturedPosts[0].id + '/' + this.sortedFeaturedPosts[0].title.replace(/ /g,'-').toLowerCase()">{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[0].title }}</router-link>
                </h1>

                <div class="entry__info">
                  <ul class="entry__meta" style="margin-left:0">
                    <li>{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[0].date }}</li>
                  </ul>
                </div>
              </div>
              <!-- end entry__content -->

            </div>
            <!-- end entry -->
          </div>
          <!-- end featured__big -->

          <div class="featured__column featured__column--small">

            <div class="entry" :style="'background-image:url(/assets/images/thumbs/featured/featured-' + this.sortedFeaturedPosts[1].image + '.jpg)'" v-if="this.sortedFeaturedPosts[1]">

              <div class="entry__content">
                <span class="entry__category">
                  <a href="#0" style="cursort:arrow">{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[1].tags[0] }}</a>
                </span>

                <h1>
                  <router-link :to="'/post/' + this.sortedFeaturedPosts[1].id + '/' + this.sortedFeaturedPosts[1].title.replace(/ /g,'-').toLowerCase()">{{ this.sortedFeaturedPosts[1].title }}</router-link>
                </h1>

                <div class="entry__info">
                  <ul class="entry__meta">
                    <li>{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[1].date }}</li>
                  </ul>
                </div>
              </div>
              <!-- end entry__content -->

            </div>
            <!-- end entry -->

            <div class="entry" :style="'background-image:url(/assets/images/thumbs/featured/featured-' + this.sortedFeaturedPosts[2].image + '.jpg)'" v-if="this.sortedFeaturedPosts[2]">

              <div class="entry__content">
                <span class="entry__category">
                  <a href="#0" style="cursort:arrow">{{ this.sortedFeaturedPosts && sortedFeaturedPosts[2].tags[0] }}</a>
                </span>

                <h1>
                  <router-link :to="'/post/' + this.sortedFeaturedPosts[2].id + '/' + this.sortedFeaturedPosts[2].title.replace(/ /g,'-').toLowerCase()">{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[2].title }}</router-link>
                </h1>

                <div class="entry__info">
                  <ul class="entry__meta">
                    <li>{{ this.sortedFeaturedPosts && this.sortedFeaturedPosts[2].date }}</li>
                  </ul>
                </div>
              </div>
              <!-- end entry__content -->

            </div>
            <!-- end entry -->

          </div>
          <!-- end featured__small -->
        </div>
        <!-- end featured -->

      </div>
      <!-- end col-full -->
    </div>
    <!-- end pageheader-content row -->

    <!-- header -->
  </section>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import globalAxios from 'axios'
import { db } from '../../firebase';
  
export default {
  data () {
      return {
        blogCategories: [],
        // blogPosts: [],
        featuredPosts: [],
        sortedFeaturedPosts: []
      }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    isOnHomepage () {
      return this.$store.getters.onHomepage
    },
    isAdmin () {
      return this.$store.getters.loggedInAsAdmin
    }
  },
  created () {
      // this.fetchBlogCategories();
      // this.fetchBlogPosts(); VUEFIRE IS HANDLING THIS NOW
      // vm.$bindAsArray('featuredPosts', db.ref('blog-posts').orderByChild('featured').equalTo('y'), null, () => this.sortFeaturedPosts())

      // AFTER LOGGIN IN OR REGISETRING AND BEING REDIRECTED, SORTED WAS EMPTY BUT POSTS EXISTED, DUNNO WHY
      if (this.sortedFeaturedPosts.length < 1) this.sortedFeaturedPosts = this.featuredPosts
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    },
    /* fetchBlogCategories() {
      globalAxios.get('blog-categories.json')
        .then(res => {
            const results = res.data
            let resultsArray = []
            for (let i = 0; i < results.length; i++){
              if (results[i] != null) {
                resultsArray.push(results[i])
              }
            }
            this.blogCategories = resultsArray
        })
        .catch(error => console.log(error))
    },
    fetchBlogPosts() {
      globalAxios.get('blog-posts.json')
        .then(res => {
            const results = res.data
            let postsArray = []
            let featuredPostsArray = []
            let tagsArray = []
            for (let i = 0; i < results.length; i++){
              if (results[i] != null) {
                postsArray.push(results[i])
                if (results[i].featured != 'n') featuredPostsArray.push(results[i])
                for (let ii = 0; ii < results[i].tags.length; ii++) {
                  if (!tagsArray.includes(results[i].tags[ii])) tagsArray.push(results[i].tags[ii])
                }
              }
            }
            this.blogCategories = tagsArray
            this.blogPosts = postsArray
            this.featuredPosts = featuredPostsArray
            if (this.featuredPosts) this.sortFeaturedPosts()
        })
        .catch(error => console.log(error))
    },
    */
    sortFeaturedPosts() {
      if (this.isOnHomepage) this.sortedFeaturedPosts = this.featuredPosts.sort(compare)
    }
  },
  firebase: {
    featuredPosts: {
      source: db.ref('blog-posts').orderByChild('featured').equalTo('y'),
      readyCallback(snapshot) {
        for (let idx in this.featuredPosts) { // add key id to each post
          const post = this.featuredPosts[idx]
          const dbkey = post['.key']
          post.id = dbkey
          this.featuredPosts[idx] = post
        }
        this.sortFeaturedPosts()
        // console.log('featured snapshot')
        // console.log(this.featuredPosts)
      },
      cancelCallback(err) {
        console.error(err);
      }
    },
    blogCategories: {
      source: db.ref('blog-categories').orderByChild('order'),
      readyCallback(snapshot) {
          // console.log('categories snapshot')
          // console.log(this.blogCategories)
      },
      cancelCallback(err) {
        console.error(err);
      }
    }
  }
}

function compare(a, b) {
    if (a.featuredOrder < b.featuredOrder)
        return -1;
    if (a.featuredOrder > b.featuredOrder)
        return 1;
    return 0;
}
</script>

<style scoped>
  .header__social li {
    font-family: metropolis-semibold,sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 21px;
  }
  .router-link-active {
    font-weight:bold;color:white;
  }
  .header__nav-wrap .router-link-active, .header__nav-wrap .router-link-active a {
    text-decoration:none;font-weight:normal;
    color:white;
    opacity:1;
    outline:0
  }
</style>