<template>
  <div>
    <article class="post-item">
      <header>
        <ul>
          <li class="item-userImg">
            <router-link class="questioner-avatar" to="/user/id">
              <el-avatar :src="answerInfo.answerer.avatar_url"></el-avatar>
            </router-link>
          </li>
          <li class="item-user" ref="itemUser">
            <router-link to="/user/id" class="user-id">
              <span>{{ answerInfo.answerer.username }}</span>
            </router-link>
          </li>
          <li class="post-time">
            <span>{{ answerInfo.createdAt.split("T")[0] }}</span>
          </li>
        </ul>
      </header>
      <div class="post-body" v-html="`${answerInfo.content}`"></div>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {};
    },
  props:['answerInfo','questionInfo'],
    methods: {},
    mounted() {
        //判断是否是楼主
        if (this.questionInfo.questioner._id != this.answerInfo.answerer._id) {
            //如果不是楼主的话
            this.$refs.itemUser.children[0].className = '';
        }
    },
    updated() {
  }
};
</script>
<style scoped lang="scss">
.post-item {
  border-bottom: 1px solid #e4f6e9;
  &:last-child {
          border-bottom: none;
        }
  header {
    padding: 20px;
  }
  ul {
    display: flex;
    li {
      margin-right: 20px;
    }
    .item-userImg {
      .el-avatar {
        width: 64px;
        height: 64px;
      }
    }
    .item-user {
      font-size: 14px;
      font-weight: bold;
      .user-id {
        &::after {
          content: "楼主";
          padding-left: 10px;
          padding-right: 10px;
          color: rgb(255, 255, 255);
          font-size: 12px;
          margin-left: 14px;
          background: rgb(240, 93, 29);
          border-radius: 4px;
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }
    .post-time {
      font-size: 13px;
      color: #669974;
    }
  }
  .post-body {
    position: relative;
    left: 100px;
    top: -51px;
    max-width: 55vw;
  }
}
</style>
