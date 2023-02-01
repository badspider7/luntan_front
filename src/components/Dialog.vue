<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible="show"
      :close-on-click-modal="false"
      :show-close="showClose"
      custom-class="custom-dialog"
      :width="width"
      :top="top"
      :modal-append-to-body="false"
      @close="close"
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onLoginAndRegister(opType)">
            {{ title }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { login, register } from "../api/user";
export default {
  // inject:[
  //   "LoginIs"
  // ],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "标题",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "30%",
    },
    top: {
      type: String,
      default: "50px",
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    opType: {
      type: Number,
    },
    formData: {
      type: Object,
    }
  },
  data() {
    return {};
  },
  computed: {
    // ...mapState(['loginIs'])
  },
  methods: {
    close() {
      this.$emit("close");
    },

    // 登录注册功能
    async onLoginAndRegister(type) {
      //注册功能
      if (type === 0) {
        try {
          const { data } = await register({
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
          });
          console.log(data);
          this.$message({
            message: "账号注册成功",
            type: "success",
            duration: 1500,
          });
        } catch (err) {
          this.$message({
            message: `账号注册失败,${err.response.data.msg}`,
            type: "error",
            duration: 1500,
          });
        }
      }
      //登录功能
      else if (type === 1) {
        try {
          const { data } = await login({
            email: this.formData.email,
            password: this.formData.password,
          });
          //将后端返回的token等用户信息放到vueX容器中
          this.$store.commit("setUser", {
            token: data.authorization.token,
            username: data.username,
            id: data.id,
            email: data.email,
            avatar_url: data.avatar_url,
          });
          //记住我  保存cookie信息
          if (this.formData.rememberMe) {
            let loginInfo = {
              email: this.formData.email,
              password: this.formData.password,
              rememberMe:this.formData.rememberMe
            };
            loginInfo = JSON.stringify(loginInfo)
            var d = new Date();
            d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toGMTString();
            document.cookie = `loginInfo=${loginInfo};expires = ${expires}`;
          } else {
            document.cookie = "loginInfo=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
          }
          this.close()

          this.$message({
            message: "登录成功",
            type: "success",
            duration: 1500,
          });
          //不能改props的数据
          this.$store.commit('setLoginIs',true)
        } catch (err) {
          this.$message({
            message: `登录失败,${err.response.data.msg}`,
            type: "error",
            duration: 1500,
          });
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.el-dialog__wrapper {
  .custom-dialog {
    color: green;
    .dialog-body {
      padding: 20px;
      max-height: calc(100vh - 180px);
      overflow: auto;
    }
  }
  .dialog-footer {
    .el-button {
      width: 320px;
      background-color: #07c160;
      color: #fff;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
.el-dialog__header {
  border-bottom: 1px solid #ccc;
}
</style>
