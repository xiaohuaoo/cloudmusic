<template>
  <div class="login">
    <p class="note">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
    <a class="enter" @click="enter">用户登录</a>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    enter () {
      this.$bus.$emit('appear')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    width: 250px;
    height: 126px;
    background: url('../images/index.png') no-repeat 0 0;
    .note {
      float: left;
      display: block;
      width: 205px;
      height: 76px;
      padding: 16px 0;
      margin: 0 22.5px;
      font-size: 12px;
      color: #666;
      line-height: 20px;
      font-family: Arial, Helvetica, sans-serif;
      -webkit-text-size-adjust: none;
    }
    .enter {
        display: block;
        float: left;
        width: 100px;
        height: 31px;
        margin: 0 75px;
        text-align: center;
        line-height: 31px;
        color: #fff;
        text-shadow: 0 1px 0 #8a060b;
        background: url('../images/index.png') no-repeat 0 -195px;

        &:hover{
            cursor: pointer;
            background-position: -110px -195px;
        }
    }
}
</style>
