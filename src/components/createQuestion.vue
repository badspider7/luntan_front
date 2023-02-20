<!-- ！！！ 提问题功能未完成 2/20  -->
<template>
  <div class="createQuestion" ref="question">
    <div class="createQuestion-body">
        <div class="question-title">
            <input type="text">
        </div>
        <div class="question-container">
            <textarea name="" id=""></textarea>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "createQuestion",
  data() {
    return {
        rootHTML:{}
    };
  },
    methods: {},
    created() {
      this.rootHTML = this.$el
      this.$emit("getRootHTML", this.rootHTML)
  }
};
</script>
<style scoped lang="scss"></style>
