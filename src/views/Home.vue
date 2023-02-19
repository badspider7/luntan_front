<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <Header></Header>

      <!-- 主体 -->
      <main>
        <!-- sidebar -->
        <Sidebar></Sidebar>
        <!-- 轮播图 -->
        <el-carousel trigger="click">
          <el-carousel-item v-for="(item, index) in pictures" :key="index">
            <img :src="item.src" alt="hello" />
          </el-carousel-item>
        </el-carousel>
        <div class="body-content">
          <router-view></router-view>
        </div>
      </main>
      <!-- 底部 -->
      <Footer></Footer>
    </el-container>
    <el-backtop :bottom="150" :right="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          } "
      >
        <svg class="icon">
          <use xlink:href="#icon-fanhuidingbu"></use>
        </svg></div
    ></el-backtop>
  </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
export default {
  name: "Home",
  components: { Sidebar, Header },
  data() {
    return {
      input: "",
      pictures: [
        { src: require("../../public/Carousel/1.jpg") },
        { src: require("../../public/Carousel/2.jpg") },
        { src: require("../../public/Carousel/3.jpg") },
        { src: require("../../public/Carousel/4.jpg") },
      ],
      defaultHeight: {
        height: "",
      },
    };
  },
  methods: {
    //定义方法，获取高度减去头尾
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 52 + "px";
    },
  },
  created() {
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  // width: 1100px;
  flex-direction: column;
  margin: 0 auto;
}

main {
  position: relative;
  top: 66px;
  display: grid;
  grid-template-columns: 20% 80%;
  // display: flex;
  // justify-content: center;
  width: 1100px;
  margin: 0 auto;
  margin-bottom: 30px;
  .el-carousel {
    width: 600px;
    height: 335px;
    // margin-top: 53px;
    .el-carousel__item {
      width: 600px;
      height: 335px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .body-content {
    // position: absolute;
    // top: 421px;
    grid-column-start: 1;
    grid-column-end: 3;
    width: 100%;
    margin: 0 auto;
    margin-top: 80px;
  }
}
</style>
