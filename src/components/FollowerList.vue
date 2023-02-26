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
        <div class="extra">
          <!-- 关注作者 -->
          <!-- <div class="extra-body">
            <svg class="icon">
              <use xlink:href="#icon-jiaguanzhuhuati"></use>
            </svg>
            <span>关注</span>
          </div> -->
          <!-- 取消关注 -->
          <div class="extra-body deleteFollower">
            <svg class="icon">
              <use xlink:href="#icon-jiaguanzhuhuati"></use>
            </svg>
            <span>取消关注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { followerList } from "../api/user";
import { getItem } from "../utils/storage";
export default {
  data() {
    return {
      followerList: {},
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
      &:hover{
        cursor: pointer;
      }
      .extra-body {
        .icon{
          margin-right: 5px;
        }
      }
      .deleteFollower{
        font-size: 14px;
      }
    }
  }
}
</style>
