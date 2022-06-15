<template>
  <div class="DJ">
      <div class="header">热门主播</div>
      <ul class="hotdj">
        <li v-for="dj, index in djList" :key="index">
          <a class="cver">
            <img v-lazy="dj.url">
          </a>
          <div class="info">
            <p>
              <a>{{dj.name}}</a>
            </p>
            <p class="thide">{{dj.score}}</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'dj',
  data () {
    return {
      djList: []
    }
  },
  methods: {
    async getDjTopList () {
      const result = await this.$API.reqDjTopList(5)
      result.data.list.forEach((item) => {
        const x = {}
        x.id = item.id
        x.name = item.nickName
        x.score = parseInt(item.score / 10000) + '万'
        x.url = item.avatarUrl
        this.djList.push(x)
      })
    }
  },
  mounted () {
    this.getDjTopList()
  }
}
</script>

<style lang="less" scoped>
.DJ {
    margin-top: 30px;
    width: 250px;
    height: 294px;

    .header {
        margin: 0 20px;
        width: 210px;
        height: 23px;
        border-bottom: 1px solid #ccc;
        color: #333;
        position: relative;
        font-weight: bold;
    }

    .hotdj {
        margin-top: 20px;
        margin-left: 20px;
        width: 230px;
        height: 250px;
        float: left;

        li {
            width: 210px;
            height: 50px;
            float: left;

            .cver {
                width: 40px;
                height: 42px;
                margin-right: 10px;
                float: left;
                img {
                    width: 100%;
                }
            }

            .info {
                width: 160px;
                height: 42px;
                float: left;
                p {
                    line-height: 21px;
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    a:hover {
                        color: #666;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
