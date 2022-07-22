export default [
  {
    name: 'download',
    path: '/download',
    component: () => import('@/views/Download')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'discover',
        component: () => import('@/views/Home/Discover')
      },
      {
        path: 'toplist/:id?',
        component: () => import('@/views/Home/TopList')
      },
      {
        path: 'playlist',
        component: () => import('@/views/Home/PlayList')
      },
      {
        path: 'djradio',
        component: () => import('@/views/Home/DjRadio')
      },
      {
        path: 'artist',
        component: () => import('@/views/Home/Artist')
      },
      {
        path: 'album',
        component: () => import('@/views/Home/Album')
      }
    ]
  },
  {
    name: 'mymusic',
    path: '/mymusic',
    component: () => import('@/views/MyMusic'),
    children: [
      {
        path: 'playlist',
        component: () => import('@/views/MyMusic/Logged/Playlist')
      }
    ]
  },
  {
    name: 'friend',
    path: '/friend',
    component: () => import('@/views/Friend')
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/User'),
    children: [
      {
        path:' home',
        component: () => import('@/views/User/Home')
      },
      {
        path: 'level',
        component: () => import('@/views/User/Level')
      }
    ]
  },
  {
    name: 'playlist',
    path: '/playlist/:key?',
    component: () => import('@/views/PlayList')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    name: 'song',
    path: '/song',
    component: () => import("@/views/Song")
  },
  {
    name: 'artist',
    path: '/artist',
    component: () => import('@/views/Artist'),
    children: [
      {
        path: 'song',
        component: () => import('@/views/Artist/MainerLeft/Song')
      },
      {
        path: 'album',
        component: () => import('@/views/Artist/MainerLeft/Album')
      },
      {
        path: 'mv',
        component: () => import('@/views/Artist/MainerLeft/Mv')
      },
      {
        path:' desc',
        component: () => import('@/views/Artist/MainerLeft/Desc')
      }
    ]
  },
  {
    name: 'album',
    path: '/album',
    component: () => import('@/views/Album')
  },
  // 重定向
  {
    path: '*',
    redirect: '/home/discover'
  }
]
