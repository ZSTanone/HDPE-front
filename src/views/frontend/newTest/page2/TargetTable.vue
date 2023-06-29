<!-- eslint-disable vue/no-mutating-props -->
<template>
    <el-table
        :data="tableData"
        :row-style="{ height: '30px' }"
        :cell-style="setCellColor"
        :style="Table"
        :header-cell-style="headerStyle"
        :border="false"
    >
        <el-table-column prop="description" label="质量指标" align="center" />

        <el-table-column prop="总聚合产量" label="总聚合产量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['总聚合产量']" size="large" />
                总聚合产量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['总聚合产量']" :disabled="!targetSelect['总聚合产量']" />
            </template>
        </el-table-column>

        <el-table-column prop="均聚物产量" label="均聚物产量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['均聚物产量']" size="large" />
                均聚物产量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['均聚物产量']" :disabled="!targetSelect['均聚物产量']" />
            </template>
        </el-table-column>

        <el-table-column prop="共聚物产量" label="共聚物产量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['共聚物产量']" size="large" />
                共聚物产量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['共聚物产量']" :disabled="!targetSelect['共聚物产量']" />
            </template>
        </el-table-column>

        <el-table-column prop="总聚合乙烯含量" label="总聚合乙烯含量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['总聚合乙烯含量']" size="large" />
                总聚合乙烯含量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['总聚合乙烯含量']" :disabled="!targetSelect['总聚合乙烯含量']" />
            </template>
        </el-table-column>

        <el-table-column prop="共聚乙烯含量" label="共聚乙烯含量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['共聚乙烯含量']" size="large" />
                共聚乙烯含量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['共聚乙烯含量']" :disabled="!targetSelect['共聚乙烯含量']" />
            </template>
        </el-table-column>

        <el-table-column prop="SCBaver" label="SCBaver" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['SCBaver']" size="large" />
                SCBaver
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['SCBaver']" :disabled="!targetSelect['SCBaver']" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { CSSProperties, toRefs, watch } from 'vue'

let props = defineProps<{
    tableData: {
        description: string
        总聚合产量: string
        均聚物产量: string
        共聚物产量: string
        总聚合乙烯含量: string
        共聚乙烯含量: string
        SCBaver: string
    }[]
    targetSelect: {
        总聚合产量: boolean
        均聚物产量: boolean
        共聚物产量: boolean
        总聚合乙烯含量: boolean
        共聚乙烯含量: boolean
        SCBaver: boolean
    }
}>()

// 做个测试看看响应式变量能不能用，是可以的
const { targetSelect } = toRefs(props)

watch(
    () => targetSelect.value.SCBaver,
    () => {
        console.log(targetSelect.value.SCBaver)
    }
)
// 

interface cellstyle {
    row: {
        property: string
    }
    column: {
        property: string
    }
}

const Table = {
    width: '99%',
    'margin-left': '15px',
    'margin-right': '15px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '8px',
}

const setCellColor = ({}: cellstyle): CSSProperties => {
    return {
        fontSize: '14px',
        padding: '0px 0px',
        width: '3vh',
        height: '2ch',
        backgroundColor: '#f0f8fffb',
        fontWeight: 500,
    }
}

const headerStyle = ({ column }: cellstyle): CSSProperties => {
    if ((column?.property as string) === 'R201H2_C3H6' || (column?.property as string) === 'R202H2_C3H6') {
        return {
            background: '#3b8eea',
            opacity: '1',
            height: '2ch',
            'font-size': '15px',
            padding: '1px 1px',
            color: '#ffffff',
            border: '0 1px 0 0 solid',
        }
    }
    if (column?.property !== 'name' && column?.property !== 'description') {
        return {
            background: '#3b8eea',
            opacity: '1',
            height: '2ch',
            'font-size': '16px',
            padding: '1px 1px',
            color: '#ffffff',
            border: '0 1px 0 0 solid',
        }
    }
    if (
        column?.property === 'name' ||
        column?.property === 'description' ||
        column?.property === 'TEAL' ||
        (column.property as string).slice(-4) === 'C3H6'
    ) {
        return {
            background: '#3b8eea',
            opacity: '1',
            height: '3ch',
            'font-size': '16px',
            padding: '1px 1px',
            color: '#ffffff',
            border: '0 1px 0 0 solid',
        }
    }
    return {
        background: '#3b8eea',
        opacity: '1',
        height: '2ch',
        'font-size': '16px',
        padding: '1px 1px',
        color: '#ffffff',
        border: '0',
    }
}
</script>

<style scoped lang="scss">
:deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    background-color: #77acea !important;
    border: 1px solid #77acea !important;
    color: #3b8eea;
}

:deep(.el-checkbox__inner:hover) {
    border-color: #77acea;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: #77acea;
    font-weight: bolder;
}

:deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
    border-color: #3b8eea !important;
}
</style>
