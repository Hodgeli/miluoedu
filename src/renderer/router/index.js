import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: require('@/components/welcome/welcome').default
        },
        {
            path: '/main',
            name: 'maincontainer',
            component: require('@/components/maincontainer/maincontainer').default,
            children: [
                {
                    path: '/student-info-logging',
                    name: 'student-info-logging',
                    component: require('@/components/student-info-logging/student-info-logging').default
                },
                {
                    path: '/student-grade-logging',
                    name: 'student-grade-logging',
                    component: require('@/components//student-grade-logging//student-grade-logging').default
                },
                {
                    path: '/special-point-logging',
                    name: 'special-point-logging',
                    component: require('@/components//special-point-logging//special-point-logging').default
                },
                {
                    path: '/subject-evalu-logging',
                    name: 'subject-evalu-logging',
                    component: require('@/components/subject-evalu-logging/subject-evalu-logging').default
                },
                {
                    path: '/custom-evalu-logging',
                    name: 'custom-evalu-logging',
                    component: require('@/components/custom-evalu-logging/custom-evalu-logging').default
                },
            ]
        },
        {
            path: '/excel',
            name: 'Excel',
            component: require('@/components/Excel').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
