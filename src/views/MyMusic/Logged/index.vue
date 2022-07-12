<template>
  <div class="logged clearfix">
    <MainnerLeft></MainnerLeft>
    <router-view></router-view>
  </div>
</template>

<script>
import MainnerLeft from './MainnerLeft'
export default {
  name: 'logged',
  components: {
    MainnerLeft
  }
}
</script>

<style lang="less" scoped>
.logged {
  width: 982px;
  position: relative;
  height: auto;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
  background-color: #fff;
}
</style>
