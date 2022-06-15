<template>
  <div class="Myfooter">
      <div class="m-ft">
          <div class="copy">
            <p class="link">
                <a href="//st.music.163.com/official-terms/service" target="_blank" class="item">服务条款</a>
                <span class="line">|</span>
                <a href="//st.music.163.com/official-terms/privacy" target="_blank" class="item">隐私政策</a>
                <span class="line">|</span>
                <a href="//st.music.163.com/official-terms/children" target="_blank" class="item">儿童隐私政策</a>
                <span class="line">|</span>
                <a href="//music.163.com/st/staticdeal/complaints.html" target="_blank" class="item">版权投诉指引</a>
                <span class="line">|</span>
                <a class="item">意见反馈</a>
                <span class="line">|</span>
                <a href="https://music.163.com/ui/resource" class="item">广告合作</a>
            </p>
            <div class="right">
                <span class="sep">网易公司版权所有©1997-2022</span>
                <span class="span">杭州乐读科技有限公司运营：</span>
                <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" class="alink s-fc3">浙网文[2021] 1186-054号</a>
            </div>
            <div class="contact">
                <span class="sep">违法和不良信息举报电话：0571-89853516</span>
                <span class="span">举报邮箱：</span>
                <a class="alink" href="mailto:ncm5990@163.com">ncm5990@163.com</a>
            </div>
            <div class="right">
                <a href="https://beian.miit.gov.cn/#/Integrated/index" rel="noopener noreferrer" target="_blank" class="alink s-fc3">粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站</a>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" rel="noopener noreferrer" target="_blank" class="alink s-fc3 police-link">
                    <span class="police-logo"></span>
                    <span class="police-text">浙公网安备 33010902002564号</span>
                </a>
            </div>
          </div>
          <ul class="enter f-fr">
            <li class="unit">
                <a class="logo logonew logo-amped f-tid" href="https://web-amped.music.163.com/" target="_blank"></a>
                <span class="tt tt-amped"></span>
            </li>
            <li class="unit">
                <a class="logo logonew logo-auth f-tid" href="//music.163.com/st/userbasic#/auth" target="_blank"></a>
                <span class="tt tt-auth"></span>
            </li>
            <li class="unit">
                <a class="logo logonew logo-musician f-tid" href="//music.163.com/musician/artist" target="_blank"></a>
                <span class="tt tt-musician"></span>
            </li>
            <li class="unit">
                <a class="logo logonew logo-reward f-tid" href="//music.163.com/web/reward" target="_blank"></a>
                <span class="tt tt-reward"></span>
            </li>
            <li class="unit">
                <a class="logo logonew logo-cash f-tid" href="//music.163.com/st/ncreator/revenue-plan" target="_blank"></a>
                <span class="tt tt-cash"></span>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Myfooter'
}
</script>

<style lang = "less" scoped>
    .Myfooter{
        height: 173px;
        width: 100%;
        border-top: 1px solid #d3d3d3;
        background: #f2f2f2;
        .m-ft{
            width: 980px;
            height: 115px;
            margin: 0 auto;

            .copy{
                width: 520px;
                height: 115px;
                padding-top: 15px;
                float: left;
                .link{
                    width: 520px;
                    height: 24px;
                    font-size: 12px;
                    color: #333;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                    a{
                        line-height: 24px;
                        color: #999;
                        &:hover{
                            color:#999;
                            text-decoration: underline;
                        }
                    }
                    .line{
                        margin: 0 11px 0 11px;
                        color: #c2c2c2;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }

                .right{
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                    line-height: 24px;
                    .sep{
                        margin-right: 10px;
                    }

                    a:hover{
                        color: #333;
                        text-decoration: underline;
                    }

                    .alink{
                        margin-right: 10px;
                        .police-logo{
                            width: 15px;
                            height: 15px;
                            display: inline-block;
                            background: url('https://s2.music.126.net/style/web2/img/3rd/police.png?9be4d50696870b370eee47006d6f8b89') no-repeat 0 0;
                            background-size: 15px 15px;
                        }
                    }
                }

                .contact{
                    line-height: 24px;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;

                    .sep{
                        margin-right: 10px;
                    }

                    a:hover{
                        color: #333;
                        text-decoration: underline;
                    }
                }
            }

            .enter{
                font-size: 12px;
                color: #333;
                font-family: Arial, Helvetica, sans-serif;
                -webkit-text-size-adjust: none;
                word-wrap: break-word;
                word-break: break-word;
                padding: 0;
                margin: 0;
                float: right;
                width: 420px;
                margin-top: 33px;
                .unit{
                    font-size: 12px;
                    font-family: Arial, Helvetica, sans-serif;
                    -webkit-text-size-adjust: none;
                    word-wrap: break-word;
                    word-break: break-word;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    float: left;
                    width: 60px;
                    height: 70px;
                    text-align: center;
                    color: #666;
                    margin-left: 0;
                    margin-right: 24px;
                    .logo-amped{
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        text-decoration: none;
                        cursor: pointer;
                        text-indent: -9999px;
                        display: block;
                        float: none;
                        width: 50px;
                        height: 45px;
                        margin: 0 auto;
                        background-image: url('./images/foot_enter_new.png');
                        background-size: 110px 552px;
                        background-position: -63px -456.5px;
                    }
                    .tt-amped{
                        font-size: 12px;
                        background-image: url('./images/foot_enter_tt.png');
                        background-size: 180px 139px;
                        display: inline-block;
                        margin: 5px 5px 0;
                        height: 14px;
                        background-position: 0 -108px;
                        margin-left: -6px;
                        width: 72px;
                    }
                    .logo-auth{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        text-decoration: none;
                        color: #333;
                        cursor: pointer;
                        text-indent: -9999px;
                        display: block;
                        float: none;
                        width: 50px;
                        height: 45px;
                        margin: 0 auto;
                        background: url('./images/foot_enter_new.png') no-repeat;
                        background-size: 110px 552px;
                        background-position: -63px -101px;
                    }
                    .tt-auth{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        color: #666;
                        background: url('./images/foot_enter_tt.png') no-repeat;
                        background-size: 180px 139px;
                        display: inline-block;
                        margin: 5px 5px 0;
                        width: 52px;
                        height: 14px;
                        background-position: -1px -91px;
                    }
                    .logo-musician{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        text-decoration: none;
                        color: #333;
                        cursor: pointer;
                        text-indent: -9999px;
                        display: block;
                        float: none;
                        width: 50px;
                        height: 45px;
                        margin: 0 auto;
                        background: url('./images/foot_enter_new.png') no-repeat;
                        background-size: 110px 552px;
                        background-position: 0 0;
                    }
                    .tt-musician{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        color: #666;
                        background: url('./images/foot_enter_tt.png') no-repeat;
                        background-size: 180px 139px;
                        display: inline-block;
                        margin: 5px 5px 0;
                        width: 52px;
                        height: 14px;
                        background-position: 0 0;
                    }
                    .logo-reward{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        text-decoration: none;
                        color: #333;
                        cursor: pointer;
                        text-indent: -9999px;
                        display: block;
                        float: none;
                        width: 50px;
                        height: 45px;
                        margin: 0 auto;
                        background: url('./images/foot_enter_new.png') no-repeat;
                        background-size: 110px 552px;
                        background-position: -60px -50px;
                    }
                    .tt-reward{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        color: #666;
                        background: url('./images/foot_enter_tt.png') no-repeat;
                        background-size: 180px 139px;
                        display: inline-block;
                        margin: 5px 5px 0;
                        width: 52px;
                        height: 14px;
                        background-position: 0 -54px;
                    }
                    .logo-cash{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        text-decoration: none;
                        color: #333;
                        cursor: pointer;
                        text-indent: -9999px;
                        display: block;
                        float: none;
                        width: 50px;
                        height: 45px;
                        margin: 0 auto;
                        background: url('./images/foot_enter_new.png') no-repeat;
                        background-size: 110px 552px;
                        background-position: 0 -101px;
                    }
                    .tt-cash{
                        font-size: 12px;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-text-size-adjust: none;
                        word-wrap: break-word;
                        word-break: break-word;
                        list-style: none;
                        text-align: center;
                        color: #666;
                        background: url('./images/foot_enter_tt.png') no-repeat;
                        background-size: 180px 139px;
                        display: inline-block;
                        margin: 5px 5px 0;
                        width: 52px;
                        height: 14px;
                        background-position: -1px -72px;
                    }
                }
            }
        }
    }
</style>
