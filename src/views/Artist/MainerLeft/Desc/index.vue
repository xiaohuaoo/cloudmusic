<template>
  <div class="des">
    <div class="briefDesc">
      <h2 class="name">歌手简介</h2>
      <p>{{desc.briefDesc}} </p>    
    </div>
    <div class="introduction">
      <div class="desc" v-for="info,index in desc.introduction" :key="index">
        <h2 class="name">{{info.ti}}</h2>
        <p v-html="info.txt"></p>
      </div>   
    </div>
  </div>
</template>

<script>
export default {
  name: 'des',
  data () {
    return {
      desc: {}
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    // 获取艺人介绍
    async getArtistDesc () {
      let result = await this.$API.reqArtistDesc(this.id)
      this.desc.briefDesc = result.briefDesc
      this.desc.introduction = result.introduction
      this.desc.introduction.forEach(item => {
        item.txt = item.txt.replace(/\n/g, '<br>')
      })
      this.$forceUpdate()
    }
  },
  mounted () {
    this.getArtistDesc()
  }
}
</script>

<style lang="less" scoped>
.des {
    width: 100%;
    .name{
        margin: 28px 0 8px 0;
        color: #333;
        font-size: 14px;
        padding-left: 10px;
        border-left:3px solid #c10d0c;
    }     
    p{
        line-height: 25px;
        color: #666;
        // text-indent: 2em;
    }    
    .briefDesc{
        margin-bottom: 10px;
    
    }
    .introduction{
        width: 100%;
        .desc{
            margin-bottom: 30px;
        }
    }
}
</style>
