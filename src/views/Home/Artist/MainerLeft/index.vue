<template>
  <div class="mainerLeft">
    <div class="wrapper">
      <ul class="nav">
        <div class="tit">推荐</div>
        <li v-for="item, index in recommendList" :key="index">
          <a class="cat" @click="chooseArtist(item.area, item.type)" :class="{active:item.type == type && item.area == area}">{{item.name}}</a>
        </li>
      </ul>
      <div class="nav blk" v-for="artist in artList" :key="artist.area">
        <div class="tit">{{artist.name}}</div>
        <li v-for="item,index in artist.typeName" :key="index">
          <a class="cat" @click="chooseArtist(artist.area, index + 1)" :class="{active:index + 1 == type && artist.area == area}">{{artist.name}}{{item}}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      // 推荐歌手分类
      recommendList: [
        {
          name: '推荐歌手',
          area: undefined,
          type: undefined
        },
        {
          name: '入驻歌手',
          area: -1,
          type: -1
        }
      ],
      // 歌手分类
      artList: [
        {
          name: '华语',
          area: 7,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '欧美',
          area: 96,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '日本',
          area: 8,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '韩国',
          area: 16,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        },
        {
          name: '其他',
          area: 0,
          type: [1, 2, 3],
          typeName: ['男歌手', '女歌手', '组合/乐队']
        }
      ]
    }
  },
  computed: {
    area () {
      return this.$route.query.area
    },
    type () {
      return this.$route.query.type
    }
  },
  methods: {
    chooseArtist (area, type) {
      this.$router.push({
        path: '/home/artist',
        query: {
          area,
          type
        }
      })
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.mainerLeft {
    width: 180px;
    height: 100%;
    float: left;
    .wrapper {
        margin-top: 51px;
        width: 100%;
        padding: 0 10px;
        padding-bottom: 40px;
        .nav {
            width: 100%;
            .tit {
                padding-left: 14px;
                width: 160px;
                height: 25px;
                font-size: 16px;
                font-family: "Microsoft Yahei";
                font-weight: bolder;
                color: #333;
            }
            li {
                width: 160px;
                height: 29px;
                line-height: 29px;
                font-size: 12px;
                color: #333;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
                margin-bottom: 2px;

                .cat {
                    width: 133px;
                    padding-left: 27px;
                    color: #333;
                    float: left;
                    width: 160px;
                    height: 29px;
                    line-height: 29px;
                    background: url('../images/singer.png') no-repeat;
                    background-position: 0 -30px;

                    &:hover{
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }

                .active {
                    background: url('../images/singer.png') no-repeat;
                    background-position: 0 0;
                    color: #c20c0c;
                    &:hover{
                        text-decoration: none;
                    }
                }
            }
        }
        .blk {
            margin-top: 5px;
            padding-top: 16px;
            border-top: 1px solid #d3d3d3;
        }
    }
}
</style>
