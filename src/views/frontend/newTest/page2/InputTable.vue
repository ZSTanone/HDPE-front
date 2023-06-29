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
        <el-table-column prop="description" label="工艺参数" align="center" />

        <el-table-column prop="name" label="催化剂" align="center">
            <el-table-column prop="TICL4" label="TICL4" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.TICL4" size="large" />
                    TICL4
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.TICL4" :disabled="!inputSelect.TICL4" />
                </template>
            </el-table-column>

            <el-table-column prop="TEAL" label="TEAL" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.TEAL" size="large" />
                    TEAL
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.TEAL" :disabled="!inputSelect.TEAL" />
                </template>
            </el-table-column>
        </el-table-column>

        <el-table-column prop="name" label="R200反应器" align="center">
            <el-table-column prop="R200H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R200H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R200H2" :disabled="!inputSelect.R200H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R200C3H6" label="C3H6" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R200C3H6" size="large" />
                    C3H6
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R200C3H6" :disabled="!inputSelect.R200C3H6" />
                </template>
            </el-table-column>
        </el-table-column>

        <el-table-column prop="name" label="R201反应器" align="center">
            <el-table-column prop="R201H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R201H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R201H2" :disabled="!inputSelect.R201H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R201C3H6" label="C3H6" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R201C3H6" size="large" />
                    C3H6
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R201C3H6" :disabled="!inputSelect.R201C3H6" />
                </template>
            </el-table-column>
        </el-table-column>

        <el-table-column prop="name" label="R202反应器" align="center">
            <el-table-column prop="R202H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R202H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R202H2" :disabled="!inputSelect.R202H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R202C3H6" label="C3H6" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R202C3H6" size="large" />
                    C3H6
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R202C3H6" :disabled="!inputSelect.R202C3H6" />
                </template>
            </el-table-column>
        </el-table-column>

        <el-table-column prop="name" label="R401反应器" align="center">
            <el-table-column prop="R202H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R401H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R401H2" :disabled="!inputSelect.R401H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R202C3H6" label="C3H6" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R401C3H6" size="large" />
                    C3H6
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R401C3H6" :disabled="!inputSelect.R401C3H6" />
                </template>
            </el-table-column>
            <el-table-column prop="R202C3H6" label="C3H6" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R401C2H4" size="large" />
                    C2H4
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R401C2H4" :disabled="!inputSelect.R401C2H4" />
                </template>
            </el-table-column>
        </el-table-column>

    </el-table>
</template>

<script setup lang="ts">
// import { watch } from 'fs'
import { CSSProperties, reactive, ref, toRefs, watch } from 'vue'

let props = defineProps<{
    tableData: {
        description: string
        TICL4: string
        TEAL: string
        R200H2: string
        R200C3H6: string
        R201H2: string
        R201C3H6: string
        R202H2: string
        R202C3H6: string
        R401H2: string
        R401C3H6: string
        R401C2H4: string
    }[]
    inputSelect: {
        TICL4: boolean
        TEAL: boolean
        R200H2: boolean
        R200C3H6: boolean
        R201H2: boolean
        R201C3H6: boolean
        R202H2: boolean
        R202C3H6: boolean
        R401H2: boolean
        R401C3H6: boolean
        R401C2H4: boolean
    }
}>()

// 测试内容，可删
const { inputSelect } = toRefs(props)

watch(
    () => inputSelect.value.TEAL,
    () => {
        console.log(inputSelect.value.TEAL)
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

// 设置表格的格式
const Table = {
    width: '99%',
    'margin-left': '15px',
    'margin-right': '15px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '8px',
}

// 设置单元格的格式
const setCellColor = ({}: cellstyle): CSSProperties => {
    return {
        fontSize: '14px',
        padding: '0 1 0 1',
        width: '4vh',
        height: '2ch',
        backgroundColor: '#f0f8fffb',
        fontWeight: 500,
    }
}

// 根据表头单元格的属性值：props 对不同的单元格设置不同的样式对象
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
            'font-size': '15px',
            padding: '1px 1px',
            color: '#ffffff',
            border: '0 1px 0 0 solid',
        }
    }
    // 如果 column?.property 的值等于 'name'、'description'、'TEAL'，或者以 'C3H6' 结尾
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
            'font-size': '18px',
            padding: '1px 1px',
            color: '#ffffff',
            border: '0 1px 0 0 solid',
        }
    }
    // 不满足以上的其余的应用这个样式
    return {
        background: '#3b8eea',
        opacity: '1',
        height: '2ch',
        'font-size': '15px',
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
.cell {
    padding: 0 0;
}
.el-input {
    width: 100%;
}
</style>
