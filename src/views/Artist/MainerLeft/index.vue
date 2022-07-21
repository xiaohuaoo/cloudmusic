<template>
  <div class="mainerleft">
    <div class="cover">
      <div class="btm">
        <h2 class="name" v-if="artist.artist">{{artist.artist.name}}</h2>    
      </div>
      <div class="avatar">
        <img v-lazy="artist.artist.cover" v-if="artist.artist">
        <div class="msk"></div>
      </div>
    </div>
    <ul class="tab">
      <li :class="{active: active == 1}">
        <router-link :to="{path: '/artist/song', query:{id:`${id}`}}">热门作品</router-link>
      </li>
      <li :class="{active:active == 2}">
        <router-link :to="{path: '/artist/album', query:{id:`${id}`}}">所有专辑</router-link>
      </li>
      <li :class="{active:active == 3}">
        <router-link :to="{path: '/artist/mv', query:{id:`${id}`}}">相关mv</router-link>
      </li>
      <li :class="{active:active == 4}">
        <router-link :to="{path: '/artist/desc', query:{id:`${id}`}}">艺人介绍</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainerleft',
  data () {
    return {
       artist: {},
       active: -1
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    path () {
      return this.$route.path
    }
  },
  watch: {
    path () {
      if(this.path == '/artist/song') this.active = 1
      if(this.path == '/artist/album') this.active = 2
      if(this.path == '/artist/mv') this.active = 3
      if(this.path == '/artist/desc') this.active = 4
    }
  },
  methods: {
    // 获取歌手详情
    async getArtistDetail () {
      let result = await this.$API.reqArtistDetail(this.id)
      this.artist = result.data
    }
  },
  mounted () {
    this.getArtistDetail()
    if(this.path == '/artist/song') this.active = 1
    if(this.path == '/artist/album') this.active = 2
    if(this.path == '/artist/mv') this.active = 3
    if(this.path == '/artist/desc') this.active = 4
  }
}
</script>

<style lang="less" scoped>
.mainerleft {
    float: left;
    width: 709px;
    padding: 27px 30px 40px 39px;
    .btm{
        width: 100%;
        position: relative;
        .name{
            max-width: 75%;
            float: left;
            height: 34px;
            line-height: 24px;
            font-weight: normal;
            font-size: 24px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }
        .alias{
            float: left;
            max-width: 23%;
            padding-left: 10px;
            font-size: 14px;
            line-height: 32px;
            color: #999;
            font-weight: normal;
        }
    }
    .avatar{
        width: 640px;
        height: 300px;
        position: relative;
        overflow: hidden;
        img{
            position: absolute;
            top:-110px;
            width: 100%;
        }
        .msk{
            position: absolute;
            width: 640px;
            height: 300px;
            // top: 34px;
            left: 0;
            background: url('../images/ban_mask.png') no-repeat;
        }
    }
    .tab{
        height: 39px;
        border: 1px solid #ccc;
        border-width: 0 1px;
        background: url('../images/tab.png');
        background-position: 0 0;
        background-repeat: repeat-x;
        li{
            position: relative;
            float: left;
            height: 39px;
            font-size: 14px;
            width: 138px;
            text-align: center;
            line-height: 39px;
            &:hover{
                background-color: #fff;
                border-top: 3px solid rgb(245, 169, 56);
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                line-height: 35px;
                cursor: pointer;
            }
            a{
                display: block;
                padding-left: 2px;
                text-decoration: none;
                color: #333;
                height: 39px;
                font-size: 14px;
                width: 100%;

                
            }
        }
        .active{
                background-color: #fff;
                border-top: 3px solid rgb(245, 169, 56);
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                line-height: 35px;
                cursor: pointer;
        }
    }
}
</style>
