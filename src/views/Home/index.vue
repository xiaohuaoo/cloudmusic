<template>
  <div>
    <HomeHeader></HomeHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
export default {
  name: 'home',
  components: {
    HomeHeader
  }
}
</script>

<style lang="less" scoped>
</style>
