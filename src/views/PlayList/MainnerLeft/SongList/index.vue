<template>
  <!-- 歌曲列表 -->
  <div class="songlist">
    <div class="tlt">
      <h3>歌曲列表</h3>
      <span class="sub">{{ playlist.trackCount }}首歌</span>
      <div class="more">
        播放：<span class="fc">{{ playlist.playCount }} </span>次
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
        <ul v-for="(song, index) in songdetail" :key="index">
          <li class="m1 over underline" >
            <span>{{ index + 1 }}</span>
            <i class="play"  @click="setMusic(song.id)" :class="{active:song.id==musicNow.id}"></i>
          </li>
          <li class="m2 over underline" :title="song.name">
            <router-link :to="{path:'/song',query:{id:`${song.id}`}}">
              <span class="underline">{{ song.name }}</span>
              <span v-if="song.alia.length != 0" style="margin-left: 6px; color: #999" >-{{ song.alia[0] }}</span>
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
          <li class="m4 over underline">
            <router-link :to="{path:'/artist/song',query:{id:song.ar[0].id}}" :title="song.ar[0].name">
              <span :title="song.ar[0].name">{{ song.ar[0].name }}</span>  
            </router-link>
            
          </li>
          <li class="m5 over underline" :title="song.al.name">
            <span>{{ song.al.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'songlist',
  data() {
    return {
      // 歌单信息
      playlist: {},
      // 歌曲信息
      songlist: [],
      // 歌曲详细详细
      songdetail: [],
      // 评论详情
      comList: [],
      // 分页器参数
      searchParams: {
        total: 10000,
        pageSize: 30,
        pageNo: 1
      },
      //评论
      text: ''
    }
  },
    computed:{
        id(){
            return this.$route.query.id;
        },
          musicNow(){
            return this.$store.state.music.music;
        }
    },
    watch:{
        id(){
            this.getPlayList();
            this.getComment();
        },
    },
    methods:{
        // 获取歌单详情 
        async getPlayList(){
            let result = await this.$API.reqPlayListDetail(this.id,localStorage.getItem('COOKIE'));
            // console.log(result);
            this.playlist = result.playlist;
            this.songlist = result.privileges;
            this.playlist.nickname = result.playlist.creator.nickname;
            var a = new Date(result.playlist.createTime);
            this.playlist.time = a.toLocaleDateString().replace(/\//g, "-");
            // 获取歌单排行榜详细详细
            let s = "";
            for(let i = 0;i < this.songlist.length;i++){
                s += this.songlist[i].id;
                if(i != this.songlist.length-1)
                    s += ",";
            }
            let result2 = await this.$API.reqSong(s);
            this.songdetail = result2.songs;
            this.playlist.avatarUrl = this.playlist.creator.avatarUrl;
        },
        // 添加音乐至播放列表
        addMusicList(ids){
            this.$store.dispatch('addMusicList',ids);
        },
        // 设置当前播放的音乐
        setMusic(id){
            this.$store.dispatch('setMusics',id);
            this.$store.dispatch('addMusicList',id);
            setTimeout(() => {
                this.$bus.$emit('play');    
            }, 500);      
        },
        min(song){
            if(parseInt(song.dt/60000) < 10)
                return '0'+parseInt(song.dt/60000);
            else return parseInt(song.dt/60000)
        },
        sec(song){
            let x = parseInt(song.dt/60000);
            let y = parseInt(song.dt/1000-x*60);
            if(y < 10) return '0'+y;
            else return y;
        },
    },
    mounted(){
        this.getPlayList();
    }
};
</script>

<style lang='less' scoped>
.songlist {
  width: 640px;
  min-height: 400px;
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
        width: 74.5px;
      }
      .w2 {
        width: 301.75px;
      }
      .w3 {
        width: 111px;
      }
      .w4 {
        width: 103.45px;
      }
      .w5 {
        width: 149px;
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
          width: 301px;
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
          width: 111px;
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

        .m4 {
          width: 103px;
          color: #333;
          & a:hover {
            color: #666;
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .m5 {
          width: 149px;
          color: #333;
        }
      }
    }
  }
}
</style>