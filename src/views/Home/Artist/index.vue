<template>
  <div class="artist clearfix">
    <MainerLeft></MainerLeft>
    <MainerRight></MainerRight>
  </div>
</template>

<script>
import MainerLeft from './MainerLeft'
import MainerRight from './MainerRight'
export default {
  name: 'artist',
  components: {
    MainerLeft,
    MainerRight
  }
}
</script>

<style lang="less" scoped>
.artist {
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
}
</style>
