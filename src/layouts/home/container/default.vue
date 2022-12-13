<!--
 * @Author: zwj
 * @Date: 2022-11-26 11:12:41
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-07 13:11:21
 * @Description: 
-->
<template>
    <el-container class="is-vertical">
        <Header />
        <el-scrollbar :style="layoutMainScrollbarStyle()" ref="mainScrollbarRef">
            <el-row class="frontend-footer-brother" justify="center">
                <el-col class="user-layouts" :span="16" :xs="24">
                    <Main />
                </el-col>
            </el-row>
            <Footer />
        </el-scrollbar>
    </el-container>
</template>

<script setup lang="ts">
import Header from '/@/layouts/frontend/components/header.vue'
import Aside from '/@/layouts/frontend/components/aside.vue'
import Main from '/@/layouts/frontend/components/main.vue'
import Footer from '/@/layouts/frontend/components/footer.vue'
import { mainHeight as layoutMainScrollbarStyle } from '/@/utils/layout'
import 'element-plus/theme-chalk/display.css'
</script>

<style scoped lang="scss">
.user-layouts {
    display: flex;
    padding-top: 15px;
    align-items: flex-start;
}
@media screen and (max-width: 768px) {
    .user-layouts {
        padding-top: 0;
    }
}
</style>
