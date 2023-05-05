<template>
  <div id="createQuestion">
    <el-drawer
      title="我是标题"
      :visible="visible"
      :direction="direction"
      :before-close="handleClose"
      :with-header="false"
      :show-close="true"
      :size="400"
    >
      <div class="container">
        <div class="question-title">
          <input type="text" placeholder="请输入问题" v-model="title" />
        </div>
        <div class="question-descrition">
          <textarea
            placeholder="输入对问题的描述"
            v-model="description"
          ></textarea>
        </div>
        <div class="submit" @click="submit">
          <span>提交</span>
        </div>
        <div class="cancel" @click="cancel">
          <span>取消</span>
        </div>
        <div class="topic" ref="topics">
          <div
            class="add-topic-title"
            v-if="!isShowTopic"
            @click="isShowTopic = !isShowTopic"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>添加一个话题</span>
          </div>
          <div class="add-topic-input" v-if="isShowTopic">
            <input
              type="text"
              @blur="isShowTopic = false"
              @keydown.enter="commitTopic()"
              v-model="topicValue"
            />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Topic, createTopic } from "../api/topic";
import { mapState } from "vuex";
import { createQuestion } from "../api/question";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      // drawer: false,
      title: "",
      description: "",
      direction: "btt",
      isShowTopic: false,
      topicValue: "",
      topicInfo: {},
      hasTopic: true,
    };
  },
  computed: {
    ...mapState(["visible"]),
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？问题还没有提交")
        .then((_) => {
          this.$store.commit("isShowDrawer", false);
          done();
        })
        .catch((_) => {
          console.log("取消关闭");
        });
    },

    //取消提交
    cancel() {
      this.handleClose(true);
    },
    async getTopics() {
      const { data } = await createTopic({
        name: this.topicValue,
      });
      console.log(data);
    },

    async commitTopic() {
      const { data } = await Topic(this.topicValue);
      console.log(data);
      this.topicInfo = data.data;
      if (data.data.length) {
        //话题存在.给inputs添加一个兄弟结点
        if (
          Array.from(this.$refs.topics.children).some((child) =>
            child.classList.contains("topic-little")
          )
        ) {
          //判断是否添加了话题，如果添加了，就删掉所有的子孩子
          const topicElements = document.querySelectorAll(".topic-little");
          topicElements.forEach((element) => {
            element.parentNode.removeChild(element);
          });
        }
        const topic = document.createElement("span");
        topic.textContent = data.data[0].name;
        topic.className = "topic-little";
        this.$refs.topics.appendChild(topic);
        this.topicValue = "";
        this.isShowTopic = false;
      } else {
        //话题不存在，就创建话题
        this.hasTopic = false;
      }
    },

    //提交问题
    async submit() {
      try {
        if (window.localStorage.getItem("user")) {
          if (
            this.title.trim().length !== 0 &&
            this.description.trim().length !== 0
          ) {
            const { data } = await createQuestion({
              title: this.title,
              description: this.description,
              topics: [this.topicInfo[0]._id ?? ""],
            });
            console.log(data);
            if (!this.hasTopic) {
              getTopics();
            }
            this.$message({
              message: "问题发表成功",
              type: "success",
              duration: 1500,
            });
            window.location.reload();
            this.$store.commit("isShowDrawer", false);
          } else {
            alert('请输入内容！')
          }
        } else {
          MessageBox.confirm("此页面需要登录,请前往登录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            router.replace(
              {
                name: "",
              },
              () => {}
            );
          });
        }
      } catch (err) {
        console.log(err);
        const errorMsg = err.response.data.msg;
        this.$message({
          message:
            errorMsg.slice(1, 2) === "t"
              ? "请输入问题的标题"
              : "请输入问题的描述",
          type: "error",
          duration: 1500,
        });
      }
    },
  },
  created() {},
};
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-columns: 0.9fr 0.1fr;
  .question-title {
    grid-row-start: 1;
    grid-row-end: 2;
    input {
      height: 45px;
      width: 90%;
      border: none;
      outline: none;
      background-color: #cfe5cf;
      font-size: 18px;
      text-indent: 0.5rem;
      margin-bottom: 10px;
      border-radius: 4px;
      &:focus {
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .question-descrition {
    grid-row-start: 2;
    grid-row-end: 3;
    textarea {
      width: 90%;
      height: 300px;
      resize: none;
      outline: none;
      font-size: 15px;
      padding: 0.5rem;
    }
  }
  .submit,
  .cancel {
    width: 60px;
    height: 30px;
    text-align: center;
    background-color: var(--normal-btn-color);
    border-radius: 4px;
    line-height: 30px;
    margin-top: 10px;
    color: #fff;
    :hover {
      cursor: pointer;
    }
  }
  .cancel {
    margin-top: 0;
    background-color: var(--error-btn-color);
  }
  .topic {
    position: absolute;
    right: 1.5rem;
    top: 9em;
    &:hover {
      cursor: pointer;
      color: green;
    }
    input {
      width: 130px;
      border-radius: 10px;
      height: 30px;
      border: none;
      outline: none;
      border: 1px solid black;
      font-size: 16px;
      text-indent: 0.6rem;
      color: #5b9d71;
    }
  }
}
</style>
