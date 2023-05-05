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
                <div class="slogn">
                  <span style="font-weight: 800; margin-right: 20px"
                    >个人简介</span
                  >
                  {{ userInfo.slogn }}
                </div>
              </div>
              <div class="detail-user">
                <ul>
                  <li>性别：{{ userInfo.gender == "male" ? "男" : "女" }}</li>
                  <li>邮箱：{{ userInfo.email }}</li>
                  <li>
                    职业：{{
                      userInfo.employments
                        ? "无业游民"
                        : userInfo.employments
                    }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import { getUserInfo } from "../api/user";
export default {
  components: { Header },
  data() {
    return {
      userInfo: {},
      size: "",
    };
  },
  methods: {
    async getUser() {
      const { data } = await getUserInfo(this.$route.params.userid);
      // console.log(data.data);
      this.userInfo = data.data.user;
    },
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
          width:320px;
          ul li {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
