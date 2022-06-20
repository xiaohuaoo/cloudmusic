<template>
  <div class="category">
    <div class="box">
      <div class="item1">
        <li v-for="(category, index) in categoryList" :key="index">
          <a @click="chooseCategory(index, category)" :class="{active:isShow==index}">
            <div class="icon" :style="`background:url(${category.picWebUrl})`"></div>
            <em>{{category.name}}</em>
          </a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',
  components: {},
  props: {},
  data () {
    return {
      categoryList: [],
      isShow: -1
    }
  },
  computed: {
    // 获取当前页面选中的dj的id
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    id () {
      if (this.$route.query.id === undefined) {
        this.isShow = -1
      } else {
        for (let index = 0; index < this.categoryList.length; index++) {
          if (this.categoryList[index].id === this.$route.query.id) {
            this.isShow = index
            break
          }
        }
      }
    }
  },
  methods: {
    // 获取category数据
    async getCategory () {
      const result = await this.$API.reqCateList()
      this.categoryList = result.categories
    },
    chooseCategory (index, item) {
      this.isShow = index
      this.$router.push({
        path: `${this.$route.path}`,
        query: {
          id: `${item.id}`
        }
      })
    }
  },
  mounted () {
    this.getCategory()
    setTimeout(() => {
      if (this.$route.query.id !== undefined) {
        for (let index = 0; index < this.categoryList.length; index++) {
          if (this.categoryList[index].id === this.$route.query.id) {
            this.isShow = index
            break
          }
        }
      }
    }, 100)
  }
}
</script>

<style lang="less" scoped>
.category {
    width: 100%;
    overflow: hidden;
    .box {
        width: 1800px;
        height: 194px;
        .item1 {
            float: left;
            width: 933px;
            height: 194px;
            margin-left: -33px;
            li {
                display: block;
                float: left;
                margin-left: 33px;
                margin-bottom: 25px;
                width: 70px;
                height: 72px;
                a {
                    display: block;
                    width: 70px;
                    height: 70px;
                    text-align: center;
                    color: #888;
                    border-radius: 3px;
                    &:hover{
                        background: url(../images/radio_bg.png) no-repeat 0px 0 ;
                        cursor: pointer;
                    }
                    .icon {
                        width: 48px;
                        height: 48px;
                        margin: 2px auto 0;
                        background-position: 0 0;
                    }
                    em {
                        margin-top: -3px;
                    }
                }
                // 选中某一个时
                .active {
                    background: url(../images/radio_bg.png) no-repeat -70px 0 ;
                    &:hover {
                        background-position: -70px 0;
                    }
                    .icon {
                        background-position: 48px 0 !important;
                    }
                }
            }
        }
    }
}
</style>
