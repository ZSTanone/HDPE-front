<template>
    <div class="box4">
        <el-row :gutter="20" style="margin-top: 10px;" class="row1">
            
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <el-card shadow="hover">
                    <div class="chart" :ref="chartRefs.set"></div>
                </el-card>
            </el-col>

            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <el-card shadow="hover">
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

const chartRefs = useTemplateRefsList<HTMLDivElement>()



const state: {
    charts: any[]
} = {
    charts: [],
}


// 投料数据
let Chart_data: any[] = [[0], [0]]

const initChart = (chartLable:number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: '反应器进料'
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                align: 'left'
            }
        },

        xAxis: {
            type: 'category',
            name: '时间',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            },
            {
                data: [620, 832, 855, 900, 1222, 1350, 920],
                type: 'line',
                smooth: true
            }
        ]
    };
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
        initChart(0)
        initChart(1)
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
.box4 {

    // display: flex;
    // justify-content: center;
    // width: 800px;
    // height: 600px;
    // background-color: rgb(217, 217, 217);

    .chart {
        margin-top: 0px;
        height: 400px;
    }
}
</style>