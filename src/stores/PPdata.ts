import { defineStore } from 'pinia'
import { PPdata } from '/@/stores/interface'

// 6.16王军优化界面的仓库
export const usePPdata = defineStore('PPdata', {
    state: (): PPdata => {
        return {
            timeset: 10, // 从后端读取Dcs数据的时间频率
            timestamps:10*1000,
            id: 0,
            time: '', // 当前DCS点位数据的测量时间
            devValue: 'Option2', // 全局选择当前反应器类型
            targetProduction: {
                '均聚物产量': 0,
                '总聚合产量': 0,
                '共聚物产量': 0,
                '总聚合乙烯含量': 0,
                '共聚乙烯含量': 0,
                'SCBaver': 0 
            },
            targetQuality: {
                'Common_X': [],
                'R202MWD': [],
                'R401MWD': [],
                'copoMWD': [],
                'CCD_X': [],
                'CCD_Y': [],
            },
            optQuality: {
                'R202MWD': [],
                'R401MWD': [],
                'copoMWD': [],
                'CCD_Y': [],
            },
            Production: {
                '均聚物产量': 0,
                '总聚合产量': 0,
                '共聚物产量': 0,
                '总聚合乙烯含量': 0,
                '共聚乙烯含量': 0,
                'SCBaver': 0,
            },
            optValue: {},
            MWW: {},
            PDI: {},
            Output_R201_MW:[],
            Output_R202_MW:[],
            Output_R401_MW:[],
            copo_MWD:[],
            WFA:[],
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
        dataFill(state: PPdata) {
            this.$state = { ...this.$state, ...state }
        },
        tobject() {
            return {...this.$state}
        },
    },
})