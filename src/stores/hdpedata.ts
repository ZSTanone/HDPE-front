import { defineStore } from 'pinia'
import { HDPEdata } from './interface'

// 这个状态仓库用于主页面的数据查询

export const useHDPEdata = defineStore('HDPEdata', {
    state: (): HDPEdata => {
        return {
            // 默认的查询时间以及时间戳（毫秒计时 * 1000）
            timeset: 60,
            timestamps: 60 * 1000,

            id: 0,
            time: '0',

            FC41058: 28870,
            FC41053: 13.66,
            FC41049: 368,
            FC30253: 125.5,
            FC30493: 1.145,
            FC41048: 25520,

            FC42058: 28841,
            FC42053: 19.63,
            FC42049: 330,
            FC30486: 1.026,
            FC42048: 27060,

            Yield: 73740.26,
        }
    },
    getters: {

    },
    actions: {
        // 更新当前状态
        dataFill(state: HDPEdata) {
            this.$state = { ...this.$state, ...state }
        },
        // 以对象形式返回当前状态
        tobject() {
            return { ...this.$state }
        },
    },
})
