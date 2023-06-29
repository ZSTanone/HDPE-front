<template>
    <div class="outer">
        <el-card class="R1-wrapper">
            <el-row style="margin: 30px 0px" justify="center">
                <el-col :span="24">
                    <h1 class="title">环管反应器工艺参数趋势图</h1>
                </el-col>
            </el-row>
            <el-row :gutter="0" style="margin-bottom: 40px" justify="space-around">
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

                <el-col :span="1.9" class="lg-mb-20" :offset="0">
                    <el-card shadow="hover" class="diy_card">
                        <div class="chart" :ref="chartRefs.set"></div>
                    </el-card>
                </el-col>
            </el-row>

            <el-row :gutter="0" style="margin-bottom: 40px" justify="space-around">
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

                <el-col :span="1.9" class="lg-mb-20" :offset="0">
                    <el-card shadow="hover" class="diy_card">
                        <div class="chart" :ref="chartRefs.set"></div>
                    </el-card>
                </el-col>
            </el-row>

            <el-row :gutter="0" style="margin-bottom: 40px" justify="space-around">
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

                <el-col :span="1.9" class="lg-mb-20" :offset="0">
                    <el-card shadow="hover" class="diy_card">
                        <div class="chart" :ref="chartRefs.set"></div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core'
import * as echarts from 'echarts'
import { reactive, computed, nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, toRaw, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useHDPEpara } from '/@/stores/hdpepara'
import { getR1Para } from '/@/api/frontend/user'

const chartRefs = useTemplateRefsList<HTMLDivElement>()
const table1name = [
    '乙烯进料',
    '氢气进料',
    '己烯进料',
    '催化剂进料',
    '助催化剂进料',
    '异丁烷进料',
    '反应器密度',
    '反应器压力',
    '反应器温度',
]
const HDPEpara = useHDPEpara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, DI41162, PI41186, TI41164 } = storeToRefs(HDPEpara)

let date = 1637933400 * 1000

const state: {
    point: string // 位点
    charts: any[] // 保存的是图表实例
    chartdata: [] // 历史数据
    postdata: object // 请求字段
} = reactive({
    point: 'FIC141',
    charts: [],
    chartdata: [],
    postdata: {
        reaction: 'Option1',
        time: new Date(1636326000 * 1000).toString(), //2021-11-08 07:00:00
        full: false,
    },
})

// 用于存放历史数据,画图
const chart_data: {
    time: any[]
    FC41058: any[]
    FC41053: any[]
    FC41049: any[]
    FC30253: any[]
    FC30493: any[]
    FC41048: any[]
    DI41162: any[]
    PI41186: any[]
    TI41164: any[]
} = {
    time: [],
    FC41058: [],
    FC41053: [],
    FC41049: [],
    FC30253: [],
    FC30493: [],
    FC41048: [],
    DI41162: [],
    PI41186: [],
    TI41164: [],
}

let sh: any
// 如果查询时间更改，需要重新设置定时器进行轮询
watch(
    () => HDPEpara.timestamps,
    () => {
        clearInterval(sh)
        sh = setInterval(() => {
            // 请求时间向后增加30min
            date += 30 * 60 * 1000
            // 更新请求负载
            state.postdata['time'] = new Date(date).toString()

            // 从后端获得位点数据，并使用dataFill（state）更新当前仓库的状态
            getR1Para('post', state.postdata).then((res) => {
                HDPEpara.dataFill(res.data)
                // console.log('更新数据');
            })
        }, HDPEpara.timestamps)
    }
)

watch(
    () => HDPEpara.id,
    () => {
        // 历史数据小于50条
        if (chart_data.FC41058.length < 50) {
            // for in 返回的是obj中的key（这里主要针对的是那些点位）
            for (let key in HDPEpara.tobject()) {
                // 这个if循环就是过滤出点位数据
                if (key in chart_data) {
                    // now变量用于保存后端返回的最新数据中的时间戳（Date.parse（）就是标准时间转时间戳）
                    let now: Date = new Date(+Date.parse(HDPEpara.tobject().time as string))
                    // 将数据以对象形式存入对应点位的数组
                    chart_data[key].push({
                        name: now.toString(),
                        value: [now, HDPEpara.tobject()[key]],
                    })
                }
            }
        } else if (chart_data.FC41058.length >= 50) {
            // 如果保存的数据大于等于50条
            for (let key in HDPEpara.tobject()) {
                if (key in chart_data) {
                    // 调用数组的shift方法，把数组的第一个元素从其中删除，其余逻辑不变
                    chart_data[key].shift()
                    let now: Date = new Date(+Date.parse(HDPEpara.tobject().time as string))
                    chart_data[key].push({
                        name: now.toString(),
                        value: [now, HDPEpara.tobject()[key]],
                    })
                }
            }
        }

        // 若我们当前打开了某个点位的图表，并且恰好后端返回数据,就会进入以下逻辑对图表数据进行更新
        if (
            state.charts.every((element) => {
                return element !== ''
            })
        ) {
            for (let i = 0; i < chartRefs.value.length; i++) {
                toRaw(state.charts[0]).setOption({
                    // 更新该点位的数据
                    series: [
                        {
                            data: chart_data[state.point],
                        },
                    ],
                })
            }
        }
    }
)

const initChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: table1name[chartLable],
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
            data: ['R4101', 'R4201'],
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
        series: [
            {
                name: 'R4101',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
            },
            {
                name: 'R4201',
                data: [620, 832, 855, 900, 1222, 1350, 920],
                type: 'line',
                smooth: true,
            },
            // {
            //     name: 'Fake Data',
            //     type: 'line',
            //     showSymbol: false,
            //     data: chart_data[state.point],
            // },
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

// 此处更改初始化的编号
onMounted(() => {
    nextTick(() => {
        for (let i = 0; i < chartRefs.value.length; i++) {
            initChart(i)
            if (i == 3) {
                toRaw(state.charts[i]).setOption({
                    legend: {
                        // 图例的名称
                        data: ['R4101'],
                    },
                    // 更新该点位的数据
                    series: [
                        {
                            name: 'R4101',
                            data: [620, 832, 855, 888, 1222, 666, 920],
                            type: 'line',
                            smooth: true,
                        },
                        {
                            name: 'R4201',
                            data: [],
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
    // height: 105vh;
    padding-top: 50px;
    background-color: #eff7ff;

    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;

    .R1-wrapper {
        width: 80vw;
        background-color: #a5cfff;
        // align-self: flex-start;

        margin-bottom: 100px;
    }

    .title {
        text-align: center;
        font-size: 1.5vw;
    }

    .diy_card {
        width: 0.9 * 25vw;
    }

    .chart {
        height: 0.9 * 9 * 1.5vw;
        width: 0.9 * 16 * 1.5vw;
    }
}
</style>
