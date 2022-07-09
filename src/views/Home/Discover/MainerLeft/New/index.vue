<template>
  <div class="new">
    <div class="header">
      <a>新碟上架</a>
      <span class="more">
        <router-link to="/home/album">更多</router-link>
        <i>&nbsp;</i>
      </span>
    </div>
    <div class="body">
      <div class="inner">
        <div class="roll">
          <ul class='roller-flag' ref="roll">   
            <li v-for="(img,index) in imgList" :key=index>
              <img :src="img.blurPicUrl">
              <router-link :to="{path:'/album',query:{id:`${img.id}`}}"></router-link>
               <p class="over" :title="img.name">
                <router-link :to="{path:'/album',query:{id:`${img.id}`}}">{{img.name}}</router-link>
              </p>
              <p class="over" :title="img.artist.name">
                <router-link :to="{path:'/artist/song',query:{id:img.artist.id}}" class="name over underline">{{img.artist.name}}</router-link>
              </p>
              <a class="play"></a>
            </li>
          </ul>
        </div>

        <a class="pre" @click="pre"></a>
        <a class="nex" @click="nex"></a>
      </div>
     </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
    name:'new',
    data () {
      return {
        limit: 10,
        firstIndex: 1,
        finalIndex: 5,
        timer: ''
      }
    },
    methods:{
    // 向后翻页
    nex () {
      if(this.timer!='') return;
      this.firstIndex++;
      if(this.firstIndex > this.limit) this.firstIndex = 1;
      this.finalIndex++;
      if(this.finalIndex >= this.limit-1) this.finalIndex = -1;
      var roll = this.$refs.roll;
      roll.style.transition = 'left 1s'; 
      roll.style.left = roll.offsetLeft-145+'px';
      this.timer = setInterval(()=>{
        roll.style.transition = 'none';
        roll.style.left = roll.offsetLeft+113+'px';
        for(let i = 1;i<= 5;i++)
            this.imgList[i] = this.imgList[i+1];
        this.$forceUpdate();
        clearTimeout(this.timer);
        this.timer = "";
      },1200);
    },
    // 向前翻页
    pre () {
      if(this.timer != '') return;
        this.firstIndex--;
        if(this.firstIndex <= 0) this.firstIndex = this.limit;
        this.finalIndex--;
        if(this.finalIndex < -1) this.finalIndex = this.limit-2;
        var roll = this.$refs.roll;
        roll.style.transition = 'left 1s'; 
        roll.style.left = roll.offsetLeft+113+'px';
        this.timer = setInterval(()=>{
            roll.style.transition = 'none';
            roll.style.left = roll.offsetLeft-145+'px';
            for(let i = 5;i>= 1;i--)
                this.imgList[i] = this.imgList[i-1];
            this.$forceUpdate();
            clearTimeout(this.timer);
            this.timer = "";
        },1200)
      }
    },
    watch: {
      firstIndex(){
        let last = this.firstIndex-1;
        this.imgList[0] = this.AllList[last];
        this.$forceUpdate();
      },
      finalIndex(){
        let next = this.finalIndex+1;
        this.imgList[6] = this.AllList[next];
        this.$forceUpdate();
      }
    },
    computed: {
      ...mapState({
        AllList:state=>state.home.newAlbum,
      }),
      imgList(){
        return this.AllList.slice(0,7);
      },
    },
    mounted(){
      // 获取新碟上架
      this.$store.dispatch('getNew')
      // this.$store.dispatch('getAlbumAll',{limit:1,area:'ALL',offset:0});
    }
}
</script>

<style lang="less" scoped>
.new{
    width: 689px;
    position: relative;
    .header{
        width: 100%;
        height: 33px;
        padding:0 10px 0 34px;
        background: url('./images/index.png') no-repeat -225px -156px;
        border-bottom: 2px solid #C10D0C;
        a{
            float: left;
            font-size: 20px;
            font-weight: normal;
            line-height: 28px;
            color: #333;
            &:hover{
                cursor: pointer;
            }
        }
        .more{
            width: 40px;
            height: 16px;
            margin: 9px;
            float: right;
            a{
                font-size: 12px;
                color: #666;  
                line-height: 15px;
                &:hover{
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
            i{
                float: right;
                display: block;
                background: url('./images/index.png') no-repeat 0 -240px;
                font-style: normal;
                text-align: left;
                font-size: inherit;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                margin-top:1px;
            }
            
        }
    }
    
    .body{
        width: 100%;
        height: 188px;
        border: 1px solid #d3d3d3;
        margin: 20px 0 37px;
        position: relative;
        color: #333;
        .inner{
            padding-left: 16px;
            height: 186px;
            background: #f5f5f5;
            .roll{
                width: 645px;
                height: 180px;
                overflow: hidden;
                float: left;
                .roller-flag{
                    width:903px;
                    height: 150px;
                    margin-top: 28px;
                    float: left;
                    position: relative;
                    left: -129px;
                    top: 0;
                    transition: left 1s;
                    li{
                        float: left;
                        width: 118px;
                        height: 150px;
                        margin-left: 11px;
                        position: relative;
                        img{
                            width: 100px;
                            height: 100px;
                        }
                        >a{
                            width: 118px;
                            height: 100px;
                            position: absolute;
                            top:0;
                            left: 0;
                            background: url('./images/coverall.png') no-repeat 0 -570px;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        p{
                            text-align: left;
                            font-size: 12px;
                            color: #333;
                            font-family: Arial, Helvetica, sans-serif;
                            -webkit-text-size-adjust: none;
                            display: block;
                            margin-block-start: 1px;
                            margin-block-end: 1px;
                            &:hover{
                                cursor: pointer;
                                text-decoration: underline;
                            }
                            a{
                                color: #333;
                            }
                        }
                        .play{
                            position: absolute;
                            left: 80px;
                            top: 80px;
                            width: 22px;
                            height: 22px;
                            background: url('./images/iconall.png') no-repeat 0 -60px;
                            display: none;
                        }
                        &:hover .play{
                            display: block;
                        }
                    }
                }
            }
            .pre,
            .nex{
                width: 17px;
                height: 17px;
                position: absolute;
                top:75px;
                background: url('./images/index.png') no-repeat ;
                &:hover{
                    cursor: pointer;
                }
            }
            .pre{
                left: 3px;
                background-position: -260px -75px;
            }
            .nex{
                right: 3px;
                background-position: -300px -75px;
            }
        }
    }
    @keyframes moveLeft{
        from{
            left: 0px;
        }
        to{
            left:-258px;
        }
    }
}
</style>