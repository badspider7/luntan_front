<template>
  <footer id="footer">
    <div class="footer-text">
      <a href="javascript:;">
        <span>Ning</span>
      </a>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <a href="javascript:;">
        <span>Yi</span>
      </a>
    </div>
    <div class="beian">
      <span
        ><a href="http://beian.miit.gov.cn/" target="_blank">
          赣ICP备2021011549号-1
        </a></span
      >
      <span
        ><a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=https://beian.miit.gov.cn"
        >
          <span>|</span>
          <img src="../../public/police_beian.png" alt="police-icon" />
          <span>赣ICP备2021011549号-1</span>
        </a></span
      >
    </div>
    <!-- <div class="footer">
      <div id="jsi-flying-fish-container"></div>
    </div> -->
  </footer>
</template>
<script>
// import fish from "../utils/fish";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // let element = document.createElement("script");
    // element.src = "../utils/fish.js";
    // document.body.appendChild(element);//在body创建script节点引入src目标链接
	
  },
};
</script>
<style scoped lang="scss">
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
#footer {
  background-color: var(--body-bg-color);
  margin-top: 3rem;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
  div {
    margin: 0.5rem 0;
  }
  a:hover {
    color: #30a9de;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }
  .footer-text {
    text-align: center;
    a {
      background-color: transparent;
    }
  }
  .beian {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 0.85rem;
    span:last-child {
      a img {
        vertical-align: middle;
        margin-right: 0.2rem;
      }
      a span:nth-child(1) {
        visibility: hidden;
        width: 0;
      }
    }
  }
}
</style>
