<template>
  <div class="song">
    <HomeHeader></HomeHeader>
    <div class="wrapper clearfix">
      <MainerLeft></MainerLeft>
      <MainerRight></MainerRight>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import MainerLeft from './MainerLeft'
import MainerRight from './MainerRight'
export default {
    name: 'song',
    components: {
      HomeHeader,
      MainerLeft,
      MainerRight
    }
}
</script>

<style lang="less" scoped>
.song {
    width: 100%;
    .wrapper{
        width: 982px;
        min-height: 700px;
        margin: 0 auto;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url('./images/wrap4.png') repeat-y center 0;
    }
}
</style>