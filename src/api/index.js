// API统一处理
import request from '@/api/request'

// 获取封面banner资源 /banner?type=0
export const reqBanner = () => request({
  method: 'GET',
  url: '/banner?type=0'
})

// 登陆部分
//手机登录（验证码）/login/cellphone?phone=&captcha=
export const reqCellPhoneByCode = (phone, num) => request({
  url: `/login/cellphone?phone=${phone}&captcha=${num}`,
  method: 'POST'
})

//手机登录（密码） /login/cellphone?phone=&password=
export const reqCellPhoneByPassword = (phone, num) => request({
  url: `/login/cellphone?phone=${phone}&password=${num}`,
  method: 'POST'
})

// 刷新登录状态 /login/refresh?
export const reqRefresh = (cookie) => request({
  url: `/login/refresh?cookie=${cookie}`,
  method: 'GET'
})

// 获取账号信息 /user/account
export const reqAccount = (cookie) => request({
  url: `/user/account?cookie=${cookie}`,
  method: 'GET'
})

// 退出登录 /logout
export const reqLogout = () => request({
  url: '/logout',
  method: 'GET'
})

// 获取热门推荐 /personalized?limit=8
export const reqPersonalized = (limit) => request({
  url: `/personalized?limit=${limit}`,
  method: 'GET'
})

// 获取所有榜单 /toplist
export const reqTopList = () => request({
  url: '/toplist',
  method: 'GET'
})

// 通知-私信 /msg/private?limit=3
export const reqPrivateMsg = (cookie, limit = 30, offset = 0) => request({
  url: `/msg/private?limit=${limit}&offset=${offset}&cookie=${cookie}`,
  method: 'GET'
})

// 获取歌单评论 /comment/playlist?id=705123491
export const reqCommentPlayList = (id, limit = 20, offset = 0) => request({
  url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 获取歌单(网友精选碟) /top/playlist?limit=10&order=new&cat=全部
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export const reqplayListCat = (limit = 50, order = 'new', cat = '全部', offset = 0) => request({
  url: `/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`,
  method: 'GET'
})

// 获取歌单分类 /playlist/catlist
export const reqCatList = () => request({
  url: '/playlist/catlist',
  methods: 'GET'
})

// 获取用户详情 /user/detail
export const reqDetail = (id, cookie) => request({
  url: `/user/detail?uid=${id}&cookie=${cookie}`,
  method: 'POST'
})

// 最热主播榜 /dj/toplist/popular?limit=30
export const reqDjTopList = (limit = 30) => request({
  url: `/dj/toplist/popular?limit=${limit}`,
  method: 'GET'
})

// 获取歌单详情 /playlist/detail?id=
export const reqPlayList = (id) => request({
  url: `/playlist/detail?id=${id}`,
  method: 'GET'
})

// 获取歌曲详情 /song/detail?ids=
export const reqSong = (ids) => request({
  url: `/song/detail?ids=${ids}`,
  method: 'GET'
})

// 获取电台分类 /dj/catelist
export const reqCateList = () => request({
  url: '/dj/catelist',
  method: 'GET'
})

// 获取推荐电台节目 /program/recommend
export const reqPorgramRecommend = () => request({
  url: '/program/recommend',
  methods: 'GET'
})

// 获取电台 - 类别热门电台 /dj/radio/hot?cateId=2001
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// cateId: 类别 id,可通过 /dj/category/recommend 接口获取
export const reqDjRadioHot = (cateId, limit = 30, offset = 0) => request({
  url: `/dj/radio/hot?cateId=${cateId}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 热门歌手 /top/artists?offset=0&limit=30
export const reqArtists = (limit = 50, offset = 0) => request({
  url: `/top/artists?offset=${offset}&limit=${limit}`,
  method: 'GET'
})

// 歌手分类列表 artist/list
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// type 取值:
export const reqArtistsList = (type = -1, area = -1, initial = -1, limit = 30, offset = 0) => request({
  url: `artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 最新专辑 /album/newest
export const reqAlbumNewset = () => request({
  url: '/album/newest',
  method: 'GET'
})

// 获取专辑内容 /album
export const reqAlbums = (id) => request({
  url: `/album?id=${id}`,
  method: 'GET'
})

// 获取用户详情 /user/detail
export const reqUserDetail = (uid, cookie) => request({
  url: `/user/detail?uid=${uid}&cookie=${cookie}`,
  method: 'GET'
})

// 获取用户播放记录 /user/record
export const reqUserRecord = (uid, cookie, type) => request({
  url: `/user/record?uid=${uid}&cookie=${cookie}&type=${type}`,
  method: 'GET'
})

// 获取用户歌单 /user/playlist?uid=
export const reqUserPlayList = (uid, cookie) => request({
  url: `/user/playlist?uid=${uid}&cookie=${cookie}`
})

// 获取用户等级 /user/level
export const reqLevel = (cookie) => request({
  url: `/user/level?cookie=${cookie}`,
  method: 'GET'
})

// 获取登录后用户歌单详情 /playlist/detail
export const reqPlayListDetail = (id, cookie) => request({
  url: `/playlist/detail?id=${id}&cookie=${cookie}`,
  method: 'GET'
})
// 搜索 /cloudsearch
export const reqCloudSearch = (keywords, type, limit = 30, offset = 0) => request({
  url: `/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 搜索建议 /search/suggest?keywords=海阔天空
export const reqSerachSuggest = (keywords) => request({
  url: `/search/suggest?keywords=${keywords}`,
  method: 'GET'
})

// 获取歌词 /lyric?id=33894312
export const reqlyric = (id) => request({
  url: `/lyric?id=${id}`,
  method: 'GET'
})

// 获取歌曲评论 /comment/music?id=186016&limit=1
export const reqCommentMusic = (id, limit = 20, offset = 0) => request({
  url: `/comment/music?id=${id}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 获取相似歌曲 /simi/song
export const reqSimiSong = (id) => request({
  url: `/simi/song?id=${id}`,
  method: 'GET'
})

// 获取登录后用户的好友动态 /event?pagesize=30
export const reqEvent = (pagesize, cookie, lasttime = -1) => request({
  url: `/event?pagesize=${pagesize}&cookie=${cookie}&lasttime=${lasttime}`,
  method: 'GET'
})

// 获取专辑评论 /comment/album
export const reqCommentAlbum = (id, limit = 20, offset = 0) => request({
  url: `/comment/album?id=${id}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 获取歌手专辑 /artist/album
export const reqArtistAlbum = (id, limit = 12, offset = 0) => request({
  url: `/artist/album?id=${id}&limit=${limit}&offset=${offset}`,
  method: 'GET'
})

// 获取歌手详情 /artist/detail
export const reqArtistDetail = (id) => request({
  url: `/artist/detail?id=${id}`,
  method: 'GET'
})

// 获取歌手单曲 /artists
export const reqArtist = (id) => request({
  url: `/artists?id=${id}`,
  method: 'GET'
})

// 获取歌手mv /artist/mv
export const reqArtistMv = (id) => request({
  url: `/artist/mv?id=${id}`,
  method: 'GET'
})

// 获取歌手描述 /artist/desc
export const reqArtistDesc = (id) => request({
  url: `/artist/desc?id=${id}`,
  method: 'GET'
})

// 获取相似歌手 /simi/artist
export const reqArtistSimi = (id) => request({
  url: `/simi/artist?id=${id}`,
  method: 'GET'
})
