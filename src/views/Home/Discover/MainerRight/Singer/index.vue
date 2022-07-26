<template>
  <div class="singer">
    <div class="header">
      <span>入驻歌手</span>
      <router-link to="/home/artist">查看全部></router-link>
    </div>
    <div class="body">
      <li v-for="artist,index in artistsList" :key=index>
        <router-link :to="{path:'/artist/song',query:{id:artist.id}}" :title="artist.name">
          <div class="head">
            <img v-lazy="artist.url">
          </div>
          <div class="info">
            <h4>{{artist.name}}</h4>
            <p>{{artist.info}}</p>
          </div>
        </router-link>
      </li>
      <div class="btn">
        <span>申请成为网易音乐人</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'singer',
  data () {
    return {
      artistsList: []
    }
  },
  methods: {
    async getArtists(){
      let result = await this.$API.reqArtists(5, 0)
      result.artists.forEach((item) => {
        let x = {}
        x.name = item.name
        if(item.alias == '') x.info = x.name
        else x.info = item.alias[0]
        x.url = item.img1v1Url
        x.id = item.id
        this.artistsList.push(x)
      })
    }
  },
  mounted () {
    this.getArtists()
  }
}
</script>

<style lang="less" scoped>
.singer{
    margin-top:15px;
    width: 250px;
    height: 455px;
    // 头部
    .header{
        position: relative;
        margin: 0 20px;
        height: 23px;
        border-bottom: 1px solid #ccc;
        color: #333;
        display: flex;
        justify-content: space-between;
        span{
            font-weight: bold;
            color:#333;
        }
        a{
            color: #666;
            &:hover{
                cursor: pointer;
                color: #666;
                text-decoration: underline;
            }
        }
    }
    
    .body{
        width: 230px;
        height: 380px;
        margin: 6px 0 14px 20px;
        li{
            list-style: none;
            margin-top: 14px;
            width: 210px;
            height: 62px;
            float: left;
            // background: #fafafa;
            &:hover{
                cursor: pointer;
                background-color: #f5f5f5;
            }
            a{
                float: left;
                width: 100px;
                height: 100px;
                
                .head{
                    float: left;
                    width: 62px;
                    height: 62px;
                    img{
                        width: 100%;
                    }
                }   
                .info{
                    float: left;
                    width: 147px;
                    height: 62px;
                    padding-left: 14px;
                    border:1px solid #e9e9e9;
                    border-left: none;
                    z-index: 1;
                    margin-top: -70px;
                    margin-left: 60px;
                    h4{
                        font-size: 14px;
                        color:#333;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                        font-weight: bold;
                        margin-top: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    p{
                        margin-top: 8px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #666;
                        :hover{
                            color: #666;
                        }
                    }
                }
            }
            
        }
        .btn{
            width: 210px;
            height: 31px;
            padding-right: 5px;
            float: left;
            margin-top: 14px;
            background: rgb(235,235,235);
            border: 1px solid #bbb;
            border-radius: 7px;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
            &:hover{
                background: rgb(245,245,245);
                cursor: pointer;
            }
            span{
                display: inline-block;
                padding: 0 15px 0 20px;
                width: 210px;
                pointer-events: none;
                height: 31px;
                line-height: 31px;
                overflow: hidden;
                text-align: center;
                font-style: normal;
                white-space: nowrap;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
                font-weight: bold;
            }
        }
    }
}
</style>