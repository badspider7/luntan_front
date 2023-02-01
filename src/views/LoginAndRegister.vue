<template>
  <div>
    <Dialog
      :show="dialogConfig.showDialog"
      @close="dialogConfig.showDialog = false"
      :title="dialogConfig.title"
      width="400px"
      :showCancel="false"
      :opType="opType"
      :formData="formData"
    >
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item class="loginButtons">
          <button>
            <i class="el-icon-chat-dot-round"></i>
            <span>微信账号登录</span>
          </button>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            size="large"
            placeholder="请输入邮箱"
            v-model="formData.email"
            prefix-icon="el-icon-wallet"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="username" v-if="opType == 0">
          <el-input
            size="large"
            placeholder="请输入用户名"
            v-model="formData.username"
            prefix-icon="el-icon-s-custom"
          >
          </el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input
            size="large"
            placeholder="请输入密码"
            v-model="formData.password"
            prefix-icon="el-icon-lock"
            show-password
          >
          </el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="configPassword" v-if="opType == 0">
          <el-input
            size="large"
            placeholder="请确认密码"
            v-model="formData.configPassword"
            prefix-icon="el-icon-lock"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="remeberme-panel" v-if="opType == 1">
            <input type="checkbox" v-model="formData.rememberMe" />
            <span>记住我的登录状态</span>
          </div>
          <div class="not-account">
            <div class="footer-sinUP" v-if="opType == 1">
              <a href="javascript:void(0)" @click="showPanel(2)">忘记密码？</a>
              <div>
                还没有账户?
                <a href="javascript:void(0)" @click="showPanel(0)">立即注册</a>
              </div>
            </div>
            <div class="footer-sinIn" v-if="opType == 0">
              <span>已有账户？</span>
              <a href="javascript:void(0)" @click="showPanel(1)">登录</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog.vue";
export default {
  components: { Dialog },
  props:['LoginIs'],
  data() {
    return {
      opType: 0, //0:注册  1:登录  2； 重置密码
      dialogConfig: {
        showDialog: false,
        title: "标题",
      },
      formData: {
        email: "",
        password: "",
        configPassword: "",
        rememberMe: false,
        username: "",
      },
      //密码显示与隐藏操作
      passwordEyeType: {
        passwordEyeOpen: false,
        // registerPasswordEyeOpen: false,
        configPasswordEyeOpen: false,
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { max: 30, message: "邮箱太长" },
          { validator: this.$Verify.email, message: "请输入正确的邮箱" },
        ],
        password: [
          { required: true, message: "请输入密码" },
          { max: 18, message: "密码不能超过18位" },
          { min: 6, message: "密码不能低于6位" },
        ],
        username: [{ required: true, message: "请输入用户名" }],
        configPassword: [
          { required: true, message: "请再次输入密码" },
          { validator: this.checkRePassword, message: "两次的密码不匹配" },
        ],
      },
    };
  },
  methods: {
    //检查两次密码是否匹配
    checkRePassword(rule, value, callback) {
      if (value !== this.formData.password) {
        return callback(new Error(this.rules.message));
      } else {
        callback();
      }
    },
    //重置表单
    resetForm() {
      this.dialogConfig.showDialog = true;
      if (this.opType === 0) {
        this.dialogConfig.title = "注册";
      } else if (this.opType === 1) {
        this.dialogConfig.title = "登录";
      } else {
        this.dialogConfig.title = "重置密码";
      }
      this.$nextTick(() => {
        this.$refs.formDataRef.resetFields();

        //登录 从cookie中拿到数据 
        if (this.opType == 1) {
          const cookieLoginInfo = document.cookie
          if (cookieLoginInfo) {
            this.formData = JSON.parse(cookieLoginInfo.split('=')[1])
          }
        }
      });
    },

    //展示登录注册面板
    showPanel(type) {
      this.opType = type;
      this.resetForm();
    },
  },
};
</script>
<style scoped lang="scss">
.el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.loginButtons {
  margin-bottom: 25px;
  button {
    width: 100%;
    height: 46px;
    color: #fff;
    background-color: #51c332;
    border-radius: 4px;
    font-size: 13px;
    border: none;
    &:hover {
      cursor: pointer;
    }
    i {
      font-size: 18px;
      margin-right: 4px;
    }
  }
}
.remeberme-panel {
  float: left;
  color: #6a9c78;
  input {
    margin-right: 10px;
  }
}
.not-account {
  position: relative;
  right: -20px;
  a {
    color: #29d17a;
  }
  div[data-v-c752bbaa] {
    margin-right: 3vh;
  }
}
</style>
