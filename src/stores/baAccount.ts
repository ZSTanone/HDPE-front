/*
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 10:31:34
 * @LastEditTime: 2022-10-27 16:46:35
 * @LastEditors: zwj
 */
import { defineStore } from 'pinia'
import { BA_ACCOUNT } from '/@/stores/constant/cacheKey'
import { UserInfo } from '/@/stores/interface'
import { postLogout } from '/@/api/backend/module'
import { Local } from '/@/utils/storage'
import router from '../router'

export const useBaAccount = defineStore('baAccount', {
    state: (): UserInfo => {
        return {
            id: 0,
            username: '',
            email: '',
            mobile: '',
            lastlogintime: '',
            token: '',
            refreshToken: '',
        }
    },
    actions: {
        dataFill(state: UserInfo) {
            this.$state = state
        },
        removeToken() {
            this.token = ''
            this.refreshToken = ''
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
                    Local.remove(BA_ACCOUNT)
                    router.go(0)
                }
            })
        },
    },
    persist: {
        key: BA_ACCOUNT,
    },
})
