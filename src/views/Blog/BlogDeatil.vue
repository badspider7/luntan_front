<template>
  <div>
    <Header :title="title" id="article-header"></Header>
    <div class="banner" style="">
      <div class="mask">
        <div class="page-header">
          <span class="subtitle">SassScript</span>
          <div class="post-time">
            <span>2021年3月23日</span>
          </div>
          <div class="post-btm">
            <span>18k字</span>
            <span>阅读人数：300</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Header.vue";
import Vditor from "../../utils/method.min.js";
export default {
  components: { Header },
  data() {
    return {
      title: "xx",
    };
  },
  methods: {},
  async mounted() {
    const res = await Vditor.md2html(
      `## 💡 简介[Vditor](https://b3log.org/vditor) 是一款浏览器端的 Markdown `
    );
    console.log(res);
  },
};
</script>
<style scoped lang="scss">
#article-header {
  // height: 52px;
  background-color: transparent;
  .el-header{
    background-color: transparent;
  }
}
.banner {
  color: #fff;
  width: 100vw;
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
      .post-time{
        margin-top: 1rem;
      }
      .post-btm{
        margin-top: .25rem;
        span:last-child{
            margin-left: 1rem;
        }
      }
    }
  }
}
</style>
