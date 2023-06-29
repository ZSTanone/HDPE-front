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
import { useTemplateRefsList } from '@vueuse/core'
import { table } from 'console'
import * as echarts from 'echarts'
import { computed, nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, toRaw, watch } from 'vue'

const props = defineProps<{
    indicator: string
}>()

const dateValue1 = ref<[Date, Date]>([new Date(2021, 10, 10, 10, 10), new Date(2021, 10, 11, 10, 10)])
const dateValue2 = ref<Date>(new Date(2021, 10, 27, 10, 10))
const chartRefs = useTemplateRefsList<HTMLDivElement>()
const tablename = ['R4101产量', 'R4101 Mw', 'R4101环管密度', 'R4101 MI', 'R4101 MWD', 'R4101 CCD']

const state: {
    charts: any[]
} = {
    charts: [],
}

const getData = () => {
    console.log('获取数据')
}

const initChart = (chartLable: number) => {
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            name: '单位',
            // splitLine: {
            //     show: true
            // }
        },
        // series数组中有几个对象就有几条曲线
        series: [{ name: 'prev', data: [620, 832, 855, 900, 1222, 1350, 920], type: 'line', smooth: true }],
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
        for (let i = 0; i < chartRefs.value.length; i++) {
            initChart(i)
            if (i > 3) {
                toRaw(state.charts[i]).setOption({
                    // 更新该点位的数据
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
                    series: [
                        {
                            name: 'prev',
                            data: [620, 832, 855, 888, 1222, 666, 920],
                            type: 'line',
                            smooth: true,
                        },
                        {
                            name: 'now',
                            data: [520, 632, 755, 48, 622, 650, 820],
                            type: 'line',
                            smooth: true,
                        },
                        {
                            name: 'next',
                            data: [100, 300, 500, 600, 800, 400, 900],
                            type: 'line',
                            smooth: true,
                        },
                    ],
                })
            }
        }
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
