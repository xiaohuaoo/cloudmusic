<template>
  <div class="playlist cleafix">
    <div class="wrapper clearfix">
      <!-- 歌单详情 -->
      <div class="header" v-show="id != undefined">
        <div class="info clearfix">
          <!-- 图片 -->
          <div class="cover">
            <img v-lazy="playlist.coverImgUrl">
            <div class="mask"></div>
          </div>
          <!-- 文字信息 -->
          <div class="cnt">
            <div class="hd">
              <i class="type"></i>
              <h4>{{playlist.name}}</h4>
            </div>
            <div class="user">
              <router-link :to="{path:'/user/home',query:{id:`${playlist.creator.userId}`}}"><img v-lazy="playlist.avatarUrl"></router-link>
              <router-link :to="{path:'/user/home',query:{id:`${playlist.creator.userId}`}}"><span class="sep underline">{{playlist.nickname}}</span></router-link>
              <span class="fc">{{playlist.time}} 创建</span>
            </div>
            <!-- 底部按钮 -->
            <div class="btns">
              <a class="play" title="播放">
                <i class="ply"></i>
                <span>播放</span>
              </a>
              <a class="add"></a>
              <a class="dis">
                <span >({{playlist.subscribedCount}})</span>
              </a>
              <a class="share">
                <span >({{playlist.shareCount}})</span>
              </a>
              <a class="download">
                <span>下载</span>
              </a>
              <a class="comment">
                <span>({{playlist.commentCount}})</span>
              </a>
            </div>          
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="songlist" v-show="id != undefined">
        <div class="tlt">
          <h3>歌曲列表</h3>
          <span class="sub">{{playlist.trackCount}}首歌</span>
          <div class="more">
            播放：<span class="fc">{{playlist.playCount}}</span>
          </div>
        </div>
        <div class="song">
          <div class="header">
            <li class="w1"></li>
            <li class="w2">歌曲标题</li>
            <li class="w3">时长</li>
            <li class="w4">歌手</li>
            <li class="w5">专辑</li>
          </div>
          <div class="mainer">
            <ul v-for="song, index in songdetail" :key="index">
              <li class="m1 over underline">
                <span>{{index + 1}}</span>
                <i class="play" @click="setMusic(song.id)" :class="{active:song.id == musicNow.id}"></i>
              </li>
              <li class="m2 over underline" :title="song.id">
                <router-link :to="{path: '/song', query: {id:`${song.id}`}}">
                  <span class="underline">{{song.name}}</span>
                  <span v-if="song.alia.length != 0" style="margin-left:6px;color:#999">-{{song.alia[0]}}</span>
                </router-link>
                <i class="mv"></i>
              </li>
              <li class="m3 over underline">
                <span class="time">{{min(song)}}:{{sec(song)}}</span>
                <div class="show">
                  <a text="添加到播放列表" class="a1"  @click="addMusicList(song.id)"></a>
                  <a text="收藏" class="a2"></a>
                  <a text="分享" class="a3"></a>
                  <a text="下载" class="a4"></a>
                </div>
              </li>
              <li class="m4 over underline">
                <router-link :to="{path:'/artist/song', query:{id:song.ar[0].id}}" :title="song.ar[0].name">
                  <span :title="song.ar[0].name">{{ song.ar[0].name }}</span>  
                </router-link>
              </li>   
              <li class="m5 over underline" :title="song.al.name">
                <router-link :to="{path:'/album', query:{id:song.al.id}}" style="color:#666;">
                  <span>{{song.al.name}}</span>   
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="comment" v-show="id != undefined">
        <!-- 顶部 -->
        <div class="header">
          <h3>评论</h3>
          <span class="num">共{{searchParams.total}}条评论</span>
        </div>
        <div class="mainer">
          <!-- 发表评论区 -->
          <div class="flag">
            <div class="head">
              <img src="https://p3.music.126.net/dwslx7VNYE-h8TP0VkBxcg==/109951165800028895.jpg?param=50y50">
            </div>
            <div class="txt">
              <textarea class="u-txt" cols="30" rows="10" placeholder="评论" v-model='text' autofocus></textarea>
              <em class="arrline">◆</em>
              <em class="arrline-shadow">◆</em>
              <div class="shadow"></div>
            </div>
            <div class="btns">
              <i class="emjoy"></i>
              <i class="at"></i>
              <a>评论</a>
              <span>{{140 - text.length}}</span>
            </div>
          </div>
          <!-- 最新评论 -->
          <div class="new">
              <h3 class="hd">最新评论({{searchParams.total}})</h3>
              <div class="itm" v-for="com, index in comList" :key="index">
                <div class="avatar">
                  <img v-lazy="com.user.avatarUrl">
                </div>
                <div class="cntwrap">
                  <div class="cnt">
                    <a>{{com.user.nickname}}</a>
                    <span>：{{com.content}}</span>
                    <div class="que" v-show="com.beReplied[0]">
                      <a class="fc" v-if="com.beReplied[0]">{{com.beReplied[0].user.nickname}}</a>
                      <span v-if="com.beReplied[0]">：{{com.beReplied[0].content}}</span>
                    </div>
                  </div>
                  <div class="rp">
                    <span class="time">
                      {{com.timeStr}}
                    </span>
                    <a class="fc">回复</a>
                    <span class="sep">|</span>
                    <a class="like">
                      <i class="zan"></i>
                      <span v-show="com.likedCount != 0 ">({{com.likedCount}})</span>
                    </a>
                  </div>
                </div>
              </div>
          </div>   
          <!--分页器  -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='searchParams.total' :continues='5' @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'loggedplaylist',
  components: { Pagination },
  data () {
    return {
      playlist:{}, // 歌单信息
      songlist:[], // 歌曲信息
      songdetail: [], // 歌曲详细
      // 评论详情
      comList: [],
      // 分页器参数
      searchParams: {
        total: 10000,
        pageSize: 30,
        pageNo: 1
      },
      // 评论
      text: ''
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    musicNow () {
      return this.$store.state.music.music
    }
  },
  watch: {
    id () {
      this.getPlayList()
      this.getComment()
    }
  },
  methods: {
    // 获取歌单详情
    async getPlayList () {
      let result = await this.$API.reqPlayListDetail(this.id, localStorage.getItem('COOKIE'))
      this.playlist = result.playlist
      this.songlist = result.privileges
      this.playlist.nickname = result.playlist.creator.nickname;
      var a = new Date(result.playlist.createTime)
      this.playlist.time = a.toLocaleDateString().replace(/\//g, "-");
      // 获取歌单排行榜详细
      let s = ""
      for (let i = 0; i < this.songlist.length; i++) {
        s += this.songlist[i].id
        if (i != this.songlist.length - 1) {
          s += ","
        }
      }
      let result2 = await this.$API.reqSong(s)
      this.songdetail = result2.songs
      this.playlist.avatarUrl = this.playlist.creator.avatarUrl
    },
    //获取评论
    async getComment () {
      let result = await this.$API.reqCommentPlayList(this.id, this.searchParams.pageSize, (this.searchParams.pageNo-1) * (this.searchParams.pageSize))
      this.searchParams.total = result.total
      this.comList = result.comments
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
      if(y < 10) return '0' + y
      else return y
    },
    // 获取当前页数
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getComment()
    }
  },
  mounted () {
    this.getPlayList()
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
.playlist {
    float: right;
    width: 741px;
    position: relative;
    border-left: 1px solid #d3d3d3;
    .wrapper{
        width: 100%;
        .header{
            width: 100%;
            // height: 238px;
            padding: 40px;

            .info{
                width: 100%;
                height: 100%;
                display: flex;

                .cover{
                    width: 206px;
                    height: 206px;
                    padding: 3px;
                    // border: 1px solid #ccc;
                    position: relative;

                    img{
                        width: 200px;
                        height: 200px;
                    }
                    
                    .mask{
                        width: 208px;
                        height: 208px;
                        position:absolute;
                        z-index:2;
                        top:-1px;
                        // top: 3px;
                        left: -2px;
                        background: url('../../images/coverall.png') no-repeat 0 -1285px;
                    }
                }

                .cnt{
                    width: 473px;
                    height: 114px;
                    // margin-top:20.5px;
                    padding-left: 33px;
                    .hd{
                        width: 473px;
                        height: 24px;
                        h4{
                            font-weight: normal; 
                            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif !important;
                            font-size: 20px;   
                            color: #333;
                        }
                        .type{
                                float: left;
                                margin-top: 5px;
                                margin-right: 10px;
                                width: 54px;
                                height: 24px;
                                background: url('../../images/icon.png') no-repeat;
                                background-position: 0 -243px;
                        }
                        
                    }
                    .user{
                        margin-top: 12px;
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        margin-bottom: 20px;

                        img{
                            display: inline-block;
                            width: 35px;
                            height: 35px;
                            position: relative;
                            top:-3px;
                            margin-left: 3px;
                            margin-right: 8px;        
                        }
                        .sep{
                            margin-right: 10px;
                            margin-left: 5px;
                            line-height: 38px;
                            color: #0c73c2;;
                        }
                    }
                    .btns{
                        height: 31px;
                        // display: flex;
                        a{
                            float: left;
                        }
                        .play{
                            width: 66px;
                            padding-left: 5px;
                            background: url('../../images/button2.png') no-repeat 0 -1652px;;
                            text-align: center;
                            line-height: 31px;
                            height: 31px;
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;

                            i{
                                width: 20px;
                                height: 18px;
                                margin: 6px 2px 2px 0;
                                float: left;
                                background: url('../../images/button2.png') no-repeat 0 -1622px;
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
                            background: url('../../images/button2.png') no-repeat 0 -1588px;
                            
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
                            margin-right: 6px;
                            height: 100%;
                            background: url('../../images/button2.png') no-repeat;
                            background-position: 0px -1063px;
                            span{
                                padding-right: 10px;
                                display: inline-block;
                                height: 100%;
                                width: 100%;
                                background: url('../../images/button2.png') no-repeat right -1106px;
                                line-height: 30px;
                                padding-left: 30px;
                            }
                            &:hover{
                                color:#666;
                                cursor:default;
                            }
                        }
                        
                        .share{
                            
                            height: 31px;
                            margin-right: 6px;
                            float: left;
                            line-height: 30px;
                            min-width: 23px;
                            cursor: pointer;
                            background: url('../../images/button2.png') no-repeat;
                            background-position: 0 -1225px;

                            span{
                                padding-right: 10px;
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../../images/button2.png') no-repeat;
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
                            background: url('../../images/button2.png') no-repeat;
                            background-position: 0 -2761px;

                            span{
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../../images/button2.png') no-repeat;
                                background-position: right -1020px;
                            }
                            &:hover{
                                color:#666;
                                cursor: pointer;
                            }
                        }

                        .comment{
                            margin-right: 5px;
                            width: auto ;
                            // width: 90px !important;
                            height: 31px !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            line-height: 30px;
                            cursor: pointer;
                            background: url('../../images/button2.png') no-repeat;
                            background-position: 0 -1465px;
                            
                            span{  
                                display: block;
                                padding-right: 10px;
                                height: 31px;
                                line-height: 30px;
                                padding-left: 28px;
                                background: url('../../images/button2.png') no-repeat;
                                background-position: right -1020px;
                            }
                            &:hover{
                                color:#666;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .songlist{
            width: 100%;
            min-height: 400px;
            .tlt{
                width: 100%;
                padding-left: 40px;
                padding-right: 20px;
                height: 35px;
                border-bottom: 2px solid #c20c0c;

                h3{
                    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                    font-size: 20px;
                    line-height: 28px;
                    font-weight: normal;
                    color: #333;
                    float: left;
                }

                .sub{
                    margin: 9px 0 0 20px;
                    float: left;
                    color: #666;
                    font-size: 12px;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                }

                .more{
                    margin-top: 5px;
                    height: 16px;
                    float: right;

                    .fc{
                        color:#c20c0c;
                        font-weight: bold;
                    }
                }
            }
            .song{
                width: 100%;
                border: 1px solid #d9d9d9;;
                .header{
                    width: 100%;
                    height: 39px;
                    display: flex;
                    padding: 0;
                    li{
                        border-right: 1px solid #d9d9d9;
                        padding: 8px 10px;
                        background-image: linear-gradient(rgb(255,255,255), rgb(240,240,240));
                        box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
                    }
                    .w1{
                        width: 74.5px;
                    }
                    .w2{
                        width: 301.75px;
                    }
                    .w3{
                        width: 111px;   
                    }
                    .w4{
                        width: 103.45px;
                    }
                    .w5{
                        width: 149px;
                    }
                }

                .mainer{
                    width: 100%;
                    display: block;
                    ul:nth-of-type(odd){
                        background: #f7f7f7;
                    }
                    .good{
                        height: 70px;
                        span,a,i{
                            display: block;
                            margin-top:20px !important;
                        }
                    }
                    ul{
                        height: 30px;
                        width: 100%;
                        display: flex;

                        &:hover .time{
                            display: none !important;
                        }
                        &:hover .show{
                            display: block !important;
                        }

                        li{
                            padding:6px 10px;
                        }
                        
                        .m1{
                            width: 74.5px;
                            // height: 100%;
                            padding: 6px 10px;
                            line-height: 18px;
                            
                            span{
                                float: left;
                                width: 25px;
                                height: 18px;
                                color: #999;
                                text-align: center;
                            }
                            .play{
                                float: right;
                                display: block;
                                width: 17px;
                                height: 17px;
                                background: url("../../images/table.png") no-repeat -0px -103px;

                                &:hover{
                                    background-position: -0px -128px;
                                    cursor: pointer;
                                }
                                // background: url("../../images/table.png") no-repeat -20px -128px;
                            }
                            .active{
                                background-position: -20px -128px;
                                &:hover{
                                    background-position: -20px -128px;
                                }
                            }
                        }

                        .m2{
                            width: 301px;
                            a{
                                width: 280px;
                                color: #333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                float: left;
                            }
                        }

                        .m3{
                            width: 111px;
                            .time{
                                display: block;
                            }
                            .show{
                                width: 79px;
                                height: 18px;
                                display: none;
                                a{
                                    margin: 2px 0 0 4px;
                                    width: 18px;
                                    height: 16px;
                                    display: block;
                                    float: left;
                                    background: url('../../images/table.png') no-repeat;
                                    &:hover{
                                        cursor: pointer;
                                    }
                                }
                                .a1{
                                    width: 13px;
                                    height: 13px;
                                    margin-top:2px;
                                    margin-left: 0;
                                    background: url('../../images/icon.png') no-repeat;
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
                        }
                        
                        .m4{
                            width: 103px;
                            color: #333;
                            & a:hover{
                                color: #666;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                        .m5{
                            width: 149px;
                            color: #333;
                        }
                    }

                }
            }
        }
        .comment{
            width: 100%;
            margin: 0 auto;
            margin-top: 50px;
            padding: 0 35px;
            padding-bottom: 130px;
            .header{
                width: 100%;
                height: 35px;
                border-bottom: 2px solid #c20c0c;
                h3{
                    float: left;
                    font-size: 20px;
                    color: #333;
                    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                    font-weight: normal;
                }
                .num{
                    float: left;
                    margin: 9px 0 0 20px;
                }
            }
            .mainer{
                margin-top:20px ;
                width: 100%;
                display: block;
                .flag{
                    width: 100%;
                    height: 98px;
                    .head{
                        width: 50px;
                        height: 50px;
                        float: left;
                        img{
                            width: 100%;
                        }
                    }
                    .txt{
                        float: left;
                        width: 608px;
                        height: 63px;
                        margin-left: 12px;
                        position: relative;
                        .u-txt{
                            font-size: 12px;
                            color: #333;
                            font-family: Arial, Helvetica, sans-serif;
                            -webkit-text-size-adjust: none;
                            width: 100%;
                            height: 63px;
                            padding: 5px 6px 6px;
                            border: 1px solid #cdcdcd;
                            border-radius: 2px;
                            line-height: 19px;
                            resize: none;
                            outline:none;
                        }
                        .arrline{
                            position: absolute;
                            left: -9px;
                            top: -6px;
                            font-size: 30px;
                            color: #cdcdcd;
                        }
                        .arrline-shadow{
                            position: absolute;
                            left: -7px;
                            top: -3.5px;
                            font-size: 27px;
                            color: #Fff;
                        }
                        .shadow{
                            width: 7px;
                            height: 18px;
                            position: absolute;
                            left: 1px;
                            top: 8px;
                            background: #fff;
                            z-index: 10;
                        }
                    }
                    .btns{
                        float: left;
                        width: 608px;
                        height: 35px;
                        padding-top: 10px;
                        margin-left: 62px;
                        i{
                            display: block;
                            float: left;
                            width: 18px;
                            height: 18px;
                            margin-right: 10px;
                            background: url("../../images/icon.png") no-repeat;
                        }
                        .emjoy{
                            background-position: -40px -490px;
                        }
                        .at{
                            background-position: -60px -490px;
                        }
                        span{
                            float: right;
                            margin-right: 10px;
                            line-height: 25px;
                        }
                        a{
                            float: right;
                            width: 46px;
                            height: 25px;
                            text-align: center;
                            line-height:24px;
                            background: url("../../images/button.png") no-repeat -84px -94px;
                            color: #fff;

                            &:hover{
                                background-position: -84px -64px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .new{
                    display: block;
                    width: 670px;
                    // border-bottom: 1px solid #cfcfcf;
                    margin-top: 20px;
                    margin-bottom: 25px;
                    .itm{
                        width: 100%;
                        padding: 15px 0;
                        border-top: 1px dotted #ccc;
                        display: flex;
                        .avatar{
                            width: 50px;
                            height: 50px;
                            img{
                                width: 100%;
                            }
                        }
                        .cntwrap{
                            margin-left: 15px;
                            width: 605px;
                            .cnt>a{
                                color: #0c73c2;
                                &:hover{
                                    cursor: pointer;
                                    text-decoration: underline;
                                }  
                            }
                            .que{
                                padding: 8px 19px;
                                margin-top: 10px;
                                line-height: 20px;
                                background: #f4f4f4;
                                border: 1px solid #dedede;

                                a{
                                    color: #0c73c2;
                                    &:hover{
                                        cursor: pointer;
                                        text-decoration: underline;
                                    } 
                                }
                            }

                            .rp{
                                margin-top: 15px;

                                .time{
                                    float: left;
                                    color: #999;
                                }
                                .like,.sep,.fc{
                                    float: right;
                                }
                                .sep{
                                    margin: 0 8px;
                                }

                                .fc{
                                    color: #666;
                                    
                                    &:hover{
                                        color: #666;
                                        cursor: pointer;
                                        text-decoration: underline;
                                    }
                                }
                                .like{
                                    .zan{
                                        margin-right: 5px;
                                        vertical-align: -2px;
                                        margin-top: -4px;
                                        width: 15px;
                                        height: 14px;
                                        display: inline-block;
                                        background: url("../../images/icon2.png") no-repeat;
                                        background-position: -150px 0;
                                    }
                                    &:hover{
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
    }
}
</style>
