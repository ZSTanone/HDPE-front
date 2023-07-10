<template>
    <div class="outer">
        <el-card class="wrapper">
            <el-divider content-position="center">
                <span class="title">输入仿真数据</span>
            </el-divider>

            <el-row justify="center">
                <el-col :span="10">
                    <el-form ref="formRef" :model="form" :disabled="SimPara.submit">
                        <el-table
                            ref="tableRef"
                            class="table-class"
                            :data="form.r4101Data"
                            :style="Table2"
                            :cell-style="setCellColor"
                            :header-cell-style="headerStyle1()"
                        >
                            <el-table-column prop="name" label="R4101反应器进料" align="center">
                                <el-table-column prop="description" label="反应物" align="center"></el-table-column>

                                <el-table-column prop="value" align="center">
                                    <template #header>
                                        <span>
                                            <span class="required">*</span>
                                            输入
                                        </span>
                                    </template>
                                    <template #default="scoped">
                                        <el-form-item :prop="`r4101Data.${scoped.$index}.value`" :rules="rules.rule1">
                                            <el-input placeholder="输入进料量" v-model="scoped.row.value"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-col>

                <el-col :span="10">
                    <el-form ref="formRef" :model="form" :disabled="SimPara.submit">
                        <el-table
                            ref="tableRef"
                            class="table-class"
                            :data="form.r4201Data"
                            :style="Table2"
                            :cell-style="setCellColor"
                            :header-cell-style="headerStyle1()"
                        >
                            <el-table-column prop="name" label="R4201反应器进料" align="center">
                                <el-table-column prop="description" label="反应物" align="center"></el-table-column>

                                <el-table-column prop="value" align="center">
                                    <template #header>
                                        <span>
                                            <span class="required">*</span>
                                            输入
                                        </span>
                                    </template>
                                    <template #default="scoped">
                                        <el-form-item :prop="`r4201Data.${scoped.$index}.value`" :rules="rules.rule1">
                                            <el-input
                                                placeholder="输入进料量"
                                                v-model="scoped.row.value"
                                                :disabled="scoped.row.description === '催化剂'"
                                            ></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="500" class="btn" justify="center">
                <el-col :span="1.5">
                    <el-button :disabled="SimPara.submit" @click="submitForm(formRef)">提交数据</el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button @click="resetForm()">清除数据</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, CSSProperties, Ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useSimPara } from '/@/stores/SimPara'
import { storeToRefs } from 'pinia'

const SimPara = useSimPara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048 } = storeToRefs(SimPara)
let para_obj: { [key: string]: any } = {}

const formRef = ref<FormInstance>()
const tableRef = ref()
const form = reactive({
    r4101Data: [
        {
            description: '乙烯',
            value: FC41058,
            unit: 'Kg / h',
        },
        {
            description: '氢气',
            value: FC41053,
            unit: 'Kg / h',
        },
        {
            description: '己烯',
            value: FC41049,
            unit: 'Kg / h',
        },
        {
            description: '催化剂',
            value: FC30253,
            unit: 'Kg / h',
        },
        {
            description: '助催化剂',
            value: FC30493,
            unit: 'Kg / h',
        },
        {
            description: '异丁烷',
            value: FC41048,
            unit: 'Kg / h',
        },
    ],
    r4201Data: [
        {
            description: '乙烯',
            value: FC42058,
            unit: 'Kg / h',
        },
        {
            description: '氢气',
            value: FC42053,
            unit: 'Kg / h',
        },
        {
            description: '己烯',
            value: FC42049,
            unit: 'Kg / h',
        },
        {
            description: '催化剂',
            value: 0,
            unit: 'Kg / h',
        },
        {
            description: '助催化剂',
            value: FC30486,
            unit: 'Kg / h',
        },
        {
            description: '异丁烷',
            value: FC42048,
            unit: 'Kg / h',
        },
    ],
})

const rules = reactive<FormRules>({
    rule1: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('反应器进料不能为空'))
                } else if (isNaN(Number(value))) {
                    callback(new Error('数据不合法，请确认后重试'))
                } else {
                    callback()
                }
            },
        },
    ],
})

let timer: NodeJS.Timeout | null = null

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    // 清除之前的定时器
    if (timer) {
        clearTimeout(timer)
    }

    // 设置新的定时器
    timer = setTimeout(async () => {
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('成功提交!')
                ElMessage({
                    message: '反应数据设置成功',
                    type: 'success',
                })
                // console.log(form.value.r4101Data)
                // console.log(form.value.r4201Data)

                // flag为true表示成功提交
                SimPara.submit = true
                para_obj = SimPara.getPara()

                console.log(SimPara.submit)
                console.log(para_obj)
            } else {
                console.log('error submit!', fields)
                ElMessage.error('输入数据有误，请检查后重试')
            }
        })

        // 清空定时器
        timer = null
    }, 1500)
}

const resetForm = () => {
    form.r4101Data.forEach((item) => {
        item.value = 0
    })

    form.r4201Data.forEach((item) => {
        item.value = 0
    })

    SimPara.submit = false
}

const Table2 = {
    width: '20vw',
    margin: '50px auto',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    'background-color': '#ffffff', // 设置表格背景颜色
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
        return { color: '#bfa', 'font-weight': 'bold', 'font-size': '15px', padding: '3px 3px' }
    } else {
        return { 'font-size': '15px', padding: '3px 3px', 'font-weight': 'bold', color: '#78553c' }
    }
}

const headerStyle1 = (): CSSProperties => {
    return {
        background: '#89ade2',
        opacity: '1',
        height: '1.8vw',
        'font-weight': 'bold',
        'font-size': '20px',
        padding: '3px 3px',
        color: '#ffffff',
        border: '0px',
    }
}
</script>

<style lang="scss" scoped>
.outer {
    width: 100%;
    height: 100vh;
    background-color: #d5e3f3;
    padding-top: 30px;
}

.wrapper {
    margin: 0px auto;
    width: 80%;
    justify-content: center;
    padding-top: 20px;
}

.btn {
    margin-top: 100px;
    margin-bottom: 50px;
}

.title {
    font-size: 1.2vw;
    font-weight: bold;
    color: #0869bf;
}

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
:deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
:deep(.el-table .cell) {
    padding: 0px;
    text-align: center;
}
:deep(.table-class .el-input) {
    margin-left: 1px;
}
// :deep(.table-class .el-input__inner) {
//     line-height: 23px;
//     --el-input-inner-height: 40px;
//     text-align: center;
// }
:deep(.table-class .el-table__body .el-table__row .el-table__cell) {
    padding: 0px;
}

// :deep(.el-table tbody tr > td) {
//     background-color: #ffffff;
// }
</style>
