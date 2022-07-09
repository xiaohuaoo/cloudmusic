<template>
  <div class="mainerRight">
    <div class="header">
      <div class="info">
        <!-- 图片 -->
        <div class="cover">
          <img v-lazy="playList.coverImgUrl">
          <div class="mask"></div>
        </div>
        <!-- 文字信息 -->
        <div class="cnt">
          <div class="hd">
              <h4>{{playList.name}}</h4>
          </div>
          <div class="user">
            <i class="icn" style="overflow:hidden"></i>
            <span class="sep">网易云音乐官方账号</span>
            <span class="fc">{{num}}</span>
          </div>
          <!-- 底部按钮 -->
          <div class="btns">
            <a class="play" title="播放">
              <i class="ply"></i>
              <span>播放</span>
            </a>
            <a class="add"></a>
            <a class="dis">
              <span>({{playList.subscribedCount}})</span>
            </a>
            <a class="share">
              <span>({{playList.shareCount}})</span>
            </a>
            <a class="download">
              <span>下载</span>
            </a>
            <a class="comment">
              <span>({{playList.commentCount}})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <SongList :playList="songList" :songList="SongList"></SongList>
    <Comment></Comment>
  </div>
</template>

<script>
import SongList from './SongList'
import Comment from './Comment'
export default {
  name: 'toplistmainerright',
  components: {
    SongList,
    Comment
  },
  data () {
    return {
      playList: {},
      num: '刚刚更新',
      songList: {},
      SongList: {}
    }
  },
  computed: {
    id () {
      if (this.$route.query.id === undefined) {
        return '19723756'
      } else {
        return this.$route.query.id
      }
    }
  },
  watch: {
    id () {
      this.getPlayList()
    }
  },
  methods: {
    // 获取排行榜详情
    async getPlayList () {
      const result = await this.$API.reqPlayList(this.id)
      console.log(result);
      this.playList = result.playList
      this.songList = result
      let s = ''
      for (let i = 0; i < result.privileges.length; i++) {
        s += result.privileges[i].id
        if (i !== result.privileges.length - 1) {
          s += ','
        }
      }
      const result2 = await this.$API.reqSong(s)
      this.SongList = result2.songs
    }
  },
  mounted () {
    this.getPlayList()
    this.$bus.$on('getNum', (num) => {
      this.num = num
    })
  }
}
</script>

<style lang="less" scoped>
.mainerRight{
  width: 740px;
  background-color: #fff;
  float: right;;
  .header{
      width: 100%;
      height: 238px;
      padding: 40px;
      .info{
          width: 100%;
          height: 100%;
          display: flex;
          .cover{
              width: 158px;
              height: 158px;
              padding: 3px;
              border: 1px solid #ccc;
              position: relative;
              img{
                  width: 150px;
                  height: 150px;
              }
              
              .mask{
                  width: 150px;
                  height: 150px;
                  position:absolute;
                  z-index:2;
                  top: 3px;
                  left: 3px;
                  background: url('../images/coverall.png') no-repeat -230px -380px;
              }
          }
          .cnt{
              width: 473px;
              height: 114px;
              margin-top:20.5px;
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
                  
              }
              .user{
                  margin-top: 5px;
                  width: 100%;
                  height: 35px;
                  line-height: 35px;
                  margin-bottom: 20px;
                  i{
                      display: inline-block;
                      width: 13px;
                      height: 13px;
                      position: relative;
                      top:2px;
                      margin-left: 3px;
                      background: url('../images/icon.png') no-repeat -18px -682px;
                  }
                  .sep{
                      margin-right: 10px;
                      margin-left: 5px;
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
                      width: 92.6px;
                      // padding-right: 5px;
                      margin-right: 6px;
                      height: 100%;
                      background: url('../images/button2.png') no-repeat;
                      background-position: 0px -1063px;
                      span{
                          display: inline-block;
                          height: 100%;
                          width: 100%;
                          background: url('../images/button2.png') no-repeat right -1106px;
                          line-height: 30px;
                          padding-left: 30px;
                      }
                      &:hover{
                          color:#666;
                          cursor: pointer;
                      }
                  }
                  
                  .share{
                      width: 79.8px;
                      height: 31px;
                      margin-right: 6px;
                      float: left;
                      line-height: 30px;
                      min-width: 23px;
                      cursor: pointer;
                      background: url('../images/button2.png') no-repeat;
                      background-position: 0 -1225px;
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
                      width: 90px;
                      height: 31px;
                      line-height: 30px;
                      min-width: 23px;
                      cursor: pointer;
                      background: url('../images/button2.png') no-repeat;
                      background-position: 0 -1465px;
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
              }
          }
      }
  }
}
</style>
