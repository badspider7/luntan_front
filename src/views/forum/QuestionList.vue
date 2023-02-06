<template>
  <div class="container-body">
    <div class="article-list">
      <DataList :loading="loading" :dataSource="questionListInfo" @loadData="loadQuestions">
        <template slot-scope="data">
          <QuestionListItem :article="data"></QuestionListItem>
        </template>
      </DataList>
      <!-- <div v-for="item in articleListInfo" :key="item.id">
      </div> -->
    </div>
  </div>
</template>
<script>
// import { getArticleLists } from "../../api/article";
import { getQuestionList } from "../../api/question";
import QuestionListItem from "./QuestionListItem.vue";
import DataList from "../../components/DateList.vue";
export default {
  data() {
    return {
      questionListInfo:{},
      loading: false
    };
  },
  components: { QuestionListItem,DataList },
  methods: {
    //获取问题列表
    async QuestionList() {
      try {
        const { data } = await getQuestionList();
        this.questionListInfo = data.data
      } catch (err) {
        console.log(err);
      }
    },
    //问题列表分页功能
    async loadQuestions() {
      this.loading = true
      let params = {
        page: this.questionListInfo.pageNumber
      }
      let { data } = await getQuestionList(params)
      this.loading = false
      if (!data) return 
      console.log(data);
      this.questionListInfo= data.data
    }
    // 获取文章列表功能
    // async ArticleLists() {
    //   try {
    //     const { data } = await getArticleLists();
    //     this.articleListInfo = data.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    //文章分页功能
    // async loadArticle() {
    //   this.loading = true
    //   let params = {
    //     page: this.articleListInfo.pageNumber
    //   }
    //   let { data } = await getArticleLists(params)
    //   this.loading = false
    //   if (!data) return 
    //   this.articleListInfo= data.data
    // }
  },
  mounted() {
    this.QuestionList();
  },
};
</script>
<style scoped lang="scss">
.container-body {
  width: 900px;
  margin: 0 auto;
}
</style>
