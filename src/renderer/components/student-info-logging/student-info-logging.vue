<template>
<div class="student-info-logging">
    <div class="wrapper">
        <div class="header">
            <div class="logo-wrapper">
            </div>
            <div class="about-wrapper">
                <span class="txt">关于我们</span>
            </div>
            <router-link to="/">
                <div class="goback-wrapper">
                    <span class="txt">返回首页</span>
                </div>
            </router-link>
        </div>
        <div class="siderbar">
            <ul>
                <li>学生花名册录入</li>
                <li>学生成绩录入</li>
                <li>特长分录入</li>
                <li>学科评价参数录入</li>
                <li>自定义评价公式</li>
            </ul>
        </div>
        <div class="content-wrapper">

        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">

    import xlsx from 'node-xlsx';

    const workSheetsFromFile = xlsx.parse('static/chengji.xlsx');
    console.log('workSheetsFromFile is ',JSON.stringify(workSheetsFromFile))
    export default {
        created() {

        }

    }
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    width: 1142px;
    height: 700px;
    background: #dce4e7;
    @import '../../common/_partial/header';
    @import '../../common/_partial/siderbar';
}
</style>