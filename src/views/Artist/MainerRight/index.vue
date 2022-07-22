<template>
  <div class="mainerright">
    <div class="hd">
      <h3>相似歌手</h3>
    </div>
    <ul class="artlist clearfix">
      <li v-for="simi, index in similist" :key="index">
        <router-link :to="{path: '/artist/song', query:{id:simi.id}}" class="cvr">
          <img v-lazy="simi.img1v1Url">
         </router-link>
        <router-link :to="{path: '/artist/song', query:{id:simi.id}}" class="name over underline">{{simi.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mainerright',
  data () {
    return {
      similist: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    id () {
      location.reload()
    }
  },
  methods: {
    // 获取相似歌手
    async getSimi () {
      let result = await this.$API.reqArtistSimi(this.id)
      this.similist = result.artists.slice(0, 6)
    }
  },
  mounted () {
    this.getSimi()
  }
}
</script>

<style lang="less" scoped>
.mainerright {
    width: 270px;
    float: right;
    padding: 20px 40px 40px 30px;
    .hd{
        position: relative;
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        h3{
            font-size: 12px;   
        }
        
    }
    .artlist{
        width: 225px;
        margin-left: -25px;
        li{
            padding-left: 25px;
            width: 75px;
            height: 92px;
            float: left;
            .cvr{
                width: 50px;
                height: 50px;
                cursor: pointer;
                img{
                    width: 50px;
                }
            }
            .name{
                margin-top: 7px;
                text-align: center;
                display: block;
                width: 50px;
                height: 25px;
                color: #333;
            }
        }
    }
}
</style>
