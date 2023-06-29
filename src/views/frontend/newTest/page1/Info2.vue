<template>
    <div class="box2">
        <el-table 
        :data="R4101In" :row-style="{ height: '40px' }" :cell-style="setCellColor"
        :style="Table" :border="false" :header-cell-style="headerStyle()">

            <el-table-column prop="name" label="R4101环管反应器进料" align="center">
                <el-table-column prop="point" label="位点" align="center" />
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="value" label="数值" align="center" />
                <el-table-column prop="unit" label="单位" align="center" />
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect, CSSProperties } from 'vue'


const R4101In = reactive([
    {
        point: 'FC41058',
        description: '乙烯进料',
        value: String(0),
        unit: 'kg/h',
    },
    {
        point: 'FC41049',
        description: '己烯进料',
        value: String(0),
        unit: 'kg/h',
    },
    {
        point: 'FC41053',
        description: '氢气进料',
        value: String(0),
        unit: 'kg/h',
    },
    {
        point: 'FC30493',
        description: '助催化剂进料',
        value: String(0),
        unit: 'kg/h',
    },
    {
        point: 'FC30253',
        description: '催化剂进料',
        value: String(0),
        unit: 'kg/h',
    },
    {
        point: 'FC41048',
        description: '异丁烷进料',
        value: String(0),
        unit: 'kg/h',
    },
])



// 表格样式
const Table = {
    // width: '35%',
    'margin-left': '15px',
    'margin-right': '15px',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
    'border-spacing': '0',
    'border-radius': '14px',
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
        return { color: '#c69363', 'font-weight': 'bold', 'font-size': '15px', padding: '3px 3px' }
    } else {
        return { 'font-size': '15px', padding: '3px 3px' }
    }
}

const headerStyle = ():CSSProperties => {
    return {background:'#5d888b', opacity: '1', height: '40px',
        'font-weight': 'bold', 'font-size': '16px', padding: '3px 3px',
        color:'#ffffff', border: '0px'}
}

</script>

<style scoped lang="scss">
.box2 {
    // width: 800px;
    // height: 600px;
    // background-color: aqua;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
}
</style>