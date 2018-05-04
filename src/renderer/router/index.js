import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
        path: '/',
        name: 'welcome',
        component: require('@/components/welcome/welcome').default
    },
    {
        path: '/student-info-logging',
        name: 'student-info-logging',
        component: require('@/components/student-info-logging/student-info-logging').default
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
