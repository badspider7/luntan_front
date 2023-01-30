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
        <span>今年花落颜色改，明年花开复谁在？</span>
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
                @focus="isShowSlogan=false"
                @blur="isShowSlogan=true"
              />
            </div>
          </li>
          <li class="item-chatRoom">
            <div class="chatRoom">
              <router-link to="/chatroom">聊天室</router-link>
            </div>
          </li>
          <li class="item-singUp">
            <div class="singUp">
              <a href="#" @click="loginAndRegister(0)">注册</a>
            </div>
          </li>
          <li class="item-logIn">
            <div class="login">
              <a href="#"  @click="loginAndRegister(1)">登录</a>
            </div>
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
// import Dialog from './Dialog.vue'
import LoginAndRegister from '../views/LoginAndRegister.vue';
export default {
  components: { LoginAndRegister },
  data() {
    return {
      input: "",
      isShowSlogan: true,
    };
  },
  methods: {
    //登录注册
    loginAndRegister(type) {
      this.$refs.loginAndRegisterRef.showPanel(type)
    }

  }
}
</script>
<style scoped lang="scss">
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
  .hitokoto{
    position: absolute;
    left: 34%;
    top: 29%;
    span{
      color: #76a591;
    }
  }
}
</style>
