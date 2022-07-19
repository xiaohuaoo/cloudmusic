<template>
  <div class="mainnerright">
      <div class="like" v-show='likelist.length != 0'>
          <h3>
              <span>喜欢这个歌单的人</span>
          </h3>
          <ul class="piclist">
              <li v-for="like,index in likelist" :key="index">
                  <a class="f pointer" :title="like.nickname">
                      <img v-lazy="like.avatarUrl">
                  </a>
              </li>
          </ul>
      </div>
      <div class="related" v-show='relatedlist.length != 0'>
        <h3>
            <span>热门歌单</span>
        </h3>
        <ul class="rctlist">
            <li v-for="item,index in relatedlist" :key="index">
                <div class="cover">
                    <router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">
                        <img v-lazy="item.coverImgUrl">
                    </router-link>
                </div>
                <div class="info">
                    <p class="thide over">
                        <router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">{{item.name}}</router-link>
                    </p>
                    <p class="by over">
                        <span>by</span>
                        <a :title="item.creator.nickname" class="underline">{{item.creator.nickname}}</a>
                    </p>
                </div>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:'mainneright',
    data() {
        return {
            likelist:[],
            relatedlist:[],
        }
    },
    computed:{
        id(){
            return this.$route.query.id;
        }
    },
    watch:{
        id(){
            this.getPlayListDetail();
            this.getRelated();
        }
    },
    methods:{
        // 获取歌单信息
        async getPlayListDetail(){
            let result = await this.$API.reqPlayListDetail(this.id,localStorage.getItem('COOKIE'));
            // console.log(result);
            this.likelist = result.playlist.subscribers;
        },
        // 获取推荐歌单
        async getRelated(){
            let result = await this.$API.reqRelatedPlaylist(this.id);
            // console.log(result);
            this.relatedlist = result.playlists;
        }
    },
    mounted(){
        this.getPlayListDetail();
        this.getRelated();
    }
}
</script>

<style scoped lang="less">
    .mainnerright{
        float: right;
        width: 269px;
        padding: 20px 40px 40px 30px;
        .like{
            width: 100%;
            h3{
                width: 100%;
                height: 24px;
                border-bottom: 1px solid #ccc;
                color: #333;
                font-size: 12px;
                margin-bottom: 20px;
            }
            .piclist{
                width: 213px;
                height: 131px;
                margin-left: -13px;
                padding-bottom: 25px;
                li{
                    float: left;
                    display: block;
                    width: 53px;
                    height: 53px;
                    padding: 0 0 13px 13px;
                    .f{
                        width: 100%;
                        height: 100%;
                        img{
                            width: 40px;
                            height: 40px;
                        }
                    }
                }
            }
        }
        .related{
            h3{
                width: 100%;
                height: 24px;
                border-bottom: 1px solid #ccc;
                color: #333;
                font-size: 12px;
                margin-bottom: 20px;
            }
            .rctlist{
                width: 100%;
                li{
                    display: block;
                    width: 100%;
                    height: 50px;
                    margin-bottom: 15px;
                    line-height: 24px;
                    
                    .cover{
                        width: 50px;
                        height: 50px;
                        float: left;
                        a{
                            width: 50px;
                            height: 50px;
                            img{
                                width: 50px;
                            }
                        }
                    }
                    .info{
                        float: left;
                        width: 139px;
                        height: 50px;
                        margin-left: 10px;
                        .thide{
                            font-size: 14px;
                            a{
                                color: #000;
                                &:hover{
                                    color: #000;
                                }
                            }
                        }
                        .by{
                            span{
                                color: #999;
                            }
                            a{
                                margin-left: 5px;
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
    }
</style>