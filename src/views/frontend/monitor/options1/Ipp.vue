<!--
 * @Author: zwj
 * @Date: 2022-11-14 16:00:30
 * @LastEditors: zwj
 * @LastEditTime: 2022-11-25 20:16:28
 * @Description: 
-->
<template>
    <div class="IPPbox">
        <el-button size="small" type="success" class="FIC141" @click="dialogVisible = true;">{{ FIC141 }}</el-button>
        <el-button size="small" type="success" class="FIC111" @click="dialogVisible = true">{{ FIC111 }}</el-button>
        <el-button size="small" type="success" class="FIC121" @click="dialogVisible = true">{{ FIC121 }}</el-button>
        <el-button size="small" type="success" class="PIC221" @click="dialogVisible = true">{{ PIC221 }}</el-button>
        <el-button size="small" type="success" class="TIC221" @click="dialogVisible = true">{{ TIC221 }}</el-button>
        <el-button size="small" type="success" class="FIC204" @click="dialogVisible = true">{{ FIC204 }}</el-button>

        <el-button size="small" type="success" class="PIC241" @click="dialogVisible = true">{{ PIC241 }}</el-button>
        <el-button size="small" type="success" class="TIC241" @click="dialogVisible = true">{{ TIC241 }}</el-button>
        <el-button size="small" type="success" class="FIC203" @click="dialogVisible = true">{{ FIC203 }}</el-button>
        <el-button size="small" type="success" class="FIC201" @click="dialogVisible = true">{{ FIC201 }}</el-button>

        <el-button size="small" type="success" class="PIC251" @click="dialogVisible = true">{{ PIC251 }}</el-button>
        <el-button size="small" type="success" class="TIC251" @click="dialogVisible = true">{{ TIC251 }}</el-button>
        <el-button size="small" type="success" class="FIC202" @click="dialogVisible = true">{{ FIC202 }}</el-button>
        <el-button size="small" type="success" class="FIC231" @click="dialogVisible = true">{{ FIC231 }}</el-button>
    </div>

    
    <el-dialog v-model="dialogVisible" width="40%" draggable @open="open()" @close="close()">
        <div style="width: 740px; height: 380px;" :ref="chartRefs.set"></div>
    </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onBeforeMount, reactive, ref, watch, onUnmounted } from 'vue'
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
let date = 1636326000*1000
const state: {
    point:string
    charts: any[]
    form: object
    pauseWork: boolean
    data: {
        time: string[],
        TIC221: number[],PIC221: number[],FIC141: number[],FIC111: number[],
        FIC121: number[],FIC204: number[],TIC241: number[],PIC241: number[],
        FIC201A: number[],FIC201B: number[],FIC201C: number[],FIC203: number[],
        FIC201: number[],TIC251: number[],PIC251: number[],FIC202A: number[],
        FIC202B: number[],FIC202C: number[],FIC231: number[],FIC202: number[],
    }
    chartdata: []
    postdata: object
} = reactive({
    point: '',
    charts: [],
    form: {},
    data: {
        time: [],
        TIC221: [],PIC221: [],FIC141: [],FIC111: [],
        FIC121: [],FIC204: [],TIC241: [],PIC241: [],
        FIC201A: [],FIC201B: [],FIC201C: [],FIC203: [],
        FIC201: [],TIC251: [],PIC251: [],FIC202A: [],
        FIC202B: [],FIC202C: [],FIC231: [],FIC202: [],
    },
    pauseWork: false,
    chartdata:[],
    postdata: {
        reaction: 'Option1',
        time: new Date(1636326000*1000).toString(),
        full: false
    }
})

let sh:any; 
watch(() => Ippdata.timestamps, () => {
    clearInterval(sh);
    sh = setInterval(()=>{
        date += 60*30*60*1000
        state.postdata['time'] = new Date(date).toString()
        getOperationData('post', state.postdata).then((res) => {
            Ippdata.dataFill(res.data)
            console.log(res.data);
        })
    },Ippdata.timestamps)
})

watch(() => Ippdata.id, () => {
    if(state.data.TIC221.length < 100){
        for(let key in Ippdata.tobject()){
            if(key in state.data){
                let now:Date = new Date(Date.parse(Ippdata.tobject().time as string))
                state.data[key].push({
                    name: now,
                    value: [
                        [now.getHours(), now.getMinutes(),now.getSeconds()].join(':'),
                        Ippdata.tobject()[key]
                    ]
                })
            }
        }
    } else if(state.data.TIC221.length >= 100) {
        for(let key in Ippdata.tobject()){
            if(key in state.data){
                state.data[key].shift();
                let now:Date = new Date(+Date.parse(Ippdata.tobject().time as string))
                state.data[key].push({
                    name: now,
                    value: [
                        [now.getHours(), now.getMinutes(),now.getSeconds()].join(':'),
                        Ippdata.tobject()[key]
                    ]
                })
            }
        }
    }
    state.charts[0].setOption({
        series: [
            {
                data: state.data[state.point]
            }
        ]
    })
    console.log(Ippdata);
})

let data:any[] = []
let now = new Date(2022, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 100; i++) {
    data.push(randomData());
}
function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}


const initIppdataChart = () => {
    const IppdataChart = echarts.init(chartRefs.value[0] as HTMLElement)
    const option = {
        title: {
            text: 'Ipp Dynamic Data'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                params = params[0];
                var date = new Date(params.name);
                return (
                    date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    ' : ' +
                    params.value[1]
                );
            },
            axisPointer: {
                animation: false
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
                data: state.data[state.point]
            }
        ]
    }
    IppdataChart.setOption(option)
    state.charts.push(IppdataChart)
}
onMounted(() => {
    sh = setInterval(()=>{
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

const open = () => {
    nextTick(() => {
        //  执行echarts方法
        initIppdataChart()
    })
}

const close = () => {
    state.charts[0].dispose()
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