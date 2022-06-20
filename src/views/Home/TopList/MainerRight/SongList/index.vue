<template>
  <div class="songList">
    <div class="tlt">
      <h3>歌曲列表</h3>
      <span class="sub">{{length}}首歌</span>
      <div class="more">
        播放: <span class="fc">{{playCount}} </span>次
      </div>
    </div>
    <div class="song">
      <div class="header">
        <li class="w1"></li>
        <li class="w2">标题</li>
        <li class="w3">时长</li>
        <li class="w4">歌手</li>
      </div>
      <div class="mainer">
        <ul v-for="(song, index) in songList" :key="index" :class="{good:index<3}">
          <li class="m1">
            <span>{{index+1}}</span>
          </li>
          <li class="m2">
            <img v-lazy="song.al.picUrl" v-show='index<3'>
            <i class="play" @click="setMusic(song.id)"></i>
            <router-link :to="{path:'/song',query:{id:`${song.id}`}}" :title="song.name">{{song.name}}</router-link>
            <i class="mv"></i>
          </li>
          <li class="m3">
            <span class="time">{{min(song)}}:{{sec(song)}}</span>
            <div class="show">
              <a text="添加到播放列表" class="a1"  @click="addMusicList(song.id)"></a>
              <a text="收藏" class="a2"></a>
              <a text="分享" class="a3"></a>
              <a text="下载" class="a4"></a>
            </div>
          </li>
          <li class="m4">
            <router-link :to="{path: '/artist/song', query: {id:song.ar[0].id}}">{{song.ar[0].name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songList',
  components: {},
  props: ['playList', 'songList'],
  data () {
    return {
      length: 0,
      playCount: 0
    }
  },
  watch: {
    songList () {
      this.length = this.playList.privileges.length
      this.playCount = this.playList.playlist.playCount
    }
  },
  methods: {
    // 添加音乐至播放列表
    addMusicList (ids) {
      this.$store.dispatch('addMusicList', ids)
    },
    // 设置当前播放的音乐
    setMusic (id) {
      this.$store.dispatch('setMusic', id)
      this.$store.dispatch('addMusicList', id)
      setTimeout(() => {
        this.$bus.$emit('play')
      }, 500)
    },
    min (song) {
      if (parseInt(song.dt / 60000 < 10)) {
        return '0' + parseInt(song.dt / 60000)
      } else {
        return parseInt(song.dt / 60000)
      }
    },
    sec (song) {
      const x = parseInt(song.dt / 60000)
      const y = parseInt(song.dt / 1000 - x * 60)
      if (y < 10) return '0' + y
      else return y
    }
  },
  mounted () {
    setTimeout(() => {
      this.length = this.playList.privileges.length
      this.playCount = this.playList.playlist.playCount
    }, 400)
  }
}
</script>

<style lang="less" scoped>
.songList {
    width: 100%;
    min-height: 400px;
    margin: 0 auto;
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

        .more {
            margin-top: 5px;
            height: 16px;
            float: right;

            .fc {
                color:#c20c0c;
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
            li {
                border-right: 1px solid #d9d9d9;
                background-image: linear-gradient(rgb(255,255,255), rgb(240,240,240));
                padding: 8px 10px;
                box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
            }
            .wl {
                width: 77px;
            }
            .w2 {
                width: 326px;
            }
            .w3 {
                width: 91px;
            }
            .w4 {
                width: 174px;
            }
        }
        .mainer {
            width: 100%;
            display: block;
            ul:nth-of-type(even) {
                background: #e5e5e5;
            }
            ul:nth-of-type(odd){
                background: #f6f6f6;
            }
            .good {
                height: 70px;
                span, a, i {
                    display: block;
                    margin-top: 20px !important;
                }
            }
            ul {
                height: 30px;
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
                    width: 77px;
                    padding: 6px 10px;
                    line-height: 18px;
                    span {
                        float: left;
                        width: 25px;
                        height: 18px;
                        color: #999;
                        text-align: center;
                    }
                    i {
                        margin: 0 auto;
                        float: left;
                        width: 16px;
                        height: 17px;
                        background: url(../../images/icon.png) no-repeat -67px -283px;
                    }
                }
                .m2 {
                    width: 326px;

                    img {
                        float: left;
                        margin-right: 10px;
                        width: 50px;
                    }

                    .play {
                        float: left;
                        display: block;
                        width: 17px;
                        height: 17px;
                        margin-right: 8px;
                        background: url("../../images/table.png") no-repeat -0px -103px;

                        &:hover {
                            background-position: -0px -128px;
                            cursor: pointer;
                        }
                    }
                    a{
                        width: 200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        float: left;
                        &:hover{
                            color: #666;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                }
                .m3 {
                    width: 91px;
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
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .a1 {
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

                .m4 {
                    width: 173px;
                    color: #333;
                    & a:hover{
                        color: #666;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
