import Vue from 'vue'
import VueRouter from 'vue-router'


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login'),
            alias: ['/finance/login', '/detect/login', '/bank/login', '/loan/login', '/insurance/login', '/guarantee/login', '/order/login'],
            hidden: true
        },
        {
            path: '/',
            component: () => import('@/views/layout/index'),
            hidden: true,
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/home')
                },
                {
                    path: '/finance/user',
                    component: () => import('@/views/useraccount')
                },
                {
                    path: '/finance/guarantee',
                    component: () => import('@/views/Cooperative/guarantee')
                },
                {
                    path: '/finance/insurance',
                    component: () => import('@/views/Cooperative/insurance')
                },
                {
                    path: '/finance/basic',
                    component: () => import('@/views/Cooperative/basic')
                },
                {
                    path: '/finance/member',
                    component: () => import('@/views/Cooperative/commune')
                },
                {
                    path: '/detect/detect/confirm',
                    component: () => import('@/views/Testing/application')
                },
                {
                    path: '/detect/detect/all',
                    component: () => import('@/views/Testing/all')
                },
                {
                    path: '/detect/detect/deal',
                    component: () => import('@/views/Testing/underdetction')
                },
                {
                    path: '/bank/bankSetting',
                    component: () => import('@/views/Bank/bankSetting.vue')
                },
                {
                    path: '/loan/bank/all',
                    component: () => import('@/views/Bank/bankAll.vue')
                },
                {
                    path: '/loan/bank/apply',
                    component: () => import('@/views/Bank/bankApply.vue')
                },
                {
                    path: '/loan/bank/approve',
                    component: () => import('@/views/Bank/bankApprove.vue')
                },
                {
                    path: '/loan/bank/finish',
                    component: () => import('@/views/Bank/bankFinish.vue')
                },
                {
                    path: '/insurance/insuranceApply',
                    component: () => import('@/views/Insurance/insuranceApply.vue')
                },
                {
                    path: '/insurance/insuranceHandle',
                    component: () => import('@/views/Insurance/insuranceHandle.vue')
                },
                {
                    path: '/insurance/insuranceAll',
                    component: () => import('@/views/Insurance/insuranceAll.vue')
                },
                {
                    path: '/insurance/insuranceFinish',
                    component: () => import('@/views/Insurance/insuranceFinish.vue')
                },
                {
                    path: '/insurance/setting',
                    component: () => import('@/views/Insurance/insuranceSetting.vue')
                },
                {
                    path: '/detect/detect/finish',
                    component: () => import('@/views/Testing/completetest.vue')
                },
                {
                    path: '/detect/order/add',
                    component: () => import('@/views/Order/orderApply.vue')
                },
                {
                    path: '/detect/order/all',
                    component: () => import('@/views/Order/orderAll.vue')
                },
                {
                    path: '/detect/order/deal',
                    component: () => import('@/views/Order/orderCheck.vue')
                },
                {
                    path: '/detect/order/finish',
                    component: () => import('@/views/Order/orderFinish.vue')
                },
                {
                    path: '/newtestord',
                    component: () => import('@/views/orderent/newtestord.vue')
                },
                {
                    path: '/delegationtest',
                    component: () => import('@/views/orderent/delegationtest.vue')
                },
                {
                    path: '/detecompleted',
                    component: () => import('@/views/orderent/detecompleted.vue')
                },
                {
                    path: '/loan/guarantee/all',
                    component: () => import('@/views/guarantee/guaranteeAll.vue')
                },
                {
                    path: '/loan/guarantee/apply',
                    component: () => import('@/views/guarantee/guaranteeApply.vue')
                },
                {
                    path: '/loan/guarantee/approve',
                    component: () => import('@/views/guarantee/guaranteeApprove.vue')
                },
                {
                    path: '/loan/guarantee/Finish',
                    component: () => import('@/views/guarantee/guaranteeFinish.vue')
                },
                {
                    path: '/detect/coop/all',
                    component: () => import('@/views/Cooperative/coopOrderAll.vue')
                },
                {
                    path: '/detect/coop/confirm',
                    component: () => import('@/views/Cooperative/coopOrderApply.vue')
                },
                {
                    path: '/detect/coop/finish',
                    component: () => import('@/views/Cooperative/coopOrderFinish.vue')
                },
                {
                    path: '/finance/messages',
                    component: () => import('@/views/messages.vue')
                },
                {
                    path: '*',
                    component: () => import('@/views/404')
                }
            ]
        }
    ]
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (window.localStorage.token) {
        if (to.path === '/') {
            return next('/home')
        }
        next()
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            router.push('/login')
        }
    }
})

export default router
