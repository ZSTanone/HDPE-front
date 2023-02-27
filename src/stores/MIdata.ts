/*
 * @Author: zwj
 * @Date: 2022-12-19 20:42:20
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-20 13:21:26
 * @Description: 
 */
import { defineStore } from 'pinia'
import { MIData } from '/@/stores/interface'

export const useMIData = defineStore('MIData', {
    state: (): MIData => {
        return {
            predict: {
                'time': '',
                'value': 0
            },
            real: {
                'time': '',
                'value': null
            },
        }
    },
    getters:{
        getValue:(state) => [state.predict, state.real],
    },
    actions: {
        dataFill(state: MIData) {
            this.$state = { ...this.$state, ...state }
        }, 
    },
})