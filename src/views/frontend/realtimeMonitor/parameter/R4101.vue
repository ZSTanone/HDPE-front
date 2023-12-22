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
import init from '/@/utils/iconfont'

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

// 仅为了画图,假设一些数据
const time: string[] = [
    '0:00', '1:00', '2:00', '3:00', '4:00', '5:00',
    '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

const M1= [28618, 28668, 28293, 29084, 28546, 28867, 28589, 28641, 28656, 28865, 28594, 28806, 28317, 28447, 28736, 28341, 28722, 28244, 28742, 28806, 28609, 28921, 29037, 28441, 28771]
const M2= [28569, 28723, 28484, 28647, 28883, 28615, 28782, 28955, 28829, 28899, 28938, 29005, 28919, 28617, 28800, 29011, 28765, 28934, 28765, 28889, 28780, 28857, 28762, 29065, 29128]
const H1= [13.07, 13.04, 13.32, 13.18, 13.04, 13.14, 13.41, 13.16, 13.23, 13.09, 13.36, 13.14, 13.42, 13.07, 13.31, 13.09, 13.06, 13.20, 13.26, 13.07, 13.36, 13.49, 13.20, 13.28, 13.38]
const H2= [19.24, 19.55, 19.71, 19.50, 19.26, 19.30, 19.51, 19.32, 19.20, 19.57, 19.68, 19.35, 19.41, 19.61, 19.35, 19.52, 19.52, 19.34, 19.49, 19.54, 19.46, 19.66, 19.52, 19.36, 19.51]
const CM1= [353, 330, 346, 349, 354, 351, 334, 337, 358, 357, 337, 359, 358, 346, 345, 341, 343, 357, 352, 353, 358, 354, 347, 358, 353]
const CM2= [332, 328, 329, 323, 334, 331, 325, 328, 336, 330, 329, 327, 329, 337, 332, 327, 332, 330, 324, 328, 332, 335, 328, 334, 339]
const C= [126.3, 123.7, 124.8, 126.2, 125.1, 124.9, 123.7, 124.2, 126.0, 124.2, 125.3, 124.7, 124.2, 124.7, 123.4, 125.4, 124.5, 123.7, 124.4, 126.5, 123.7, 125.1, 125.5, 125.0, 123.8]
const C_1= [1.173, 1.186, 1.135, 1.165, 1.178, 1.173, 1.131, 1.112, 1.154, 1.140, 1.123, 1.180, 1.118, 1.163, 1.185, 1.148, 1.111, 1.166, 1.150, 1.139, 1.183, 1.145, 1.130, 1.180, 1.183]
const C_2= [1.019, 1.010, 1.019, 1.009, 1.025, 1.005, 1.011, 1.011, 1.027, 1.001, 1.019, 1.005, 1.001, 1.005, 1.007, 1.003, 1.026, 1.004, 1.027, 1.011, 1.005, 1.003, 1.019, 1.001, 1.022]
const flow1= [26932, 26103, 27069, 25563, 26807, 26042, 26471, 26346, 25516, 26049, 26766, 26739, 27030, 25958, 26838, 26136, 26041, 26769, 25599, 25909, 26795, 26203, 26423, 25523, 26172]
const flow2= [27020, 26980, 26594, 26800, 26607, 26642, 26279, 26473, 26952, 26532, 26945, 26818, 26392, 26608, 26511, 26705, 26538, 26007, 26714, 26907, 25962, 26116, 26748, 26749, 26838]
const density1 = [583.4, 578.1, 567.4, 572.7, 580.5, 573.3, 570.4, 572.5, 582.7, 573.8, 572.7, 571.5, 579.8, 575.4, 577.1, 578.6, 579.7, 575.1, 571.5, 574.7, 579.5, 574.1, 577.0, 579.6, 572.1]
const density2 = [583.4, 578.3, 578.8, 572.8, 580.3, 576.0, 577.4, 580.7, 570.5, 578.4, 578.3, 577.3, 577.8, 579.3, 574.2, 577.0, 579.1, 574.8, 575.2, 579.9, 571.8, 574.8, 575.4, 579.1, 578.4]
const P1 = [4.3, 4.4, 4.5, 4.3, 4.5, 4.4, 4.4, 4.5, 4.4, 4.4, 4.4, 4.4, 4.4, 4.5, 4.4, 4.5, 4.5, 4.5, 4.4, 4.5, 4.4, 4.4, 4.4, 4.4, 4.4]
const P2 = [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5]
const T1 = [98.1, 99.2, 99.4, 98.4, 98.0, 99.2, 98.0, 99.2, 97.5, 99.2, 97.6, 97.6, 97.8, 98.8, 99.2, 98.6, 97.4, 98.2, 97.3, 98.4, 98.8, 98.9, 98.3, 99.2, 97.8]
const T2 = [99.1, 99.2, 99.2, 99.2, 99.2, 99.1, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2, 99.2]

const initChart = (chartLable: number,data1:Array<any>,data2:Array<any>) => {
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
            data: time,
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
                data: data1,
                type: 'line',
                smooth: true,
            },
            {
                name: 'R4201',
                data: data2,
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
        initChart(0,M1,M2)
        initChart(1,H1,H2)
        initChart(2,CM1,CM2)
        initChart(3,C,[])
        initChart(4,C_1,C_2)
        initChart(5,flow1,flow2)
        initChart(6,density1,density2)
        initChart(7,P1,P2)
        initChart(8,T1,T2)
        // for (let i = 0; i < chartRefs.value.length; i++) {
        //     initChart(i)
        //     if (i == 3) {
        //         toRaw(state.charts[i]).setOption({
        //             legend: {
        //                 // 图例的名称
        //                 data: ['R4101'],
        //             },
        //             // 更新该点位的数据
        //             series: [
        //                 {
        //                     name: 'R4101',
        //                     data: [620, 832, 855, 888, 1222, 666, 920],
        //                     type: 'line',
        //                     smooth: true,
        //                 },
        //                 {
        //                     name: 'R4201',
        //                     data: [],
        //                     type: 'line',
        //                     smooth: true,
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
