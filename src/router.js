import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';

import HomepagePosts from './components/homepage/posts.vue';
import DashboardPage from './components/dashboard/dashboard.vue';
import SignupPage from './components/auth/signup.vue';
import SigninPage from './components/auth/signin.vue';
import About from './components/about/about.vue';
import Contact from './components/contact/contact.vue';
import PostVideo from './components/posts/video.vue';
import BlogPost from './components/posts/post.vue';
import Categories from './components/categories/categories.vue';
import Category from './components/categories/category.vue';

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
  { path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode:'history', routes})