<template>
  <div class="recommend">
    <div class="radioTop clearfix">
      <!-- 精彩节目推荐 -->
      <div class="blk clearfix">
        <div class="tit">
          <h3>{{proName}}</h3>
          <a class="underline">更多 &gt;</a>
        </div>
        <ul class="playList">
          <li class="item" v-for="program, index in programs" :key="index">
            <!-- 封面 -->
            <a class="cvr">
              <img v-lazy="program.coverUrl">
              <i class="icon"></i>
            </a>
            <!-- 内容 -->
            <div class="cnt">
              <h3 class="over underline">
                {{program.description}}
              </h3>
              <p class="over">
                <span class="underline">
                  {{program.dj.brand}}
                </span>
              </p>
            </div>
            <!-- 标签 -->
            <div class="tag" @click="changeCategory(program.categoryId)">
              <span>{{program.radio.category}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 精彩节目推荐 -->
       <div class="blk clearfix">
        <div class="tit">
          <h3>{{proName}}</h3>
          <a class="underline">更多 &gt;</a>
        </div>
        <ul class="playList">
          <li class="item" v-for="program, index in programs2" :key="index">
            <!-- 封面 -->
            <a class="cvr">
              <img v-lazy="program.coverUrl">
              <i class="icon"></i>
            </a>
            <!-- 内容 -->
            <div class="cnt">
              <h3 class="over underline">
                {{program.description}}
              </h3>
              <p class="over">
                <span class="underline">
                  {{program.dj.brand}}
                </span>
              </p>
            </div>
            <!-- 标签 -->
            <div class="tag" @click="changeCategory(program.categoryId)">
              <span>{{program.radio.category}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="radioMore clearfix" v-for="dj, index in hotDj" :key="index">
        <div class="tit">
          <h3 class="underline" @click="changeCategory(dj.id)">{{dj.name}}</h3>
          <h3><strong style="line-height:10px;font-family: simsun,\5b8b\4f53;">·</strong></h3>
          <h3>电台</h3>
          <a class="underline" @click="changeCategory(dj.id)">更多 &gt;</a>
        </div>
        <ul class="rdilist clearfix">
          <li v-for="item, index in dj.data" :key="index">
            <div class="cvr pointer">
              <img v-lazy="item.intervenePicUrl">
            </div>
            <div class="cnt">
              
              <h3 class="fc over">
                <span class="underline">{{item.name}}</span>
              </h3>
              <p class="note over">{{item.rcmdtext}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  components: {},
  props: {},
  data () {
    return {
      proName: '',
      programs: [],
      programs2: [],
      hotDj: [],
      hotDjId: [3001, 2, 2001, 3, 10002]
    }
  },
  methods: {
    // 获取精彩节目推荐
    async getProgramRecommend () {
      const result = await this.$API.reqPorgramRecommend()
      this.proName = result.name
      this.programs = result.programs
      for (let i = result.programs.length - 1; i >= 0; i--) {
        this.programs2.push(result.programs[i])
      }
    },
    // 切换选择
    changeCategory (id) {
      this.$router.push({
        path: `${this.$route.path}`,
        query: { id }
      })
    },
    // 获取热门电台
    async getDjRadioHot () {
      for (let i = 0; i < 5; i++) {
        const result = await this.$API.reqDjRadioHot(this.hotDjId[i], 4, 0)
        const x = {}
        x.id = this.hotDjId[i]
        x.name = result.djRadios[1].category
        x.data = result.djRadios.slice(0, 4)
        this.hotDj.push(x)
      }
    }
  },
  mounted () {
    this.getProgramRecommend()
    this.getDjRadioHot()
  }
}
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  margin-top: 10px;
  .radioTop {
    width: 100%;
    .blk {
      float: left;
      width: 426px;
      .tit {
        width: 100%;
        height: 42px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 24px;
          font-weight: normal;
          color: #333;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-text-size-adjust: none;
        }
        >a {
          float: right;
          line-height: 42px;
        }
      }
      .playList {
        border: 1px solid #e2e2e2;
        border-top: none;
        .item {
          width: 424px;
          height: 60px;
          padding: 10px 0;
          line-height: 40px;
          .cvr {
            float: left;
            width: 40px;
            height: 40px;
            margin-left: 20px;
            position: relative;
            display: block;
            &:hover {
              cursor: pointer;
            }
            img {
              width: 100%;
            }
            .icon {
              display: none;
              position: absolute;
              width: 22px;
              height: 22px;
              top: 50%;
              left: 50%;
              overflow: hidden;
              margin: -11px 0 0 -11px;
              background: url('../images/iconall.png') no-repeat;
              background-position: 0 -85px;
            }
          }
          .cnt {
            float: left;
            width: 254px;
            margin: 1px 0 0 10px;
            line-height: 20px;
            font-size: 12px;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
            h3 {
              width: 100%;
              height: 20px;
              color: #333;
              font-size: 12px;
            }
            p {
              width: auto;
              color: #999;
            }
          }
          //标签
          .tag{
              margin: 1px 0 0 10px;
              display: inline-block;
              position: relative;
              top: -1px;
              height: 16px;
              overflow: hidden;
              padding: 0 6px;
              border: 1px solid #999;
              line-height: 14px;
              color: #999;
              vertical-align: middle;
              font-size: 12px;

              &:hover{
                  color: #666;
                  border-color: #666;
                  cursor: pointer;
              }
          }
          :hover{
            background: #f7f7f7;;
          }
          &:hover .icon{
            display: block;
          }
        }
        .item:nth-of-type(even){
          background: #f7f7f7;
        }
      }
    }
    .blk:nth-child(2){
      float: right;
    }
    .radioMore {
      float: left;
      width: 100%;
      margin-top: 35px;
      .tit{
          width: 100%;
          height: 42px;
          border-bottom: 2px solid #c20c0c;
          h3{
            float: left;
            font-size: 24px;
            font-weight: normal;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
          }
          >a{
            float: right;
            line-height: 42px;
            &:hover{
              color: #666;
            }
          }
      }
      .rdilist {
        width: 930px;
        margin-left: -30px;
        li {
          padding: 20px 0 ;
          margin-left: 30px;
          width: 435px;
          height: 161px;
          float: left;
          border-bottom: 1px solid #e7e7e7;
          .cvr{
            width: 120px;
            height: 120px;
            position: relative;
            display: block;
            float: left;
            img{
              width: 100%;
            }
          }
          .cnt{
            width: 295px;
            // height: 64px;
            margin-left: 140px;

            h3{
              margin: 16px 0 20px;
              color: #333;
              font-size: 18px;
            }
          }
        }
        li:nth-child(3),
        li:nth-child(4){
          border-bottom: none;
        }
      }
    }
  }
}
</style>
