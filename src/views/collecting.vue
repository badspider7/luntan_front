<template>
  <div class="Tags">
    <Header></Header>
    <div class="container">
      <div class="body">
        <div class="banner">
          <div class="info">头条热搜</div>
        </div>
        <div class="tags-all" v-for="(item, index) in newsList" :key="index">
          <div class="pic">
            <img :src="item.imgsrc" alt="" />
          </div>
          <div class="content">
            <a :href="item.pc_url" target="_blank">{{ item.title }}</a>
            <div class="news-info">
              <span>分类:{{ item.source }}</span>
              <span>发布时间：{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { TopicList, News } from "../api/topic";
export default {
  name: "Tags",
  components: { Header, Footer },
  data() {
    return {
      tagList: {},
      newsList: {},
    };
  },
  methods: {
    async getList() {
      // const { data } = await TopicList();
      const { data } = await News();
      const res = data.data;
      this.tagList = JSON.parse(res);
      this.newsList = this.tagList.data;
    },
  },
  computed: {},
  mounted() {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
.Tags {
  .container {
    margin-top: 50px;
    .banner {
      height: 420px;
      background: url("../../public/server-banner.jpg") center center / cover
        no-repeat;
      transform: translate3d(0px, 0px, 0px);
      .info {
        color: white;
        width: 170px;
        height: 60px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        text-align: center;
      }
    }
    .tags-all {
      width: 60vw;
      margin: 0 auto;
      background-color: rgb(255, 255, 255);
      position: relative;
      // margin-top: -2rem;
      z-index: 7;
      padding: 20px 30px;
      border-radius: 5px;
      display: flex;

      .pic {
        img {
          width: 200px;
          height: 100px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        // align-items: center;
        .news-info{
          margin-top: 20px;
          span{
            margin-left: 15px;
          }
        }
        a:hover {
          cursor: pointer;
          color: rgb(40, 183, 128);
        }
      }
    }
  }
}
</style>
