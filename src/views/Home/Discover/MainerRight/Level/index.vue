<template>
  <div class="level">
      <div class="avatar">
        <router-link to="/user/home"><img v-lazy="userInfo.url"></router-link>
        <div class="info">
            <h4 style="overflow:hidden">
              <router-link to="/user/home">{{userInfo.name}}</router-link>
              <p>
                <router-link to="/user/level">{{userInfo.level}}</router-link>
              </p>
              <div>
                <a>签到</a>
              </div>
            </h4>
        </div>
      </div>
      <div class="dny">
        <div class="fst">
            <div class="num">{{userInfo.eventCount}}</div>
              <span class="name">动态</span>
          </div>
          <div class="followed">
            <div class="num">{{userInfo.follows}}</div>
              <span class="name">关注</span>
          </div>
          <div class="fans">
            <div class="num">{{userInfo.followeds}}</div>
              <span class="name">粉丝</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'level',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 获取用户信息
    async getUserDetail () {
      const result = await this.$API.reqDetail(localStorage.getItem('USERID'), localStorage.getItem('COOKIE'))
      const x = {}
      x.id = result.userPoint.userId
      x.level = result.level
      x.url = result.profile.avatarUrl
      x.followeds = result.profile.followeds
      x.follows = result.profile.follows
      x.eventCount = result.profile.eventCount
      x.name = result.profile.nickname
      this.userInfo = x
    }
  },
  mounted () {
    if (localStorage.getItem('COOKIE') != null) {
      this.getUserDetail()
    }
  }
}
</script>

<style lang="less" scoped>
    .level{
        width: 249px;
        height: 185px;
        padding-top: 20px;
        border-right: 1px solid #ddd;
        background: url('../images/index.png') no-repeat 0 -270px;
        .avatar{
            width: 100%;
            height: 90px;
            float: left;

            >a{
                width: 86px;
                height: 86px;
                padding:2px;
                border: 1px solid #dadada;
                background: #fff;
                margin-left: 20px;
                float: left;

                img{
                    width: 80px;
                    height: 80px;
                }
            }

            .info{
                width: 115px;
                height: 90px;
                padding-top: 3px;
                margin-left: 18px;
                float: left;

                h4{
                    >a{
                        font-size: 14px;
                        color: #333;
                        display: inline-block;
                        &:hover{
                            cursor: pointer;
                        }
                    }

                    p{
                        display: block;
                        margin-top: 5px;
                        width: 115px;
                        height: 17px;
                        a{
                            display: block;
                            float: left;
                            width: 39.675px;
                            height: 17px;
                            padding-left: 25px;
                            background: url('../images/icon2.png') no-repeat -130px -64px;
                            line-height: 18px;
                            color: #999;
                            font-weight: bold;

                            &:hover{
                                cursor: pointer;
                            }
                        }
                        i{
                            float: left;
                            margin-left: -7px;
                            width: 8px;
                            height: 17px;
                            background: url('../images/icon2.png') no-repeat -192px -64px;
                        }
                    }

                    div{
                        width: 115px;
                        height: 31px;
                        margin-top: 15px;

                        a{
                            display: block;
                            width: 100px;
                            height: 31px;
                            background: url('../images/button2.png') no-repeat -5px -470px;
                            border-radius: 10px;
                            text-align: center;
                            line-height: 31px;
                            color: #fff;
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 12px;

                            &:hover{
                                color:#fff;
                                cursor: pointer;
                                background-position: -5px -388px;
                            }
                        }
                    }
                }
            }
        }

        .dny{
            width: 230px;
            height: 40px;
            margin-top: 22px;
            margin-left: 20px;
            float: left;

            .fst{
                width: 45px;
                height: 40px;
                padding-right: 18px;
                border-right: 1px solid #e4e4e4;
                float: left;
            }
            .followed{
                float: left;
                width: 62px;
                height: 40px;
                padding: 0 18px;
                border-right: 1px solid #e4e4e4;
            }
            .fans{
                float: left;
                width: 44px;
                height: 40px;
                padding-left: 18px;

            }

            .num{
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
                display: block;
                font-size: 18px;
                font-weight: normal;
                color: #333;
                &:hover{
                    cursor: pointer;
                    color: #0c73c2;
                }
            }
        }
    }
</style>
