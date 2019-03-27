<template>
  <div id="signin">
    <div class="form">
      <div class="message success" v-if="succ" style="margin-top:0;margin-bottom:28px">{{ succ }}</div>
      <div class="message error" v-if="err" style="margin-top:0;margin-bottom:24px">{{ err }}</div>
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" @blur="$v.email.$touch()">
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" @blur="$v.password.$touch()" >
          <p v-if="!$v.password.minLen" class="validation">Password must be at least 6 characters long.</p>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          &nbsp;&nbsp;
          <button @click.prevent="forgotPassword">Forgot Password?</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, numeric, sameAs } from 'vuelidate/lib/validators'
  import { auth } from '../../firebase'
  
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      err() {
        return this.$store.getters.errorMsg
      },
      succ() {
        return this.$store.getters.successMsg
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('setErrorMessage', '')
        this.$store.dispatch('setSuccessMessage', '')
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('login', formData)
      },
      forgotPassword () {
        this.$store.dispatch('setErrorMessage', '')
        this.$store.dispatch('setSuccessMessage', '')
        this.$v.email.$touch()
        if (this.$v.email.$invalid) {
          this.$store.dispatch('setErrorMessage', 'Please enter the email address used to create this account. If an account exists in our records with the email address provided, a reset password email will be sent to that address.')
        } else {
          const _this = this;
          auth.sendPasswordResetEmail(this.email).then(function() {
            _this.$store.dispatch('setSuccessMessage', 'Thank you. If an account exists in our records with the email address provided, a reset password email will be sent to that address. If you do not receive an email, please try another email address that you may have registered.')
          }).catch(function(error) {
            _this.$store.dispatch('setErrorMessage', error.message)
          });
        }
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLen: minLength(6)
      }
    }
  }
</script>

<style scoped>
  .error, .success {
    margin:0;
    font-size:1.35rem;
    line-height:1.5;
  }
</style>