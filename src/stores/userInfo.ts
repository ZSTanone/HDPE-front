/*
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 10:31:34
 * @LastEditTime: 2022-10-28 11:26:34
 * @LastEditors: zwj
 */
import { defineStore } from 'pinia'
import { USER_INFO } from '/@/stores/constant/cacheKey'
import { UserInfo } from '/@/stores/interface'
import { postLogout } from '/@/api/frontend/user/index'
import { Local } from '/@/utils/storage'
import router from '../router'

export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfo => {
        return {
            id: 0,
            username: '',
            avatar: '',
            lastlogintime: '',
            email: '',
            mobile: '',
            token: '',
            refreshToken: '',
        }
    },
    actions: {
        removeToken() {
            this.token = ''
            this.refreshToken = ''
        },
        dataFill(state: UserInfo) {
            this.$state = state
        },
        setToken(token: string, type: 'token' | 'refreshToken') {
            this[type] = token
        },
        getToken(type: 'auth' | 'refresh' = 'auth') {
            return type === 'auth' ? this.token : this.refreshToken
        },
        logout() {
            postLogout().then((res) => {
                if (res.code == 1) {
                    Local.remove(USER_INFO)
                    router.go(0)
                }
            })
        },
    },
    persist: {
        key: USER_INFO,
    },
})
