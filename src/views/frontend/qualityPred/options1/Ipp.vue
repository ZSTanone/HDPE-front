<!--
 * @Author: zwj
 * @Date: 2022-11-14 16:00:30
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-28 13:51:06
 * @Description: 
-->
<template>
    <!-- 质量指标-熔指预测 -->
    <div v-show="indicatorValue === 'fun1'">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                    <el-card shadow="hover" >
                        <div class="chart" :ref="chartRefs.set"></div>
                    </el-card>
            </el-col>
        </el-row>
    </div>

    <!-- 微观结构分子量分布 -->
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
import { computed, nextTick, onActivated, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, toRaw, watch, reactive } from 'vue';
// import { useIppdata } from '/@/stores/ippdata'
import { useMIData } from '/@/stores/MIdata'
import { runPredictModel, getPPData } from '/@/api/frontend/user'

const props = defineProps<{
    indicatorValue: string
}>()

const dateValue = ref<Date>(new Date(2021, 10, 27, 10, 10))
const chartRefs = useTemplateRefsList<HTMLDivElement>()
// const Ippdata = useIppdata()

// 使用熔指状态仓库
const MIData = useMIData()

// const state: {
//     charts: any[]
// } = {
//     charts: [],
// }

const state: {
    charts: any[]
} = reactive({
    charts: [],
})

let ppChart_data:any[] = [[0],[0]]
// 熔指图表的数据
let MIChart_data:any[] = [[],[]]
let sh:any

const initMIdataChart = (chartLable:number) => {
    const IppdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    const option = {
        title: {
            text: 'Ipp MI Predict',
        },
        tooltip: {
            // 坐标轴触发
            trigger: 'axis',
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
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
        // 图例的数据通常与数据系列（series）的 name 属性一一对应
        legend: {
            data: ['Predict Data', 'Real Data']
        },
        xAxis: {
            type: 'time',
            // 分割线设置为不显示
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

// 初始化两个分子量分布的图表，
// 它们的chartLable（编号）不一样，数据不一样，其他都一样
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

// 获取熔指的实际值与预测值
// MI_Value依赖于MIData.getValue，只要MIData.getValue的值发生变化，MI_Value也会重新计算。
const MI_Value = computed(() => {
    return MIData.getValue    //返回值是一个数组，数组中的每个元素都是一个对象
})

watch(
    () => MI_Value.value,   //这里就可视为一个响应式变量
    () => {
        // 数据大小的保留操作
        if(MIChart_data[0].length > 50) {
            MIChart_data[0].shift(); 
        }
        if(MIChart_data[1].length > 2) {
            MIChart_data[1].shift(); 
        }
        
        // [0]放的是预测数据
        MIChart_data[0].push({
            name: new Date(MIData.predict.time),
            value: [
                new Date(+Date.parse(MIData.predict.time as string)), //时间
                MIData.predict.value  //值
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

        // 更新图表中的数据的值
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

// 这个侦听器用于更新图表的数据
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

// 更新反应器的图表数据
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

// 图表自适应
// onActivated是组件被激活时执行的逻辑
onActivated(() => {
    echartsResize()
})

// 加载前，清除历史“缓存”
onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

// 初始化三个图表，定期向后端查询装置数据，注意序号对应不同的图表
onMounted(() => {
    initMIdataChart(0)  //熔指预测图：对应质量预测
    initPPdataChart(1)  //R201分子量分布图：对应微观结构左图
    initPPdataChart(2)  //R202分子量分布图：对应微观结构右图
    window.addEventListener('resize', echartsResize)

    let postdata = {
        reaction: 'Option1',
        timestamp: new Date(1637967600*1000).toString(), //2021-11-27 07:00:00
    }
    let date = 1637967600*1000

    // 使用定时器向后端进行轮询：轮询时长30min
    sh = setInterval((() => {
        date += 30*60*1000
        postdata.timestamp = new Date(date).toString()
        runPredictModel('post', postdata).then((res) => {
            MIData.dataFill(res.data)
        })
    }), 30*1000*60)
})


// 对页面进行自适应
onUpdated(() => {
    nextTick(() => {
        echartsResize()
    })
}) 

// 清除定时器
onUnmounted(() => {
    clearInterval(sh);
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