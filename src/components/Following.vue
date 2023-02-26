<template>
  <div class="following">
    <Header></Header>
    <div class="following-container">
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
          </div>
        </div>
      </div>
      <div class="followingList">
        <div class="list-header">
          <ul>
            <li>
              <router-link to="/following/" active-class="clickList"
                >我关注的人</router-link
              >
            </li>
            <li>
              <router-link :to="{name:'follower'}" active-class="clickList"
                >关注我的人</router-link
              >
            </li>
          </ul>
        </div>
        <router-view :followingList="followingList"></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { followingList } from "../api/user";
import { getItem } from "../utils/storage";
export default {
  name: "following",
  data() {
    return {
      userInfo: {},
      followingList: {},
    };
  },
  mounted() {
    this.getFollowingList();
  },
  computed: {},
  methods: {
    async getFollowingList() {
      try {
        const { data } = await followingList(getItem("user").id);
        this.userInfo = data.data;
        this.followingList = data.data.following;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.noFollower {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 20px;
}
.following {
  background-color: #f6f6f6;
  .following-container {
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 64px;
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
            margin-bottom: 1rem;
          }
        }
      }
    }
    .followingList {
      margin: 10px auto;
      background-color: var(--body-bg-color);
      .list-header {
        margin: 0 30px;
        border-top: 1px solid #e4f6e9;
        border-bottom: 1px solid #e4f6e9;
        .clickList {
          font-weight: 600;
        }
        ul {
          height: 50px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: center;
          li {
            margin-right: 25px;
            font-size: 15px;
            :hover {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>
