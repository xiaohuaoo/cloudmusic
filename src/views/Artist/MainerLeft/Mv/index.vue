<template>
  <div class="mv">
    <ul class="mvlist clearfix">
      <li v-for="mv,index in mvlist" :key="index">
        <div class="cover">
          <img v-lazy="mv.imgurl">
          <a class="msk"></a>
          <a class="play"></a>
        </div>
        <a class="des cover underline" :title="mv.name">{{mv.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mv',
  data () {
    return {
      mvlist: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    // 获取歌曲相关mv
    async getMv () {
      let result = await this.$API.reqArtistMv(this.id)
      // console.log(result);
      this.mvlist = result.mvs
    }
  },
  mounted () {
    this.getMv()
  }
}
</script>

<style lang="less" scoped>
.mv {
    width: 100%;    
    .mvlist{
        width: 669px;
        margin-left: -29px;
        margin-top: 20px;
        li{
            width: 166px;
            height: 170px;
            padding: 0 0 30px 29px;
            float: left;
            .cover{
                width: 137px;
                height: 103px;
                position: relative;
                overflow: hidden;
                img{
                    height:100%;
                }
                .msk{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url('../../images/coverall.png') no-repeat 0 -1170px;;
                    cursor: pointer;
                }
                .play{
                    display: block;
                    width: 44px;
                    height: 44px;
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    top: 50%;
                    left: 50%;
                    margin: -22px 0 0 -22px;
                    background: url('../../images/iconall.png') no-repeat;
                    background-position: -30px -135px;
                    &:hover{
                        cursor: pointer;
                        background-position: -30px -85px;
                    }
                }
            }
            .des{
                width: 100%;
                display: block;
                margin: 8px 0 3px;;
                font-size: 14px;
                color: #000;
            }
        }
    }
}
</style>
