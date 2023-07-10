<template>
    <el-form ref="formRef" :model="form">
        <el-table ref="tableRef" class="table-class" :data="form.tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="55"></el-table-column>

            <el-table-column label="姓名" width="200">
                <template #default="scoped">
                    <el-form-item :prop="`tableData.${scoped.$index}.name`" :rules="rules.name">
                        <el-input type="text" placeholder="输入姓名" v-model="scoped.row.name"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>

            <el-table-column label="手机号" width="800">
                <template #default="scoped">
                    <el-form-item :prop="`tableData.${scoped.$index}.phone`" :rules="rules.phone1">
                        <div style="display: flex; align-items: center">
                            <el-tag>{{ scoped.$index }}</el-tag>
                            <el-tag>{{ scoped.row }}</el-tag>
                            <el-input type="text" placeholder="输入手机号" v-model="scoped.row.phone"></el-input>
                        </div>
                    </el-form-item>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scoped">
                    <span class="text-btn" @click="delTableRowFn(scoped.$index)">删除</span>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <el-button @click="sumbit(formRef)">校验</el-button>
    <el-button @click="print()">显示</el-button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const formRef = ref<FormInstance>()
const tableRef = ref()
const form = ref({
    tableData: [
        {
            name: '',
            phone: '',
        },
        {
            name: '',
            phone: '',
        },
        {
            name: '',
            phone: '',
        },
    ],
})

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '我的名字呢',
            trigger: 'blur',
        },
    ],
    phone: [
        {
            required: true,
            message: '我的手机号呢',
            trigger: 'blur',
            type: 'number',
            // transform: (value) => Number(value),
        },
    ],
    phone1: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'))
                } else if (isNaN(Number(value))) {
                    callback(new Error('手机号必须为数字'))
                } else {
                    callback()
                }
            },
        },
    ],
})

const delTableRowFn = (val: any) => {
    console.log(val)
}
const sumbit = async (formRef: FormInstance | undefined) => {
    await formRef!.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const print = () => {
    // 获取表格数据
    const tableData = form.value.tableData
    // 指定行的索引
    const rowIndex = 0
    // 获取对应行的手机号
    const phone = tableData[rowIndex].phone
    // 输出手机号到控制台
    console.log(phone)
}
</script>

<style lang="scss" scoped>
.required {
    color: red;
}
.text-btn {
    text-align: center;
    color: #0c64eb;
    margin: 0 8px;
    cursor: pointer;
}
// :deep(.table-class .el-form-item) {
//     margin-bottom: 0px;
// }
// :deep(.table-class .el-input__wrapper) {
//     padding: 0px;
//     border-radius: 0;
//     box-shadow: unset;
// }
// :deep(.el-form-item.is-error .el-input__wrapper) {
//     box-shadow: 0 0 0 1px var(--el-color-danger) inset;
// }
// :deep(.el-table .cell) {
//     padding: 0px;
//     text-align: center;
// }
// :deep(.table-class .el-input) {
//     margin-left: 1px;
// }
// :deep(.table-class .el-input__inner) {
//     line-height: 23px;
//     --el-input-inner-height: 40px;
//     text-align: center;
// }
// :deep(.table-class .el-table__body .el-table__row .el-table__cell) {
//     padding: 0px;
// }
</style>
