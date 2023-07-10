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

        <el-table-column prop="聚合物产量" label="聚合物产量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['聚合物产量']" size="large" />
                聚合物产量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['聚合物产量']" :disabled="!targetSelect['聚合物产量']" />
            </template>
        </el-table-column>

        <el-table-column prop="共聚单体含量" label="共聚单体含量" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['共聚单体含量']" size="large" />
                共聚单体含量
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['共聚单体含量']" :disabled="!targetSelect['共聚单体含量']" />
            </template>
        </el-table-column>

        <el-table-column prop="平均短支链" label="平均短支链" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['平均短支链']" size="large" />
                平均短支链
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['平均短支链']" :disabled="!targetSelect['平均短支链']" />
            </template>
        </el-table-column>

        <el-table-column prop="熔融指数" label="熔融指数" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['熔融指数']" size="large" />
                熔融指数
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['熔融指数']" :disabled="!targetSelect['熔融指数']" />
            </template>
        </el-table-column>

        <el-table-column prop="产品密度" label="产品密度" align="center">
            <template #header>
                <el-checkbox v-model="targetSelect['产品密度']" size="large" />
                产品密度
            </template>
            <template #default="scope">
                <el-input v-model="scope.row['产品密度']" :disabled="!targetSelect['产品密度']" />
            </template>
        </el-table-column>

    </el-table>
</template>

<script setup lang="ts">
import { CSSProperties, toRefs, watch } from 'vue'

let props = defineProps<{
    tableData: {
        description: string
        聚合物产量: string
        共聚单体含量: string
        平均短支链: string
        熔融指数: string
        产品密度: string
    }[]
    targetSelect: {
        聚合物产量: boolean
        共聚单体含量: boolean
        平均短支链: boolean
        熔融指数: boolean
        产品密度: boolean
    }
}>()

// 做个测试看看响应式变量能不能用，是可以的
const { targetSelect } = toRefs(props)
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
