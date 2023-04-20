<template>
  <div>
    <h3>文章评论</h3>
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        <p>{{ comment.name }} 说：</p>
        <p>{{ comment.content }}</p>
        <p>{{ comment.time }}</p>
      </li>
    </ul>
    <form @submit.prevent="submitComment">
      <div>
        <label for="name">昵称：</label>
        <input type="text" v-model="newComment.name" />
      </div>
      <div>
        <label for="content">评论内容：</label>
        <textarea v-model="newComment.content" rows="5"></textarea>
      </div>
      <button type="submit">提交评论</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [], // 存储评论的数组
      newComment: {
        // 存储新发表的评论
        name: "",
        content: "",
        time: "",
      },
    };
  },
  methods: {
    submitComment() {
      // 获取当前时间
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      // 格式化时间
      const timeStr = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

      // 将新评论添加到 comments 数组中
      this.comments.push({
        name: this.newComment.name,
        content: this.newComment.content,
        time: timeStr,
      });

      // 清空新评论内容
      this.newComment.name = "";
      this.newComment.content = "";
    },
  },
};
</script>
<style scoped lang="scss"></style>
