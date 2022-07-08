<template>
  <div class="detail">
    <!-- 优秀新电台 -->
    <div class="new clearfix">
      <div class="tit">
        <h3>优秀新电台</h3>
      </div>
      <div class="rdlist clearfix">
        <li v-for="hot, index in hotList" :key="index">
          <img v-lazy="hot.intervenePicUrl">
          <h3><span class="underline">{{hot.name}}</span></h3>
          <p>{{hot.rcmdtext}}</p>
        </li>
      </div>
    </div>
    <!-- 电台排行榜 -->
    <div class="allradios">
      <div class="tit">
        <h3>电台排行榜</h3>
      </div>
      <div class="rdlist-2 clearfix">
        <li v-for="dj,index in djList" :key="index">
          <img v-lazy="dj.intervenePicUrl">
          <div class="cnt">
            <h3><a>{{dj.name}}</a></h3>
            <p class="note">
              <i class="icon"></i>
              <a>{{dj.dj.nickname}}</a>
              <img v-lazy="dj.dj.avatarDetail.identityIconUrl" v-if="dj.dj.avatarDetail != null">
              <span style="color:#999">共{{dj.programCount}}期&nbsp;&nbsp;&nbsp;&nbsp;订阅{{dj.subCount}}次</span>
            </p>
          </div>
        </li>
      </div>
    </div>
    <!-- 分页器 -->
    <Pagination :pageNo='pageNo' :pageSize='pageSize' :total='total' :continues='7' @getPageNo="getPageNo"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'datail',
  components: { Pagination },
  data () {
    return {
      pageNo: 1,
      pageSize: 12,
      total: 100,
      hotList: [],
      djList: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    id () {
      this.getDjHot()
      this.getDjRadioHot()
    }
  },
  methods: {
    // 获取当前id下热门电台
    async getDjRadioHot () {
      const result = await this.$API.reqDjRadioHot(this.id, this.pageSize, (this.pageNo - 1) * this.pageSize)
      this.djList = result.djRadios.slice(0, this.pageSize)
    },
    // 获取前五作为优秀电台
    async getDjHot () {
      const result = await this.$API.reqDjRadioHot(this.id, 5, 0)
      this.total = result.count
      this.hotList = result.djRadios.slice(0, 5)
    },
    getPageNo (page) {
      this.pageNo = page
      this.getDjRadioHot()
    }
  },
  mounted () {
    this.getDjHot()
    this.getDjRadioHot()
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  margin-top: 35px;

  .new {
    margin-top: 10px;
    width: 100%;

    .tit {
      width: 100%;
      height: 42px;
      border-bottom: 2px solid #c20c0c;

      h3 {
        font-size: 24px;
        font-weight: normal;
        color: #333;
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      }
    }
    .rdlist {
      margin: 16px 0 0 -37px;
      width: 937px;

      li {
        margin-left: 37px;
        width: 150px;
        display: block;
        float: left;
        img {
          width: 150px;
        }
        h3 {
          margin: 13px 0 6px;
          line-height: 16px;
          font-size: 14px;
          font-weight: normal;
          color: #333;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-text-size-adjust: none;
        }
        p {
          color: #999;
          line-height: 18px;
        }
      }
    }
  }
  .allradios {
    width: 100%;
    margin-top: 35px;
    margin-bottom: 50px;

    .tit {
      width: 100%;
      height: 42px;
      border-bottom: 2px solid #c20c0c;

      h3 {
        font-size: 24px;
        font-weight: normal;
        color: #333;
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      }
    }
    .rdlist-2 {
      width: 930px;
      margin-left: -30px;

      li {
        display: block;
        float: left;
        padding: 20px 0;
        width: 435px;
        height: 161px;
        border-bottom: 1px solid #e7e7e7;
        margin-left: 30px;

        img {
          float: left;
          width: 120px;
        }

        .cnt {
          float: left;
          margin-left: 20px;
          width: 295px;
          height: 107px;

          h3{
            height: 64px;
            margin: 0;
            font-size: 18px;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
            a{
              color: #333;
            }
            & > a:hover{
              color: #333;
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .note {
            width: 100%;
            margin-block: 6px;
            display: block;
            height: 22px;
            i{
              width: 14px;
              height: 15px;
              float: left;
              display: block;
              line-height: 20px;
              background: url('../images/icon.png') no-repeat -50px -300px;
            }
            a{
              float: left;
              margin-left: 5px;
              &:hover{
                color: #666;
                cursor: pointer;
                text-decoration: underline;
              }
            }
            img{
              margin-left: 3px;
              margin-top: 2px;
              height: 13px;
              width: 13px;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
