<template>
  <div class="SideBar">
    <div style="display: none">
      <createQuestion></createQuestion>
    </div>
    <nav class="sideNav">
      <ul>
        <li class="item-navDiscussion">
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            @click="createArticle"
            >创建文章</el-button
          >
        </li>
        <li class="item-navDiscussion">
          <el-button type="primary" @click="createQuestion">
            <svg class="icon">
              <use xlink:href="#icon-tubiaozhizuomoban-"></use>
            </svg>
            提问题
          </el-button>
        </li>
        <li class="item-nav">
          <div class="item-count">
            <ul>
              <li class="item-tags">
                <router-link to="/">
                  <i class="el-icon-menu"></i>
                  <span>文章分类</span>
                </router-link>
              </li>
              <li class="item-blogs">
                <router-link to="/blog">
                  <i class="el-icon-chat-round"></i>
                  <span>博客</span>
                </router-link>
              </li>

              <li class="item-following">
                <router-link to="/following">
                  <i class="el-icon-star-off"></i>
                  <span>关注</span>
                </router-link>
              </li>
              <li class="item-collecting">
                <router-link to="/collections">
                  <i class="el-icon-coin"></i>
                  <span>收藏</span>
                </router-link>
              </li>
              <li class="item-front">
                <a href="#">
                  <i class="el-icon-brush"></i>
                  <span>话题</span>
                </a>
              </li>
              <li class="item-backEnd">
                <a href="#">
                  <i class="el-icon-smoking"></i>
                  <span>后端</span>
                </a>
              </li>
              <li class="item-others">
                <a href="#">
                  <i class="el-icon-toilet-paper"></i>
                  <span>前端</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import createQuestion from "./createQuestion.vue";
export default {
  name: "SideBar",
  components: { createQuestion },
  data() {
    return {
      questionRootHtml: {},
    };
  },
  created() {
    //bug  debugger   提问题模块未完成
    this.$nextTick(() => {
      this.$on("getRootHTML", function (val) {
        this.questionRootHtml = val;
        console.log(val);
      });
    });
  },
  computed: {},
  methods: {
    createArticle() {
      this.$router.push({ name: "createQuestion" });
    },
    createQuestion() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提问题",
        message: h("p", null, [
          h("template", null, this.questionRootHtml), // 递归  子组件 dom 树
        ]),
        showCancelButton: true,
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        center: true,
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     done()
        //     // instance.confirmButtonLoading = true;
        //     // instance.confirmButtonText = "执行中...";
        //     // setTimeout(() => {
        //     //   done();
        //     //   setTimeout(() => {
        //     //     instance.confirmButtonLoading = false;
        //     //   }, 300);
        //     // }, 3000);
        //   } else {
        //     done();
        //   }
        // },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.SideBar {
  // position: absolute;
  // left: 180px;
  // top: 80px;
  margin-top: 30px;
  .sideNav {
    .item-navDiscussion {
      width: 190px;
      margin-bottom: 20px;
      .el-button {
        height: 45px;
        width: 100%;
        padding: 8px 20px;
        color: #fff;
        font-size: 13px;
        background-color: #07c160;
        .icon {
          font-size: 20px;
          margin-left: -20px;
        }
      }
    }
    .item-nav {
      ul li {
        margin-bottom: 10px;
        a {
          font-size: 13px;
          letter-spacing: 10px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #669974;
          &:hover {
            color: #00c860;
          }
          i {
            font-size: 15px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
