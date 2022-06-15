<template>
  <div class="comment">
      <div class="header">
        <h3>评论</h3>
        <span class="num">共12222条评论</span>
      </div>
      <div class="mainer">
        <!-- 发表评论区 -->
        <div class="flag">
          <div class="head">
            <img src="https://p3.music.126.net/dwslx7VNYE-h8TP0VkBxcg==/109951165800028895.jpg?param=50y50">
          </div>
          <div class="txt">
            <textarea class="u-txt" cols="30" rows="10" placeholder="评论"></textarea>
            <em class="arrline">◆</em>
            <em class="arrline-shadow">◆</em>
            <div class="shadow"></div>
          </div>
          <div class="btns">
            <i class="emjoy"></i>
            <i class="at"></i>
            <a>评论</a>
            <span>140</span>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="new">
          <h3 class="hd">最新评论(210111)</h3>
          <div class="itm" v-for="(com, index) in comList" :key="index">
              <div class="avatar">
                  <img v-lazy="com.user.avatarUrl">
              </div>
              <div class="cntwrap">
                <div class="cnt">
                  <a>{{com.user.nickname}}</a>
                  <span>：{{com.content}}</span>
                  <div class="que" v-show="com.beReplied[0]">
                    <a class="fc" v-if="com.beReplied[0]">{{com.beReplied[0].user.nickname}}</a>
                    <span v-if="com.beReplied[0]">：{{com.beReplied[0].content}}</span>
                  </div>
                </div>
                <div class="rp">
                  <span class="time">
                    {{com.timeStr}}
                  </span>
                  <a class="fc">回复</a>
                  <a class="like">
                    <i class="zan"></i>
                    <span v-show="com.likedCount != 0 ">({{com.likedCount}})</span>
                  </a>
                </div>
              </div>
          </div>
        </div>
        <!-- 分页器 -->
        <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchParams.total" :continues='5' @getPageNo="getPageNo"></Pagination>
      </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'playlistcommit',
  components: {
    Pagination
  },
  computed: {
    id () {
      if(this.$route.query.id == undefined) return '19723756'
      return this.$route.query.id
    }
  },
  data () {
    return {
      searchParams: {
        total: 210972,
        pageSize: 30,
        pageNo: 1
      },
      comList: []
    }
  },
  methods: {
    // 获取评论
    async getComment () {
      const result = await this.$API.reqCommentPlayList(this.id, this,this.searchParams.pageSize, (this.searchParams.pageNo-1)*(this.searchParams.pageSize))
      this.searchParams.total = result.total
      this.comList = result.comments
    },
    // 获取当前页数
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getComment()
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
.comment{
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 0 35px;
    padding-bottom: 130px;
    .header{
        width: 100%;
        height: 35px;
        border-bottom: 2px solid #c20c0c;
        h3{
            float: left;
            font-size: 20px;
            color: #333;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            font-weight: normal;
        }
        .num{
            float: left;
            margin: 9px 0 0 20px;
        }
    }
    .mainer{
        margin-top:20px ;
        width: 100%;
        display: block;
        .flag{
            width: 100%;
            height: 98px;
            .head{
                width: 50px;
                height: 50px;
                float: left;
                img{
                    width: 100%;
                }
            }
            .txt{
                float: left;
                width: 608px;
                height: 63px;
                margin-left: 12px;
                position: relative;
                .u-txt{
                    font-size: 12px;
                    color: #333;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                    width: 100%;
                    height: 63px;
                    padding: 5px 6px 6px;
                    border: 1px solid #cdcdcd;
                    border-radius: 2px;
                    line-height: 19px;
                    resize: none;
                    outline:none;
                }
                .arrline{
                    position: absolute;
                    left: -9px;
                    top: -6px;
                    font-size: 30px;
                    color: #cdcdcd;
                }
                .arrline-shadow{
                    position: absolute;
                    left: -7px;
                    top: -3.5px;
                    font-size: 27px;
                    color: #Fff;
                }
                .shadow{
                    width: 7px;
                    height: 18px;
                    position: absolute;
                    left: 1px;
                    top: 8px;
                    background: #fff;
                    z-index: 10;
                }
            }
            .btns{
                float: left;
                width: 608px;
                height: 35px;
                padding-top: 10px;
                margin-left: 62px;
                i{
                    display: block;
                    float: left;
                    width: 18px;
                    height: 18px;
                    margin-right: 10px;
                    background: url("../../images/icon.png") no-repeat;
                }
                .emjoy{
                    background-position: -40px -490px;
                }
                .at{
                    background-position: -60px -490px;
                }
                span{
                    float: right;
                    margin-right: 10px;
                    line-height: 25px;
                }
                a{
                    float: right;
                    width: 46px;
                    height: 25px;
                    text-align: center;
                    line-height:24px;
                    background: url("../../images/button.png") no-repeat -84px -94px;
                    color: #fff;
                    &:hover{
                        background-position: -84px -64px;
                        cursor: pointer;
                    }
                }
            }
        }
        .new{
            display: block;
            width: 670px;
            // border-bottom: 1px solid #cfcfcf;
            margin-top: 20px;
            margin-bottom: 25px;
            .itm{
                width: 100%;
                padding: 15px 0;
                border-top: 1px dotted #ccc;
                display: flex;
                .avatar{
                    width: 50px;
                    height: 50px;
                    img{
                        width: 100%;
                    }
                }
                .cntwrap{
                    margin-left: 15px;
                    width: 605px;
                    .cnt>a{
                        color: #0c73c2;
                        &:hover{
                            cursor: pointer;
                            text-decoration: underline;
                        }  
                    }
                    .que{
                        padding: 8px 19px;
                        margin-top: 10px;
                        line-height: 20px;
                        background: #f4f4f4;
                        border: 1px solid #dedede;
                        a{
                            color: #0c73c2;
                            &:hover{
                                cursor: pointer;
                                text-decoration: underline;
                            } 
                        }
                    }
                    .rp{
                        margin-top: 15px;
                        .time{
                            float: left;
                            color: #999;
                        }
                        .like,.sep,.fc{
                            float: right;
                        }
                        .sep{
                            margin: 0 8px;
                        }
                        .fc{
                            color: #666;
                            
                            &:hover{
                                color: #666;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                        .like{
                            .zan{
                                margin-right: 5px;
                                vertical-align: -2px;
                                margin-top: -4px;
                                width: 15px;
                                height: 14px;
                                display: inline-block;
                                background: url("../../images/icon2.png") no-repeat;
                                background-position: -150px 0;
                            }
                            &:hover{
                                color: #666;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
