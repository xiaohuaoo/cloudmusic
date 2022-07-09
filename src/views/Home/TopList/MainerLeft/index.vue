<template>
  <div class="mainerLeft">
    <div class="minelst">
      <h2 class="ff1">云音乐特色榜</h2>
      <ul class="f-cb">
        <li class="mine" v-for="(item, index) in itemList" :key="index" @click="Go(item)" :class="{active:item.id==id}">
          <img v-lazy="item.coverImgUrl">
          <div class="name">{{item.name}}</div>
          <div class="fc">{{item.updateFrequency}}</div>
        </li>
      </ul>
      <h2 class="ff1">全球媒体榜</h2>
      <ul class="f-cb">
        <li class="mine" v-for="(item, index) in globalList" :key="index" @click="Go(item)" :class="{active:item.id==id}">
          <img v-lazy="item.coverImgUrl">
          <div class="name">{{item.name}}</div>
          <div class="fc">{{item.updateFrequency}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toplistmainerleft',
  data () {
    return {
      itemList: [],
      globalList: []
    }
  },
  computed: {
    id () {
      if (this.$route.query.id === undefined) return '19723756'
      return this.$route.query.id
    }
  },
  methods: {
    // 获取排行榜的信息
    async getTopList () {
      const result = await this.$API.reqTopList()
      if (result.code === 200) {
        this.itemList = result.list.slice(0, 4)
        this.globalList = result.list.slice(4)
      }
    },
    // 切换
    Go (item) {
      this.$router.push({
        path: '/home/toplist',
        query: {
          id: item.id
        }
      })
      this.$bus.$emit('getNum', item.updateFrequency)
    }
  },
  mounted () {
    this.getTopList()
  }
}
</script>

<style lang="less" scoped>
.mainerLeft {
  float: left;
  width: 241px;
  height: 2284.4px;
  border-right: 1px solid #d3d3d3;
  position: relative;
  background: rgb(249,249,249);
  .minelst{
      margin-top: 40px;
      height: 2244.4px;
      width: 100%;
      float: left;
      .ff1{
          padding:0 10px 12px 15px;
          width: 240px;
          // height: 27.2px;
          font-size: 14px;
          color: #000;
          font-family: simsun,\5b8b\4f53;
          display: block;
      }

      .f-cb{
          width: 240px;

          .mine{
              width: 240px;
              height: 62px;
              padding: 10px 0 10px 20px;
              position: relative;
              &:hover{
                  background: rgb(244,242,242);
                  cursor: pointer;
              }

              img{
                  width: 40px;
                  height: 40px;
                  margin-right: 10px;
                  float: left;
              }
              
              .name{
                  color: #000;
                  // height: 16px;
                  margin: 1px 0 4px;
              }

              .fc{
                  font-size: 12px;
                  color: #999;
              }
              
          }
      }
  }
  .active{
      background: rgb(230,230,230);
  }
}
</style>
