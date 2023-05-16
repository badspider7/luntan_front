<template>
  <div class="profile">
    <Header></Header>
    <div class="container">
      <div class="wrapper">
        <div class="author">
          <div class="userCover">
            <img
              src="https://pic1.zhimg.com/v2-8ce3f498ab4e8a4736890573679de7d2_1440w.jpg?source=32738c0c"
              alt=""
            />
          </div>
          <div class="userInfo-wrapper">
            <div class="userInfo-main">
              <div class="userInfo-avatar">
                <div class="mask"></div>
                <div class="avatar">
                  <img :src="userInfo.avatar_url" alt="" />
                </div>
              </div>
              <div class="userInfo-content">
                <h3 class="username">
                  {{ userInfo.username }}
                </h3>
                <div class="modify-inner"  v-if="isModify">
                  <el-input v-model="userInfo.username"></el-input>
                </div>
                <div class="slogn">
                  <span style="font-weight: 800; margin-right: 20px"
                    >个人简介</span
                  >
                  {{ userInfo.slogn }}
                </div>
                <div class="modify-inner" v-if="isModify">
                  <el-input v-model="userInfo.slogn"></el-input>
                </div>
              </div>
              <div class="detail-user">
                <ul>
                  <li>性别：{{ userInfo.gender == "male" ? "男" : "女" }}</li>
                  <div class="modify-inner" v-if="isModify">
                    <el-input v-model="userInfo.gender"></el-input>
                  </div>
                  <li>邮箱：{{ userInfo.email }}</li>
                  <div class="modify-inner" v-if="isModify">
                    <el-input v-model="userInfo.email"></el-input>
                  </div>
                  <li>
                    职业：{{
                      userInfo.business
                    }}
                    <div class="modify-inner" v-if="isModify">
                      <el-input v-model="userInfo.business"></el-input>
                    </div>
                  </li>
                  <li>现居住地：{{ userInfo.locations }}</li>
                  <div class="modify-inner" v-if="isModify">
                  <el-input v-model="userInfo.locations"></el-input>
                </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modify">
          <el-button @click="isModify=true">修改信息</el-button>
          <el-button @click="modifyInfo" v-if="isModify">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import { getUserInfo, modifyUserInfo } from "../api/user";
export default {
  components: { Header },
  data() {
    return {
      userInfo: {},
      size: "",
      isModify: false
    };
  },
  methods: {
    async getUser() {
      const { data } = await getUserInfo(this.$route.params.userid);
      // console.log(data.data);
      this.userInfo = data.data.user;
    },

    async modifyInfo() {
      this.isModify = false
      const { data } = await modifyUserInfo(this.userInfo)
      this.$message({
        type: 'success',
        message:"个人信息修改成功"
      })
    }
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style scoped lang="scss">
.profile {
  .container {
    display: flex;
    justify-content: center;
    margin-top: 54px;
    .author {
      background-color: var(--body-bg-color);
      .userCover {
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          max-width: 1000px;
        }
      }
      .userInfo-wrapper {
        .userInfo-main {
          display: grid;
          grid-template-columns: 0.2fr 0.8fr;
        }
        .userInfo-avatar {
          position: relative;
          margin: 0 20px 24px;
          &::after {
            display: block;
            content: " ";
            width: 168px;
            height: 168px;
          }
          .avatar {
            position: absolute;
            top: -25px;
            border-radius: 4px;
            padding: 4px;
            background-color: #fff;
            img {
              width: 168px;
              height: 168px;
            }
          }
        }
        .userInfo-content {
          margin-top: 15px;
          .username {
            margin-bottom: 2rem;
          }
        }
        .detail-user {
          width: 320px;
          ul li {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}

.el-input{
  width: 200px;
}
</style>
