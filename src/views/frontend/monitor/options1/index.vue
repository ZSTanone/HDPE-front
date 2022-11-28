<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 14:41:56
 * @LastEditTime: 2022-11-28 13:08:37
 * @LastEditors: zwj
-->
<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选择查询时间频率" placement="top">
                    <el-input class="input-with-select" v-model="timestamps" style="width:140px" :blur="timestampsischange = true">
                        <template #append>
                            <el-select v-model="freqValue" style="width:70px">
                                <el-option v-for="item in ferqOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                    </el-input>
                </el-tooltip>
            </el-col>
            <el-col :span="1.2" style="margin-right: 10px;">
                <el-tooltip content="显示24小时内的所有数据" placement="top">
                    <el-button type="primary" class="FIC141" @click="dialogVisible = true">
                        历史数据
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <IppVue v-if="devValue === 'Option1'"></IppVue>
        <IIppVue  v-if="devValue === 'Option2'"></IIppVue>

        <el-dialog v-model="dialogVisible" width="48%" draggable @open="open()" @close="close()">
            <div style="width: 100%; height: 380px;" :ref="chartRefs.set"></div>
            <template #footer>
                <span class="dialog-footer">
                        <el-autocomplete
                        v-model="point"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="false"
                        clearable
                        class="inline-input w-25"
                        placeholder="Please Input"
                        />
                    <el-button style="margin-left: 20px;" type="primary" @click="refreshchart()">
                        确认
                    </el-button>
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
import { getOperationData } from '/@/api/frontend/user/index'
import { useTemplateRefsList } from '@vueuse/core';

interface RestaurantItem {
  value: string
}


const dialogVisible = ref(false)
const Ippdata = useIppdata()
const devValue = ref('Option1')
const freqValue = ref('Option1')
const chartRefs = useTemplateRefsList<HTMLDivElement>()
const options = [
    {
        value: 'Option1',
        label: 'I套聚丙烯装置',
    },{
        value: 'Option2',
        label: 'II套聚丙烯装置',
    },
]
const ferqOptions = [
    {
        value: 'Option1',
        label: 'sec',
    },{
        value: 'Option2',
        label: 'min',
    },
]
const state: {
    data: []
    charts: any[]
    getdata: any
    postdata: object
} = reactive({
    data: [],
    charts: [],
    getdata:[],
    postdata: {
        reaction: devValue,
        timestamp: 100,
        time: new Date(1636326000*1000).toString(),
        full: true
    }
})

let timestamps: Ref<number> = ref(Ippdata.timeset)
let timestampsischange = true
watchEffect(() => {
    if(freqValue.value === 'Option1' && timestamps.value && timestampsischange) {
        timestampsischange = false
        Ippdata.timeset = timestamps.value
        setTimeout(()=>{
            Ippdata.timestamps = timestamps.value*1000
            timestampsischange = true
        },2000)
    } else if(freqValue.value === 'Option2' && timestamps.value && timestampsischange) {
        timestampsischange = false
        Ippdata.timeset = timestamps.value
        setTimeout(()=>{
            Ippdata.timestamps = timestamps.value*60*1000
            timestampsischange = true
        },2000)
    }
})
  


const point = ref('FIC141') // 选择不同点位的数据
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    return [
        { value: 'TIC221'},{ value: 'PIC221'},{ value: 'FIC141' },
        { value: 'FIC111'},{ value: 'FIC121'},{ value: 'FIC204'},
        { value: 'TIC241'},{ value: 'PIC241'},{ value: 'FIC203'},
        { value: 'FIC201'},{ value: 'TIC251'},{ value: 'PIC251'},
        { value: 'FIC231'},{ value: 'FIC202'},
    ]
}

const initFulldataChart = () => {
    const FulldataChart = echarts.init(chartRefs.value[0] as HTMLElement)
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt: any) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '24Hours data Chart'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 20
            },
            {
                start: 0,
                end: 20
            }
        ],
        series: [
            {
                name: point.value,
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: state.data
            }
        ]
    };
    FulldataChart.setOption(option)
    state.charts.push(FulldataChart)
}

onMounted(() => {
    restaurants.value = loadAll()
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

const open = () => {
    getOperationData('post', state.postdata).then((res) => {
        state.getdata = res.data.IpcDataGroup
        state.data = res.data.IpcDataGroup.map((item:Ippdata) => [+new Date(Date.parse(item.time as string)), item[point.value]])
    }).then(() => {
        initFulldataChart()
    })
}

const close = () => {
    state.charts[0].dispose()
    state.getdata = []
    state.data = []
}

const refreshchart = () => {
    state.charts[0].dispose()
    state.data = state.getdata.map((item:Ippdata) => [+new Date(Date.parse(item.time as string)), item[point.value]])
    initFulldataChart()
}
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
</style>
