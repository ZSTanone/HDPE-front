<template>
    <div class="outer">
        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <el-checkbox-group v-model="checkboxGroup" size="large">
                    <el-checkbox-button v-for="item in items" :key="item" :label="item">
                        {{ item }}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-col>

            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <el-button type="success" size="large" @click="openSetting">优化配置详情</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4101乙烯')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4101己烷')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4101氢气')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4201乙烯')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4201己烷')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px" v-show="checkboxGroup.includes('R4201氢气')">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" id="charts" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-dialog v-model="open" width="50%" draggable style="border-radius: 1ch" center>
            <template #header>
                <h1>优化策略详情</h1>
            </template>
            <el-card :body-style="{ padding: '0px' }" shadow="never">
                <el-row>
                    <el-col :span="1.9">
                        <el-descriptions title="策略1" :column="4" size="large" border v-if="count > 0">
                            <el-descriptions-item label="旧牌号" :span="1">{{ SessionData[0].setting.oldGrade }}</el-descriptions-item>
                            <el-descriptions-item label="新牌号" :span="1">{{ SessionData[0].setting.newGrade }}</el-descriptions-item>
                            <el-descriptions-item label="更新时间" :span="3">{{ SessionData[0].updateTime }}</el-descriptions-item>
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[0] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[0] }} -- {{ SessionData[0].setting.optUb[0] }}
                            </el-descriptions-item>
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[1] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[1] }} -- {{ SessionData[0].setting.optUb[1] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[2] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[2] }} -- {{ SessionData[0].setting.optUb[2] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[3] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[3] }} -- {{ SessionData[0].setting.optUb[3] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[4] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[4] }} -- {{ SessionData[0].setting.optUb[4] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[0].setting.optVariableInput[5] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[0].setting.optLb[5] }} -- {{ SessionData[0].setting.optUb[5] }}</el-descriptions-item
                            >
                        </el-descriptions>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="1.9">
                        <el-descriptions title="策略2" :column="4" size="large" border v-if="count > 1">
                            <el-descriptions-item label="旧牌号" :span="1">{{ SessionData[1].setting.oldGrade }}</el-descriptions-item>
                            <el-descriptions-item label="新牌号" :span="1">{{ SessionData[1].setting.newGrade }}</el-descriptions-item>
                            <el-descriptions-item label="更新时间" :span="3">{{ SessionData[1].updateTime }}</el-descriptions-item>
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[0] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[0] }} -- {{ SessionData[1].setting.optUb[0] }}
                            </el-descriptions-item>
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[1] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[1] }} -- {{ SessionData[1].setting.optUb[1] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[2] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[2] }} -- {{ SessionData[1].setting.optUb[2] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[3] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[3] }} -- {{ SessionData[1].setting.optUb[3] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[4] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[4] }} -- {{ SessionData[1].setting.optUb[4] }}</el-descriptions-item
                            >
                            <el-descriptions-item label="优化变量" :span="1">{{ SessionData[1].setting.optVariableInput[5] }}</el-descriptions-item>
                            <el-descriptions-item label="变量范围" :span="1"
                                >{{ SessionData[1].setting.optLb[5] }} -- {{ SessionData[1].setting.optUb[5] }}</el-descriptions-item
                            >
                        </el-descriptions>
                    </el-col>
                </el-row>
            </el-card>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onActivated, onMounted, onUnmounted, onUpdated, reactive, toRaw, watch, ref, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core'

import { ElMessage } from 'element-plus'

const checkboxGroup = ref(['R4101乙烯'])

const items = ['R4101乙烯', 'R4101己烷', 'R4101氢气', 'R4201乙烯', 'R4201己烷', 'R4201氢气']

const open = ref(false)

// 记录个数
const count = ref()

// 读取数据
const SessionData = ref<Array<any>>([])

// 更多详情数据
const ChartData1 = ref<Array<any>>([])
const ChartData2 = ref<Array<any>>([])

// echarts
const chartRefs = useTemplateRefsList<HTMLDivElement>()

const state: {
    charts: any[]
} = {
    charts: [],
}

const tableName = ['R4101乙烯', 'R4101己烷', 'R4101氢气', 'R4201乙烯', 'R4201己烷', 'R4201氢气']

const initChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: tableName[chartLable],
        },
        legend: {
            align: 'left',
            orient: 'horizontal',
            top: 30,
            textStyle: {
                fontSize: 16, //字体大小
                fontWeight: 700,
            },
            data: ['策略1', '策略2'],
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left',
            },
            // formatter: function (params: any) {
            //     let dataStr = ''
            //     for (let i = 0; i < params.length; i++) {
            //         dataStr += '<div>' + '' + params[i].marker + params[i].seriesName + ':' + '<span style="color: #00B83F;">' + params[i].value[1] + '</span>' + '</div>';
            //     }
            //     return dataStr
            // },
        },

        xAxis: {
            type: 'category',
            name: '时间',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            name: '单位',
        },
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

// 静态数据
let data1: any = []
let data2: any = []

const initChartT = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    for (let i = 0; i < 11; i++) {
        data1.push([i, 0.5 * i * i])
        data2.push([i, 5 * i + 2])
    }
    let option = {
        title: {
            left: 'center',
            text: '静态数据',
        },
        legend: {
            align: 'left',
            orient: 'horizontal',
            top: 30,
            textStyle: {
                fontSize: 16, //字体大小
                fontWeight: 700,
            },
            data: ['策略1', '策略2'],
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left',
            },
            formatter: function (params: any) {
                let dataStr = ''
                for (let i = 0; i < params.length; i++) {
                    dataStr +=
                        '<div>' +
                        '' +
                        params[i].marker +
                        params[i].seriesName +
                        ':' +
                        '<span style="color: #00B83F;">' +
                        params[i].value[1] +
                        '</span>' +
                        '</div>'
                }
                return dataStr
            },
        },

        xAxis: {
            type: 'value',
            name: '时间',
        },
        yAxis: {
            type: 'value',
            name: '进料',
        },
        series: [
            {
                name: '策略1',
                type: 'line',
                data: data1,
                smooth: true,
            },
            {
                name: '策略2',
                type: 'line',
                data: data2,
                smooth: true,
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

const openSetting = () => {
    open.value = true
}

onBeforeMount(() => {
    SessionData.value = JSON.parse(sessionStorage.getItem('gradeSet')!)
    console.log(SessionData.value)

    if (SessionData.value) {
        // 遍历数据进行读取

        count.value = SessionData.value.length

        for (let item in SessionData.value[0].res) {
            ChartData1.value.push(SessionData.value[0].res[item])
        }
        if (SessionData.value[1]) {
            for (let item in SessionData.value[1].res) {
                ChartData2.value.push(SessionData.value[1].res[item])
            }
        }
        console.log('详细数据1', ChartData1.value)
        console.log('详细数据2', ChartData2.value)
    } else {
        // 还未进行配置
        ElMessage.error('还未进行轨迹切换参数配置')
    }
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

onMounted(() => {
    nextTick(() => {
        for (let i = 0; i < 6; i++) {
            initChart(i)
            toRaw(state.charts[i]).setOption({
                // 更新该点位的数据
                series: [
                    {
                        data: ChartData1.value[i],
                        name: '策略1',
                        type: 'line',
                        smooth: true,
                    },
                    {
                        data: ChartData2.value[i],
                        name: '策略2',
                        type: 'line',
                        smooth: true,
                    },
                ],
            })
        }

        initChartT(6)

        window.addEventListener('resize', echartsResize)
    })
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
.outer {
    width: 100%;
    height: 100%;

    .chart {
        height: 15 * 1.5vw;
        width: 50 * 1vw;
    }
}
</style>
