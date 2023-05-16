<template>
  <div id="FollowerList">
    <div v-if="followerList.length == 0" class="noFollower">
      您还没有粉丝,继续努力吧!!
    </div>
    <div
      class="List-item"
      v-if="followerList.length !== 0"
      v-for="follower in followerList"
      :key="follower._id"
    >
      <div class="list-wrapper">
        <div class="avatar">
          <router-link to="/user/id">
            <img :src="follower.avatar_url" alt="" />
          </router-link>
        </div>
        <div class="right">
          <router-link class="following-info" to="/user/id">
            {{ follower.username }}
          </router-link>
          <span class="follower-tip">关注了你</span>
          <div class="slogn">个人简介： {{ follower.slogn }}</div>
        </div>
        <div v-if="false">
          <div class="extra" ref="extra">
            <!-- 关注作者  bug-->
            <div
              class="extra-body"
              v-if="!isFollowing"
              @click="getFollowing(follower)"
            >
              <svg class="icon">
                <use xlink:href="#icon-jiaguanzhuhuati"></use>
              </svg>
              <span>关注</span>
            </div>
            <!-- 取消关注 -->
            <div
              class="extra-body deleteFollower"
              v-if="isFollowing"
              @click="getCancelFollowing(follower)"
            >
              <svg class="icon">
                <use xlink:href="#icon-jiaguanzhuhuati"></use>
              </svg>
              <span>取消关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { followerList, following, cancelFollowing } from "../api/user";
import { getItem } from "../utils/storage";
export default {
  data() {
    return {
      followerList: {},
      isFollowing: false,
    };
  },
  methods: {
    async getFollowerList() {
      try {
        const { data } = await followerList(getItem("user").id);
        this.followerList = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    //关注
    async getFollowing(follower) {
      try {
        const { data } = await following(follower._id);
        this.$message({
          type: "success",
          message: "关注成功!",
          duration: 1500,
        });
        console.log(follower);
        this.isFollowing = true;
      } catch (err) {
        this.$message({
          type: "error",
          message: err.response.data.msg,
          duration: 1500,
        });
      }
    },
    //取消关注
    async getCancelFollowing(follwer) {
      try {
        const { data } = await cancelFollowing(follwer._id);
        // console.log(this.$refs.extra);
        // this.$refs.extra.getElementsByClassName.backgroundColor = "#ccc";
        this.$message({
          type: "success",
          message: "取消关注成功!",
          duration: 1500,
        });
        this.isFollowing = false;
      } catch (err) {
        this.$message({
          type: "error",
          message: err.response.data.msg,
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.getFollowerList();
  },
};
</script>
<style scoped lang="scss">
#FollowerList {
  .noFollower {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 20px;
  }
  // #FollowerList:nth-last-of-type(n){
  //   color: red;
  // }
  .List-item {
    padding: 16px 20px;
    .list-wrapper {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 10px;
    }
    .avatar {
      img {
        height: 60px;
        width: 60px;
      }
    }
    .right {
      margin-left: 20px;
      flex: 1 1;
      overflow: hidden;
      .following-info {
        font-weight: 600;
      }
      .follower-tip {
        font-size: 12px;
        background-color: #f6f6f6;
        border-radius: 3px;
        color: #8590a6;
        margin-left: 8px;
        padding: 1px 6px;
      }
      .slogn {
        margin-top: 10px;
      }
    }
    .extra {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 43px;
      background-color: var(--normal-btn-color);
      border-radius: 4px;
      color: #fff;
      &:hover {
        cursor: pointer;
      }
      .extra-body {
        // height: 100%;
        .icon {
          margin-right: 5px;
        }
      }
      .deleteFollower {
        font-size: 14px;
        // background-color: #8590a6;
      }
    }
  }
}
</style>
