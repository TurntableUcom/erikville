<template>
<footer class="s-footer">

  <div class="s-footer__main">
    <div class="row">

      <div class="col-two md-four mob-full s-footer__sitelinks">

        <h4>Quick Links</h4>

        <ul class="s-footer__linklist">
          <li>
            <a href="#0">Home</a>
          </li>
          <li>
            <a href="#0">About</a>
          </li>
          <li>
            <a href="#0">Contact</a>
          </li>
          <li>
            <a href="#0">Privacy Policy</a>
          </li>
        </ul>

      </div>
      <!-- end s-footer__sitelinks -->

      <div class="col-two md-four mob-full s-footer__archives">

        <h4>Archives</h4>

        <ul class="s-footer__linklist">
          <li>
            <a href="#0">January 2018</a>
          </li>
          <li>
            <a href="#0">December 2017</a>
          </li>
          <li>
            <a href="#0">November 2017</a>
          </li>
          <li>
            <a href="#0">October 2017</a>
          </li>
        </ul>

      </div>
      <!-- end s-footer__archives -->

      <div class="col-two md-four mob-full s-footer__social">

        <h4>Social</h4>

        <ul class="s-footer__linklist">
          <li>
            <a href="#0">Facebook</a>
          </li>
          <li>
            <a href="#0">Instagram</a>
          </li>
          <li>
            <a href="#0">Twitter</a>
          </li>
          <li>
            <a href="#0">Pinterest</a>
          </li>
        </ul>

      </div>
      <!-- end s-footer__social -->

      <div class="col-five md-full end s-footer__subscribe">

        <h4>Our Newsletter</h4>

        <div v-if="newsletterSubscribed" class="success">Successfully Subscribed!</div>

        <p v-if="!newsletterSubscribed">We won't innundate you with emails, we promise. Very infrequent notices of fresh content, which we trust you will find informative.</p>

        <div class="subscribe-form" v-if="!newsletterSubscribed">
          <form id="mc-form" class="group" novalidate="true" @submit.prevent="newsletterSignup">

            <input type="email" value="" name="EMAIL" class="email" id="mc-email" placeholder="Email Address" v-model="newsletterEmail">

            <input type="submit" name="subscribe" value="Submit">

            <label for="mc-email" class="subscribe-message"></label>

           </form>
        </div>

      </div>
      <!-- end s-footer__subscribe -->

    </div>
  </div>
  <!-- end s-footer__main -->

  <div class="s-footer__bottom">
    <div class="row">
      <div class="col-full">
        <div class="s-footer__copyright">
          <span>&copy; Copyright Philosophy 2019</span>
          <span>
            Site Template by <a href="https://colorlib.com/" style="color:#555555">Colorlib</a>
          </span>
        </div>

        <div class="go-top">
          <a class="smoothscroll" title="Back to Top" href="#top"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- end s-footer__bottom -->

</footer>
</template>

<script>
  import globalAxios from 'axios'

  export default {
    data () {
      return {
        newsletterEmail: '',
        newsletterSubscribed: false
      }
    },
    methods: {
      newsletterSignup() {
        console.log(this.newsletterEmail)
        globalAxios.post('/newsletter.json', {email: this.newsletterEmail})
          .then(res => {
              console.log(res)
              this.newsletterSubscribed = true;
          })
        .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>

</style>