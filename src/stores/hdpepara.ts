import { defineStore } from 'pinia'
import { HDPEpara } from './interface'

// 这个状态仓库用于装置实时监控的工艺参数趋势图

export const useHDPEpara = defineStore('HDPEdata', {
    state: (): HDPEpara => {
        return {
            // 默认的查询时间以及时间戳（毫秒计时 * 1000）
            timeset: 60,
            timestamps: 60 * 1000,

            id: 0,
            time: '',

            // 反应器1 九个位点
            FC41058: 0,
            FC41053: 0,
            FC41049: 0,
            FC30253: 0,
            FC30493: 0,
            FC41048: 0,
            // 密 压 温
            DI41162: 0,
            PI41186: 0,
            TI41164: 0,
            // 反应器2五个位点
            FC42058: 0,
            FC42053: 0,
            FC42049: 0,
            FC30486: 0,
            FC42048: 0,
            // 密 压 温
            DI42162: 0,
            PI42186: 0,
            TI42164: 0,
        }
    },
    getters: {},
    actions: {
        // 更新当前状态
        dataFill(state: HDPEpara) {
            this.$state = { ...this.$state, ...state }
        },
        // 以对象形式返回当前状态
        tobject() {
            return { ...this.$state }
        },
    },
})
