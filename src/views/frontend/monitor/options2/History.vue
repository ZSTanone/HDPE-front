<!-- eslint-disable indent -->
<template>
    <el-row justify="center" class="block">
        <el-col :span="2.9" style="margin-right: 10px;">
            <el-date-picker 
                v-model="dateValue" 
                style="font-size: 12x;"
                size="large" type="datetimerange"
                range-separator="至" 
                start-placeholder="Start date" 
                end-placeholder="End date" 
            />
        </el-col>
        <el-col :span="1.9" style="margin-right: 10px;">
            <el-tooltip content="获取历史数据" placement="top">
                <el-button type="success" size="large" @click="clickToGetData" style="font-size: 16px">
                    查询
                </el-button>
            </el-tooltip>
        </el-col>
    </el-row>
    <el-card class="chart-box" shadow="hover" >
        <div class="chart" :ref="chartRefs.set"></div>
    </el-card>
    
</template>
  
<script lang="ts" setup>
import { useTemplateRefsList } from '@vueuse/core';
import { getPPData } from '/@/api/frontend/user'
import { nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, reactive, ref, toRaw } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
    devValue:String,
}>()

const dateValue = ref<[Date, Date]>([
    new Date(2021, 10, 10, 10, 10),
    new Date(2021, 10, 11, 10, 10),
])

const state: {
    charts: any[]
} = reactive({
    charts: [],
})

let ppdata = {}

const chartRefs = useTemplateRefsList<HTMLDivElement>()

const initPPdataChart = (chartLable:number) => {
    const PPdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    const option = {
        title: {
            left: 'center',
            text: 'Ipp  pp产量预测',
        },
        tooltip: {
            trigger: 'axis',
            textStyle:{
                align:'left'
            }
        },
        legend: {
            type: 'scroll',
            align: 'left',
            orient: 'horizontal',
            left: 80,
            top: 30,
            textStyle:{
                fontSize: 15,//字体大小
            },
            data: ['R200_H2', 'R200_C3H6', 'R200_TICL4', 'R200_TEA', 'R200_PP',
                'R201_H2', 'R201_C3H6', 'R201_TICL4', 'R201_TEA', 'R201_PP',
                'R202_H2', 'R202_C3H6', 'R202_TICL4', 'R202_TEA', 'R202_PP'],
            selected:{
                'R200_H2':true,'R200_C3H6':false,'R200_TICL4':false,'R200_TEA':false,'R200_PP':false,
                'R201_H2':true,'R201_C3H6':false,'R201_TICL4':false,'R201_TEA':false,'R201_PP':false,
                'R202_H2':true,'R202_C3H6':false,'R202_TICL4':false,'R202_TEA':false,'R202_PP':false,
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
        grid:{ // 让图表占满容器
            top:"70px",
            left:"70px",
            right:"20px",
            bottom:"20px",
        },
        series: [
            {
                name: 'R200_H2',
                type: 'line',
                showSymbol: false,
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

const getdata = (datelist:Date[]) => {
    let postdata = {
        'dateValue': [datelist[0].toString(), datelist[1].toString()],
        'reaction': props.devValue,
        'realtime': false,
        'timing': false,
        'chartData': false,
    }

    let list_key = ['R200_H2', 'R200_C3H6', 'R200_TICL4', 'R200_TEA', 'R200_PP',
        'R201_H2', 'R201_C3H6', 'R201_TICL4', 'R201_TEA', 'R201_PP',
        'R202_H2', 'R202_C3H6', 'R202_TICL4', 'R202_TEA', 'R202_PP']

    getPPData('post', postdata).then((res) => {
        list_key.forEach(key => {
            ppdata[key] = res.data.PPData.map((item:any) => {
                return {
                    'name': (new Date(item.time*1000)).toString(),
                    'value': [
                        new Date(item.time*1000),
                        item[key]
                    ]
                }
            })
        })

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

const intervalToGetData = () => {
    let default_time = new Date(2021, 10, 28, 0, 0)
    let end_time = new Date(+default_time)
    let init_time = new Date(+default_time - 24*60*60*1000)
    let datelist = [init_time, end_time]
    getdata(datelist)  
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
    initPPdataChart(0)
    window.addEventListener('resize', echartsResize)
    nextTick(() => {
        setInterval(() => {
            intervalToGetData()
        }, 60*1000)
    })
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
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

.chart-box{
    width: 100%;
    height: 680px;
    margin: auto;
}
.chart {
    width: 1100px;
    min-width: 1000px;
    height: 640px;
}
</style>
  