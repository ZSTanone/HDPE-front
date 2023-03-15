<!--
 * @Author: zwj
 * @Date: 2022-11-03 10:22:55
 * @LastEditors: zwj
 * @LastEditTime: 2022-11-26 11:21:48
 * @Description: 
-->
<template>
    <!-- 用于控制语言的切换 -->
    <el-config-provider :locale="lang">
        <router-view></router-view>
    </el-config-provider>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import iconfontInit from '/@/utils/iconfont'
import { useRoute } from 'vue-router'
import { setTitleFromRoute } from '/@/utils/common'
import { useConfig } from '/@/stores/config'
import { useTerminal } from '/@/stores/terminal'

const config = useConfig()
const route = useRoute()
const terminal = useTerminal()

// 初始化 element 的语言包
const { getLocaleMessage } = useI18n()
const lang = getLocaleMessage(config.lang.defaultLang) as any
onMounted(() => {
    iconfontInit()
    terminal.init()
})

// 监听路由变化时更新浏览器标题
watch(
    () => route.path,
    () => {
        setTitleFromRoute()
    }
)
</script>
