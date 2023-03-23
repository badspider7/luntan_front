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
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { createQuestion } from "../api/question";
export default {
  data() {
    return {
      // drawer: false,
      title: "",
      description: "",
      direction: "btt",
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

    //提交问题
    async submit() {
      const { data } = await createQuestion({
        title: this.title,
        description: this.description,
      });
      console.log(data);
    },
    //取消提交
    cancel() {},
  },
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
}
</style>
