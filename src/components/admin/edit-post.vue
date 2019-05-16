<template>
  <div id="admin">
    <div class="form">

      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.title.$error}">
          <label for="title">Post Title</label>
          <input type="text" id="title" v-model="title" @blur="$v.title.$touch()" />
          <p v-if="$v.title.$error" class="validation">You must provide a title for the blog post.</p>
        </div>
        <div class="input" :class="{invalid: $v.body.$error}">
          <label for="body">Blog Post Body</label>
          <textarea id="body" v-model="body" @blur="$v.body.$touch()" />
        </div>
        <!--
        <div class="input" :class="{invalid: $v.image.$error}">
          <label for="image">Image</label>
          <file-picker :id="image" :allowMultiple="false" v-on:vfp-file-added="fileAdded">
            <icon></icon>
            <label>Choose a file or drop it here</label>
          </file-picker>
        </div>
        -->
        <div class="input">
          <label for="image">Image Name</label>
          <input type="text" id="image" v-model="image" />
        </div>
        <div class="input tags">
          <label for="tags">Post Tag(s)</label>
          <button @click="addTag" type="button">Add Tag</button>
          <div class="tag-list">
            <div class="input" v-for="(tag, index) in tagz" :key="tag.key">
              <!--<label :for="tag.id">tag #{{ index + 1 }}</label>-->
              <input type="text" :id="tag.key" v-model="tag.value">
              <button @click="deleteTag(tag)" type="button">X</button>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
        <div class="input feat">
          <label for="featured">Featured?</label>
          <select class="input" v-model="featured">
            <option value="n">No</option>
            <option value="y">Yes</option>
          </select>
          <div style="clear:both"></div>
        </div>
        <div class="input featOrder" v-if="featured=='y'">
          <label for="featuredOrder">Featured Order</label>
          <input type="number" id="featuredOrder" v-model="featuredOrder" />
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          &nbsp;
          <button @click="cancelEdit">Cancel Edit</button>
          &nbsp;
          <button @click.prevent="deletePost">Delete This Post</button>
        </div>
        <hr v-if="this.thisPost.comments"/>
        <div class="input comments">
          <template v-for="comment in thisPostComments">
            <table :key="comment.key"><tr><td width="40" style="padding-right:6px">
                <button @click="deleteComment(comment)" type="button">X</button>
              </td><td style="padding-left:6px">
                <strong :key="comment.key">{{ comment.value.author }}</strong> ({{ comment.value.email }}) on <em :key="comment.key">{{ comment.value.date }}</em><br :key="comment.key"/>
                {{ comment.value.comment }}<br :key="comment.key"/><br :key="comment.key"/>
            </td></tr></table>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import globalAxios from 'axios'
  import router from '../../router'
  import { required } from 'vuelidate/lib/validators'
  import filePicker from 'vue-file-picker'
  // import VueScrollTo from 'vue-scrollto'
  import { db, auth } from '../../firebase';
  
  export default {
    data () {
      return {
        title: '',
        body: '',
        postTags: [],
        postComments: [],
        featured: 'n',
        featuredOrder: 0,
        image: '',
        postid: this.$route.params.idofpost,
        postsObj: null,
        thisPost: null,
        thisPostTags: [],
        thisPostComments: []
      }
    },
    computed: {
      tagz () {
        return this.thisPostTags
      }
    },
    methods: {
      onSubmit () {
        var user = auth.currentUser
        if (user){
          //   user.getIdToken()
          //   .then(res => {
          let d = new Date();
          let newPost = {
            title: this.title,
            body: this.body,
            tags: this.thisPostTags.map(tag => tag.value),
            comments: this.thisPostComments.map(comment => comment.value),
            featured: this.featured,
            featuredOrder: this.featuredOrder,
            image: this.image,
            date: (d.getMonth()+ 1) + '/' + d.getDate() + '/' + d.getFullYear()
          }
          // console.log('newPost', newPost)
          
          /*
          globalAxios.put('blog-posts/' + this.postid + '.json?auth=' + res, newPost)
            .then(res => {
              router.push('/admin?post=updated')
            })
            .catch(error => console.log(error))
          })
          .catch(error => console.log(error))
          */

          db.ref('blog-posts').child(this.postid).set(newPost)
          .then(res => {console.log('successful post editation.');router.push('/admin?post=edited')})
          .catch(error => console.log(error.message))
        }
      },
      cancelEdit () {
        router.push('/admin')
      },
      deletePost () {
        try {
          db.ref('blog-posts').child(this.postid).remove()
          router.push('/admin?post=deleted')
        } catch (ex){
          console.log('ex.message', ex.message)
        }
      },
      fileAdded(){
        console.log('this be file yo')
      },
      addTag () {
        const postTag = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.thisPostTags.push(postTag)
      },
      deleteTag (id) {
        id = id.key
        let buhbye = []
        for (let tag of this.thisPostTags){
          console.log('tagd', tag)
          console.log('tagd.key', tag.key)
          if (tag.key != (id + '')) buhbye.push(tag)
        }
        // const bybye = this.thisPostTags.filter(tag => tag !== (id + ''))
        this.thisPostTags = buhbye
        this.onSubmit()
      },
      deleteComment (id) {
        id = id.key
        let buhbye = []
        for (let comm of this.thisPostComments){
          // console.log('tagdc', comm)
          // console.log('tagdc.key', comm.key)
          if (comm.key != (id + '')) buhbye.push(comm)
        }
        this.thisPostComments = buhbye
        this.onSubmit()
      }
    },
    validations: {
      title: {
        required
      },
      body: {
        required
      }
    },
    components: {
      filePicker: filePicker
    },
    firebase: {
      // postsArr: db.ref('blog-posts'), // loopable with v-for
      postsObj: { // can use keys, but v-for doesn't loop
        source: db.ref('blog-posts'),
        asObject: true,
        readyCallback(snapshot) {
          console.log('snapshot', snapshot)
          this.thisPost = this.postsObj[this.postid]
          this.title = this.thisPost.title
          this.body = this.thisPost.body
          this.image = this.thisPost.image
          this.featured = this.thisPost.featured
          this.featuredOrder = this.thisPost.featuredOrder
          this.postTags = this.thisPost.tags
          const thesetags = Object.entries(this.postTags)
          for (let tag of thesetags){
            let newKey = {
              key: tag[0],
              value: tag[1]
            }
            this.thisPostTags.push(newKey)
          }
          this.postTags = this.thisPostTags
          if (this.thisPost.comments){
            this.postComments = this.thisPost.comments
            const thesecomments = Object.entries(this.postComments)
            for (let comm of thesecomments){
              // console.log('comm', comm)
              let newComm = {
                key: comm[0],
                value: comm[1]
              }
              this.thisPostComments.push(newComm)
            }
            this.postComments = this.thisPostComments
          }
        },
        cancelCallback(err) {
          console.error(err.message);
        }
      }
    }
  }
</script>

<style scoped>
  .form .tags .tag-list input {
    width: calc(100% - 67px);
    float:left;
  }
  .tags .tag-list button, .comments button {
    height: 4rem;
    line-height:3.6rem;
    padding: 0 2rem;
    margin-top:-1px;
    float:right;
    color: white;
    font: inherit;
    cursor: pointer;
    text-align:center;
    letter-spacing:normal;
  }

  .tags .tag-list button {
    background-color: #333
  }

  .tags .tags-list label {
    clear:left;
  }

  .tags .tags-list input {
    margin-bottom:1px !important 
  }

  .tags button {
    height:26px;line-height:10px;outline:0
  }

  .feat {
    text-align:left;
  }

  .feat select {
    width:100px;text-align:left;margin-left:0;margin-right:0;
  }

  .submit button {
    margin-top:26px;
  }

  .submit button:hover {
    background-color:#333;
  }
</style>