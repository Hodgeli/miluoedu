<template>
    <div class="welcome">
        <div class="wrapper">
            <div class="header">
                <div class="logo-wrapper">
                    <!-- <img src="img/logo.png"> -->
                </div>
                <div class="about-wrapper">
                    <!-- <img src="img/关于我们.png"> -->
                    <router-link to="/excel">
                    <span class="txt">关于我们</span>
                    </router-link>
                </div>
            </div>
            <div class="content">
                <div class="name">
                    <div class="txt">
                        <p class="school-title">某某某中学</p>
                        <p class="project-title">学校评价管理系统</p>
                    </div>
                </div>
                <div class="teacher-evalu component">
                    <div class="logo"></div>
                    <p class="title">老师评价</p>
                </div>
                <div class="class-evalu component">
                    <div class="logo"></div>
                    <p class="title">班级评价</p>
                </div>
                <div class="teacher-info-logging">
                    <div class="title">教师班级信息录入</div>
                </div>
                <router-link to="/student-info-logging">
                    <div class="student-info-logging">
                        <div class="title">学生信息录入</div>
                    </div>
                </router-link>
                <div class="student-garde component">
                    <div class="logo"></div>
                    <p class="title">学生成绩</p>
                </div>
                <div class="student-grade-logging component">
                    <div class="logo"></div>
                    <p class="title">导入学生成绩</p>
                </div>
                <div class="data-output component">
                    <div class="logo"></div>
                    <p class="title">数据导出</p>
                </div>
                <div class="data-maintain component">
                    <div class="logo"></div>
                    <p class="title">数据维护</p>
                </div>
            </div>
            <div class="footer">
                <span class="left-title">某某某可以 学校评价系统</span>
                <span class="right-title">1.012v 版</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style lang="scss" scoped>
    @import '../../common/css/mixin';
    @import '../../common/_partial/header';
    .wrapper {
        width: 1142px;
        height: 700px;
        background: #0086dd;
        @import '../../common/_partial/header';
        .content {
            position: relative;
            width: 970px;
            height: 450px;
            margin: 0 auto;
            margin-top: 32px;
            .name, .teacher-evalu, .class-evalu,
            .teacher-info-logging, .student-info-logging,
            .student-garde, .student-grade-logging,
            .data-output, .data-maintain {
                display: inline-block;
                background: #1aa9f5;
            }
            .name {
                position: relative;
                width: 474px;
                height: 290px;
                background: url(img/9.png) no-repeat;
                .txt {
                    display: inline-block;
                    /*width: 200px;*/
                    /*height: 100px;*/
                    position: absolute;
                    bottom: 45px;
                    right: 25px;
                    color: #fff;
                    text-align: right;
                    font-size: 30px;
                    .school-title, .project-title {
                        margin: 0;
                        padding: 0;
                    }
                }
            }
            .teacher-evalu {
                position: absolute;
                top: 0;
                left: 493px;
                @include component("老师评价");
            }
            .class-evalu {
                position: absolute;
                top: 0;
                right: 0;
                @include component("班级评价");
            }
            .teacher-info-logging {
                position: absolute;
                top: 155px;
                left: 493px;
                width: 228px;
                height: 136px;
                line-height: 136px;
                text-align: center;
                background: url(img/3.png) no-repeat;
                cursor: pointer;
                .title {
                    padding-top: 40px;
                    color: #fff;
                }
            }
            .student-info-logging {
                position: absolute;
                top: 155px;
                right: 0;
                width: 228px;
                height: 136px;
                line-height: 136px;
                text-align: center;
                background: url(img/4.png) no-repeat;
                cursor: pointer;
                .title {
                    padding-top: 40px;
                    color: #fff;
                }
            }
            .student-garde {
                position: absolute;
                bottom: 2px;
                left: 0;
                @include component("学生成绩");
            }
            .student-grade-logging {
                position: absolute;
                bottom: 2px;
                left: 228+19px;
                @include component("导入学生成绩");
            }
            .data-output {
                position: absolute;
                bottom: 2px;
                left: 228+19+228+19px;
                @include component("数据导出");
            }
            .data-maintain {
                position: absolute;
                bottom: 2px;
                right: 0;
                @include component("数据维护");
            }
        }
        .footer {
            width: 966px;
            height: 40px;
            margin: 0 auto;
            margin-top: 45px;
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