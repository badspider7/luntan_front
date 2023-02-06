<template>
  <div>
    <div
      v-if="!loading && dataSource.list != null && dataSource.list.length == 0"
    >
      数据为空
    </div>
    <div class="skeleton" v-if="loading">
      <el-skeleton :rows="6" animated></el-skeleton>
    </div>
    <div v-for="item in dataSource.list" :key="item.id">
      <slot :data="item" v-if="!loading"></slot>
    </div>
    <div class="pagination">
      <!-- 分页按钮 -->
      <el-pagination
        background
        :current-page.sync="dataSource.pageNumber"
        :total="dataSource.totalCounts"
        layout="prev, pager, next"
        @current-change="handlePageNoChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    dataSource: {
      type: Object,
    },
    loading: {
      type: Boolean,
    },
  },
  methods: {
    handlePageNoChange(pageNo) {
      this.dataSource.pageNumber = pageNo;
      this.$emit("loadData");
    },
  },
};
</script>
<style scoped lang="scss">
.pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>
