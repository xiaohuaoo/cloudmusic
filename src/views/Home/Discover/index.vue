<template>
  <div>
    <Banner></Banner>
    <div class="mainer">
      <MainerLeft></MainerLeft>
      <MainerRight></MainerRight>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import MainerLeft from './MainerLeft'
import MainerRight from './MainerRight'
export default {
  name: 'discover',
  components: {
    Banner,
    MainerLeft,
    MainerRight
  },
  methods: {
    async GetLevel () {
      if (localStorage.getItem('COOKIE') == null) return
      const result = await this.$API.reqLevel(localStorage.getItem('COOKIE'))
      console.log(result)
    },
    async getPrivateMsg () {
      if (localStorage.getItem('COOKIE') == null) return
      const result = await this.$API.reqPrivateMsg(localStorage.getItem('COOKIE'), 10, 0)
      console.log(result)
    }
  },
  mounted () {
    this.getPrivateMsg()
  }
}
</script>

<style type="text/css" scoped>
.mainer {
    width: 982px;
    display: flex;
    margin: 0 auto;
}
</style>
