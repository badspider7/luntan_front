<template>
  <div class="SideBar">
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
          <el-button type="primary" @click="showDrawer">
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
                <router-link to="/category">
                  <i class="el-icon-menu"></i>
                  <span>文章分类</span>
                </router-link>
              </li>
              <li class="item-collecting">
                <router-link to="/collections">
                  <i class="el-icon-coin"></i>
                  <span>公共信息</span>
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
              <li class="item-front">
                <router-link to="/tags">
                  <i class="el-icon-brush"></i>
                  <span>话题</span>
                </router-link>
              </li>
              <!-- <li class="item-backEnd">
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
              </li> -->
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    createArticle() {
      this.$router.push({ name: "createQuestion" });
    },
    //提出问题
    showDrawer() {
      // let visible = !this.$store.state.visible

      this.$store.commit("isShowDrawer", true);
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
