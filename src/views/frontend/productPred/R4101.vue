<template>
    <div v-show="indicator === '宏观质量指标'" class="outer">
        <el-row justify="center" class="block">
            <el-col :span="2.9" style="margin-right: 20px" :offset="-2">
                <el-date-picker
                    v-model="dateValue1"
                    style="font-size: 12px"
                    size="large"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="截止日期"
                />
            </el-col>
            <el-col :span="1.9" style="margin-right: 10px">
                <el-tooltip content="获取历史数据" placement="top">
                    <el-button type="success" size="large" @click="getData()" style="font-size: 16px"> 查询 </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>

            <el-col :span="1.9" class="lg-mb-20" :offset="1">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>

            <el-col :span="1.9" class="lg-mb-20" :offset="1">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>

    <div v-show="indicator === '微观质量指标'" class="outer">
        <el-row justify="center" class="block">
            <el-col :span="2.9" style="margin-right: 20px" :offset="-2">
                <el-date-picker v-model="dateValue2" size="large" type="datetime" placeholder="Select date and time" />
            </el-col>
            <el-col :span="1.9" style="margin-right: 10px">
                <el-tooltip content="获取历史数据" placement="top">
                    <el-button type="success" size="large" @click="getData()" style="font-size: 16px"> 查询 </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>

            <el-col :span="1.9" class="lg-mb-20" :offset="1">
                <el-card shadow="hover" class="diy_card">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { until, useTemplateRefsList } from '@vueuse/core'
import { table } from 'console'
import * as echarts from 'echarts'
import { computed, nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, toRaw, watch } from 'vue'

const props = defineProps<{
    indicator: string
}>()

const dateValue1 = ref<[Date, Date]>([new Date(2021, 10, 10, 10, 10), new Date(2021, 10, 11, 10, 10)])
const dateValue2 = ref<Date>(new Date(2021, 10, 27, 10, 10))
const chartRefs = useTemplateRefsList<HTMLDivElement>()
const tablename = ['R4101产量', 'R4101 Mw', 'R4101环管密度', 'R4101 MI', 'R4101 分子量分布', 'R4101 短支链分布']

const state: {
    charts: any[]
} = {
    charts: [],
}

const getData = () => {
    console.log('获取数据')
}

const yeild = [
    44302.47, 43147.82, 42149.12, 43899.64, 42818.24, 42829.63,
    44343.65, 42922.49, 43111.93, 42280.72, 44061.33, 42173.59,
    43934.18, 44136.23, 42653.92, 43110.87, 44044.97, 41887.27,
    42967.59, 42623.84, 43688.17, 43847.05, 43908.86, 43691.65
];
const Mw = [
    149540, 142845, 150677, 160153, 144926, 160222,
    153098, 140346, 146982, 152567, 149335, 145586,
    151375, 146831, 156270, 157227, 152743, 146848,
    146196, 152763, 157341, 148015, 148793, 159573
];
const MI = [
    31.12, 29.17, 29.35, 28.67, 31.01, 31.56,
    28.93, 30.32, 28.86, 29.80, 30.36, 28.92,
    29.32, 31.22, 29.90, 30.70, 31.19, 29.80,
    29.57, 29.86, 31.14, 31.45, 30.28, 28.88
];
const density = [
    569.6, 574.1, 573.9, 561.5, 570.1, 581.7,
    566.3, 579.2, 575.7, 562.6, 565.2, 577.4,
    580.0, 569.5, 566.8, 570.5, 576.9, 562.3,
    561.8, 576.5, 580.0, 562.8, 571.3, 568.7
];

// 计算MWD曲线上的点
const mwd1:any = [];
const rn1 = 640   //平均链长
const k1 = 1/rn1;  //系数τ
const MW = 54.2  // 聚合物平均摩尔质量
for (let r = 1; r <= rn1 * 11; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k1, 2) * Math.exp(-r * k1);
    mwd1.push([logR, y]);
}

// 计算短支链分布
const scb1:any = []
/*平均共聚单体含量：一般来说，共聚反应的初期，共聚单体的浓度较高，因此平均含量可能较高。
随着反应的进行，共聚单体逐渐被聚合到聚合物链上，平均含量可能会有所下降。*/
const F1 = 0.1  
// 尽量将F1改写为一个关于链长的减函数

const nc = 8 //共聚单体 1-辛烯的碳原子数为8

for (let r = 1; r <= rn1 * 8; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 1000*F1 / (2+(nc-2)*F1);
    scb1.push([logR, y]);
}

const mwd2:any = [];
const rn2 = 726
const k2 = 1/rn2;
for (let r = 1; r <= rn2 * 10; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k2, 2) * Math.exp(-r * k2);
    mwd2.push([logR, y]);
}
const scb2:any = []
const F2 = 0.083  

for (let r = 2; r <= rn2 * 10; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 1000*F2 / (2+(nc-2)*F2);
    scb2.push([logR, y]);
}

const mwd3:any = [];
const rn3 = 789
const k3 = 1/rn3;
for (let r = 1; r <= rn3 * 10; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k3, 2) * Math.exp(-r * k3);
    mwd3.push([logR, y]);
}

const scb3:any = []
const F3 = 0.075  

for (let r = 10; r <= rn3 * 10; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 1000*F3 / (2+(nc-2)*F3);
    scb3.push([logR, y]);
}



let unit = ['单位:kg/h','','单位:kg/m3','单位:g/10min']

//宏观质量指标图
const initChart = (chartLable: number,data: Array<any>) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: tablename[chartLable],
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left',
            },
        },

        xAxis: {
            type: 'category',
            name: '时间',
            data: [
                '0:00', '1:00', '2:00', '3:00', '4:00', '5:00',
                '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
            ],
        },
        yAxis: {
            type: 'value',
            name: unit[chartLable],
            // splitLine: {
            //     show: true
            // }
        },
        // series数组中有几个对象就有几条曲线
        series: [
            { 
                // name: 'prev', 
                data: data, 
                type: 'line', 
                smooth: true 
            }
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}


// 画mwd
const initMWDChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: tablename[chartLable],
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
            data: ['prev', 'now', 'next'],
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
                name: 'prev',
                data: mwd1,
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'now',
                data: mwd2,
                symbol: 'circle',
                symbolSize: 4,
                type: 'line',
                smooth: true
            },
            {
                name: 'next',
                data: mwd3,
                symbol: 'circle',
                symbolSize: 4,
                type: 'line',
                smooth: true
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

// 画SCBD
const initSCBChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: tablename[chartLable],
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
            data: ['prev', 'now', 'next'],
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
                name: 'prev',
                data: scb1,
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'now',
                data: scb2,
                symbol: 'circle',
                symbolSize: 4,
                type: 'line',
                smooth: true
            },
            {
                name: 'next',
                data: scb3,
                symbol: 'circle',
                symbolSize: 4,
                type: 'line',
                smooth: true
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

// watch(
//     () => props.indicator,
//     () => {
//         if (props.indicator === 'marco') {

//             for (let i = 0; i < 4; i++) {
//                 toRaw(state.charts[i]).setOption({
//                     series: [
//                         {
//                             data: [820, 932, 901, 934, 1290, 1330, 1320],
//                             type: 'line',
//                             smooth: true
//                         },
//                         {
//                             data: [620, 832, 855, 900, 1222, 1350, 920],
//                             type: 'line',
//                             smooth: true
//                         }
//                     ]
//                 })
//             }

//         }
//         if (props.indicator === 'micro') {
//             for (let i = 4; i < 6; i++) {
//                 toRaw(state.charts[i]).setOption({
//                     series: [
//                         {
//                             data: [820, 932, 901, 934, 1290, 1330, 1320],
//                             type: 'line',
//                             smooth: true
//                         },
//                         {
//                             data: [620, 832, 855, 900, 1222, 1350, 920],
//                             type: 'line',
//                             smooth: true
//                         }
//                     ]
//                 })
//             }
//         }
//     })

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

// 此处更改初始化的编号
onMounted(() => {
    nextTick(() => {
        initChart(0, yeild)
        initChart(1, Mw)
        initChart(2, density)
        initChart(3, MI)
        initMWDChart(4)
        // initMWDChart(5)
        initSCBChart(5)
        // for (let i = 4; i < chartRefs.value.length; i++) {
        //     initChart(i, [])
        //     // i=4 画分子量分布图 MWD
        //     if (i = 4) {
        //         toRaw(state.charts[i]).setOption({
        //             // 更新该点位的数据
        //             legend: {
        //                 align: 'left',
        //                 orient: 'horizontal',
        //                 top: 30,
        //                 textStyle: {
        //                     fontSize: 12, //字体大小
        //                     fontWeight: 500,
        //                 },
        //                 // 图例的名称
        //                 data: ['prev', 'now', 'next'],
        //             },
        //             xAxis: {
        //                 type: 'value',
        //                 name: 'logMw',
        //                 min: 1.0, // 起始
        //                 max: 5.0,
        //                 nameTextStyle: {
        //                     fontSize: 18,
        //                     fontWeight: 'bold',
        //                     padding: [10, 0, 0, 0]
        //                 },
        //                 nameRotate: '0',
        //                 nameLocation: 'center',
        //                 splitLine: {
        //                     show: false
        //                 }
        //             },
        //             yAxis: {
        //                 type: 'value',
        //                 name: 'dw',
        //                 boundaryGap: ['0%', '20%'],
        //                 nameTextStyle: {
        //                     fontSize: 18,
        //                     fontWeight: 'bold',
        //                     padding: [0, 0, 15, 0]
        //                 },
        //                 nameRotate: '90',
        //                 nameLocation: 'center',
        //                 splitLine: {
        //                     show: true,
        //                     lineStyle: {
        //                         color: '#C6C6C6FF', // 修改网格线颜色
        //                         type: 'dashed', //网格线的类型
        //                         width: 1,
        //                     }
        //                 },
        //             },
        //             series: [
        //                 {
        //                     name: 'prev',
        //                     data: mwd1,
        //                     symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
        //                     symbolSize: 4,    //小圆点的大小
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //                 {
        //                     name: 'now',
        //                     data: mwd2,
        //                     symbol: 'circle',
        //                     symbolSize: 4,
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //                 {
        //                     name: 'next',
        //                     data: mwd3,
        //                     symbol: 'circle',
        //                     symbolSize: 4,
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //             ],
        //         })
        //     }
        //     // i=5 短支链分布图 SCBD  
        //     if (i = 5) {
        //         toRaw(state.charts[i]).setOption({
        //             // 更新该点位的数据
        //             legend: {
        //                 align: 'left',
        //                 orient: 'horizontal',
        //                 top: 30,
        //                 textStyle: {
        //                     fontSize: 12, //字体大小
        //                     fontWeight: 500,
        //                 },
        //                 // 图例的名称
        //                 data: ['prev', 'now', 'next'],
        //             },
        //             xAxis: {
        //                 type: 'value',
        //                 name: 'logMw',
        //                 min: 1.0, // 起始
        //                 max: 5.0,
        //                 nameTextStyle: {
        //                     fontSize: 18,
        //                     fontWeight: 'bold',
        //                     padding: [10, 0, 0, 0]
        //                 },
        //                 nameRotate: '0',
        //                 nameLocation: 'center',
        //                 splitLine: {
        //                     show: false
        //                 }
        //             },
        //             yAxis: {
        //                 type: 'value',
        //                 name: 'dw',
        //                 boundaryGap: ['0%', '20%'],
        //                 nameTextStyle: {
        //                     fontSize: 18,
        //                     fontWeight: 'bold',
        //                     padding: [0, 0, 15, 0]
        //                 },
        //                 nameRotate: '90',
        //                 nameLocation: 'center',
        //                 splitLine: {
        //                     show: true,
        //                     lineStyle: {
        //                         color: '#C6C6C6FF', // 修改网格线颜色
        //                         type: 'dashed', //网格线的类型
        //                         width: 1,
        //                     }
        //                 },
        //             },
        //             series: [
        //                 {
        //                     name: 'prev',
        //                     data: mwd1,
        //                     symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
        //                     symbolSize: 4,    //小圆点的大小
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //                 {
        //                     name: 'now',
        //                     data: mwd2,
        //                     symbol: 'circle',
        //                     symbolSize: 4,
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //                 {
        //                     name: 'next',
        //                     data: mwd3,
        //                     symbol: 'circle',
        //                     symbolSize: 4,
        //                     type: 'line',
        //                     smooth: true
        //                 },
        //             ],
        //         })
        //     }
        // }
        window.addEventListener('resize', echartsResize)
    })
})

onBeforeMount(() => {
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
.outer {
    width: 100%;
    height: 105vh;
    background-color: #d5e3f3;

    .block {
        padding: 10px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color);
    }

    .block:last-child {
        border-right: none;
    }

    .block .demonstration {
        color: var(--el-text-color-secondary);
        font-size: 24px;
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .diy_card {
        width: 25vw;
    }

    .chart {
        height: 9 * 1.5vw;
        width: 16 * 1.5vw;
    }
}
</style>
