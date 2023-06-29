<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 10:31:34
 * @LastEditTime: 2022-12-18 20:11:18
 * @LastEditors: zwj
-->
<template>
    <component :is="config.layout.layoutMode"></component>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, onUnmounted } from 'vue'
import { useConfig } from '/@/stores/config'
import { useUserNavTabs } from '/@/stores/navTabsUser'
import { useUserInfo } from '/@/stores/userInfo'
import { useMemberCenter } from '/@/stores/memberCenter'
import { index } from '/@/api/frontend/user/index'
import { handleMemberCenterRoute, getMenuPaths, getFirstRoute, routePush } from '/@/utils/router'
import { Session } from '/@/utils/storage'
import { memberCenterBaseRoute } from '/@/router/static'
// import { ElNotification } from 'element-plus'
// import { useI18n } from 'vue-i18n'
import { BEFORE_RESIZE_LAYOUT } from '/@/stores/constant/cacheKey'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

// const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userInfo = useUserInfo()
const navTabs = useUserNavTabs()
const config = useConfig()
const memberCenter = useMemberCenter()

onBeforeRouteUpdate((to) => {
    memberCenter.setActiveRoute(to)
    // console.log('路由发生变化',to);
})

onMounted(() => {
    if (!userInfo.token) return router.push({ name: 'userLogin' })
    
    init()
    onSetNavTabsMinWidth()
    window.addEventListener('resize', onSetNavTabsMinWidth)
})
onBeforeMount(() => {
    onAdaptiveLayout()
    window.addEventListener('resize', onAdaptiveLayout)
})
onUnmounted(() => {
    window.removeEventListener('resize', onAdaptiveLayout)
    window.removeEventListener('resize', onSetNavTabsMinWidth)
})

const init = () => {
    index().then((res) => {
        // 更新token
        // console.log('后端返回的index接口响应',res);
        res.data.userInfo.refreshToken = userInfo.refreshToken

        userInfo.dataFill(res.data.userInfo)
        
        // 获取用户有权限访问的资源
        if (res.data.menus) {          
            handleMemberCenterRoute(res.data.menus)


            // 预跳转到上次路径
            if (route.query && route.query.url && route.query.url != memberCenterBaseRoute.path) {
                // 检查路径是否有权限
                let menuPaths = getMenuPaths(memberCenter.state.viewRoutes)
                if (menuPaths.indexOf(route.query.url as string) !== -1) {
                    let query = JSON.parse(route.query.query as string)
                    router.push({ path: route.query.url as string, query: Object.keys(query).length ? query : {} })
                    return
                }
            }

            // 跳转到第一个菜单
            let firstRoute = getFirstRoute(navTabs.state.tabsViewRoutes)
            
            if (firstRoute) routePush(firstRoute.path)
        }
    })
}

const onAdaptiveLayout = () => {
    let defaultBeforeResizeLayout = {
        layoutMode: config.layout.layoutMode,
        menuCollapse: config.layout.menuCollapse,
    }
    let beforeResizeLayout = Session.get(BEFORE_RESIZE_LAYOUT)
    if (!beforeResizeLayout) Session.set(BEFORE_RESIZE_LAYOUT, defaultBeforeResizeLayout)

    const clientWidth = document.body.clientWidth
    if (clientWidth < 1024) {
        config.setLayout('menuCollapse', true)
        config.setLayout('shrink', true)
        config.setLayoutMode('Classic')
    } else {
        let beforeResizeLayoutTemp = beforeResizeLayout || defaultBeforeResizeLayout

        config.setLayout('menuCollapse', beforeResizeLayoutTemp.menuCollapse)
        config.setLayout('shrink', false)
        config.setLayoutMode(beforeResizeLayoutTemp.layoutMode)
    }
}

// 在实例挂载后为navTabs设置一个min-width，防止宽度改变时闪现滚动条
const onSetNavTabsMinWidth = () => {
    const navTabs = document.querySelector('.nav-tabs') as HTMLElement
    if (!navTabs) {
        return
    }
    const navBar = document.querySelector('.nav-bar') as HTMLElement
    const navMenus = document.querySelector('.nav-menus') as HTMLElement
    const minWidth = navBar.offsetWidth - (navMenus.offsetWidth + 20)
    navTabs.style.width = minWidth.toString() + 'px'
}
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script lang="ts">
import Default from '/@/layouts/frontend/container/default.vue'
import Classic from '/@/layouts/frontend/container/classic.vue'
import Streamline from '/@/layouts/frontend/container/streamline.vue'
export default {
    components: { Default, Classic, Streamline },
}
</script>

<style scoped lang="scss">

</style>
