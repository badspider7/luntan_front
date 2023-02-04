<template>
  <div>
    <div v-for="item in dataSource.list" :key="item.id">
      <slot :data="item"></slot>
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
  display: flex;
  justify-content: center;
}
</style>
