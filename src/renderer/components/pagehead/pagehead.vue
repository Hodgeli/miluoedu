<template>
    <div>
    <div class="header">
        <div class="logo-wrapper">
        </div>
        <div class="about-wrapper"  @click="showAboutUs">
            <span class="txt">关于我们</span>
        </div>
        <router-link to="/" v-show="showGoBack">
            <div class="goback-wrapper">
                <span class="txt">返回首页</span>
            </div>
        </router-link>
    </div>
    <aboutUs :info="info"></aboutUs>
    </div>
</template>

<script type="text/ecmascript-6">
    import aboutUs from '@/components/aboutUs/aboutUs'
    export default {
        props: {
            showGoBack: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        components: {
            aboutUs
        },
        data() {
          return {
              info: false
          }
        },
        methods: {
            showAboutUs() {
                if(this.info === false) {
                    this.info = true;
                }
                else {
                    this.info = false;
                }
                console.log('from parent '+this.info);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 66px;
        line-height: 66px;
        background: #0070d2;
        .logo-wrapper {
            display: inline-block;
            width: 300px;
            height: 40px;
            float: left;
            margin: 13px 0 13px 25px;
            background: url(img/logo.png) no-repeat;
        }
        .about-wrapper {
            position: relative;
            display: inline-block;
            height: 40px;
            width: 135px;
            float: right;
            text-align: center;
            line-height: 40px;
            margin: 13px 25px 13px 0;
            background: url(img/关于我们.png) no-repeat;
            cursor: pointer;
            .txt {
                padding-left: 25px;
                font-size: 14px;
                color: #fff;
            }
        }
        .goback-wrapper {
            display: inline-block;
            height: 40px;
            width: 135px;
            float: right;
            text-align: center;
            line-height: 40px;
            margin: 13px 25px 13px 0;
            background: url(img/返回上层.png) no-repeat;
            cursor: pointer;
            .txt {
                padding-left: 25px;
                font-size: 14px;
                color: #fff;
            }
        }
    }
</style>