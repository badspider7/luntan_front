<template>
  <div class="Blog">
    <Header :title="title"></Header>
    <DateList :loading="loading" :dataSource="articleList" @loadData="loadArticle" class="container">
      <template slot-scope="data">
          <BlogListItem :article="data.data"></BlogListItem>
        </template>
    </DateList>
    <Footer></Footer>
    <el-backtop :bottom="200" :right="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        <svg class="icon">
          <use xlink:href="#icon-fanhuidingbu"></use>
        </svg></div
    ></el-backtop>
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
      let { data } = await getArticleLists(params);
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
#footer{
  margin-top: 120px;
}
</style>
