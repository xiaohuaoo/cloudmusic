<template>
  <div class="mainnerleft clearfix">
    <div class="m-info clearfix">
      <div class="cover">
        <img v-lazy="playlist.coverImgUrl">
        <span class="msk"></span>
      </div>
      <div class="cnt clearfix">
        <div class="hd clearfix">
          <i></i>
          <div class="tit">
            <h2>{{playlist.name}}</h2>
          </div>
        </div>
        <div class="user clearfix">
          <a class="avatar">
            <img v-lazy="playlist.creator.avatarUrl">
          </a>
          <span class="name">
            <a class="underline">{{playlist.creator.nickname}}</a>
          </span>
          <span class="time">{{playlist.time}}&nbsp;创建</span>
        </div>
        <!-- 底部按钮 -->
        <div class="btns">
          <a class="play" title="播放">
            <i class="ply"></i>
            <span>播放</span>
          </a>
          <a class="add"></a>
          <a class="dis">
            <span>({{playlist.subscribedCount}})</span>
          </a>
          <a class="share">
            <span>({{playlist.shareCount}})</span>
          </a>
          <a class="download">
            <span>下载</span>
          </a>
          <a class="comment">
            <span>({{playlist.commentCount}})</span>
          </a>
        </div>
        <div class="tags clearfix" v-show="playlist.tags.length != 0">
          <span>标签：</span>
          <a class="tag" v-for="tag, index in playlist.tags" :key="index"><i>{{tag}}</i></a>
        </div>
        <div class="desc-dot" v-show="showDot && playlist.description != null">
          <p>
            <b>介绍：</b>
            <span v-html="playlist.descDot"></span>
          </p>
          <a class="underline" @click="showDot=false">展开
            <i class="down"></i>
          </a>
        </div>
        <div class="desc-more" v-show="!showDot && playlist.description != null">
          <p>
            <b>介绍：</b>
            <span v-html="playlist.descMore"></span>
          </p>
          <a class="underline" @click="showDot=true">收起
            <i class="up"></i>
          </a>
        </div>
      </div>
    </div>
    <SongList></SongList>
    <Comment></Comment>
  </div>
</template>

<script>
import SongList from './SongList'
import Comment from './Comment'
export default {
  name: 'mainnerleft',
  components: {
    SongList,
    Comment
  },
  data () {
    return {
      playlist:{} // 歌单数据
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch:{
    id () {
      this.getPlayListDetail()
    } 
  },
  methods: {
    // 获取歌单信息
    async getPlayListDetail () {
      let result = await this.$API.reqPlayListDetail(this.id, localStorage.getItem('COOKIE'))
      this.playlist = result.playlist
      if (this.playlist.description != null) {
        this.playlist.descDot = result.playlist.description.replace(/\n/g,'<br>').slice(0, (result.playlist.description.length) / 2) + '...'
        this.playlist.descMore = result.playlist.description.replace(/\n/g,'<br>')   
      }
      var a = new Date(result.playlist.createTime)
      this.playlist.time = a.toLocaleDateString().replace(/\//g, "-")
    }
  },
  mounted () {
    this.getPlayListDetail()
  }
}
</script>

<style lang="less" scoped>
.mainnerleft{
    float: left;
    padding: 47px 30px 40px 39px;
    border-right: 2px solid #e3e3e3;
    .m-info{
        width: 640px;
        margin-bottom: 30px;
        .cover{
            width: 200px;
            height: 200px;
            float: left;
            position: relative;
            img{
                display: block;
                width: 200px;
                height: 200px;
            }
            .msk{
                display: inline-block;
                width: 208px;
                height: 208px;
                background: url('../images/coverall.png') no-repeat;
                background-position: 0 -1285px;
                position: absolute;
                top: -4px;
                left: -4px;
            }
        }
        .cnt{
            width: 410px;
            float: right;
            .hd{
                position: relative;
                margin: 0 0 12px;
                line-height: 24px;
                i{
                    float: left;
                    width: 54px;
                    height: 24px;
                    background: url('../images/icon.png') no-repeat;
                    background-position: 0 -243px;
                    overflow: hidden;
                    vertical-align: middle;
                }
                .tit{
                    margin-left: 5px;
                    float: left;
                    width: 346px;
                    line-height: 24px;
                    h2{
                        font-size: 20px;
                        font-weight: normal;
                        color: #000;
                    }
                }
            }
            .user{
                width: 100%;
                height: 35px;
                margin-bottom: 20px;
                .avatar{
                    width: 35px;
                    height: 35px;
                    margin-right: 10px;
                    img{
                        width: 35px;
                        height: 35px;
                    }
                }
                .name{
                    a{
                        color: #0c73c2;
                        &:hover{
                            color: #0c73c2;
                        }
                    }
                    img{
                        width: 13px;
                        height: 13px;
                    }
                }
                .time{
                    margin-left: 15px;
                    color: #999;
                }
            }
            .btns{
                height: 31px;
                display: flex;

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
                        margin: 6px 2px 2px 0;
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
                    background-position: 0px -1063px;
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
            .tags{
                margin: 25px 0 5px;
                line-height: 22px; 
                width: 100%;
                >span{
                    float: left;
                }
                .tag{
                    float: left;
                    margin: 0px 10px 3px 0;
                    padding: 0 10px 0 0;
                    text-shadow: 0 1px #fdfdfd;
                    background: url('../images/button2.png') no-repeat;
                    background-position: right -27px;
                    color: #777;
                    height: 22px;
                    line-height: 22px;
                    i{
                        position: relative;
                        padding: 0 3px 0 13px;
                        float: left;
                        background: url('../images/button2.png') no-repeat;
                        background-position: 0 0;
                    }
                }
            }
            .desc-dot,
            .desc-more{
                a{
                    float: right;
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
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>
