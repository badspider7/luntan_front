<template>
  <div class="ArticleListItem">
    <router-link to="/post/1" class="discussionListItem">
      <div class="discussionItem-content">
        <div class="item-avatar">
          <router-link to="/profile/2">
            <el-avatar :src="article.data.author.avatar_url"></el-avatar
          ></router-link>
        </div>
        <div class="item-body">
          <div class="article-contain">
            <div class="item-title">
              <router-link to="/post/1">{{ article.data.title }}</router-link>
            </div>
            <div class="item-username">
              <router-link to="/profile/2">{{ article.data.author.username }}</router-link
              >&nbsp;发布于&nbsp;21&nbsp;天前
            </div>
          </div>
          <div class="article-tag">
            <router-link to="/tag/3">{{ article.data.category.name }}</router-link>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.ArticleListItem {
  margin-bottom: 20px;
  padding: 10px;
  color: #7c7c7c;
  a{
    color: #7c7c7c;
  }
  a:hover{
        color:#a75050
      }
  
  &:hover {
    background-color: #f2fbf4;
    cursor: pointer;
  }
  .discussionItem-content {
    display: flex;
    position: relative;
    .item-avatar {
      margin-right: 20px;
    }
    .item-title {
      font-size: 15px;
    }
    .item-username {
      position: absolute;
      bottom: 0px;
      left: 55px;
      font-size: 13px;
    }
    .article-tag {
      position: absolute;
      right: 60px;
      top: 0px;
    }
  }
}
</style>
