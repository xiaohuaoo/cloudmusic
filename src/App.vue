<template>
  <div id="app">
    <Header />
    <GoTop />
    <router-view></router-view>
    <Music></Music>
    <MyFooter v-show='isShowFoot'/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import GoTop from '@/components/GoTop'
import Music from '@/components/Music'
import MyFooter from '@/components/MyFooter'

export default {
  name: 'App',
  components: {
    Header,
    GoTop,
    Music,
    MyFooter
  },
  data () {
    return {
      isShowFoot: true
    }
  },
  computed:{
    path(){
      return this.$route.path
    }
  },
  watch: {
    path () {
      if(this.$route.path.indexOf('/mymusic') != -1) this.isShowFoot = false
      else this.isShowFoot = true
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  background: #f5f5f5;
}
/* 清除浮动 */
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 鼠标移入显示下划线 */
.underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
/* 鼠标移入变为手指 */
.pointer:hover {
  cursor: pointer;
}
/* 文字无法被选中 */
.notChoose {
  -webkit-user-select: none;
  -moz-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
