<template>
  <div id="admin">

    <div class="success" id="newCategorySuccess" v-if="newCategorySuccess">New Category, Cool</div>

    <button @click="addCategory" id="addNew">Add New Category</button>
    
    <button @click="editCategories" id="editCategories">Edit Categories</button>

    <div v-for="category in blogCategories" :key="category.id">
      <button @click="editPost($event, category.id)" class="editCategory">Edit</button>
      &nbsp;
      <input type="number" v-model="category.order" />
      <input type="text" v-model="category.name" />
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
        newCategorySuccess: false,
        blogCategories: []
      }
    },
    methods: {
      addCategory () {
        router.push('/admin/add-category')
      },
      editCategory(event, postid) {
        router.push('/admin/edit-category/' + postid)
      },
      editCategories(event) {
        router.push('/admin/categories/')
      }
    },
    created() {
      if (this.$route.query.category == 'added'){
        this.newCategorySuccess = true
        window.setTimeout(() => $('#newCategorySuccess').fadeOut(), 3600)
        window.setTimeout(() => this.newCategorySuccess = false, 3601)
      }
    },
    firebase: {
      blogCategories: {
        source: db.ref('blog-categories'), //.orderByChild('order')
        readyCallback(snapshot) {
          // this.blogCategories = this.blogCategories.reverse()
          console.log('blogCategories', this.blogCategories)
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

    input {
      float:left
    }
  }
</style>