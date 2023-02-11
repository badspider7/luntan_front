<template>
  <div class="Blog">
    <Header :title="title"></Header>
    <DateList :loading="loading" :dataSource="articleList" @loadData="loadArticle" class="container">
      <template slot-scope="data">
          <BlogListItem :article="data.data"></BlogListItem>
        </template>
    </DateList>
  </div>
</template>
<script>
import Header from "../../components/Header.vue";
import { getArticleLists } from "../../api/article";
import DateList from '../../components/DateList.vue'
import BlogListItem from './BlogListItem.vue'
export default {
  name: "blog",
  components: { Header,DateList,BlogListItem },
  data() {
    return {
      title: "博客",
      articleList: {},
      loading: false
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    //获取文章列表
    async getArticleList(page) {
      const { data } = await getArticleLists(page);
      this.articleList = data.data;
    },
    //文章分页功能
    async loadArticle() {
      this.loading = true;
      let params = {
        page: this.articleList.pageNumber,
      };
      let { data } = await this.getArticleList(params);
      this.loading = false;
      if (!data) return;
      this.articleList = data.data;
    },
  },
};
</script>
<style scoped>
.container{
  position: relative;
  top: 103px;
  width: 1100px;
  margin: 0 auto;
}
</style>
