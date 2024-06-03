<!-- 重新绘制 -->
<template>
    <div class="outer">
        <el-card class="main-card">

            <!-- <el-row>
                <el-col>
                    <el-radio-group v-model="radio" fill="#5ac2ac">
                        <el-radio-button label="R4101反应器" />
                        <el-radio-button label="R4201反应器" />
                    </el-radio-group>
                </el-col>
            </el-row> -->

            <div>
                <el-card shadow="hover" class="data-card">

                    <el-collapse v-model="activeNames">
                        <el-collapse-item name="1">

                            <template #title>
                                <!-- 使用 span 元素包裹标题，并应用自定义样式 -->
                                <span style="font-size: 25px; color: cadetblue;">模型输入信息</span>
                            </template>

                            <el-divider content-position="center">
                                <span class="title">仿真输入</span>
                            </el-divider>

                            <el-row justify="center">
                                <el-col :span="2.4">
                                    <el-table :data="Input1" stripe :row-style="{ height: '1.6vw' }"
                                        :cell-style="setCellColor" :style="Table1" :border="false"
                                        :header-cell-style="headerStyle1()">
                                        <el-table-column prop="name" label="催化剂1动力学" align="center">
                                            <el-table-column prop="description" label="说明" align="center" />
                                            <el-table-column prop="value" label="数值" align="center" />
                                            <el-table-column prop="unit" label="单位" align="center" />
                                        </el-table-column>
                                    </el-table>
                                </el-col>

                                <el-col :span="2.4">
                                    <el-table :data="Input2" stripe :row-style="{ height: '1.6vw' }"
                                        :cell-style="setCellColor" :style="Table1" :border="false"
                                        :header-cell-style="headerStyle1()">
                                        <el-table-column prop="name" label="催化剂2动力学" align="center">
                                            <el-table-column prop="description" label="说明" align="center" />
                                            <el-table-column prop="value" label="数值" align="center" />
                                            <el-table-column prop="unit" label="单位" align="center" />
                                        </el-table-column>
                                    </el-table>
                                </el-col>

                                <el-col :span="2.4">
                                    <el-table :data="Input3" stripe :row-style="{ height: '1.6vw' }"
                                        :cell-style="setCellColor" :style="Table1" :border="false"
                                        :header-cell-style="headerStyle1()">
                                        <el-table-column prop="name" label="反应工艺" align="center">
                                            <el-table-column prop="description" label="说明" align="center" />
                                            <el-table-column prop="value" label="数值" align="center" />
                                            <el-table-column prop="unit" label="单位" align="center" />
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>

                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template #title>
                                <!-- 使用 span 元素包裹标题，并应用自定义样式 -->
                                <span style="font-size: 25px; color: cadetblue;">运行日志</span>
                            </template>
                        </el-collapse-item>
                    </el-collapse>

                    <!-- <el-divider content-position="center">
                        <span class="title">仿真输入</span>
                    </el-divider>

                    <el-row justify="center">
                        <el-col :span="2.4">
                            <el-table :data="Input1" stripe :row-style="{ height: '1.6vw' }" :cell-style="setCellColor"
                                :style="Table1" :border="false" :header-cell-style="headerStyle1()">
                                <el-table-column prop="name" label="催化剂1动力学" align="center">
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>

                        <el-col :span="2.4">
                            <el-table :data="Input2" stripe :row-style="{ height: '1.6vw' }" :cell-style="setCellColor"
                                :style="Table1" :border="false" :header-cell-style="headerStyle1()">
                                <el-table-column prop="name" label="催化剂2动力学" align="center">
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>

                        <el-col :span="2.4">
                            <el-table :data="Input3" stripe :row-style="{ height: '1.6vw' }" :cell-style="setCellColor"
                                :style="Table1" :border="false" :header-cell-style="headerStyle1()">
                                <el-table-column prop="name" label="反应工艺" align="center">
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row> -->

                    <el-divider content-position="center">
                        <span class="title">模拟结果</span>
                    </el-divider>

                    <el-row justify="center">
                        <el-col :span="2.4">
                            <el-table :data="R4101Res" stripe :row-style="{ height: '1.6vw' }"
                                :cell-style="setCellColor" :style="Table2" :border="false"
                                :header-cell-style="headerStyle2()">
                                <el-table-column prop="name" label="仿真模拟结果" align="center">
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>

                    <el-row style="margin: 2vw 0" justify="space-around">
                        <el-col :span="1.9" class="lg-mb-20" :offset="0">
                            <el-card shadow="hover" class="diy_card">
                                <div class="chart" :ref="chartRefs.set"></div>
                            </el-card>
                        </el-col>

                        <el-col :span="1.9" class="lg-mb-20" :offset="0">
                            <el-card shadow="hover" class="diy_card">
                                <div class="chart" :ref="chartRefs.set"></div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </div>

            <!-- <div v-show="radio === 'R4201反应器'">
                <el-card shadow="hover" class="data-card">
                    <span>card2</span>
                </el-card>
            </div> -->
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, Ref, watch, toRaw, onActivated, onUnmounted, onBeforeMount, CSSProperties, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core'

import { useSimPara } from '/@/stores/SimPara'
import { storeToRefs } from 'pinia'
import { reduce } from 'lodash'

import { useMomentsdata } from "/@/stores/moments";

const SimPara = useSimPara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048 } = storeToRefs(SimPara)

// new
const parameters = useMomentsdata()
const { C, S0, M, H2, B, kiA1, kiB1, kpA1, kpB1, ktb1, kth1, kd1, kCSA1, kCSA01, submit,
    kiA2, kiB2, kpA2, kpB2, ktb2, kth2, kd2, kCSA2, kCSA02
} = storeToRefs(parameters)



const chartRefs = useTemplateRefsList<HTMLDivElement>()
const FigName = ['分子量分布曲线', '短支链分布曲线']
const state: {
    charts: any[] // 保存的是图表实例
} = reactive({
    charts: [],
})

const R4101Res = reactive([
    {
        axis: 'T1_1',
        description: '重均分子量',
        value: 15.83,
        unit: 'kg/mol',
    },
    {
        axis: 'T1_2',
        description: '多分散性指数',
        value: 2.16,
        unit: '',
    },
    {
        axis: 'T1_3',
        description: '熔融指数',
        value: 13.26,
        unit: 'g/10min',
    },
])


const Input1 = reactive([
    {
        description: '单体 链引发速率常数kiA1',
        value: kiA1,
        unit: 'mol/(L*s)',
    },
    {
        description: '共聚单体 链引发速率常数kiB1',
        value: kiB1,
        unit: 'mol/(L*s)',
    },
    {
        description: '单体 链增长速率常数kpA1',
        value: kpA1,
        unit: 'mol/(L*s)'
    },
    {
        description: '共聚单体 链增长速率常数kpB1',
        value: kpB1,
        unit: 'mol/(L*s)'
    },
    {
        description: 'β氢气消除速率常数ktβ1',
        value: ktb1,
        unit: '/s',
    },
    {
        description: '向氢气转移速率常数kth1',
        value: kth1,
        unit: 'mol/(L*s)',
    },
    {
        description: '链失活速率常数kd1',
        value: kd1,
        unit: '/s',
    },
    {
        description: '链转移速率常数kCSA01',
        value: kCSA01,
        unit: 'mol/(L*s)',
    },
    {
        description: '向休眠链转移速率常数kCSA1',
        value: kCSA1,
        unit: 'mol/(L*s)',
    },
])

const Input2 = reactive([
    {
        description: '单体 链引发速率常数kiA2',
        value: kiA2,
        unit: 'mol/(L*s)',
    },
    {
        description: '共聚单体 链引发速率常数kiB2',
        value: kiB2,
        unit: 'mol/(L*s)',
    },
    {
        description: '单体 链增长速率常数kpA2',
        value: kpA2,
        unit: 'mol/(L*s)'
    },
    {
        description: '共聚单体 链增长速率常数kpB2',
        value: kpB2,
        unit: 'mol/(L*s)'
    },
    {
        description: 'β氢气消除速率常数ktβ2',
        value: ktb2,
        unit: '/s',
    },
    {
        description: '氢气转移速率常数kth2',
        value: kth2,
        unit: 'mol/(L*s)',
    },
    {
        description: '链失活速率常数kd2',
        value: kd2,
        unit: '/s',
    },
    {
        description: '链转移速率常数kCSA02',
        value: kCSA02,
        unit: 'mol/(L*s)',
    },
    {
        description: '向休眠链转移速率常数kCSA2',
        value: kCSA2,
        unit: 'mol/(L*s)',
    },
])

const Input3 = reactive([
    {
        description: '乙烯',
        value: M,
        unit: 'mol/L',
    },
    {
        description: '1-辛烯',
        value: B,
        unit: 'mol/L',
    },
    {
        description: '氢气',
        value: H2,
        unit: 'mol/L',
    },
    {
        description: '催化剂',
        value: C,
        unit: 'mol/L',
    },
    {
        description: '链穿梭剂',
        value: S0,
        unit: 'mol/L',
    },
])




// 表格样式
const Table1 = {
    width: '30vw',
    'margin-left': '100px',
    'margin-right': '100px',
    'margin-bottom': '50px',
    'margin-top': '50px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    'background-color': '#ffffff', // 设置表格背景颜色
}

const Table2 = {
    width: '30vw',
    'margin-top': '20px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    'background-color': '#ffffff', // 设置表格背景颜色
}

interface cellstyle {
    row: {
        property: string
    }
    column: {
        property: string
    }
}

// 设置表格中指定内容的字体样式
const setCellColor = ({ row, column }: cellstyle): CSSProperties => {
    if (column.property === 'value') {
        return { color: '#c69363', 'font-weight': 'bold', 'font-size': '15px', padding: '3px 3px' }
    } else {
        return { 'font-size': '15px', padding: '3px 3px' }
    }
}

const headerStyle1 = (): CSSProperties => {
    return {
        background: '#a5ae94',
        opacity: '1',
        height: '1.8vw',
        'font-weight': 'bold',
        'font-size': '20px',
        padding: '3px 3px',
        color: '#ffffff',
        border: '0px',
    }
}

const headerStyle2 = (): CSSProperties => {
    return {
        background: '#89ade2',
        opacity: '1',
        height: '1.8vw',
        'font-weight': 'bold',
        'font-size': '20px',
        padding: '3px 3px',
        color: '#ffffff',
        border: '0px',
    }
}

// 控制下拉框
const activeNames = ref(['1'])



//图表绘制2023.12.22
// 计算MWD曲线上的点
const mwd1: any = [];
const rn1 = 640   //平均链长
const k1 = 1 / rn1;  //系数τ
const MW = 54.2  // 聚合物平均摩尔质量
for (let r = 1; r <= rn1 * 11; r = r + 50) {
    const logR = Math.log10(r * MW);
    const y = 2.3026 * Math.pow(r, 2) * Math.pow(k1, 2) * Math.exp(-r * k1);
    mwd1.push([logR, y]);
}

// 计算短支链分布
let scb1: any = []
// const F1 = 0.1

// const nc = 8 //共聚单体 1-辛烯的碳原子数为8

// for (let r = 1; r <= rn1 * 8; r = r + 50) {
//     const logR = Math.log10(r * MW);
//     const y = 1000 * F1 / (2 + (nc - 2) * F1);
//     scb1.push([logR, y]);
// }

scb1 = [[1.8,60],[2,52],[2.2,50],[2.4,47],[2.6,45],[2.8,44],[3,43],[3.2,40],[3.4,38],[3.8,31],[4,28],[4.2,26],[4.4,24],[4.6,23.5],[4.8,23],[5,22],[5.2,20.5]]

const initMWDChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: FigName[chartLable],
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
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            min: 1.0, // 起始
            max: 6.0,
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
                data: mwd1,
                symbol: 'emptyCircle',
                symbolSize: 4,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: 'red'
                },
                itemStyle: {
                    color: 'red'  // 修改点的颜色为红色
                }
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
            text: FigName[chartLable],
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
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            min: 1.0, // 起始
            max: 6.0,
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
            name: 'SCB/1000C',
            max: 80,
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
                data: scb1,
                symbol: 'emptyCircle',
                symbolSize: 4,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: 'green'  //连接线颜色
                },
                itemStyle: {
                    color: 'green'  // 修改点的颜色为红色
                }
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

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

onMounted(() => {
    nextTick(() => {

        initMWDChart(0)
        initSCBChart(1)

        window.addEventListener('resize', echartsResize)
    })
})
</script>

<style scoped lang="scss">
.outer {
    width: 100%;
    height: 110%;
    padding-top: 50px;
    background-color: #eff7ff;

    display: flex;
    justify-content: center;
    // align-items: center;

    .main-card {
        width: 95%;
        height: 110%;
        background-color: #a5cfff;

        .data-card {
            width: 95%;
            margin: 1vh auto;
            padding-top: 1vw;
            // height: 600px;

            .title {
                font-size: 1.2vw;
                font-weight: bold;
                color: #0869bf;
            }

            .diy_card {
                width: 0.9 * 25vw;

                background: linear-gradient(to left, #1b65f0, #1b65f0) left top no-repeat,
                    linear-gradient(to bottom, #1b65f0, #1b65f0) left top no-repeat, linear-gradient(to left, #1b65f0, #1b65f0) right top no-repeat,
                    linear-gradient(to bottom, #1b65f0, #1b65f0) right top no-repeat, linear-gradient(to left, #1b65f0, #1b65f0) left bottom no-repeat,
                    linear-gradient(to bottom, #1b65f0, #1b65f0) left bottom no-repeat,
                    linear-gradient(to left, #1b65f0, #1b65f0) right bottom no-repeat,
                    linear-gradient(to left, #1b65f0, #1b65f0) right bottom no-repeat;
                background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
                background-color: #e8e8e86f;
                // border: 2px solid #95beff;
            }

            .chart {
                height: 0.9 * 9 * 1.5vw;
                width: 0.9 * 16 * 1.5vw;
                // background-color: antiquewhite;
            }
        }
    }
}

// 强行修改斑马纹会导致hover效果被覆盖，不建议
// :deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
// 	background: #fefefe;
// }</style>
