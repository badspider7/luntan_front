<template>
  <div class="question-detail">
    <Header></Header>
    <main class="question-body">
      <div class="questionPage">
        <div class="title-wrap">
          <div class="title">
            <ul class="container-item">
              <li class="topics">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shengqian"></use>
                </svg>
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
          <div class="question-discussion">
            <div class="post">
              <article class="post-item">
                <!-- 楼主 -->
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
                      <router-link to="/user/id" class="user-id">
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
              <!-- 回答问题的人 -->
              <PostDetail
                v-for="item in answerInfo"
                :key="item._id"
                :answerInfo="item"
                :questionInfo="questionInfo"
              ></PostDetail>
            </div>
          </div>
          <nav class="sideBar-right">
            <el-button
              type="success"
              class="icon el-icon-message"
              @click="answerQ"
              >回复问题</el-button
            >

            <!-- 关注作者 -->
            <el-button
              v-if="!isFollowing"
              type="success"
              @click="followingAuthor"
            >
              <svg class="icon">
                <use xlink:href="#icon-jiaguanzhuhuati"></use>
              </svg>
              <span>关注作者</span>
            </el-button>

            <!-- 取消关注 -->
            <el-button
              type="success"
              @click="cancelFollow"
              v-if="isFollowing"
              class="error-btn"
            >
              <svg class="icon">
                <use xlink:href="#icon-yiguanzhuhuati"></use>
              </svg>
              <span>取消关注</span>
            </el-button>
          </nav>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import { getQuestion, getAnswer,createAnswer } from "../../api/question";
import { following, followingList, cancelFollowing } from "../../api/user";
import Header from "../../components/Header.vue";
import PostDetail from "./PostDetail.vue";
import { getItem } from "../../utils/storage";
export default {
  components: { Header, PostDetail },
  data() {
    return {
      questionInfo: {},
      answerInfo: {},
      isFollowing: false, //判断是否关注
      //用户关注的信息
      followingId: {},
    };
  },
  methods: {
    //获取问题的详细信息
    async getQuestionDetail(questionId) {
      try {
        let { data } = await getQuestion(questionId);
        this.questionInfo = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    //获取该问题的答案列表
    async getAnswerList(questionId) {
      try {
        let { data } = await getAnswer(questionId);
        this.answerInfo = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    //关注作者  token
    async followingAuthor() {
      try {
        const { data } = await following(this.questionInfo.questioner._id);
        this.$message({
          type: "success",
          message: "关注成功!",
          duration: 1500,
        });
        this.isFollowing = true;
      } catch (err) {
        this.$message({
          type: "error",
          message: err.response.data.msg,
          duration: 1500,
        });
      }
    },
    //  取消关注  parmas: 作者id
    async cancelFollow() {
      try {
        const { data } = await cancelFollowing(
          this.questionInfo.questioner._id
        );
        this.$message({
          type: "success",
          message: "取消关注成功!",
          duration: 1500,
        });
        this, (this.isFollowing = false);
      } catch (err) {
        this.$message({
          type: "error",
          message: err.response.data.msg,
          duration: 1500,
        });
      }
    },

    //获取关注列表,判断是否已经关注楼主
    async getFollowingList(id) {
      const { data } = await followingList(id);

      this.followingId = this.questionInfo.questioner._id;
      const res = data.data.following.find(
        (following) => following._id == this.followingId
      );
      //如果已经关注
      if (res) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
    },
    //回复问题
    onCommentInputChange() {
      this.commentContent = document.getElementById("commentContent").value;
    },

     answerQ() {
      var _this = this;
      const h = _this.$createElement;
      _this.$msgbox({
        title: "输入你的回复",
        message: h(
          "div",
          {
            attrs: {
              class: "el-textarea",
            },
          },
          [
            h("textarea", {
              attrs: {
                class: "el-textarea__inner",
                autocomplete: "off",
                rows: 4,
                id: "commentContent",
              },
              value: _this.commentContent,
              on: { input: _this.onCommentInputChange },
            }),
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "回复",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        beforeClose:async (action, instance, done) => {
          if (action === "confirm") {
            console.log(_this.commentContent);
            //发送请求
            const { data } = await createAnswer({
              questionId: this.questionInfo._id,
              content:_this.commentContent
            })
            console.log(data);
            this.$message({
              type: "success",
              message: "回复成功",
            });
            //清空数据
            document.getElementById("commentContent").value = '';
            this.getAnswerList(this.questionInfo._id)
            done();
          } else {
            this.$message({
              type: "warning",
              message: "取消回复",
            });
            done();
          }
        },
      });
    },
  },
  mounted() {
    //很奇怪的一个点   this.$router.params.questionId 拿不到，下面这种缺拿得到
    // console.log(this.$router.currentRoute.params.questionId);
    //拿到问题详情
    this.getQuestionDetail(this.$route.path);
    //获取问题列表
    this.getAnswerList(this.$router.currentRoute.params.questionId);
    //获取关注列表
    // this.getFollowingList(getItem("user").id)
  },

  updated() {
    //获取关注列表
    this.getFollowingList(getItem("user").id);
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
        .topics {
          background-color: rgb(238, 225, 219);
          padding: 7px;
          border-radius: 6px;
        }
      }
    }
    .content {
      display: grid;
      grid-gap: 75px;
      grid-template-columns: 1fr 150px;
      grid-template-areas: "stream nav";
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
              .user-id {
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
      .sideBar-right {
        position: sticky;
        top: 60px;
        height: 450px;
        margin-top: 10px;
        .el-button {
          height: 47px;
          width: 125px;
          background-color: #18b965;
          margin-top: 20px;
          margin-left: 0px;
          .icon {
            width: 1.3em;
            height: 1.3em;
            vertical-align: -0.4rem;
            font-size: 18px;
            margin-right: 10px;
          }
          &::before {
            margin-right: 10px;
            font-size: 18px;
          }
        }
        .error-btn {
          background-color: var(--error-btn-color) !important;
          border-color: var(--error-btn-color);
        }
      }
    }
  }
}
</style>
