<template>
  <div class="playlist clearfix">
    <div class="wrapper">
      <div class="tit clearfix">
        <h3>
          <span>我创建的歌单</span>
          <i class="icon"></i>
          <span>{{myListNum}}</span>
        </h3>
      </div>
      <ul class="cvrlist clearfix">
        <li v-for="item, index in myList" :key="index">
          <div class="cover pointer">
            <img v-lazy="item.coverImgUrl">
            <router-link class="shadow" :to="{path:'/playlist', query: {id:`${item.id}`}}"></router-link>
            <div class="bottom">
              <span class="icon-headset"></span>
              <span class="nb">{{item.playCount>10000?parseInt(item.playCount/10000) + '万' : item.playCount}}</span>
              <span class="icon-play"></span>
            </div>
            <p class="over underline" :title="item.name">
              <span><router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">{{item.name}}</router-link></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="tit clearfix">
        <h3>
          <span>我收藏的歌单</span>
          <i class="icon"></i>
          <span>{{likeListNum}}</span>
        </h3>
      </div>
      <ul class="cvrlist clearfix">
        <li v-for="item, index in likeList" :key="index">
          <div class="cover pointer">
            <img v-lazy="item.coverImgUrl">
            <router-link class="shadow" :to="{path:'/playlist', query: {id:`${item.id}`}}"></router-link>
            <div class="bottom">
              <span class="icon-headset"></span>
              <span class="nb">{{item.playCount>10000?parseInt(item.playCount/10000) + '万' : item.playCount}}</span>
              <span class="icon-play"></span>
            </div>
            <p class="over underline" :title="item.name">
              <span><router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">{{item.name}}</router-link></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeplayerlist',
  data () {
    return {
      myList: [],
      myListNum: 0,
      likeList: [],
      likeListNum: 0
    }
  },
  computed: {
    id () {
      return this.$route.query.id || localStorage.getItem('USERID')
    }
  },
  methods: {
    // 获取用户的歌单
    async getPlayList () {
      let result = await this.$API.reqUserPlayList(this.id, localStorage.getItem('COOKIE'))
      result.playlist.forEach(item => {
        if (item.userId == localStorage.getItem('USERID')) {
          this.myList.push(item)
          this.myListNum++
        } else {
          this.likeList.push(item)
          this.likeListNum++
        }
      })
    }
  },
  mounted () {
    this.getPlayList()
  }
}
</script>

<style lang="less" scoped>
.playlist{
    margin-top: 40px;
    width: 100%;
    .wrapper{
        width: 100%;
        .tit{
            width: 100%;
            height: 35px;
            border-bottom: 2px solid #c20c0c;
            h3{
                font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                // position: relative;
                font-size: 20px;
                line-height: 28px;
                font-weight: normal;
                color: #333;
                .icon{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    top: 1px;
                    background: url('../../images/black-r-icon@3x.png');
                    background-size: 8px;
                    position: relative;
                    top:-10px;
                    margin-right: 5px;
                }
            }
        }
        .cvrlist{
            width: 950px;
            margin-left: -50px;
            margin-top: 20px;
            li{
                float: left;
                position: relative;
                width: 190px;
                height: 195px;
                padding-left: 50px;
                padding-bottom: 30px;
                .cover{
                    width: 140px;
                    height: 140px;
                    img{
                        width: 140px;
                        height: 140px;
                    }
                    .shadow{
                        width: 140px;
                        height: 140px;
                        position: absolute;
                        top: 0;
                        left: 50px;
                        background: url('../../images/coverall.png') no-repeat 0  0;
                    }
                    .bottom{
                        position: absolute;
                        bottom: 94px;
                        top: 113px;
                        width: 140px;
                        height: 27px;
                        background: url('../../images/coverall.png') no-repeat;
                        background-position: 0 -537px;
                        color: #ccc;

                        .icon-headset{
                            float: left;
                            width: 14px;
                            height: 11px;
                            margin: 9px 5px 9px 10px;
                            background: url('../../images/iconall.png') no-repeat 0 -24px;
                        }

                        .nb{
                            display: block;
                            text-align: -webkit-match-parent;
                            word-wrap: break-word;
                            word-break: break-word;
                            font-size: 12px;
                            float: left;
                            margin: 7px 0 0 0;
                            font-family: Arial, Helvetica, sans-serif;
                            -webkit-text-size-adjust: none;
                        }
                        
                        .icon-play{
                        position: absolute;
                        float: right;
                        right: 10px;
                        bottom: 5px;
                        width: 16px;
                        height: 17px;
                        background: url('../../images/iconall.png') no-repeat 0 0;

                        &:hover{
                            background-position: 0px -60px;
                            cursor: pointer;
                        }
                        }
                    }
                }
                p{
                    margin: 8px 0 3px;
                    font-size: 14px;
                    color: #000;
                    a{
                        color: #000;
                        &:hover{
                            color: #000;
                        }
                    }
                }
            }
        }
    }
}
</style>
