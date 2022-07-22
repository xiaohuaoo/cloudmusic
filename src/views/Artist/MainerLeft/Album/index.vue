<template>
  <div class="album">
    <ul class="m-list clearfix">
      <li v-for="album, index in hotalbums" :key="index">
        <img v-lazy="album.blurPicUrl" />
        <router-link :to="{path:'/album', query:{id: `${album.id}`}}"></router-link>
        <p class="over name" :title="album.name">
          <router-link :to="{path: '/album', query:{id:`${album.id}`}}" style="color:#333">{{ album.name }}</router-link> 
        </p>
        <p class="over artist">
          <span>{{album.time}}</span>
        </p>
        <a class="play"></a>
      </li>
    </ul>
    <Pagination :pageNo='pageNo' :pageSize='pageSize' :total='total' :continues='5' @getPageNo="getPageNo"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'album',
  components: { Pagination },
  data () {
    return {
      hotalbums: [],
      pageNo: 1,
      pageSize: 12,
      total: 0
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    async getAlbum () {
      let result = await this.$API.reqArtistAlbum(this.id, this.pageSize, (this.pageNo - 1) * this.pageSize)
      this.total =  result.artist.albumSize
      this.hotalbums = result.hotAlbums
      this.hotalbums.forEach(item => {
        var a = new Date(item.publishTime)
        item.time = a.toLocaleDateString().replace(/\//g, ".")
      })
    },
    getPageNo (page) {
      this.pageNo = page
      this.getAlbum()
    }
  },
  mounted () {
    this.getAlbum()
  }
}
</script>

<style lang="less" scoped>
.album {
  width: 640px;
  .m-list {
    margin: 20px 0 0 -18px;
    width: 658px;
    min-height: 416px;

    li {
      float: left;
      width: 163px;
      height: 205px;
      padding: 0 0 30px 18px;
      position: relative;
      img {
        width: 120px;
        height: 120px;
      }
      > a {
        width: 145px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 18px;
        background: url("../../images/coverall.png") no-repeat -170px -850px;
        &:hover {
          cursor: pointer;
        }
      }
      .name {
        text-align: left;
        color: #333;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-text-size-adjust: none;
        display: block;
        margin: 8px 0 3px;
        font-size: 14px;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .artist {
        a:hover {
          color: #666;
        }
      }
      .play {
        position: absolute;
        width: 28px;
        height: 28px;
        left: 104px;
        top: 90px;
        background: url("../../images/iconall.png") no-repeat 0 -140px;
        display: none;
      }
      &:hover .play {
        display: block;
      }
    }
  }
}
</style>
