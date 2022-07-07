<template>
  <div class="MainerRight clearfix">
      <div class="rec clearfix">
        <!-- 标题 -->
        <div class="tit">
            <h3><span>入驻歌手</span></h3>
            <a class="more underline" @click="more">更多 &gt;</a>
        </div>
        <!-- 内容 -->
        <div class="sgerlist clearfix">
          <li class="singer" v-for="singer, index in artlist1" :key="index">
            <div class="cover">
              <img v-lazy="singer.img1v1Url">
              <router-link :to="{path: '/artist/song', query:{id: singer.id}}" class="msk pointer"></router-link>
            </div>
            <p>
              <router-link :to="{path: '/artist/song', query:{id: singer.id}}" class="nm underline">{{singer.name}}</router-link>
              <i class="pointer" v-if="singer.alias.length != 0"></i>
            </p>
          </li>
        </div>
      </div>
      <div class="rec clearfix">
        <!-- 标题 -->
        <div class="tit">
            <h3><span>入驻歌手</span></h3>
            <a class="more underline" @click="more">更多 &gt;</a>
        </div>
        <!-- 内容 -->
        <div class="sgerlist clearfix">
          <li class="singer" v-for="singer, index in artlist2" :key="index">
            <div class="cover">
              <img v-lazy="singer.img1v1Url">
              <router-link :to="{path: '/artist/song', query:{id: singer.id}}" class="msk pointer"></router-link>
            </div>
            <p>
              <router-link :to="{path: '/artist/song', query:{id: singer.id}}" class="nm underline">{{singer.name}}</router-link>
              <i class="pointer" v-if="singer.alias.length != 0"></i>
            </p>
          </li>
        </div>      
      </div>
      <div class="moreOther clearfix">
        <li class="sml" v-for="sml, index in artlist3" :key="index">
          <router-link :to="{path: '/artist/song', query:{id: sml.id}}" class="over underline">{{sml.name}}</router-link>
          <i class="pointer" v-if="sml.alias.length != 0"></i>
        </li>
      </div>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data () {
    return {
      artlist1: [],
      artlist2: [],
      artlist3: []
    }
  },
  methods: {
    // 获取热门歌手
    async getArtistTop () {
      let result = await this.$API.reqArtists(110)
      this.artlist1 = result.artists.slice(10, 20)
      this.artlist2 = result.artists.slice(0, 10)
      this.artlist3 = result.artists.slice(20)
    },
    //获取分类歌手
    // async getArtistsList () {
    //   let result = await this.$API.reqArtistsList()
    // },
    //前往入驻歌手模块
    more () {
      this.$router.push({
        path: '/home/artist',
        query: {
          area: -1,
          type: -1
        }
      })
    }
  },
  mounted () {
    this.getArtistTop()
  }
}
</script>

<style lang="less" scoped>
.MainerRight{
    width: 800px;
    border-left: 1px solid #d3d3d3;
    float: left;
    background-color: #fff;
    padding: 40px;
    .rec{
        width: 100%;
        .tit{
            width: 100%;
            height: 42px;
            border-bottom: 2px solid #c20c0c;

            h3{
                float: left;
                font-size: 24px;
                font-weight: normal;
                color: #333;
            }
            .more{
                margin-top: 14px;
                float: right;
                &:hover{
                    color: #333;
                }
            }
        }   
        .sgerlist{
            width: 736px;
            margin-left: -17px;
            height: 368px;
            margin-top: 20px;
            .singer{
                float: left;
                width: 147px;
                height: 184px;
                padding: 0 0 30px 17px;
                position: relative;
                .cover{
                    width: 130px;
                    height: 130px;
                    img{
                        width: 130px;
                        height: 130px;
                    }
                    .msk{
                        display: block;
                        width: 130px;
                        height: 130px;
                        top: 0;
                        position: absolute;
                        background: url('../../images/coverall.png') no-repeat 0 -680px;
                    }   
            
                }
                p{
                    margin-top: 8px;
                    float: left;
                    width: 100%;
                    a{
                        color: #000;    
                    }
                    >a:hover{
                        color: #000;
                    }
                    i{
                        display: block;
                        float: right;    
                        margin: 1px 0 0 5px;
                        width: 17px;
                        height: 18px;
                        background: url("../../images/icon.png") no-repeat 0 -740px;
                    }
                }     
            }
        }         
    }
    .moreOther{
        width: 720px;
        margin-top: 10px;
        padding-top:15px;
        border-top: 1px dotted #999; ;

        .sml{
            float: left;
            width: 144px;
            height: 30px;
            overflow: hidden;
            padding-left: 17px;
            a{
                float: left;
                color: #000;
                width: 70px;
                height: 18px;
                &:hover{
                    color: #000;
                }
            }
            i{
                display: block;
                float: left;    
                margin: 1px 0 0 5px;
                width: 17px;
                height: 18px;
                background: url("../../images/icon.png") no-repeat 0 -740px;
            }

        }
    }
}
</style>
