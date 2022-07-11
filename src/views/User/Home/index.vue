<template>
  <div class="home">
    <div class="header"></div>
    <div class="wrapper clearfix">
        <div class="proifo clearfix">
            <div class="cover">
              <img v-lazy="userInfo.avatarUrl">
            </div>
            <div class="info">
              <div class="name clearfix">
                <h2 class="wrap">
                  <span class="tit">{{userInfo.nickname}}</span>
                  <span class="lev">
                    {{userInfo.level}}
                    <i class="uicn2"></i>
                  </span>
                </h2>
              </div>
              <div class="data clearfix">
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
              </div>
              <div class="inf">
                <span>所在地区：{{userInfo.city}} </span>
                <span class="sep">年龄：{{userInfo.birthday}}0后</span>
              </div>
              <div class="inf">
                <span>社交网络：</span>
                <ul class="logo">
                  <li>
                    <i title="新浪微博"></i>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <Songs :listenSongs="userInfo.listenSongs"></Songs>
        <PlayList></PlayList>
    </div>
  </div>
</template>

<script>
import city from '@/assets/city'
import Songs from './Songs'
import PlayList from './PlayList'
export default {
  name: 'userhome',
  components: {
    Songs,
    PlayList
  },
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  computed: {
    id () {
      return this.$route.query.id || localStorage.getItem('USERID')
    }
  },
  methods: {
    // 获取用户信息
    async getUserDatail () {
      let result = await this.$API.reqUserDetail(this.id, localStorage.getItem('COOKIE'))
      this.userInfo.birthday = String(new Date(result.profile.birthday).getFullYear()).slice(2, 3)
      let x = String(result.profile.city).slice(0, 4)
      for (let i = 0; i < city.length; i++) {
        if (city[i].code == x) {
          this.userInfo.city = city[i].city+'市';
          break
        }
      }
      this.userInfo.eventCount = result.profile.eventCount;
      this.userInfo.followeds = result.profile.followeds;
      this.userInfo.follows = result.profile.follows;
      this.userInfo.nickname = result.profile.nickname;
      this.userInfo.level = result.level;
      this.userInfo.listenSongs = result.listenSongs;
      this.userInfo.avatarUrl = result.profile.avatarUrl;
      this.$forceUpdate()
    }
  },
  mounted () {
    this.getUserDatail()
  }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
    min-height: 700px;
    .header{
        width: 100%;
        height: 5px;
        background-color: #C20C0C;
    }
    .wrapper{
        width: 980px;
        padding: 40px;
        margin: 0 auto;
        background-color: #fff;
        .proifo{
            width: 900px;
            margin-bottom: 43px;
            .cover{
                width: 188px;
                height: 188px;
                margin-right: 40px;
                float: left;
                img{
                    display: block;
                    width: 188px;
                    height: 188px;
                    padding: 3px;
                    background: #fff;
                    border: 1px solid #d5d5d5;                  
                }
            }
            .info{
                float: left;
                width: 670px;
                height: 168px;
                .name{
                    width: 100%;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #ddd;;
                    margin-bottom: 10px;
                    .wrap{
                        padding-bottom: 3px;
                        float: left;
                        .tit{
                            float: left;
                            margin-top: 3px;
                            font-size: 22px;
                            font-weight: normal;
                            line-height: 30px;
                            color: #000;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-wrap: normal;
                        }
                        .lev{
                            font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                            float: left;
                            margin: 8px 0 0 10px;
                            height: 19px;
                            overflow: hidden;
                            padding-left: 29px;
                            line-height: 20px;
                            color: #e03a24; 
                            font-style: italic;
                            background: url('../images/icon2.png') no-repeat  -135px -190px;
                            -webkit-font-smoothing: antialiased;
                            font-size: 14px;
                            font-weight: bold;
                            vertical-align: middle;
                            i{
                                float: right;width: 9px;
                                height: 19px;
                                background: url('../images/icon2.png') no-repeat  -191px -190px;
                            }
                        }
                    }
                }
                .data{
                    width: 100%;
                    height: 41px;
                    margin-bottom: 15px;
                    color: #666;
                    li{
                        height: 100%;
                        padding: 0 40px 0 20px;
                        border-left: 1px solid #ddd;
                        float: left;
                        em{
                            display: block;
                            margin-top: -8px;
                            font-size: 24px;
                            font-weight: normal;
                            cursor: pointer;
                        }
                        &:hover{
                            color: #0c73c2;
                            cursor: pointer;
                        }
                    }
                    li:first-child{
                        padding-left: 0;
                        border: none;
                    }
                }
                .inf{
                    margin-bottom: 5px;
                    line-height: 21px;
                    .sep{
                        margin-left: 20px;
                    }
                }
            }
        }
        .box{
            width: 0px;
            height: 30px;
            background-color: red;
            transition: all 2s;
        }
    }
}
</style>
