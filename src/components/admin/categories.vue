<template>
  <div id="admin">

    <div class="success" id="newCategorySuccess" v-if="newCategorySuccess">New Category, Cool</div>
    <div class="success" id="editCategorySuccess" v-if="editCategorySuccess">Edited Properly, Good Job</div>

    <div v-for="category in blogCategories" :key="category.id">
      <button @click="editCategory($event, category['.key'], category.name, category.order)" class="editCategory">Edit</button>
      &nbsp;&nbsp;<button @click="deleteCategory($event, category['.key'])" class="deleteCategory">X</button>
      &nbsp;&nbsp;
      <input type="number" v-model="category.order" />
      &nbsp;&nbsp;
      <input type="text" v-model="category.name" style="width:200px"/>
      &nbsp;&nbsp;
      <div class="clear"></div>
    </div>

    <div>
      <button @click="addCategory($event)" class="addCategory">Add Category</button>
      &nbsp;&nbsp;
      <input type="number" v-model="newCategory.order" />
      <input type="text" v-model="newCategory.name" style="margin-left:10px" />
      <div class="clear"></div>
    </div>
    
  </div>
</template>

<script>
  import router from '../../router'
  import { db } from '../../firebase'
  // import { addKeysToArray } from '../../mixins/postHelpers'

  export default {
    data () {
      return {
        newCategorySuccess: false,
        editCategorySuccess: false,
        blogCategories: [],
        newCategory: {
          order: 5000,
          name: ''
        }
      }
    },
    methods: {
      addCategory () {
        // this.blogCategories.push(this.newCategory)
        db.ref('blog-categories').push({name: this.newCategory.name, order: Number(this.newCategory.order)})
        this.newCategory.name = ''
        this.newCategory.order = 5000
      },
      editCategory(event, categoryid, catname, catorder) {
        // console.log(categoryid)
        db.ref('blog-categories').child(categoryid).set({name: catname, order: Number(catorder)})
          .then(res => {console.log('successful category editation.');router.push('?category=edited')})
          .catch(error => console.log(error.message))
      },
      deleteCategory(event, categoryid){
        // console.log('categoryid', categoryid)
        db.ref('blog-categories').child(categoryid).remove()
      }
    },
    created() {
      if (this.$route.query.category == 'added'){
        this.newCategorySuccess = true
        window.setTimeout(() => $('#newCategorySuccess').fadeOut(), 3600)
        window.setTimeout(() => this.newCategorySuccess = false, 3601)
      } else if (this.$route.query.category == 'edited'){
        this.editCategorySuccess = true
        window.setTimeout(() => $('#editCategorySuccess').fadeOut(), 3600)
        window.setTimeout(() => this.editCategorySuccess = false, 3601)
      }
    },
    firebase: {
      blogCategories: {
        source: db.ref('blog-categories').orderByChild('order'), 
        readyCallback(snapshot) {
          /*
          for (let idx in this.blogCategories) { // add key id to each category
            const cat = this.blogCategories[idx]
            const dbkey = cat['.key']
            this.blogCategories[idx] = cat
          }
          */
          // this.blogCategories = addKeysToArray(this.blogCategories)
          // console.log('bloogCategories', this.blogCategories)
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

    .editCategory, .deleteCategory, .addCategory {
      padding: 0 1.8rem;
      height:3.2rem;line-height:3rem;
    }
    .editCategory{
      float:left
    }
    .addCategory {
      margin-left:12px
    }

    .ft {
      font-weight:bold;
    }

    input {
      float:left;padding:3px
    }

    .success {
      margin-top:0
    }
  }
</style>