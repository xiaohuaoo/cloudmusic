<template>
  <div class="recommendWrapper">
      <div class="header">
          <a>热门推荐</a>
          <div class="tab">
              <a>华语</a><span class="line">|</span>
              <a>流行</a><span class="line">|</span>
              <a>摇滚</a><span class="line">|</span>
              <a>民谣</a><span class="line">|</span>
              <a>电子</a>
          </div>
          <span class="more">
              <router-link to="/home/playlist">更多</router-link>
              <i>&nbsp;</i>
          </span>
      </div>
      <div class="body">
          <li v-for="(attr, index) in PersonalizedList" :key="index">
              <img v-lazy="attr.picUrl">
              <router-link class="underline shadow" :to="{path: '/playlist', query: {id: `${attr.id}`}}"></router-link>
              <div class="bottom">
                  <span class="icon-headset"></span>
                  <span class="nb">{{}}</span>
                  <span class="icon-play"></span>
              </div>
              <router-link class="text" :title='attr.name' :to="{path:'/playlist',query:{id:`${attr.id}`}}">{{attr.name}}</router-link>
          </li>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'recommendation',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
        PersonalizedList: state => state.home.PersonalizedList
    }),
    playCount () {
        let result = []
        this.PersonalizedList.forEach(item => {
            if (item.playCount >= 10000) {
                result.push(parseInt(item.playCount/10000)+'万')
            } else {
                result.push(item.playCount + '')
            }
        })
        return result
    }
  },
  mounted () {
    this.$store.dispatch('getPersonalized', 8)
  },
}
</script>

<style lang="less" scoped>
.recommendWrapper {
    width: 689px;
    height: 523px;

    .header {
        width: 100%;
        height: 35px;
        padding: 0 10px 0 34px;
        background: url('./images/index.png') no-repeat -225px -156px;
        border-bottom: 2px solid #C10D0C;
        a {
            float: left;
            font-size: 20px;
            font-weight: normal;
            line-height: 28px;
            color: #333;

            &:hover {
                color: #333;
                cursor: pointer;
            }
        }
        .tab {
            height: 16px;
            margin:7px 0 0 20px;
            float: left;
            a {
                font-size: 12px;
                line-height: 20px;

                &:hover {
                    text-decoration: underline;
                }
            }
            line {
                float: left;
                margin: -1px 10px;
                margin-bottom: 0px;
                line-height: 18px;
                color: #ccc;
                font-size: 12px;
            }
        }
        .more {
            width: 40px;
            height: 16px;
            margin: 9px;
            float: right;

            a {
                font-size: 12px;
                color: #666;  
                line-height: 15px;

                &:hover{
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
            
            i {
                float: right;
                display: block;
                background: url('./images/index.png') no-repeat 0 -240px;
                font-style: normal;
                text-align: left;
                font-size: inherit;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                margin-top: 1px;
            }
        }
    }
    .body {
        width: 731px;
        margin-top: 20px;
        margin-left: -42px;
        display: flex;
        flex-wrap: wrap;
        li {
            width: 180px;
            height: 234px;
            padding-left: 42px;
            padding-bottom: 30px;
            position: relative;
            img {
                width: 140px;
                height: 140px;
                display: block;
            }
            .shadow {
                width: 140px;
                height: 140px;
                display: block;
                background: url('./images/coverall.png') no-repeat 0 0;
                position: absolute;
                top: 0;
                &:hover {
                    cursor: pointer;
                }
            }
            .bottom {
                position: absolute;
                bottom: 94px;
                left: 30;
                width: 140px;
                height: 27px;
                background: url('./images/coverall.png') no-repeat;
                background-position: 0 -537px;
                color: #ccc;

                .icon-headset {
                    float: left;
                    width: 14px;
                    height: 11px;
                    margin: 9px 5px 9px 10px;
                    background: url('./images/iconall.png') no-repeat 0 -24px;
                }

                .nb {
                    display: block;
                    text-align: -webkit-match-parent;
                    word-wrap: break-word;
                    word-break: break-word;
                    font-size: 12px;
                    float: left;
                    margin: 7px 0 0 0;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                }
                .icon-play {
                    position: absolute;
                    float: right;
                    right: 10px;
                    bottom: 15px;
                    width: 16px;
                    height: 17px;
                    background: url('./images/iconall.png') no-repeat 0 0;

                    &:hover {
                        background-position: 0px -60px;
                        cursor: pointer;
                    }
                }
            }
            .text {
                display: inline-block;
                color: #000;
                font-size: 14px;
                margin-top: 5px;
                width: 140px;

                &:hover {
                    color: #000;
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
