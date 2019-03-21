<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Your Name</label>
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
        <div class="input inline minpad">
          <input type="checkbox" id="terms" v-model="terms" />
          <label for="terms">&nbsp;Accept <a href="#">Terms of Use</a></label>
        </div>
        <div class="input inline minpad">
          <input type="checkbox" id="optin" v-model="optin" />
          <label for="optin">&nbsp;Receive new content in your inbox periodically</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
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
    methods: {
      onSubmit () {
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
      }
    }
  }
</script>

<style>
  #signup {
    padding:15px;
  }
  
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0px 0px 3px #ccc;
    line-height:.9;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .minpad {
    margin:0 auto;
  }
</style>