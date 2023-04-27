<template>
  <div class="Tags">
    <Header></Header>
    <div class="container">
      <div class="body">
        <div class="banner">
          <div class="info">话题</div>
        </div>
        <div class="tags-all">
          <span class="tag-info" v-for="item in tagList" :key="item._id">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { TopicList } from "../api/topic";
export default {
  name: "Tags",
  components: { Header, Footer },
  data() {
    return {
      tagList: {},
    };
  },
  methods: {
    async getList() {
      const { data } = await TopicList();
      this.tagList = data.data;
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
      background: url("../../public/top8.jpg") center center / cover no-repeat;
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
      margin-top: -2rem;
      z-index: 7;
      padding: 60px 30px;
      border-radius: 5px;
      span{
        font-size: 20px;
        color: rgb(5, 7, 7);
        margin: 20px;
        &:hover{
          cursor: pointer;
          color: rgb(25, 112, 146);
        }
      }
    }
  }
}
</style>
