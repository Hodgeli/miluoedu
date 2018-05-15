<template>
    <div class="siderbar">
        <ul>
            <li :class="{'active':index === highLight(value,index)}" v-for="(value, key, index) in routerMap" @click="routerTo(value,index)">{{key}}</li>
            <!--<li :class="highLight(value)" v-for="(value, key) in routerMap" @click="routerTo(value)">{{key}}</li>-->
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            /**
             *由调用的父组件传入, 类型：object，key为导航栏显示的中文，value为导航地址
             */
            routerMap: {
                type: Object,
                default() {
                    return {};
                }
            },
            /**
             *由调用的父组件传入, 类型：String，导航栏起始跳转并高亮的路由地址
             */
            startRouter: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        computed: {
            active() {

            }
        },
        created() {
            /**
             * vue不能直接修改传过来的startRouter，用一个变量存
             */
            this.firstRouter = this.startRouter;
        },
        data() {
            return {
                nowindex: -1,
                firstRouter: ''
            };
        },
        methods: {
            /**
             * @param value :遍历routerMap的key对应的value，和当前项的索引
             * 用于侧边导航栏加载时，高亮指定的Router
             * firstRouter只用于一次，起始时设置nowindex
             * 当某一项的索引等于nowindex时进行高亮
             */
            highLight(value, index) {
                if(value === this.firstRouter) {
                    this.$router.push(this.firstRouter);
                    this.firstRouter = null;
                    this.nowindex = index;
                }
                return this.nowindex;
            },
            /**
             * @param value :遍历routerMap的key对应的value
             * 用于点击相应的li元素，跳转到相应的路由地址，并高亮相应的元素
             */
            routerTo(value,index) {
                this.$router.push(value);
                this.nowindex = index;
                this.highLight(value,index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .siderbar {
        position: absolute;
        top: 66px;
        left: 0;
        width: 200px;
        height: 700-66px;
        background: #fff;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            box-sizing: border-box;
            li {
                width: 100%;
                height: 60px;
                line-height: 60px;
                padding-left: 20px;
                color: #000;
                box-sizing: border-box;
                &:hover{
                    color:#fff;
                    background: #6fcc3f;
                    &:before {
                        background: #fff;
                    }
                }
                &:before {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background-color: #000;
                    border-radius: 50%;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
            .active {
                color:#fff;
                background: #6fcc3f;
            }
        }

    }
</style>