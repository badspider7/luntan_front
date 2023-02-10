<template>
  <div class="Blog">
    <Header :title="title"></Header>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
export default {
  name: "blog",
    components:{Header},
  data() {
    return {
      title:"博客"
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{

  },
}
</script>
<style scoped>

</style>
