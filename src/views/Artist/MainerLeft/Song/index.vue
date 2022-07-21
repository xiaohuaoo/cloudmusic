<template>
  <div class="song">
    <div class="m-info" v-show="id != undefined && songdetail.length != 0">
      <div class="btns">
        <a class="play" title="播放">
          <i class="ply"></i>
          <span>播放</span>
        </a>
        <a class="add"></a>
        <a class="dis">
          <span>收藏全部热门</span>
        </a>      
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" v-show="id != undefined && songdetail.length != 0">
      <div class="song">
        <div class="header">
          <li class="w1"></li>
          <li class="w2">歌曲标题</li>
          <li class="w3">时长</li>
          <li class="w5">专辑</li>        
        </div>
        <div class="mainer">
          <ul v-for="song, index in songdetail" :key="index">
            <li class="m1 over underline" >
              <span>{{ index + 1 }}</span>
              <i class="play"  @click="setMusic(song.id)" :class="{active:song.id==musicNow.id}"></i>
            </li>
            <li class="m2 over underline" :title="song.name">
              <router-link :to="{ path: '/song', query: { id: `${song.id}` } }">
                <span class="underline">{{ song.name }}</span>
                <span
                  v-if="song.alia.length != 0"
                  style="margin-left: 6px; color: #999"
                  >-{{ song.alia[0] }}</span
                >
              </router-link>
              <i class="mv"></i>
            </li>
            <li class="m3 over underline">
              <span class="time">{{ min(song) }}:{{ sec(song) }}</span>
              <div class="show">
                <a title="添加到播放列表" class="a1"  @click="addMusicList(song.id)"></a>
                <a title="收藏" class="a2"></a>
                <a title="分享" class="a3"></a>
                <a title="下载" class="a4"></a>
              </div>
            </li>
            <li class="m5 over underline" :title="song.al.name">
              <router-link :to="{path:'/album',query:{id:`${song.al.id}`}}" style="color:#666;">
                <span>{{ song.al.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'song',
  data () {
    return {
      songdetail: []
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
  methods: {
    // 获取歌手单曲
    async getArtist () {
      let result = await this.$API.reqArtist(this.id)
      this.songdetail=  result.hotSongs
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
    this.getArtist()
  }
}
</script>

<style lang="less" scoped>
.song {
  width: 640px;
  .m-info {
    margin: 20px 0 10px 0;
    height: 31px;

    .btns {
      height: 31px;
      display: flex;
      .play {
        width: 66px;
        padding-left: 5px;
        background: url("../../images/button2.png") no-repeat 0 -1652px;
        text-align: center;
        line-height: 31px;
        height: 31px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        i {
          width: 20px;
          height: 18px;
          margin: 6px 2px 2px 0;
          float: left;
          background: url("../../images/button2.png") no-repeat 0 -1622px;
        }

        span {
          color: #fff;
        }
        &:hover {
          cursor: pointer;
        }
      }
      .add {
        width: 31px;
        height: 31px;
        margin-right: 5px;
        background: url("../../images/button2.png") no-repeat 0 -1588px;
        &:hover {
          cursor: pointer;
          background-position: -40px -1588px;
        }
        &:active {
          background-position: -80px -1588px;
        }
      }
      .dis {
        // width: 92.6px;
        // padding-right: 5px;
        margin-right: 6px;
        height: 100%;
        background: url("../../images/button2.png") no-repeat;
        background-position: 0px -1063px;
        span {
          padding-right: 10px;
          display: inline-block;
          height: 100%;
          width: 100%;
          background: url("../../images/button2.png") no-repeat right -1106px;
          line-height: 30px;
          padding-left: 30px;
        }
        &:hover {
          color: #666;
          cursor: pointer;
        }
      }
    }
  }
  .songlist {
    width: 100%;
    min-height: 400px;
    .tlt {
      width: 100%;
      padding-left: 40px;
      padding-right: 20px;
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

      .more {
        margin-top: 5px;
        height: 16px;
        float: right;

        .fc {
          color: #c20c0c;
          font-weight: bold;
        }
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
          width: 94px;
        }
        .w2 {
          width: 309px;
        }
        .w3 {
          width: 89px;
        }
        .w5 {
          width: 148px;
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
            width: 94px;
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
              background: url("../../images/table.png") no-repeat -0px -103px;

              &:hover {
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

          .m2 {
            width: 309px;
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
            width: 89px;
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
                background: url("../../images/table.png") no-repeat;
                &:hover {
                  cursor: pointer;
                }
              }
              .a1 {
                width: 13px;
                height: 13px;
                margin-top: 2px;
                margin-left: 0;
                background: url("../../images/icon.png") no-repeat;
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
          .m5 {
            width: 148px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
