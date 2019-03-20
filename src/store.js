import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    isHomepage: false
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    },
    setIsHomepage(state, bool) {
      state.isHomepage = bool
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
        // globalAxios.post('/users.json', {
        axios.post('/signupNewUser?key=AIzaSyCIz92jHPqVwASkepiB66Gn2q0_b89rd6Y', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', { token: res.data.idToken, userId: res.data.localId })
          commit('storeUser', {name: authData.name, email: authData.email})
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('email', authData.email)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUserToDb', {
            name: authData.name,
            email: authData.email,
            optin: authData.optin
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
        axios.post('/verifyPassword?key=AIzaSyCIz92jHPqVwASkepiB66Gn2q0_b89rd6Y', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          // console.log('login res')
          // console.log(res)
          commit('authUser', {token: res.data.idToken, userId: res.data.localId})
          dispatch('fetchUser', authData.email) //fetch to set state user object
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('email', authData.email)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/?loggedin=true')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit, dispatch}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', { token: token, userId: userId })
      dispatch('fetchUser')
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      // router.replace('/signin')
    },
    isHomepage({commit}) {
        const path = window.location.pathname
        const Filename = path.split('/').pop()
        if (Filename != '' && Filename != 'index.html') {
            commit('setIsHomepage', false)
        } else {
            commit('setIsHomepage', true)
        }
    },
    storeUserToDb ({commit, state}, userData) {
      // console.dir(userData)
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json?auth=' + state.idToken, userData)
          .then(res => {
              // console.log(res)
              router.push('/?loggedin=true')
          })
        .catch(error => console.log(error))
    },
    fetchUser ({commit, state}, userEmail) {
      if (!userEmail) userEmail = localStorage.getItem('email')
      // REWORK TO NOT FETCH ALL USERS WITH EACH REQUEST AS IS INDICATED BY THE CONSOLE.LOG BELOW
      // PERHAPS PERFORM THE LOOKIN IN THE LOGIN/SIGNUP PAGES AND ONLY POST THE MUTATION TO THE STORE
      globalAxios.get('/users.json?auth=' + state.idToken)
        .then(res => {
          const data = res.data
          // console.log('fetchUser', userEmail)
          // console.log(data)
          const users = []
          for (let key in data) {
            const user = data[key]
            if (user.email == userEmail) {
              user.id = key
              users.push(user)
            }
          }
          // console.log('filtered down to me?')
          // console.log(users)
          commit('storeUser', users[0])
      })
      .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    },
    onHomepage (state) {
        return state.isHomepage
    }
  }
})