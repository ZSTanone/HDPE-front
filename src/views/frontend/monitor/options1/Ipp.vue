<!--
 * @Author: zwj
 * @Date: 2022-11-14 16:00:30
 * @LastEditors: zwj
 * @LastEditTime: 2022-11-27 11:27:01
 * @Description: 
-->
<template>
    <div class="IPPbox">
        <el-button size="small" type="success" class="FIC141" @click="changePoint('FIC141')">{{ FIC141 }}</el-button>
        <el-button size="small" type="success" class="FIC111" @click="changePoint('FIC111')">{{ FIC111 }}</el-button>
        <el-button size="small" type="success" class="FIC121" @click="changePoint('FIC121')">{{ FIC121 }}</el-button>
        <el-button size="small" type="success" class="PIC221" @click="changePoint('PIC221')">{{ PIC221 }}</el-button>
        <el-button size="small" type="success" class="TIC221" @click="changePoint('TIC221')">{{ TIC221 }}</el-button>
        <el-button size="small" type="success" class="FIC204" @click="changePoint('FIC204')">{{ FIC204 }}</el-button>

        <el-button size="small" type="success" class="PIC241" @click="changePoint('PIC241')">{{ PIC241 }}</el-button>
        <el-button size="small" type="success" class="TIC241" @click="changePoint('TIC241')">{{ TIC241 }}</el-button>
        <el-button size="small" type="success" class="FIC203" @click="changePoint('FIC203')">{{ FIC203 }}</el-button>
        <el-button size="small" type="success" class="FIC201" @click="changePoint('FIC201')">{{ FIC201 }}</el-button>

        <el-button size="small" type="success" class="PIC251" @click="changePoint('PIC251')">{{ PIC251 }}</el-button>
        <el-button size="small" type="success" class="TIC251" @click="changePoint('TIC251')">{{ TIC251 }}</el-button>
        <el-button size="small" type="success" class="FIC202" @click="changePoint('FIC202')">{{ FIC202 }}</el-button>
        <el-button size="small" type="success" class="FIC231" @click="changePoint('FIC231')">{{ FIC231 }}</el-button>
    </div>

    
    <el-dialog v-model="dialogVisible" width="45%" draggable @open="open()" @close="close()">
        <div style="width: 100%; height: 380px;" :ref="chartRefs.set"></div>
    </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onBeforeMount, reactive, ref, watch, toRaw, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useIppdata } from '/@/stores/ippdata'
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { getOperationData } from '/@/api/frontend/user/index'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const Ippdata = useIppdata()
const { TIC221, PIC221,FIC141,FIC111,
    FIC121,FIC204,TIC241,PIC241,
    FIC203,FIC201,TIC251,PIC251,
    FIC231,FIC202 } = storeToRefs(Ippdata);
const { t } = useI18n()
const chartRefs = useTemplateRefsList<HTMLDivElement>()
let date = 1637933400*1000
const state: {
    point:string
    charts: any[]
    form: object
    pauseWork: boolean

    chartdata: []
    postdata: object
} = reactive({
    point: 'FIC141',
    charts: [],
    form: {},
    pauseWork: false,
    chartdata:[],
    postdata: {
        reaction: 'Option1',
        time: new Date(1636326000*1000).toString(),
        full: false
    }
})
const chart_data: {
    time: any[],
    TIC221: any[],PIC221: any[],FIC141: any[],FIC111: any[],
    FIC121: any[],FIC204: any[],TIC241: any[],PIC241: any[],
    FIC201A: any[],FIC201B: any[],FIC201C: any[],FIC203: any[],
    FIC201: any[],TIC251: any[],PIC251: any[],FIC202A: any[],
    FIC202B: any[],FIC202C: any[],FIC231: any[],FIC202: any[],
} = {
    time: [],
    TIC221: [],PIC221: [],FIC141: [],FIC111: [],
    FIC121: [],FIC204: [],TIC241: [],PIC241: [],
    FIC201A: [],FIC201B: [],FIC201C: [],FIC203: [],
    FIC201: [],TIC251: [],PIC251: [],FIC202A: [],
    FIC202B: [],FIC202C: [],FIC231: [],FIC202: [],
}

let sh:any; 
watch(() => Ippdata.timestamps, () => {
    clearInterval(sh);
    sh = setInterval(()=>{
        date += 30*60*1000
        state.postdata['time'] = new Date(date).toString()
        getOperationData('post', state.postdata).then((res) => {
            Ippdata.dataFill(res.data)
        })
    },Ippdata.timestamps)
})

watch(() => Ippdata.id, () => {
    if(chart_data.TIC221.length < 50){
        for(let key in Ippdata.tobject()){
            if(key in chart_data){
                let now:Date = new Date(+Date.parse(Ippdata.tobject().time as string))
                chart_data[key].push({
                    name: now.toString(),
                    value: [
                        now,
                        Ippdata.tobject()[key]
                    ]
                })
            }
        }
    } else if(chart_data.TIC221.length >= 50) {
        for(let key in Ippdata.tobject()){
            if(key in chart_data){
                chart_data[key].shift();
                let now:Date = new Date(+Date.parse(Ippdata.tobject().time as string))
                chart_data[key].push({
                    name: now.toString(),
                    value: [
                        now,
                        Ippdata.tobject()[key]
                    ]
                })
            }
        }
    }
    
    console.log(chart_data[state.point]);
    
    if (state.charts[0]) {
        toRaw(state.charts[0]).setOption({
            series: [
                {
                    data: chart_data[state.point]
                }
            ]
        });
    }
})


const initIppdataChart = () => {
    const IppdataChart = echarts.init(chartRefs.value[0] as HTMLElement)
    const option = {
        title: {
            text: 'Ipp ' + state.point + ' Data',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                params = params[0]
                let time = params.value[0].toString()
                return (
                    time.slice(16,24) +
                    ' / ' +
                    params.value[1]
                );
            },
            axisPointer: {
                animation: true
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'Fake Data',
                type: 'line',
                showSymbol: false,
                data: chart_data[state.point]
            }
        ]
    }
    IppdataChart.setOption(option)
    state.charts.push(IppdataChart)
}
onMounted(() => {
    sh = setInterval(()=>{
        date += 30*60*1000
        state.postdata['time'] = new Date(date).toString()
        getOperationData('post', state.postdata).then((res) => {
            Ippdata.dataFill(res.data)
        })
    },Ippdata.timestamps)
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

onUnmounted(() => {
    clearInterval(sh);
})

const changePoint = (point:string) => {
    dialogVisible.value = true
    state.point = point
}

const open = () => {
    nextTick(() => {
        //  执行echarts方法
        initIppdataChart()
    })
}

const close = () => {
    state.charts[0].dispose()
    state.charts.shift()
}
</script>

<style scoped lang="scss">
.IPPbox {
    position: relative;
    width: 1200px;
    height: 820px;
    background: url(/@/assets/product/Ipp.png) no-repeat;
    background-size: cover;

    .parambox {
        width: 5vh;
        height: 2.5vh;
        background-color: red;
    }

    .FIC141 {
        position: absolute;
        left: 26.9*9.5px;
        top: 7.2*9.5px;
        font-size: medium;
    }

    .FIC111 {
        position: absolute;
        left: 25.5*9.5px;
        top: 12.2*9.5px;
        font-size: medium;
    }

    .FIC121 {
        position: absolute;
        left: 25.5*9.5px;
        top: 17.4*9.5px;
        font-size: medium;
    }

    .PIC221 {
        position: absolute;
        left: 52.6*9.5px;
        top: 24.2*9.5px;
        font-size: medium;
    }

    .TIC221 {
        position: absolute;
        left: 62.1*9.5px;
        top: 33.0*9.5px;
        font-size: medium;
    }

    .FIC204 {
        position: absolute;
        left: 26.6*9.5px;
        top: 47.7*9.5px;
        font-size: medium;
    }

    .PIC241 {
        position: absolute;
        left: 73.6*9.5px;
        top: 39.0*9.5px;
        font-size: medium;
    }

    .TIC241 {
        position: absolute;
        left: 87.5*9.5px;
        top: 52.5*9.5px;
        font-size: medium;
    }

    .FIC201 {
        position: absolute;
        left: 39.1*9.5px;
        top: 47.9*9.5px;
        font-size: medium;
    }

    .FIC203 {
        position: absolute;
        left: 39.1*9.5px;
        top: 52.9*9.5px;
        font-size: medium;
    }

    .PIC251 {
        position: absolute;
        left: 73.8*9.5px;
        top: 65.4*9.5px;
        font-size: medium;
    }

    .TIC251 {
        position: absolute;
        left: 85.2*9.5px;
        top: 74.9*9.5px;
        font-size: medium;
    }

    .FIC202 {
        position: absolute;
        left: 38.9*9.5px;
        top: 71.2*9.5px;
        font-size: medium;
    }

    .FIC231 {
        position: absolute;
        left: 38.9*9.5px;
        top: 76.1*9.5px;
        font-size: medium;
    }
}
</style>