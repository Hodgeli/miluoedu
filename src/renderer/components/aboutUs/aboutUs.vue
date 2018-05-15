<template>
    <div class="aboutUs" v-show="info" @click="showInfo">
        <div class="container" v-show="info">
            <div class="info-wrapper">
                <p>扫描二维码左侧微信联系我们</p>
                <p>或致电：</p>
                <p>15692092004 曹先生</p>
                <p>长沙云亘科技有限公司</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            info: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
//        mounted() {
//            console.log('this info ', this.info);
//            this.pageinfo = this.info;
//        },
//        data() {
//            return {
//                info: false
//            }
//        },
        methods: {
            showInfo() {
                console.log('click');
                if(this.info === true) {
                    this.info = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .aboutUs {
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: rgba(255, 255, 255, .6);
        .container {
            position:absolute;
            top: 180px; //(700-292)/2=204
            left: 311px; //(1142-520)/2
            width: 520px;
            height: 292px;
            background: url(./img/关于.png) no-repeat;
            z-index: 9;
            .info-wrapper {
                position: absolute;
                top: 69px;
                right: 40px;
                width: 265px;
                height: 105px;
                p {
                    margin: 0;
                    padding: 0;
                    font-size: 20px;
                    /*font-weight: 500;*/
                }
            }
        }
    }

</style>