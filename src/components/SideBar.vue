<template>
  <div class="SideBar">
    <nav class="sideNav">
      <ul>
        <li class="item-navDiscussion">
          <el-button type="primary" icon="el-icon-edit-outline"
            >提问题</el-button
          >
        </li>
        <li class="item-nav">
          <div class="item-count">
            <ul>
                <li class="item-tags">
                <router-link to="/" >
                  <i class="el-icon-menu"></i>
                  <span>全部标签</span>
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
                <router-link to="/collecting">
                  <i class="el-icon-coin"></i>
                  <span>收藏</span>
                </router-link>
              </li>
              <li class="item-front">
                <a href="#">
                  <i class="el-icon-brush"></i>
                  <span>前端</span>
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
                  <span>其他</span>
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
export default {
  name: "SideBar",
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.SideBar {
  position: absolute;
  left: 180px;
  top: 80px;
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
          &:hover{
            color: #00C860;
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
