<template>
  <div class="mainerleft">
    <div class="info clearfix" v-show="id">
      <div class="cover">
        <img v-lazy="songDetail.al.picUrl" v-if="songDetail.al">
        <span class="msk"></span>
      </div>
      <div class="cnt">
        <div class="hd">
          <i class="icn"></i>
          <em class="tit">{{songDetail.name}}</em>
        </div>
        <p class="des">歌手:
          <router-link :to="{path: '/artist/song', query:{id: songDetail.ar[0].id}}" :title="songDetail.ar[0].name" class="underline" v-if="songDetail.ar">
            {{songDetail.ar[0].name}}
          </router-link>
        </p>
        <p class="des">所属专辑：
          <router-link :to="{path:'/album',query:{id:`${songDetail.al.id}`}}" class="underline" v-if="songDetail.al"> {{songDetail.al.name}}</router-link>
        </p>
        <!-- 底部按钮 -->
        <div class="btns">
          <a class="play" title="播放" @click="setMusic(id)">
            <i class="play"></i>
            <span>播放</span>
          </a>
          <a class="add" title="添加到播放列表"  @click="addMusicList(id)"></a>
          <a class="dis">
            <span>收藏</span>
          </a>
          <a class="share">
            <span>分享</span>
          </a>
          <a class="download">
            <span>下载</span>
          </a>
          <a class="comment">
            <span>({{commentnum}})</span>
          </a>
        </div>
        <div class="lyric">
          <div class="desc-dot" v-show="halflyric" v-if="currentLyric.lines">
            <p v-for="text, index in currentLyric.lines.slice(0,currentLyric.lines.length/4)" :key="index">
              {{text.txt}}
            </p>
            <a class="underline" @click="halflyric=false">展开
              <i class="down"></i>
            </a>
          </div>
          <div class="desc-more" v-show="!halflyric">
            <p v-for="text, index in currentLyric.lines" :key="index">
              {{text.txt}}
            </p>
            <a class="underline" @click="halflyric=true">收起
              <i class="up"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Comment @CommentNum='CommentNum'></Comment>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import Comment from './Comment'
export default {
  name: 'mainnerleft',
  components: { Comment },
  data () {
    return {
      currentLyric: {}, // 歌词
      halflyric: true, // 显示一半歌词
      songDetail: {}, // 歌曲详情
      commentnum: 0 // 评论数
    }
  },
  computed: {
    id () {
      return this.$route.query.id || 1915297033
    }
  },
  watch: {
    id () {
      this.getlyric()
      this.getSongDetail()
    }
  },
  methods: {
    // 获取歌曲详情
    async getSongDetail () {
      let result = await this.$API.reqSong(this.id)
      this.songDetail = result.songs[0]
    },
    // 获取歌词
    async getlyric () {
      let result = await this.$API.reqlyric(this.id)
      this.currentLyric =  new Lyric(result.lrc.lyric, this.lyricHandle)
    },
    // 获取评论数
    CommentNum (data) {
      this.commentnum = data
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
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.mainerleft{
    padding: 37px 30px 40px 39px;
    width: 709px;
    float: left;
    .info{
        width: 100%;
        .cover{
            float: left;
            width: 198px;
            height: 198px;
            position: relative;
            img{
                width:130px;
                height: 130px;
                margin: 34px;
            }
            .msk{
                display: block;
                width: 206px;
                height: 205px;
                position: absolute;
                top: -4px;
                left: -4px;
                background: url('../images/coverall.png') no-repeat -140px -580px;;
            }
        }
        .cnt{
            width: 414px;
            float: right;
            .hd{
                width: 100%;
                height: 32px;
                .icn{
                    display: block;
                    float: left;
                    width: 54px;
                    height: 24px;
                    background: url('../images/icon.png') no-repeat 0 -463px;;
                }
                .tit{
                    margin-left: 10px;
                    vertical-align: middle;
                    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                    font-style: normal;
                    text-align: left;
                    font-size: 24px;
                    line-height: 0px;
                }

            }
            .des{
                height: 16px;
                margin: 10px 0;
                width: 100%;
                color: #999;
                a{
                    color: #0c73c2;
                    &:hover{
                        color: #0c73c2;;
                    }
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
        .lyric{
            float: left;
            margin-top: 40px;
            width: 100%;
            .desc-dot,
            .desc-more{
                p{
                    margin: 5px 0;
                    color: #000;
                }
                a{
                    float: left;
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
}
</style>
