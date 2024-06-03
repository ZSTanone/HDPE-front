<template>
    <div class="outer">
        <el-card class="wrapper">
            <el-divider content-position="center">
                <span class="title">输入仿真数据</span>
            </el-divider>

            <el-row justify="center">

                <el-col :span="10">
                    <el-form ref="formRef" :model="form" :disabled="parameters.submit">
                        <el-table
                            ref="tableRef"
                            class="table-class"
                            :data="form.paraData"
                            :style="Table2"
                            :cell-style="setCellColor"
                            :header-cell-style="headerStyle1()"
                        >
                            <el-table-column prop="name" label="催化剂1反应动力学" align="center">
                                <el-table-column prop="description" label="参数说明" align="center"></el-table-column>

                                <el-table-column prop="value" align="center" :width="120">
                                    <template #header>
                                        <span>
                                            <span class="required">*</span>
                                            输入
                                        </span>
                                    </template>
                                    <template #default="scoped">
                                        <el-form-item :prop="`paraData.${scoped.$index}.value`" :rules="rules.rule1">
                                            <el-input
                                                placeholder="输入数据"
                                                v-model="scoped.row.value"
                                            ></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-col>

                <el-col :span="10">
                    <el-form ref="formRef" :model="form" :disabled="parameters.submit">
                        <el-table
                            ref="tableRef"
                            class="table-class"
                            :data="form.paraData2"
                            :style="Table2"
                            :cell-style="setCellColor"
                            :header-cell-style="headerStyle1()"
                        >
                            <el-table-column prop="name" label="催化剂2反应动力学" align="center">
                                <el-table-column prop="description" label="参数说明" align="center"></el-table-column>

                                <el-table-column prop="value" align="center" :width="120">
                                    <template #header>
                                        <span>
                                            <span class="required">*</span>
                                            输入
                                        </span>
                                    </template>
                                    <template #default="scoped">
                                        <el-form-item :prop="`paraData2.${scoped.$index}.value`" :rules="rules.rule1">
                                            <el-input
                                                placeholder="输入数据"
                                                v-model="scoped.row.value"
                                            ></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-col>

                <el-col :span="9">
                    <el-form ref="formRef" :model="form" :disabled="parameters.submit">
                        <el-table
                            ref="tableRef"
                            class="table-class"
                            :data="form.feedData"
                            :style="Table1"
                            :cell-style="setCellColor"
                            :header-cell-style="headerStyle1()"
                        >
                            <el-table-column prop="name" label="反应工艺设置" align="center">
                                <el-table-column prop="description" label="反应物" align="center"></el-table-column>

                                <el-table-column prop="value" align="center">
                                    <template #header>
                                        <span>
                                            <span class="required">*</span>
                                            输入
                                        </span>
                                    </template>
                                    <template #default="scoped">
                                        <el-form-item :prop="`feedData.${scoped.$index}.value`" :rules="rules.rule1">
                                            <el-input placeholder="输入进料量" v-model="scoped.row.value"></el-input>
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
                    <el-button :disabled="SimPara.submit" @click="submitForm(formRef)">提交运行</el-button>
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

import { useMomentsdata } from "/@/stores/moments";

const SimPara = useSimPara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048 } = storeToRefs(SimPara)
let para_obj: { [key: string]: any } = {}

// new
const parameters = useMomentsdata()
const {C,S0,M,H2,B,kiA1,kiB1,kpA1,kpB1,ktb1,kth1,kd1,kCSA1,kCSA01,submit,
    kiA2,kiB2,kpA2,kpB2,ktb2,kth2,kd2,kCSA2,kCSA02
} = storeToRefs(parameters)

const formRef = ref<FormInstance>()
const tableRef = ref()
const form = reactive({
    feedData: [
        {
            description: '乙烯',
            value: M,
            unit: 'mol/L',
        },
        {
            description: '1-辛烯',
            value: B,
            unit: 'mol/L',
        },
        {
            description: '氢气',
            value: H2,
            unit: 'mol/L',
        },
        {
            description: '催化剂',
            value: C,
            unit: 'mol/L',
        },
        {
            description: '链穿梭剂',
            value: S0,
            unit: 'mol/L',
        },
    ],
    paraData: [
        {
            description: '单体 链引发速率常数kiA1',
            value: kiA1,
            unit: 'mol/(L*s)',
        },
        {
            description: '共聚单体 链引发速率常数kiB1',
            value: kiB1,
            unit: 'mol/(L*s)',
        },
        {
            description: '单体 链增长速率常数kpA1',
            value: kpA1,
            unit: 'mol/(L*s)'
        },
        {
            description: '共聚单体 链增长速率常数kpB1',
            value: kpB1,
            unit: 'mol/(L*s)'
        },
        {
            description: 'β氢气消除速率常数ktβ1',
            value: ktb1,
            unit: '/s',
        },
        {
            description: '向氢气转移速率常数kth1',
            value: kth1,
            unit: 'mol/(L*s)',
        },
        {
            description: '链失活速率常数kd1',
            value: kd1,
            unit: '/s',
        },
        {
            description: '链转移速率常数kCSA01',
            value: kCSA01,
            unit: 'mol/(L*s)',
        },
        {
            description: '向休眠链转移速率常数kCSA1',
            value: kCSA1,
            unit: 'mol/(L*s)',
        },
    ],
    paraData2: [
        {
            description: '单体 链引发速率常数kiA2',
            value: kiA2,
            unit: 'mol/(L*s)',
        },
        {
            description: '共聚单体 链引发速率常数kiB2',
            value: kiB2,
            unit: 'mol/(L*s)',
        },
        {
            description: '单体 链增长速率常数kpA2',
            value: kpA2,
            unit: 'mol/(L*s)'
        },
        {
            description: '共聚单体 链增长速率常数kpB2',
            value: kpB2,
            unit: 'mol/(L*s)'
        },
        {
            description: 'β氢气消除速率常数ktβ2',
            value: ktb2,
            unit: '/s',
        },
        {
            description: '氢气转移速率常数kth2',
            value: kth2,
            unit: 'mol/(L*s)',
        },
        {
            description: '链失活速率常数kd2',
            value: kd2,
            unit: '/s',
        },
        {
            description: '链转移速率常数kCSA02',
            value: kCSA02,
            unit: 'mol/(L*s)',
        },
        {
            description: '向休眠链转移速率常数kCSA2',
            value: kCSA2,
            unit: 'mol/(L*s)',
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
                // console.log(form.value.feedData)
                // console.log(form.value.paraData)

                // flag为true表示成功提交
                parameters.submit = true
                para_obj = parameters.getPara()

                console.log(parameters.submit)
                
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
    form.feedData.forEach((item) => {
        item.value = 0
    })

    form.paraData.forEach((item) => {
        item.value = 0
    })

    parameters.submit = false
}

const Table1 = {
    width: '15vw',
    margin: '40px auto',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    'background-color': '#ffffff', // 设置表格背景颜色
}

const Table2 = {
    width: '30vw',
    margin: '5px auto',
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
        background: '#035474',
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
    width: 95%;
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
