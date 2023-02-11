<template>
  <div class="article-container">
    <div class="article-list">
      <div class="article-cover">
        <router-link :to="`/blog/${article._id}`">
          <img :src="article.cover" alt="nianyi" />
        </router-link>
      </div>
      <article class="article-info">
        <h3 class="article-header">
          <router-link :to="`/blog/${article._id}`">
            {{ article.title }}
          </router-link>
        </h3>
        <router-link :to="`/blog/${article._id}`" class="article-body"><p v-html="article.excerpt"></p></router-link>
        <div class="article-btm">
          <!-- <span class="post-time">{{ article.updatedAt }}</span> -->
          <span class="post-time">2023年3月12日 </span>
          <router-link to="/"
            ><i class="el-icon-paperclip"></i>
            <span class="post-tag">{{
              article.category.name
            }}</span></router-link
          >
        </div>
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
    display: flex;
    a:hover{
        color: rgb(38 130 78);
    }
    .article-cover {
      width: 300px;
      height: 160px;
      margin-right: 5px;
      img {
        display: block;
        width: 90%;
        height: 10rem;
        object-fit: cover;
        box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
        border-radius: 0.25rem;
        background-color: transparent;
      }
    }
    .article-info {
      display: grid;
      grid-template-rows: 1fr 2fr 1fr;
      padding: 8px 15px;
      height: 160px;
      .article-header{
        margin-bottom: 10px;
      }
      .article-body{
        max-width: 670px;
        max-height: calc(1.4rem*3);
        overflow-wrap: break-word;
        overflow: hidden;
        margin: .3rem 0 0.3rem 0;
        letter-spacing: 0.02rem;
      }
      .article-btm{
        padding-top: 8px;
        .post-time{
            margin-right: 10px;
        }
      }
    }
  }
}
</style>
