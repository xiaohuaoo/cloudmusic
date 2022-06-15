<template>
  <div class="home-header">
    <div class="wrapper">
      <ul>
        <li>
            <router-link @click.native="active=1" to="/home/discover"><em :class="{active:active==1}">推荐</em></router-link>
        </li>
        <li>
            <router-link @click.native="active=2" to="/home/toplist"><em :class="{active:active==1}">排行榜</em></router-link>
        </li>
        <li>
            <router-link @click.native="active=3" to="/home/playlist"><em :class="{active:active==1}">歌单</em></router-link>
        </li>
        <li>
            <router-link @click.native="active=4" to="/home/djradio"><em :class="{active:active==1}">主播电台</em></router-link>
        </li>
        <li>
            <router-link @click.native="active=5" to="/home/artist"><em :class="{active:active==1}">歌手</em></router-link>
        </li>
        <li>
            <router-link @click.native="active=6" to="/home/album"><em :class="{active:active==1}">新碟上架</em></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  components: {},
  props: {},
  data () {
    return {
      active: -1
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  watch: {
    path () {
      if (this.path.indexOf('/home/discover') !== -1) this.active = 1
      else if (this.path.indexOf('/home/toplist') !== -1) this.active = 2
      else if (this.path.indexOf('/home/playlist') !== -1) this.active = 3
      else if (this.path.indexOf('/home/djradio') !== -1) this.active = 4
      else if (this.path.indexOf('/home/artist') !== -1) this.active = 5
      else if (this.path.indexOf('/home/album') !== -1) this.active = 6
    }
  },
  created () {},
  mounted () {
    const path = this.$route.path
    if (path.indexOf('/home/discover') !== -1) this.active = 1
    else if (this.path.indexOf('/home/toplist') !== -1) this.active = 2
    else if (this.path.indexOf('/home/playlist') !== -1) this.active = 3
    else if (this.path.indexOf('/home/djradio') !== -1) this.active = 4
    else if (this.path.indexOf('/home/artist') !== -1) this.active = 5
    else if (this.path.indexOf('/home/album') !== -1) this.active = 6
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home-header{
    height: 35px;
    background-color: #C20C0C;
    border-bottom: 1px solid #a40011;

    .wrapper {
        height: 100%;
        width: 1100px;
        margin: 0 auto;

        ul {
            width: 744px;
            height: 100%;
            padding-left: 180px;
            display: flex;

            li {
                height: 100%;
                display: block;

                em {
                    height: auto;
                    display: block;
                    float: left;
                    padding: 0 13px 0 13px;
                    margin: 7px 17px 0 17px;
                    line-height: 21px;
                    color: #fff;
                    border-radius: 20px;
                }

                &:hover em {
                    background: #9B0909;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
.active{
    background: #9B0909;
}
</style>
