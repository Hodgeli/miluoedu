<template>
    <div class="maincontainer">
        <pagehead :showGoBack="true"></pagehead>
        <navmenu :routerMap="routerMap" :startRouter="startRouter"></navmenu>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import navmenu from "@/components/navmenu/navmenu";
    import pagehead from "@/components/pagehead/pagehead";
    export default {
        data() {
            return {
                data: [],
                userlist: [],
                currentPage: 1,
                pagesize: 9,
                routerMap: {
                    '学生花名册录入': '/student-info-logging',
                    '学生成绩录入': '/student-grade-logging',
                    '特长分录入': '/special-point-logging',
                    '学科评价参数录入': '/subject-evalu-logging',
                    '自定义评价公式': '/custom-evalu-logging'
                },
                startRouter: '/student-info-logging'
            }
        },
        components: {
            pagehead,
            navmenu
        }
    }
</script>

<style lang="scss" scoped>
    .maincontainer {
        position: relative;
        width: 1142px;
        height: 700px;
        background: #dce4e7;
        .content-wrapper {
            position: absolute;
            top: 66px;
            left: 200px;
            width: 1142-200px;
            height: 700-66px;
        }
    }
</style>