<template>
  <div id="app">
      <el-button class="entrywidth" type="primary" @click="history">返回</el-button>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'SQL',
  methods: {
    history(){
      this.$router.push('/');
    }
  }
  }
</script>

<style scoped>
@import url('../layout/base.css');
</style>
