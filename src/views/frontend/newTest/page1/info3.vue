<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Date" width="500">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon><timer /></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="Name" width="180">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div>name: {{ scope.row.name }}</div>
                        <div>address: {{ scope.row.address }}</div>
                    </template>
                    <template #reference>
                        <el-tag>{{ scope.row.name }}</el-tag>
                    </template>
                </el-popover>
            </template>
        </el-table-column>

        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- ----------------------------------------------------------------------- -->
    <el-form ref="forms" :model="forms">
        <el-table ref="multipleTable" :data="forms.tableData" tooltip-effect="dark" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="姓名" width="300">
                <template #default="{ row, $index }">
                    <el-form-item :prop="`tableData.${$index}.realname`" :rules="rules.rule1">
                        <el-input placeholder="输入姓名" v-model="row.realname"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column label="身份证号" show-overflow-tooltip width="300">
                <template #default="{ row, $index }">
                    <el-form-item :prop="`tableData.${$index}.idcard`" :rules="rules.rule1">
                        <el-input placeholder="输入身份证号" v-model="row.idcard"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column label="手机号码" show-overflow-tooltip width="300">
                <template #default="{ row, $index }">
                    <el-form-item :prop="`tableData.${$index}.mobile`" :rules="rules.rule1">
                        <el-input placeholder="输入手机号码" v-model="row.mobile"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex_cen mt_15">
            <el-button type="primary" :disabled="forms.tableData.length == 0" class="submit mr_20 fs_16" @click="ruleForms">确认提交</el-button>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'
import { ref, reactive, CSSProperties, Ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface User {
    date: string
    name: string
    address: string
}

const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

interface Data {
    realname?: number
    idcard?: number
    mobile?: number
}

const forms = {
    tableData: [
        {
            realname: 250,
            idcard: 54250,
            mobile: 12345678,
        },
        {
            realname: '',
            idcard: '',
            mobile: '',
        },
    ],
}

const rules = reactive<FormRules>({
    rule1: [
        {
            type: 'number',
            required: true,
            message: '请输入正确数据',
            trigger: 'blur',
            validator: (rule, value, callback) => {
                const transformedValue = Number(value)
                if (isNaN(transformedValue)) {
                    callback(new Error('请输入正确数据'))
                } else {
                    callback()
                }
            },
        },
    ],
})

const ruleForms = () => {
    console.log(123)
}
</script>
