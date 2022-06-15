<template>
  <div class="topList">
    <MainerLeft></MainerLeft>
    <MainerRight></MainerRight>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import MainerLeft from './MainerLeft'
import MainerRight from './MainerRight'
export default {
  name: 'toplist',
  components: {
    MainerLeft,
    MainerRight
  }
}
</script>

<style lang="less" scoped>
.topList {
    margin: 0 auto;
    width: 983px;
    border: 1px solid #d3d3d3;
    border-top: none;
}
.clearfix {
    zoom: 1;
}
.clearfix:after{
    content: '';
    display: block;
    height: 0;
    clear: both;
}
</style>
