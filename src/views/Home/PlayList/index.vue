<template>
  <div class="playlist" @click="closeBox">
    <!-- 顶部 -->
    <div class="header">
      <h3>
        <span>{{catCopy}}</span>
        <a class="menu" @click="showList">
          <i>选择分类</i>
          <em class="u-icn"></em>
        </a>
      </h3>
      <a class="hot">热门</a>
    </div>
    <!-- 弹出框 -->
    <div class="cateListBox" v-show="isShowList">
      <div class="hd">
        <i class="icn"></i>
      </div>
      <div class="bd">
        <h3><a @click="goCatList('全部')">全部风格</a></h3>
          <li class="cb clearfix" v-for="(item, index) in catList" :key="index" :class="{last: index==4}">
            <!-- 种类 -->
            <div class="kind">
                <i class="icn0" v-if="index == 0"></i>
                <i class="icn1" v-else-if="index == 1"></i>
                <i class="icn2" v-else-if="index == 2"></i>
                <i class="icn3" v-else-if="index == 3"></i>
                <i class="icn4" v-else></i>
                <span>{{item.name}}</span>
            </div>
            <!-- 种类详情 -->
            <div class="item">
                <li v-for="(attr, index2) in item.sub" :key="index2">
                <a class="sep" @click="goCatList(attr)">{{attr}}</a>
                <span class="line">|</span>
                </li>
            </div>
          </li>
      </div>
      <div class="ft"></div>
    </div>
    <!-- 主体 -->
    <div class="mainer clearfix">
      <li v-for="(play, index) in playList" :key="index">
        <div class="u-cover">
          <img v-lazy="play.coverImgUrl">
        </div>
        <router-link class="shadow" :to="{path: '/playlist', query: {id: `${play.id}`}}"></router-link>
        <div class="bottom">
          <span class="icon-headset"></span>
          <span class="nb">{{play.playCount>=10000?parseInt(play.playCount/10000)+'万':play.playCount}}</span>
          <p class="dec">
            <router-link :title="play.name" class="underline" :to="{path:'/playlist',query:{id:`${play.id}`}}">{{play.name}}</router-link>
          </p>
          <p class="author">
            <span>by</span>
            <a :title="play.creator.nickname">{{play.creator.nickname}}</a>
            <img v-lazy="play.creator.avatarDetail.identityIconUrl" class="detail" v-if="play.creator.avatarDetail != null">
          </p>
        </div>
      </li>
    </div>
    <!-- 分页器 -->
    <Pagination :pageNo='pageNo' :pageSize='pageSize' :total='total' :continues='7' @getPageNo="getPageNo"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: '',
  components: { Pagination },
  props: {},
  data () {
    return {
      cat: '全部',
      pageNo: 1,
      pageSize: 35,
      total: 100,
      // 主体中的数据
      playList: [],
      // 弹框中的数据
      catList: [],
      // 是否显示弹窗
      isShowList: false,
      catCopy: '全部'
    }
  },
  methods: {
    // 获取歌单列表
    async getCat () {
      const result = await this.$API.reqplayListCat(this.pageSize, 'hot', this.cat, (this.pageNo - 1) * this.pageSize)
      this.total = result.total
      this.playList = result.playlists
    },
    // 获取当前页数
    getPageNo (pageNo) {
      this.pageNo = pageNo
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.getCat()
    },
    // 获取全部歌单列表的名称
    async getCatList () {
      const result = await this.$API.reqCatList()
      for (let i = 0; i <= 4; i++) {
        const x = { name: '', sub: [] }
        if (i === 0) x.name = '语种'
        else if (i === 1) x.name = '风格'
        else if (i === 2) x.name = '场景'
        else if (i === 3) x.name = '情感'
        else x.name = '主题'
        this.catList.push(x)
      }
      result.sub.forEach((item) => {
        this.catList[item.category].sub.push(item.name)
      })
    },
    // 显示和关闭弹窗
    showList () {
      setTimeout(() => {
        this.isShowList = !this.isShowList
      }, 100)
    },
    // 关闭弹窗
    closeBox () {
      if (this.isShowList === true) {
        this.isShowList = false
      }
    },
    // 切换分类
    goCatList (attr) {
      this.cat = attr
      this.getCat()
      this.isShowList = false
      setTimeout(() => {
        this.catCopy = this.cat
      }, 300)
    }
  },
  mounted () {
    this.getCat()
    this.getCatList()
  }
}
</script>

<style lang="less" scoped>
.playlist {
    padding: 40px;
    width: 980px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #d3d3d3;
    position: relative;
    min-height: 700px;
    // 顶部
    .header {
        width: 900px;
        height: 42px;
        border-bottom: 2px solid #c20c0c;
        >h3 {
            height: 33px;
            float: left;
            font-size: 24px;
            font-weight: normal;
            span {
                float: left;
                margin-top: -3px;
                font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                color: #333;
            }
            .menu {
                margin: 2px 0 0 12px;
                padding-left: 5px;
                display: inline-block;
                position: relative;
                width: 96px;
                background: url('./images/button2.png') no-repeat right -100px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                &:hover {
                    background-position: right -182px;
                    cursor: pointer;
                }
                &:active {
                    background-position: right -264px;
                }
                i {
                    padding: 0 10px 0 10px;
                    height: 31px;
                    line-height: 31px;
                    color: #0c73c2 !important;
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: top;
                    font-size: 12px;
                    text-align: center;
                    width: 86px;
                    background: url('./images/button2.png') no-repeat 0 -59px;
                    &:hover{
                        background-position: 0 -141px;
                    }
                    &:active{
                        background-position: 0 -223px;
                    }
                }
                .u-icn {
                    position: absolute;
                    top: 13px;
                    right: 10px;
                    width: 8px;
                    height: 5px;
                    background: url('./images/icon.png') no-repeat;
                    background-position: -70px -543px;
                }
            }
        }
        .hot {
            float: right;
            display: block;
            color: #fff;
            width: 46px;
            height: 29px;
            line-height: 29px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            background: url('./images/button.png') no-repeat 0 0;

            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
    // 弹出框
    .cateListBox {
        width: 720px;
        height: 413px;
        position: absolute;
        top: 75px;
        left: 0;
        z-index: 5;
        .hd {
            width: 100%;
            height: 32px;
            background: url("./images/sltlyr.png") no-repeat ;
            .icn {
                position: absolute;
                top: 2px;
                left: 132px;
                display: inline-block;
                width: 24px;
                height: 11px;
                background: url("./images/iconall.png") no-repeat;
                background-position: -48px 0;
            }
        }
        .bd {
            width: 100%;
            height: 361px;
            padding: 0 10px;
            background: url("./images/sltlyr.png") repeat-y -720px 0;

            h3{
                height: 38px;
                padding-left: 26px;
                border-bottom: 1px solid #e6e6e6;
                font-weight: normal;
                display: block;
                color: #333;
                border-bottom: 1px solid #e6e6e6;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
            }

            a {
                width: 75px;
                height: 26px;
                text-align: center;
                display: inline-block;
                line-height: 2px;
                background: url('./images/button.png') no-repeat 0 -64px;
                font-size: 12px;
                color: #333;
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                    color: #333;
                }
            }
        }
        .cb {
            width: 100%;
            display: block;
            .kind {
                float: left;
                width: 70px;
                height: 43px;
                margin-left: 26px;
                padding-top: 20px;
                font-weight: bold;
                i {
                    display: block;
                    float: left;
                    width: 23px;
                    height: 23px;
                    margin: 0px 8px 4px 0 ;
                    background: url('./images/icon.png') no-repeat;
                }
                .icn0{
                    background-position:-20px -735px;
                }
                .icn1{
                    background-position: 0 -60px;
                }
                .icn2{
                    background-position: 0 -88px;
                }
                .icn3{
                    background-position: 0 -117px;
                }
                .icn4{
                    background-position: 0 -141px;
                }
                span {
                    font-size: 12px;
                    color: #333;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                    line-height: 23px;
                }
            }
            .item {
                float: left;
                padding: 21px 15px 0 15px;
                border-left: 1px solid #e6e6e6;
                line-height: 24px;
                width:603px;

                li{
                  line-height: 24px;
                  display: inline-block;
                  .sep{
                    color: #333;
                    &:hover{
                      color: #333;
                      cursor: pointer;
                      text-decoration: underline;
                    }
                  }

                  .line{
                    margin: 0 9px 0 11px;
                    color: #d8d8d8;
                  }
                }

            }
          }
          .last{
              height: 102px;
              .kind{
                padding-top:35px;
              }
              .item{
                height: 100%;
              }
          }
        }
        .ft{
          width: 100%;
          height: 20px;
          background: url("./images/sltlyr.png") repeat-y -1440px -12px;
        }
      }
      // 主体
      .mainer{
        display: block;
        width: 950px;
        margin: 30px 0 50px -50px;
        li{
          width: 190px;
          height: 218px;
          padding: 0 0 30px 50px;
          position: relative;
          float: left;
          .u-cover{
            width: 140px;
            height: 140px;
            img{
              width: 100%;
            }
          }
          .shadow{
              display: block;
              width: 140px;
              height: 140px;
              background: url('./images/coverall.png') no-repeat 0 0;
              position: absolute;
              top: 0;
              &:hover{
                cursor: pointer;
              }
          }
          .bottom{
              position: absolute;
              bottom: 78px;
              left: 30;
              width: 140px;
              height: 27px;
              background: url('./images/coverall.png') no-repeat;
              background-position: 0 -537px;
              color: #ccc;

              .icon-headset{
                  float: left;
                  width: 14px;
                  height: 11px;
                  margin: 9px 5px 9px 10px;
                  background: url('./images/iconall.png') no-repeat 0 -24px;
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
                background: url('./images/iconall.png') no-repeat 0 0;

                &:hover{
                  background-position: 0px -60px;
                  cursor: pointer;
                }
              }
          }
          .dec{
            margin-top: 8px;
            // line-height: 14px;
            a{
              font-size: 14px;
              text-align: -webkit-match-parent;
              font-family: Arial, Helvetica, sans-serif;
              -webkit-text-size-adjust: none;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              width: 140px;
              display: inline-block;
              color: #000;
              &:hover{
                cursor: pointer;
                color: #000;
                text-decoration: underline;
              }
            }
          }
          .author{
            span{
              color: #999;
              font-size: 12px;
              font-family: Arial, Helvetica, sans-serif;
              -webkit-text-size-adjust: none;
              margin-right: 3px;
            }
            a:hover{
                color: #000;
                cursor: pointer;
                text-decoration: underline;
            }
            .detail{
              margin-top: -2px;
              margin-left: 4px;
              width: 13px;
              height: 13px;
            }
          }

        }
      }
    .clearfix:after{
      clear: both;
      content: '.';
      display: block;
      height: 0;
      visibility: hidden;
    }
    .clearfix{
      zoom:1;
    }
</style>
