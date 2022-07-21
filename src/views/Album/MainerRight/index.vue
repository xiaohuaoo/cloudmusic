<template>
  <div class="mainerright">
    <div class="hd3">
      <span>Ta的其他热门专辑</span>
      <router-link :to="{path:'/artist/album',query:{id:`${uid}`}}" class="underline">全部&gt;</router-link>    </div>
    <div class="m-list">
      <li v-for="album,index in albumlist" :key="index">
        <router-link :to="{path:'/album', query:{id:`${album.id}`}}" class="pointer cvr"><img v-lazy="album.blurPicUrl"></router-link>
        <div class="info">
          <p class="name over">
            <router-link :to="{path:'/album', query:{id:`${album.id}`}}" class="underline" :title="album.name">{{album.name}}</router-link>
          </p>
          <p class="time">{{album.time}}</p>
        </div>
      </li>   
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainerright',
  data () {
    return {
      albumlist: [],
      uid: null
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
    // 获取歌手专辑
    async getArt () {
      let result = await this.$API.reqArtistAlbum(this.uid, 5 ,1)
      console.log(result)
      this.albumlist = result.hotAlbums
      this.albumlist.forEach(item => {
        var a = new Date(item.publishTime)
        item.time =  a.toLocaleDateString().replace(/\//g, "-")
      })   
    },
    // 获取专辑描述
    async getAlbum () {
      let result = await this.$API.reqAlbums(this.id)
      this.uid = result.album.artist.id
      this.getArt()
    }
  },
  mounted () {
    this.getAlbum()
  }
}
</script>

<style lang="less" scoped>
.mainerright {
    position: relative;
    float: right;
    width: 270px;
    zoom: 1;
    padding: 20px 40px 40px 30px;
    .hd3{
        height: 23px;
        position: relative;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        font-weight: bold;
        a{
            float: right;
            font-weight: normal;
            color: #999;
        }
    }
    .m-list{
        margin-bottom: 25px;
        width: 100%;
        li{
            width: 100%;
            height: 50px;
            margin-bottom: 15px;
            line-height: 24px;
            .cvr{
                width: 50px;
                height: 50px;
                float: left;
                display: block;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
            .info{
                float: left;
                margin-left: 12px;
                .name{
                    width: 138px;
                    a{
                        color: #000;
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
