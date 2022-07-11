<template>
  <div class="songlist clearfix">
    <div class="haeder">
      <h3><span class="ff2">听歌排行</span></h3>
      <h4>累积听歌{{listenSongs}}</h4>
      <span class="point">
        <a class="icon pointer"></a>
        <div class="tip">
          <p>实际播放时间过短的歌曲将不纳入计算</p>
          <i class="t"></i>
          <i class="b"></i>
        </div>
      </span>
      <div class="nav clearfix">
        <span class="pointer" :class="{active:!isWeek}" @click="changeTime('all')">所有时间</span>
        <span class="line">|</span>
        <span class="pointer" :class="{active:isWeek}" @click="changeTime('week')">最近一周</span>
      </div>
    </div>
    <div class="flag">
      <div class="songs">
        <ul v-for="data, index in showData" :key="index">
          <li class="m1">
            <span>{{index+1}}.</span>
            <i class="play" @click="setMusic(data.song.id)"></i>
          </li>
          <li class="m2">
              <router-link :to="{path:'/song',query:{id:`${data.song.id}`}}">{{data.song.name}}</router-link>
              <span>-</span>
              <router-link :to="{path:'/artist/song',query:{id:data.song.ar[0].id}}" :title="data.song.ar[0].name" class="art">{{data.song.ar[0].name}}</router-link>
              <i class="mv"></i>
          </li>
          <li class="m3">
            <div class="show">
              <a title="添加到播放列表" class="a1"></a>
              <a title="收藏" class="a2"></a>
              <a title="分享" class="a3"></a>
              <a title="下载" class="a4"></a>
            </div>
          </li>
          <div class="tops">
            <span class="bg" :style="'width:'+data.score+'%;'"></span>
            <div class="times">{{data.playCount}}次</div>
          </div>
        </ul>
      </div>
      <div class="more">
        <a class="underline"> 查看更多&gt;</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songs',
  props: ['listenSongs'],
  data () {
    return {
      showData: [], // 展示数据
      weekData:[], // 用户播放周数据
      allData:[], // 用户播放所有数据
      length: 0,
      // 是否展示最近一周的数据
      isWeek: true
    }
  },
  computed: {
    id () {
      return this.$route.query.id || localStorage.getItem('USERID')
    }
  },
  methods: {
    // 获取用户播放记录
    async getUserRecord () {
      let result = await this.$API.reqUserRecord(localStorage.getItem('COOKIE'), 1)
      let result2 = await this.$API.reqUserRecord(localStorage.getItem('COOKIE'), 0)
      this.weekData = result.weekData.slice(0, 10)
      this.allData = result2.allData.slice(0, 10)
      this.showData = this.weekData
      this.showSongTimes(100)
    },
    // 动态展示听歌次数
    showSongTimes (timer) {
      this.showData.forEach(item => {
        let x = item.score
        item.score = 0
        setTimeout(() => {
          item.score = x
        }, timer)
      })
    },
    // 改变记录时间
    changeTime (time) {
      if (time == 'week' && this.weekData != this.showData) {
        this.showData = this.weekData
        this.showSongTimes(0)
        this.isWeek = true
      } else if (time == 'all' && this.allData != this.showData) {
        this.showData = this.allData
        this.showSongTimes(0)
        this.isWeek = false
      }
    },
    setMusic (id) {
      this.$store.dispatch('setMusics', id)
      this.$store.dispatch('addMusicList', id)
      setTimeout(() => {
        this.$bus.$emit('play')
      }, 500)
    }
  },
  mounted () {
    this.getUserRecord()
  }
}
</script>

<style lang="less" scoped>
.songlist{
    width: 100%;
    .header{
        width: 900px;
        height: 35px;
        position: relative;
        z-index: 2;
        border-bottom: 2px solid #c20c0c;
        h3{
            font-size: 20px;
            line-height: 28px;
            font-weight: normal;
            float: left;
            color: #666;
        }
        h4{
            float: left;
            display: inline;
            margin-top: 5px;
            margin-left: 10px;
            line-height: 26px;
            font-weight: 400;
            color: #666;
        }
        .point{
            position: relative;
            margin-left: 10px;
            left: -1px;
            top: 8px;
            line-height: 18px;
            z-index: 2;
            .icon{
                width: 18px;
                height: 18px;
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                background: url('../../images/icon2.png') no-repeat 0 -50px;    
                &:hover{
                    background: url('../../images/icon2.png') no-repeat -20px -50px;    
                }
            }
            .tip{
                position: absolute;
                left: -33px;
                top: 30px;
                display: none;
                width: 333px;
                height: 35px;
                font-size: 12px;
                line-height: 20px;
                padding: 8px 19px 7px 19px;
                z-index: 2;
                color: #666;
                background: url('../../images/top_m.png') repeat-y 0 0;
                .t{
                    position: absolute;
                    width: 327px;
                    height: 16px;
                    left: 0;
                    top: -16px;
                    background: url('../../images/top_t.png') no-repeat 0 0;
                }
                .b{
                    position: absolute;
                    width: 327px;
                    height: 12px;
                    left: 0;
                    bottom: -12px;
                    background: url('../../images/top_b.png') no-repeat 0 0;
                }
            }
            &:hover .tip{
                display: block;
            }
        }
        .nav{
            float: right;
            span{
                float: right;
                line-height: 35px;
            }
            .line{
                margin: 0 10px;
            }
            .active{
                color: #000;
                font-weight: 700;
            }
        }
    }
    .flag{
        width: 100%;
        height: 413px;
        .songs{
            width: 100%;
            height: 381px;
            border: 1px solid #e2e2e2;
            border-top: none;
            ul{
                height: 38px;
                width: 100%;
                position: relative;
                background-color: #fefefe;
                &:hover{
                    background-color: #eee;
                }
                &:hover .show{
                    display: block !important;
                }
                li{
                    padding:6px 10px;
                    float: left;
                }
                
                .m1{
                    width: 72px;
                    height: 100%;
                    padding: 0 5px 0 8px;
                    line-height: 38px;
                    float: left;
                    span{
                        float: left;
                        display: inline;
                        padding-left: 5px;
                        padding-right: 8px;
                        width: 37px;
                        text-align: right;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #666;
                    }
                    .play{
                        float: right;
                        display: inline;
                        margin-top: 10px;
                        width: 17px;
                        height: 17px;
                        cursor: pointer;
                        background: url("../../images/table.png") no-repeat -0px -103px;

                        &:hover{
                            background-position: -0px -128px;
                            cursor: pointer;
                        }
                        // background: url("../../images/table.png") no-repeat -20px -128px;
                    }

                }

                .m2{
                    width: 480px;
                    height: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span{
                        float: left;
                        margin: 0 4px;
                        line-height: 25px;
                    }
                    a{
                        line-height: 25px;
                        height: 100%; 
                        float: left;
                        color: #000;
                        font-weight: bold;
                        &:hover{
                            color: #000;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                    .art{
                        font-weight: normal;
                        color: #aeaeae;
                        &:hover{
                            color: #aeaeae;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                }

                .m3{
                    position: absolute;
                    left: 480px;
                    top: 4px;
                    width: 91px;
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
                
                .tops{
                    width: 319px;
                    height: 100%;
                    float: right;
                    position: relative;
                    .bg{
                        position: absolute;
                        z-index: 1;
                        width: 30%;
                        height: 38px;
                        background-color: #4eb4f5;
                        opacity: 0.2;
                        transition: 1s all;
                    }
                    .times{
                        position: absolute;
                        left: 10px;
                        z-index: 1;
                        height: 38px;
                        line-height: 38px;
                        color: #666;
                    }
                    
                }
            }
            ul:nth-of-type(even){
                background: #f7f7f7;
                &:hover{
                    background-color: #eee;
                }
            }
        }
        .more{
            width: 100%;
            height: 32px;
            a{
                float: right;
                color:#666;
                line-height: 32px;
                text-align: right;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
            }
        }
    }
}
</style>
