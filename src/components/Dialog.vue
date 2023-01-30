<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="show"
      :close-on-click-modal="false"
      :show-close="showClose"
      custom-class="custom-dialog"
      :width="width"
      :top="top"
      :modal-append-to-body="false"
      @closed="close"
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template>
        <div slot="footer" class="dialog-footer">
          <el-button>
          {{ title }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "标题",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "30%",
    },
    top: {
      type: String,
      default: "50px",
    },
    buttons: {
      type:Array
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang="scss">
.el-dialog__wrapper {
  .custom-dialog {
    color: green;
    .dialog-body {
      padding: 20px;
      max-height: calc(100vh - 180px);
      overflow: auto;
    }
  }
  .dialog-footer{
    .el-button {
      width: 320px;
      background-color: #07C160;
      color: #fff;
      margin-right: 20px ;
      margin-bottom: 20px;
    }
  }
}
.el-dialog__header{
border-bottom:1px solid #ccc
}
</style>
