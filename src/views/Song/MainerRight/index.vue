<template>
  <div class="mainerright">
      <div class="u-hd">
          <span>相似歌曲</span>
      </div>
      <ul class="sglist clearfix">
          <li class="clearfix" v-for="song,index in songs" :key="index">
              <div class="txt">
                  <router-link :to="{path:'/song',query:{id:`${song.id}`}}" class="name underline over" :title="song.name">{{song.name}}</router-link>
                  <router-link :to="{path:'/artist/song',query:{id:`${song.artists[0].id}`}}" class="artist underline over" :title="song.artists[0].name">{{song.artists[0].name}}</router-link>
              </div>
              <div class="opr clearfix">
                  <a class="play" @click="setMusic(song.id)"></a>
                 <a class="add"  @click="addMusicList(song.id)"></a>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'mainerright',
    data() {
        return {
            songs:[]
        }
    },
    computed:{
        id(){
            return this.$route.query.id || 1915297033;
        }
    },
      watch:{
        id(){
            this.getSimi();
        }
    },
    methods:{
        // 获取相似歌曲
        async getSimi(){
            let result = await this.$API.reqSimiSong(this.id);
            this.songs = result.songs;
        },
        // 添加音乐至播放列表
        addMusicList(ids){
            this.$store.dispatch('addMusicList',ids);
        },
        // 设置当前播放的音乐
        setMusic(id){
            this.$store.dispatch('setMusics',id);
            this.$store.dispatch('addMusicList',id);
            setTimeout(() => {
                this.$bus.$emit('play');    
            }, 500);      
        },
    },
    mounted(){
        this.getSimi();
    }
}
</script>

<style scoped lang="less">
.mainerright{
    float: right;
    width: 270px;
    padding: 20px 40px 40px 30px;
    .u-hd{
        width: 100%;
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #000;
    }
    .sglist{
        margin-bottom: 30px;
        li{
            margin-top: 10px;
            .txt{
                float: left;
                width: 156px;
                line-height: 16px;
                .name{
                    width: 156px;
                    height: 16px;
                    display: block;
                    color: #000;
                }
                .artist{
                    width: 156px;
                    height: 16px;
                    color: #999;
                    display: block;
                }
            }
            .opr{
                float: right;
                position: relative;
                top: 10px;
                line-height: 32px;
                .play{
                    display: block;
                    margin-right: 16px;
                    float: left;
                    width: 10px;
                    height: 11px;
                    background: url('../images/icon2.png') no-repeat;
                    background-position: -69px -455px;
                    opacity: 0.9;
                    &:hover{
                        cursor: pointer;
                        opacity: 1;
                    }
                }
                .add{
                    display: block;
                    margin-right: 0px;
                    float: left;
                    width: 10px;
                    height: 11px;
                    background: url('../images/icon2.png') no-repeat;
                     background-position: -87px -454px;
                     &:hover{
                        cursor: pointer;
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>