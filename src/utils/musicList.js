// 对外暴露一个函数
export const setMusicList = (MUSICLIST) => {
  localStorage.setItem('MUSICLIST', MUSICLIST)
}

export const getMusicList = () => {
  return localStorage.getItem('MUSICLIST')
}

export const removeMusicList = () => {
  localStorage.removeItem('MUSICLIST')
}
