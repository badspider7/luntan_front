<template>
  <div>
    <div v-for="item in dataSource" :key="item.id">
      <slot :data="item"></slot>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page.sync="dataSource.pageNb"
        :total="dataSource.totalCount"
        layout="prev, pager, next"
        @current-change="handlePageNoChange"
        :hide-on-single-page="true"
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
      console.log(pageNo);
    },
  },
};
</script>
<style scoped lang="scss"></style>
