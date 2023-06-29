import { createRouter, createWebHashHistory } from 'vue-router'
// nProgress是一个进度条组件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { staticRoutes } from '/@/router/static'
import { loading } from '/@/utils/loading'


// 在路由守卫处配置进度条组件

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
})

router.beforeEach((to, from, next) => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    if (!window.existLoading) {
        loading.show()
        window.existLoading = true
    }
    next()
})

// 路由加载后
router.afterEach(() => {
    if (window.existLoading) {
        loading.hide()
    }
    NProgress.done()
})

export default router
