<template>
    <span>这是新的详情查询页面</span>
    <div class="outer">
        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col :span="1.9">
                <el-descriptions title="优化配置" :column="4" size="large" border v-if="count > 0">
                    <el-descriptions-item label="旧牌号" :span="1">{{ resData[0].oldGrade }}</el-descriptions-item>
                    <el-descriptions-item label="新牌号" :span="1">{{ resData[0].newGrade }}</el-descriptions-item>
                    <el-descriptions-item label="更新时间" :span="3">{{ resData[0].updateTime }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[0] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[0] }} -- {{ resData[0].optUb[0] }} </el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[1] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[1] }} -- {{ resData[0].optUb[1] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[2] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[2] }} -- {{ resData[0].optUb[2] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[3] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[3] }} -- {{ resData[0].optUb[3] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[4] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[4] }} -- {{ resData[0].optUb[4] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[0].optVariableInput[5] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[0].optLb[5] }} -- {{ resData[0].optUb[5] }}</el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 40px">
            <el-col :span="1.9" class="lg-mb-20" :offset="4">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col :span="1.9">
                <el-descriptions title="优化配置" :column="4" size="large" border v-if="count > 1">
                    <el-descriptions-item label="旧牌号" :span="1">{{ resData[1].oldGrade }}</el-descriptions-item>
                    <el-descriptions-item label="新牌号" :span="1">{{ resData[1].newGrade }}</el-descriptions-item>
                    <el-descriptions-item label="更新时间" :span="2">{{ resData[1].updateTime }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[0] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[0] }} -- {{ resData[1].optUb[0] }} </el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[1] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[1] }} -- {{ resData[1].optUb[1] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[2] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[2] }} -- {{ resData[1].optUb[2] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[3] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[3] }} -- {{ resData[1].optUb[3] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[4] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[4] }} -- {{ resData[1].optUb[4] }}</el-descriptions-item>
                    <el-descriptions-item label="优化变量" :span="1">{{ resData[1].optVariableInput[5] }}</el-descriptions-item>
                    <el-descriptions-item label="变量范围" :span="1">{{ resData[1].optLb[5] }} -- {{ resData[1].optUb[5] }}</el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onActivated, onMounted, onUnmounted, onUpdated, reactive, toRaw, watch, ref, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core'

import { ElMessage } from 'element-plus'

// 读取数据
const resData = ref<Array<any>>([])
// 熔指数据
const MIdata = ref<Array<any>>([])
// 记录要画图的个数
const count = ref()
// echarts
const chartRefs = useTemplateRefsList<HTMLDivElement>()

const state: {
    charts: any[]
} = {
    charts: [],
}

const initChart = (chartLable: number) => {
    const FulldataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            left: 'center',
            text: '熔指变化',
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
        },
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

onBeforeMount(() => {
    resData.value = JSON.parse(sessionStorage.getItem('gradeSet')!)
    console.log(resData.value)

    if (resData.value && resData.value[0]['result']) {
        // 获取到了运行值，加载数据
        count.value = resData.value.length
        console.log('当前数据个数', count.value)
        // 遍历数据进行读取
        for (let item of resData.value) {
            console.log(item.oldGrade, item.newGrade)
            MIdata.value.push(item.result)
        }
        console.log('熔指结果', MIdata.value)
    } else if (resData.value && !resData.value[0]['result']) {
        // 提交还没运行出结果  这种情况应该不会出现，考虑去掉
        ElMessage.warning('还未获得优化结果，请等待')
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
        for (let i = 0; i < count.value; i++) {
            initChart(i)
            toRaw(state.charts[i]).setOption({
                // 更新该点位的数据
                series: [
                    {
                        // data: [i,2,3,4,5,6,7],
                        data: MIdata.value[i],
                        type: 'line',
                        smooth: true,
                    },
                ],
            })
        }
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
        height: 9 * 1.5vw;
        width: 16 * 1.5vw;
    }
}
</style>
