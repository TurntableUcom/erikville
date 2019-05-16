import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './axios-auth'  // WAS FOR NEWSLETTER SIGNUP UPON REGISTRATION, NOW USING VUEFIRE
import globalAxios from 'axios'
import { db, auth } from './firebase';
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isHomepage: false,
    isAdmin: false,
    errorMessage: '',
    successMessage: ''
  },
  mutations: {
    storeUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = null
      state.isAdmin = false
    },
    setIsHomepage(state, bool) {
      state.isHomepage = bool
    },
    setIsAdmin(state, bool) {
      state.isAdmin = bool
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg
    },
    setSuccessMessage(state, msg) {
      state.successMessage = msg
    }
  },
  actions: {
    authStateObserver({commit, dispatch}, isNewSignup) {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          if (!isNewSignup) commit('storeUser', assembleUserObject(user))
          // console.log('fetchUser authStateObserver (just stored user)')
          dispatch('fetchUser', user.email)
        } else {
          commit('clearUser')
        }
      });
    },
    signup ({commit, dispatch}, authData) {
      auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then (res => {
        dispatch('authStateObserver', true);
        // console.log('call storeUserToDb', res)
        dispatch('storeUserToDb', {
          name: authData.name,
          email: authData.email,
          optin: authData.optin,
          type: 'user'
        })
        //commit('storeUser', assembleUserObject(user)) // DONE IN authStateObserver now
        if (authData.optin) dispatch('newsletterSignup', res)
        localStorage.setItem('userId', res.user.uid)
        localStorage.setItem('email', res.user.email)
        localStorage.setItem('refreshToken', res.user.refreshToken)
        let user = auth.currentUser
        if (user){
          user.updateProfile({
            displayName: authData.name,
            photoURL: "/assets/images/avatars/generic-avatar.png"
          })
          .then(() => console.log('displayname saved'))
          .catch((error) => {
            console.log(error.message)
            commit('setErrorMessage', error.message)
          })
          .finally(() => router.push('/?loggedin=true'));
        }
      })
      .catch(error => {
        console.log(error.code, error.message)
        commit('setErrorMessage', error.message)
      });
    },
    login ({commit, dispatch}, authData) {
      auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        // commit('storeUser', assembleUserObject(res.user)) // DONE IN authStateObserver now
        dispatch('authStateObserver');
        // dispatch('fetchUser', res.user.email)
        localStorage.setItem('userId', res.user.uid)
        localStorage.setItem('email', res.user.email)
        localStorage.setItem('refreshToken', res.user.refreshToken)
        router.push('/?loggedin=true')
      })
      .catch(function(error) {
        console.log(error.message)
        commit('setErrorMessage', error.message)
      });
    },
    tryAutoLogin ({commit, dispatch}) {
      const userId = localStorage.getItem('userId')
      const email = localStorage.getItem('email')
      const refreshToken = localStorage.getItem('refreshToken')
      if (!userId) {
        return
      }
      // const expirationDate = new Date(localStorage.getItem('expirationDate'))
      // let now = new Date()
      // now = new Date(now.getTime())
      // if (now >= expirationDate) {
      //   return
      // }
      // commit('storeUser', { userId: userId, email: email, refreshToken: refreshToken })
      dispatch('authStateObserver')
      // console.log('fetchUser tryAutoLogin')
      dispatch('fetchUser', email)
    },
    logout ({commit}) {
      auth.signOut()
      .then(function() {
        commit('clearUser')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('refreshToken')
        console.log('successfully logged out')
      })
      .catch(function(error) {
        console.log(error.message)
      });
    },
    storeUserToDb ({commit}, userData) {
      if (!userData) {
        return
      }
      var user = auth.currentUser
      if (user){
          user.getIdToken()
          .then(res => {
            globalAxios.post('/users.json?auth=' + res, userData)
            .then(res => {
              debugger
              router.push('/?loggedin=true')
            })
            .catch(error => {
              console.log(error.message)
              commit('setErrorMessage', error.message)
            })
          })
          .catch(error => console.log(error.message))
      }
    },
    fetchUser ({commit, state}, userEmail) {
      var user = auth.currentUser
      // console.log('fetchUser', user)
      if (user){
        // TODO: REWORK TO NOT FETCH ALL USERS WITH EACH REQUEST AS IS INDICATED BY THE CONSOLE.LOG BELOW
        // PERHAPS PERFORM THE LOOKIN IN THE LOGIN/SIGNUP PAGES AND ONLY POST THE MUTATION TO THE STORE
        // const currentUserRef = db.ref('blog-posts').orderByChild('email').equalTo(userEmail)
        user.getIdToken()
          .then(res => {
            globalAxios.get('/users.json?auth=' + res)
            .then(res => {
              const data = res.data
              for (let key in data) {
                const user = data[key]
                if (user.email == userEmail) {
                  user.uid = key
                  user.refreshToken = user.refreshToken
                  // console.log('WE GOT ONE!!!', user)
                  commit('storeUser', assembleUserObject(user))
                  if (user.type == 'admin') commit('setIsAdmin', true)
                  return
                }
              }
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          console.dir(error)
          if (error.toString().includes('401')){
            console.log('yep, it\'s a 401')
            dispatch('logout')
          }
        })
      }
    },
    isHomepage({commit}) {
      const path = window.location.pathname
      const Filename = path.split('/').pop()
      if (path.split('/').length >= 3) {
        commit('setIsHomepage', false)
      } else {
        if (Filename != '' && Filename != 'index.html') {
          commit('setIsHomepage', false)
        } else {
          commit('setIsHomepage', true)
        }
      }
    },
    newsletterSignup({state}, data) {
      let thisemail = data.user.email
      /*
      globalAxios.post('/newsletter.json', {email: thisemail})
        .then(res => {
            console.log(res)
            this.newsletterSubscribed = true;
        })
      .catch(error => console.log(error))
      */
      // console.log('newsl email', thisemail)
      const addedAt = new Date()
      // console.log(addedAt)
      db.ref('newsletter').push({email: thisemail, added: addedAt}) /// WHY TF addedAt NOT BEING ADDED TO FIREBASE ??
        .then(res => console.log('successful opt-in'))
        .catch(error => console.log(error.message))
    },
    setErrorMessage ({commit}, msg) {
      commit('setErrorMessage', msg)
    },
    setSuccessMessage ({commit}, msg) {
      commit('setSuccessMessage', msg)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.user !== null
    },
    onHomepage (state) {
        return state.isHomepage
    },
    loggedInAsAdmin (state) {
        return state.isAdmin
    },
    errorMsg (state) {
        return state.errorMessage
    },
    successMsg (state) {
        return state.successMessage
    }
  }
})

let assembleUserObject = (user) => {
  return {
    userId: user.uid,
    email: user.email,
    name: user.name,
    isAdmin: user.admin,
    refreshToken: user.refreshToken
  }
}