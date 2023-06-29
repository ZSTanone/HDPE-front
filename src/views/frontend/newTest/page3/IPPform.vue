<template>
    <div v-show="!isChartVisible" style="background-color: #263962; padding-bottom: 20px">
        <div class="title" style="height: 5px"></div>
        <div class="title">仿真输入</div>

        <el-row class="el-row">
            <el-col :span="7" style="margin-right: 30px; margin-left: 4.5%">
                <el-table
                    :data="R200InTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor1"
                    :header-cell-style="headerStyle1()"
                    @selection-change="handleR200SelectionChange"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R200预聚反应器" align="center">
                        <el-table-column prop="point" label="位号" width="80" align="center" />
                        <el-table-column prop="description" label="工艺参数" width="100" align="center" />
                        <el-table-column prop="value" label="仿真设定值" width="140" align="center">
                            <template #default="scope">
                                <input
                                    type="text"
                                    v-model="scope.row.value"
                                    class="ipt"
                                    style="width: 100px; text-align: center; background-color: transparent; color: aliceblue"
                                    @blur="iptBlur(scope.row, $event)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center" width="70" />
                        <el-table-column type="selection" width="55" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="7" style="margin-right: 30px">
                <el-table
                    :data="R201InTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor2"
                    :header-cell-style="headerStyle1()"
                    @selection-change="handleR201SelectionChange"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R201环管反应器" align="center">
                        <el-table-column prop="point" label="位号" width="80" align="center" />
                        <el-table-column prop="description" label="工艺参数" width="100" align="center" />
                        <el-table-column prop="value" label="仿真设定值" width="140" align="center">
                            <template #default="scope">
                                <input
                                    type="text"
                                    v-model="scope.row.value"
                                    class="ipt"
                                    style="width: 100px; text-align: center; background-color: transparent; color: aliceblue"
                                    @blur="iptBlur(scope.row, $event)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center" width="70" />
                        <el-table-column type="selection" width="55" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="7" style="margin-right: 0px">
                <el-table
                    :data="R202InTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor2"
                    :header-cell-style="headerStyle1()"
                    @selection-change="handleR202SelectionChange"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R202环管反应器" align="center">
                        <el-table-column prop="point" label="位号" width="80" align="center" />
                        <el-table-column prop="description" label="工艺参数" width="100" align="center" />
                        <el-table-column prop="value" label="仿真设定值" width="140" align="center">
                            <template #default="scope">
                                <input
                                    type="text"
                                    v-model="scope.row.value"
                                    class="ipt"
                                    style="width: 100px; text-align: center; background-color: transparent; color: aliceblue"
                                    @blur="iptBlur(scope.row, $event)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center" width="70" />
                        <el-table-column type="selection" width="55" />
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <div class="title" style="margin-top: 20px">仿真输出</div>

        <el-row class="el-row">
            <el-col :span="6.1" style="margin-right: 30px; margin-left: 4.5%">
                <el-table
                    :data="R200OutTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor1"
                    :header-cell-style="headerStyle1()"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R200环管反应器" align="center">
                        <el-table-column prop="description" label="工艺参数" width="130" align="center" />
                        <el-table-column prop="value" label="仿真值" width="140" align="center" />
                        <el-table-column prop="unit" label="单位" align="center" width="100" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="5.9" style="margin-right: 30px">
                <el-table
                    :data="R201OutTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor1"
                    :header-cell-style="headerStyle1()"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R201环管反应器" align="center">
                        <el-table-column prop="description" label="工艺参数" width="130" align="center" />
                        <el-table-column prop="value" label="仿真值" width="140" align="center" />
                        <el-table-column prop="unit" label="单位" align="center" width="100" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="6.1" style="margin-right: 30px">
                <el-table
                    :data="R202OutTable"
                    stripe
                    style="width: 100%"
                    :editable="true"
                    :cell-style="setCellColor1"
                    :header-cell-style="headerStyle1()"
                    :border="false"
                    :style="{ borderRadius: '8px', border: 'none' }"
                >
                    <el-table-column label="R202环管反应器" align="center">
                        <el-table-column prop="description" label="工艺参数" width="130" align="center" />
                        <el-table-column prop="value" label="仿真值" width="140" align="center" />
                        <el-table-column prop="unit" label="单位" align="center" width="100" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="6.1" style="margin-right: 0px">
                <div class="confirmButton">
                    <el-button size="large" type="primary" style="margin: 0 20px 20px 10px; width: 128px" @click="getDefaultValue">
                        获取模型默认输入
                    </el-button>
                    <el-button size="large" type="primary" @click="refreshData" :loading="loading"> 开始仿真 </el-button>
                </div>
            </el-col>
        </el-row>
    </div>

    <el-row v-show="isChartVisible" :gutter="20" style="margin-top: 30px">
        <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12" style="margin-bottom: 10px">
            <ChartBox mainTitle="R201分子量分布" style="--pl: 42px">
                <template #chart>
                    <div class="chart" style="left: 1%" :ref="chartRefs.set"></div>
                </template>
            </ChartBox>
        </el-col>
        <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12" style="margin-bottom: 10px">
            <ChartBox mainTitle="R202分子量分布" style="--pl: 42px">
                <template #chart>
                    <div class="chart" style="left: 1%" :ref="chartRefs.set"></div>
                </template>
            </ChartBox>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { useTemplateRefsList } from '@vueuse/core'
import { ElTable } from 'element-plus'
import * as echarts from 'echarts'
import { ref, reactive, CSSProperties, watch, onMounted, nextTick, onBeforeMount, onActivated, toRaw, onUnmounted } from 'vue'
import ChartBox from './ChartBox.vue'
import { runAspen } from '/@/api/frontend/user'

const props = defineProps<{
    isShow: boolean
    devValue: string
    grade: string
}>()

const isChartVisible = ref(false)
watch(
    () => props.isShow,
    (newVal) => {
        isChartVisible.value = newVal
        let MWD_X = [
            1.624075731, 1.925105727, 2.101196986, 2.226135722, 2.323045735, 2.402226982, 2.469173771, 2.527165718, 2.578318241, 2.624075731,
            2.665468416, 2.703256977, 2.738019083, 2.770203767, 2.80016699, 2.828195714, 2.854524653, 2.879348236, 2.902829332, 2.925105727,
            2.946295026, 2.966498412, 2.985803567, 3.004286973, 3.02201574, 3.039049079, 3.055439495, 3.071233762, 3.086473729, 3.115437425,
            3.168143775, 3.215140338, 3.267528408, 3.323045735, 3.372263758, 3.423416281, 3.469173771, 3.521702822, 3.573465738, 3.624075731,
            3.673293754, 3.720985744, 3.773294844, 3.822732818, 3.872048998, 3.922928808, 3.972380594, 4.023749453, 4.072782051, 4.123762814,
            4.173078993, 4.223958803, 4.27341059, 4.323913457, 4.373812047, 4.423416281, 4.473495145, 4.523896234, 4.573953435, 4.624075731,
            4.674068588, 4.723756372, 4.773910428, 4.823830908, 4.874007488, 4.924018631, 4.973935813, 5.023922444, 5.07401672, 5.124037597,
            5.174059342, 5.224067909, 5.27399445, 5.324000134, 5.374043815, 5.424036259, 5.474047643, 5.524060294, 5.574050909, 5.624075731,
            5.674068588, 5.724066965, 5.774064188, 5.824050194, 5.874056337, 5.924062167, 5.97407163, 6.024060787, 6.074062952, 6.124065065,
            6.174071583, 6.224067909, 6.274072239, 6.324069463, 6.374074708, 6.424070676, 6.474072183, 6.524071229, 6.574075274, 6.624075731,
        ]

        for (let i = 0; i < 2; i++) {
            let MWDChartData = MWDdata[i].map((item: number, index: number) => {
                return [MWD_X[index], Math.LN10 * Number(item)]
            })
            toRaw(state.charts[i]).setOption({
                series: {
                    data: MWDChartData,
                    symbol: 'circle', //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4, //小圆点的大小
                    type: 'line',
                    smooth: true,
                },
            })
        }

        echartsResize()
    }
)

const state: {
    charts: any[]
} = {
    charts: [],
}

type PointTable = {
    point?: string
    description: string
    value: string
    unit: string
}

const R200InTable: PointTable[] = reactive([
    {
        point: 'FIC141',
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC111',
        description: 'TEAL',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'TIC221',
        description: '温度',
        value: String(0),
        unit: '℃',
    },
    {
        point: 'PIC221',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC204',
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
] as any)

const R201InTable: PointTable[] = reactive([
    {
        point: 'TIC241',
        description: '温度',
        value: String(0),
        unit: '℃',
    },
    {
        point: 'PIC241',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC201',
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC203',
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R202InTable: PointTable[] = reactive([
    {
        point: 'TIC251',
        description: '温度',
        value: String(0),
        unit: '℃',
    },
    {
        point: 'PIC251',
        description: '压力',
        value: String(0),
        unit: 'MPa',
    },
    {
        point: 'FIC202',
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        point: 'FIC231',
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
])

const R200OutTable: PointTable[] = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: '转化率',
        value: String(0),
        unit: '％',
    },
    {
        description: '固含率',
        value: String(0),
        unit: '％',
    },
    {
        description: '乙烯含量',
        value: String(0),
        unit: '％',
    },
    {
        description: '平均分子量',
        value: String(0),
        unit: 'g/mol',
    },
    {
        description: 'PDI',
        value: String(0),
        unit: '无',
    },
])

const R201OutTable: PointTable[] = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: '转化率',
        value: String(0),
        unit: '％',
    },
    {
        description: '固含率',
        value: String(0),
        unit: '％',
    },
    {
        description: '乙烯含量',
        value: String(0),
        unit: '％',
    },
    {
        description: '平均分子量',
        value: String(0),
        unit: 'g/mol',
    },
    {
        description: 'PDI',
        value: String(0),
        unit: '无',
    },
])

const R202OutTable: PointTable[] = reactive([
    {
        description: 'H2',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'C3H6',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TICL4',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'TEA',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: 'PP',
        value: String(0),
        unit: 'Kg/h',
    },
    {
        description: '转化率',
        value: String(0),
        unit: '％',
    },
    {
        description: '固含率',
        value: String(0),
        unit: '％',
    },
    {
        description: '乙烯含量',
        value: String(0),
        unit: '％',
    },
    {
        description: '平均分子量',
        value: String(0),
        unit: 'g/mol',
    },
    {
        description: 'PDI',
        value: String(0),
        unit: '无',
    },
])

const chartRefs = useTemplateRefsList<HTMLDivElement>()
const keyList = {
    ConvertRate: ['R200_ConvertRate', 'R201_ConvertRate', 'R202_ConvertRate'],
    SolidHoldup: ['R200_SolidHoldup', 'R201_SolidHoldup', 'R202_SolidHoldup'],
    C2H4Content: ['R201_C2H4Content', 'R202_C2H4Content'],
    MWW: ['R200_MWW', 'R201_MWW', 'R202_MWW'],
    PDI: ['R200_PDI', 'R201_PDI', 'R202_PDI'],
    MWDdata: ['Output_R201_MW', 'Output_R202_MW'],
}
let Production: number[] = []
let ConvertRate: number[] = []
let SolidHoldup: number[] = []
let C2H4Content: number[] = []
let MWW: number[] = []
let PDI: number[] = []
let MWDdata: any[] = [[], []]

const initMWdataChart = (chartLable: number) => {
    const MWdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        legend: {
            align: 'left',
            orient: 'horizontal',
            inactiveColor: '#bbb',
            top: 30,
            textStyle: {
                fontSize: 16, //字体大小
                fontWeight: 700,
                color: 'white',
            },
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            axisLabel: {
                textStyle: {
                    color: '#4BCCFF', //坐标的字体颜色
                },
            },
            min: 0.65, // 起始
            nameTextStyle: {
                fontSize: 18,
                color: '#4BCCFF',
                fontWeight: 'bold',
                padding: [10, 0, 0, 0],
            },
            nameRotate: '0',
            nameLocation: 'center',
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            name: 'dw',
            axisLabel: {
                textStyle: {
                    color: '#7edae8', //坐标的字体颜色
                },
            },
            boundaryGap: ['0%', '20%'],
            nameTextStyle: {
                fontSize: 18,
                color: '#4BCCFF',
                fontWeight: 'bold',
                padding: [0, 0, 15, 0],
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#C6C6C6FF', // 修改网格线颜色
                    type: 'dashed', //网格线的类型
                    width: 1,
                },
            },
        },
        series: [
            {
                data: MWDdata[0],
                symbol: 'circle', //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4, //小圆点的大小
                type: 'line',
                smooth: true,
            },
        ],
    }
    MWdataChart.setOption(option)
    state.charts.push(MWdataChart)
}

const loading = ref<boolean>(false)

const getDefaultValue = () => {
    let postdata = {
        reaction: props.devValue,
        grade: props.grade,
        pointlist: {},
        getDefaultValue: true,
    }
    runAspen('post', postdata).then((res) => {
        let R200KeyList = ['TICL4', 'TEAL', 'R200Temp', 'R200PRES', 'R200C3H6']
        let R201KeyList = ['R201Temp', 'R201PRES', 'R201H2', 'R201C3H6']
        let R202KeyList = ['R202Temp', 'R202PRES', 'R202H2', 'R202C3H6']

        R200KeyList.forEach((item: string, index: number) => {
            R200InTable[index].value = res.data[item]
        })
        R201KeyList.forEach((item: string, index: number) => {
            R201InTable[index].value = res.data[item]
        })
        R202KeyList.forEach((item: string, index: number) => {
            R202InTable[index].value = res.data[item]
        })
    })
}

const refreshData = () => {
    loading.value = true
    let pointlist = {}
    R200MultipleSelection.value.forEach((item: PointTable) => {
        if (item.description === '温度') {
            pointlist['R200Temp'] === item.value
        } else if (item.description === '压力') {
            pointlist['R200PRES'] === item.value
        } else if (item.description === 'C3H6') {
            pointlist['R200C3H6'] === item.value
        } else if (item.description === 'TICL4') {
            pointlist['TICL4'] === item.value
        } else if (item.description === 'TEAL') {
            pointlist['TEAL'] === item.value
        }
    })
    R201MultipleSelection.value.forEach((item: PointTable) => {
        if (item.description === '温度') {
            pointlist['R201Temp'] === item.value
        } else if (item.description === '压力') {
            pointlist['R201PRES'] === item.value
        } else if (item.description === 'H2') {
            pointlist['R201H2'] === item.value
        } else if (item.description === 'C3H6') {
            pointlist['R201C3H6'] === item.value
        }
    })
    R202MultipleSelection.value.forEach((item: PointTable) => {
        if (item.description === '温度') {
            pointlist['R202Temp'] === item.value
        } else if (item.description === '压力') {
            pointlist['R202PRES'] === item.value
        } else if (item.description === 'H2') {
            pointlist['R202H2'] === item.value
        } else if (item.description === 'C3H6') {
            pointlist['R202C3H6'] === item.value
        }
    })
    let postdata = {
        reaction: props.devValue,
        grade: props.grade,
        pointlist: pointlist,
        getDefaultValue: false,
    }

    runAspen('post', postdata).then((res) => {
        let data = res.data

        Production = data['Production']
        ConvertRate = data['ConvertRate']
        SolidHoldup = data['SolidHoldup']
        C2H4Content = data['C2H4Content']
        MWW = data['MWW']
        PDI = data['PDI']

        MWDdata.forEach((item: number[], index: number) => {
            MWDdata[index] = data[keyList['MWDdata'][index]]
        })

        for (let j = 0; j < 5; j++) {
            R200OutTable[j].value = String(Production[j])
        }
        for (let j = 0; j < 5; j++) {
            R201OutTable[j].value = String(Production[5 + j])
        }
        for (let j = 0; j < 5; j++) {
            R202OutTable[j].value = String(Production[10 + j])
        }

        R200OutTable[5].value = String(ConvertRate[0].toFixed(3))
        R201OutTable[5].value = String(ConvertRate[1].toFixed(3))
        R202OutTable[5].value = String(ConvertRate[2].toFixed(3))
        R200OutTable[6].value = String(SolidHoldup[0].toFixed(3))
        R201OutTable[6].value = String(SolidHoldup[1].toFixed(3))
        R202OutTable[6].value = String(SolidHoldup[2].toFixed(3))
        R200OutTable[7].value = String(C2H4Content[0].toFixed(3))
        R201OutTable[7].value = String(C2H4Content[1].toFixed(3))
        R202OutTable[7].value = String(C2H4Content[2].toFixed(3))
        R200OutTable[8].value = String(MWW[0].toFixed(3))
        R201OutTable[8].value = String(MWW[1].toFixed(3))
        R202OutTable[8].value = String(MWW[2].toFixed(3))
        R200OutTable[9].value = String(PDI[0].toFixed(3))
        R201OutTable[9].value = String(PDI[1].toFixed(3))
        R202OutTable[9].value = String(PDI[2].toFixed(3))

        let MWD_X = [
            1.624075731, 1.925105727, 2.101196986, 2.226135722, 2.323045735, 2.402226982, 2.469173771, 2.527165718, 2.578318241, 2.624075731,
            2.665468416, 2.703256977, 2.738019083, 2.770203767, 2.80016699, 2.828195714, 2.854524653, 2.879348236, 2.902829332, 2.925105727,
            2.946295026, 2.966498412, 2.985803567, 3.004286973, 3.02201574, 3.039049079, 3.055439495, 3.071233762, 3.086473729, 3.115437425,
            3.168143775, 3.215140338, 3.267528408, 3.323045735, 3.372263758, 3.423416281, 3.469173771, 3.521702822, 3.573465738, 3.624075731,
            3.673293754, 3.720985744, 3.773294844, 3.822732818, 3.872048998, 3.922928808, 3.972380594, 4.023749453, 4.072782051, 4.123762814,
            4.173078993, 4.223958803, 4.27341059, 4.323913457, 4.373812047, 4.423416281, 4.473495145, 4.523896234, 4.573953435, 4.624075731,
            4.674068588, 4.723756372, 4.773910428, 4.823830908, 4.874007488, 4.924018631, 4.973935813, 5.023922444, 5.07401672, 5.124037597,
            5.174059342, 5.224067909, 5.27399445, 5.324000134, 5.374043815, 5.424036259, 5.474047643, 5.524060294, 5.574050909, 5.624075731,
            5.674068588, 5.724066965, 5.774064188, 5.824050194, 5.874056337, 5.924062167, 5.97407163, 6.024060787, 6.074062952, 6.124065065,
            6.174071583, 6.224067909, 6.274072239, 6.324069463, 6.374074708, 6.424070676, 6.474072183, 6.524071229, 6.574075274, 6.624075731,
        ]

        loading.value = false

        for (let i = 0; i < 2; i++) {
            let MWDChartData = MWDdata[i].map((item: number, index: number) => {
                return [MWD_X[index], Math.LN10 * Number(item)]
            })
            toRaw(state.charts[i]).setOption({
                series: {
                    data: MWDChartData,
                    symbol: 'circle', //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4, //小圆点的大小
                    type: 'line',
                    smooth: true,
                },
            })
        }
    })
}

onMounted(() => {
    setTimeout(() => {
        initMWdataChart(0)
        initMWdataChart(1)
    }, 500)
})

onUnmounted(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})

const echartsResize = () => {
    nextTick(() => {
        for (const key in state.charts) {
            state.charts[key].resize()
        }
    })
}

onBeforeMount(() => {
    nextTick(() => {
        echartsResize()
    })
})

onActivated(() => {
    echartsResize()
})

//失焦事件，使用事件对象拿到dom元素并进行后续样式的修改
const iptBlur = (value: any, e: any) => {
    // 输入框失焦之后，背景颜色变为粉色
    e.target.style.color = '#6abeff'
    e.target.style['font-weight'] = 'bold'
}

const R200MultipleSelection = ref([])
const handleR200SelectionChange = (val: any) => {
    R200MultipleSelection.value = val
}

const R201MultipleSelection = ref([])
const handleR201SelectionChange = (val: any) => {
    R201MultipleSelection.value = val
}

const R202MultipleSelection = ref([])
const handleR202SelectionChange = (val: any) => {
    R202MultipleSelection.value = val
}

interface cellstyle {
    row: {
        property: string
    }
    column: {
        property: string
    }
}

const setCellColor1 = ({ row, column }: cellstyle): CSSProperties => {
    return {
        background: '#3255A6',
        color: '#ffffff',
        border: 'none',
        'font-size': '16px',
        'font-weight': 500,
        padding: '5px 0px',
    }
}

const setCellColor2 = ({ row, column }: cellstyle): CSSProperties => {
    return {
        background: '#3255A6',
        color: '#ffffff',
        border: 'none',
        'font-size': '16px',
        'font-weight': 500,
        padding: '9px 0px',
    }
}

const headerStyle1 = (): CSSProperties => {
    return {
        background: '#263962',
        opacity: '1',
        height: '20px',
        'font-weight': 'bold',
        'font-size': '16px',
        color: '#ffffff',
        border: 'none',
    }
}

const headerStyle2 = (): CSSProperties => {
    return {
        background: '#409eff',
        opacity: '1',
        height: '24px',
        'font-weight': 'bold',
        'font-size': '16px',
        padding: '3px 3px',
        color: '#ffffff',
        border: 'none',
    }
}
</script>

<style scoped lang="scss">
// 设置表格中输入框为边框为0
.ipt {
    border: 0px;
}

.title {
    margin: 5px auto;
    background-color: transparent;
    width: 80px;
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    font-weight: 700;
    color: aliceblue;
}

:deep(.el-table) {
    border-radius: 8px;
    border: none;
    background-color: #6abeff;
}

.confirmButton {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 140px;
    height: 100px;
    bottom: 10px;
}

.chart {
    width: 98%;
    height: 100%;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 1vh;

    position: absolute;
    left: 1%;
    top: -1%;
}
</style>
