<template>
  <div class="AboutMe">
    <Header></Header>
    <div class="aboutMe">
      <div class="container">
        <ul>
          <li class="name">
            <img src="https://www.badspider.top/img/author.gif" alt="avatar" />
            <span>Badspider</span>
          </li>
          <li class="slogn">
            <span>梨花带雨</span>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="GitHub"
                placement="bottom"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-github"></use>
                </svg>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="微信"
                placement="bottom"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin1"></use>
                </svg>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="掘金"
                placement="bottom"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-juejin"></use>
                </svg>
              </el-tooltip>
            </div>
          </li>
        </ul>
        <div class="interesting">
          <div class="i-title">我的兴趣</div>
          <ul>
            <li>指弹吉他（不要问，问就是 532313）</li>
            <li>python （爬虫方向，目前还在学习当中）</li>
            <li>前端 （加油努力学习）</li>
            <li>养花养草</li>
            <li>和我家的猪猪一起吃超级多好吃的</li>
            <li>网易云</li>
          </ul>
        </div>
        <div class="contact">
          <div class="i-title">联系我</div>
          <ul>
            <li>Eamil:1742969779@qq.com</li>
            <li>Github:https://github.com/badspider7.git</li>
          </ul>
        </div>
        <div class="website">
          <div class="i-title">我的博客</div>
          <ul>
            <li>念伊的小窝:https://www.badspider.top</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "AboutMe",
  components: { Header,Footer },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.AboutMe {
  margin-top: 100px;
  .container {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ul {
      .name {
        display: flex;
        flex-direction: column;
        img {
          max-width: 160px;
          max-height: 160px;
          background-color: transparent;
          object-fit: cover;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 5px 0px,
            rgba(0, 0, 0, 0.12) 0px 2px 10px 0px;
          border-radius: 50%;
        }
        span {
          font-size: 1.75rem;
          font-weight: 900;
        }
      }
      .slogn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item {
          margin-right: 10px;
        }
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          &:hover {
            cursor: pointer;
            fill: blue;
          }
        }
      }
    }
    .interesting,.contact,.website {
      align-self: flex-start;
      width: 100%;
      margin-top: 10px;
      .i-title {
        font-size: 2em;
        border-bottom: 1px solid #ccc;
        margin-top: 10px;
        margin-bottom: 0.75em;
      }
      ul {
        li {
          list-style: disc !important;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
