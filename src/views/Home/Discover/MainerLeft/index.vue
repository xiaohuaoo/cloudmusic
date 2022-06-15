<template>
  <div class="MainerLeft">
      <Recommendation></Recommendation>
      <div class="space"></div>
      <New></New>
      <div class="space"></div>
      <TopList></TopList>
  </div>
</template>

<script>
import Recommendation from './Recommendation'
import New from './New'
import TopList from './TopList'
export default {
  name: 'mainerleft',
  components: {
    Recommendation,
    New,
    TopList
  },
  props: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.MainerLeft {
    padding: 20px 20px 40px 20px;
    width: 731px;
    position: relative;
    left: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom: none;
}
.space {
    width: 100%;
    height: 0;
    margin-bottom: 35px;
}
</style>
