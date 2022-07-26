import {getMusicList,setMusicList,removeMusicList} from '@/utils/musicList'
import { getMusic,setMusic,removeMusic } from '@/utils/music'
import {reqSong} from '@/api'
const state = {
  // 播放列表
  musicList: [],
  // 当前播放的音乐
  music: {},
}
const mutations={
  // 设置播放列表
  SETMUSICLIST(state, list){
    state.musicList = list || []
  },
  // 设置当前播放的音乐
  SETMUSIC(state, music){
    state.music = music || {}
  }
}
const actions={
  // 获取音乐播放列表
  async getMusicLists({commit}){
    let list = getMusicList();
    if(list != null)
        list = list.replace(',,',',');
    if(list != null && list.length != 0 && list[list.length-1] == ',') 
        list = list.substring(0,list.length-1);
    let result = await reqSong(list);
    commit('SETMUSICLIST',result.songs);
  },
  // 添加音乐至播放列表
  async addMusicList({commit},ids){
    let list = getMusicList();
    if(list == null || list.length == 0){
        setMusicList(ids);
        list = ids;
        let result = await reqSong(list);
        commit('SETMUSICLIST',result.songs);
    }
    else{
        if(list.indexOf(ids) == -1){
            list+=','+ids;
            list = list.replace(',,',',');
            setMusicList(list);
            let result = await reqSong(list);
            commit('SETMUSICLIST',result.songs);
        }      
    }
  },
  // 删除指定的音乐
  async removeMusic({commit},id){
    let list = getMusicList();
    console.log(id);
    list = list.replace(id+',',"");
    list =  list.replace(id,"");
    setMusicList(list);
    if(list[list.length-1] == ',') 
      list = list.substring(0,list.length-1);
    let result = await reqSong(list);
    commit('SETMUSICLIST',result.songs);
    // console.log(list);
  },
  // 清空播放列表
  removeAllMusic({commit}){
    removeMusicList();
    commit('SETMUSICLIST',[]);
  },
  // 设置当前播放的音乐
  async setMusics({commit},id){
    setMusic(id);
    let result = await reqSong(id);
    commit('SETMUSIC',result.songs[0]);
  },
  // 获取当前播放的音乐
  async getMusics({commit}){
    let result = await reqSong(getMusic());
    commit('SETMUSIC',result.songs[0]);
  }
}
const getters={

}

export default{
    state,
    mutations,
    actions,
    getters,
}