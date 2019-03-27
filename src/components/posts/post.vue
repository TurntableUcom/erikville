<template>
  <section class="s-content s-content--narrow s-content--no-padding-bottom">

    <article class="row">

      <div class="s-content__header col-full">
        <h1 class="s-content__header-title">{{ articleTitle }}</h1>
        <ul class="s-content__header-meta">
          <li class="date">{{ articleDate }}</li>
          <li class="cat">
            <span v-if="articleTags.length > 0">In</span>
            <template v-for="tag in articleTags">
              <router-link :to="'/category/' + tag.toLowerCase()">&nbsp;{{ tag }}</router-link>
            </template>
          </li>
        </ul>
      </div>
      <div class="col-full s-content__main" v-html="articleBody"></div>
    </article>

    <!-- comments
        ================================================== -->
    <div class="comments-wrap">

      <div id="comments" class="row">
        <div class="col-full">

          <h3 class="h2">{{ articleComments.length }} Comment<span v-if="articleComments.length != 1">s</span></h3>

          <!-- commentlist -->
          <ol class="commentlist">
            <app-comment v-if="cmnt!=null" v-for="cmnt in articleComments"  :key="cmnt.id"
              :commentAuthor="cmnt.author"
              :commentDate="cmnt.date"
              :commentBody="cmnt.comment"></app-comment>
          </ol>
          <!-- end commentlist -->

          <!-- respond
                    ================================================== -->
          <div class="respond" v-if="authenticated">
            <div v-if="!this.commentPosted">
              <h3 class="h2">Add Comment</h3>

              <form @submit.prevent="submitComment">
                <fieldset>

                  <div class="form-field">
                    <input name="cName" type="text" id="cName" class="full-width" placeholder="Your Name" v-model="commentName" :disabled="disableFields" />
                  </div>

                  <div class="form-field">
                    <input name="cEmail" type="text" id="cEmail" class="full-width" placeholder="Your Email" v-model="commentEmail" :disabled="disableFields" />
                  </div>

                  <div class="message form-field">
                    <textarea name="cMessage" id="cMessage" class="full-width" placeholder="Your Message" v-model="commentMessage"></textarea>
                  </div>

                  <button type="submit" class="submit btn--primary btn--large full-width">Submit</button>

                </fieldset>
              </form>
              <!-- end form -->
            </div>
          </div>

          <div class="respond" v-else>
            <p>Please <router-link to="/signin">Log In</router-link> or <router-link to="/signup">Regsiter</router-link> to Leave Comments</p>
          </div>
          <!-- end respond -->
        </div>
        <!-- end col-full -->
      </div>
      <!-- end row comments -->
    </div>
    <!-- end comments-wrap -->
  </section>
  <!-- s-content -->
</template>

<script>
  import Vuex from 'vuex'
  import globalAxios from 'axios'
  import comment from './comment.vue'
  import { db, auth } from '../../firebase';

  export default {
    data () {
      return { 
        articleTitle: '',
        articleBody: '',
        articleDate: '',
        articleTags: [],
        articleComments: [],
        postid: this.$route.params.postid,
        commentName: '',
        commentEmail: '',
        commentMessage: '',
        disableFields: false,
        commentPosted: false
      }
    },
    computed: {
      authenticated () {
        return this.$store.getters.isAuthenticated
      },
      loggedInUser(){
        return this.$store.getters.user
      }
    },
    methods: {
      fetchBlogPost() {
        let tempTags = []
        let tempComments = []
        globalAxios.get('blog-posts/' + this.postid + '.json')
        // globalAxios.get('blog-posts.json')
          .then(res => {
            const article = res.data;
            this.articleTitle = article.title
            this.articleBody = article.body
            this.articleDate = article.date
            for (let tag in article.tags){
              const post = article.tags[tag]
              tempTags.push(post)
            }
            for (let comment in article.comments){
              let comm = article.comments[comment]
              tempComments.push(comm)
            }
          })
          .catch(error => console.log(error))
          this.articleTags = tempTags
          this.articleComments = tempComments
      },
      submitComment() {
        var d = new Date();
        var user = auth.currentUser
        if (user){
          user.getIdToken()
          .then(res => {
            let comment = {
              author: this.commentName,
              comment: this.commentMessage,
              email: this.commentEmail,
              date: (d.getMonth()+ 1) + '/' + d.getDate() + '/' + d.getFullYear()
            }
            globalAxios.post('blog-posts/' + this.postid + '/comments.json?auth=' + res, comment)
              .then(res => {
                console.log(res)
                this.articleComments.push(comment)
                this.commentName = ''
                this.commentMessage = ''
                this.commentEmail = ''
                this.commentPosted = true
              })
              .catch(error => console.log(error))
            })
          .catch(error => console.log(error))
        } else {
          // TODO handle this error, display something?
        }
      }
    },
    created () {
        this.fetchBlogPost();
    },
    updated () {
        if (this.authenticated){
          if (this.loggedInUser !== null){
            this.commentName = this.loggedInUser.name
            this.commentEmail = this.loggedInUser.email
            this.disableFields = true
          }
        }
    },
    components: {
      'appComment': comment
    }
  }
</script>

<style scoped>
  input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea, select {
    background-color: transparent!important
  }

  .respond #cName, .respond #cEmail { 
    padding: .2rem 0
  }
  #comments .respond form {
    padding-top:1rem;
  }
  #comments .respond form .form-field {
    margin-bottom:1.8rem;
  }
</style>