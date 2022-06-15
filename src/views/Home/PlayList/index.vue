<template>
  <div class="playlist" @click="closeBox">
    <!-- 顶部 -->
    <div class="header">
      <h3>
        <span>{{catCopy}}</span>
        <a class="menu" @click="showList">
          <i>选择分类</i>
          <em class="u-icn"></em>
        </a>
      </h3>
      <a class="hot">热门</a>
    </div>
    <!-- 弹出框 -->
    <div class="cateListBox" v-show="isShowList">
      <div class="hd">
        <i class="icn"></i>
      </div>
      <div class="bd">
        <h3></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      isShowList: false,
      catCopy:'全部'
    }
  },
  created () {},
  methods: {
    // 显示和关闭弹窗
    showList () {
      setTimeout(() => {
        this.isShowList = !this.isShowList
      }, 100)
    },
    // 关闭弹窗
    closeBox () {
      if(this.isShowList == true)
        this.isShowList = false
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
