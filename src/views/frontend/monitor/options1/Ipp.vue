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
import { nextTick, onMounted, reactive, ref, watch, toRaw, onUnmounted,onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { useIppdata } from '/@/stores/ippdata'
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { getOperationData } from '/@/api/frontend/user/index'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const Ippdata = useIppdata()
// 将pinia状态仓库中的变量转换为响应式
const { TIC221, PIC221, FIC141, FIC111,
    FIC121, FIC204, TIC241, PIC241,
    FIC203, FIC201, TIC251, PIC251,
    FIC231, FIC202 } = storeToRefs(Ippdata);
const { t } = useI18n()
const chartRefs = useTemplateRefsList<HTMLDivElement>()

// 初始时间戳（单位毫秒）：换算：北京时间：2021-11-26 21:30:00
let date = 1637933400 * 1000
const state: {
    point: string   // 位点
    charts: any[]   // 保存的是图表实例
    form: object    // 暂时没用
    pauseWork: boolean  // 暂时没用

    chartdata: []       // 历史数据
    postdata: object    // 请求字段
} = reactive({
    point: 'FIC141',
    charts: [],
    form: {},
    pauseWork: false,
    chartdata: [],
    postdata: {
        reaction: 'Option1',
        time: new Date(1636326000 * 1000).toString(),   //2021-11-08 07:00:00
        full: false
    }
})

// 用于存放历史数据,画图
const chart_data: {
    time: any[],
    TIC221: any[], PIC221: any[], FIC141: any[], FIC111: any[],
    FIC121: any[], FIC204: any[], TIC241: any[], PIC241: any[],
    FIC201A: any[], FIC201B: any[], FIC201C: any[], FIC203: any[],
    FIC201: any[], TIC251: any[], PIC251: any[], FIC202A: any[],
    FIC202B: any[], FIC202C: any[], FIC231: any[], FIC202: any[],
} = {
    time: [],
    TIC221: [], PIC221: [], FIC141: [], FIC111: [],
    FIC121: [], FIC204: [], TIC241: [], PIC241: [],
    FIC201A: [], FIC201B: [], FIC201C: [], FIC203: [],
    FIC201: [], TIC251: [], PIC251: [], FIC202A: [],
    FIC202B: [], FIC202C: [], FIC231: [], FIC202: [],
}

// sh就是一个变量用于存放定时器
let sh: any;

// 如果查询时间改变,清除当前定时器,创建一个新的定时器
watch(() => Ippdata.timestamps, () => {
    clearInterval(sh);
    sh = setInterval(() => {
        // 请求时间向后增加30min
        date += 30 * 60 * 1000
        // 更新请求负载
        state.postdata['time'] = new Date(date).toString()
        
        // 从后端获得位点数据，并使用dataFill（state）更新当前仓库的状态
        getOperationData('post', state.postdata).then((res) => {
            Ippdata.dataFill(res.data)
            // console.log('更新数据');
        })
    }, Ippdata.timestamps)
})

watch(() => Ippdata.id, () => {
    // 历史数据小于50条
    if (chart_data.TIC221.length < 50) {
        // for in 返回的是obj中的key（这里主要针对的是那些点位）
        for (let key in Ippdata.tobject()) {
            // 这个if循环就是过滤出点位数据
            if (key in chart_data) {
                // now变量用于保存后端返回的最新数据中的时间戳（Date.parse（）就是标准时间转时间戳）
                let now: Date = new Date(+Date.parse(Ippdata.tobject().time as string))
                // 将数据以对象形式存入对应点位的数组
                chart_data[key].push({
                    name: now.toString(),
                    value: [
                        now,
                        Ippdata.tobject()[key]
                    ]
                })
            }
        }
    } else if (chart_data.TIC221.length >= 50) {
        // 如果保存的数据大于等于50条
        for (let key in Ippdata.tobject()) {
            if (key in chart_data) {
                // 调用数组的shift方法，把数组的第一个元素从其中删除，其余逻辑不变
                chart_data[key].shift();
                let now: Date = new Date(+Date.parse(Ippdata.tobject().time as string))
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

    // 若我们当前打开了某个点位的图表，并且恰好后端返回数据,就会进入以下逻辑对图表数据进行更新
    if (state.charts[0]) {
        // toRaw作用是将响应式对象转换为普通的对象
        toRaw(state.charts[0]).setOption({
            // 更新该点位的数据
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
                    time.slice(16, 24) +
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

// 页面初始化时就是进行轮询
onMounted(() => {

    sh = setInterval(() => {
        // 30*60*1000就是半个小时
        date += 30 * 60 * 1000
        // 更新状态state中的时间
        state.postdata['time'] = new Date(date).toString()
        // 向后端请求该点位当前时刻的数据
        getOperationData('post', state.postdata).then((res) => {
            // 是将获取的最新点位数据合并到当前组件的状态对象中，并更新组件的状态
            // 注意这些数据必须是响应式的
            Ippdata.dataFill(res.data)
            // console.log('更新数据');
        })
    }, Ippdata.timestamps)
})

// 在挂载前清空所有的图表实例
onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

onUnmounted(() => {
    clearInterval(sh);
})

const changePoint = (point: string) => {
    // 显示对话框
    dialogVisible.value = true
    // 更新位点
    state.point = point
}

const open = () => {
    nextTick(() => {
        //  执行echarts方法
        initIppdataChart()

        console.log(chart_data);
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