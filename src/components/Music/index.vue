<template>
  <div class="music" ref="music"  @mouseover="showMusic" @mouseleave="WatchMusic">
      <audio :src="music" ref="audio"></audio>
      <div class="player-wrapper notChoose" @mouseup="stopChange()" @mousemove="getX($event)">
          <div class="btns" @mouseup.stop @mousemove.stop >
              <a class="pre" title="上一首歌" @click="pre"></a>
              <a class="pause" title="暂停播放" @click="pause" ref="pause"></a>
              <a class="stop" title="开始播放" @click="play" ref="stop"></a>
              <a class="nex" title="下一首歌" @click="nex"></a>
          </div>
          <div class="head">
              <img :src="song.al.picUrl" v-if="song.al" :title="song.al.name">
              <a class="msk"></a>
          </div>
          <div class="play">
              <div class="words ">
                  <router-link :to="{path:'/song',query:{id:song.id}}" :title="song.name" class="name underline">{{song.name}}</router-link>
                  <router-link :to="{path:'/artist/song',query:{id:song.ar[0].id}}"  class="art underline" v-if="song.ar" :title="song.ar[0].name">{{song.ar[0].name}}</router-link>
                  <router-link :to="{path:'/artist/song',query:{id:song.ar[0].id}}" class="src" title="来自歌手" v-if="song.ar"></router-link>
              </div>
              <div class="bar">
                <div class="barbg" @mousedown="changePosition($event)">
                    <div class="rdy"></div>
                    <div class="cur" :style="'width:'+`${width}`+'%'">
                        <div @click.stop>
                            <div class="btn" @mousedown="goChange()" >
                            </div>    
                        </div>
                    </div>
                </div>
                <div class="time">
                    <span style="color: #A1A1A1;">{{nowTime}}</span>
                    <span>&nbsp;/&nbsp;</span>
                    <span>{{duration}}</span>
                </div>
              </div>
          </div>
          <div class="ctrl" @click.stop>
              <a class="volume" title="音量" @click="isShowVolume=!isShowVolume"></a>
              <div class="volumeBox" @click.stop @mousemove="getY($event)" @mouseup="stopVolume" v-show="isShowVolume">
                  <div class="barbg" ></div>
                    <div class="vbg" @click="changeVolume($event)" >
                        <div class="cur" :style="'height:'+`${volumeHeight}`+'%'" ></div>
                        <span class="jt" :style="'bottom:'+`${volumeHeight}`+'%'" @mousedown="goVolume"></span>
                    </div>                 
              </div>
              <a class="loop1" v-show="loop==1" title="循环播放" @click="loop=2"></a>
              <a class="loop2" v-show="loop==2" title="随机播放" @click="loop=3"></a>
              <a class="loop3" v-show="loop==3" title="单曲循环" @click="loop=1"></a>
              <div class="f-pr">
                  <a class="list" @click="showList">{{musiclist.length}}</a>
              </div>
          </div>
          <div class="ffl">
              <a class="unlocked" v-show="!locked" @click="locked=true"></a>
              <a class="locked" v-show="locked" @click="locked=false"></a>
          </div>
          <div class="ffr"></div>
          <div class="addsuccess" ref="addsuccess">
              <span>已添加到播放列表</span>
          </div>
      </div>
      <div class="playlist" ref="playlist">
          <div class="list" :style="'top:'+`${list?0+'%':100+'%'}`">
              <div class="listhd">
                  <div class="listhdc">
                      <h4>
                          播放列表({{musiclist.length}})
                      </h4>
                      <a class="clear underline" @click="removeAllMusic">
                          <span class="icon"></span>
                          清除
                      </a>
                      <p class="tit">{{song.name}}</p>
                      <span class="close" @click="showList()"></span>
                  </div>
              </div>
              <div class="listbd">
                  <div class="cvr"></div>
                    <div class="listbdc" v-if="musiclist.length != 0">
                        <ul class="clearfix">
                            <li v-for="song,index in musiclist" :key="index" @click="setMusic(song.id)" :class="{musicActive:song.id==musicNow.id}">
                                <div class="col col1">
                                    <div class="playicn"></div>
                                </div>
                                <div class="col col2">{{song.name}}</div>
                                <div class="col col3" @click.stop>
                                    <div class="icns">
                                        <i class="del" title="删除" @click="deleteMusic(song.id)"></i>
                                        <i class="download" title="下载"></i>
                                        <i class="share" title="分享"></i>
                                        <i class="add" title="收藏"></i>
                                    </div>
                                </div>
                                <div class="col col4">
                                    <span v-for="artist,index in song.ar" :key="index">
                                        <router-link :to="{path:'/artist/song',query:{id:artist.id}}" :title="artist.name" class="underline art">{{artist.name}}</router-link>
                                        <span v-if="index != song.ar.length-1">&nbsp;/&nbsp;</span>
                                    </span>

                                </div>
                                <div class="col col5">{{min(song.dt)}}:{{sec(song.dt)}}</div>
                                <div class="col col6">
                                    <router-link :to="{path:'/artist/song',query:{id:song.ar[0].id}}" title="来自歌手" v-if="song.ar"></router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="nocnt" v-else>
                        <i class="ico"></i>
                        <span>你还没有添加任何歌曲</span>
                        <br>
                        <span>去首页<router-link to="/home/discover">发现音乐</router-link>，或在<router-link to="/mymusic">我的音乐</router-link>收听自己收藏的歌单</span>
                    </div>
                    <div class="bline"></div>
                    <div class="lyric-wrapper" ref="lyric">
                        <div class="lyric" ref="lyriclist">
                            <p v-for="lyric,index in currentLyric.lines" :key="index" :class="{active:index==lyricIndex}">
                                {{lyric.txt}}
                            </p>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
export default {
    name:'music',
    data() {
        return {
            // 播放器
            music:'',
            // 定时器(监视是否需要隐藏播放器)
            timer:'',
            // 播放器进度条
            audio:'',
            // 歌曲详情
            song:{},
            // 总时长
            duration:null,
            // 现在的时长
            nowTime:'00:00',
            // 进度条定时器
            timer2:'',
            // 当前歌曲播放比例
            width:0,
            // 是否处于拖拽状态
            isChange:false,
            // 判断循环模式
            // 1为循环播放，2为随机播放，3为单曲循环
            loop:1,
            // 设置声音比例
            volumeHeight:60,
            // 音量是否处于拖拽状态
            isVolume:false,
            // 显示声音状态栏
            isShowVolume:false,
            // 是否锁住播放器
            locked:false,
            // 显示歌曲列表
            list:false,
            // 歌曲列表的定时器
            listTimer:null,
            // 当前播放的音乐的歌词
            currentLyric:'',
            // 当前放到哪一句歌词
            lyricIndex:0,
            // 歌词定时器
            lyricTimer:null,
            // 当前放到哪一首音乐
            musicIndex:-1,
        }
    },
    methods:{
        // 获取音乐url
        async getMusic(){
            let result = await this.$API.reqSongUrl(this.musicNow.id);
            this.music = result.data[0].url;
            this.music = this.music.replace(/m801.music/g,'m701.music');
            this.audio =  this.$refs.audio;   
        },
        // 获取歌曲详情
        async getMusicDetail(){
            let result = await this.$API.reqSong(this.musicNow.id);
            // console.log(result);
            this.song = result.songs[0];
            this.duration = this.min(this.song.dt)+':'+this.sec(this.song.dt);
        },
        // 获取歌曲歌词
        async getMusicLyric(){
            let result = await this.$API.reqlyric(this.musicNow.id);
            this.currentLyric =  new Lyric(result.lrc.lyric, this.lyricHandle)
        },
        // 开始播放
        play(){
            this.audio.play();
            this.$refs.pause.style="display:block";
            this.$refs.stop.style="display:none";
            this.audio.volume = this.volumeHeight/80;
            this.WatchBar();
            this.setLyricTimer();
            this.$refs.music.style= 'height:53px';
            clearInterval(this.timer);
        },
        // 暂停播放
        pause(){
            this.audio.pause();
            this.$refs.pause.style="display:none";
            this.$refs.stop.style="display:block";
            clearInterval(this.timer2);
            this.timer2 = "";
            clearInterval(this.lyricTimer);
            this.lyricTimer = "";
        },
        // 上一首歌
        pre(){
            let index = this.musicIndex-1;
            if(index == -1) index = this.musiclist.length-1;
            if(this.loop == 1 || this.loop == 3){
                this.setMusic(this.musiclist[index].id);
            }else if(this.loop == 2){
                this.setMusic(this.musiclist[parseInt(Math.random()*this.musiclist.length)].id);
            }
        },
        // 下一首歌
        nex(){
            let index = this.musicIndex+1;
            if(index == this.musiclist.length) index = 0;
            if(this.loop == 1){
                this.setMusic(this.musiclist[index].id);
            }else if(this.loop == 2){
                this.setMusic(this.musiclist[parseInt(Math.random()*this.musiclist.length)].id);
            }else{
                this.setMusic(this.musiclist[this.musicIndex].id);
            }
        },
        // 显示音乐播放器
        showMusic(){
            this.$refs.music.style= 'height:53px';
            clearInterval(this.timer);
        },
        // 开启监视
        WatchMusic(){
            this.timer=setInterval(() => {
                this.isShowVolume = false;
                if(!this.locked && !this.list)
                    this.$refs.music.style.height = '8px';
                clearInterval(this.timer);
            }, 1000);
        },
        // 进度条监视
        WatchBar(){
            clearInterval(this.timer2);
            this.timer2 = setInterval(() => {
                this.width = this.audio.currentTime/this.audio.duration*100;
                this.duration = this.min(this.audio.duration*1000)+':'+this.sec(this.audio.duration*1000);
                this.nowTime = this.min(this.audio.currentTime*1000)+':'+this.sec(this.audio.currentTime*1000);
                // 播放完毕
                if(this.audio.currentTime == this.audio.duration){
                    this.nex();
                    clearInterval(this.timer2);
                }
            }, 100);
        },
        // 改变进度条
        changePosition(e){
            this.width = Math.max(Math.min((e.clientX-455)/466*100,100),0);
            this.audio.currentTime = this.width/100*this.audio.duration;
        },
        // 允许拖拽进度条
        goChange(){
            this.isChange = true;
            clearInterval(this.timer2);
            this.timer2= "";
        },
        // 拖拽 
        getX(e){
            if(this.isChange == false) return;
            this.width = Math.max(Math.min((e.clientX-455)/466*100,100),0);
        },
        // 停止拖拽
        stopChange(){
            if(this.isChange == true){
                this.isChange = false;
                this.WatchBar();
                this.audio.currentTime = this.width/100*this.audio.duration;    
            }
        },
        // 调整音量大小
        changeVolume(e){
            this.volumeHeight = Math.max(Math.min((693-e.clientY)/87*100-10,80),0);
            this.audio.volume = this.volumeHeight/80;
        },
        // 允许拖拽音量
        goVolume(){
            this.isVolume = true;
        },
        // 拖拽音量
        getY(e){
            if(this.isVolume == true){
                this.volumeHeight = Math.max(Math.min((693-e.clientY)/87*100-10,80),0);
                this.audio.volume = this.volumeHeight/80;
            }
        },
        //停止拖拽
        stopVolume(){
            if(this.isVolume == true)
                this.isVolume = false;
        },
        // 显示和隐藏歌曲列表
        showList(){
            clearInterval(this.listTimer);
            // this.list = !this.list;
            if(this.list == false){
                this.$refs.playlist.style="display:block";
                setTimeout(() => {
                    this.list = true;    
                }, 10);
            }else{
                this.list = false;
                this.listTimer = setTimeout(() => {
                    this.$refs.playlist.style="display:none";
                },400);
            }
        },
        // 删除播放列表中的音乐
        deleteMusic(id){
            this.$store.dispatch('removeMusic',id);
        },
        // 清除所有的音乐
        removeAllMusic(){
            this.$store.dispatch('removeAllMusic');
        },
        // 设置当前播放的音乐
        setMusic(id){
            this.$store.dispatch('setMusics',id);
            var timerr;
            var lastId = this.musicNow.id;
            if(timerr) clearInterval(timerr);
            timerr = setInterval(() => {
                if(lastId != this.musicNow.id){
                    setTimeout(()=>{
                        this.play();
                    },400);    
                    clearInterval(timerr);
                }
            }, 100);      
        },
        // 开启歌词定时器
        setLyricTimer(){
            clearInterval(this.lyricTimer);
            this.lyricTimer = setInterval(() => {
                for(let i = 0;i < this.currentLyric.lines.length;i++){
                    if(this.currentLyric.lines[i].time > this.audio.currentTime*1000){
                        this.lyricIndex = i-1;
                        break;
                    }
                }
            }, 200);
        },
        min(song){
            if(parseInt(song/60000) < 10)
                return '0'+parseInt(song/60000);
            else return parseInt(song/60000)
        },
        sec(song){
            let x = parseInt(song/60000);
            let y = parseInt(song/1000-x*60);
            if(y < 10) return '0'+y;
            else return y;
        },

    },
    watch:{
        musicNow(){
            this.getMusic();
            this.getMusicDetail();
            this.getMusicLyric();
            setTimeout(() => {
                for(let i = 0;i < this.musiclist.length;i++){
                    if(this.musiclist[i].id == this.musicNow.id){
                        this.musicIndex = i;
                        break;
                    }
                }    
            }, 200);
            
        },
        lyricIndex(){
             this.$refs.lyric.scrollTop = (this.lyricIndex-3)*32;
        },
        musiclist(val,newval){
            if(val.length > newval.length){
                this.$refs.addsuccess.style.display = "block";
                setTimeout(() => {
                    this.$refs.addsuccess.style.opacity = '1'; 
                    setTimeout(()=>{
                       this.$refs.addsuccess.style.opacity = '0'; 
                    },2000,()=>{
                        this.$refs.addsuccess.style.display = "none";
                    }); 
                }, 10);
                
            }
            setTimeout(() => {
                for(let i = 0;i < this.musiclist.length;i++){
                    if(this.musiclist[i].id == this.musicNow.id){
                        this.musicIndex = i;
                        break;
                    }
                }    
            }, 100);
        }
    },
    computed:{
        musiclist(){
            return this.$store.state.music.musicList;
        },
        musicNow(){
            return this.$store.state.music.music;
        }
    },
    mounted(){
        this.WatchMusic();
        this.$store.dispatch('getMusicLists');
        this.$store.dispatch('getMusics');
        this.$bus.$on('play',()=>{
            this.play();
        });
    }
}
</script>

<style lang="less" scoped>
    .music{
        width: 100%;
        height: 53px;
        position: fixed;
        bottom: 0px;
        z-index: 999;
        transition: 0.5s all;
        // background-color: red;
        background: url('../images/playbar.png');
        background-position: 0 0;
        background-repeat: repeat-x;
        // overflow: hidden;
        .player-wrapper{
            width: 980px;
            height: 53px;
            margin: 5px auto;
            .btns{
                float: left;
                width: 137px;
                padding: 6px 0 0 0;
                a{
                    display: block;
                    float: left;
                    width: 28px;
                    height: 28px;
                    margin-right: 8px;
                    margin-top: 5px;
                    text-indent: -9999px;
                    background: url('../images/playbar.png') no-repeat;
                }
                .pre{
                    background-position: 0 -130px;
                    &:hover{
                        background-position: -30px -130px;
                        cursor: pointer;
                    }
                }
                .pause,.stop{
                    width: 36px;
                    height: 36px;
                    margin-top: 0;
                }
                .pause{
                    background-position: 0 -165px;
                    display: none;
                    &:hover{
                        background-position: -40px -165px;
                        cursor: pointer;
                    }
                }
                .stop{
                    display: block;
                    background-position: 0px -204px;
                    &:hover{
                        background-position: -40px -204px;
                        cursor: pointer;
                    }
                }
                .nex{
                    background-position: -80px -130px;
                    &:hover{
                        background-position: -110px -130px;
                        cursor: pointer;
                    }
                }
            }
            .head{
                margin: 7px 15px 0 0;
                float: left;
                width: 34px;
                height: 34px;
                position: relative;
                img{
                    width: 34px;
                    height: 34px;
                }
                .msk{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    display: block;
                    width: 34px;
                    height: 35px;
                    background: url('../images/playbar.png') no-repeat;
                    background-position: 0 -80px;
                    cursor: pointer;
                }
            }
            .play{
                width: 581px;
                height: 47px;
                position: relative;
                float: left;
                .words{
                    width: 581px;
                    height: 28px;
                    overflow: hidden;
                    color: #e8e8e8;
                    text-shadow: 0 1px 0 #171717;
                    line-height: 28px;
                    .name{
                        float: left;
                        color: #fff;
                        margin-right: 15px;
                    }
                    .art{
                        float: left;
                        color: #989898;
                    }
                    .src{
                        float: left;
                        width: 14px;
                        height: 15px;
                        margin: 7px 0 0 13px;
                        background: url('../images/playbar.png') no-repeat;
                        background-position: -110px -103px;
                        cursor: pointer;
                    }
                }
                .bar{
                    width: 581px;
                    height: 9px;
                    position: relative;
                    .barbg{
                        width: 466px;
                        height: 9px;
                        float: left;
                        background: url('../images/statbar.png') no-repeat 0 0px;
                        position: relative;
                        .rdy{
                            width: 466px;
                            height: 9px;
                            position: absolute;
                            background: url('../images/statbar.png') no-repeat right -30px;
                        }
                        .cur{
                            height: 9px;
                            position: absolute;
                            background: url('../images/statbar.png') no-repeat 0 -66px;
                            .btn{
                                position: absolute;
                                top: -4px;
                                right: -8px;
                                width: 16px;
                                height: 16px;
                                background-color: #f00;
                                border-radius: 50%;
                                box-shadow: 1px 0 0 rgba(0,0,0,.1);
                                border: 4.5px solid #fff;
                                &:active{
                                    cursor: pointer;
                                }
                                &:hover{
                                    cursor: pointer;
                                    box-shadow: 0px 0px 15px rgba(0,0,0,.8);
                                }
                            }
                        }
                    }
                    .time{ 
                        position: absolute;
                        color: #797979;
                        font-size: 12px;
                        right: 0;
                        top:-6px;
                    }
                }
            }
            .ctrl{
                margin-left: 15px;
                position: relative;
                z-index: 10;
                width: 126px;
                padding-left: 13px;
                height: 36px;
                background-position: -147px -238px;
                float: left;
                >a{
                    width: 25px;
                    height: 25px;
                    margin: 13px 2px 0 0;
                    display: block;
                    position: relative;
                    float: left;
                    background: url('../images/playbar.png') no-repeat;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .volumeBox{
                    position: absolute;
                    top: -113px;
                    left: 9px;
                    clear: both;
                    width: 32px;
                    height: 113px;
                    .barbg{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 32px;
                        height: 113px;
                        background: url('../images/playbar.png') no-repeat;
                        background-position: 0 -503px;
                    }
                    .vbg{
                        padding: 4px 0;
                        top: 7px;
                        position: absolute;
                        left: 14px;
                        width: 4px;
                        height: 101px;
                        
                        .cur{
                            position: absolute;
                            width: 4px;
                            top: auto;
                            bottom: 4px;
                            left: 0;
                            background: url('../images/playbar.png') no-repeat;
                            background-position: -40px bottom;
                            overflow: hidden;
                        }
                        .jt{
                            position: absolute;
                            top: auto;
                            left: -7px;
                            display: block;
                            width: 18px;
                            height: 20px;
                            background: url('../images/iconall.png') no-repeat;
                            background-position: -40px -250px;
                            cursor: pointer;
                            &:hover{
                                background-position: -40px -280px;
                            }
                        }
                    }
                }
                .volume{
                    background-position: -2px -248px;
                    &:hover{
                        background-position: -31px -248px;
                        cursor: pointer;
                    }
                }
                .loop1{
                    background-position: -3px -344px;
                    &:hover{
                        background-position: -33px -344px;
                    }
                }
                .loop2{
                    background-position: -66px -248px;
                    &:hover{
                        background-position: -93px -248px;
                    }
                }
                .loop3{
                    background-position: -66px -344px;
                    &:hover{
                        background-position: -93px -344px;  
                    }
                }
                .f-pr{
                    float: left;
                    width: 59px;
                    height: 36px;
                    .list{
                        display: block;
                        height: 25px;
                        margin: 11px 2px 0 0;
                        float: none;
                        padding-left: 21px;
                        background: url('../images/playbar.png') no-repeat;
                        background-position: -42px -68px;
                        line-height: 27px;
                        text-align: center;
                        color: #666;
                        text-shadow: 0 1px 0 #080707;
                        text-indent: 0;
                        text-decoration: none;
                        &:hover{
                            background-position: -42px -98px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .ffl{
                position: absolute;
                top: -14px;
                right: 15px;
                width: 52px;
                height: 67px;
                background: url('../images/playbar.png') no-repeat;
                background-position: 0 -380px;
                .unlocked,.locked{
                    display: block;
                    width: 18px;
                    height: 18px;
                    margin: 6px 0 0 17px;
                    background: url('../images/playbar.png') no-repeat -80px -380px;
                    &:hover{
                        background-position: -80px -400px;
                        cursor: pointer;
                    }
                }
                .locked{
                    background-position: -100px -380px;
                    &:hover{
                        background-position: -100px -400px;
                    }
                }
            }
            .ffr{
                position: absolute;
                top: -1px;
                right: 0;
                width: 15px;
                height: 54px;
                background-position: -52px -393px;
                pointer-events: none;
            }
            .addsuccess{
                width: 200px;
                height: 50px;
                position: absolute;
                text-align: center;
                line-height: 50px;
                // background-color: red;
                top:-48px;
                right: 280px;
                background: #232526;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                color: #fff;    
                border-radius: 8px;
                box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
                opacity: 0;
                transition: 0.5s all;
                display: none;
            }
        }
        .playlist{
            width: 986px;
            position: absolute;
            // left: 50%;
            height: 301px;
            bottom: 47px;
            margin-left: 266px;
            overflow: hidden;
            display: none;
            .list{
                transition: .4s all;
                width: 100%;
                height: 100%;
                // background-color: red;  
                position: absolute;  
                .listhd{
                    position: relative;
                    height: 41px;
                    padding: 0 5px;
                    // background: url('../images/playlist_bg.png') repeat-x 0 0;
                    width: 982px;
                    background: #080707;
                    margin-left: 2px;
                    box-shadow: 0 0 4px 0px rgba(0,0,0,.8);
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    .listhdc{
                        position: relative;
                        height: 40px;
                        h4{
                            position: absolute;
                            left: 25px;
                            top: 0;
                            height: 39px;
                            line-height: 39px;
                            font-size: 14px;
                            color: #e2e2e2;
                        }
                        .clear{
                            position: absolute;
                            left: 490px;
                            top: 12px;
                            height: 15px;
                            line-height: 15px;
                            cursor: pointer;
                            color: #ccc;
                            display: block;                            
                            .icon{
                                width: 13px;
                                height: 16px;
                                display: block;
                                margin: 1px 6px 0 0;
                                float: left;
                                background: url('../images/playlist.png') no-repeat;
                                background-position: -51px 0;
                                
                            }
                            &:hover .icon{
                                background-position: -51px -20px;
                            }

                        }
                        .tit{
                            position: absolute;
                            left: 595px;
                            top: 0;
                            width: 346px;
                            text-align: center;
                            height: 39px;
                            line-height: 39px;
                            color: #fff;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-wrap: normal;
                            font-family: Arial, Helvetica, sans-serif;

                        }
                        .close{
                            position: absolute;
                            top: 6px;
                            right: 8px;
                            width: 30px;
                            height: 30px;
                            overflow: hidden;
                            text-indent: -999px;
                            cursor: pointer;
                            background: url('../images/playlist.png') no-repeat;
                            background-position: -195px 9px;
                            &:hover{
                                background-position: -195px -21px;
                            }
                        }
                    }
                }
                .listbd{
                    position: absolute;
                    left: 0;
                    top: 41px;
                    width: 986px;
                    height: 260px;
                    padding: 0 5px;
                    overflow: hidden;
                    background: url('../images/playlist_bg.png') repeat-y -1014px 0;
                    // background-position: -1014px 0;
                    // background-repeat: repeat-y;
                    .cvr{
                        position: absolute;
                        left: 2px;
                        z-index: 1;
                        width: 980px;
                        height: 100%;
                        opacity: .2;
                        background: #C04848;  /* fallback for old browsers */
                        background: -webkit-linear-gradient(to left, #480048, #C04848);  /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to left, #480048, #C04848); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                    }
                    .listbdc{
                        position: absolute;
                        left: 2px;
                        top: 0;
                        z-index: 4;
                        height: 260px;
                        width: 553px;
                        overflow-y:auto;
                        overflow-x:hidden ;
                        &::-webkit-scrollbar{
                            width: 6px;
                            height: 8px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: #868686;
                            border-radius: 15px;
                        }
                        ul{
                            width: 535px;
                            li{
                                float: left;
                                width: 100%;
                                color: #ccc;
                                .col {
                                    float: left;
                                    padding-left: 10px;
                                    height: 28px;
                                    line-height: 28px;
                                    overflow: hidden;
                                    cursor: pointer;
                                }
                                .col1{
                                    width: 20px;
                                }
                                .col2{
                                    width: 266px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                                .col3{
                                    width: 88px;
                                    position: relative;
                                    .icns{
                                        display: none;
                                        position: absolute;
                                        right: 0;
                                        top: 0;
                                        width: 100px;
                                        height: 23px;
                                        i{
                                            display: block;
                                            height: 16px;
                                            float: right;
                                            overflow: hidden;
                                            margin: 7px 0 0 10px;
                                            text-indent: -9999px;
                                            background: url('../images/playlist.png') no-repeat;
                                            width: 14px;
                                        }
                                        .del{
                                            width: 13px;
                                            background-position: -51px 0;
                                            &:hover{
                                                background-position: -51px -20px;
                                            }
                                        }
                                        .download{
                                            background-position: -57px -50px;
                                            &:hover{
                                                background-position: -80px -50px
                                            }
                                        }
                                        .share{
                                            background-position: 0 0;
                                            &:hover{
                                                background-position: 0 -20px;
                                            }
                                        }
                                        .add{
                                            width: 16px;
                                            background-position: -24px 0;
                                            &:hover{
                                               background-position: -24px -20px;     
                                            }
                                        }
                                    }
                                }
                                .col4{
                                    width: 80px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    .art{
                                        color: #ccc;
                                        &:hover{
                                            color: #fff;
                                        }
                                    }
                                }
                                .col5{
                                    width: 45px;
                                }
                                .col6{
                                    width: 35px;
                                    padding-left: 6px;
                                    a{
                                        width: 14px;
                                        height: 16px;
                                        display: block;
                                        margin: 7px 0 0 10px;
                                        background: url('../images/playlist.png') no-repeat;
                                        background-position: -80px 0px;
                                        &:hover{
                                            background-position: -80px -20px;
                                        }
                                    }
                                }
                                &:hover{
                                    background-color: rgba(0,0,0,0.4);
                                    .col,.art{
                                        color: #fff;
                                    }
                                    .col3 .icns{
                                        display: block;
                                    }
                                }
                            }
                            .musicActive{
                                background-color: rgba(0,0,0,0.4);
                                .col,.art{
                                    color: #fff;
                                }
                                .playicn{
                                    margin-top: 8px;
                                    width: 10px;
                                    height: 13px;
                                    background: url('../images/playlist.png') no-repeat;
                                    background-position: -182px 0;
                                }
                            }
                        }
                    }
                    .nocnt{
                        width: 553px;
                        position: relative;
                        z-index: 2;
                        padding-top: 85px;
                        text-align: center;
                        line-height: 43px;
                        a{
                            color: #aaa;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                        .ico{
                            float: none;
                            display: inline-block;
                            position: relative;
                            top: -4px;
                            width: 36px;
                            height: 29px;
                            margin-right: 4px;
                            background: url('../images/playlist.png') no-repeat;
                            background-position: -138px 0;
                            vertical-align: middle;
                        }
                    }
                    .bline{
                        position: absolute;
                        left: 549px;
                        top: -1px;
                        z-index: 2;
                        width: 6px;
                        height: 260px;
                        background: #000;
                        opacity: .5;
                    }
                    .lyric-wrapper{
                        position: absolute;
                        right: 0px;
                        top: 0;
                        z-index: 4;
                        padding: 20px 0 20px 0;
                        margin-bottom: 21px;
                        height: 260px;
                        width: 420px;
                        overflow-y:auto;
                        overflow-x:hidden ;
                        &::-webkit-scrollbar{
                            width: 8px;
                            height: 8px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: #868686;
                            border-radius: 15px;
                        }
                        .lyric{
                            position: absolute;                         
                            right: 40px;
                            width: 354px;
                            // overflow: hidden;
                            p{
                                color: #989898;
                                word-wrap: break-word;
                                text-align: center;
                                line-height: 32px;
                                height: auto !important;
                                transition: color 0.7s linear;
                            }
                            .active{
                                color: #fff;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
            
        }
    }
</style>