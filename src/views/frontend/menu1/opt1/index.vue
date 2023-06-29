<template>
    <div class="outer">
        <div class="box1">
            <el-button size="small" type="primary" class="FC41058 custom-button1">{{ FC41058 }}</el-button>
            <el-button size="small" type="primary" class="FC41053 custom-button1">{{ FC41053 }}</el-button>
            <el-button size="small" type="primary" class="FC41049 custom-button1">{{ FC41049 }}</el-button>
            <el-button size="small" type="primary" class="FC30253 custom-button1">{{ FC30253 }}</el-button>
            <el-button size="small" type="primary" class="FC30493 custom-button1">{{ FC30493 }}</el-button>
            <el-button size="small" type="primary" class="FC41048 custom-button1">{{ FC41048 }}</el-button>

            <el-button size="small" type="primary" class="FC42058 custom-button1">{{ FC42058 }}</el-button>
            <el-button size="small" type="primary" class="FC42053 custom-button1">{{ FC42053 }}</el-button>
            <el-button size="small" type="primary" class="FC42049 custom-button1">{{ FC42049 }}</el-button>
            <el-button size="small" type="primary" class="FC30486 custom-button1">{{ FC30486 }}</el-button>
            <el-button size="small" type="primary" class="FC42048 custom-button1">{{ FC42048 }}</el-button>

            <el-button size="large" type="primary" class="yeild">{{ Yeild }} kg/h</el-button>

            <el-row class="timeSetter">
                <el-col :span="2.9" style="margin-right: 10px">
                    <el-tag class="ml-2" size="large" effect="dark">设置查询频率</el-tag>
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
            </el-row>

            <div class="table">
                <el-table
                    :data="R4101In"
                    :row-style="{ height: '1.6vw' }"
                    :cell-style="setCellColor"
                    :style="Table"
                    :border="false"
                    :header-cell-style="headerStyle()"
                >
                    <el-table-column prop="name" label="R4101环管反应器工艺参数" align="center">
                        <!-- <el-table-column prop="point" label="位点" align="center" /> -->
                        <el-table-column prop="description" label="说明" align="center" />
                        <el-table-column prop="value" label="数值" align="center"/>
                    </el-table-column>
                </el-table>

                <el-table
                    :data="R4201In"
                    :row-style="{ height: '1.6vw' }"
                    :cell-style="setCellColor"
                    :style="Table"
                    :border="false"
                    :header-cell-style="headerStyle()"
                >
                    <el-table-column prop="name" label="R4201环管反应器工艺参数" align="center">
                        <!-- <el-table-column prop="point" label="位点" align="center" /> -->
                        <el-table-column prop="description" label="说明" align="center" />
                        <el-table-column prop="value" label="数值" align="center" />
                    </el-table-column>
                </el-table>

                <el-table
                    :data="Mirco1"
                    :row-style="{ height: '1.6vw' }"
                    :cell-style="setCellColor"
                    :style="Table"
                    :border="false"
                    :header-cell-style="headerStyle()"
                >
                    <el-table-column prop="name" label="微观指标预测" align="center">
                        <!-- <el-table-column prop="point" label="位点" align="center" /> -->
                        <el-table-column prop="description" label="说明" align="center" />
                        <el-table-column prop="value" label="数值" align="center" />
                        <!-- <el-table-column prop="unit" label="单位" align="center" /> -->
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- <el-dialog v-model="dialogVisible" width="45%" draggable @open="open()" @close="close()">
            <template #header>
                <h1 style="text-align: center">历史曲线图</h1>
            </template>
            <div style="width: 100%; height: 380px" :ref="chartRefs.set"></div>
        </el-dialog> -->
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, Ref, watch, toRaw, onUnmounted, onBeforeMount, CSSProperties, watchEffect } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'
import * as echarts from 'echarts'
import { useHDPEdata } from '/@/stores/hdpedata'
import { storeToRefs } from 'pinia'
import { getHDPEData } from '/@/api/frontend/user/index'

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

const R4101In = reactive([
    {
        axis: 'T1_1',
        description: '氢气乙烯比',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T1_2',
        description: '共聚单体乙烯比',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T1_3',
        description: '催化剂进料量(kg/h)',
        value: String(0),
        unit: 'kg/h',
    },
    {
        axis: 'T1_4',
        description: '',
        value: String(),
        unit: 'kg/h',
    },
])

const R4201In = reactive([
    {
        axis: 'T2_1',
        description: '氢气乙烯比',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T2_2',
        description: '共聚单体乙烯比',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T2_3',
        description: '',
        value: String(),
        unit: '1',
    },
    {
        axis: 'T2_4',
        description: '',
        value: String(),
        unit: '1',
    },
])

const Mirco1 = reactive([
    {
        axis: 'T3_1',
        description: '重均分子量',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T3_2',
        description: '多分散性指数',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T3_3',
        description: '熔融指数',
        value: String(0),
        unit: '1',
    },
    {
        axis: 'T3_3',
        description: '密度',
        value: String(0),
        unit: '1',
    },
])

const HDPEdata = useHDPEdata()
// 位点数据后端保留三位小数处理
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048, Yeild } = storeToRefs(HDPEdata)
// const dialogVisible = ref(false)
// const chartRefs = useTemplateRefsList<HTMLDivElement>()
const freqValue = ref('Option2')
// 时间间隔  默认60 min
let timestamps: Ref<number> = ref(HDPEdata.timeset)
// 时间是否改变
let timestampsischange = true

let date = 1637933400 * 1000

const state: {
    point: string // 位点
    charts: any[] // 保存的是图表实例
    chartdata: [] // 历史数据
    postdata: object // 请求字段
} = reactive({
    point: 'FIC141',
    charts: [],
    chartdata: [],
    postdata: {
        reaction: 'Option1',
        time: new Date(1636326000 * 1000).toString(), //2021-11-08 07:00:00
        full: false,
    },
})

// 监听查询频率的变化
watchEffect(() => {
    if (freqValue.value === 'Option1' && timestamps.value && timestampsischange) {
        timestampsischange = false
        HDPEdata.timeset = timestamps.value
        setTimeout(() => {
            HDPEdata.timestamps = timestamps.value * 1000
            timestampsischange = true
            console.log('查询时间发生变化')
        }, 1000)
    } else if (freqValue.value === 'Option2' && timestamps.value && timestampsischange) {
        timestampsischange = false
        HDPEdata.timeset = timestamps.value
        setTimeout(() => {
            HDPEdata.timestamps = timestamps.value * 1000 * 60
            timestampsischange = true
            console.log('查询时间发生变化')
        }, 1000)
    }
})

let sh: any
// 如果查询时间更改，需要重新设置定时器进行轮询
watch(
    () => HDPEdata.timestamps,
    () => {
        clearInterval(sh)
        sh = setInterval(() => {
            // 请求时间向后增加30min
            date += 30 * 60 * 1000
            // 更新请求负载
            state.postdata['time'] = new Date(date).toString()

            // 从后端获得位点数据，并使用dataFill（state）更新当前仓库的状态
            getHDPEData('post', state.postdata).then((res) => {
                HDPEdata.dataFill(res.data)
                // console.log('更新数据');
            })
        }, HDPEdata.timestamps)
    }
)


// 表格样式
const Table = {
    width: '22%',
    'margin-left': '15px',
    'margin-right': '15px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    'background-color': '#f5f5f5', // 设置表格背景颜色
}

interface cellstyle {
    row: {
        property: string
    }
    column: {
        property: string
    }
}

// 设置表格中指定内容的字体样式
const setCellColor = ({ row, column }: cellstyle): CSSProperties => {
    if (column.property === 'value') {
        return { color: '#c69363', 'font-weight': 'bold', 'font-size': '12px', padding: '3px 3px' }
    } else {
        return { 'font-size': '12px', padding: '3px 3px' }
    }
}

const headerStyle = (): CSSProperties => {
    return {
        background: '#7399c1',
        opacity: '1',
        height: '1.8vw',
        'font-weight': 'bold',
        'font-size': '16px',
        padding: '3px 3px',
        color: '#ffffff',
        border: '0px',
    }
}

// 页面初始化时就是进行轮询
onMounted(() => {
    sh = setInterval(() => {
        // 30*60*1000就是半个小时 请求数据的时间间隔为半小时
        date += 30 * 60 * 1000
        // 更新状态state中的时间
        state.postdata['time'] = new Date(date).toString()
        // 向后端请求该点位当前时刻的数据
        getHDPEData('post', state.postdata).then((res) => {
            // 是将获取的最新点位数据合并到当前组件的状态对象中，并更新组件的状态
            // 注意这些数据必须是响应式的
            HDPEdata.dataFill(res.data)
            // console.log('更新数据');
        })
    }, HDPEdata.timestamps)
})

onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

onUnmounted(() => {
    clearInterval(sh)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'menu1/opt1',
})
</script>

<style scoped lang="scss">
.outer {
    background-color: white;
    padding-top: 10px;
    padding-left: 20px;

    width: 100vw;
    height: 100vh;

    .custom-button1 {
        background-color: transparent;
        color: #1555cd;
        font-weight: bold;
        border: none;
        font-size: medium;
    }

    .yeild {
        position: absolute;
        top: 5.9 * 5vw;
        left: 13.1 * 5vw;

        background-color: transparent;
        color: rgb(42, 103, 209);
        font-weight: bold;
        border: none;
        font-size: 0.8vw;
    }

    .box1 {
        position: relative;

        width: 100%;
        height: 100%;
        // height: 1200px;
        background-image: url(/@/assets/product/HDPE0604.png);

        background-repeat: no-repeat;
        // 适应屏幕大小
        background-size: 80% auto; //自己掌握缩放比例

        background-position: 25% 0;

        // display: flex;  // 这里需要flex

        .FC41058 {
            position: absolute;
            top: 4.82 * 5vw;
            left: 2.6 * 5vw;
        }

        .FC41053 {
            position: absolute;
            top: 5.12 * 5vw;
            left: 2.7 * 5vw;
        }

        .FC41049 {
            position: absolute;
            top: 5.42 * 5vw;
            left: 3 * 5vw;
        }

        .FC30253 {
            position: absolute;
            top: 5.7 * 5vw;
            left: 3.3 * 5vw;
        }

        .FC30493 {
            position: absolute;
            top: 6 * 5vw;
            left: 3.55 * 5vw;
        }

        .FC41048 {
            position: absolute;
            top: 6.28 * 5vw;
            left: 3.85 * 5vw;
        }

        .FC42058 {
            position: absolute;
            top: 4.98 * 5vw;
            left: 7.8 * 5vw;
        }

        .FC42053 {
            position: absolute;
            top: 5.3 * 5vw;
            left: 8.1 * 5vw;
        }

        .FC42049 {
            position: absolute;
            top: 5.59 * 5vw;
            left: 8.35 * 5vw;
        }

        .FC30486 {
            position: absolute;
            top: 5.87 * 5vw;
            left: 8.6 * 5vw;
        }

        .FC42048 {
            position: absolute;
            top: 6.17 * 5vw;
            left: 8.96 * 5vw;
        }

        .table {
            position: absolute;
            display: flex;
            width: 100%;
            top: 6.8 * 5vw;
            left: 8vw;
        }
    }
}

/* 改变鼠标悬停时的背景颜色 */
:deep(.el-table tbody tr:hover > td) {
    background-color: #fbfaea !important;
}

// 修改表格的背景颜色
:deep(.el-table tbody tr > td) {
    background-color: #eef9ff;
}
</style>
