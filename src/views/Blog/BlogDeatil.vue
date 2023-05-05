<template>
  <div class="article-detail">
    <Header  id="article-header"></Header>
    <div class="banner" style="">
      <div class="mask">
        <div class="page-header">
          <span class="subtitle">{{ articleInfo.title }}</span>
          <div class="post-time">
            <span>{{ articleInfo.createdAt }}</span>
          </div>
          <div class="post-btm">
            <!-- <span>18k字</span> -->
            <span class="delete" v-if="isShowDelete" @click="deleteArticle"
              >删除</span
            >
            <span>阅读人数:&nbsp;&nbsp;&nbsp;{{ articleInfo.view }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="catelog"></div>
        <div class="board">
          <article class="board-container"></article>
        </div>
        <div class="author"></div>
        <!-- <comment></comment> -->
        <article class="comments">
          <div id="vcomments"></div>
        </article>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../../components/Header.vue";
import Vditor from "../../utils/method.min.js";
import { getArticle, deleteArt } from "../../api/article";
// import comment from "../../components/comment.vue";
import Valine from "valine";
export default {
  components: { Header },
  data() {
    return {
      // title: "xx",
      articleInfo: {},
      isShowDelete: false,
    };
  },
  methods: {
    //获取文章详情
    async articleDetail() {
      // console.log(this.$router.currentRoute.params.articleId);
      const { data } = await getArticle(
        this.$router.currentRoute.params.articleId
      );
      this.articleInfo = data.data;
      let user = window.localStorage.getItem("user");

      if (JSON.parse(user).id == this.articleInfo.author._id) {
        this.isShowDelete = true;
      }
      //把拿到的数据渲染到页面上去
      const previewElement = document.querySelector(".board-container");
      const html = await Vditor.md2html(`${this.articleInfo.content}`);
      Vditor.preview(
        previewElement, // 使用该元素进行渲染
        html, // 需要渲染的 markdown 原文
        {
          mode: "dark",
          anchor: 2, // 为标题添加锚点 0：不渲染；1：渲染于标题前；2：渲染于标题后，默认 0
          speech: {
            // 对选中后的内容进行阅读
            enable: true,
          },
          hljs: {
            enable: true,
            lineNumber: true,
            style: "monokai", //https://xyproto.github.io/splash/docs/longer/all.html?utm_source=ld246.com
          },
          lazyLoadImage: "../../../public/sass.jpg",
          markdwon: {
            autoSpace: true,
            toc: true,
            mark: true,
          },
        }
      );

      previewElement.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
          Vditor.previewImage(event.target);
        }
      });
    },

    //删除文章
    async deleteArticle() {
      try {
        const { data } = await deleteArt(this.articleInfo._id);
        console.log(data);
        this.$message({
          type: 'success',
          message:"删除文章成功"
        })
        this.$router.push({path:'/blog',replace:true})
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.articleDetail();
    new Valine({
      el: "#vcomments",
      appId: "b0eJrfmaMaPyjkhrrSb0yDYw-gzGzoHsz",
      appKey: "CNysLU0B0JfijaeVpk8Xko7a",
      placeholder: "hi,我是小宁",
      pageSize: 15,
      visitor: true,
      recordIP: true,
      enableQQ: true,
      path: window.location.href,
    });
  },
};
</script>
<style scoped lang="scss">
#article-header {
  // height: 52px;
  background-color: transparent;
  .el-header {
    background-color: transparent;
  }
}
.banner {
  color: #fff;
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  cursor: default;
  overflow-wrap: break-word;
  background: url(https://badspider.top/img/sass.jpg) center center / cover
    no-repeat;
  transform: translate3d(0px, 0px, 0px);
  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .page-header {
      color: #fff;
      max-width: calc(960px - 6rem);
      width: 80%;
      margin: 0 auto;
      text-align: center;
      .subtitle {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
      }
      .post-time {
        margin-top: 1rem;
      }
      .post-btm {
        margin-top: 0.25rem;
        .delete {
          cursor: pointer;
          &:hover {
            color: rgb(44, 115, 181);
          }
        }
        span:last-child {
          margin-left: 1rem;
        }
      }
    }
  }
}

.main {
  .container {
    // height: 100vh;
    display: grid;
    grid-template-columns: 17% 66% 17%;
    background-color: var(--body-bg-color);

    .board {
      position: relative;
      max-width: 1140px;
      background-color: #fff;
      padding-top: 3rem;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 3rem;
      margin-top: -2rem;
      transition: background-color 0.2s ease-in-out;
      border-radius: 0.5rem;
      z-index: 3;
      box-shadow: 0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);
      font-size: 1rem;
      line-height: 1.6;
      word-wrap: break-word;
      .board-container {
        padding-left: 10%;
        padding-right: 10%;
        p {
          a {
            color: #2da56c !important;
          }
        }
      }
    }
  }
  .comments {
    grid-column-start: 2;
    margin-top: 2em;
  }
}
</style>
