<template>
  <div class="article-container">
    <div class="article-list">
      <div class="article-cover">
        <router-link to="/">
          <img :src="article.cover" alt="nianyi" />
        </router-link>
      </div>
      <article class="article-info">
        <h1 class="article-header">
            <router-link to="/">
                {{ article.title }}
            </router-link>
        </h1>
        <p v-html="article.excerpt"></p>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  props: ["article"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.article-container {
    margin-bottom: 50px;
  .article-list {
    .article-cover {
        width: 300px;
        height: 160px;
      img {
        display: block;
        width: 100%;
        height: 10rem;
        object-fit: cover;
        box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
        border-radius: 0.25rem;
        background-color: transparent;
      }
    }
  }
}
</style>
