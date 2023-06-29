<!-- 对常用组件的样式穿透效果进行研究 -->
<template>
    <div class="box2">
        <el-row>
            <el-col :span="15">
                <el-table :data="R4101In" :row-style="{ height: '60px' }" :cell-style="setCellColor" :style="Table"
                    :border="false" :header-cell-style="headerStyle()" class="custom-table">

                    <el-table-column prop="name" label="R4101环管反应器进料" align="center">
                        <el-table-column prop="point" label="位点" align="center" />
                        <el-table-column prop="description" label="说明" align="center" />
                        <el-table-column prop="value" label="数值" align="center" />
                        <el-table-column prop="unit" label="单位" align="center" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="3.5" :offset="0">
                <el-button size="large" type="primary" class="btn1" @click="click()" plain>功能按钮1</el-button>
            </el-col>
            <el-col :span="1.5" :offset="0">
                <el-button size="large" type="primary" class="btn1" @click="click()" plain>功能按钮1</el-button>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="16">
                <el-table :data="R4101In" :row-style="{ height: '60px' }" :cell-style="setCellColor" :style="Table"
                    :border="false" :header-cell-style="headerStyle()" class="custom-table">

                    <el-table-column prop="name" label="R4101环管反应器进料" align="center">
                        <el-table-column prop="point" label="位点" align="center" />
                        <el-table-column prop="description" label="说明" align="center" />
                        <el-table-column prop="value" label="数值" align="center" />
                        <el-table-column prop="unit" label="单位" align="center" />
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="4">
                <el-button size="large" type="primary" class="btn1" @click="click()" plain>功能按钮1</el-button>
            </el-col>

        </el-row>

        <el-dialog v-model="opt" width="50%" draggable center>
            <template #header>
                <div class="dialog-header">
                    header插槽
                </div>
            </template>
            <div class="dialog-main">内容区</div>
            <template #footer>
                <div class="dialog-footer">
                    footer插槽
                </div>
            </template>
        </el-dialog>



    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect, CSSProperties } from 'vue'

const opt = ref(false)

const click = () => {
    console.log('点击按钮1');
    opt.value = true
}


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
    width: '60%',
    'margin-left': '15px',
    'margin-right': '15px',
    'font-family': "Lucida Sans Unicode, Lucida Grande, Sans-Serif",
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
        return { color: '#c69363', 'font-weight': 'bold', 'font-size': '15px', padding: '3px 3px' }
    } else {
        return { 'font-size': '15px', padding: '3px 3px', }
    }
}

const headerStyle = (): CSSProperties => {
    return {
        background: '#5d888b', opacity: '1', height: '40px',
        'font-weight': 'bold', 'font-size': '16px', padding: '3px 3px',
        color: '#ffffff', border: '0px'
    }
}

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'newTest/page3',
})
</script>


<style scoped lang="scss">

// 虽然这里写死了box2的高度，但是el-row 组件会自动调整其高度以适应内容的高度
.box2 {
    width: 100%;
    height: 600px;
    // background-color:white;
    // display: flex;
    // justify-content: center;
    padding-bottom: 30px;
}



.el-row{
    margin-bottom: 20px;
}

.dialog-header,
.dialog-footer {
    background-color: white;
}

.dialog-main {
    background-color: #f3cfcf;
    /* 设置底部背景颜色 */
}

/* 改变表格的背景颜色 */
:deep(.el-table tbody tr>td) {
    background-color: #ffffff;
}

/* .custom-table :deep(.el-table__body tbody tr > td ){
    background-color: #ffffff;
} */


/* 改变鼠标悬停时的背景颜色 */
:deep(.el-table tbody tr:hover>td) {
    background-color: #e6faff !important;
}

/* 设置el-dialog的背景颜色 */
:deep(.el-dialog) {
    background-color: #e2e9ff;
}
</style>
