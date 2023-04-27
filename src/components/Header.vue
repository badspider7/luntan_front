<template>
  <div>
    <el-header>
      <h1 class="Header-title">
        <router-link to="/">
          <img
            src="https://wyz.xyz/assets/logo-ajxkruuo.png"
            alt="廿一"
            class="Header-logo"
          />
        </router-link>
      </h1>
      <div class="hitokoto" v-show="isShowSlogan">
        <span title="https://hitokoto.cn/">{{ title ? title : poem }}</span>
      </div>
      <div class="Header-secondary">
        <ul class="Header-controls">
          <li class="search-input">
            <div class="search" ref="search">
              <input
                type="text"
                v-model="input"
                class="FormControl"
                placeholder="搜索"
                @focus="isShowSlogan = false"
                @blur="inputBlur"
                @keydown.enter="search"
              />
              <div class="search-content" v-show="isShowSearch">
                <div class="art">
                  <div v-for="item in searchInfo.article" :key="item._id">
                    <router-link
                      :to="`/blog/${item._id}`"
                      @click="console.log(1)"
                      >{{ item.title }}</router-link
                    >
                  </div>
                </div>
                <div class="art">
                  <div v-for="item in searchInfo.question" :key="item._id">
                    <router-link :to="`/${item._id}`">{{
                      item.title
                    }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="item-chatRoom">
            <div class="chatRoom">
              <a href="http://localhost:3001" target="_blank">聊天室</a>
            </div>
          </li>
          <li class="item-singUp" v-if="!loginIs">
            <div class="singUp">
              <a href="#" @click="loginAndRegister(0)">注册</a>
            </div>
          </li>
          <li class="item-logIn" v-if="!loginIs">
            <div class="login">
              <a href="#" @click="loginAndRegister(1)">登录</a>
            </div>
          </li>
          <li class="item-dropDown" v-if="loginIs">
            <el-dropdown trigger="click" @visible-change="changeStyle">
              <button class="el-dropdown-link" ref="dropdownBtn">
                <el-avatar :src="$store.state.user.avatar_url"></el-avatar>
                <span class="username">{{ $store.state.user.username }}</span>
              </button>

              <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid">
                  <router-link to="/profile">个人主页</router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-tools">设置</el-dropdown-item>
                <el-dropdown-item :divided="true" icon="el-icon-caret-right"
                  ><span @click="exitLogin">退出</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="aboutMe">
            <router-link to="/aboutme"><span>关于我</span></router-link>
          </li>
        </ul>
      </div>
      <LoginAndRegister ref="loginAndRegisterRef"></LoginAndRegister>
    </el-header>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { poetry } from "../api/user";
import { removeItem } from "../utils/storage";
import LoginAndRegister from "../views/LoginAndRegister.vue";
import { search } from "../api/article";
export default {
  components: { LoginAndRegister },
  props: ["title"],
  data() {
    return {
      input: "",
      isShowSlogan: true,
      isShowSearch: false,
      poem: "",
      searchInfo: {},
    };
  },
  computed: {
    ...mapState(["loginIs"]),
  },
  methods: {
    inputBlur() {
      this.isShowSlogan = true;
      this.isShowSearch = false;
    },
    //登录注册
    loginAndRegister(type) {
      this.$refs.loginAndRegisterRef.showPanel(type);
    },
    //修改button的样式
    changeStyle(e) {
      if (e) {
        this.$refs.dropdownBtn.classList.add("btn-click");
      } else {
        this.$refs.dropdownBtn.classList.remove("btn-click");
      }
    },
    //判断是否登录
    isLogin() {
      // this.loginIs = document.cookie ? true : false;
      this.$store.commit(
        "setLoginIs",
        localStorage.getItem("user") ? true : false
      );
    },
    //退出登录
    exitLogin() {
      this.$store.commit("setLoginIs", false);
      removeItem("user");
      // this.loginIs = false;
    },
    //跳转到个人页面
    profile() {
      debugger;
      console.log(1);
      this.$router.push("/profile");
    },

    //模糊搜索
    async search() {
      try {
        if (this.input.trim().length == 0) {
          this.$notify({
            title: "失败",
            message: "不能输入为空",
            type: "error",
          });
        } else {
          const { data } = await search(this.input);
          if (data.code == 200) {
            this.isShowSearch = true;
            this.searchInfo = data.data;
          } else {
            this.$notify({
              title: "查找失败",
              message: "没有你想要查找的数据",
              type: "warning",
            });
            this.input = '';
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  async mounted() {
    try {
      const { data } = await poetry();
      this.poem = data.data;
      this.isLogin();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style scoped lang="scss">
.btn-click {
  background-color: #e4f6e9 !important ;
  box-shadow: 2px 3px 2px #697e6f inset;
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px !important;
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid;
  border-bottom-color: #e4f6e9;
  z-index: 99;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  .Header-secondary {
    margin-left: 155px;
    position: relative;
    bottom: 8px;
    ul {
      position: absolute;
      right: 150px;
      .search-input {
        padding: 8px 13px;
        input {
          height: 36px;
          width: 225px;
          padding-left: 32px;
          padding-right: 32px;
          font-size: 13px;
          background-color: #e4f6e9;
          color: #333;
          outline: none;
          border-radius: 4px;
          border: 2px solid transparent;
          transition: all 0.4s ease-in-out;
          &::placeholder {
            color: #669974;
          }
          &:focus {
            width: 400px;
            background-color: #fff;
            margin-left: -400px;
            border-color: #07c160;
          }
        }
        .search-content {
          min-height: 100px;
          position: absolute;
          width: 400px;
          border-radius: 4px;
          background-color: #f2fbf4;
          left: -390px;
          padding: 10px;
          .art {
            margin-bottom: 10px;
            div {
              color: #054016;
              text-align: left;
              margin-bottom: 5px;
              padding-left: 5px;
            }
          }
        }
      }
      .item-dropDown {
        button {
          border-radius: 18px;
          border: none;
          user-select: none;
          background: transparent;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          line-height: 20px;
          white-space: nowrap;
          padding: 3px 13px;

          &:hover {
            background-color: #e4f6e9;
          }

          .username {
            position: relative;
            bottom: 3px;
          }
        }
        .el-avatar {
          position: relative;
          top: 3px;
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
      li {
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
        a,
        span {
          font-size: 13px;
          color: #669974;
          &:hover {
            cursor: pointer;
            color: #07c160;
          }
        }
      }
      & :last-child {
        margin-right: 0;
      }
    }
  }
  .Header-title {
    float: left;
    font-size: 18px;
    max-height: 30px;
    margin-left: 170px;
    margin-top: 4px;
    img {
      max-height: 30px;
    }
  }
  .hitokoto {
    position: absolute;
    left: 34%;
    top: 29%;
    span {
      color: #76a591;
    }
  }
}
</style>
