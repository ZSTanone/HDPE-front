import { defineStore } from 'pinia'
import { SimPara } from './interface'

// 这个状态仓库用于主页面的数据查询

export const useSimPara = defineStore('SimPara', {
    state: (): SimPara => {
        return {
            // 可以在这里设置默认数据
            FC41058: 0,
            FC41053: 0,
            FC41049: 0,
            FC30253: 0,
            FC30493: 0,
            FC41048: 0,

            FC42058: 0,
            FC42053: 0,
            FC42049: 0,
            FC30486: 0,
            FC42048: 0,

            submit:false

        }
    },
    getters: {

    },
    actions: {
        // 更新当前状态
        dataFill(state: SimPara) {
            this.$state = { ...this.$state, ...state }
        },
        // 以对象形式返回当前状态
        tobject() {
            return { ...this.$state }
        },
    },
})
