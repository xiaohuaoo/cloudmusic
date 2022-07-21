<template>
  <div class="album">
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
  name: 'album',
  components: { 
    HomeHeader,
    MainerLeft,
    MainerRight
  }
}
</script>

<style lang="less" scoped>
.album {
    width: 100%;
    .wrapper{
        width: 982px;
        min-height: 700px;
        border: 1px solid #d3d3d3;
        margin: 0 auto;
        background: url('./images/wrap4.png') repeat-y center 0;;
    }
}
</style>