<template>
  <div class="question-detail">
    <Header></Header>
    <main class="question-body">
      <div class="questionPage">
        <div class="title-wrap">
          <div class="title">
            <ul class="container-item">
              <li>
                <span>{{
                  questionInfo.topics && questionInfo.topics[0].name
                }}</span>
              </li>
              <li>
                <h3>{{ questionInfo.title }}</h3>
              </li>
            </ul>
          </div>
        </div>
        <div class="content" v-if="questionInfo.questioner">
          <nav class="sideBar-right"></nav>
          <div class="question-discussion">
            <div class="post">
              <article class="post-item">
                <header>
                  <ul>
                    <li class="item-userImg">
                      <router-link class="questioner-avatar" to="/user/id">
                        <el-avatar
                          :src="questionInfo.questioner.avatar_url"
                        ></el-avatar>
                      </router-link>
                    </li>
                    <li class="item-user">
                      <router-link to="/user/id">
                        <span>{{ questionInfo.questioner.username }}</span>
                      </router-link>
                    </li>
                    <li class="post-time">
                      <span>{{ questionInfo.createdAt.split("T")[0] }}</span>
                    </li>
                  </ul>
                </header>
                <div
                  class="post-body"
                  v-html="`${questionInfo.description}`"
                ></div>
              </article>
              <article class="post-item" v-for="item in answerInfo" :key="item._id">
                <header>
                  <ul>
                    <li class="item-userImg">
                      <router-link class="questioner-avatar" to="/user/id">
                        <el-avatar
                          :src="item.answerer.avatar_url"
                        ></el-avatar>
                      </router-link>
                    </li>
                    <li class="item-user">
                      <router-link to="/user/id">
                        <span>{{ item.answerer.username }}</span>
                      </router-link>
                    </li>
                    <li class="post-time">
                      <span>{{ item.createdAt.split("T")[0] }}</span>
                    </li>
                  </ul>
                </header>
                <div
                  class="post-body"
                  v-html="`${item.content}`"
                ></div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { getQuestion, getAnswer } from "../../api/question";
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      questionInfo: {},
      answerInfo: {},
    };
  },
  methods: {
    //获取问题的详细信息
    async getQuestionDetail(questionId) {
      let { data } = await getQuestion(questionId);
      this.questionInfo = data.data;
    },
    //获取该问题的答案列表
    async getAnswerList(questionId) {
      let { data } = await getAnswer(questionId);
      this.answerInfo = data.data;
    },
  },
  mounted() {
    this.getQuestionDetail(this.$route.path);
    this.getAnswerList(this.$router.path);
  },
  updated() {
    // let time = this.questionInfo.createdAt.split('T')[0] + '-' + this.questionInfo.createdAt.split('T')[1].split(':')[0] * 1 + 8 + ":" + this.questionInfo.createdAt.split('T')[1].split(':')[1]
    // console.log(time);
  },
};
</script>
<style scoped lang="scss">
.question-detail {
  .question-body {
    margin-top: 50px;
    width: 100%;
    line-height: 25px;
    .title-wrap {
      background-color: #e4f6e9;
    }
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
    .content {
      width: 1100px;
      margin: 0 auto;
      .question-discussion {
        margin-top: 10px;
      }
      .post {
        .post-item {
          border-bottom: 1px solid #e4f6e9;
          header {
            padding: 20px;
          }
          ul {
            display: flex;
            li {
              margin-right: 20px;
            }
            .item-userImg {
              .el-avatar {
                width: 64px;
                height: 64px;
              }
            }
            .item-user {
              font-size: 14px;
              font-weight: bold;
              &::after {
                content: "楼主";
                padding-left: 10px;
                padding-right: 10px;
                color: rgb(255, 255, 255);
                font-size: 12px;
                margin-left: 14px;
                background: rgb(240, 93, 29);
                border-radius: 4px;
              }
              a:hover {
                text-decoration: underline;
              }
            }
            .post-time {
              font-size: 13px;
              color: #669974;
            }
          }
          .post-body {
            position: relative;
            left: 100px;
            top: -51px;
            max-width: 55vw;
          }
        }
      }
    }
  }
}
</style>
