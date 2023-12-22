import { defineStore } from 'pinia'
import { Flash } from './interface'

// 这个状态仓库用于闪蒸装置的状态管理

export const useFlashdata = defineStore('Flash', {
    state: (): Flash => {
        return {
            id: 0,
            time : '',

            // 表格中的
            AI431581: 0.603,
            AI431581A: 0.669,
            AI431582: 3.682,
            AI431582A: 4.046,
            AI431583: 0.148,
            AI431583A: 0.16,
            AI431584: 0.003,
            AI431584A: 0.002,
            AI431585: 0.487,
            AI431585A: 0.5,
            AI431586: 0.515,
            AI431586A: 0.519,
            h2c2: 0.082,

            // 其余的
            PI43155:0.953,
            TI43161A:81.9, //degC
            LZI43166A:50.3, // %
            TI43156:81.7, // degC
            LZI43166B:29.8, //% 
            TI43152:80.4,  //degC
            PI43153:0.893, //MPa
            AI43157:86.2, //ppmv
        }
    },
    getters: {},
    actions: {
        // 更新当前状态
        dataFill(state: Flash) {
            this.$state = { ...this.$state, ...state }
        },
        // 以对象形式返回当前状态
        tobject() {
            return { ...this.$state }
        },
    },
})
