import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';

import HomepagePosts from './components/homepage/posts.vue';
import SignupPage from './components/auth/signup.vue';
import SigninPage from './components/auth/signin.vue';
import About from './components/about/about.vue';
import Contact from './components/contact/contact.vue';
import PostVideo from './components/posts/video.vue';
import BlogPost from './components/posts/post.vue';
import Categories from './components/categories/categories.vue';
import Category from './components/categories/category.vue';
import AdminDash from './components/admin/dashboard.vue';
import AdminNewPost from './components/admin/new-post.vue';
import AdminEditPost from './components/admin/edit-post.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomepagePosts, alias: '/index.html' },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/categories', component: Categories },
  { path: '/category/:catname', component: Category },
  { path: '/post', component: PostVideo },
  { path: '/post/:postid', component: BlogPost },
  { path: '/post/:postid/:posttitle', component: BlogPost },
  { path: '/admin', component: AdminDash,
    beforeEnter (to, from, next) {
      if (store.state.isAdmin) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/admin/add-post', component: AdminNewPost,
    beforeEnter (to, from, next) {
      if (store.state.isAdmin) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/admin/edit-post/:idofpost', component: AdminEditPost,
    beforeEnter (to, from, next) {
      if (store.state.isAdmin) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({
  mode:'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 } // page scroll to top for all route navigations
  }
})