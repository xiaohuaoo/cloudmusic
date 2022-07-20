<template>
  <div class="notlogged">
    <div class="wrapper">
      <div class="welc">
        你可以关注明星和好友品味他们的私房歌单
        <br>
        通过他们的动态发现更多精彩音乐
       </div>
       <i @click="$bus.$emit('appear')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notlogged'
}
</script>

<style scoped lang="less">
.notlogged{
    width: 982px;
    height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    .wrapper{
        width: 902px;
        height: 484px;
        padding-top: 70px;
        margin: 0 auto;
        background: url('../images/notlogin.jpg') no-repeat 0 70px;
        .welc{
            padding: 178px 0 0 535px;
            line-height: 23px;
            width: 100%;
            height: 224px;
            font-size: 14px;
        }
        i{
            display: block;
            width: 157px;
            height: 48px;
            margin: 36px 0 0 535px;
            &:hover{
                cursor: pointer;
                background: url('../images/notlogin.jpg') no-repeat 0 -430px;
            }
        }
    }
}
</style>