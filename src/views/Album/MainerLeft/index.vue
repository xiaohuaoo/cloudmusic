<template>
  <div class="mainerleft">
    <div class="wrap">
      <div class="m-info clearfix">
        <div class="cover">
          <img v-lazy="album.blurPicUrl">
          <span class="msk"></span>
        </div>
        <div class="cnt clearfix">
          <div class="hd clearfix">
            <i class="icn"></i>
            <h2>{{album.name}}</h2>
          </div>
          <p class="intr">
            <span>歌手:</span>
            <router-link :to="{path:'/artist/song',query:{id:`${album.artist.id}`}}" class="underline" v-if="album.artist">{{album.artist.name}}</router-link>
          </p>
          <p class="intr">
            <span>发行时间:{{album.time}}</span>
          </p>
          <p class="intr" v-if="album.company">
            <span>发行公司：{{album.company}}</span>
          </p>
          <!-- 底部按钮 -->
          <div class="btns">
            <a class="play" title="播放">
              <i class="ply"></i>
              <span>播放</span>
            </a>
            <a class="add"></a>
            <a class="dis">
              <span>收藏</span>
            </a>
            <a class="share">
              <span v-if="album.info">({{album.info.shareCount}})</span>
            </a>
            <a class="download">
              <span>下载</span>
            </a>
            <a class="comment">
              <span v-if="album.info">({{album.info.commentCount}})</span>
            </a>          
          </div>
        </div>
        <!-- 专辑描述 -->
        <div class="desc">
          <p style="color:#000;font-weight:bold;">专辑介绍：</p>
          <div class="desc-dot" v-show="half" v-if="album.description">
            <p v-html="album.description.slice(0,album.description.length/4)"></p>
            <a class="underline" @click="half=false">展开
              <i class="down"></i>
            </a>
          </div>
          <div class="desc-more" v-show="!half">
            <p v-html="album.description"></p>
            <a class="underline" @click="half=true">收起
              <i class="up"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="songlist">
        <div class="tlt">
          <h3>歌曲列表</h3>
          <span class="sub">{{ album.size }}首歌</span>        </div>
        <div class="song">
          <div class="header">
            <li class="w1"></li>
            <li class="w2">歌曲标题</li>
            <li class="w3">时长</li>
            <li class="w4">歌手</li>          
          </div>
          <div class="mainer">
            <ul v-for="song, index in songdetail" :key="index">
              <li class="m1 over underline">
                <span>{{ index + 1 }}</span>
                <i class="play" @click="setMusic(song.id)"></i>
              </li>
              <li class="m2 over underline" :title="song.name">
                <router-link :to="{path: '/song', query:{id: `${song.id}`}}">
                  <span class="underline">{{ song.name }}</span>
                  <span v-if="song.alia.length != 0" style="margin-left: 6px; color: #999" >-{{ song.alia[0] }}</span>
                </router-link>
                <i class="mv"></i>
              </li>
              <li class="m3 over underline">
                <span class="time">{{ min(song) }}:{{ sec(song) }}</span>
                <div class="show">
                  <a title="添加到播放列表" class="a1" @click="addMusicList(song.id)"></a>
                  <a title="收藏" class="a2"></a>
                  <a title="分享" class="a3"></a>
                  <a title="下载" class="a4"></a>
                </div>
              </li>
              <li class="m4 over underline">
                <router-link :to="{path: '/artist/song', query:{id: song.ar[0].id}}" :title="song.ar[0].name">
                  <span :title="song.ar[0].name">{{ song.ar[0].name }}</span>  
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
import Comment from './Comment'
export default {
  name: 'mainerleft',
  components: { Comment },
  data () {
    return {
      half: true,
      album: {},
      songdetail: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id || 139483611
    }
  },
  methods: {
    // 获取专辑描述
    async getAlbum () {
      let result = await this.$API.reqAlbums(this.id)
      this.album = result.album
      this.album.description = this.album.description.replace(/\n/g, '<br>')
      var a = new Date(result.album.publishTime)
      this.album.time = a.toLocaleDateString().replace(/\//g,  "-")
      this.songdetail = result.songs
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
    min (song) {
      if (parseInt(song.dt / 60000) < 10) {
        return '0' + parseInt(song.dt / 60000)
      } else {
        return parseInt(song.dt / 60000)
      }
    },
    sec (song) {
      let x = parseInt(song.dt / 60000)
      let y = parseInt(song.dt / 1000 - x * 60)
      if (y < 10) {
        return '0' + y
      } else {
        return y
      }
    }
  },
  mounted () {
    this.getAlbum()
  }
}
</script>

<style lang="less" scoped>
.mainerleft {
    width: 709px;
    float: left;
    .wrap{
        width: 100%;
        padding: 47px 30px 40px 39px;
        .m-info{
                .cover{ 
                    float: left;
                    width: 177px;
                    height: 177px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .msk{
                        display: block;
                        position: absolute;
                        width: 209px;
                        height: 177px;
                        top: 0;
                        background: url('../images/coverall.png') no-repeat 0 -986px;
                    }
                }
                .cnt{
                    width: 410px;
                    float: right;
                    position: relative;
                    .hd{
                        margin-bottom: 12px;
                        .icn{
                            float: left;
                            display: block;
                            width: 54px;
                            height: 24px;
                            background: url('../images/icon.png') no-repeat 0 -186px;
                        }
                        h2{
                            float: left;
                            line-height: 24px;
                            font-size: 20px;
                            font-weight: normal;
                            margin-left: 10px;
                            color: #000;
                        }
                    }
                    .intr{
                        margin-top: 4px;
                        a{
                            color: #0c73c2;;
                        }
                    }
                    .btns{
                        height: 31px;
                        display: flex;
                        margin-top: 20px;
                        .play{
                            width: 66px;
                            padding-left: 5px;
                            background: url('../images/button2.png') no-repeat 0 -1652px;;
                            text-align: center;
                            line-height: 31px;
                            height: 31px;
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;

                            i{
                                width: 20px;
                                height: 18px;
                                margin: 6px -2px 2px 0;
                                float: left;
                                background: url('../images/button2.png') no-repeat 0 -1622px;
                            }

                            span{
                                color: #fff;
                            }
                            &:hover{
                                cursor: pointer;  
                            }
                        }

                        .add{
                            width: 31px;
                            height: 31px;
                            margin-right: 5px;
                            background: url('../images/button2.png') no-repeat 0 -1588px;
                            
                            &:hover{
                                cursor: pointer;
                                background-position: -40px -1588px;  
                            }
                            &:active{
                                background-position: -80px -1588px;  
                            }
                        }

                        .dis{
                            // width: 92.6px;
                            // padding-right: 5px;
                            margin-right: 6px;
                            height: 100%;
                            background: url('../images/button2.png') no-repeat;
                            background-position: 0px -977px;
                            span{
                                padding-right: 10px;
                                display: inline-block;
                                height: 100%;
                                width: 100%;
                                background: url('../images/button2.png') no-repeat right -1106px;
                                line-height: 30px;
                                padding-left: 30px;
                            }
                            &:hover{
                                background-position: 0px -1063px;
                                color:#666;
                                cursor:pointer;
                            }
                        }
                        
                        .share{
                            height: 31px;
                            margin-right: 6px;
                            float: left;
                            line-height: 30px;
                            min-width: 23px;
                            cursor: pointer;
                            background: url('../images/button2.png') no-repeat;
                            background-position: 0 -1225px;

                            span{
                                padding-right: 10px;
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../images/button2.png') no-repeat;
                                background-position: right -1020px;
                            }
                            
                            &:hover{
                                color:#666;
                                cursor: pointer;
                            }
                        }

                        .download{
                            margin-right: 5px;
                            width: 60px;
                            height: 31px;
                            line-height: 30px;
                            min-width: 23px;
                            cursor: pointer;
                            background: url('../images/button2.png') no-repeat;
                            background-position: 0 -2761px;

                            span{
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../images/button2.png') no-repeat;
                                background-position: right -1020px;
                            }
                            &:hover{
                                color:#666;
                                cursor: pointer;
                            }
                        }

                        .comment{
                            margin-right: 5px;
                            
                            height: 31px ;
                            line-height: 30px;
                            min-width: 23px;
                            cursor: pointer;
                            background: url('../images/button2.png') no-repeat;
                            background-position: 0 -1465px;

                            span{
                                // width: 100%;
                                padding-right: 10px;
                                height: 100%;
                                display: inline-block;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../images/button2.png') no-repeat;
                                background-position: right -1020px;
                            }
                            &:hover{
                                color:#666;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .desc{
                        float: left;
                        margin-top: 25px;
                        width: 100%;
                        .desc-dot,
                        .desc-more{
                            margin-left: 20px;
                            p{
                                margin: 5px 0;
                                color: #666;
                                line-height: 28px;
                            }
                            a{
                                float: right;
                                color: #0c73c2;
                                .down{
                                    display: inline-block;
                                    width: 11px;
                                    height: 8px;
                                    background: url('../images/icon.png') no-repeat;
                                    background-position: -65px -520px;
                                }
                                .up{
                                    display: inline-block;
                                    width: 11px;
                                    height: 8px;
                                    background: url('../images/icon.png') no-repeat;
                                    background-position: -45px -520px;
                                }
                                &:hover{
                                    color: #0c73c2;;
                                }
                            }
                        }
                }            
        }
        .songlist {
            width: 640px;
            .tlt {
                width: 100%;
                height: 35px;
                border-bottom: 2px solid #c20c0c;

                h3 {
                    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                    font-size: 20px;
                    line-height: 28px;
                    font-weight: normal;
                    color: #333;
                    float: left;
                }

                .sub {
                margin: 9px 0 0 20px;
                float: left;
                color: #666;
                font-size: 12px;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
                }

            }
            .song {
                width: 100%;
                border: 1px solid #d9d9d9;
                .header {
                    width: 100%;
                    height: 39px;
                    display: flex;
                    padding: 0;
                    li {
                        border-right: 1px solid #d9d9d9;
                        padding: 8px 10px;
                        background-image: linear-gradient(
                        rgb(255, 255, 255),
                        rgb(240, 240, 240)
                        );
                        box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
                    }
                    .w1 {
                        width: 74.5px;
                    }
                    .w2 {
                        width: 342.5px;
                    }
                    .w3 {
                        width: 93px;
                    }
                    .w4 {
                        width: 129px;
                    }
                }

                .mainer {
                    width: 100%;
                    display: block;
                    ul:nth-of-type(odd) {
                        background: #f7f7f7;
                    }
                    .good {
                        height: 70px;
                        span,
                        a,
                        i {
                        display: block;
                        margin-top: 20px !important;
                        }
                    }
                    ul {
                        height: 30px;
                        width: 100%;
                        display: flex;

                        &:hover .time {
                            display: none !important;
                        }
                        &:hover .show {
                            display: block !important;
                        }

                        li {
                            padding: 6px 10px;
                        }

                        .m1 {
                            width: 74.5px;
                            // height: 100%;
                            padding: 6px 10px;
                            line-height: 18px;

                            span {
                                float: left;
                                width: 25px;
                                height: 18px;
                                color: #999;
                                text-align: center;
                            }
                        .play {
                            float: right;
                            display: block;
                            width: 17px;
                            height: 17px;
                            background: url("../images/table.png") no-repeat -0px -103px;

                            &:hover {
                                background-position: -0px -128px;
                                cursor: pointer;
                            }
                            // background: url("../../images/table.png") no-repeat -20px -128px;
                        }
                        }

                        .m2 {
                            width: 342px;
                            a {
                                width: 280px;
                                color: #333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                float: left;
                            }
                        }

                        .m3 {
                            width: 93px;
                            .time {
                                display: block;
                            }
                            .show {
                                width: 79px;
                                height: 18px;
                                display: none;
                                a {
                                margin: 2px 0 0 4px;
                                width: 18px;
                                height: 16px;
                                display: block;
                                float: left;
                                background: url("../images/table.png") no-repeat;
                                &:hover {
                                    cursor: pointer;
                                }
                                }
                                .a1 {
                                width: 13px;
                                height: 13px;
                                margin-top: 2px;
                                margin-left: 0;
                                background: url("../images/icon.png") no-repeat;
                                background-position: 0 -700px;

                                &:hover {
                                    background-position: -22px -700px;
                                }
                                }

                                .a2 {
                                background-position: 0 -174px;
                                &:hover {
                                    background-position: -20px -174px;
                                }
                                }
                                .a3 {
                                background-position: 0 -195px;
                                &:hover {
                                    background-position: -20px -195px;
                                }
                                }
                                .a4 {
                                background-position: -81px -174px;
                                &:hover {
                                    background-position: -104px -174px;
                                }
                                }
                            }
                        }

                        .m4 {
                            width: 129px;
                            color: #333;
                            & a:hover {
                                color: #666;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
