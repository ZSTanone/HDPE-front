<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-27 16:57:36
 * @LastEditTime: 2022-10-27 20:02:15
 * @LastEditors: zwj
-->
<template>
    <el-container class="layout-container">
        <el-container class="content-wrapper">
            <Header />
            <Main />
        </el-container>
    </el-container>
    <CloseFullScreen v-if="navTabs.state.tabFullScreen" />
</template>

<script setup lang="ts">
import Header from '/@/layouts/frontend/components/header.vue'
import Main from '/@/layouts/frontend/router-view/main.vue'
import CloseFullScreen from '/@/layouts/frontend/components/closeFullScreen.vue'
import { useUserNavTabs } from '/@/stores/navTabsUser'
const navTabs = useUserNavTabs()
</script>

<style scoped>
.layout-container {
    height: 100%;
    width: 100%;
}
.content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
