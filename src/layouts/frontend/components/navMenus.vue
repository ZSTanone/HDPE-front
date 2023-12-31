<template>
    <div class="nav-menus" :class="configStore.layout.layoutMode">
        <router-link class="h100" target="_blank" :title="t('home')" to="/">
            <div class="nav-menu-item">
                <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" name="el-icon-Monitor" size="18" />
            </div>
        </router-link>
        <el-dropdown
            @visible-change="onCurrentNavMenu($event, 'lang')"
            class="h100"
            size="large"
            :hide-timeout="50"
            placement="bottom"
            trigger="click"
            :hide-on-click="true"
        >
            <div class="nav-menu-item pt2" :class="state.currentNavMenu == 'lang' ? 'hover' : ''">
                <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" name="local-lang" size="18" />
            </div>
            <template #dropdown>
                <el-dropdown-menu class="dropdown-menu-box">
                    <el-dropdown-item v-for="item in configStore.lang.langArray" :key="item.name" @click="editDefaultLang(item.name)">
                        {{ item.value }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div @click="onFullScreen" class="nav-menu-item" :class="state.isFullScreen ? 'hover' : ''">
            <Icon
                :color="configStore.getColorVal('headerBarTabColor')"
                class="nav-menu-icon"
                v-if="state.isFullScreen"
                name="local-full-screen-cancel"
                size="18"
            />
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" v-else name="el-icon-FullScreen" size="18" />
        </div>
        <el-popover
            @show="onCurrentNavMenu(true, 'userInfo')"
            @hide="onCurrentNavMenu(false, 'userInfo')"
            placement="bottom-end"
            :hide-after="0"
            :width="260"
            trigger="click"
            popper-class="admin-info-box"
        >
            <template #reference>
                <div class="admin-info" :class="state.currentNavMenu == 'userInfo' ? 'hover' : ''">
                    <el-avatar :size="25" fit="fill">
                        <img :src="userInfo.avatar" alt="" />
                    </el-avatar>
                    <div class="user-name">{{ userInfo.username }}</div>
                </div>
            </template>
            <div>
                <div class="admin-info-base">
                    <el-avatar :size="70" fit="fill">
                        <img :src="userInfo.avatar" alt="" />
                    </el-avatar>
                    <div class="admin-info-other">
                        <div class="admin-info-name">{{ userInfo.username }}</div>
                        <div class="admin-info-lasttime">{{ userInfo.lastlogintime }}</div>
                    </div>
                </div>
                <div class="admin-info-footer">
                    <el-button @click="onUserInfo" type="primary" plain>{{ t('layouts.personal data') }}</el-button>
                    <el-button @click="onLogout" type="danger" plain>{{ t('layouts.cancellation') }}</el-button>
                </div>
            </div>
        </el-popover>
        <div @click="configStore.setLayout('showDrawer', true)" class="nav-menu-item">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" name="iconfont icon-shezhi" size="18" />
        </div>
        <Config />
        <TerminalVue />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { editDefaultLang } from '/@/lang'
import screenfull from 'screenfull'
import { useConfig } from '/@/stores/config'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Config from './config.vue'
import { useUserInfo } from '/@/stores/userInfo'
import { Local, Session } from '/@/utils/storage'
import { ADMIN_INFO, BA_ACCOUNT } from '/@/stores/constant/cacheKey'
import router from '/@/router'
import { routePush } from '/@/utils/router'
import { logout } from '/@/api/backend/index'
import TerminalVue from '/@/components/terminal/index.vue'

const { t } = useI18n()

const userInfo = useUserInfo()
const configStore = useConfig()

const state = reactive({
    isFullScreen: false,
    currentNavMenu: '',
    showLayoutDrawer: false,
})

const onCurrentNavMenu = (status: boolean, name: string) => {
    state.currentNavMenu = status ? name : ''
}

const onFullScreen = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning(t('layouts.Full screen is not supported'))
        return false
    }
    screenfull.toggle()
    screenfull.onchange(() => {
        state.isFullScreen = screenfull.isFullscreen
    })
}

const onUserInfo = () => {
    routePush({ name: 'routine/userInfo' })
}

const onLogout = () => {
    userInfo.logout()
}
</script>

<style scoped lang="scss">
.nav-menus.Default {
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-light);
}
.nav-menus {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: auto;
    // background-color: v-bind('configStore.getColorVal("headerBarBackground")');
    overflow: hidden;
    // background-color: rgb(255, 255, 255);
    .nav-menu-item {
        height: 100%;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .nav-menu-icon {
            box-sizing: content-box;
            color: v-bind('configStore.getColorVal("headerBarTabColor")');
        }
        &:hover {
            .icon {
                animation: twinkle 0.3s ease-in-out;
            }
        }
    }
    .admin-info {
        display: flex;
        height: 100%;
        padding: 0 10px;
        align-items: center;
        cursor: pointer;
        user-select: none;
        color: v-bind('configStore.getColorVal("headerBarTabColor")');
    }
    .user-name {
        padding-left: 6px;
        white-space: nowrap;
    }
    .nav-menu-item:hover,
    .admin-info:hover,
    .nav-menu-item.hover,
    .admin-info.hover {
        background: v-bind('configStore.getColorVal("headerBarHoverBackground")');
    }
}
.dropdown-menu-box :deep(.el-dropdown-menu__item) {
    justify-content: center;
}
.admin-info-base {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 10px;
    .admin-info-other {
        display: block;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        .admin-info-name {
            font-size: var(--el-font-size-large);
        }
    }
}
.admin-info-footer {
    padding: 10px 0;
    margin: 0 -12px -12px -12px;
    display: flex;
    justify-content: space-around;
}
.pt2 {
    padding-top: 2px;
}

@keyframes twinkle {
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
