<template>
  <div class="header-wrapper" ref="wrap">
    <!-- 顶部 -->
    <div class="wrap" >
      <h1 class="logo" @click="GoHome"></h1>
      <ul>
        <li @click="GoHome" :class="{ active: isActive == 1 }">
          发现音乐
          <div :class="{ cor1: isActive == 1 }" v-show="isActive == 1"></div>
        </li>
        <li @click="MyMusic" :class="{ active: isActive == 2 }">
          我的音乐
          <div :class="{ cor2: isActive == 2 }" v-show="isActive == 2"></div>
        </li>
        <li @click="Friend" :class="{ active: isActive == 3 }">
          关注
          <div :class="{ cor3: isActive == 3 }" v-show="isActive == 3"></div>
        </li>
        <li>商城</li>
        <li>音乐人</li>
        <li  :class="{ active: isActive == 4 }">
          下载客户端
          <div :class="{ cor4: isActive == 4 }" v-show="isActive == 4"></div>
        </li>

        <i class="hot"></i>
      </ul>
      <a class="login pointer" @click="getCode" v-if="!isLogin"><em>登录</em></a>
      <div class="loginSuccess" v-else>
        <img :src="userImg" v-show="userImg != ''" @mouseenter="showUserBox" />
      </div>
      <a class="creater" @click="Ceater">创作者中心</a>
      <input
        v-model="searchText"
        type="text"
        placeholder="音乐/视频/电台/用户"
        class="search"
        onfocus="this.placeholder=''"
        @focus="openSearch"
        onblur="this.placeholder='音乐/视频/电台/用户'"
        @blur="closeSearch"
        @keyup.enter="Search"
      />
      <div class="u-lst clearfix" style="display:none" ref="ulst">
          <div class="schlist">
            <p class="note">
              <a class="underline">搜索"{{searchText}}"相关用户&gt;</a>
            </p>
            <div class="rap clearfix">
              <div class="item clearfix">
                <ul class="clearfix" v-for="item,index in searchList.order" :key="index">
                  <div class="hd clearfix">
                    <i class="songs" v-show="item=='songs'"></i>
                    <i class="artists" v-show="item=='artists'"></i>
                     <i class="albums" v-show="item=='albums'"></i>
                    <i class="playlists" v-show="item=='playlists'"></i>  
                    <span v-show="item=='songs'">单曲</span>
                    <span v-show="item=='artists'">歌手</span>
                    <span v-show="item=='albums'">专辑</span>
                    <span v-show="item=='playlists'">歌单</span>
                  </div>
                  <div class="odd clearfix">
                    <li v-for="attr,index in searchList[`${item}`]" :key="index">
                      <i class="over" @click="goSearch(item,attr.id)">
                        {{attr.name}}-
                        <span v-show="item=='songs'" v-for="t,index in attr.artists" :key="index">{{t.name}} </span>
                        <span v-if="item == 'albums'">{{attr.artist.name}}</span>
                      </i>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
    <!-- 登录弹框 -->
    <div class="loginBox" v-show="isShowLogin">
      <!-- 登录栏顶部 -->
      <div class="loginBoxTopBar">
        <span v-if="!phoneLogin">登录</span>
        <span v-else>手机号登录</span>
        <div class="closeLoginBox" @click="closeLoginBox">x</div>
      </div>
      <!-- 二维码登录 -->
      <div class="loginBoxWithCode" v-if="loginWithCode && !phoneLogin">
        <div style="width: 100%; height: 220px">
          <div class="phonE"></div>
          <div class="qR">
            <span>扫码登录</span>
            <div class="updateCode" @click="getCode" v-show="isUpdata">
              二维码过期,点击重新获取
            </div>
            <img :src="qrUrl" />
            <span style="font-size: 12px"
              >使用
              <a
                href="https://music.163.com/#/download"
                style="color: #0c73c2"
                target="_blank"
                >网易云音乐APP</a
              >扫码登录</span
            >
          </div>
        </div>
        <div class="changE">
          <span @click="changeLoginToPhone">选择其他方式登录</span>
        </div>
      </div>
      <!-- 手机号登录与注册 -->
      <div class="loginBoxWithPhone" v-else-if="!loginWithCode && !phoneLogin">
        <div class="loginBoxWithPhoneMainer">
          <div class="loginBoxWithPhoneLeft">
            <div class="phoneImg">
              <img src="./image/login_phone.png" />
            </div>
            <div href="" class="loginWithPhone pointer" @click="loginWithPhone">
              手机号登录
            </div>
            <div href="" class="registerWithPhone pointer" @click="checkAgree">
              注册
            </div>
          </div>
          <div class="loginBoxWithPhoneRight">
            <li>
              <div class="wechatLogo"></div>
              <span class="pointer">微信登录</span>
            </li>
            <li>
              <div class="qqLogo"></div>
              <span class="pointer">QQ登录</span>
            </li>
            <li>
              <div class="weiboLogo"></div>
              <span class="pointer">微博登录</span>
            </li>
            <li>
              <div class="emailLogo"></div>
              <span class="pointer">网易邮箱账号登录</span>
            </li>
          </div>
        </div>
        <div class="loginBoxWithPhoneBottom">
          <input type="checkbox" v-model="agree" />
          <span>同意</span>
          <a href="https://st.music.163.com/official-terms/service"
            >《服务条款》</a
          >
          <a href="https://st.music.163.com/official-terms/privacy"
            >《隐私策略》</a
          >
          <a href="https://st.music.163.com/official-terms/children"
            >《儿童隐私政策》</a
          >
        </div>
        <div class="loginBoxWithPhoneFooter pointer" @click="changeLoginToCode">
          <img src="./image/qr_login_icon.png" style="width: 100%" />
        </div>
      </div>
      <!-- 手机号登录-->
      <div class="loginWithPhone" v-else>
        <div class="loginWithPhoneMainer">
          <!-- 请输入手机号 -->
          <div class="phoneWrapper">
            <div class="local">+86</div>
            <input type="text" placeholder="请输入手机号" v-model="phone" />
          </div>
          <!-- 请输入验证码 -->
          <div class="codeWrapper" v-if="!loginWithPassWord">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <button class="getCodeForPhone" @click="sendCode">
              获取验证码
            </button>
          </div>
          <!-- 请输入密码 -->
          <div class="passwordWrapper" v-else>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              @keyup.enter="loginButton"
            />
          </div>
          <!-- 切换至密码登录 -->
          <div class="changeLoginWay">
            <a v-if="!loginWithPassWord" @click="changeLoginWay">密码登录</a>
            <a v-else @click="changeLoginWay">验证码登录</a>
            <div>
              <input type="checkbox" />
              <span>自动登录</span>
            </div>
          </div>
          <!-- 登录按钮 -->
          <button class="loginButton" @click="loginButton" ref="loginButton">登录</button>
        </div>
        <div class="loginWithPhoneFooter">
          <div class="changeLoginWayInPhoneBox pointer" @click="otherLogin">
            &lt;&nbsp;&nbsp;其他登录方式
          </div>
          <div class="registerText pointer">
            没有账号?&nbsp;免费注册&nbsp;&nbsp;&gt;
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-show="isShowLogin"></div>
    <!-- 用户属性框 -->
    <div class="userBox notChoose" ref="userBox" @mouseleave="hideUserBox">
      <li>
        <i class="el-icon-user"></i>
        <router-link to="/user/home">我的主页</router-link>
      </li>
      <li>
        <i class="el-icon-message"></i>
        <a>我的消息</a>
      </li>
      <li>
        <i class="el-icon-medal"></i>
        <router-link to="/user/level">我的等级</router-link>
      </li>
      <li>
        <i class="el-icon-present"></i>
        <a>VIP会员</a>
      </li>
      <li>
        <i class="el-icon-s-tools"></i>
        <a>个人设置</a>
      </li>
      <li>
        <i class="el-icon-lock"></i>
        <a>实名认证</a>
      </li>
      <li @click="exit">
        <i class="el-icon-circle-close"></i>
        <a>退出登录</a>
      </li>
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcode'
export default {
  name: 'Header',
  data () {
    return {
      // 是否展示登录框
      isShowLogin: false,
      // 顶部选择
      isActive: 0,
      // 二维码登录
      loginWithCode: true,
      // 二维码
      qrUrl: '',
      // 是否勾选同意协议
      agree: false,
      // 是否更新二维码
      isUpdata: false,
      // 手机登录栏
      phoneLogin: false,
      // 定时器检查二维码状态
      timer: function () {},
      // 手机号
      phone: '',
      // 密码
      password: '',
      // 验证码
      code: '',
      // 密码登录
      loginWithPassWord: false,
      // 是否登录
      isLogin: false,
      // 用户头像
      userImg: '',
      // 搜索内容
      searchText: '',
      // 搜索建议返回的结果
      searchList: {}
    }
  },
  methods: {
    GoHome () {
      if (this.$route.path === '/home/discover') {
        return
      }
      this.isActive = 1
      this.$router.push('/home/discover')
    },
    MyMusic () {
      if (this.isActive === 2) return
      this.isActive = 2
      this.$router.push('/mymusic/playlist')
    },
    Friend () {
      if (this.isActive === 3) return
      this.isActive = 3
      this.$router.push('/friend')
    },
    Change () {},
    // 关闭登录弹窗
    closeLoginBox () {
      this.isShowLogin = false
      clearInterval(this.timer)
    },
    // 获取二维码
    async getCode () {
      // 生成二维码
    //   const result = await this.$API.reqLoginQrKey()
    //   if (result.code === 200) {
    //     const result2 = await this.$API.reqLoginQrCreate(result.data.unikey)
    //     // 生成二维码地址
    //     const url = await QRCode.toDataURL(result2.data.qrurl)
    //     this.qrUrl = url
    //   }
    //   this.isUpdata = false
    //   this.isShowLogin = true
    //   this.checkCode(result.data.unikey)
    },
    // 检查二维码状态
    checkCode (key) {
      this.timer = setInterval(async () => {
        try {
          var result = await this.$API.reqLoginQrCheck(key)
          if (result.code === 800) {
            this.isUpdata = true
          } else if (result.code === 803) {
            this.$store.dispatch('updateToken', result.cookie)
            clearInterval(this.timer)
          }
        } catch (error) {
          console.log(error)
        }
      }, 5000)
    },
    // 切换至其他方式登录
    changeLoginToPhone () {
      this.loginWithCode = false
      clearInterval(this.timer)
    },
    // 切换至二维码登录
    changeLoginToCode () {
      if (this.agree === false) {
        this.$message({
          message: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》'
        })
        return
      }
      this.loginWithCode = true
      this.getCode()
    },
    // 检查是否勾选了协议
    checkAgree () {
      if (this.agree === false) {
        this.$message({
          message: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》'
        })
      }
    },
    // 手机号登录
    loginWithPhone () {
      if (this.agree === false) {
        this.$message({
          message: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》'
        })
        return
      }
      this.phoneLogin = true
    },
    // 切换登录方式（密码登录和验证码登录）
    changeLoginWay () {
      this.loginWithPassWord = !this.loginWithPassWord
    },
    // 切换其他登录方式（手机号登录界面）
    otherLogin () {
      this.phoneLogin = false
      this.password = ''
      this.phone = ''
      this.code = ''
    },
    // 检查手机号格式是否正确
    checkFhone () {
      const re = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
      return re.test(this.phone)
    },
    // 发送验证码
    async sendCode () {
      if (this.checkFhone()) {
        const { phone } = this
        const result = await this.$API.reqSent(phone)
        if (result.code !== 200) {
          alert('验证码发送失败,请稍后重试')
        }
      } else {
        this.$message({
          message: '请输入正确的手机号'
        })
      }
    },
    // 验证手机号和验证码是否正确
    async loginButton () {
      // 验证码
      if (!this.loginWithPassWord) {
        const { phone, code } = this
        const result = await this.$API.reqVerify(phone, code)
        if (result.code === 200) {
          this.$store.dispatch('updateTokenWithCode', { phone, code })
        } else {
          this.$message({
            message: '验证码错误,请输入正确的验证码',
            type: 'warning'
          })
        }
        // 手机密码
      } else {
        const { phone, password } = this
        this.$store.dispatch('updateTokenWithPassword', { phone, password })
      }
      //   let index = 5
      this.$refs.loginButton.innerHTML = '登录中...'
      //   const timer = setInterval(() => {
      //     if (localStorage.getItem('COOKIE') != null) {
      //       this.isShowLogin = false
      //       this.isLogin = true
      //       index--
      //       if (index <= 0) {
      //         clearInterval(timer)
      //       }
      //     }
      //   }, 1000)
      //   timer = setInterval(() => {
      //     location.reload()
      //     this.$refs.loginButton.innerHTML = '登录成功!'
      //     clearInterval(timer)
      //   }, 500)
      this.$refs.loginButton.innerHTML = '登录'
    },
    // 获取账号信息
    async Account () {
      const result = await this.$API.reqAccount(localStorage.getItem('COOKIE'))
      console.log(result)
    },
    // 展示个人选项盒子
    showUserBox () {
      const userBox = this.$refs.userBox
      userBox.style = 'display:block'
    },
    // 隐藏个人选项盒子
    hideUserBox () {
      const userBox = this.$refs.userBox
      userBox.style = 'display:none'
    },
    // 退出登录
    exit () {
      this.isLogin = false
      this.$store.dispatch('exit')
      this.hideUserBox()
      //   timer = setInterval(() => {
      //     location.reload()
      //     clearInterval(timer)
      //   }, 500)
    },
    // 刷新登录状态
    async refreshLogin () {
      const result = await this.$API.reqRefresh(localStorage.getItem('COOKIE'))
      console.log(result)
    },
    // 获取isActive的值
    getActive () {
      // 通过当前路径得知active是哪一个
      setTimeout(() => {
        const path = this.$route.path
        if (path.indexOf('home/') !== -1) this.isActive = 1
        else if (path.indexOf('mymusic') !== -1) this.isActive = 2
        else if (path.indexOf('friend') !== -1) this.isActive = 3
        else if (path.indexOf('download') !== -1) this.isActive = 4
        else this.isActive = -1
      }, 80)
    },
    // 获取搜索建议
    async getSearchSuggest () {
      const result = await this.$API.reqSerachSuggest(this.searchText)
      this.searchList = result.result
    },
    // 打开搜索框
    openSearch () {
      if (this.searchText !== '') {
        this.$refs.ulst.style.display = 'block'
      }
    },
    // 关闭搜索框
    closeSearch () {
      setTimeout(() => {
        this.$refs.ulst.style.display = 'none'
      }, 100)
    },
    // 搜索
    goSearch (path, id) {
      path = path.substr(0, path.length - 1)
      if (path === 'artist') path = 'artist/song'
      this.$router.push({
        path: `/${path}`,
        query: {
          id
        }
      })
    },
    Ceater () {},
    Search () {
      this.$refs.ulst.style.display = 'none'
      this.$router.push({
        path: '/search',
        query: {
          keywords: this.searchText
        }
      })
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  watch: {
    path () {
      if (this.$route.path.indexOf('/mymusic') !== -1) this.$refs.wrap.style = 'position:fixed'
      else this.$refs.wrap.style = 'position:relative'
      this.getActive()
    },
    searchText () {
      if (this.searchText !== '') {
        this.getSearchSuggest()
        this.$refs.ulst.style.display = 'block'
      } else {
        this.$refs.ulst.style.display = 'none'
      }
    }
  },
  mounted () {
    this.getActive()
    if (this.$store.state.login.userId !== null) {
      this.isLogin = true
      // this.refreshLogin();
      this.$store.dispatch('getUserInfo', this.$store.state.login.userId)
      setTimeout(() => {
        this.userImg = this.$store.state.login.userInfo.profile.avatarUrl
      }, 800)
    }
    this.$bus.$on('appear', () => {
      this.getCode()
    })
    // this.Account();
    // console.log(this.$bus);
  }
}
</script>

<style lang="less" scoped>
body {
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-text-size-adjust: none;
  .header-wrapper {
    width: 100%;
    height: 70px;
    z-index: 1000;
    position: relative;
    top:0;
    background: #242424;
    border-bottom: 1px solid #000;
    .wrap {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      .logo {
        float: left;
        width: 170px;
        height: 69px;
        padding-right: 20px;
        line-height: 70px;
        position: relative;
        bottom: 20px;
        background: url("./image/topbar.png") no-repeat;
        &:hover {
          cursor: pointer;
        }
      }
      >ul {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 100%;
        line-height: 70px;
        text-align: center;
        color: #ccc;
        float: left;
        list-style: none;
        position: relative;
        bottom: 15px;
        li {
          float: left;
          padding: 0 19px;
          width: auto;
          font-size: 14px;
          position: relative;
        }
        li:hover {
          cursor: pointer;
          background-color: #000;
        }
        .hot {
          float: left;
          padding: 0 19px;
          width: auto;
          font-size: 14px;
          background: url("./image/topbar.png") no-repeat -180px -0px;
          width: 28px;
          height: 19px;
          position: relative;
          left: -20px;
          top: 20px;
        }
      }
      .search {
        background: url("./image/topbar.png") no-repeat 0px -99px;
        background-color: #fff;
        width: 158px;
        height: 32px;
        float: right;
        margin-top: 19px;
        padding-left: 30px;
        border-radius: 32px;
        font-size: 12px;
      }
      .creater {
        width: 90px;
        height: 32px;
        padding-left: 5px;
        border: 1px solid #4f4f4f;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        border-radius: 20px;
        margin-top: 19px;
        margin-left: 12px;
        float: right;
        color: #ccc;
        &:hover {
          cursor: pointer;
          border-color: #fff;
          color: #fff;
        }
      }
      .login {
        float: right;
        width: 50px;
        height: 45px;
        padding-right: 22px;
        margin-top: 19px;
        margin-left: 20px;
        font-size: 12px;
        line-height: 30px;

        &:hover {
          color: #787878;
          text-decoration: underline;
        }
      }
      .loginSuccess {
        float: right;
        width: 50px;
        height: 45px;
        padding-right: 22px;
        margin-top: 19px;
        margin-left: 20px;
        font-size: 12px;
        line-height: 30px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .u-lst{
        position: absolute;
        top: 59px;
        width: 240px;
        z-index: 120;
        left: 980px;
        box-sizing: border-box;
        border: 1px solid #bebebe;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 4px 7px #555;
        text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
        .schlist{
          width: 100%;
          .note{
            width: 100%;
            padding: 11px 10px;
            height: 39px;
            border-bottom: 1px solid #979797;
            a{
              color: #000;
              &:hover{
                color: #000;
              }
            }
          }
          .rap{
            width: 100%;
            .item{
              width: 100%;
              display: block;
              ul{
                width: 100%;
                .hd{
                  float: left;
                  width: 63px;
                  padding: 10px 0 0 10px;
                  i{
                    float: left;
                    margin: 2px 4px 0 0;
                    width: 14px;
                    height: 15px;
                    background: url('../images/icon.png');
                  }
                  .songs{
                    background-position: -35px -300px;
                  }
                  .artists{
                    background-position: -50px -300px;
                  }
                  .albums{
                    background-position: -35px -320px;
                  }
                  .playlists{
                    background-position: -50px -320px;
                  }
                  span{
                    line-height: 15px;
                    text-align: left;
                    font-size: 12px;
                  }
                }
                .odd{
                  float: left;
                  width: 173px;
                  background: #f9f8f8;
                  margin-left: 2px;
                  margin-top: 0px;
                  padding: 6px 0 5px;
                  border-top: 1px solid #e2e2e2;
                  border-left: 1px solid #e2e2e2;
                  li{
                    width: 100%;
                    
                    i{
                      padding-left: 10px;
                      display: block;
                      height: 24px;
                      color: #000;
                      line-height: 24px;
                      &:hover{
                        color: #000;
                        background-color: #ddd;
                        cursor: pointer;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .active {
      background-color: #000;
      color: #fff;
    }
    .cor1,
    .cor2,
    .cor3,
    .cor4 {
      width: 12px;
      height: 7px;
      background: url("./image/topbar.png") no-repeat -216px -140px;
      position: absolute;
      top: 63px;
    }
    .cor1 {
      left: 43px;
    }
    .cor2 {
      left: 43px;
    }
    .cor3 {
      left: 29px;
    }
    .cor4 {
      left: 50px;
    }
  }
  .loginBox {
    width: 530px;
    height: 372px;
    position: fixed;
    z-index: 2001;
    left: 503px;
    top: 191px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    background: #fff;
    .loginBoxTopBar {
      width: 530px;
      height: 38px;
      padding-left: 18px;
      padding-right: 45px;
      background: #2d2d2d;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      span {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        line-height: 38px;
      }

      .closeLoginBox {
        width: 20px;
        height: 20px;
        position: relative;
        left: 480px;
        top: -30px;
        text-align: center;
        line-height: 20px;
        font-size: 18px;
        color: #787878;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .loginBoxWithCode {
      padding-top: 38px;
      .phonE {
        width: 125px;
        height: 220px;
        margin-left: 100px;
        background: url("./image/login_qr.png") no-repeat;
        background-size: 100%;
        float: left;
      }
      .qR {
        width: 200px;
        height: 205px;
        margin-left: 25px;
        float: left;
        text-align: center;
        font-size: 18px;
        color: #333;

        .updateCode {
          position: absolute;
          height: 50px;
          line-height: 50px;
          border: 1px solid black;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.9);
          top: 160px;
          left: 280px;

          &:hover {
            cursor: pointer;
          }
        }

        img {
          height: 134px;
          padding: 4px;
          margin: 13px 31px;
        }
      }
      .changE {
        width: 118px;
        height: 28px;
        margin: 20px auto;
        border: 1px solid #979797;
        border-radius: 15px;
        text-align: center;
        line-height: 24px;
        span {
          font-size: 12px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .loginBoxWithPhone {
      padding-top: 40px;
      padding-bottom: 39px;
      width: 528px;
      height: 253px;

      .loginBoxWithPhoneMainer {
        width: 528px;
        height: 205px;

        .loginBoxWithPhoneLeft {
          width: 300px;
          height: 205px;
          padding: 0 35px 3px 40px;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          float: left;
          .phoneImg {
            width: 224px;
            height: 120px;

            img {
              float: left;
              width: 203px;
              height: 107px;
              display: block;
              margin-left: 10px;
            }
          }

          .loginWithPhone,
          .registerWithPhone {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: relative;
            display: block;
            width: 224px;
            height: 31px;
            padding-right: 5px;
            border-radius: 5px;
            line-height: 31px;
            text-align: center;
            box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
          }
          .loginWithPhone {
            top: 20px;
            background-color: rgb(57, 136, 211);
            color: #fff;
            &:hover {
              background-color: rgb(82, 153, 221);
            }
          }
          .registerWithPhone {
            top: 30px;
            background-color: rgb(246, 246, 246);
            color: rgb(51, 51, 51);
            &:hover {
              background-color: rgb(253, 253, 253);
            }
          }
        }

        .loginBoxWithPhoneRight {
          float: left;
          width: 187px;
          height: 216px;
          padding: 3px 0 3px 39px;

          li {
            width: 148px;
            height: 38px;
            margin: 39px;
            margin: 15px 0 0 0;
            float: left;
            line-height: 38px;
            div {
              float: left;
              width: 38px;
              height: 38px;
              margin-right: 14px;
            }
            .wechatLogo {
              background: url("./image/logo.png") no-repeat -150px -670px;
            }
            .qqLogo {
              background: url("./image/logo.png") no-repeat -190.5px -670px;
            }
            .weiboLogo {
              background: url("./image/logo.png") no-repeat -231px -670px;
            }
            .emailLogo {
              background: url("./image/logo.png") no-repeat -271px -670px;
            }
          }
        }
      }

      .loginBoxWithPhoneBottom {
        margin-top: 40px;
        padding-left: 40px;

        input {
          margin-right: 5px;
          &:hover {
            cursor: pointer;
          }
        }

        a {
          color: rgb(82, 153, 221);

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .loginBoxWithPhoneFooter {
        width: 52px;
        height: 52px;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }
    .loginWithPhoneMainer {
      width: 250px;
      height: 250px;
      padding: 30px 0 43px 0;
      margin: 0 auto;

      .phoneWrapper,
      .codeWrapper,
      .passwordWrapper {
        width: 100%;
        height: 36px;
        margin-bottom: 12px;
        font-size: 12px;
      }

      .phoneWrapper {
        display: flex;
        .local {
          flex-grow: 1;
          border: 1px solid #cdcdcd;
          border-right: none;
          text-align: center;
          line-height: 36px;
          color: #000;
          font-size: 15px;
          border-radius: 5px;
        }
        input {
          border: 1px solid #cdcdcd;
          padding: 5px 0 5px 10px;
          flex-grow: 2;
          border-radius: 5px;
        }
      }

      .codeWrapper {
        display: flex;
        justify-content: space-between;
        input {
          border: 1px solid #cdcdcd;
          padding: 5px 0 5px 10px;
          width: 160px;
          border-radius: 5px;
        }

        .getCodeForPhone {
          width: 80px;
          font-size: 12px;
          border-radius: 5px;
        }
      }

      .passwordWrapper {
        padding: 7px 0 5px 10px;
        border-radius: 5px;
        border: 1px solid #cdcdcd;
      }

      .changeLoginWay {
        display: flex;
        justify-content: space-between;
        padding: 10px 0 10px 0;

        a {
          &:hover {
            color: #666;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }

      .loginButton {
        width: 100%;
        height: 33px;
        background: rgb(57, 136, 211);
        margin-top: 5px;
        border-radius: 6px;
        color: #fff;
      }
    }
    .loginWithPhoneFooter {
      height: 84px;
      width: 100%;
      border-top: 1px solid #cdcdcd;
      border-radius: 0 0 4px 4px;
      line-height: 84px;
      background-color: #f7f7f7;
      display: flex;
      justify-content: space-between;
      padding: 0 20px 0 20px;
    }
  }
  .pointer:hover {
    cursor: pointer;
  }
  .mask {
    width: 100%;
    height: 860px;
    position: fixed;
    top: -70px;
    z-index: 2000;
  }
  .userBox {
    width: 160px;
    height: 242px;
    border: 1px solid #202020;
    background: #2b2b2b;
    position: absolute;
    top: 55px;
    right: 160px;
    border-radius: 5px;
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.5);
    display: none;

    &:hover {
      display: block;
    }

    li {
      width: 100%;
      height: 34px;
      padding-left: 24px;
      /* line-height: 39px; */

      i {
        float: left;
        font-size: 18px;
        margin-top: 7px;
        margin-right: 10px;
      }

      a {
        float: left;
        height: 34px;
        line-height: 31px;
        color: #ccc;
      }

      &:hover {
        cursor: pointer;
        background: rgb(53, 53, 53);
      }
    }
  }
  .notChoose {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
