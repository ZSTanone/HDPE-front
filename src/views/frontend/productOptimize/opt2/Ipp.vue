<template lang="">
    <el-card class="box-card" :body-style="{ width: '100%', padding: '0px', marginTop: '2ch',}" shadow="never">
        
        <el-row v-show="displayRadio==='分子量分布'" :gutter="20" style="margin-top: 4px;">
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row v-show="displayRadio==='数值指标'" :gutter="20" >
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="24">
                <div style="width: 50%; font-size: 18px; fontWeight: bold; margin: 2px auto;text-align:center;">
                    优化前后工艺操作参数对比
                </div>
                <el-table 
                    :data="ParamsTable" :row-style="{ height: '30px' }" :cell-style="setCellColor"
                    :style="largeTable" :header-cell-style="headerStyle2" :border="false">
                    <el-table-column prop="description" label="工艺参数" align="center" />

                    <el-table-column prop="name" label="R4101反应器" align="center" >
                        <el-table-column prop="R4101_H2" label="H2" align="center" />
                        <el-table-column prop="R4101_C2H4" label="C2H4" align="center" />
                        <el-table-column prop="R4101_C6H12" label="C6H12" align="center" />
                    </el-table-column>

                    <el-table-column prop="name" label="R4201反应器" align="center" >
                        <el-table-column prop="R4201_H2" label="H2" align="center" />
                        <el-table-column prop="R4201_C2H4" label="C2H4" align="center" />
                        <el-table-column prop="R4201_C6H12" label="C6H12" align="center" />
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        
        <el-row v-show="displayRadio==='数值指标'" :gutter="20" >
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="24">
                <div style="width: 50%; font-size: 18px; fontWeight: bold; margin: 2px auto; text-align:center;">
                    优化前后产量对比
                </div>
                <el-table 
                    :data="ProductionTable" :row-style="{ height: '30px' }" :cell-style="setCellColor"
                    :style="largeTable" :header-cell-style="headerStyle2" :border="false">
                    <el-table-column prop="description" label="分子量数据" align="center" />
                    <el-table-column prop="聚合物产量" label="聚合物产量  kg/h" align="center" />
                    <el-table-column prop="共聚单体含量" label="共聚单体含量  kg/h" align="center" />
                    <el-table-column prop="平均短支链" label="平均短支链" align="center" />
                    <el-table-column prop="熔融指数" label="熔融指数  g/10min" align="center" />
                    <el-table-column prop="产品密度" label="产品密度  kg/m3" align="center" />
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onActivated, onMounted, onUnmounted, onUpdated, reactive, toRaw, watch } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core';
import { usePPdata} from '/@/stores/PPdata'

const props = defineProps<{
    displayRadio: String,
}>()

const Ippdata = usePPdata()

const state: {
    charts: any[]
} = {
    charts: [],
}

const chartRefs = useTemplateRefsList<HTMLDivElement>()
let R202MWDChart_data: any[] = [[0], [0], [0]]
let R401MWDChart_data: any[] = [[0], [0], [0]]
let CopoMWDChart_data: any[] = [[0], [0], [0]]
let CCDChart_data: any[] = [[0], [0], [0]]
let ChartTitle = ['R4101分子量分布对比图', 'R4201分子量分布对比图', 'R4101短支链分布对比图', 'R4201短支链分布对比图']

// const initMWdataChart = (chartLable: number) => {
//     const MWdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
//     let option = {
//         title: {
//             text: ChartTitle[chartLable],
//             left: 'center',
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross'
//             }
//         },
//         legend: {
//             align: 'left',
//             orient: 'horizontal',
//             top: 30,
//             textStyle:{
//                 fontSize: 16,//字体大小
//                 fontWeight: 700,
//             },
//             data: ['target', 'real', 'opt'],
//         },
//         xAxis: {
//             type: 'value',
//             name: 'logMw',
//             min: 1.0, // 起始
//             max:5.0,
//             nameTextStyle: {
//                 fontSize: 18,
//                 fontWeight: 'bold',
//                 padding: [10, 0, 0, 0]
//             },
//             nameRotate: '0',
//             nameLocation: 'center',
//             splitLine: {
//                 show: false
//             }
//         },
//         yAxis: {
//             type: 'value',
//             name: 'dw',
//             boundaryGap: ['0%', '20%'],
//             nameTextStyle: {
//                 fontSize: 18,
//                 fontWeight: 'bold',
//                 padding: [0, 0, 15, 0]
//             },
//             nameRotate: '90',
//             nameLocation: 'center',
//             splitLine: {
//                 show: true,
//                 lineStyle: {
//                     color: '#C6C6C6FF', // 修改网格线颜色
//                     type: 'dashed', //网格线的类型
//                     width: 1,
//                 }
//             },
//         },
//         series: [
//             {
//                 name: 'target',
//                 data: R202MWDChart_data[0],
//                 symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
//                 symbolSize: 4,    //小圆点的大小
//                 type: 'line',
//                 smooth: true
//             },
//             {
//                 name: 'real',
//                 data: R202MWDChart_data[1],
//                 symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
//                 symbolSize: 4,    //小圆点的大小
//                 type: 'line',
//                 smooth: true
//             },
//             {
//                 name: 'opt',
//                 data: R202MWDChart_data[2],
//                 symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
//                 symbolSize: 4,    //小圆点的大小
//                 type: 'line',
//                 smooth: true
//             },
//         ]
//     }
//     MWdataChart.setOption(option)
//     state.charts.push(MWdataChart)
// }

// 计算曲线上的点
const r1_mwd1:any = [];
const rn1 = 640   //平均链长
const k1 = 1/rn1;  //系数τ
const MW = 54.2  // 聚合物平均摩尔质量
for (let r = 1; r <= rn1 * 12; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k1, 2) * Math.exp(-r * k1);
    r1_mwd1.push([logR, y]);
}

const r1_mwd2:any = [];
const rn2 = 680   //平均链长
const k2 = 1/rn2;  //系数τ
const MW2 = 62.3  // 聚合物平均摩尔质量
for (let r = 1; r <= rn2 * 12; r=r+50) {
    const logR = Math.log10(r * MW2);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k2, 2) * Math.exp(-r * k2);
    r1_mwd2.push([logR, y]);
}

const r1_scb1:any = []
const F1 = 0.1  
const nc = 8 //共聚单体 1-辛烯的碳原子数为8
for (let r = 1; r <= rn1 * 9; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 1000*F1 / (2+(nc-2)*F1);
    r1_scb1.push([logR, y]);
}

const r1_scb2:any = []
const F2 = 0.086  
for (let r = 1; r <= rn1 * 9; r=r+50) {
    const logR = Math.log10(r * MW2);
    const y = 1000*F2 / (2+(nc-2)*F2);
    r1_scb2.push([logR, y]);
}


// 计算曲线上的点
const r2_mwd1:any = [];
const rn3 = 663   //平均链长
const k3 = 1/rn3;  //系数τ
const MW3 = 59.3  // 聚合物平均摩尔质量
for (let r = 1; r <= rn3 * 12; r=r+50) {
    const logR = Math.log10(r * MW3);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k3, 2) * Math.exp(-r * k3);
    r2_mwd1.push([logR, y]);
}

const r2_mwd2:any = [];
const rn4 = 703   //平均链长
const k4 = 1/rn2;  //系数τ
const MW4 = 61.6  // 聚合物平均摩尔质量
for (let r = 1; r <= rn4 * 12; r=r+50) {
    const logR = Math.log10(r * MW4);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k4, 2) * Math.exp(-r * k4);
    r2_mwd2.push([logR, y]);
}

const r2_scb1:any = []
const F3 = 0.093  
for (let r = 1; r <= rn3 * 9; r=r+50) {
    const logR = Math.log10(r * MW3);
    const y = 1000*F3 / (2+(nc-2)*F3);
    r2_scb1.push([logR, y]);
}

const r2_scb2:any = []
const F4 = 0.075  
for (let r = 1; r <= rn1 * 9; r=r+50) {
    const logR = Math.log10(r * MW4);
    const y = 1000*F4 / (2+(nc-2)*F4);
    r2_scb2.push([logR, y]);
}

const initMWdataChart = (chartLable: number,data1:Array<any>,data2:Array<any>) => {
    const MWdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            text: ChartTitle[chartLable],
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            align: 'left',
            orient: 'horizontal',
            top: 30,
            textStyle:{
                fontSize: 16,//字体大小
                fontWeight: 700,
            },
            data: ['old', 'new'],
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            min: 1.0, // 起始
            max:7.0,
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [10, 0, 0, 0]
            },
            nameRotate: '0',
            nameLocation: 'center',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'dw',
            boundaryGap: ['0%', '20%'],
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [0, 0, 15, 0]
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#C6C6C6FF', // 修改网格线颜色
                    type: 'dashed', //网格线的类型
                    width: 1,
                }
            },
        },
        series: [
            {
                name: 'old',
                data: data1,
                symbol: 'emptycircle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'new',
                data: data2,
                symbol: 'emptycircle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            }
            // {
            //     name: 'real',
            //     data: R202MWDChart_data[1],
            //     symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
            //     symbolSize: 4,    //小圆点的大小
            //     type: 'line',
            //     smooth: true
            // },
            // {
            //     name: 'opt',
            //     data: R202MWDChart_data[2],
            //     symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
            //     symbolSize: 4,    //小圆点的大小
            //     type: 'line',
            //     smooth: true
            // },
        ]
    }
    MWdataChart.setOption(option)
    state.charts.push(MWdataChart)
}

// 画SCBD
const initSCBChart = (chartLable: number, data1:Array<any>,data2:Array<any>) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: ChartTitle[chartLable],
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left',
            },
        },

        legend: {
            align: 'left',
            orient: 'horizontal',
            top: 30,
            textStyle: {
                fontSize: 12, //字体大小
                fontWeight: 500,
            },
            // 图例的名称
            data: ['old', 'new'],
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            min: 1.0, // 起始
            max: 7.0,
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [10, 0, 0, 0]
            },
            nameRotate: '0',
            nameLocation: 'center',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'SCB',
            max:80,
            boundaryGap: ['0%', '20%'],
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [0, 0, 15, 0]
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#C6C6C6FF', // 修改网格线颜色
                    type: 'dashed', //网格线的类型
                    width: 1,
                }
            },
        },
        series: [
            {
                name: 'old',
                data: data1,
                symbol: 'emptycircle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'new',
                data: data2,
                symbol: 'emptycircle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

const ProductionTable = reactive([
    {
        description: '优化值',
        '聚合物产量': 42430,
        '共聚单体含量': 35621,
        '平均短支链': 20,
        '熔融指数': 1.45,
        '产品密度': 273.2,
    },
    {
        description: '当前值',
        '聚合物产量': 41362,
        '共聚单体含量': 34622,
        '平均短支链': 23,
        '熔融指数': 1.68,
        '产品密度': 285.2,
        // '聚合物产量': String(0),
        // '共聚单体含量': String(0),
        // '共聚物产量': String(0),
        // '平均短支链': String(0),
        // '熔融指数': String(0),
        // '产品密度': String(0),
    },
    {
        description: '设定值',
        '聚合物产量': 42560,
        '共聚单体含量': 35800,
        // '共聚物产量': String(0),
        '平均短支链': 18,
        '熔融指数': 1.365,
        '产品密度': 263.7,
    },
])

const ParamsTable = reactive([
    {
        description: '优化值(kg/h)',
        R4101_H2: 13.85,
        R4101_C2H4: 27625,
        R4101_C6H12: 365,
        R4201_H2: 12.56,
        R4201_C2H4: 26598,
        R4201_C6H12: 348,
    },
    {
        description: '当前值(kg/h)',
        R4101_H2: 15.62,
        R4101_C2H4: 25230,
        R4101_C6H12: 328,
        R4201_H2: 11.53,
        R4201_C2H4: 28833,
        R4201_C6H12: 366,
    },
])

watch(Ippdata, (newVal, ) => {

    let ParamsTableKeys = Object.keys(ParamsTable[0])
    ParamsTableKeys.map((item: string) => {
        if(item !== 'description' && newVal.optValue) {
            ParamsTable[0][item] = String(newVal.optValue[item] ? newVal.optValue[item] : '/').slice(0, 7)
        }
    })
    
    let ProductionTableKeys = Object.keys(ProductionTable[0])
    ProductionTableKeys.map((item: string) => {
        if (item !== 'description' && newVal.Production) {
            ProductionTable[0][item] = String(newVal.Production[item] ? newVal.Production[item] : '/').slice(0, 7)
        }
        if (item !== 'description') {
            ProductionTable[2][item] = String(newVal.targetProduction[item] ? newVal.targetProduction[item] : '/').slice(0, 7)
        }
    })
    
    let Common_X:number[]  = newVal.targetQuality.Common_X
    let CCD_X: number[] = newVal.targetQuality.CCD_X

    let R202MWD_target: number[] = newVal.targetQuality.R202MWD
    let R401MWD_target: number[] = newVal.targetQuality.R401MWD
    let CopoMWD_target: number[] = newVal.targetQuality.copoMWD
    let CCD_Y_target: number[] = newVal.targetQuality.CCD_Y

    let R202MWD_opt: number[] = newVal.optQuality.R202MWD
    let R401MWD_opt: number[] = newVal.optQuality.R401MWD
    let CopoMWD_opt: number[] = newVal.optQuality.copoMWD
    let CCD_Y_opt: number[] = newVal.optQuality.CCD_Y

    // let PlotX = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 
    //     15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 
    //     28.0, 29.0, 31.0, 35.0, 39.0, 44.0, 50.0, 56.0, 63.0, 70.0, 79.0, 89.0, 100.0, 
    //     112.0, 125.0, 141.0, 158.0, 177.0, 199.0, 223.0, 251.0, 281.0, 316.0, 354.0, 398.0, 
    //     446.0, 501.0, 562.0, 630.0, 707.0, 794.0, 891.0, 1000.0, 1122.0, 1258.0, 1412.0, 1584.0, 
    //     1778.0, 1995.0, 2238.0, 2511.0, 2818.0, 3162.0, 3548.0, 3981.0, 4466.0, 5011.0, 5623.0, 
    //     6309.0, 7079.0, 7943.0, 8912.0, 10000.0, 11220.0, 12589.0, 14125.0, 15848.0, 17782.0, 
    //     19952.0, 22387.0, 25118.0, 28183.0, 31622.0, 35481.0, 39810.0, 44668.0, 50118.0, 56234.0,
    //     63095.0, 70794.0, 79432.0, 89125.0, 100000.0]

    R202MWDChart_data[0] = R202MWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    R202MWDChart_data[2] = R202MWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    R401MWDChart_data[0] = R401MWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    R401MWDChart_data[2] = R401MWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    CopoMWDChart_data[0] = CopoMWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    CopoMWDChart_data[2] = CopoMWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    CCDChart_data[0] = CCD_Y_target?.map((item:number, index:number) => {
        return [CCD_X[index], Math.LN10*Number(item)]
    })
    CCDChart_data[2] = CCD_Y_opt?.map((item:number, index:number) => {
        return [CCD_X[index], Math.LN10*Number(item)]
    })

    // if (R202MWD_target) {
    //     R202MWDChart_data[2] = Object.values(Ippdata.opt_Output_Mw).map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
    // }

    let chartArray = [R202MWDChart_data, R401MWDChart_data, CopoMWDChart_data, CCDChart_data]
    chartArray.forEach((item: any[], index:number) => {
        toRaw(state.charts[index]).setOption({
            series: [
                {
                    name: 'target',
                    data: item[0],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
                {
                    name: 'real',
                    data: item[1],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
                {
                    name: 'opt',
                    data: item[2],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
            ]
        })
    })
}, { deep: true })


interface cellstyle {
    row: {
        property:string
    }
    column: {
        property:string
    }
}

const Table = {
    width: '95%',
    'margin': '0',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
    'border-spacing': '0',
    'border-radius': '14px',
}

const largeTable = {
    width: '95%',
    'margin': '2ch auto',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
    'border-spacing': '0',
    'border-radius': '14px',
}

const setCellColor = ( {}:cellstyle ):CSSProperties => {
    return {fontSize: '18px', padding: '0', width: '3vh', height: '5ch', backgroundColor: '#f0f8fffb',
        fontWeight: 600,
    }
}

const headerStyle1 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property !== 'name' && column?.property !== 'description') {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '15px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'R201PDIValue' ) {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '5ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

const headerStyle2 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property !== 'name' && column?.property !== 'description') {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '15px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'TEAL' 
        || (column.property as string).slice(-4) === 'C3H6') { 
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '5ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

onMounted(() => {
    initMWdataChart(0,r1_mwd1,r1_mwd2)
    initMWdataChart(1,r2_mwd1,r2_mwd2)
    initSCBChart(2,r1_scb1,r1_scb2)
    initSCBChart(3,r2_scb1,r2_scb2)
    // initMWdataChart(2)
    // initMWdataChart(3)
})

const echartsResize = () => {
    nextTick(() => {
        for (const key in state.charts) {
            state.charts[key].resize()
        }
    })
}

onActivated(() => {
    echartsResize()
})

onUnmounted(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

onUpdated(() => {
    nextTick(() => {
        echartsResize()
    })
})
</script>

<style scoped lang="scss">


.box-card {
    width: 100%;
    display: flex;
}

.chart {
    margin-top: 0px;
    width: 100%;
    height: 350px;
}
</style>