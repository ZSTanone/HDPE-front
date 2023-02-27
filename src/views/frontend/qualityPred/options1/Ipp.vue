<!--
 * @Author: zwj
 * @Date: 2022-11-14 16:00:30
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-28 13:51:06
 * @Description: 
-->
<template>
    <div v-show="indicatorValue === 'fun1'">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                    <el-card shadow="hover" >
                        <div class="chart" :ref="chartRefs.set"></div>
                    </el-card>
            </el-col>
        </el-row>
    </div>
    <div v-show="indicatorValue === 'fun2'">
        <el-row justify="center" class="block">
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-date-picker
                    v-model="dateValue"
                    size="large"
                    type="datetime"
                    placeholder="Select date and time"
                />
            </el-col>
            <el-col :span="1.9" style="margin-right: 10px;">
                <el-tooltip content="获取历史数据" placement="top">
                    <el-button type="success" size="large" @click="getMWData()"  style="font-size: 16px">
                        查询
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;">
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <el-card shadow="hover" >
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <el-card shadow="hover" >
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core';
import * as echarts from 'echarts'
import { computed, nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, toRaw, watch } from 'vue';
// import { useIppdata } from '/@/stores/ippdata'
import { useMIData } from '/@/stores/MIdata'
import { runPredictModel, getPPData } from '/@/api/frontend/user'

const props = defineProps<{
    indicatorValue: string
}>()

const dateValue = ref<Date>(new Date(2021, 11, 27, 10, 10))
const chartRefs = useTemplateRefsList<HTMLDivElement>()
// const Ippdata = useIppdata()
const MIData = useMIData()

const state: {
    charts: any[]
} = {
    charts: [],
}
let ppChart_data:any[] = [[0],[0]]
let MIChart_data:any[] = [[],[]]
let sh:any

const initMIdataChart = (chartLable:number) => {
    const IppdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    const option = {
        title: {
            text: 'Ipp MI Predict',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {         
                let date = params[0].axisValueLabel
                
                return `<div style="padding: 5px 20px 5px 10px;">
                            <div>${date.slice(5,16)}</div>
                            <div>
                                <span style=\"display:inline-block;margin-right:5px;border-radius:12px;width:12px;height:12px;background-color:${params[0].color};\">
                                </span>
                                ${params[0]?.value[1].toFixed(4)}
                            </div>
                            <div>
                                <span style=\"display:inline-block;margin-right:5px;border-radius:12px;width:12px;height:12px;background-color:${params[1]?.color};\">
                                </span>
                                ${params[1]?.value[1].toFixed(4)}
                            </div>
                        </div>`
            },
            axisPointer: {
                animation: true
            }
        },
        legend: {
            data: ['Predict Data', 'Real Data']
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
        series: [
            {
                name: 'Predict Data',
                type: 'line',
                showSymbol: false,
                data: MIChart_data[0]
            },
            {
                name: 'Real Data',
                type: 'scatter',
                data: MIChart_data[1]
            }
        ]
    }
    IppdataChart.setOption(option)
    state.charts.push(IppdataChart)
}

const initPPdataChart = (chartLable:number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            text: 'R20' + (chartLable) + '分子量分布',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        formatter: function (params:any) {
            params = params[0]
            return (
                'xAxis:' + params?.data[0]?.toFixed(3) + '; ' + 'yAxis:' + params?.data[1]?.toFixed(3)
            );
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            nameTextStyle:{
                fontSize : 18,
                fontWeight: 'bold',
                padding: [10,0,0,0]
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
            nameTextStyle:{
                fontSize : 18,
                fontWeight: 'bold',
                padding: [0,0,15,0]
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
                data: ppChart_data[chartLable],
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                itemStyle: {
                    color: '#F2597F'    //小圆点和线的颜色
                },
                type: 'line',
                smooth: true
            }
        ]
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

const MI_Value = computed(() => {
    return MIData.getValue
})

watch(
    () => MI_Value.value,
    () => {
        if(MIChart_data[0].length > 50) {
            MIChart_data[0].shift(); 
        }
        if(MIChart_data[1].length > 2) {
            MIChart_data[1].shift(); 
        }
        
        MIChart_data[0].push({
            name: new Date(MIData.predict.time),
            value: [
                new Date(+Date.parse(MIData.predict.time as string)),
                MIData.predict.value
            ]
        })
        if (MIData.real.value !== null) {
            MIChart_data[1].push({
                name: new Date(MIData.real.time),
                value: [
                    new Date(+Date.parse(MIData.real.time as string)),
                    MIData.real.value
                ]
            })
        }

        toRaw(state.charts[0]).setOption({
            series: [
                {
                    data: MIChart_data[0]
                },
                {
                    data: MIChart_data[1]
                }
            ]
        })
    }
)

watch(
    () => props.indicatorValue,
    () => {
        if (props.indicatorValue === 'fun1') {
            toRaw(state.charts[0]).setOption({
                series: [
                    {
                        data: MIChart_data[0]
                    },
                    {
                        data: MIChart_data[1]
                    }
                ]
            })
        }
        if (props.indicatorValue === 'fun2') {
            toRaw(state.charts[1]).setOption({
                series: [
                    {
                        data: ppChart_data[0].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
                    }
                ]
            })
            toRaw(state.charts[2]).setOption({
                series: [
                    {
                        data: ppChart_data[1].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
                    }
                ]
            })
        }
    })

const refreshPPChart = (MWData:object) => {
    ppChart_data[0] = Object.values(MWData['R201MWData'])
    ppChart_data[1] = Object.values(MWData['R202MWData'])
        
    toRaw(state.charts[1]).setOption({
        series: [
            {
                data: ppChart_data[0].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
            }
        ]
    })
    toRaw(state.charts[2]).setOption({
        series: [
            {
                data: ppChart_data[1].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
            }
        ]
    })
}

const getMWData = () => {
    console.log(dateValue.value);
    
    let datelist = [dateValue.value, dateValue.value]
    let postdata = {
        'dateValue': [datelist[0].toString(), datelist[1].toString()],
        'reaction': 'Option1',
        'realtime': false,
        'timing': false,
        'chartData': true,
    }

    getPPData('post', postdata).then((res) => {
        console.log(res);
        
        refreshPPChart(res.data)
    })
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
    initMIdataChart(0)
    initPPdataChart(1)
    initPPdataChart(2)
    window.addEventListener('resize', echartsResize)

    let postdata = {
        reaction: 'Option1',
        timestamp: new Date(1637967600*1000).toString(),
    }
    let date = 1637967600*1000

    sh = setInterval((() => {
        date += 30*60*1000
        postdata.timestamp = new Date(date).toString()
        runPredictModel('post', postdata).then((res) => {
            MIData.dataFill(res.data)
        })
    }), 1000*5)
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

onUnmounted(() => {
    clearInterval(sh);
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
@media screen and (max-width: 1200px) {
    .lg-mb-20 {
        margin-bottom: 20px;
    }
}

.chart {
    margin-top: 0px;
    height: 400px;
}
</style>