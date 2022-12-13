<!--
 * @Author: zwj
 * @Date: 2022-11-14 16:00:30
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-12 19:45:17
 * @Description: 
-->
<template>
    <div class="growth-chart">
            <el-row :gutter="20" style="margin-top: 20px;">
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
import { computed, nextTick, onActivated, onBeforeMount, onMounted, reactive, toRaw, watch } from 'vue';
import { useIppdata } from '/@/stores/ippdata'

const chartRefs = useTemplateRefsList<HTMLDivElement>()
const Ippdata = useIppdata()

const state: {
    charts: any[]
} = reactive({
    charts: [],
})
let chart_data:any[] = [[0],[0]]

const initFulldataChart = (chartLable:number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            text: 'R20' + (chartLable+1) + '分子量分布',
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
                'xAxis' + params.data[0] + ':' + 'yAxis' + params.data[1]
            );
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            nameTextStyle:{
                color:'red',//红字
                fontSize : 14,
            },
            nameRotate: '0',
            nameLocation: 'center'
        },
        yAxis: {
            type: 'value',
            name: 'dw',
            nameTextStyle:{
                color:'red',//红字
                fontSize : 18,
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {
                show: false
            }
        },
        series: [
            {
                data: chart_data[chartLable],
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

const Output_R201_MW = computed(() => {
    return Ippdata.Output_R201_MW
})

const Output_R202_MW = computed(() => {
    return Ippdata.Output_R202_MW
})

watch(
    () => Output_R201_MW.value,
    () => {
        chart_data[0] = Object.values(toRaw(Output_R201_MW.value as object))
        chart_data[1] = Object.values(toRaw(Output_R202_MW.value as object))

        console.log(chart_data);
        
        console.log(chart_data[1].map((item:any[]) => [2.3025*item[0], Math.log10(item[1])]));
        
        toRaw(state.charts[0]).setOption({
            series: [
                {
                    data: chart_data[0].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
                }
            ]
        })
        toRaw(state.charts[1]).setOption({
            series: [
                {
                    data: chart_data[1].map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
                }
            ]
        })
    }
)

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
    initFulldataChart(0)
    initFulldataChart(1)
    window.addEventListener('resize', echartsResize)
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})
</script>

<style scoped lang="scss">
@media screen and (max-width: 1200px) {
    .lg-mb-20 {
        margin-bottom: 20px;
    }
}

.chart {
    margin-top: 20px;
    height: 400px;
}
</style>