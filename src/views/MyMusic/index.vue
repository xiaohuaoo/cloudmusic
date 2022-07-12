<template>
  <div class="mymusic clearfix">
    <div class="header"></div>
    <NotLoggedIn v-if="cookie == undefined"></NotLoggedIn>
    <Logged v-else></Logged>
  </div>
</template>

<script>
import NotLoggedIn from './NotLoggedIn'
import Logged from './Logged'
export default {
  name: 'mymusic',
  components: {
    NotLoggedIn,
    Logged
  },
  computed: {
    cookie () {
      return localStorage.getItem('COOKIE')
    }
  }
}
</script>

<style lang="less" scoped>
.mymusic {
  margin-top: 70px;
  .header {
    width: 100%;
    height: 5px;
    background-color: #C20C0C;
    position: fixed;
    z-index: 90;
  }
}
</style>
