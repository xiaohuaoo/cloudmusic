<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo', pageNo-1)" class="move">&lt;上一页</button>
    <button v-if="startNumAndEndNum.start > 1"  @click="$emit('getPageNo', 1)" class="page">1</button>
    <button v-if="startNumAndEndNum.start > 2" class="point">...</button>

    <!-- 中间部分 -->
    <button class="page" v-for="(page, index) in parseInt(startNumAndEndNum.end)" :key="index" v-show = "page >= startNumAndEndNum.start" :class="{active:isPage(page)}" @click="$emit('getPageNo',page)">{{page}}</button>
    <button v-if="startNumAndEndNum.end < totalPage-1" class="point">...</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" class="page">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)" class="move">下一页&gt;</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum () {
      let start = 0
      let end = 0
      start = Math.max(1, this.pageNo - Math.floor(this.continues / 2))
      end = Math.max(1, this.pageNo - Math.floor(this.continues / 2))
      return { start, end }
    }
  },
  methods: {
    isPage (page) {
      return page === this.pageNo
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #fff;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #ec3838;
            color: #fff;
        }
    }
    .point {
        padding: 0;
        margin: 0 -5px;
    }
    .active {
        background: skyblue;
    }
    .move {
        &:hover {
            color: #ec3838;
        }
    }
    .page {
        border: 1px solid #aaa !important;
        border-radius: 5px !important;
        &:hover {
            border: 1px solid #111 !important;
        }
    }
}
</style>
