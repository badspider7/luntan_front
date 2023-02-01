<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <Header></Header>
      <!-- <el-header>
        <h1 class="Header-title">
          <a href="#">
            <img
              src="https://wyz.xyz/assets/logo-ajxkruuo.png"
              alt="廿一"
              class="Header-logo"
            />
          </a>
        </h1>
        <div class="Header-secondary">
          <ul class="Header-controls">
            <li class="search-input">
              <div class="search">
                <input
                  type="text"
                  v-model="input"
                  class="FormControl"
                  placeholder="搜索"
                />
              </div>
            </li>
            <li class="item-chatRoom">
              <div class="chatRoom">
                <router-link to="/chatroom">聊天室</router-link>
              </div>
            </li>
            <li class="item-singUp">
              <div class="singUp">
                <a href="#">注册</a>
              </div>
            </li>
            <li class="item-logIn">
              <div class="login">
                <a href="#">登录</a>
              </div>
            </li>
            <li class="aboutMe">
              <router-link to="/aboutme"><span>关于我</span></router-link>
            </li>
          </ul>
        </div>
      </el-header> -->
      <!-- 主体 -->
      <el-main :style="defaultHeight">
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
      </el-main>
      <!-- 底部 -->
    </el-container>
  </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
export default {
  name: "Home",
  components: { Sidebar ,Header},
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
  margin: 0 auto;
}

// .el-header {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   height: 52px !important;
//   background-color: #fff;
//   color: #333;
//   text-align: center;
//   padding: 8px;
//   border-bottom: 1px solid;
//   border-bottom-color: #e4f6e9;
//   z-index: 99;
//   .Header-secondary {
//     margin-left: 155px;
//     position: relative;
//     bottom: 8px;
//     ul {
//       position: absolute;
//       right: 150px;
//       .search-input {
//         padding: 8px 13px;
//         input {
//           height: 36px;
//           width: 225px;
//           padding-left: 32px;
//           padding-right: 32px;
//           font-size: 13px;
//           background-color: #e4f6e9;
//           color: #333;
//           outline: none;
//           border-radius: 4px;
//           border: 2px solid transparent;
//           transition: all 0.4s ease-in-out;
//           &::placeholder {
//             color: #669974;
//           }
//           &:focus {
//             width: 400px;
//             background-color: #fff;
//             margin-left: -400px;
//             border-color: #07c160;
//           }
//         }
//       }
//       li {
//         display: inline-block;
//         vertical-align: middle;
//         margin-right: 15px;
//         a,
//         span {
//           font-size: 13px;
//           color: #669974;
//           &:hover {
//             cursor: pointer;
//             color: #07c160;
//           }
//         }
//       }
//       & :last-child {
//         margin-right: 0;
//       }
//     }
//   }
//   .Header-title {
//     float: left;
//     font-size: 18px;
//     max-height: 30px;
//     margin-left: 170px;
//     img {
//       max-height: 30px;
//     }
//   }
// }

.el-main {
  position: relative;
  display: flex;
  justify-content: center;
  width: 1100px;
  margin: 0 auto;
  .el-carousel {
    width: 600px;
    .el-carousel__item {
      width: 600px;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
