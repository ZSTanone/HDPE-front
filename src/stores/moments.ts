import { defineStore } from 'pinia'
import { MethodofMoments } from './interface'

// 这个状态仓库用于闪蒸装置的状态管理

export const useMomentsdata = defineStore('parameters', {
    state: (): MethodofMoments => {
        return {
            // 数据标识
            submit:false,

            //进料
            C: 0.0000008,
            S0: 0.0008,
            M: 1,
            H2: 0.05,
            B:1,
            //动力学参数
            kiA1: 10000,
            kiB1: 5000,
            kpA1: 10000,
            kpB1: 5000,
            ktb1: 5,
            kth1: 500,
            kd1:0.001,
            kCSA1: 100000,
            kCSA01: 100000,

            kiA2: 2000,
            kiB2: 100,
            kpA2: 2000,
            kpB2: 100,
            ktb2: 10,
            kth2: 50,
            kd2:0.001,
            kCSA2: 100000,
            kCSA02: 100000,

            //平均停留时间
            // st: 0,
        }
    },
    getters: {},
    actions: {
        // 更新当前状态
        dataFill(state: MethodofMoments) {
            this.$state = { ...this.$state, ...state }
        },
        // 以对象形式返回当前状态
        tobject() {
            return { ...this.$state }
        },
        getPara(){
            return { ...this.$state }
        }
    },
})
