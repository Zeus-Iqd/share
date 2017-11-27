<template>
  <div>
    <main-header></main-header>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components: {
    'main-header': Header
  }
}
</script>

<style lang="less" scoped>
#main {
  height: calc(~"100vh - 80px");
  margin-top: 56px;
  padding-top: 24px;
}
</style>
