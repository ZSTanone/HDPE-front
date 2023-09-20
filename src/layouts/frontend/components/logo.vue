<template>
    <div class="layout-logo">
        <img v-if="!config.layout.menuCollapse" class="logo-img" src="~assets/logo.png" alt="logo" />
        <div v-if="!config.layout.menuCollapse" :style="{ color:'black' }" class="website-name">
            {{ siteConfig.site_name }}
        </div>
        <Icon
            v-if="config.layout.layoutMode != 'Streamline'"
            @click="onMenuCollapse"
            :name="config.layout.menuCollapse ? 'fa fa-indent' : 'fa fa-dedent'"
            :class="config.layout.menuCollapse ? 'unfold' : ''"
            :color="'black'"
            size="18"
            class="fold"
        />
    </div>
</template>

<script setup lang="ts">
import { useConfig } from '/@/stores/config'
import { useSiteConfig } from '/@/stores/siteConfig'
import { closeShade } from '/@/utils/pageShade'
import { Session } from '/@/utils/storage'
import { BEFORE_RESIZE_LAYOUT } from '/@/stores/constant/cacheKey'

const config = useConfig()
const siteConfig = useSiteConfig()

const onMenuCollapse = function () {
    if (config.layout.shrink && !config.layout.menuCollapse) {
        closeShade()
    }

    config.setLayout('menuCollapse', !config.layout.menuCollapse)

    Session.set(BEFORE_RESIZE_LAYOUT, {
        layoutMode: config.layout.layoutMode,
        menuCollapse: config.layout.menuCollapse,
    })
}
</script>

<style scoped lang="scss">
.layout-logo {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    background: v-bind('config.layout.layoutMode != "Streamline" ?  config.getColorVal("menuTopBarBackground"):"transparent"');
    
    // 设置logo的颜色
    // background-color: rgb(239, 77, 218);
}
.logo-img {
    width: 40px;
}
.website-name {
    padding-left: 4px;
    font-size: var(--el-font-size-large);
    font-weight: 600;
}
.fold {
    margin-left: auto;
}
.unfold {
    margin: 0 auto;
}
</style>
