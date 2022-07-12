<template>
  <div class="level">
    <div class="header"></div>
    <div class="wrapper">
      <div class="lv">
          <h3>
            <span>当前等级</span>
            <span class="icn">
              <i></i>
              {{rellevel}}
            </span>
          </h3>
          <div class="sub">
            <li v-for="index in 10" :key="index" :class="{zov:index<=userInfo.level+1}">
              <div class="num" :class="{zon: index==level+1}">
                <span class="sep">{{index-1}}</span>
              </div>
              <div class="divsion"></div>
            </li>
          </div>
          <div class="num10" :class="{level: 10 == level}"></div>
          <div class="shadow" :style="'width:'+levelLength+'%'"></div>
          <p>等级数据每天下午两点更新</p>
      </div>
      <div class="pow">
        <h3>当前等级特权：</h3>
        <ul class="flag">
          <li v-for="item, index in userInfo.data" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="nextlv">
        <h4>
          <span>距离下一等级：</span>
          <span class="n-level">
            <i></i>
            <span>8</span>
          </span>
          <div class="point">
            <a class="icon pointer"></a>
            <div class="tip">
              <p>听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。</p>
              <p>登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。</p>
              <i class="t"></i>
              <i class="b"></i>
            </div>
          </div>
        </h4>
        <div class="util clearfix">
          <span>听歌：</span>
          <div class="bar">
            <div class="barbox">
              <span :style="'width:'+userInfo.progress*100+'%'"></span>
            </div>
          </div>
          <span>还需听{{userInfo.nextPlayCount-userInfo.nowPlayCount}}首歌</span>
        </div>
        <div class="util clearfix">
          <span>登录：</span>
          <div class="bar">
            <div class="barbox">
              <span :style="'width:'+userInfo.loginProgress*100+'%'"></span>
            </div>
          </div>
          <span>还需听{{userInfo.nextPlayCount-userInfo.nowPlayCount}}天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homelevel',
  data () {
    return {
      userInfo: {},
      rellevel: null,
      level: -2
    }
  },
  methods: {
    // 获取用户等级
    async getLevel () {
      let result = await this.$API.reqLevel(localStorage.getItem('COOKIE'))
      this.userInfo = result.data
      this.rellevel = result.data.level
      this.userInfo.data = this.userInfo.info.split('$')
      this.level = -2
      this.userInfo.loginProgress = this.userInfo.nowLoginCount/this.userInfo.nextLoginCount
      this.Go()
    },
    // 制作动画相关
    Go () {
      let index = this.userInfo.level
      setTimeout(() => {
        this.levelLength = 10*index+this.userInfo.progress*10;
      }, 100)
      this.userInfo.level = 0
      this.timer = setInterval(()=>{
        this.userInfo.level++
        if(this.userInfo.level >= index){
          clearInterval(this.timer)
        }
      }, 200)
      setTimeout(()=>{
        this.level = index
      }, 1400)   
    }
  },
  mounted () {
    this.getLevel()
  }
}
</script>

<style lang="less" scoped>
.level {
    width: 100%;
    min-height: 700px;
    .header{
        width: 100%;
        height: 5px;
        background-color: #C20C0C;
    }
    .wrapper{
        width: 980px;
        min-height: 700px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
        padding: 70px 68px;
        .lv{
            width: 100%;
            height: 112px;
            margin-bottom: 52px;
            position: relative;
            // overflow: hidden;   
            h3{
                position: relative;
                z-index: 1;
                top:0;
                height: 32px;
                line-height: 32px;
                color: #333;
                font-size: 22px;
                margin-bottom: 4px;
                font-family: 'Microsoft YaHei';
                font-weight: normal;
                span{
                    float: left;
                }
                .icn{
                    position: relative;
                    z-index: 1;
                    zoom: 1;
                    height: 32px;
                    line-height: 32px;
                    margin-left: 30px;
                    zoom: 1;
                    font-family: Arial;
                    font-size: 24px;
                    font-weight: 700;
                    color: #e03a24;
                    font-style: italic;
                    i{
                        position: absolute;
                        left: -30px;
                        top: 2px;
                        z-index: 1;
                        width: 30px;
                        height: 30px;
                        background: url('../images/mylevel.png') no-repeat left 5px;    
                    }
                    
                }
            }
            .sub{
                width: 100%;
                height: 71px;
                padding-top: 31px;
                position: relative;
                z-index: 1;
                overflow: hidden;
                li{
                    width: 10%;
                    float: left;
                    height: 100%;

                    .num{
                        font-family: 'Microsoft YaHei';
                        font-size: 18px;
                        color: #c4c6cc;
                        position: relative;
                        left: -5px;
                    }
                    .divsion{
                        width: 100%;
                        height: 13px;
                        border: #c4c6cc 1px solid;
                        background-color: #ddd;
                        border-right: 2px solid #fff;
                    }
                }
                li:first-child{
                    .num{
                        left: 0;
                    }
                    .divsion{
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                    }
                }
                li:last-child{
                    .divsion{
                        border-right: #c4c6cc 1px solid;
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                }


            }
            .num10{
                width: 30px;
                font-family: 'Microsoft YaHei';
                font-size: 18px;
                color: #c4c6cc;
                position: absolute;
                right: -15px;
                top: 67px;
            }
            .sub .zov{
                .num{
                    transition: all 1.5s;
                    color: #ed5757;
                    // animation: show 3s;
                }
            }
            li .zon{
                span{
                    margin-left: 7px;
                }
                left: -12px !important;
                transition: none !important;
                color: #fff !important;
                background: url('../images/mylevel.png') no-repeat 0px -50px;
            }
            .lev10{
                span{
                    margin-left: 1px;
                }
                color: #fff;
                right: -15px;
                background: url('../images/mylevel.png') no-repeat 0px -50px;
            }
            .shadow{
                width: 0%;
                height: 13px;
                border-radius: 5px;
                background: linear-gradient(to right, #f38484, rgb(255, 107, 107));
                transition: 1.5s all ease-out;
                opacity: 0.8;
                position: absolute;
                z-index: 2;
                top: 94px;
            }
            p{
                margin-top: 8px;
                color: #999;
            }
        }
        .pow{
            margin-top: 20px;
            border-bottom: solid 1px #ddd;
            margin-bottom: 36px;
            width: 100%;
            h3{
                position: relative;
                z-index: 1;
                zoom: 1;
                height: 32px;
                line-height: 32px;
                color: #333;
                font-size: 22px;
                margin-bottom: 4px;
                font-family: 'Microsoft YaHei';
                font-weight: normal;
            }
            .flag{
                width: 100%;
                padding-bottom: 50px;
                li{
                    height: 30px;
                    line-height: 30px;
                    color: #666;
                    padding-left: 13px;
                    background: url('../images/mylevel.png') no-repeat  ;
                    background-position: -17px -82px;
                    font-size: 14px;
                }
            }
        }
        .nextlv{
            width: 100%;
            height: 106px;
            h4{
                height: 22px;
                margin-bottom: 20px;
                line-height: 22px;
                font-size: 14px;
                color: #333;
                font-weight: normal;
                position: relative;
                .n-level{
                    position: relative;
                    margin-left: 25px;
                    zoom: 1;
                    font-family: Arial;
                    font-size: 18px;
                    font-weight: 700;
                    color: #e03a24;
                    font-style: italic;
                    i{
                        position: absolute;
                        left: -25px;
                        top: 0;
                        width: 25px;
                        height: 22px;
                        background: url('../images/mylevel.png') no-repeat  ;
                        background-position: 0 -25px;
                    }
                }
                .point{
                    position: absolute;
                    margin-left: 10px;
                    left: 150px;
                    top: 0px;
                    line-height: 18px;
                    z-index: 2;
                    .icon{
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        overflow: hidden;
                        vertical-align: middle;
                        background: url('../images/icon2.png') no-repeat 0 -50px;    
                        &:hover{
                            background: url('../images/icon2.png') no-repeat -20px -50px;    
                        }
                    }
                    .tip{
                        position: absolute;
                        left: -33px;
                        top: 30px;
                        display: none;
                        width: 333px;
                        font-size: 12px;
                        line-height: 20px;
                        padding: 8px 19px 7px 19px;
                        z-index: 2;
                        color: #666;
                        background: url('../images/top_m.png') repeat-y 0 0;
                        .t{
                            position: absolute;
                            width: 327px;
                            height: 16px;
                            left: 0;
                            top: -16px;
                            background: url('../images/top_t.png') no-repeat 0 0;
                        }
                        .b{
                            position: absolute;
                            width: 327px;
                            height: 12px;
                            left: 0;
                            bottom: -12px;
                            background: url('../images/top_b.png') no-repeat 0 0;
                        }
                    }
                    &:hover .tip{
                        display: block;
                    }
                }
            }
            .uitl{
                margin-bottom: 10px;
                width: 100%;
                span{
                    float: left;
                }
                .bar{
                    float: left;
                    width: 160px;
                    height: 12px;
                    margin-right: 6px;
                    position: relative;
                    .barbox{
                        position: absolute;
                        top: 9px;
                        left: 0;
                        z-index: 1;
                        width: 160px;
                        height: 4px;
                        line-height: 0;
                        background: #dcdfe6;
                        border-radius: 10px;
                        span{
                            border-radius: 10px;
                            width: 0%;
                            height: 100%;
                            background-color: #f75757;
                        }
                    }
                }
            }
        }
    }
}
</style>
