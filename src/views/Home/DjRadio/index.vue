<template>
  <div class="radio">
    <Category></Category>
    <Recommend v-show="!hasId"></Recommend>
    <Detail v-show="hasId"></Detail>
  </div>
</template>

<script>
import Category from './Category'
import Recommend from './Recommend'
import Detail from './Detail'
export default {
  name: 'djradio',
  components: { Category, Recommend, Detail },
  data () {
    return {
      hasId: false
    }
  },
  computed: {
    // 获取当前页面选中的dj的id
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    // 如果发生变化 图标也要发生变化
    id () {
      if (this.$route.query.id !== undefined) {
        this.hasId = true
      } else {
        this.hasId = false
      }
    }
  },
  methods: {},
  mounted () {
    if (this.$route.query.id !== undefined) {
      this.hasId = true
    }
  }
}
</script>

<style lang="less">
.radio {
    width: 982px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #d3d3d3;
    display: block;
    background-color: #fff;
}
</style>
