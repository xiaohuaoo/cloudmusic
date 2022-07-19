<template>
  <div class="search clearfix">
    <div class="header"></div>
    <div class="wrapper">
      <div class="pgsrch">
        <input type="text" v-model="searchText" @keyup.enter="search" @blur="closeSearch" @focus="openSearch">
        <div class="search" @click="search"></div>
      </div>
      <div class="u-lst clearfix" style="display:none" ref="ulst2">
        <div class="schlist">
          <p class="note">
            <a class="underline">搜索"{{searchText}}等相关用户&gt;"</a>
          </p>
          <div class="rap clearfix">
            <div class="item clearfix">
              <ul class="clearfix" v-for="item, index in searchList.order" :key="index">
                <div class="hd clearfix">
                  <i class="songs" v-show="item == songs"></i>
                  <i class="artists" v-show="item == 'artists'"></i>
                  <i class="albums" v-show="item == 'albums'"></i>
                  <i class="playlists" v-show="item == 'playlists'"></i>  
                  <span v-show="item == 'songs'">单曲</span>
                  <span v-show="item == 'artists'">歌手</span>
                  <span v-show="item == 'albums'">专辑</span>
                  <span v-show="item == 'playlists'">歌单</span>
                </div>
              </ul>
            </div>
          </div>
          <div class="old clearfix">
            <li v-for="sttr, index in searchList[`${item}`]" :key="index">
              <i class="over" @click="goSearch(item, attr.id)">
                {{attr.name}}-
                <span v-show="item=='songs'" v-for="t,index in attr.artists" :key="index">{{t.name}} </span>
                <span v-if="item == 'albums'">{{attr.artist.name}}</span>
              </i>
            </li>
          </div>
        </div>
      </div>
      <template>
        <div class="hd">搜索"{{showText}}"，</div>
        <span class="text" v-if="type == 1">找到<span style="color:#f00;">&nbsp;{{total}}&nbsp;</span>首单曲</span> 
        <span class="text" v-if="type == 100">找到<span style="color:#f00;">&nbsp;{{total}}&nbsp;</span>个歌手</span> 
        <span class="text" v-if="type == 10">找到<span style="color:#f00;">&nbsp;{{total}}&nbsp;</span>张专辑</span> 
        <span class="text" v-if="type == 1000">找到<span style="color:#f00;">&nbsp;{{total}}&nbsp;</span>个歌单</span> 
        <span class="text" v-if="type == 1014">找到<span style="color:#f00;">&nbsp;{{total}}&nbsp;</span>个视频</span> 
      </template>
      <ul class="tabs">
        <li class="fst" v-for="item, index in searchtab" :key="index" :class="{active:type==item.type}" @click="changeSearch(item.type)">
          <div><em>{{item.name}}</em></div>
        </li>
      </ul>
      <div class="srchrst clearfix">
        <!-- 搜索单曲 -->
        <div class="songlist" v-if="type == 1">
          <li class="item" v-for="song,index in searchlist" :key="index">
            <div class="play" :class="{active2:song.id==musicNow.id}"  @click="setMusic(song.id)"></div>
            <div class="text over">
              <router-link :to="{path:'/song', query:{id: `${song.id}`}}" class="name">{{song.name}}</router-link>
              <span v-if="song.tns">-({{song.tns[0]}})</span>
              <span v-if="song.alia.length != 0">-({{song.alia[0]}})</span>
            </div>
            <div class="box"></div>
            <div class="show">
              <a text="添加到播放列表" class="a1"  @click="addMusicList(song.id)"></a>
              <a text="收藏" class="a2"></a>
              <a text="分享" class="a3"></a>
              <a text="下载" class="a4"></a>            
            </div>
            <div class="artist over">
              <li v-for="arr, index in song.ar" :key="index">
                <router-link :to="{path: '/artist/song', query:{id:`${arr.id}`}}" :title="arr.name" class="underline">{{arr.name}}</router-link>
                <span v-show="index != song.ar.length - 1">/</span>
              </li>
            </div>
            <div class="album over">
              <router-link :to="{path:'/album',query:{id:`${song.al.id}`}}" class="underline" :title="song.al.name">《{{song.al.name}}》</router-link>
            </div>
            <div class="time">
              <span>{{min(song.dt)}}:{{sec(song.dt)}}</span>
            </div>
          </li>
        </div>
        <!-- 搜索歌手 -->
        <div class="artists clearfix" v-else-if="type==100">
          <li class="art" v-for="art,index in searchlist" :key="index">
            <router-link :to="{path:'/artist/song', query:{id:`${art.id}`}}" :title="art.name" class="cover pointer">
              <img v-lazy="art.img1v1Url">
              <span class="msk"></span>
            </router-link>
            <p>
              <router-link :to="{path:'/artist/song', query:{id:`${art.id}`}}" :title="art.name" class="underline">{{art.name}}</router-link>
            </p>
          </li>
        </div>
        <!-- 搜索专辑 -->
        <div class="albums clearfix" v-else-if="type == 10">
          <li class="alb" v-for="album,index in searchlist" :key="index">
            <img v-lazy="album.blurPicUrl" />
            <router-link :to="{path:'/album', query:{id:`${album.id}`}}"></router-link>
            <p class="over name" :title="album.name">
              <router-link :to="{path:'/album', query:{id:`${album.id}`}}" style="color:#333;">{{album.name}}</router-link>
            </p>
            <p class="over artist">
              <span  v-for="artist,index in album.artists" :key="index">
                <router-link :to="{path:'/artist/song', query:{id:`${artist.id}`}}" :title="artist.name" class="underline">{{artist.name}}</router-link>
                <span v-if="index != album.artists.length-1">&nbsp;/&nbsp;</span>
              </span>
            </p>
            <a class="play"></a>
          </li>
        </div>
        <!-- 搜索歌单 -->
        <table class="playlists clearfix" v-else-if="type == 1000">
          <tbody>
            <tr class="flag" v-for="playlist,index in searchlist" :key="index">
              <td class="play">
                <div class="hdd">
                  <span class="icon"></span>
                </div>
              </td>
              <td class="w7">
                <div class="u-cover">
                  <router-link class="pointer" :to="{path:'/playlist', query:{id:`${playlist.id}`}}">
                    <img v-lazy="playlist.coverImgUrl">
                    <span class="msk"></span>
                  </router-link>
                </div>
              </td>
              <td class="text over">
                <router-link class="underline" :to="{path:'/playlist', query:{id:`${playlist.id}`}}">{{playlist.name}}</router-link>
                <div class="show">
                  <a text="添加到播放列表" class="a1"></a>
                  <a text="收藏" class="a2"></a>
                  <a text="分享" class="a3"></a>
                </div>
              </td>
              <td class="w11">{{playlist.trackCount}}首</td>
              <td class="w4">
                <span>by&nbsp;&nbsp;</span>
                <a class="underline over">{{playlist.creator.nickname}}</a>
              </td>
              <td class="w6">收藏：{{playlist.bookCount>=100000?parseInt((playlist.bookCount)/10000)+'万':playlist.bookCount}}</td>
              <td class="w6">收听：{{playlist.playCount>=100000?parseInt((playlist.playCount)/10000)+'万':playlist.playCount}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 搜索mv -->
        <div class="mvs clearfix" v-else-if="type == 1014">
          <li v-for="mv,index in searchlist" :key="index">
            <a class="u-cover">
              <img v-lazy="mv.coverUrl">
              <span class="time">{{min(mv.durationms)}}:{{sec(mv.durationms)}}</span>
              <span class="times"><i></i>{{mv.playTime >= 100000?parseInt((mv.playTime)/10000) + '万' : mv.playTime}}</span>
            </a>
            <h4 class="title over"><a class="underline" :title="mv.title">{{mv.title}}</a></h4>
            <h5 class="name over">
              <span v-for="arr,index in mv.creator" :key="index">
                <a :title="arr.userName" class="underline">{{arr.userName}}</a>
                <span v-show="index != mv.creator.length - 1">/</span>
              </span>
            </h5>
          </li>
        </div>     
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'search',
  components: { Pagination },
  data () {
    return {
      searchText: '', // 搜索内容
      searchList: {}, // 搜索结果列表
      // 搜索选项
      searchtab: [
        {
          name: '单曲',
          type: 1
        },
        {
          name: '歌手',
          type: 100
        },
        {
          name: '专辑',
          type: 10
        },
        {
          name: '歌单',
          type: 1000
        },
        {
          name: '视频',
          type: 1014
        }
      ],
      pageNo: 1,
      pageSize: 30,
      total: 10,
      searchList:{} // 搜索建议返回的结果
    }
  },
  computed: {
    type () {
      return this.$route.query.type || '1'
    },
    keywords () {
      return this.$route.query.keywords
    },
    showText () {
      return this.$route.query.keywords
    },
    musicNow () {
      return this.$store.state.music.music
    }
  },
  watch: {
    type () {
      this.pageNo = 1
      this.getSearchList()
    },
    searchText () {
      this.getSearchSuggest()
    }
  },
  methods: {
    // 获取搜索信息
    async getSearchList () {
      if (this.type == 1 || this.type == 1000) {
        this.pageSize = 30
      } else if (this.type == 100) {
        this.pageSize = 90
      } else if (this.type == 10) {
        this.pageSize = 75
      }
      let result = await this.$API.reqCloudSearch(this.keywords, this.type, this.pageSize, (this.pageNo-1) * this.pageSize)
      this.searchlist = result.result.songs || result.result.artists || result.result.albums || result.result.playlists || result.result.videos
      this.total = result.result.songCount || result.result.artistCount || result.result.albumCount || result.result.playlistCount || result.result.videoCount
    },
    min (time) {
      if(parseInt(time/60000) < 10)
        return '0'+parseInt(time / 60000)
      else return parseInt(time / 60000)
    },
    sec (time) {
        let x = parseInt(time / 60000)
        let y = parseInt(time / 1000 - x * 60)
        if(y < 10) return '0' + y
        else return y
    },
    // 切换搜索种类
    changeSearch (type) {
      this.$router.push({
        path: '/search',
        query: {
          keywords: this.keywords,
          type
        }
      })
    },
    // 搜索
    search () {
      this.$router.push({
        path: '/search',
        query: {
          keywords: this.searchText,
          type: this.type
        }
      })
    },
    // 获取搜索建议
    async getSearchSuggest () { 
      let result = await this.$API.reqSerachSuggest(this.searchText)
      this.searchList = result.result
    },
    // 关闭搜索框
    closeSearch () {
      setTimeout(() => {
        this.$refs.ulst2.style.display='none'
      }, 100)
    },
    // 打开搜索框
    openSearch () {
      if (this.searchText != ''){
        this.$refs.ulst2.style.display = 'block'
      }
    },
    // 搜索
    goSearch (path, id) {
      path = path.substr(0, path.length - 1)
      if (path == 'artist') {
        path = 'artist/song'
      }
      this.$router.push({
        path: `/${path}`,
        query: {
          id
        }
      })
    },
    // 添加音乐至播放列表
    addMusicList (ids) {
      this.$store.dispatch('addMusicList', ids)
    },
    // 设置当前播放的音乐
    setMusic (id) {
      this.$store.dispatch('setMusics', id)
      this.$store.dispatch('addMusicList', id)
      setTimeout(() => {
        this.$bus.$emit('play') 
      }, 500)    
    },
    getPageNo (page) {
      this.pageNo = page
      this.getSearchList()
    }
  },
  mounted () {
    this.searchText = this.showText
    this.getSearchList()
  }
}
</script>

<style lang="less" scoped>
.search {
    width: 100%;
    .header{
        height: 5px;
        width: 100%;
        position: relative;
        top: 0;
        background-color: #C20C0C;
    }
    .wrapper{
        width: 982px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        min-height: 700px;
        padding: 40px;
        .pgsrch{
            width: 420px;
            height: 40px;
            margin: 0 auto;
            background: url('./images/sprite.png') no-repeat 0 0;
            background-position: 0 0;
            z-index: 10;
            input{
                width: 320px;
                height: 17px;
                margin-left: 20px;
                margin-top: 12px;
            }
            .search{
                width: 50px;
                height: 40px;
                float: right;
                &:hover{
                    cursor: pointer;
                    background: url('./images/sprite.png') no-repeat -430px 0;
                }  
            }
        }
        .u-lst{
            position: absolute;
            top:160px;
            width: 420px;
            z-index: 120;
            left: 548px;
            box-sizing: border-box;
            border: 1px solid #bebebe;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 4px 7px #555;
            text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
            .schlist{
            width: 100%;
            .note{
                width: 100%;
                padding: 11px 10px;
                height: 39px;
                border-bottom: 1px solid #979797;
                a{
                color: #000;
                &:hover{
                    color: #000;
                }
                }
            }
            .rap{
                width: 100%;
                .item{
                width: 100%;
                display: block;
                ul{
                    width: 100%;
                    .hd{
                    float: left;
                    width: 63px;
                    padding: 10px 0 0 10px;
                    i{
                        float: left;
                        margin: 2px 4px 0 0;
                        width: 14px;
                        height: 15px;
                        background: url('./images/icon.png');
                    }
                    .songs{
                        background-position: -35px -300px;
                    }
                    .artists{
                        background-position: -50px -300px;
                    }
                    .albums{
                        background-position: -35px -320px;
                    }
                    .playlists{
                        background-position: -50px -320px;
                    }
                    span{
                        line-height: 15px;
                        text-align: left;
                        font-size: 12px;
                    }
                    }
                    .odd{
                    float: left;
                    width: 353px;
                    background: #f9f8f8;
                    margin-left: 2px;
                    margin-top: 0px;
                    padding: 6px 0 5px;
                    border-top: 1px solid #e2e2e2;
                    border-left: 1px solid #e2e2e2;
                    li{
                        width: 100%;
                        
                        i{
                        padding-left: 10px;
                        display: block;
                        height: 24px;
                        color: #000;
                        line-height: 24px;
                        &:hover{
                            color: #000;
                            background-color: #ddd;
                            cursor: pointer;
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }
        >.hd{
            color: #999;
            display: inline-block;
            margin-top: 28px;
            margin-bottom: 17px;
            height: 16px;
        }
        .text{
            color: #999;
        }
        .tabs{
            width: 100%;
            height: 39px;
            border: 1px solid #ccc;
            border-width: 0 1px;
            background: url('./images/tab.png');
            background-position: 0 0;
            background-repeat: repeat-x;
            display: flex;
            .fst{
                width: 20%;
                text-align: center;
                cursor: pointer;
                position: relative;
                padding-left: 2px;
                &:hover{
                    background: url('./images/tab.png') no-repeat -1px -45px;
                }
                em{
                    display: block;
                    width: 100%;
                    height: 39px;
                    padding: 2px 2px 0 0;
                    line-height: 37px;
                    font-size: 14px;
                    text-align: center;
                }
            }
            .active{
                background:url('./images/tab.png') no-repeat left -90px;
                em{
                    background:url('./images/tab.png') no-repeat right -90px;
                }
            }
        }
        .srchrst{
            margin-bottom: 50px;
            width: 100%;
            margin-top: 20px;
            position: relative;
            .songlist{
                width: 100%;
                min-height: 700px;
                .item{
                    padding: 10px 10px 8px 18px;
                    border: 1px solid #fff;
                    display: block;
                    width: 100%;
                    height: 42px;
                    .play{
                        float: left;
                        width: 17px;
                        height: 17px;
                        margin-right: 5px;
                        background: url('./images/table.png') no-repeat 0 -103px;
                        cursor: pointer;
                        &:hover{
                            background: url('./images/table.png') no-repeat 0 -128px;
                        }
                    }
                    .active2{
                        background-position: -20px -128px;
                        &:hover{
                            background-position: -20px -128px;
                        }
                    }
                    .text{
                        width: 330px;
                        height: 100%;
                        float: left;
                        margin-right: 30px;
                        a{
                            color: #0c73c2;
                            &:hover{
                                color: #0c73c2;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                    }
                    .box{
                        float: left;
                        display: block;
                        width: 79px;
                        height: 18px;
                    }
                    .show{
                        float: left;
                        width: 79px;
                        height: 18px;
                        display: none;
                        a{
                            margin: 2px 0 0 4px;
                            width: 18px;
                            height: 16px;
                            display: block;
                            float: left;
                            background: url('./images/table.png') no-repeat;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .a1{
                            width: 13px;
                            height: 13px;
                            margin-top:2px;
                            margin-left: 0;
                            background: url('./images/icon.png') no-repeat;
                            background-position: 0 -700px;

                            &:hover{
                                background-position: -22px -700px;
                            }
                        }

                        .a2{
                            background-position: 0 -174px;
                            &:hover{
                                background-position: -20px -174px;
                            }
                        }
                        .a3{
                            background-position: 0 -195px;
                            &:hover{
                                background-position: -20px -195px;
                            }
                        }
                        .a4{
                            background-position: -81px -174px;
                            &:hover{
                                background-position: -104px -174px;
                            }
                        }
                    }
                    .artist{
                        float: left;
                        width: 130px;
                        margin-left: 10px;
                        margin-right:20px ;
                        height: 18px;
                        li{
                            display: inline;
                            // float: left;
                            a:hover{
                                color: #666;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                    }
                    .album{
                        width: 150px;
                        margin-right: 30px;
                        float: left;
                        height: 100%;
                        a:hover{
                            color: #666;
                        }
                    }
                    .time{
                        width: 50px;
                        float: left;
                    }
                    &:hover{
                        background-color: #eee;
                        .show{
                            display: block;
                        }
                        .box{
                            display: none;
                        }
                    }
                }
                .item:nth-child(even){
                    background: #f7f7f7;
                    border-color: #f7f7f7;
                    &:hover{
                        background-color: #eee;
                    }
                }
            }
            .artists{
                width: 924px;
                margin-left: -24px;
                min-height: 700px;
                .art{
                    float: left;
                    padding-left: 24px;
                    padding-bottom: 30px;
                    width: 154px;
                    height: 184px;
                    .cover{
                        display: block;
                        width: 130px;
                        height: 130px;
                        position: relative;
                        img{
                            width: 130px;
                            height: 130px;
                        }
                        .msk{
                            display: block;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: url('./images/coverall.png') no-repeat 0 -680px;
                            z-index: 2;
                        }
                    }
                    p{
                        margin-top: 8px;
                        a:hover{
                            color: #666;
                        }
                    }
                }
            }
            .albums{
                width: 933px;
                margin-left: -33px;
                .alb{
                    float: left;
                    width: 186px;
                    height: 208px;
                    padding:  0 0 30px 33px;
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
            .playlists{
                width: 100%;
                tbody{
                    border-collapse: separate;
                    border-spacing: 0;
                }
                tr{
                    position: relative;
                    height: 62px;
                    background-color: rgb(250,250,250);
                    line-height: 50px;
                    td{
                        float: left;
                        display: table-cell;
                        vertical-align: inherit;
                        height: 62px;
                    }
                    .play{
                        width: 46px;
                        padding: 6px 10px 6px 11px;
                        height: 62px;
                        .hdd{
                            padding-left: 5px;
                            width: 25px;
                            height: 18px;
                            margin-top: 16px;
                            .icon{
                                float: right;
                                width: 17px;
                                height: 17px;
                                cursor: pointer;
                                background: url('./images/table.png') no-repeat  0 -103px;
                                &:hover{
                                    background-position: 0 -128px;;
                                }
                            }
                        }
                    }
                    .w7{
                        width: 70px;
                        height: 62px;
                        padding: 6px 10px;
                        .u-cover{
                            width: 100%;
                            height: 100%;    
                            position: relative;
                            a{
                                display: block;
                                width: 100%;
                                height: 100%;
                                img{
                                    width: 100%;
                                }
                            }
                            .msk{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: url('./images/coverall.png') no-repeat -160px 0;
                            }
                        }
                    }
                    .text{
                        width: 317px;
                        height: 62px;
                        padding: 6px 10px;
                        position: relative;
                        a{
                            float: left;
                            width: 240px;
                            color: #333;
                            &:hover{
                            color: #333;
                            }
                        }
                        .show{
                            width: 59px;
                            height: 18px;
                            display: none;
                            position: absolute;
                            right: 0px;
                            top: 21px;
                            a{
                                margin: 2px 0 0 4px;
                                width: 18px;
                                height: 16px;
                                display: block;
                                float: left;
                                background: url('./images/table.png') no-repeat;
                                &:hover{
                                    cursor: pointer;
                                }
                            }
                            .a1{
                                width: 13px;
                                height: 13px;
                                margin-top:2px;
                                margin-left: 0;
                                background: url('./images/icon.png') no-repeat;
                                background-position: 0 -700px;

                                &:hover{
                                    background-position: -22px -700px;
                                }
                            }
                            .a2{
                                background-position: 0 -174px;
                                &:hover{
                                    background-position: -20px -174px;
                                }
                            }
                            .a3{
                                background-position: 0 -195px;
                                &:hover{
                                    background-position: -20px -195px;
                                }
                            }
                        }
                    }
                    .w11{
                        width: 80px;
                        padding-right: 0;
                        padding-left: 25px;
                        padding-top: 6px;
                        padding-bottom: 6px;
                        color: #999;
                    }
                    .w4{
                        width: 140px;
                        padding: 6px 10px;
                        span{
                            float: left;
                        }
                        a{
                            float: left;
                            width: 95px;
                            color: #333;
                            &:hover{
                                color: #333;
                            }
                        }
                    }
                    .w6{
                        width: 120px;
                        padding: 6px 10px;
                    }
                    &:hover{
                            background-color: #eee;
                        .show{
                            display: block;
                        }
                    }
                }
                tr:nth-child(even){
                    background-color: rgb(238, 238, 238);
                    &:hover{
                        background-color: #eee;
                    }
                }
            }
            .mvs{
                width: 926px;
                margin-left: -26px;
                li{
                    padding: 0 0 40px 26px;
                    width: 185px;
                    height: 177px;
                    float: left;
                    .u-cover{
                        width: 159px;
                        height: 90px;
                        display: block;
                        position: relative;
                        
                        img{
                            width: 159px;
                            height: 90px;
                        }
                        .time{
                            position: absolute;
                            left: 5px;
                            bottom: 2px;
                            color: #fff;
                        }
                        .times{
                            position: absolute;
                            top: 2px;
                            padding-right: 5px;
                            right: 0;
                            color: #fff;
                            background-color: rgba(0,0,0,.2);
                            i{
                                width: 15px;
                                height: 10px;
                                display: inline-block;
                                position: relative;
                                top:1px;
                                left: -3px;
                                background: url('./images/icon2.png') no-repeat -60px -310px;
                            }
                        }
                    }
                    h4{
                        width: 100%;
                        height: auto;
                        margin: 7px 0 1px;
                        border: none;
                        font-size: 14px;
                        font-weight: normal;
                        a:hover{
                            color: #666;
                        }
                    }
                    h5{
                        width: 100%;
                        font-weight: normal;
                        font-size: 12px;
                        a{
                            margin: 0 1px;
                        }
                        a:hover{
                            color: #666;
                        }
                    }
                }
            }
        }
    }
}
</style>
