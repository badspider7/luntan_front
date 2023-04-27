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
      <el-button @click="(dialogFormVisible = true)">发布</el-button>
    </div>
    <div id="vditor"></div>

    <el-dialog
      title="发布文章"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <!-- 选择文章标签 -->
        <el-form-item label="添加标签" :label-width="formLabelWidth">
          <el-select
            v-model="value"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            :multiple-limit='1'
            size="small"
            @visible-change="down()"
          >
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择文章封面 -->
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:3000/api/upload"
          :limit="1"
          :on-exceed="()=>{
            return exceed()
          }"
          :on-change="loadJsFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>选择文章封面</em></div>
          <!-- <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../../components/Header";
import Vditor from "vditor";
// import postConfig from "./postConfig";
import { createArticle,categoryList } from "../../api/article";
import axios from "axios";
export default {
  components: { Header },
  data() {
    return {
      postTitle: "",
      contentEditor: "",
      contentValue: "",
      title: "创建文章",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form:{},
      options: [],
      value: [],
      uploadfile:[]
    };
  },
  methods: {
    exceed() {
      this.$message({
        type: 'warning',
        message: '只能上传一个图片'
      })
    },

    getEditValue() {
      return this.contentEditor.getValue();
    },

    loadJsFile(file, fileList) {
      this.uploadfile = fileList;
      console.log(this.uploadfile[0].name);
    },

    async publishPost() {
      try {
        if (this.postTitle.trim() == "") {
          this.$message({
            message: "标题不能为空",
            type: "error",
            duration: 1500,
          });
          return false;
        } else if (this.getEditValue() == "") {
          this.$message({
            message: "内容不能为空",
            type: "error",
            duration: 1500,
          });
          return false;
        }
        let categoryId = ''
        //拿到 分类 name- 得到id
        this.options.forEach(item => {
          if (item.name == this.value[0]) {
             categoryId = item._id;
          }
        })

        const res = await createArticle(
          {
            title: this.postTitle,
            content: this.getEditValue(),
            status: "published",
            category: categoryId,
            cover: "http://localhost:3000/upload/"+this.uploadfile[0].name
          },
        );
        this.$message({
          message: "文章发表成功",
          type: "success",
          duration: 1500,
        });
        //清空输入框
        this.postTitle = "";
        this.contentEditor.setValue("");
        //跳转到博客页面
        this.$router.push({ name: "Blog" });
      } catch (err) {
        console.log(err);
        this.$message({
          message: "发表文章失败",
          type: "error",
          duration: 1500,
        });
      }
    },
    submit() {
      this.$confirm("发表文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // let fdParams = new FormData();
          // fdParams.append('name',this.uploadfile[0].name)
          // fdParams.append('file', this.uploadfile[0].raw.type)
          // console.log(this.uploadfile[0].raw);


          // axios.post('http://localhost:3000/api/upload',fdParams, {
          //   headers: { 'Content-Type': 'multipart/form-data' },
          //   timeout:2000
          // }).then(res => {
          //   console.log(res);
          // }, err => {
          //   console.log(err);
          // })
          this.publishPost();
          this.dialogFormVisible = false
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "warning",
            message: "已取消发表",
          });
        });
    },
    //获取文章分类
    async down() {
      const { data } = await categoryList();
      this.options = data.data
    }
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
        accept: "image/*,.mp3, .wav, .rar",
        url: "http://localhost:3000/api/upload",
        // linkToImgUrl: '/api/upload',
        // headers: {
        //  'Content-Type':'application/json; charset=utf-8'
        // },
        filename(name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
            .replace("/\\s/g", "");
        },
        success(a, msg) {
          console.log(a);
          console.log(msg);
        },
        err(err) {
          console.log(err);
        },
      },
      placeholder: "展示你的才华吧",
      //显示大纲
      outline: {
        enable: true,
        position: "left",
      },
      //是否使用localStorage进行缓存
      cache: {
        enable: true,
        id: 1,
        // after(),
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
  // position: relative;

  top: 64px;
  margin: 0 auto;
  margin-top: 64px;
}

.el-form{
  .upload-demo{
    margin-left: 50px;
  }
}
</style>
