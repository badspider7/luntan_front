<template>
  <div class="container-body">
    <div class="article-list">
      <DataList :dataSource="articleListInfo">
        <template #default="{ data }">
          <ArticleListItem :article="data"></ArticleListItem>
        </template>
      </DataList>
      <!-- <div v-for="item in articleListInfo" :key="item.id">
      </div> -->
    </div>
  </div>
</template>
<script>
import { getArticleLists } from "../../api/article";
import ArticleListItem from "./AtricleListItem.vue";
import DataList from "../../components/DateList.vue";
export default {
  data() {
    return {
      articleListInfo: {},
    };
  },
  components: { ArticleListItem,DataList },
  methods: {
    //获取文章列表功能
    async ArticleLists() {
      try {
        const { data } = await getArticleLists();
        this.articleListInfo = data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.ArticleLists();
  },
};
</script>
<style scoped lang="scss">
.container-body {
  width: 900px;
  margin: 0 auto;
}
</style>
