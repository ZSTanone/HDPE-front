/*
 * @Author: zwj
 * @Date: 2022-11-26 11:12:41
 * @LastEditors: zwj
 * @LastEditTime: 2022-11-28 20:28:51
 * @Description: 
 */
import { defineStore } from 'pinia'
import { SiteConfig } from '/@/stores/interface'

export const useSiteConfig = defineStore('siteConfig', {
    state: (): SiteConfig => {
        return {
            site_name: '',
            short_name: '',
            record_number: '',
            version: '',
            cdn_url: '',
            api_url: '',
            upload: {
                mode: 'local',
                maxsize: 0,
                mimetype: '',
                savename: '',
            },
        }
    },
    actions: {
        dataFill(state: SiteConfig) {
            this.$state = state
        },
    },
})
