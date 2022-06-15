<template>
  <div class="GoTop" ref="top" @click="goTop"></div>
</template>

<script>
export default {
  name: 'GoTop',
  components: {},
  props: {},
  data () {
    return {
      timer: null
    }
  },
  created () {},
  mounted () {
    window.addEventListener('scroll', this.handleScrollx)
  },
  methods: {
    // 判断是否显示GoTop按钮
    handleScrollx () {
      if (window.pageYOffset >= 30) {
        this.$refs.top.style.display = 'block'
      } else {
        this.$refs.top.style.display = 'none'
      }
    },
    // 点击滚动到顶部
    goTop () {
      cancelAnimationFrame(this.timer)
      const length = window.pageYOffset
      const self = this
      //   console.log(length)
      //   console.log(self)
      self.timer = requestAnimationFrame(function fn () {
        const oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - length / 10
          self.timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(self.timer)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.GoTop{
  display: none;
  position: fixed;
  text-indent: -9999px;
  left: 50%;
  margin-left: 500px;
  bottom: 160px;
  width: 49px;
  height: 44px;
  background-position: -265px -47px;
  background: url('../images/sprite.png') no-repeat -265px -47px;
  &:hover{
    background-position: -325px -47px;
    cursor: pointer;
  }
}
</style>
