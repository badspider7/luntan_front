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
        <div class="add-category">
          <button @click="dialogVisible = true">添加话题</button>
          <el-dialog
            title="添加话题"
            :visible.sync="dialogVisible"
            width="30%"
            :center="true"
            :before-close="handleClose"
          >
            <el-input
              type="text"
              placeholder="请输入文章类别"
              v-model="newCat"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCategory">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { TopicList,createTopic } from "../api/topic";
export default {
  name: "Tags",
  components: { Header, Footer },
  data() {
    return {
      tagList: {},
      dialogVisible: false,
      newCat: ""
    };
  },
  methods: {
    async getList() {
      const { data } = await TopicList();
      this.tagList = data.data;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //添加文章分类
    async addCategory() {
      this.dialogVisible = false
      if (this.newCat.trim().length == 0) {
        this.$message({
          type: 'error',
          message: '文章类别不能为空' 
        })
        throw new Error('')
      }

      this.tagList.forEach(item => {
        if (item.name.toLowerCase() === this.newCat) {
          this.$message({
          type: 'error',
          message: '话题已经存在' 
          })
          throw new Error('')
        }
      })
      console.log(1);

      const { data } = await createTopic({
        name: this.newCat,
      });

      this.$message({
          type: 'success',
          message: '话题创建成功' 
      })

      location.reload()
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
      span {
        font-size: 20px;
        color: rgb(5, 7, 7);
        margin: 20px;
        &:hover {
          cursor: pointer;
          color: rgb(25, 112, 146);
        }
      }
    }
  }
  .add-category {
      position: absolute;
      right: 40px;
      top: 520px;
      button {
        width: 140px;
        height: 40px;
        border-radius: 5px;
        outline: none;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
}
</style>
