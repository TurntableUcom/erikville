import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCIz92jHPqVwASkepiB66Gn2q0_b89rd6Y",
    authDomain: "eric-blog-957a0.firebaseapp.com",
    databaseURL: "https://eric-blog-957a0.firebaseio.com/",
    projectId: "eric-blog-957a0",
    storageBucket: "gs://eric-blog-957a0.appspot.com"
    //, messagingSenderId: "xxxxx"
};

const app = initializeApp(firebaseConfig);

// Export the database for components to use. If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const fireb = firebase;
export const db = app.database();
// export const blogPostsRef = db.ref('blog-posts');
export const auth = app.auth();
