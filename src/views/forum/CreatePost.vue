<template>
  <div>
    <Header :title="title"></Header>
    <div class="post-title">
      <input
        type="text"
        id="title"
        placeholder="请输入标题(最多30个字)"
        v-model="postTitle"
        maxlength="30"
      />
      <el-button @click="open">发布</el-button>
    </div>
    <div id="vditor"></div>
  </div>
</template>
<script>
import Header from "../../components/Header";
import Vditor from "vditor";
// import postConfig from "./postConfig";
import { createArticle } from "../../api/article";
export default {
  components: { Header },
  data() {
    return {
      postTitle: "",
      contentEditor: "",
      contentValue: "",
      title: "创建文章",
    };
  },
  methods: {
    getEditValue() {
      return this.contentEditor.getValue();
    },
    async publishPost() {
      try {
        const res = await createArticle(
          {
            title: this.postTitle,
            content: this.getEditValue(),
            status: "published",
            category: "63dcb98f2b09a0ab96f34de2",
          },
          "user"
        );
        console.log(res);
        this.$message({
          message: "文章发表成功",
          type: "success",
          duration: 1500,
        });
        //清空输入框
        this.postTitle = '';
        this.contentEditor.setValue('');
        //跳转到博客页面
        this.$router.push({"name":"Blog"})
      } catch (err) {
        this.$message({
          message: err.response.data.msg,
          type: "error",
          duration: 1500,
        });
      }
    },
    open() {
      this.$confirm("发表文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.publishPost();
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消发表",
          });
        });
    },
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 668,
      width: 1100,
      //工具栏的设置
      toolbarConfig: {
        pin: true,
      },
      //最大字数
      counter: {
        enable: true,
        max: 102400,
      },
      typewriterMode: true, //打字机模式
      theme: "classic", //主题
      icon: "ant", //图标主题

      preview: {
        //代码块高亮
        hljs: {
          style: "github",
          lineNumber: true,
        },
        //markdown
        markdown: {
          toc: true, //插入目录
        },
      },
      hint: {
        //表情  https://github.com/88250/lute/blob/master/parse/emoji_map.go?utm_source=ld246.com
        emoji: {
          "+1": "👍",
          "-1": "👎",
          carousel_horse: "🎠",
          carrot: "🥕",
          cat: "🐱",
          cat2: "🐈",
          cayman_islands: "🇰🇾",
          cd: "💿",
          cherry_blossom: "🌸",
          chestnut: "🌰",
          chicken: "🐔",
          children_crossing: "🚸",
          chile: "🇨🇱",
          chipmunk: "🐿",
          chocolate_bar: "🍫",
          christmas_island: "🇨🇽",
          christmas_tree: "🎄",
        },
      },
      //上传图片和文件
      upload: {
        url: "https://www.baidu.com",
        msg: "上传成功",
        code: 0,
        data: {
          errFiles: ["filename", "filename2"],
          succMap: {
            filename3: "filepath3",
          },
        },
      },
      placeholder: "展示你的才华吧",
      //显示大纲
      outline: {
        enable: false,
        position: "right",
      },
      //是否使用localStorage进行缓存
      cache: {
        enable: true,
      },
      after: () => {
        this.contentEditor.setValue("");
      },
      input: () => {},
    });
  },
};
</script>
<style scoped lang="scss">
// .hitokoto[data-v-61dd7a3d] {
//   font-size: 20px;
//   position: absolute;
//   left: 40%;
//   top: 25%;
// }
.post-title {
  position: relative;
  top: 64px;
  height: 55px;
  width: 1100px;
  margin: 0 auto;
  input {
    width: 100%;
    height: 100%;
    padding: 2px;
    font-size: 26px;
    border: 1px solid transparent;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    outline: none;
    text-indent: 2rem;
    font-weight: 300;
    &:focus {
      border: 1px solid;
      border-color: #61cb6aee;
    }
  }
  button {
    position: absolute;
    right: 20px;
    height: 35px;
    width: 60px;
    margin-top: 10px;
    background-color: rgb(220, 165, 63);
    border-radius: 4px;
    outline: none;
    border: 0;
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: orange;
    }
  }
}
#vditor {
  position: relative;
  top: 64px;
  margin: 0 auto;
}
</style>
