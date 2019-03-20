<template>
  <article class="masonry__brick entry format-standard" data-aos="fade-up">
    <div class="entry__thumb">
      <router-link :to="'/post/' + id + '/' + title.replace(/ /g,'-').toLowerCase()" class="entry__thumb-link">
        <img :src="'/assets/images/thumbs/masonry/' + image + '-400.jpg'" :srcset="imagesrcset" alt="" />
      </router-link>
    </div>

    <div class="entry__text">
      <div class="entry__header">

        <div class="entry__date">
          <router-link :to="'/post/' + id + '/' + title.replace(/ /g,'-').toLowerCase()">{{ date }}</router-link>
        </div>
        <h1 class="entry__title">
          <router-link :to="'/post/' + id + '/' + title.replace(/ /g,'-').toLowerCase()">{{ title }}</router-link>
        </h1>

      </div>
      <div class="entry__excerpt">
        <p>
          {{ summary }}
        </p>
      </div>
      <div class="entry__meta">
        <span class="entry__meta-links">
          <span>{{ tagz }}</span>
        </span>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      title: String,
      date: String,
      image: String,
      tags: Array,
      body: String,
      id: Number
    },
    computed: {
      imagesrcset() {
        return '/assets/images/thumbs/masonry/' + this.image + '-400.jpg 1x, /assets/images/thumbs/masonry/' + this.image + '-800.jpg 2x'
      },
      summary() {
        let text = this.body.replace(/(<([^>]+)>)/ig,"")
        return text.substring(0,100)
      },
      tagz() {
        return this.tags.join(", ")
      }
    }
  }
</script>