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
                  <use xlink:href="#icon-github">
                  </use>
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
          <li>
            <svg>
              <use></use>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "AboutMe",
  components: { Header },
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
  }
}
</style>
