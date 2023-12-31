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

            <div v-show="radio === 'R4101反应器'">
                <el-card shadow="hover" class="data-card">

                    <el-divider content-position="center">
                        <span class="title">仿真输入</span>
                    </el-divider>

                    <el-row justify="center">
                        <el-col :span="2.4">
                            <el-table
                                :data="R4101In"
                                stripe
                                :row-style="{ height: '1.6vw' }"
                                :cell-style="setCellColor"
                                :style="Table1"
                                :border="false"
                                :header-cell-style="headerStyle1()"
                            >
                                <el-table-column prop="name" label="R4101环管反应器进料" align="center">
                                    <el-table-column prop="point" label="位点" align="center" />
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>

                        <el-col :span="2.4">
                            <el-table
                                :data="R4201In"
                                stripe
                                :row-style="{ height: '1.6vw' }"
                                :cell-style="setCellColor"
                                :style="Table1"
                                :border="false"
                                :header-cell-style="headerStyle1()"
                            >
                                <el-table-column prop="name" label="R4201环管反应器进料" align="center">
                                    <el-table-column prop="point" label="位点" align="center" />
                                    <el-table-column prop="description" label="说明" align="center" />
                                    <el-table-column prop="value" label="数值" align="center" />
                                    <el-table-column prop="unit" label="单位" align="center" />
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>

                    <el-divider content-position="center">
                        <span class="title">模拟结果</span>
                    </el-divider>

                    <el-row justify="center">
                        <el-col :span="2.4">
                            <el-table
                                :data="R4101Res"
                                stripe
                                :row-style="{ height: '1.6vw' }"
                                :cell-style="setCellColor"
                                :style="Table2"
                                :border="false"
                                :header-cell-style="headerStyle2()"
                            >
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

const SimPara = useSimPara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048 } = storeToRefs(SimPara)

const radio = ref('R4101反应器')
const chartRefs = useTemplateRefsList<HTMLDivElement>()
const FigName = ['模拟稳态MWD曲线', '模拟稳态CCD曲线']
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

const R4101In = reactive([
    {
        point: 'FC41058',
        description: '乙烯进料',
        value: FC41058,
        unit: 'kg/h',
    },
    {
        point: 'FC41053',
        description: '氢气进料',
        value: FC41053,
        unit: 'kg/h',
    },
    {
        point: 'FC41049',
        description: '己烯进料',
        value: FC41049,
        unit: 'kg/h',
    },
    {
        point: 'FC30493',
        description: '助催化剂进料',
        value: FC30493,
        unit: 'kg/h',
    },
    {
        point: 'FC30253',
        description: '催化剂进料',
        value: FC30253,
        unit: 'kg/h',
    },
    {
        point: 'FC41048',
        description: '异丁烷进料',
        value: FC41048,
        unit: 'kg/h',
    },
])

const R4201In = reactive([
    {
        point: 'FC42058',
        description: '乙烯进料',
        value: FC42058,
        unit: 'kg/h',
    },
    {
        point: 'FC42053',
        description: '氢气进料',
        value: FC42053,
        unit: 'kg/h',
    },
    {
        point: 'FC42049',
        description: '己烯进料',
        value: FC42049,
        unit: 'kg/h',
    },
    {
        point: 'FC30486',
        description: '助催化剂进料',
        value: FC30486,
        unit: 'kg/h',
    },
    {
        point: 'FC42048',
        description: '异丁烷进料',
        value: FC42048,
        unit: 'kg/h',
    },
    {
        point: '',
        description: '',
        value:'',
        unit: '',
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

//图表绘制2023.12.22
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
const F1 = 0.1  

const nc = 8 //共聚单体 1-辛烯的碳原子数为8

for (let r = 1; r <= rn1 * 8; r=r+50) {
    const logR = Math.log10(r * MW);
    const y = 1000*F1 / (2+(nc-2)*F1);
    scb1.push([logR, y]);
}

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
// }
</style>
