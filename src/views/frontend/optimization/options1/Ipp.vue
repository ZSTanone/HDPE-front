<template lang="">
    <el-card class="box-card" :body-style="{ width: '100%', padding: '0px', marginTop: '2ch',}" shadow="never">
        <el-row :gutter="20" style="margin-top: 10px;">
            <!-- 分子量分布对比图，左上 -->
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="chart" :ref="chartRefs.set"></div>
            </el-col>
            <!-- 右上 -->
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="12">
                <div style="width: 50%; font-size: 22px; fontWeight: bold; margin: 2% auto">
                    优化前后重均分子量、PDI
                </div>
                <el-table 
                    :data="MwAndPdiTable" :row-style="{ height: '40px' }" :cell-style="setCellColor"
                    :style="Table" :header-cell-style="headerStyle1" :border="false">
                    <!-- 第一列：分子量数据 -->
                    <el-table-column prop="description" label="分子量数据" align="center" />
                    <!-- 第二列：R201反应器 -->
                    <el-table-column prop="name" label="R201反应器" align="center" >
                        <el-table-column prop="R201MWWValue" label="MWW(Kmol/h)" align="center" />
                        <el-table-column prop="R201PDIValue" label="PDI(Kmol/h)" align="center" />
                    </el-table-column>
                    <!-- 第三列：R202反应器 -->
                    <el-table-column prop="name" label="R202反应器" align="center" >
                        <el-table-column prop="R202MWWValue" label="MWW(Kmol/h)" align="center" />
                        <el-table-column prop="R202PDIValue" label="PDI(Kmol/h)" align="center" />
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 下方图表 -->
        <el-row :gutter="20" >
            <el-col class="lg-mb-20" :xs="24" :sm="24" :md="24" :lg="24">
                <div style="width: 50%; font-size: 22px; fontWeight: bold; margin: 1% auto;text-align:center;">
                    优化前后重均分子量、PDI
                </div>
                <el-table 
                    :data="ParamsTable" :row-style="{ height: '40px' }" :cell-style="setCellColor"
                    :style="largeTable" :header-cell-style="headerStyle2" :border="false">
                    <el-table-column prop="description" label="工艺参数" align="center" />
                    <el-table-column prop="name" label="催化剂" align="center" >
                        <el-table-column prop="TICL4" label="TICL4(Kmol/h)" align="center" />
                        <el-table-column prop="TEAL" label="TEAL(Kmol/h)" align="center" />
                    </el-table-column>
                    <el-table-column prop="name" label="R200反应器" align="center" >
                        <el-table-column prop="R200H2" label="H2(Kmol/h)" align="center" />
                        <el-table-column prop="R200C3H6" label="C3H6(Kmol/h)" align="center" />
                    </el-table-column>
                    <el-table-column prop="name" label="R201反应器" align="center" >
                        <el-table-column prop="R201H2" label="H2(Kmol/h)" align="center" />
                        <el-table-column prop="R201C3H6" label="C3H6(Kmol/h)" align="center" />
                    </el-table-column>
                    <el-table-column prop="name" label="R202反应器" align="center" >
                        <el-table-column prop="R202H2" label="H2(Kmol/h)" align="center" />
                        <el-table-column prop="R202C3H6" label="C3H6(Kmol/h)" align="center" />
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>        
    </el-card>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useTemplateRefsList } from '@vueuse/core';

const state: {
    charts: any[]
} = {
    charts: [],
}

const chartRefs = useTemplateRefsList<HTMLDivElement>()
let ppChart_data: any[] = [[0], [0]]

const initMWdataChart = (chartLable: number) => {
    const MWdataChart = echarts.init(chartRefs.value[chartLable] as HTMLElement)
    let option = {
        title: {
            text: '分子量分布对比图',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        formatter: function (params: any) {
            params = params[0]
            return (
                'xAxis:' + params?.data[0]?.toFixed(3) + '; ' + 'yAxis:' + params?.data[1]?.toFixed(3)
            );
        },
        xAxis: {
            type: 'value',
            name: 'logMw',
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [10, 0, 0, 0]
            },
            nameRotate: '0',
            nameLocation: 'center',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'dw',
            nameTextStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                padding: [0, 0, 15, 0]
            },
            nameRotate: '90',
            nameLocation: 'center',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#C6C6C6FF', // 修改网格线颜色
                    type: 'dashed', //网格线的类型
                    width: 1,
                }
            },
        },
        series: [
            {
                data: ppChart_data[chartLable],
                symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                symbolSize: 4,    //小圆点的大小
                itemStyle: {
                    color: '#F2597F'    //小圆点和线的颜色
                },
                type: 'line',
                smooth: true
            }
        ]
    }
    MWdataChart.setOption(option)
    state.charts.push(MWdataChart)
}

// 每个对象表示表格的一行
const MwAndPdiTable = reactive([
    {
        description: '优化值',
        R201MWWValue: String(0),
        R201PDIValue: String(0),
        R202MWWValue: String(0),
        R202PDIValue: String(0),
    },
    {
        description: '当前值',
        R201MWWValue: String(0),
        R201PDIValue: String(0),
        R202MWWValue: String(0),
        R202PDIValue: String(0),
    },
    {
        description: '测试测试',
        R201MWWValue: String(1),
        R201PDIValue: String(2),
        R202MWWValue: String(3),
        R202PDIValue: String(4),
    },
])

const ParamsTable = reactive([
    {
        description: '优化值',
        TICL4: String(0),
        TEAL: String(0),
        R200H2: String(0),
        R200C3H6: String(0),
        R201H2: String(0),
        R201C3H6: String(0),
        R202H2: String(0),
        R202C3H6: String(0),
    },
    {
        description: '当前值',
        TICL4: String(0),
        TEAL: String(0),
        R200H2: String(0),
        R200C3H6: String(0),
        R201H2: String(0),
        R201C3H6: String(0),
        R202H2: String(0),
        R202C3H6: String(0),
    },
])


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

// 设置单元格样式
const setCellColor = ( {}:cellstyle ):CSSProperties => {
    return {fontSize: '18px', padding: '0', width: '3vh', height: '8ch', backgroundColor: '#f0f8fffb',
        fontWeight: 600,
    }
}

// 设置表格的表头样式，为不同的列设置不同的样式
const headerStyle1 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'R201PDIValue' ) {
        return {background:'#409eff', opacity: '1', height: '6ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '6ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

const headerStyle2 = ( {column}:cellstyle ):CSSProperties => {
    if (column?.property === 'name' || column?.property === 'description' || column?.property === 'TEAL' 
        || column?.property.slice(-4) === 'C3H6') { 
        return {background:'#409eff', opacity: '1', height: '6ch',
            'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
            color:'#ffffff', border: '0 1px 0 0 solid'} 
    }
    return {background:'#409eff', opacity: '1', height: '6ch',
        'font-weight': 'bold', 'font-size': '18px', padding: '1px 1px',
        color:'#ffffff', border: '0'}
}

onMounted(() => {
    initMWdataChart(0)
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
    height: 400px;
}
</style>