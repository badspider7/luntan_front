<template>
  <div id="FollowingList">
    <div v-if="followingList.length == 0" class="noFollower">
      您还没有关注的人，快去关注吧！
    </div>
    <div class="List" v-for="user in followingList" :key="user._id" v-if="followingList.length != 0">
      <div class="list-wrapper">
        <div class="avatar">
          <router-link to="/user/id">
            <img :src="user.avatar_url" alt="" />
          </router-link>
        </div>
        <div class="right">
          <router-link class="following-info" to="/user/id">
            {{ user.username }}
          </router-link>
          <div class="slogn">个人简介： {{ user.slogn }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { following } from '../api/user';

export default {
  props: ["followingList"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.List {
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
    .following-info {
      font-weight: 600;
    }
    .slogn {
      margin-top: 10px;
    }
  }
}
</style>
