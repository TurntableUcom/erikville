<template>
  <li class="depth-1 comment">
    <!--
    <div class="comment__avatar">
      <img width="50" height="50" class="avatar" src="assets/images/avatars/user-01.jpg" alt="">
    </div>
    -->
    <div class="comment__content">
      <div class="comment__info">
        <cite>{{ commentAuthor }}</cite>
        <div class="comment__meta">
          <time class="comment__time">{{ commentDate }}</time>
          <!--<a class="reply" href="#0">Reply</a>-->
        </div>
      </div>
      <div class="comment__text">
        <p>{{ commentBody }}</p>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      commentAuthor: String,
      commentDate: String,
      commentBody: String
    }
  }
</script>

<style scoped>

</style>