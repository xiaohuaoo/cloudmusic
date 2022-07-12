<template>
  <div class="wrapper">
    <div class="n-pg">
      <div class="login" @click="$bus.$emit('appear')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notloggedIn'
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 982px;
  border: 1px solid #d3d3d3;
  margin:0 auto;
  position: relative;
  top: 75px;
  height: 500px;
  background-color: #fff;

  .n-pg {
    width: 807px;
    height: 290px;
    padding-top: 84px;
    margin: 0 auto;
    background: url('../images/mymusic.png') no-repeat 0 104px;

    .login {
      margin:202px 0 0 482px;
      width: 167px;
      height: 45px;
      background: url('../images/mymusic.png') no-repeat 0 9999px;

      &:hover {
        cursor: pointer;
        background-position: 0 -278px;
      }
    }
  }
}
</style>
