<template>
  <div class="mainnerLeft">
    <div class="wrapper">
      <div class="usersub hover">我的歌手&nbsp;&nbsp;</div>
      <!-- 创建的歌单 -->
      <div class="minelist clearfix notChoose" ref='mylist'>
        <h2 class="ff1" @click="showMyList">
          <span class="add-btn pointer">新建</span>
          <span class="r-title">
            <i class="icn" ref="icn1"></i>
            <i class="down" ref="down1"></i>
            <span>创建的歌单</span>
            <i class="R"></i>
            <span class="number">{{myListNum}}</span>
          </span>
        </h2>
        <ul class="flag clearfix">
          <li class="clearfix hover" v-for="item, index in myList" :key="index" @click='changePlayList(item.id)' :class="{active:item.id==id}">
            <img v-lazy="item.coverImgUrl" class="avatar">
            <p class="name over">{{item.name}}</p>
            <p class="num">{{item.trackCount}}首</p>
          </li>
        </ul>
      </div>
      <!-- 收藏的歌单 -->
      <div class="minelist clearfix notChoose" ref='likelist'>
        <h2 class="ff1" @click="showLikeList">
          <span class="r-title">
            <i class="icn" ref="icn2"></i>
            <i class="down" ref="down2"></i>
            <span>收藏的歌单</span>
            <i class="R"></i>
            <span class="number">{{likeListNum}}</span>
          </span>
        </h2>
        <ul class="flag clearfix">
          <li class="clearfix hover" v-for="item, index in likeList" :key="index" @click='changePlayList(item.id)' :class="{active:item.id==id}">
            <img v-lazy="item.coverImgUrl" class="avatar">
            <p class="name over" :title="item.name">{{item.name}}</p>
            <p class="num">{{item.trackCount}}首</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMusicMainnerLeft',
  data () {
    return {
      myListNum: 0,
      myList: [],
      likeList: [],
      likeListNum: 0
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    // 获取用户的歌单
    async getPlayList () {
      let result = await this.$API.reqUserPlayList(localStorage.getItem('USERID'), localStorage.getItem('COOKIE'))
      result.playlist.forEach(item => {
        if (item.userId == localStorage.getItem('USERID')) {
          this.myList.push(item)
          this.myListNum++
        } else {
          this.likeList.push(item)
          this.likeListNum++
        }
      })
    },
    // 显示与隐藏我创建的歌单
    showMyList () {
      if (this.$refs.icn1.style.display == 'inline-block') {
        this.$refs.icn1.style.display = 'none'
        this.$refs.down1.style.display = 'inline-block'
        this.$refs.mylist.style.height = 'auto'
      } else {
        this.$refs.down1.style.display = 'none';
        this.$refs.icn1.style.display = 'inline-block'; 
        this.$refs.mylist.style.height = '30px'; 
      }
    },
    //显示与隐藏我收藏的歌单
    showLikeList(){
      if (this.$refs.icn2.style.display == 'inline-block') {
        this.$refs.icn2.style.display = 'none'
        this.$refs.down2.style.display = 'inline-block'
        this.$refs.likelist.style.height = 'auto'
      } else {
        this.$refs.down2.style.display = 'none'
        this.$refs.icn2.style.display = 'inline-block'
        this.$refs.likelist.style.height = '30px'
      }
    },
    // 切换歌单
    changePlayList (id) {
      this.$router.push({
        path: '/mymusic/playlist',
        query: {
          id
        }
      })
    }
  },
  mounted () {
    this.getPlayList()
    setTimeout(() => {
      if (this.id == undefined) {
        this.changePlayList(this.myList[0].id)
      } 
    }, 400)
  }
}
</script>

<style lang="less" scoped>
.mainnerLeft{
    padding:40px 0 50px 0;
    background-color: #f8f8f8;
    height: 100%;
    width: 240px;
    top: 75px;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    float: left;
    // 右侧的滚动条
    &::-webkit-scrollbar{
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.05);
        border-radius: 10px;
    }
    .wrapper{
        width: 100%;
        .usersub{
            width: 100%;
            height: 36px;
            padding: 0 5px 2px 35px;
            line-height: 36px;
            font-size: 14px;
            color: #000;
            font-weight:500;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
        }
        .minelist{
            margin-top: 8px;
            width: 100%;
            overflow: hidden;
            .ff1{
                width: 100%;
                height: 100%;
                padding: 0 10px 12px 15px;
                color: #000;
                font-size: 14px;
                font-weight:500;
                .add-btn{
                    display: block;
                    float: right;
                    width: 52px;
                    height: 22px;
                    text-align: right;
                    font-weight: normal;
                    font-size: 12px;
                    padding-right: 8px;
                    padding-top: 2px;
                    background: url('../../images/button.png') no-repeat 0 -96px;
                    &:hover{
                        background-position: -94px -39px;
                    }
                }
                .r-title{
                    position: relative;
                    cursor: pointer;
                    .icn{
                        border: 8px solid #ccc;
                        border-color: transparent transparent transparent #ccc;
                        border-style: dashed dashed dashed solid;
                        margin-right: 0;
                        display: none;
                        vertical-align: middle;
                        margin: 0 2px 0 0px;
                        cursor: pointer;
                        font-size: 0;
                        height: 0;
                        line-height: 0;
                    }
                    .down{
                        border-color: #ccc transparent transparent;
                        border-style: solid dashed dashed;
                        border-width: 8px 7px 0;
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 2px 0 2px;
                        cursor: pointer;
                        font-size: 0;
                        height: 0;
                        line-height: 0;
                    }
                    .R{
                        display: inline-block;
                        position: relative;
                        width: 8px;
                        height: 8px;
                        background: url("../../images/black-r-icon@3x.png") no-repeat;
                        background-size: 8px;
                        top: -6px;
                        margin-right: 5px;
                    }
                }
            }
            .flag{
                width: 100%;
                li{
                    position: relative;
                    height: 54px;
                    padding: 6px 0 6px 20px;
                    width: 100%;
                    .avatar{
                        width: 40px;
                        height: 40px;
                        float: left;
                    }
                    .name,.num{
                        margin-left: 50px;
                        color: #333;
                    }
                    .num{
                        margin-top: 6px;
                        color: #999;
                    }
                }
            }
        }
    }

    .active{
        background: #e4e4e4;
    }
    .hover:hover{
        background: #e4e4e4;
        cursor: pointer;
    }
}
</style>
