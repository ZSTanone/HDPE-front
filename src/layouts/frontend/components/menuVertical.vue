<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-27 16:57:36
 * @LastEditTime: 2022-10-27 17:56:11
 * @LastEditors: zwj
-->
<template>
    <el-scrollbar ref="verticalMenusRef" class="vertical-menus-scrollbar">
        <el-menu
            class="layouts-menu-vertical"
            :collapse-transition="false"
            :unique-opened="config.layout.menuUniqueOpened"
            :default-active="state.defaultActive"
            :collapse="config.layout.menuCollapse"
        >
            <MenuTree :menus="navTabs.state.tabsViewRoutes" />
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import MenuTree from './menuTree.vue'
import { useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'
import type { ElScrollbar } from 'element-plus'
import { useConfig } from '/@/stores/config'
import { useUserNavTabs } from '/@/stores/navTabsUser'

const config = useConfig()
const navTabs = useUserNavTabs()
const route = useRoute()

const verticalMenusRef = ref<InstanceType<typeof ElScrollbar>>()

const state = reactive({
    defaultActive: '',
})

const verticalMenusScrollbarHeight = computed(() => {
    let menuTopBarHeight = 0
    if (config.layout.menuShowTopBar) {
        menuTopBarHeight = 50
    }
    if (config.layout.layoutMode == 'Default') {
        return 'calc(100vh - ' + (32 + menuTopBarHeight) + 'px)'
    } else {
        return 'calc(100vh - ' + menuTopBarHeight + 'px)'
    }
})

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        let activeMenu: HTMLElement | null = document.querySelector('.el-menu.layouts-menu-vertical li.is-active')
        if (!activeMenu) return false
        verticalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
    })
}

onMounted(() => {
    currentRouteActive(route)
    verticalMenusScroll()
})

onBeforeRouteUpdate((to) => {
    currentRouteActive(to)
})
</script>
<style>

/* 设置菜单栏颜色 */
/* 一级菜单和底色都在这选，然后子菜单的颜色用文件的设置去调 */

.vertical-menus-scrollbar {
    height: v-bind(verticalMenusScrollbarHeight);
    /* background-color: v-bind('config.getColorVal("menuBackground")'); */
    background-color: rgb(114, 161, 215);
}

.layouts-menu-vertical {
    border: 0;
    --el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
    --el-menu-text-color: v-bind('config.getColorVal("menuColor")');
    --el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');

    /* 侧边栏一级菜单 */
    background-color: rgb(114, 161, 215);
}
</style>
