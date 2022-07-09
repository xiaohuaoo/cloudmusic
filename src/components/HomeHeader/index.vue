<template>
  <div class="headerWrapper"> 
    <div class="wrapper">
      <ul>
        <li>
          <router-link @click.native="active=1" to='/home/discover'><em :class="{active:active==1}">推荐</em></router-link>
        </li>
        <li>
          <router-link @click.native="active=2" to='/home/toplist'><em :class="{active:active==2}" >排行榜</em></router-link>
        </li>
        <li>
          <router-link @click.native="active=3" to='/home/playlist'><em :class="{active:active==3}">歌单</em></router-link>
        </li>
        <li>
          <router-link @click.native="active=4" to='/home/djradio'><em :class="{active:active==4}">主播电台</em></router-link>
        </li>
        <li>
          <router-link @click.native="active=5" to='/home/artist'><em :class="{active:active==5}">歌手</em></router-link>
        </li>
        <li>
          <router-link @click.native="active=6" to='/home/album'><em :class="{active:active==6}">新碟上架</em></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeheader',
  data () {
    return {
      active: -1
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  watch: {
    path () {
      if (this.path.indexOf('home/discover') != -1) this.active = 1;
      else if(this.path.indexOf('home/toplist') != -1) this.active = 2;
      else if(this.path.indexOf('home/playlist') != -1) this.active = 3;
      else if(this.path.indexOf('home/djradio') != -1) this.active = 4;
      else if(this.path.indexOf('home/artist') != -1) this.active = 5;
      else if(this.path.indexOf('home/album') != -1) this.active = 6;
    }
  },
  mounted () {
    let path = this.$route.path;
    if (path.indexOf('home/discover') != -1) this.active = 1;
    else if(path.indexOf('home/toplist') != -1) this.active = 2;
    else if(path.indexOf('home/playlist') != -1) this.active = 3;
    else if(path.indexOf('home/djradio') != -1) this.active = 4;
    else if(path.indexOf('home/artist') != -1) this.active = 5;
    else if(path.indexOf('home/album') != -1) this.active = 6;
  }
}
</script>

<style lang="less" scoped>
.headerWrapper{
  height: 25px;
  background-color: #C20C0C;
  border-bottom: 1px solid #a40011;
  position: relative;
  z-index: 1000;
  list-style: none;
  .wrapper{
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    position: absolute;
    bottom: 20px;
    ul{
      width: 744px;
      height: 100%;
      padding-left: 180px;
      display: flex;
      list-style: none;
      li{
        height: 100%;
        a{
          display: block;
          height: 100%;
          
          em{
            height: auto;
            display: block;
            float: left;
            padding: 0 13px 0 13px;
            margin:7px 17px 0 17px;
            line-height: 21px;
            color: #fff;
            border-radius: 20px;
          }
          &:hover em{
            background: #9B0909;
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
}
.active{
  background: #9B0909;
}
</style>