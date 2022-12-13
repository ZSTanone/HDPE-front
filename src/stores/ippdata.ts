/*
 * @Author: zwj
 * @Date: 2022-11-18 15:28:51
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-12 11:23:43
 * @Description: 
 */
import { defineStore } from 'pinia'
import { Ippdata } from '/@/stores/interface'

export const useIppdata = defineStore('Ippdata', {
    state: (): Ippdata => {
        return {
            timeset: 10,
            timestamps:10*1000,
            id: 0,
            time: '',
            Output_R201_MW:[],
            Output_R202_MW:[],
            TIC221: 0,
            PIC221: 0,
            FIC141: 0,
            FIC111: 0,
            FIC121: 0,
            FIC204: 0,
            TIC241: 0,
            PIC241: 0,
            FIC201A: 0,
            FIC201B: 0,
            FIC201C: 0,
            FIC203: 0,
            FIC201: 0,
            TIC251: 0,
            PIC251: 0,
            FIC202A: 0,
            FIC202B: 0,
            FIC202C: 0,
            FIC231: 0,
            FIC202: 0,
        }
    },
    getters:{
        getMw:(state) => [state.Output_R201_MW, state.Output_R202_MW],
        getDcs:(state) => [state.TIC221, state.PIC221, state.FIC141, state.FIC111,
            state.FIC121, state.FIC204, state.TIC241, state.PIC241]
    },
    actions: {
        dataFill(state: Ippdata) {
            this.$state = { ...this.$state, ...state }
        }, 
        tobject() {
            return {...this.$state}
        },
    },
})