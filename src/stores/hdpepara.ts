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
            FC41058: 28870,
            FC41053: 13.66,
            FC41049: 368,
            FC30253: 125.5,
            FC30493: 1.145,
            FC41048: 25520,

            // 密 压 温
            DI41162: 571.2,
            PI41186: 4.506,
            TI41164: 78.2,
            // 反应器2五个位点
            FC42058: 28841,
            FC42053: 19.63,
            FC42049: 330,
            FC30486: 1.026,
            FC42048: 27060,
            // 密 压 温
            DI42162: 565.0,
            PI42186: 4.436,
            TI42164: 76.8,
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
