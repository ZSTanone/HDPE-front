<template lang="">
    <el-card class="box-card" :body-style="{ width: '100%', padding: '0px', marginTop: '2ch',}" shadow="never">

        <el-row :gutter="20" style="margin-top: 4px;">
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" >
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="24">

                <div style="width: 50%; font-size: 18px; fontWeight: bold; margin: 2px auto;text-align:center;">
                    优化前后工艺操作参数对比
                </div>

                <el-table 
                    :data="ParamsTable" :row-style="{ height: '30px' }" :cell-style="setCellColor"
                    :style="largeTable" :header-cell-style="headerStyle2" :border="false">
                    <el-table-column prop="description" label="工艺参数" align="center" />

                    <el-table-column prop="name" label="催化剂" align="center" >
                        <el-table-column prop="TICL4" label="TICL4" align="center" />
                        <el-table-column prop="TEAL" label="TEAL" align="center" />
                    </el-table-column>

                    <el-table-column prop="name" label="R200反应器" align="center" >
                        <el-table-column prop="R200H2" label="H2" align="center" />
                        <el-table-column prop="R200C3H6" label="C3H6" align="center" />
                    </el-table-column>

                    <el-table-column prop="name" label="R201反应器" align="center" >
                        <el-table-column prop="R201H2" label="H2" align="center" />
                        <el-table-column prop="R201C3H6" label="C3H6" align="center" />
                    </el-table-column>

                    <el-table-column prop="name" label="R202反应器" align="center" >
                        <el-table-column prop="R202H2" label="H2" align="center" />
                        <el-table-column prop="R202C3H6" label="C3H6" align="center" />
                    </el-table-column>
                    
                    <el-table-column prop="name" label="R401反应器" align="center" >
                        <el-table-column prop="R401H2" label="H2" align="center" />
                        <el-table-column prop="R401C3H6" label="C3H6" align="center" />
                        <el-table-column prop="R401C2H4" label="C2H4" align="center" />
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>
        <el-row :gutter="20" >
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="24">
                <div style="width: 50%; font-size: 18px; fontWeight: bold; margin: 2px auto; text-align:center;">
                    优化前后产量对比
                </div>
                <el-table 
                    :data="ProductionTable" :row-style="{ height: '30px' }" :cell-style="setCellColor"
                    :style="largeTable" :header-cell-style="headerStyle2" :border="false">
                    <el-table-column prop="description" label="分子量数据" align="center" />
                    <el-table-column prop="均聚物产量" label="均聚物产量" align="center" />
                    <el-table-column prop="总聚合产量" label="总聚合产量" align="center" />
                    <el-table-column prop="总聚合乙烯含量" label="总聚合乙烯含量" align="center" />
                    <el-table-column prop="共聚乙烯含量" label="共聚乙烯含量" align="center" />
                    <el-table-column prop="SCBaver" label="SCBaver" align="center" />
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onActivated, onMounted, onUnmounted, onUpdated, reactive, toRaw, watch } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core';
import { usePPdata} from '/@/stores/PPdata'

const Ippdata = usePPdata()

const state: {
    charts: any[]
} = {
    charts: [],
}

const chartRefs = useTemplateRefsList<HTMLDivElement>()
let R202MWDChart_data: any[] = [[0], [0], [0]]
let R401MWDChart_data: any[] = [[0], [0], [0]]
let CopoMWDChart_data: any[] = [[0], [0], [0]]
let CCDChart_data: any[] = [[0], [0], [0]]
let ChartTitle = ['R202分子量分布对比图', 'R401分子量分布对比图', 'Copo分子量分布对比图', 'CCD对比图']

const initMWdataChart = (chartLable: number) => {
    const MWdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            text: ChartTitle[chartLable],
            left: 'center',
        },
        tooltip: {
            // 在坐标轴上触发显示提示框
            trigger: 'axis',
            // 十字准星显示提示框
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            align: 'left',
            orient: 'horizontal',
            top: 30,
            textStyle:{
                fontSize: 16,//字体大小
                fontWeight: 700,
            },
            // 图例的名称
            data: ['target', 'real', 'opt'],
        },
        xAxis: {
            type: 'value',  // 轴的类型，数值轴
            name: 'logMw', // 轴的名称
            min: 0.65, // 起始，最小值
            // 文本格式
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [10, 0, 0, 0]  // 上右下左
            },
            nameRotate: '0',
            nameLocation: 'center', // 居中显示轴名字
            splitLine: {  // 不显示刻度线
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'dw',
            boundaryGap: ['0%', '20%'],
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [0, 0, 15, 0]
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {   // 显示刻度线 横着的虚线
                show: true,
                lineStyle: {
                    color: '#C6C6C6FF', // 修改网格线颜色
                    type: 'dashed', //网格线的类型
                    width: 1,
                }
            },
        },
        series: [   // 显示三组曲线
            {
                name: 'target',
                data: R202MWDChart_data[0],
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'real',
                data: R202MWDChart_data[1],
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
            {
                name: 'opt',
                data: R202MWDChart_data[2],
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                type: 'line',
                smooth: true
            },
        ]
    }
    MWdataChart.setOption(option)
    state.charts.push(MWdataChart)
}

const ProductionTable = reactive([
    {
        description: '优化值(Kmol/h)',
        '均聚物产量': String(0),
        '总聚合产量': String(0),
        '共聚物产量': String(0),
        '总聚合乙烯含量': String(0),
        '共聚乙烯含量': String(0),
        'SCBaver': String(0),
    },
    {
        description: '当前值(Kmol/h)',
        '均聚物产量': String(0),
        '总聚合产量': String(0),
        '共聚物产量': String(0),
        '总聚合乙烯含量': String(0),
        '共聚乙烯含量': String(0),
        'SCBaver': String(0),
    },
    {
        description: '设定值(Kmol/h)',
        '均聚物产量': String(0),
        '总聚合产量': String(0),
        '共聚物产量': String(0),
        '总聚合乙烯含量': String(0),
        '共聚乙烯含量': String(0),
        'SCBaver': String(0),
    },
])

const ParamsTable = reactive([
    {
        description: '优化值(Kmol/h)',
        TICL4: String(0),
        TEAL: String(0),
        R200H2: String(0),
        R200C3H6: String(0),
        R201H2: String(0),
        R201C3H6: String(0),
        R202H2: String(0),
        R202C3H6: String(0),
        R401H2: String(0),
        R401C3H6: String(0),
        R401C2H4: String(0),
    },
    {
        description: '当前值(Kmol/h)',
        TICL4: String(0),
        TEAL: String(0),
        R200H2: String(0),
        R200C3H6: String(0),
        R201H2: String(0),
        R201C3H6: String(0),
        R202H2: String(0),
        R202C3H6: String(0),
        R401H2: String(0),
        R401C3H6: String(0),
        R401C2H4: String(0),
    },
])

watch(Ippdata, (newVal, ) => {

    let ParamsTableKeys = Object.keys(ParamsTable[0])
    ParamsTableKeys.map((item: string) => {
        if(item !== 'description' && newVal.optValue) {
            ParamsTable[0][item] = String(newVal.optValue[item] ? newVal.optValue[item] : '/').slice(0, 7)
        }
    })
    
    let ProductionTableKeys = Object.keys(ProductionTable[0])
    ProductionTableKeys.map((item: string) => {
        if (item !== 'description' && newVal.Production) {
            ProductionTable[0][item] = String(newVal.Production[item] ? newVal.Production[item] : '/').slice(0, 7)
        }
        if (item !== 'description') {
            ProductionTable[2][item] = String(newVal.targetProduction[item] ? newVal.targetProduction[item] : '/').slice(0, 7)
        }
    })
    
    let Common_X:number[]  = newVal.targetQuality.Common_X
    let CCD_X: number[] = newVal.targetQuality.CCD_X

    let R202MWD_target: number[] = newVal.targetQuality.R202MWD
    let R401MWD_target: number[] = newVal.targetQuality.R401MWD
    let CopoMWD_target: number[] = newVal.targetQuality.copoMWD
    let CCD_Y_target: number[] = newVal.targetQuality.CCD_Y

    let R202MWD_opt: number[] = newVal.optQuality.R202MWD
    let R401MWD_opt: number[] = newVal.optQuality.R401MWD
    let CopoMWD_opt: number[] = newVal.optQuality.copoMWD
    let CCD_Y_opt: number[] = newVal.optQuality.CCD_Y

    // let PlotX = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 
    //     15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 
    //     28.0, 29.0, 31.0, 35.0, 39.0, 44.0, 50.0, 56.0, 63.0, 70.0, 79.0, 89.0, 100.0, 
    //     112.0, 125.0, 141.0, 158.0, 177.0, 199.0, 223.0, 251.0, 281.0, 316.0, 354.0, 398.0, 
    //     446.0, 501.0, 562.0, 630.0, 707.0, 794.0, 891.0, 1000.0, 1122.0, 1258.0, 1412.0, 1584.0, 
    //     1778.0, 1995.0, 2238.0, 2511.0, 2818.0, 3162.0, 3548.0, 3981.0, 4466.0, 5011.0, 5623.0, 
    //     6309.0, 7079.0, 7943.0, 8912.0, 10000.0, 11220.0, 12589.0, 14125.0, 15848.0, 17782.0, 
    //     19952.0, 22387.0, 25118.0, 28183.0, 31622.0, 35481.0, 39810.0, 44668.0, 50118.0, 56234.0,
    //     63095.0, 70794.0, 79432.0, 89125.0, 100000.0]

    R202MWDChart_data[0] = R202MWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    R202MWDChart_data[2] = R202MWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    R401MWDChart_data[0] = R401MWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    R401MWDChart_data[2] = R401MWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    CopoMWDChart_data[0] = CopoMWD_target?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })
    CopoMWDChart_data[2] = CopoMWD_opt?.map((item:number, index:number) => {
        return [Common_X[index], Math.LN10*Number(item)]
    })

    CCDChart_data[0] = CCD_Y_target?.map((item:number, index:number) => {
        return [CCD_X[index], Math.LN10*Number(item)]
    })
    CCDChart_data[2] = CCD_Y_opt?.map((item:number, index:number) => {
        return [CCD_X[index], Math.LN10*Number(item)]
    })

    // if (R202MWD_target) {
    //     R202MWDChart_data[2] = Object.values(Ippdata.opt_Output_Mw).map((item:number[]) => [Math.log10(item[0]), Math.LN10*item[1]])
    // }

    let chartArray = [R202MWDChart_data, R401MWDChart_data, CopoMWDChart_data, CCDChart_data]
    chartArray.forEach((item: any[], index:number) => {
        toRaw(state.charts[index]).setOption({
            series: [
                {
                    name: 'target',
                    data: item[0],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
                {
                    name: 'real',
                    data: item[1],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
                {
                    name: 'opt',
                    data: item[2],
                    symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                    symbolSize: 4,    //小圆点的大小
                    type: 'line',
                    smooth: true
                },
            ]
        })
    })
}, { deep: true })


interface cellstyle {
    row: {
        property:string
    }
    column: {
        property:string
    }
}

const Table = {
    width: '95%',
    'margin': '0',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
    'border-spacing': '0',
    'border-radius': '14px',
}

const largeTable = {
    width: '95%',
    'margin': '2ch auto',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
    'border-spacing': '0',
    'border-radius': '14px',
}

const setCellColor = ( {}:cellstyle ):CSSProperties => {
    return {fontSize: '18px', padding: '0', width: '3vh', height: '5ch', backgroundColor: '#f0f8fffb',
        fontWeight: 600,
    }
}

const headerStyle1 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property !== 'name' && column?.property !== 'description') {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '15px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'R201PDIValue' ) {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '5ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

const headerStyle2 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property !== 'name' && column?.property !== 'description') {
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '15px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'TEAL' 
        || (column.property as string).slice(-4) === 'C3H6') { 
        return {background:'#409eff', opacity: '1', height: '5ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '5ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

onMounted(() => {
    initMWdataChart(0)
    initMWdataChart(1)
    initMWdataChart(2)
    initMWdataChart(3)
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


.box-card {
    width: 100%;
    display: flex;
}

.chart {
    margin-top: 0px;
    width: 100%;
    height: 350px;
}
</style>