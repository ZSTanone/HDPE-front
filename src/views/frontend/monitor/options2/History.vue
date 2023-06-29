<!-- eslint-disable indent -->
<template>
    <el-row justify="center" class="block">
        <el-col :span="2.9" style="margin-right: 10px;">
            <el-date-picker v-model="dateValue" style="font-size: 12px;" size="large" type="datetimerange"
                range-separator="至" start-placeholder="开始日期" end-placeholder="截止日期" />
        </el-col>
        <el-col :span="1.9" style="margin-right: 10px;">
            <el-tooltip content="获取历史数据" placement="top">
                <el-button type="success" size="large" @click="clickToGetData" style="font-size: 16px">
                    查询
                </el-button>
            </el-tooltip>
        </el-col>
    </el-row>

    <el-card class="chart-box" shadow="hover">
        <div class="chart" :ref="chartRefs.set"></div>
    </el-card>
</template>
  
<script lang="ts" setup>
import { useTemplateRefsList } from '@vueuse/core';
import { getPPData } from '/@/api/frontend/user'
import { nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, reactive, ref, toRaw } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
    devValue: String,
}>()

const dateValue = ref<[Date, Date]>([
    new Date(2021, 10, 10, 10, 10),
    new Date(2021, 10, 11, 10, 10),
])

// 存放的是echarts图表实例
const state: {
    charts: any[]
} = reactive({
    charts: [],
})

let ppdata = {}

const chartRefs = useTemplateRefsList<HTMLDivElement>()



// 初始化图表
const initPPdataChart = (chartLable: number) => {
    const PPdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    const option = {
        // 标题与居中的样式
        title: {
            left: 'center',
            text: 'Ipp  pp产量预测',
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left'
            }
        },
        legend: {
            type: 'scroll', //图例类型
            align: 'left',  //图例标记和文本的对齐
            orient: 'horizontal', //图例列表的布局朝向
            left: 80, //图例离容器左侧的距离。
            top: 30,  //图例离容器上侧的距离
            textStyle: { //图例的公用文本样式
                fontSize: 15,//字体大小
            },
            // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
            data: ['R200_H2', 'R200_C3H6', 'R200_TICL4', 'R200_TEA', 'R200_PP',
                'R201_H2', 'R201_C3H6', 'R201_TICL4', 'R201_TEA', 'R201_PP',
                'R202_H2', 'R202_C3H6', 'R202_TICL4', 'R202_TEA', 'R202_PP'],
            // 图例选中状态表
            selected: {
                'R200_H2': true, 'R200_C3H6': false, 'R200_TICL4': false, 'R200_TEA': false, 'R200_PP': false,
                'R201_H2': true, 'R201_C3H6': false, 'R201_TICL4': false, 'R201_TEA': false, 'R201_PP': false,
                'R202_H2': true, 'R202_C3H6': false, 'R202_TICL4': false, 'R202_TEA': false, 'R202_PP': false,
            },
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            }
        },
        grid: { // 绘图区域距离容器边界的距离
            top: "70px",
            left: "70px",
            right: "20px",
            bottom: "20px",
        },
        series: [
            {
                name: 'R200_H2',
                type: 'line',
                showSymbol: false, //每个数据点没有图形显示（点位密集的时候最好关闭）
                data: []
            },
            {
                name: 'R200_C3H6',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R200_TICL4',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R200_TEA',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R200_PP',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R201_H2',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R201_C3H6',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R201_TICL4',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R201_TEA',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R201_PP',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R202_H2',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R202_C3H6',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R202_TICL4',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R202_TEA',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: 'R202_PP',
                type: 'line',
                showSymbol: false,
                data: []
            },
        ]
    }
    PPdataChart.setOption(option)
    state.charts.push(PPdataChart)
}

const getdata = (datelist: Date[]) => {

    // 两个都是false
    let postdata = {
        'dateValue': [datelist[0].toString(), datelist[1].toString()],
        'reaction': props.devValue,
        'realtime': false,
        'timing': false,
        'chartData': false,
    }

    // 定义字段名称，用于从后端取数据
    let list_key = ['R200_H2', 'R200_C3H6', 'R200_TICL4', 'R200_TEA', 'R200_PP',
        'R201_H2', 'R201_C3H6', 'R201_TICL4', 'R201_TEA', 'R201_PP',
        'R202_H2', 'R202_C3H6', 'R202_TICL4', 'R202_TEA', 'R202_PP']

    getPPData('post', postdata).then((res) => {
        // 遍历字段
        list_key.forEach(key => {
            ppdata[key] = res.data.PPData.map((item: any) => {   //item就是遍历的每一项
                return {
                    //将time属性变为毫秒并转为字符串，赋值给新的name属性
                    'name': (new Date(item.time * 1000)).toString(),
                    // 类似的构造value属性，用于画图：时间戳 + y轴数据
                    'value': [
                        new Date(item.time * 1000),
                        item[key]
                    ]
                }
            })
        })

        // 每发送一次查询，都要更新图表中的数据
        // 这里到底是否需要使用toRaw保存疑问
        toRaw(state.charts[0]).setOption({
            series: [
                {
                    name: 'R200_H2',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R200_H2']
                },
                {
                    name: 'R200_C3H6',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R200_C3H6']
                },
                {
                    name: 'R200_TICL4',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R200_TICL4']
                },
                {
                    name: 'R200_TEA',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R200_TEA']
                },
                {
                    name: 'R200_PP',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R200_PP']
                },
                {
                    name: 'R201_H2',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R201_H2']
                },
                {
                    name: 'R201_C3H6',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R201_C3H6']
                },
                {
                    name: 'R201_TICL4',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R201_TICL4']
                },
                {
                    name: 'R201_TEA',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R201_TEA']
                },
                {
                    name: 'R201_PP',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R201_PP']
                },
                {
                    name: 'R202_H2',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R202_H2']
                },
                {
                    name: 'R202_C3H6',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R202_C3H6']
                },
                {
                    name: 'R202_TICL4',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R202_TICL4']
                },
                {
                    name: 'R202_TEA',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R202_TEA']
                },
                {
                    name: 'R202_PP',
                    type: 'line',
                    showSymbol: false,
                    data: ppdata['R202_PP']
                },
            ]
        })
    })
}

const clickToGetData = () => {
    let datelist = toRaw(dateValue.value)
    getdata(datelist)
}

// 默认的轮询函数
const intervalToGetData = () => {
    let default_time = new Date(2021, 10, 28, 0, 0)
    // 结束时间是默认时间
    let end_time = new Date(+default_time)
    // 开始时间是结束时间的前一天
    let init_time = new Date(+default_time - 24 * 60 * 60 * 1000)
    let datelist = [init_time, end_time]
    getdata(datelist)   //我把轮询时间延长到30min
}

// resize方法是echarts图表实例的方法，当页面大小发生变化，图表也自适应变化
const echartsResize = () => {
    // 将 Echarts 图表的大小调整操作放在下一个微任务中执行，以保证能够获取到最新的 DOM 元素的大小信息。
    nextTick(() => {
        for (const key in state.charts) {
            state.charts[key].resize()
        }
    })
}

// 它是在一个被缓存的组件激活时调用的函数。
// 即当这个组件（历史数据被激活）便会调用这个函数，图表自适应
onActivated(() => {
    echartsResize()
})

// 在组件挂载到 DOM 之前执行一些操作：清空历史图表
onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

// 组件挂载到dom后调用
onMounted(() => {

    // 初始化第一个图表（默认的图表）
    initPPdataChart(0)
    window.addEventListener('resize', echartsResize)

    nextTick(() => {

        // 轮询数据
        setInterval(() => {
            intervalToGetData()
        }, 30 * 60 * 1000)
    })
})



// 组件实例从 DOM 中移除之前被调用的：执行一些清理工作
onUnmounted(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

// 它在组件更新之后被调用
onUpdated(() => {
    nextTick(() => {
        echartsResize()
    })
})
</script>

<style scoped lang="scss">
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

.chart-box {
    width: 70vw;
    height: 680px;
    margin: auto;

    // 使图表居中展示
    display: flex;
    justify-content: center;
    align-items: center;

    .chart {
        width: 1100px;
        min-width: 1000px;
        height: 640px;
    }
}
</style>
  