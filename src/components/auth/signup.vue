<template>
  <div id="signup">
    <div class="form">
      <div class="message error" v-if="err" style="margin-top:0;margin-bottom:18px">{{ err }}</div>
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Screen Name</label>
          <input type="text"
                  id="name"
                  v-model="name"
                  @blur="$v.name.$touch()" />
          <p v-if="$v.name.$error" class="validation">You must provide your name.</p>
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email</label>
          <input type="email"
                  id="email"
                  v-model="email"
                  @blur="$v.email.$touch()" />
          <p v-if="$v.name.$error" class="validation">Please provide the email address you will log in with.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input type="password"
                  id="password"
                  v-model="password"
                  @blur="$v.password.$touch()" />
          <p v-if="!$v.password.minLen" class="validation">Password must be at least 6 characters long.</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input type="password"
                  id="confirm-password"
                  v-model="confirmPassword"
                  @blur="$v.confirmPassword.$touch()" />
          <p v-if="$v.confirmPassword.$error" class="validation">The entered passwords do not match.</p>
        </div>
        <div class="input inline minpad" :class="{invalid: $v.terms.$error}">
          <input type="checkbox" id="terms" v-model="terms" @change="$v.terms.$touch()" />
          <label for="terms">&nbsp;Accept <a href="#">Terms of Use</a></label>
          <p v-if="$v.terms.$error" class="validation">Please accept our terms and conditions.</p>
        </div>
        <div class="input inline minpad">
          <input type="checkbox" id="optin" v-model="optin" />
          <label for="optin">&nbsp;Receive new content in your inbox periodically</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="message error" v-if="err" style="margin-top:12px">{{ err }}</div>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        optin: true
      }
    },
    computed: {
      err() {
        return this.$store.getters.errorMsg
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('setErrorMessage', '')
        this.$v.$touch()
        if (this.$v.$invalid) {
          // display additional message?
        } else {
          const formData = {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            terms: this.terms,
            optin: this.optin
          }
          this.$store.dispatch('signup', formData)
        }
      }
    },
    validations: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      },
      terms: {
        checked: value => value === true
      },
    }
  }
</script>

<style scoped>
  .error {
    margin:0;
    font-size:1.5rem;
    line-height:1.6;
  }
</style>