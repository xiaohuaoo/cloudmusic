<template>
  <div class="other">
    <div class="all" v-show="area == -1 && type == -1">
      <div class="rec clearfix">
        <!-- 标题 -->
        <div class="tit">
          <h3><span>入驻歌手</span></h3>
        </div>
        <!-- 内容 -->
        <div class="sgerlist clearfix">
           <li class="singer" v-for="singer, index in allartlist" :key="index">
              <div class="cover">
                <img v-lazy="singer.img1v1Url">
                <a class="msk pointer"></a>
              </div>
              <p>
                <a class="nm underline">{{singer.name}}</a>
                <i class="pointer" v-if="singer.alias.length != 0"></i>
              </p>
           </li>
        </div>
      </div>
      <div class="oth clearfix" v-show="area != -1">
        <!-- 标题 -->
        <div class="tit">
          <h3><span>入驻歌手</span></h3>
        </div>
        <!-- 字母索引条 -->
        <ul class="n-list">
          <li class="underline" v-for="item, index in nlist" :key="index" @click="changeInitial(item)" :class="{active:item==initialNum}">
            <a>{{item}}</a>
          </li>
        </ul>
        <!-- 内部 -->
        <div class="sgerlist clearfix">
          <li class="singer" v-for="singer, index in artlist1" :key="index">
            <div class="cover">
              <img v-lazy="singer.img1v1Url">
              <router-link :to="{ path: '/artist/song', query:{ id: singer.id }}"  class="msk pointer"></router-link>
            </div>
            <p>
              <router-link :to="{ path: '/artist/song', query: { id: singer.id }}" class="nm underline">{{singer.name}}</router-link>
              <i class="pointer" v-if="singer.alias.length != 0"></i>
            </p>
          </li>
        </div>
        <!-- 更多歌手 -->
        <div class="moreOther clearfix">
          <li class="sml" v-for="sml, index in artlist2" :key="index">
            <router-link :to="{path: '/artist/song', query: {id: sml.id}}" class="over underline">{{sml.name}}</router-link>              
            <i class="pointer" v-if="sml.alias.length != 0"></i>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'other',
  data () {
    return {
      allartlist: [],
      nlist: [],
      initialNum: '热门',
      artlist1: [],
      artlist2: []
    }
  },
  computed: {
    type () {
      return this.$route.query.type
    },
    area () {
      return this.$route.query.area
    },
    initial () {
      return this.$route.query.initial
    }
  },
  methods: {
    // 获取热门歌手
    async getArtistTop (limit) {
      let result = await this.$API.reqArtists(limit)
      this.allartlist = result.allartlist
    },
    //获取分类歌手
    async getArtistsList(){
      let { area, type, initial } = this
      if  (initial == undefined ) initial = -1
      let result = await this.$API.reqArtistsList(type, area, initial, 100, 0)
      this.artlist1 = result.artists.slice(0, 10)
      this.artlist2 = result.artists.slice(10)
    },
    changeInitial (item) {
      if (item == '热门') {
        item = -1
      } else if (item == '其他') {
        item = 0
      }
      this.$router.push({
        path: '/home/artist',
        query: {
          type: this.type,
          area: this.area,
          initial: item
        }
      })
    }
  },
  watch: {
    type () {
      return this.$route.query.type
    },
    area () {
      return this.$route.query.area
    },
    initial () {
      return this.$route.query.initial
    }
  },
  mounted () {
    this.getArtistTop(100)
    thi.getArtistsList()
    this.nlist.push('热门')
    for(let i = 0;i < 26;i++){
      this.nlist.push(String.fromCharCode(65 + i))
    }
    this.nlist.push('其他')
  }
}
</script>

<style lang="less" scoped>
 .Other{
    width: 800px;
    border-left: 1px solid #d3d3d3;
    float: left;
    background-color: #fff;
    padding: 40px;
    .all{
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
    }
    .oth{
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
        .n-list{
            margin-top: 20px;
            margin-left: -3px;
            font-size: 12px;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
            width: 722px;
            height: 24px;
            li{
                margin-left: 3px;
                float: left;
                text-align: center;
                width: 21px;
                height: 24px;
                line-height: 24px;
                border-radius: 2px;
                font-size: 14px;
                a{
                    color: #000;
                    &:hover{
                        color: #000;
                    }
                }
            }
            .active{
                background: #c20c0c;
                a{
                    color: #fff; 
                    &:hover{
                        color: #fff;
                    }   
                }
                
            }
            li:first-child,
            li:last-child{
                width: 45px;
                font-size: 12px;
            }
        }
        .sgerlist{
            width: 736px;
            margin-left: -17px;
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
                    width: 70px;
                    height: 18px;
                    color: #000;
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
}
</style>
