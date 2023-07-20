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

        <el-table-column prop="name" label="R4101反应器" align="center">
            <el-table-column prop="R4101_H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4101_H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4101_H2" :disabled="!inputSelect.R4101_H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R4101_C2H4" label="C2H4" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4101_C2H4" size="large" />
                    C2H4
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4101_C2H4" :disabled="!inputSelect.R4101_C2H4" />
                </template>
            </el-table-column>
            <el-table-column prop="R4101_C6H12" label="C6H12" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4101_C6H12" size="large" />
                    C6H12
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4101_C6H12" :disabled="!inputSelect.R4101_C6H12" />
                </template>
            </el-table-column>
        </el-table-column>

        <el-table-column prop="name" label="R4201反应器" align="center">
            <el-table-column prop="R4201_H2" label="H2" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4201_H2" size="large" />
                    H2
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4201_H2" :disabled="!inputSelect.R4201_H2" />
                </template>
            </el-table-column>
            <el-table-column prop="R4201_C2H4" label="C2H4" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4201_C2H4" size="large" />
                    C2H4
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4201_C2H4" :disabled="!inputSelect.R4201_C2H4" />
                </template>
            </el-table-column>
            <el-table-column prop="R4201_C6H12" label="C6H12" align="center">
                <template #header>
                    <el-checkbox v-model="inputSelect.R4201_C6H12" size="large" />
                    C6H12
                </template>
                <template #default="scope">
                    <el-input v-model="scope.row.R4201_C6H12" :disabled="!inputSelect.R4201_C6H12" />
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
        R4101_H2: string
        R4101_C2H4: string
        R4101_C6H12: string
        R4201_H2: string
        R4201_C2H4: string
        R4201_C6H12: string
    }[]
    inputSelect: {
        R4101_H2: boolean
        R4101_C2H4: boolean
        R4101_C6H12: boolean
        R4201_H2: boolean
        R4201_C2H4: boolean
        R4201_C6H12: boolean
    }
}>()

const { inputSelect } = toRefs(props)

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
        padding: '0 1 0 1',
        width: '4vh',
        height: '2ch',
        backgroundColor: '#f0f8fffb',
        fontWeight: 500,
    }
}

const headerStyle = ({ column }: cellstyle): CSSProperties => {
    if ((column?.property as string) === 'R4101_C2H4' || (column?.property as string) === 'R4201_C2H4') {
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
    if (column?.property === 'name' || column?.property === 'description' || (column.property as string).slice(-4) === 'C3H6') {
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
