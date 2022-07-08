<template>
<div>
  <Recommend v-if="area==undefined&&type==undefined"></Recommend>
  <Other v-else></Other>
</div>
</template>

<script>
import Recommend from './Recommend'
import Other from './Other'
export default {
  name: 'artlistmainnerright',
  components: { Recommend, Other },
  computed: {
    area () {
      return this.$route.query.area
    },
    type () {
      return this.$route.query.type
    }
  }
}
</script>

<style lang="less" scoped>
</style>
