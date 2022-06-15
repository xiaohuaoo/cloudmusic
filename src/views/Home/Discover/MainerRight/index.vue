<template>
  <div class="MainerRight">
    <Login v-show="!isLogin"></Login>
    <Level v-show="isLogin"></Level>
    <Singer></Singer>
    <DJ></DJ>
  </div>
</template>

<script>
import Login from './Login'
import Level from './Level'
import Singer from './Singer'
import DJ from './DJ'
export default {
  name: 'mainerright',
  components: {
    Login,
    Level,
    Singer,
    DJ
  },
  computed: {
    isLogin () {
      if (localStorage.getItem("COOKIE")!=null) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.MainerRight {
    width: 250px;
    position: relative;
    height: 1423px;
    border: 1px solid #ddd;
    border-bottom: none;
    background: #fff;
}
</style>
