<template>
  <div class="question-detail">
    <Header></Header>
    <main class="question-body">
      <div class="questionPage">
        <div class="title">
          <ul class="container-item">
            <li>
              <span>{{questionInfo.topics && questionInfo.topics[0].name}}</span>
            </li>
            <li>
              <h3>{{ questionInfo.title }}</h3>
            </li>
          </ul>
        </div>
        <div class="content"></div>
      </div>
    </main>
  </div>
</template>
<script>
import {getQuestion} from '../../api/question'
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      questionInfo: {}
    };
  },
  methods: {
    //获取问题的详细信息
    async getQuestionDetail(questionId) {
      let { data } = await getQuestion(questionId)
      this.questionInfo = data.data
    }
  },
  mounted() {
    this.getQuestionDetail(this.$route.path)
  }
};
</script>
<style scoped lang="scss">
.question-detail {
  .question-body {
    margin-top: 50px;
    width: 100%;
    line-height: 25px;
    background-color: #e4f6e9;
    .title {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      width: 1100px;
      padding: 20px;
      color: #669974;
      margin-right: auto;
      margin-left: auto;
      padding-top: 40px;
      padding-bottom: 30px;
      .container-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
