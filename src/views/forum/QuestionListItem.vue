<template>
  <div class="ArticleListItem">
    <div class="discussionListItem">
      <div class="discussionItem-content">
        <div class="item-avatar">
          <router-link to="/profile/2">
            <el-avatar :src="article.data.questioner.avatar_url"></el-avatar
          ></router-link>
        </div>
        <div class="item-body">
          <div class="article-contain">
            <div class="item-title">
              <router-link :to="`${article.data._id}`">{{
                article.data.title
              }}</router-link>
            </div>
            <div class="item-username">
              <router-link to="/profile/2">{{
                article.data.questioner.username
              }}</router-link
              >&nbsp;发布于&nbsp;21&nbsp;天前
            </div>
          </div>
          <div class="article-tag">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shengqian"></use>
            </svg>
            <router-link to="/tags/3">
              {{ article.data.topics[0] ? article.data.topics[0].name : "" }}
            </router-link>
          </div>
          <div class="deleteQuestion" @click="deleteQtion">
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteQuestion } from '../../api/question';
export default {
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    //删除问题
    async deleteQtion() {
      try {
        const { data } = await deleteQuestion(this.article.data._id)
        this.$message({
          message: "删除文章成功",
          type: "success",
          duration:1500
        })
      } catch (err) {
        console.log(err);
      }
     
      
    }
  },
};
</script>
<style scoped lang="scss">
.ArticleListItem {
  margin-bottom: 20px;
  padding: 10px;
  color: #7c7c7c;
  a {
    color: #7c7c7c;
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
      a:hover {
        color: chocolate;
      }
    }
    .item-username {
      position: absolute;
      bottom: 0px;
      left: 55px;
      font-size: 13px;
      a:hover {
        color: chocolate;
      }
    }
    .article-tag {
      position: absolute;
      right: 60px;
      top: 0px;
      background-color: rgb(238 225 219);
      padding: 7px;
      border-radius: 6px;
    }
    .deleteQuestion {
      position: absolute;
      right: 0;
      top: 2px;
      padding: 5px;
      color: #050505;
    }
  }
}
</style>
