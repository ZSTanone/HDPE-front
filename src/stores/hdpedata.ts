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
            time: '',

            FC41058: 3.141,
            FC41053: 3.141,
            FC41049: 3.141,
            FC30253: 3.141,
            FC30493: 3.141,
            FC41048: 3.141,

            FC42058: 1.414,
            FC42053: 1.414,
            FC42049: 1.414,
            FC30486: 1.414,
            FC42048: 50.414,

            Yield: 100.712,
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
