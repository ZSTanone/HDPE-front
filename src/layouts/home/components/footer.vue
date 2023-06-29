<!--
 * @Author: zwj
 * @Date: 2022-09-06 20:43:56
 * @LastEditors: zwj
 * @LastEditTime: 2022-10-27 16:12:32
 * @Description: 
-->
<template>
    <el-footer class="footer">
        <div>
            <!-- Copyright @ 2022~2023 {{ 'ZSTAN' }} {{ $t('index.copyright') }} -->
            Copyright @ 2022~2023 {{ siteConfig.site_name }} {{ $t('index.copyright') }}
            <!-- <a href="http://beian.miit.gov.cn/">{{ 'ZSTAN' }}</a> -->
            <a href="http://beian.miit.gov.cn/">{{ siteConfig.record_number }}</a>
        </div>
    </el-footer>
</template>

<script setup lang="ts">
import { useSiteConfig } from '/@/stores/siteConfig'

const siteConfig = useSiteConfig()
</script>

<style scoped lang="scss">
.footer {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: var(--el-color-info-light-7);
    a {
        color: var(--el-text-color-secondary);
    }
}
</style>
