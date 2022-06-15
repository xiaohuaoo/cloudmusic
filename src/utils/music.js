export const setMusic = (MUSIC) => {
  localStorage.setItem('MUSIC', MUSIC)
}

export const getMusic = () => {
  return localStorage.getItem('MUSIC')
}

export const removeMusic = () => {
  localStorage.removeItem('MUSIC')
}

export const setPreMusic = (PREMUSIC) => {
  localStorage.setItem('PREMUSIC', PREMUSIC)
}

export const getPreMusic = () => {
  return localStorage.getItem('PREMUSIC')
}

export const removePreMusic = () => {
  localStorage.removeItem('PREMUSIC')
}
