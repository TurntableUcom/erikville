<template>
  <div id="apps">
    <app-header />
    <section id="content">
      <router-view :key="$route.fullPath"></router-view>
    </section>
    <app-footer />
  </div>
</template>

<script>
  import Header from './components/header/header.vue';
  import Footer from './components/footer/footer.vue';

  export default {
    name: 'apps',
    components: {
      'app-header': Header,
      'app-footer': Footer
    },
    created () {
      this.$store.dispatch('isHomepage')
      this.$store.dispatch('tryAutoLogin')
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch('isHomepage')
      }
    }
  }
</script>

<style>
#content {
  background-color:#eee;
}
</style>