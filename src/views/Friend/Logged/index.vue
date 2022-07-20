<template>
  <div class="logged">
    <div class="header"></div>
    <div class="mainnerleft clearfix">
      <div class="tit clearfix">
        <h3><span>动态</span></h3>
      </div>
      <ul class="mlist clearfix">
        <li v-for="item, index in eventList" :key="index" class="item">
          <!-- 头像 -->
          <div class="g-face">
            <img v-lazy="item.avatarUrl">
          </div>
          <!-- 内容 -->
          <div class="g-cnt">
            <!-- 标题 -->
            <div class="type">
              <span class="s-fc underline">{{item.nickname}}</span>
              <i class="icn">
                <img v-lazy="item.avatarDetail" style="width:15px; position:relative; top:-2px;">
              </i>
              <span class="sep">分享单曲</span>
            </div>
            <!-- 分享时间 -->
            <div class="time">
              <span>{{item.time}}</span>
            </div>
            <!-- 文字内容 -->
            <div class="text">
              <span>{{item.msg}}</span>
            </div>
            <!-- 单曲 -->
            <div class="j-flag" v-if="item.songUrl">
              <div class="src">
                <!-- 歌曲封面 -->
                <div class="cover pointer">
                  <img v-lazy="item.songUrl">
                  <i class="play"></i>
                </div>
                <!-- 歌曲信息 -->
                <div class="scnt">
                  <h3 class="title">
                    <span class="underline">{{item.songName}}</span>
                  </h3>
                  <h4 class="from">
                    <span class="underline">{{item.artistName}}</span>
                  </h4>
                </div>
              </div>
            </div>
            <div class="pics clearfix">
              <li v-for="pic,index in item.pics" :key="index">
                <img v-lazy="pic.pcSquareUrl" width="224px">
              </li>
            </div>
            <!-- 交互 -->
            <div class="doper">
              <span class="underline">评论 ({{item.commentCount}})</span>
              <span class="line">|</span>
              <span class="underline">转发 ({{item.forwardCount}})</span>
              <span class="line">|</span>
              <span>
                <i></i>
                <span class="underline">({{item.likedCount}})</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mainerright">
      <div class="user">
        <div class="cover">
          <router-link to="/user/home"><img v-lazy="userInfo.url"></router-link>
        </div>
        <router-link to="/user/home"><p class="name underline">{{userInfo.name}}</p></router-link>
        <ul class="clearfix">
          <li>
            <div>
              <em>{{userInfo.eventCount}}</em>
              <span>动态</span>
            </div>
          </li>
          <li>
            <div>
              <em>{{userInfo.follows}}</em>
              <span>关注</span>
            </div>
          </li>
          <li>
            <div>
              <em>{{userInfo.followeds}}</em>
              <span>粉丝</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logged',
  data () {
    return {
      // 动态数量
      pageSize: 20,
      lasttime: -1,
      eventList: [], // 动态内容
      flag: true, // 是否能发请求
      userInfo: {}, // 用户信息
      // 页面高度
      height: 1000000,
      // 定时器
      timer: []
    }
  },
  methods: {
    // 获取好友动态
    async getEvent () {
      if (this.flag == false) {
        return;
      }
      let result = await this.$API.reqEvent(this.pageSize, localStorage.getItem('COOKIE'), this.lasttime)
      let x = result.event
      this.lasttime = result.lasttime
      x.forEach((item) => {
        item.data = JSON.parse(item.json)
        let z = {}
        z.nickname = item.user.nickname
        z.avatarDetail = item.user.avatarDetail.identityIconUrl
        z.msg = item.data.msg
        if (item.data.song != undefined) {
          z.songUrl = item.data.song.album.blurPicUrl
          z.songId = item.data.song.id
          z.songName = item.data.song.name
          z.artistName = item.data.song.artists[0].name  
        }
        z.forwardCount = item.forwardCount
        z.commentCount = item.info.commentCount
        z.likedCount = item.info.likedCount
        z.avatarUrl = item.user.avatarUrl
        z.pics = item.pics
        let a = new Date(item.eventTime)
        z.time = a.toLocaleDateString().replace(/\//g, "-") + " " + a.toTimeString().substr(0, 5)
        this.eventList.push(z)
      })    
    },
    // 获取用户信息
    async getUserDetail () {
      let result = await this.$API.reqDetail(localStorage.getItem('USERID'), localStorage.getItem('COOKIE'))
      let x = {}
      x.id = result.userPoint.userId
      x.level = result.level
      x.url = result.profile.avatarUrl
      x.followeds = result.profile.followeds
      x.follows = result.profile.follows
      x.eventCount = result.profile.eventCount
      x.name = result.profile.nickname
      this.userInfo = x
    },
    // 监听页面滚动
    handleScrollx () {
      const h = window.pageYOffset
      if (h >= this.height - 2500) {
        this.getEvent()
      }
      this.height = document.body.scrollHeight
    }
  },
  mounted () {
    this.getEvent()
    this.getUserDetail()
    // 监听当前页面的rolly
    window.addEventListener('scroll', this.handleScrollx, true)
    // 开启定时器保证2s内只发一次请求
    this.timer = setInterval(()=>{
      this.flag = true
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.logged {
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
        min-height: 700px;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        background: url('../images/wrap5.png') repeat-y center 0;
        .mainnerleft{
            width: 680px;
            padding: 20px 30px;
            float: left;
            .tit{
                width: 100%;
                height: 42px;
                border-bottom: 2px solid #c20c0c;
                h3{
                    font-size: 24px;
                    font-weight: normal;
                    color: #333;
                }
            }
            .mlist{
                width: 100%;
                position: relative;
                padding-top: 20px;
                .item{
                    width: 100%;
                    display: block;
                    padding: 20px 0;
                    position: relative;
                    border-color: #e8e8e9;
                    border-bottom: 1px solid;
                    .g-face{
                        position: absolute;
                        top: 20px;
                        left: 0;
                        width: 54px;
                        height: 45px;
                        img{
                            width: 45px;
                            height: 45px;
                        }
                    }
                    .g-cnt{
                        margin-left: 55px;
                        width: 565px;
                        padding-top: 4px;
                        .type{
                            width: 100%;
                            position: relative;
                            font-size: 14px;
                            font-family: Arial, Helvetica, sans-serif;
                            -webkit-text-size-adjust: none;
                            .s-fc{
                                color: #0c73c2;
                            }
                            .icn{
                                width: 15px;
                                height: 15px;
                                display: inline-block;
                                margin-left: 2px;
                            }
                            .sep{
                                margin-left: 5px;
                            }
                        }
                        .time{
                            margin-top: 7px;
                            color: #999;
                        }
                        .text{
                            width: 100%;
                            margin-top: 10px;
                            line-height: 24px;
                            font-size: 14px;
                            word-break: break-word;
                            white-space: normal;
                            color: #333;
                        }
                        .j-flag{
                            width: 565px;
                            height: 60px;
                            .src{
                                width: 100%;
                                height: 100%;
                                display: block;
                                position: relative;
                                padding: 10px;
                                margin: 4px 0 5px;
                                background: #f5f5f5;
                                .cover{
                                    width: 40px;
                                    height: 40px;
                                    position: relative;
                                    img{
                                        width: 40px;
                                        height: 40px;
                                    }
                                    .play{
                                        width: 40px;
                                        height: 40px;
                                        display: block;
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        opacity: 0.8;
                                        z-index: 10;
                                        background: url('../images/frd_dyn_sprite.png') no-repeat -100px -70px;
                                        &:hover{
                                            opacity: 1.0;
                                        }
                                    }
                                }
                            }
                            .scnt{
                                width: 475px;
                                height: 40px;
                                position: absolute;
                                top: 10px;
                                right: 30px;
                                .title{
                                    line-height: 22px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    word-wrap: normal;
                                    font-weight: normal;
                                    color: #333;
                                    margin-top: -2px;
                                }
                                .from{
                                    color: #666;
                                    font-weight: normal;
                                    line-height: 22px;
                                }
                            }
                        }
                        .pics{
                            margin-top: 10px;
                        }
                        .doper{
                            width: 100%;
                            height: 16px;
                            margin-top: 18px;

                            span{
                                float: right;
                                color: #0c73c2;
                            }
                            .line{
                                color: #c7c7c7;
                                margin:0 10px 0 12px;
                            }
                            i{
                                margin: 1px 3px 0 0;
                                position: relative;
                                top: 0px;
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                background: url('../images/frd_dyn_sprite.png') no-repeat 0 -20px;
                            }
                        }
                    }
                }
            }
        }
        .mainerright{
            width: 298px;
            float: left;
            .user{
                width: 100%;
                height: 193px;
                padding: 35px 30px 5px;
                position: relative;
                background: url('../images/frduser.png') repeat-x 0 0;
                .cover{
                    float: left;
                    width: 70px;
                    height: 70px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 2px;
                        background: #fff;
                        border: 1px solid #dadada;
                    }
                }
                .name{
                    float: left;
                    color: #333;
                    font-size: 14px;
                    font-weight: bold;
                    margin-left: 12px;
                    margin-top: 4px;
                }
                >ul{
                    position: absolute;
                    bottom: 15px;
                    left: 17px;
                    float: left;
                    li{
                        display: inline;
                        float: left;
                        margin: 0 2px 0 -2px;
                        border-left: 1px solid #c2c2c2;
                        color: #666;
                        div{
                            height: 45px;
                            padding: 0 20px;
                            em{
                                display: block;
                                height: 29px;
                                padding-bottom: 9px;
                               
                                font-size: 20px;
                                line-height: 20px;
                                font-family: Arial;
                            }
                            span{
                                padding-left: 2px;
                            }
                        }
                        &:hover{
                            color: #0c73c2;
                            cursor: pointer;
                        }
                    }
                    li:first-child{
                        border-left: none;
                    }
                }
            }

        }
    }
}
</style>
