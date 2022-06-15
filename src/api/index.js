// API统一处理
import request from '@/api/request'

// 获取封面banner资源 /banner?type=0
export const reqBanner = () => request({
  method: 'GET',
  url: '/banner?type=0'
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

// 获取用户等级 /user/level
export const reqLevel = (cookie) => request({
  url: `/user/level?cookie=${cookie}`,
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
