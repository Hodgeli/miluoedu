<template>
    <div class="dataMaintain">
        <pagehead :showGoBack="true"></pagehead>
        <div class="wrapper">
            <div class="allDataClear component">
                <div class="logo"></div>
                <p class="title">所有成绩清零</p>
            </div>
            <div class="initData component">
                <div class="logo"></div>
                <p class="title">初始化数据</p>
            </div>
            <div class="higherStudent component">
                <div class="logo"></div>
                <p class="title">学生升一年级</p>
            </div>
        </div>

        <div class="footer">
            <span class="left-title">某某某科技 学校评价系统</span>
            <span class="right-title">1.012v 版</span>
        </div>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import pagehead from "@/components/pagehead/pagehead";
    export default {
        components: {
            pagehead
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../common/css/mixin';
    .dataMaintain {
        width: 1142px;
        height:700px;
        background: #0087dc;
        /*padding-top: 190px;*/
        box-sizing: border-box;
        .wrapper {
            margin: 190px auto 0;
            width: 755px;
            height:140px;
            .allDataClear {
                margin-left: 10px;
                display: inline-block;
                width: 228px;
                height: 136px;
                line-height: 136px;
                text-align: center;
                background: url(img/30.png) no-repeat;
                cursor: pointer;
                .title {
                    padding-top: 30px;
                    color: #fff;
                }
            }
            .initData {
                margin-left: 10px;
                display: inline-block;
                background: #1aa9f5;
                @include component("20");
            }
            .higherStudent {
                margin-left: 10px;
                display: inline-block;
                width: 228px;
                height: 136px;
                line-height: 136px;
                text-align: center;
                background: url(img/10.png) no-repeat;
                cursor: pointer;
                .title {
                    padding-top: 30px;
                    color: #fff;
                }
            }
        }


        .footer {
            width: 966px;
            height: 40px;
            margin: 197px auto 0;
            background: url(img/00.png) no-repeat;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            .left-title {
                display: inline-block;
                margin-right: 52px;
            }
            .right-title {
                display: inline-block;
                margin-left: 40px;
            }
        }
    }
</style>