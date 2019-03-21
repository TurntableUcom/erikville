<template>
  <div id="signin">
    <div class="form">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, numeric, sameAs } from 'vuelidate/lib/validators'
  
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
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

<style>
  #signin {
    padding:15px;
  }
  
  .form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
     box-shadow: 0px 0px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input.inline label {
    display: inline;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .form .input input,
  .form .input textarea {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .form .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .form .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .form .submit button:hover,
  .form .submit button:active {
    background-color: #521751;
    color: white;
  }

  .form .submit button[disabled],
  .form .submit button[disabled]:hover,
  .form .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>