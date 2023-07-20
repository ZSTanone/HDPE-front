<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 14:41:56
 * @LastEditTime: 2022-12-12 19:57:52
 * @LastEditors: zwj
-->
<template>
    <div class="default-main">
        <el-row class="nav">
            <el-col :span="2.5" style="margin-right: 10px" class="chose_equipment">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select v-model="devValue" style="width: 150px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
            <el-col :span="2.9" style="margin-right: 10px">
                <el-tooltip content="选择查询时间频率" placement="top">
                    <el-input class="input-with-select" v-model="timestamps" style="width: 140px" :blur="(timestampsischange = true)">
                        <template #append>
                            <el-select v-model="freqValue" style="width: 70px">
                                <el-option v-for="item in ferqOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-input>
                </el-tooltip>
            </el-col>
            <el-col :span="1.2" style="margin-right: 100px">
                <el-tooltip content="显示24小时内的所有数据" placement="top">
                    <el-button type="primary" color="#626aef" plain class="FIC141" @click="dialogVisible = true"> 历史数据 </el-button>
                </el-tooltip>
            </el-col>
            <el-col :span="1.2" style="margin-right: 10px">
                <el-tooltip content="跳转到测试页" placement="top">
                    <el-button type="primary" color="#626aef" plain class="testbtn" @click="testClick()"> 测试按钮 </el-button>
                </el-tooltip>
            </el-col>

            <el-col :span="1.2" style="margin-right: 10px">
                <el-tooltip content="弹出对话框" placement="top">
                    <el-button type="primary" color="#626aef" plain class="testbtn" @click="testClick2()"> 弹出对话框 </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <IppVue v-if="devValue === 'Option1'"></IppVue>
        <IIppVue v-if="devValue === 'Option2'"></IIppVue>

        <el-dialog v-model="dialogVisible" width="48%" draggable @open="open()" @close="close()">
            <div style="width: 100%; height: 380px" :ref="chartRefs.set"></div>
            <template #footer>
                <span class="dialog-footer">
                    <el-autocomplete
                        v-model="point"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="true"
                        clearable
                        class="inline-input w-25"
                        placeholder="Please Input"
                    />
                    <el-button style="margin-left: 20px" type="primary" @click="refreshchart()"> 确认查询 </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 测试的弹出框 -->
        <el-dialog v-model="dialogVisible1" title="Tips" width="30%">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible1 = false"> Confirm </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect } from 'vue'
import IppVue from './Ipp.vue'
import IIppVue from './IIpp.vue'


import * as echarts from 'echarts'
import { useIppdata } from '/@/stores/ippdata'
import type { Ippdata } from '/@/stores/interface'
import { getOperationData, monitorOptions1 } from '/@/api/frontend/user/index'
import { useTemplateRefsList } from '@vueuse/core'

interface RestaurantItem {
    value: string
}

const dialogVisible = ref(false)
const Ippdata = useIppdata()
const devValue = ref('Option1')
const freqValue = ref('Option2')
const chartRefs = useTemplateRefsList<HTMLDivElement>()
const options = [
    {
        value: 'Option1',
        label: 'I套聚丙烯装置',
    },
    {
        value: 'Option2',
        label: 'II套聚丙烯装置',
    },
]
const ferqOptions = [
    {
        value: 'Option1',
        label: 'sec',
    },
    {
        value: 'Option2',
        label: 'min',
    },
]
const state: {
    data: [] // data就是图表中的数据，是从后端返回的数据经过处理后得到的
    charts: any[] // charts是数组，其中的每个元素表示一个echarts图表实例
    getdata: any // getdata是从后端返回的原始的响应数据
    postdata: object // postdata是向后端请求数据时的负载数据
} = reactive({
    data: [],
    charts: [],
    getdata: [],
    postdata: {
        reaction: devValue,
        timestamp: 100,
        time: new Date(1636326000 * 1000).toString(),
        full: true,
    },
})

// 时间间隔  默认60 min
let timestamps: Ref<number> = ref(Ippdata.timeset)
// 时间是否改变
let timestampsischange = true

watchEffect(() => {
    if (freqValue.value === 'Option1' && timestamps.value && timestampsischange) {
        timestampsischange = false
        Ippdata.timeset = timestamps.value //改变查询时间
        // 防抖
        setTimeout(() => {
            Ippdata.timestamps = timestamps.value * 1000 //改变查询时间毫秒时间戳
            timestampsischange = true
            console.log('查询时间发生变化 sec')
        }, 2000)
    } else if (freqValue.value === 'Option2' && timestamps.value && timestampsischange) {
        //装置2同理
        timestampsischange = false
        Ippdata.timeset = timestamps.value
        // 防抖
        setTimeout(() => {
            Ippdata.timestamps = timestamps.value * 60 * 1000
            timestampsischange = true
            console.log('查询时间发生变化 min')
        }, 2000)
    }
})

// 用响应式定义点位
const point = ref('FIC141') // 选择不同点位的数据

// 下面内容都是关于自动补全输入框的
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
    const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
}
// 这个loadAll就是自动补全输入框的作用内容
const loadAll = () => {
    return [
        { value: 'TIC221' },
        { value: 'PIC221' },
        { value: 'FIC141' },
        { value: 'FIC111' },
        { value: 'FIC121' },
        { value: 'FIC204' },
        { value: 'TIC241' },
        { value: 'PIC241' },
        { value: 'FIC203' },
        { value: 'FIC201' },
        { value: 'TIC251' },
        { value: 'PIC251' },
        { value: 'FIC231' },
        { value: 'FIC202' },
    ]
}

// 初始化弹窗里的图表内容
const initFulldataChart = () => {
    const FulldataChart = echarts.init(chartRefs.value[0] as HTMLElement)
    const option = {
        // 图表提示框组件
        tooltip: {
            trigger: 'axis',
            // 提示框出现的位置，这个参数不是特别重要。可以不设置
            // 此处设置为固定在顶部
            position: function (pt: any) {
                return [pt[0], '10%']
            },
        },
        // 设置图表标题
        title: {
            left: 'center',
            text: '24Hours data Chart',
        },
        // 工具栏
        toolbox: {
            feature: {
                // 数据区域缩放
                dataZoom: {
                    yAxisIndex: 'none',
                },
                // 配置项还原
                restore: {},
                // 保存为图片
                saveAsImage: {},
            },
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
        },
        // 区域缩放
        dataZoom: [
            {
                // 组件类型：内滑块
                type: 'inside',
                // type: 'slider',
                // 数据窗口起止百分比：范围是：0 ~ 100。表示 0% ~ 100%。
                start: 0,
                end: 20,
            },
            {
                start: 0,
                end: 20,
            },
        ],
        series: [
            // 有多少个对象就有多少条曲线
            {
                // 曲线名称，用于提示框tooltip的显示
                name: point.value,
                // 线型
                type: 'line',
                // 平滑曲线
                smooth: true,
                // 标记点的图形
                // symbol: 'none',
                symbol: 'rect',
                // 画关于时间的数据，格式就是[时间戳，数据值]
                data: state.data,
            },
        ],
    }
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

onMounted(() => {
    restaurants.value = loadAll()
    // 测试的接口
    monitorOptions1('get').then((res) => {
        console.log(res.msg)
    })
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

// dialog打开的回调
const open = () => {
    // 本接口用于获得所有点位的数据
    console.log('向后端请求点位历史数据')
    getOperationData('post', state.postdata)
        .then((res) => {
            state.getdata = res.data.IpcDataGroup
            state.data = res.data.IpcDataGroup.map((item: Ippdata) => [+new Date(Date.parse(item.time as string)), item[point.value]])
            // console.log(state.data);
        })
        .then(() => {
            initFulldataChart()

            // console.log('图表open',state);
        })
}

const close = () => {
    // 将刚才创建的图表实例销毁
    state.charts[0].dispose()
    // 并清空数据
    state.getdata = []
    state.data = []

    // console.log('图表close',state);
}

// 通过自动补全输入框改变了point的值
const refreshchart = () => {
    state.charts[0].dispose()
    state.data = state.getdata.map((item: Ippdata) => [+new Date(Date.parse(item.time as string)), item[point.value]])
    initFulldataChart()
    // 从打印的结果来看，点击确认查询按钮，确实改变了point的值，变为了当前查询的点位的值
    console.log(point.value)
}

const dialogVisible1 = ref(false)

const testClick = () => {
    // devValue.value = 'Option3'
    if (devValue.value === 'Option1') {
        devValue.value = 'Option3'
    } else if (devValue.value === 'Option3') {
        devValue.value = 'Option1'
    }
}

const testClick2 = () => {
    dialogVisible1.value = true
}
// 测试对话框
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import { text } from 'stream/consumers'
export default defineComponent({
    name: 'monitor/options1',
})
</script>

<style scoped lang="scss">
.el-row {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    background-color: var(--ba-bg-color-overlay);
    border: 1px solid var(--ba-border-color);
    border-bottom: none;
    padding: 13px 15px;
    font-size: 14px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.chose_equipment {
    background-color: aqua;
}

.nav {
    margin-bottom: 15px;
    background-color: rgb(197, 229, 229);
}
</style>
