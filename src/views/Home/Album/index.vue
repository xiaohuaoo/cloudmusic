<template>
  <div class="album">
    <!-- 热门新碟 -->
    <div class="hot clearfix">
      <div class="tit">
        <h3><span>热门新碟</span></h3>
      </div>
      <ul class="m-list clearfix">
        <li v-for="album, index in hotAlbums" :key="index">
          <img v-lazy="album.blurPicUrl" />
          <router-link :to="{ path: '/album', query: {id: `${album.id}`}}"></router-link>
          <p class="over name" :title="album.name">
            <router-link :to="{ path: '/album', query: {id: `${album.id}`}}" style="color:#333;">{{album.name}}</router-link>
          </p>
          <p class="over artist">
            <span v-for="artist, index in album.artists" :key="index">
              <router-link :to="{ path: '/artist/song', query: {id: artist.id}}" :title="artist.name" class="underline">{{artist.name}}</router-link>
              <span v-if="index != album.artists.length-1">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            </span>
          </p>
          <a class="play"></a>
        </li>
      </ul>
    </div>
    <!-- 全部新碟 -->
    <div class="all">
      <div class="tit">
        <h3><span>全部新碟</span></h3>
        <div class="tab clearfix">
          <li v-for="tit, index in title" :key="index">
            <a class="underline" @click="changeArea(tit.area)"></a>
            <span class="line" v-if="index != 4">|</span>
          </li>
        </div>
      </div>
      <ul class="m-list clearfix">
        <li v-for="album, index in showAlbums" :key="index">
          <img v-lazy="album.blurPicUrl" />
          <router-link :to="{path: '/album', query: {id: `${album.id}`}}"></router-link>
          <p class="over name" :title="album.name">
            <router-link :to="{path: '/album', query:{ id:`${album.id}`}}" style="color:#333;">{{album.name}}</router-link>
          </p>
          <p class="over artist">
            <span v-for="artist,index in album.artists" :key="index">
              <router-link :to="{path:'/artist/song', query: {id:artist.id}}" :title="artist.name" class="underline">{{artist.name}}</router-link>
              <span v-if="index != album.artists.length-1">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            </span>
          </p>
          <a class="play"></a>
        </li>
      </ul>
    </div>
    <!-- 分页器 -->
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
      hotAlbums: [], // 热门新碟
      allAlbum: [], // 全部新碟
      showAlbums: [], // 展示的全部新碟
      // 全部新碟的标题分类
      title: [
        {
          name: '全部',
          area: 'ALL'
        },
        {
          name: '华语',
          area: 'ZH'
        },
        {
          name: '欧美',
          area: 'EA'
        },
        {
          name: '韩国',
          area: 'KR'
        },
        {
          name: '日本',
          area: 'JP'
        }
      ],
      pageSize: 35,
      pageNo: 1,
      type: 'new',
      total: 1000
    }
  },
  computed: {
    area () {
      if (this.$route.query.area === undefined) return 'ALL'
      return this.$route.query.area
    }
  },
  methods: {
    // 获取热门新碟
    async getNewset () {
      const result = await this.$API.reqAlbumNewset()
      this.hotAlbums = result.albums.slice(0, 10)
    },
    // 获取全部新碟
    async getAll () {
      const result = await this.$API.reqAlbum(this.pageSize, (this.pageNo - 1) * this.pageSize, this.area, this.type)
      if (result.weekData) {
        this.total = result.weekData.length
        this.allAlbum = result.weekData
      } else {
        this.total = result.monthData.length
        this.allAlbum = result.monthData
      }
      this.changeAlbums()
    },
    changeArea (area) {
      this.$router.push({
        path: '/home/album',
        query: {
          area
        }
      })
    },
    // 手动分页
    changeAlbums () {
      this.showAlbums = this.allAlbum.slice((this.pageNo - 1) * this.pageSize, this.pageSize * this.pageNo)
    },
    // 接受当前页码
    getPageNo (pageNo) {
      this.pageNo = pageNo
      this.changeAlbums()
    }
  },
  mounted () {
    this.getNewset()
    this.getAll()
  }
}
</script>

<style lang="less" scoped>
.album {
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  background-color: #fff;
  min-height: 700px;
  padding: 40px;
  .hot{
    .tit {
    width: 100%;
    height: 42px;
    border-bottom: 2px solid #c20c0c;

    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
      color: #333;
    }
  }
  }
  .all{
    .tit {
      width: 100%;
      height: 42px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: normal;
        color: #333;
      }
      .tab{
        float: left;
        margin: 12px 0 0 20px;

        li{
          float: left;
          a{
            float: left;
            &:hover{
              color: #666;
            }
          }
          .line{
            display: block;
            float: left;
            margin: 0 10px;
            margin-top: -2px;
          }
        }
      }
    }
  }
  .m-list {
    margin: 20px 0 0 -33px;
    width: 933px;
    min-height: 416px;

    li {
      float: left;
      width: 186px;
      height: 208px;
      padding: 0 0 30px 33px;
      position: relative;
      img {
        width: 130px;
        height: 130px;
      }
      >a {
        width: 153px;
        height: 130px;
        position: absolute;
        top: 0;
        left: 33px;
        background: url("./images/coverall.png") no-repeat 0 -845px;
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
      .artist{
        a:hover{
          color: #666;
        }
      }
      .play {
        position: absolute;
        width: 28px;
        height: 28px;
        left: 130px;
        top: 95px;
        background: url("./images/iconall.png") no-repeat 0 -140px;
        display: none;
      }
      &:hover .play {
        display: block;
      }
    }
  }
}
</style>
