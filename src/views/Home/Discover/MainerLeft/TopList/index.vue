<template>
  <div class="TopList">
      <div class="header">
          <a>榜单</a>
          <span class="more">
              <router-link to="home/toplist">更多</router-link>
              <i>&nbsp;</i>
          </span>
      </div>
      <div class="body">
          <div class="top-flag" v-for="(attr, index) in imgList" :key="index">
              <div class="top">
                  <div class="cover" @click="GoTopList(attr.id)"></div>
                  <img v-lazy="attr.url">
                  <div class="tit">
                       <a @click="GoTopList(attr.id)"><strong>{{attr.name}}</strong></a>
                        <div class="button">
                            <a class="play"></a>
                            <a class="subs"></a>
                        </div>
                  </div>
              </div>
              <ul>
                <li v-for="(list, indexx) in attr.data" :key="indexx">
                    <span :class="{red: indexx<3}">{{indexx+1}}</span>
                    <router-link :to="{path: 'song', query: {id: `${list.id}`}}" :title="list.name">{{list.name}}</router-link>
                    <div class="open">
                        <a title="播放" class="play" @click="setMusic(list.id)"></a>
                        <a title="添加到播放列表" class="add" @click="addMusicList(list.id)"></a>
                        <a title="收藏" class="subs"></a>
                    </div>
                </li>
              </ul>
              <div class="more">
                  <a @click="GoTopList(attr.id)">查看全部</a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      imgList: [], // 榜单数据
      name: []
    }
  },
  methods: {
    // 获取榜单数据
    async getTopList () {
      const result = await this.$API.reqTopList()
      if (result.code === 200) {
        const x = result.list.slice(0, 3)
        x.forEach(async (item) => {
          const result2 = await this.$API.reqPlayList(item.id)
          const t = {}
          t.id = item.id
          t.name = item.name
          t.url = result2.playlist.coverImgUrl
          t.data = result2.privileges.slice(0, 10)
          let s = ''
          for (let i = 0; i < 10; i++) {
            s += t.data[i].id
            if (i !== 9) s += ','
          }
          const result3 = await this.$API.reqSong(s)
          for (let i = 0; i < 10; i++) {
            t.data[i].name = result3.song[i].name
          }
          this.imgList.push(t)
        })
      }
    },
    // 刷新页面
    refresh () {
      const timer = setTimeout(() => {
        this.$forceUpdate()
        clearTimeout(timer)
        this.load = false
      }, 100)
    },
    // 去榜单
    GoTopList (id) {
      this.$router.push({
        path: '/home/toplist',
        query: {
          id
        }
      })
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
  mounted () {
    this.getTopList()
  }
}
</script>

<style lang="less" scoped>
.TopList {
  width: 689px;
  position: relative;

  .header {
    width: 100%;
    height: 33px;
    padding: 0 10px 0 34px;
    background: url('./images/index.png') no-repeat -225px -156px;
    border-bottom: 2px solid #C10D0C;

    a {
      float: left;
      font-size: 20px;
      font-weight: normal;
      line-height: 28px;
      color: #333;
      &:hover{
        cursor: pointer;
      }
    }

    .more {
      width: 40px;
      height: 16px;
      margin: 9px;
      float: right;

      a {
        font-size: 12px;
        color: #666;
        line-height: 15px;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
      }

      i {
        float: right;
        display: block;
        background: url('./images/index.png') no-repeat 0 -240px;
        font-style: normal;
        text-align: left;
        font-size: inherit;
        width: 12px;
        height: 12px;
        margin-left: 4px;
        margin-top:1px;
      }
    }
  }
  .body {
    width: 690px;
    height: 472px;
    margin-top: 20px;

    .top-flag {
        width: 230px;
        height: 472px;
        border: 1px solid #ddd;
        float: left;

        .top {
          height: 120px;
          padding: 20px 0 0 19px;
          position: relative;

          .cover {
            width: 80px;
            height: 80px;
            background: url("./images/coverall.png") no-repeat -145px -57px;
            position: absolute;
            z-index: 2;
            top:20;
            left: 19;

            &:hover{
                cursor: pointer;
            }
          }
          img {
            width: 80px;
            height: 80px;
            float: left;
          }
          .tit {
            width: 116px;
            height: 51px;
            margin: 6px 0 0 10px;
            float: left;

            >a.hover {
              cursor: pointer;
              text-decoration: underline;
            }

            a {
                color: #333;
                font-size: 14px;
                display: inline-block;
            }

            .button {
              margin-top: 8px;
              height: 22px;

              a {
                height: 100%;
                width: 22px;
                margin-right: 10px;
                font-weight:bold;
                font-family: Arial, Helvetica, sans-serif;
                background: url('./images/index.png') no-repeat;
                float: left;
              }
              .subs{
                background-position: -300px -205px;
              }
              .subs:hover{
                background-position: -300px -235px;
                cursor: pointer;
              }
              .play{
                background-position: -267px -205px;
              }
              .play:hover{
                background-position: -267px -235px;
                cursor: pointer;
              }
            }
          }
        }
        ul {
          width: 230px;

          li {
            width: 100%;
            height: 32px;
            padding-left: 25px;
            float: left;

            &:hover a {
              width: 88px;
            }

            &:hover .open {
              display: block;
            }

            span {
              float: left;
              width: 35px;
              height: 100%;
              text-align: center;
              line-height: 32px;
              font-size: 16px;
              color: #666;
            }

            a {
                float: left;
                width: 170px;
                height: 100%;
                line-height: 32px;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .red {
                color: #c10d0c;
            }

            .open {
                display: none;
                float: right;
                width: 82px;
                height: 19px;
                margin-top: 7px;
                a {
                    float: left;
                    width: 17px;
                    height: 17px;
                    margin-right: 10px;
                    background: url('./images/index.png') no-repeat;
                }
                .play{
                    background-position: -267px -268px;
                }
                .play:hover{
                    background-position: -267px -288px;
                    cursor: pointer;
                }
                .add{
                    margin-top: 2px;
                    margin-right: 6px;
                    background: url('./images/icon.png') no-repeat;
                    background-position: 0 -700px;
                }
                .add:hover{
                    background-position: -22px -700px;
                }
                .subs{
                    background-position: -297px -268px;
                }
                .subs:hover{
                    background-position: -297px -288px;
                    cursor: pointer;
                }
            }
          }
          li:nth-of-type(odd){
            background: rgb(232,232,232);
          }
          li:nth-of-type(even){
            background: rgb(244,244,244);
          }
        }

        .more {
            width: 230px;
            height: 32px;
            padding-right: 32px;
            text-align: right;
            line-height: 32px;
            background: #e8e8e8;
            color:#000;
            a {
                color: #000;
                font-size: 12px;
            }
            a:hover {
                cursor: pointer;
                text-decoration: underline;
                color: #000;
            }
        }
    }
    .top-flag:nth-child(2){
        border-left: none;
        border-right: none;
    }
  }
}
</style>
