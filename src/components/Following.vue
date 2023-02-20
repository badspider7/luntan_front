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
                <span style="font-weight:800;margin-right: 20px;">个人简介</span>
                {{ userInfo.slogn }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="followingList"></div>
    </div>
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
.following {
  .following-container {
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 54px;
    .author {
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
            padding: 8px;
            img {
              width: 168px;
              height: 168px;
            }
          }
        }
        .userInfo-content{
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
